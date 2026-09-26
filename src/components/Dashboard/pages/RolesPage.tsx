"use client";

import { useState } from "react";
import { CirclePlus, Lock, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Permission, Role, Status } from "@/lib/backend-types";
import { useApiAction, useApiQuery } from "../api";
import { EmptyState, ErrorBox, FieldError, Modal, PageHeader, PrimaryButton, Spinner, StatusPill, Toggle, inputClass, labelClass, useConfirm } from "../ui";

type PermissionGroups = { total: number; modules: Record<string, Permission[]> };

export default function RolesPage() {
  const { hasPermission, user } = useAuth();
  const action = useApiAction();
  const confirm = useConfirm();
  const roles = useApiQuery<Role[]>("/roles");
  const [editing, setEditing] = useState<Role | "new" | null>(null);

  const setStatus = async (r: Role, status: Status) => {
    if (await action(`/roles/${r._id}/status`, { method: "PATCH", json: { status } })) roles.reload();
  };

  const remove = async (r: Role) => {
    const ok = await confirm({ title: `Delete role "${r.name}"?`, text: "Roles that still have users cannot be deleted.", confirmText: "Yes, Delete" });
    if (ok && (await action(`/roles/${r._id}`, { method: "DELETE" }))) roles.reload();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Roles & Permissions" subtitle="What each role can see and do. The backend enforces these on every request.">
        {hasPermission("roles.create") && (
          <PrimaryButton onClick={() => setEditing("new")}>
            <CirclePlus className="mr-2 h-4 w-4" /> New Role
          </PrimaryButton>
        )}
      </PageHeader>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        {roles.loading && !roles.data ? (
          <Spinner label="Loading roles..." />
        ) : roles.error ? (
          <ErrorBox message={roles.error} onRetry={roles.reload} />
        ) : !roles.data?.length ? (
          <EmptyState title="No roles yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold tracking-wider whitespace-nowrap text-slate-500 uppercase">
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Users</th>
                  <th className="px-4 py-3.5">Permissions</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles.data.map((r) => {
                  const own = r._id === user?.roleId;
                  return (
                    <tr key={r._id} className="transition hover:bg-slate-50/60">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                          {r.name}
                          {r.isProtected && <Lock className="h-3.5 w-3.5 text-slate-400" aria-label="Protected role" />}
                        </div>
                        <p className="mt-0.5 text-slate-500">{r.description}</p>
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-700">{r.userCount ?? 0}</td>
                      <td className="px-4 py-4 font-semibold text-slate-700">{r.permissionCount ?? 0}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {hasPermission("roles.status") && !r.isProtected && !own && (
                            <Toggle checked={r.status === "ACTIVE"} onChange={(v) => setStatus(r, v ? "ACTIVE" : "INACTIVE")} />
                          )}
                          <StatusPill value={r.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {hasPermission("roles.update") && !own && (
                            <button onClick={() => setEditing(r)} title="Edit role" className="cursor-pointer p-1.5 text-slate-400 transition hover:text-amber-600">
                              <Pencil className="h-4 w-4" />
                            </button>
                          )}
                          {hasPermission("roles.delete") && !r.isProtected && (
                            <button onClick={() => remove(r)} title="Delete role" className="cursor-pointer p-1.5 text-slate-400 transition hover:text-rose-600">
                              <Trash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && <RoleModal role={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSaved={roles.reload} />}
    </div>
  );
}

function RoleModal({ role, onClose, onSaved }: { role: Role | null; onClose: () => void; onSaved: () => void }) {
  const { permissions: mine } = useAuth();
  const action = useApiAction();
  const groups = useApiQuery<PermissionGroups>("/permissions");
  const detail = useApiQuery<Role>(role ? `/roles/${role._id}` : null);
  const [name, setName] = useState(role?.name ?? "");
  const [description, setDescription] = useState(role?.description ?? "");
  const [selected, setSelected] = useState<Set<string> | null>(role ? null : new Set());
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // For an existing role the permission list arrives with the detail request.
  const current = selected ?? (detail.data ? new Set(detail.data.permissions ?? []) : null);
  const lockedPermissions = role?.name === "Admin";
  const mineSet = new Set(mine);

  const toggle = (p: string) => {
    const next = new Set(current ?? []);
    if (next.has(p)) next.delete(p);
    else next.add(p);
    setSelected(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Role name is required.");
    setError("");
    setSaving(true);
    const body: Record<string, unknown> = { description };
    if (!role?.isProtected) body.name = name.trim();
    if (!lockedPermissions && current) body.permissions = [...current];
    const res = role ? await action(`/roles/${role._id}`, { method: "PUT", json: body }) : await action("/roles", { method: "POST", json: body });
    setSaving(false);
    if (res) {
      onSaved();
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose} className="max-w-3xl">
      <form onSubmit={submit} className="flex max-h-[85vh] flex-col">
        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          <h2 className="text-lg font-extrabold text-slate-900">{role ? `Edit role: ${role.name}` : "New role"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Name</span>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} disabled={role?.isProtected} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Description</span>
              <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <span className={labelClass}>Permissions {current && `(${current.size} selected)`}</span>
            {lockedPermissions && <p className="text-xs text-slate-500">The Admin role always has every permission.</p>}
            {!groups.data || !current ? (
              <Spinner label="Loading permissions..." />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(groups.data.modules).map(([module, perms]) => (
                  <fieldset key={module} className="rounded-2xl border border-slate-200 p-3">
                    <legend className="px-1 text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">{module}</legend>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {perms.map((p) => {
                        // You can only grant permissions you have yourself.
                        const disabled = lockedPermissions || !mineSet.has(p.name);
                        return (
                          <label key={p.name} className={`flex items-center gap-1.5 text-xs ${disabled ? "text-slate-400" : "cursor-pointer text-slate-700"}`}>
                            <input type="checkbox" checked={lockedPermissions || current.has(p.name)} disabled={disabled} onChange={() => toggle(p.name)} />
                            {p.action}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            )}
          </div>
          <FieldError message={error} />
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-xl px-4 text-sm font-semibold text-slate-500 hover:bg-slate-100">
            Cancel
          </button>
          <PrimaryButton type="submit" loading={saving}>
            {role ? "Save Changes" : "Create Role"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
