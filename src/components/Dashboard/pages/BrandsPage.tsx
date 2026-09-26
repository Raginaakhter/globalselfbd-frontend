"use client";

import { useState } from "react";
import { CirclePlus, Pencil, Star, Trash, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Brand, Status } from "@/lib/backend-types";
import { qs, useApiAction, useApiQuery } from "../api";
import {
  Drawer,
  EmptyState,
  ErrorBox,
  FieldError,
  PageHeader,
  PrimaryButton,
  SearchBox,
  Spinner,
  StatusPill,
  Toggle,
  inputClass,
  labelClass,
  selectClass,
  useConfirm,
  useDebounced,
} from "../ui";
import { SingleImageField } from "./ProductMedia";

export default function BrandsPage() {
  const { hasPermission } = useAuth();
  const action = useApiAction();
  const confirm = useConfirm();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [editing, setEditing] = useState<Brand | "new" | null>(null);
  const q = useDebounced(search);
  const brands = useApiQuery<Brand[]>(`/brands${qs({ search: q, status, featured })}`);

  const canUpdate = hasPermission("brands.update");
  const replace = (b: Brand) => brands.setData((l) => l?.map((x) => (x._id === b._id ? b : x)) ?? l);

  const setBrandStatus = async (b: Brand, next: Status) => {
    const res = await action<Brand>(`/brands/${b._id}/status`, { method: "PATCH", json: { status: next } });
    if (res) replace(res.data);
  };

  const toggleFeatured = async (b: Brand) => {
    const res = await action<Brand>(`/brands/${b._id}`, { method: "PUT", json: { isFeatured: !b.isFeatured } }, b.isFeatured ? "Removed from Top Brands" : "Added to Top Brands");
    if (res) replace(res.data);
  };

  const remove = async (b: Brand) => {
    const ok = await confirm({ title: `Delete "${b.name}"?`, text: "The brand will be removed from the website.", confirmText: "Yes, Delete" });
    if (ok && (await action(`/brands/${b._id}`, { method: "DELETE" }))) brands.reload();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Brands" subtitle="Brands shown in the Shop Top Brands section. Starred brands appear on the landing page.">
        {hasPermission("brands.create") && (
          <PrimaryButton onClick={() => setEditing("new")}>
            <CirclePlus className="mr-2 h-4 w-4" /> Add Brand
          </PrimaryButton>
        )}
      </PageHeader>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <SearchBox value={search} onChange={setSearch} placeholder="Search by name..." />
        <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <select className={selectClass} value={featured} onChange={(e) => setFeatured(e.target.value)}>
          <option value="">Top Brands: any</option>
          <option value="true">In Top Brands</option>
          <option value="false">Not in Top Brands</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        {brands.loading && !brands.data ? (
          <Spinner label="Loading brands..." />
        ) : brands.error ? (
          <ErrorBox message={brands.error} onRetry={brands.reload} />
        ) : !brands.data?.length ? (
          <EmptyState title="No brands found" text={search ? "No brand matches your search." : "Add your first brand with its logo."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold tracking-wider whitespace-nowrap text-slate-500 uppercase">
                  <th className="px-6 py-3.5">Brand</th>
                  <th className="px-4 py-3.5">Link</th>
                  <th className="px-4 py-3.5">Top Brands</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brands.data.map((b) => (
                  <tr key={b._id} className="transition hover:bg-slate-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.logoUrl} alt={b.name} className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 bg-white object-contain p-1" />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900">{b.name}</div>
                          {b.description && <div className="max-w-xs truncate text-slate-500">{b.description}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{b.link || "—"}</td>
                    <td className="px-4 py-4">
                      <button
                        disabled={!canUpdate}
                        onClick={() => toggleFeatured(b)}
                        title={b.isFeatured ? "Remove from Top Brands" : "Add to Top Brands"}
                        className="cursor-pointer p-1 disabled:cursor-default"
                      >
                        <Star className={`h-5 w-5 ${b.isFeatured ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {canUpdate && <Toggle checked={b.status === "ACTIVE"} onChange={(v) => setBrandStatus(b, v ? "ACTIVE" : "INACTIVE")} />}
                        {b.status && <StatusPill value={b.status} />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canUpdate && (
                          <button onClick={() => setEditing(b)} title="Edit" className="cursor-pointer p-1.5 text-slate-400 hover:text-amber-600">
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        {hasPermission("brands.delete") && (
                          <button onClick={() => remove(b)} title="Delete" className="cursor-pointer p-1.5 text-slate-400 hover:text-rose-600">
                            <Trash className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Drawer open={!!editing} onClose={() => setEditing(null)}>
        {editing && <BrandForm key={editing === "new" ? "new" : editing._id} brand={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSaved={brands.reload} />}
      </Drawer>
    </div>
  );
}

function BrandForm({ brand, onClose, onSaved }: { brand: Brand | null; onClose: () => void; onSaved: () => void }) {
  const action = useApiAction();
  const [form, setForm] = useState({
    name: brand?.name ?? "",
    slug: brand?.slug ?? "",
    logoUrl: brand?.logoUrl ?? "",
    description: brand?.description ?? "",
    link: brand?.link ?? "",
    isFeatured: brand?.isFeatured ?? true,
    status: brand?.status ?? "ACTIVE",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Brand name is required.");
    if (!form.logoUrl) return setError("Upload the brand logo.");
    const link = form.link.trim();
    if (link && !link.startsWith("/") && !/^https?:\/\//i.test(link)) return setError('Link must start with "/" or http(s)://');
    setError("");
    setSaving(true);
    const body = { ...form, name: form.name.trim(), slug: form.slug.trim(), description: form.description.trim(), link };
    const res = brand ? await action(`/brands/${brand._id}`, { method: "PUT", json: body }) : await action("/brands", { method: "POST", json: body });
    setSaving(false);
    if (res) {
      onSaved();
      onClose();
    }
  };

  return (
    <form onSubmit={submit} className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="text-lg font-extrabold text-slate-900">{brand ? "Edit Brand" : "New Brand"}</h2>
        <button type="button" onClick={onClose} className="cursor-pointer rounded-lg p-1 text-slate-400 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Name *</span>
          <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <SingleImageField label="Logo *" value={form.logoUrl} onChange={(v) => set("logoUrl", v)} folder="brands" removable={false} hint="Square or wide logo on a transparent/white background." />
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Slug</span>
          <input className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="Made from the name if empty" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Link</span>
          <input className={inputClass} value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="/shop?q=brand or https://..." />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Description</span>
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
          <span className={labelClass}>Show in Shop Top Brands</span>
          <Toggle checked={form.isFeatured} onChange={(v) => set("isFeatured", v)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Status</span>
          <select className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value as Status)}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive (hidden)</option>
          </select>
        </label>
        <FieldError message={error} />
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
        <button type="button" onClick={onClose} className="cursor-pointer rounded-xl px-4 text-sm font-semibold text-slate-500 hover:bg-slate-100">
          Cancel
        </button>
        <PrimaryButton type="submit" loading={saving}>
          {brand ? "Save Changes" : "Create Brand"}
        </PrimaryButton>
      </div>
    </form>
  );
}
