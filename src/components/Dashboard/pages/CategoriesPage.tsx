"use client";

import { useState } from "react";
import { CirclePlus, FolderTree, ImagePlus, Loader2, Pencil, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import type { Category, Status } from "@/lib/backend-types";
import { errorMessage, qs, useApiAction, useApiQuery, useImageUpload } from "../api";
import { formatShortDate } from "../format";
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

export default function CategoriesPage() {
  const { hasPermission } = useAuth();
  const action = useApiAction();
  const confirm = useConfirm();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const q = useDebounced(search);

  const list = useApiQuery<Category[]>(`/categories${qs({ search: q, status })}`);
  // Parent choices: every active category (the list above may be filtered).
  const parents = useApiQuery<Category[]>(editing ? "/categories?status=ACTIVE" : null);

  const canCreate = hasPermission("categories.create");
  const canUpdate = hasPermission("categories.update");
  const canDelete = hasPermission("categories.delete");

  const setCategoryStatus = async (c: Category, next: Status) => {
    if (await action(`/categories/${c._id}/status`, { method: "PATCH", json: { status: next } })) list.reload();
  };

  const remove = async (c: Category) => {
    const ok = await confirm({
      title: `Delete "${c.name}"?`,
      text: "Categories with sub-categories or products cannot be deleted.",
      confirmText: "Yes, Delete",
    });
    if (ok && (await action(`/categories/${c._id}`, { method: "DELETE" }))) list.reload();
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader title="Categories" subtitle="Organise products into a category tree (up to 5 levels)">
        {canCreate && (
          <PrimaryButton onClick={() => setEditing("new")}>
            <CirclePlus className="mr-2 h-4 w-4" /> Add Category
          </PrimaryButton>
        )}
      </PageHeader>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <SearchBox value={search} onChange={setSearch} placeholder="Search by name or slug..." />
        <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        {list.loading && !list.data ? (
          <Spinner label="Loading categories..." />
        ) : list.error ? (
          <ErrorBox message={list.error} onRetry={list.reload} />
        ) : !list.data?.length ? (
          <EmptyState title="No categories found" text={search ? "No category matches your search." : "Create your first category to start adding products."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 font-bold tracking-wider whitespace-nowrap text-slate-500 uppercase">
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Path</th>
                  <th className="px-4 py-3.5">Products</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.data.map((c) => (
                  <tr key={c._id} className="transition hover:bg-slate-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3" style={{ paddingLeft: (c.level ?? 0) * 16 }}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          {c.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" />
                          ) : (
                            <FolderTree className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{c.name}</span>
                          <span className="font-mono text-slate-400">{c.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{c.path}</td>
                    <td className="px-4 py-4 font-semibold text-slate-700">
                      {c.productCount ?? 0}
                      {!!c.childrenCount && <span className="ml-1 text-slate-400">· {c.childrenCount} sub</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {canUpdate && <Toggle checked={c.status === "ACTIVE"} onChange={(v) => setCategoryStatus(c, v ? "ACTIVE" : "INACTIVE")} />}
                        <StatusPill value={c.status} />
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-500">{formatShortDate(c.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canUpdate && (
                          <button onClick={() => setEditing(c)} title="Edit" className="cursor-pointer p-1.5 text-slate-400 transition hover:text-amber-600">
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button onClick={() => remove(c)} title="Delete" className="cursor-pointer p-1.5 text-slate-400 transition hover:text-rose-600">
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
        {editing && (
          <CategoryForm
            key={editing === "new" ? "new" : editing._id}
            category={editing === "new" ? null : editing}
            parents={parents.data ?? []}
            onClose={() => setEditing(null)}
            onSaved={list.reload}
          />
        )}
      </Drawer>
    </div>
  );
}

function CategoryForm({ category, parents, onClose, onSaved }: { category: Category | null; parents: Category[]; onClose: () => void; onSaved: () => void }) {
  const action = useApiAction();
  const upload = useImageUpload();
  const [form, setForm] = useState({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    parentCategoryId: category?.parentCategoryId ?? "",
    imageUrl: category?.imageUrl ?? "",
    description: category?.description ?? "",
    status: category?.status ?? "ACTIVE",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // A category cannot be moved under itself.
  const parentOptions = parents.filter((p) => p._id !== category?._id);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const [url] = await upload([file], "categories");
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      toast.error(errorMessage(err, "Image upload failed"));
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Name is required.");
    setError("");
    setSaving(true);
    const body = { ...form, name: form.name.trim(), slug: form.slug.trim(), parentCategoryId: form.parentCategoryId || null, imageUrl: form.imageUrl || null };
    const res = category ? await action(`/categories/${category._id}`, { method: "PUT", json: body }) : await action("/categories", { method: "POST", json: body });
    setSaving(false);
    if (res) {
      onSaved();
      onClose();
    }
  };

  return (
    <form onSubmit={submit} className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="text-lg font-extrabold text-slate-900">{category ? "Edit Category" : "New Category"}</h2>
        <button type="button" onClick={onClose} className="cursor-pointer rounded-lg p-1 text-slate-400 hover:bg-slate-100">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Name *</span>
          <input className={inputClass} value={form.name} onChange={set("name")} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Slug</span>
          <input className={inputClass} value={form.slug} onChange={set("slug")} placeholder="Auto-generated from the name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Parent category</span>
          <select className={inputClass} value={form.parentCategoryId} onChange={set("parentCategoryId")}>
            <option value="">— None (root category) —</option>
            {parentOptions.map((p) => (
              <option key={p._id} value={p._id}>
                {p.path ?? p.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Image</span>
          <div className="flex items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              ) : form.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6 text-slate-300" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="cursor-pointer rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                Upload image
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
              {form.imageUrl && (
                <button type="button" onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))} className="cursor-pointer text-left text-xs font-semibold text-rose-500">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Description</span>
          <textarea className={inputClass} rows={3} value={form.description} onChange={set("description")} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Status</span>
          <select className={inputClass} value={form.status} onChange={set("status")}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
        <FieldError message={error} />
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
        <button type="button" onClick={onClose} className="cursor-pointer rounded-xl px-4 text-sm font-semibold text-slate-500 hover:bg-slate-100">
          Cancel
        </button>
        <PrimaryButton type="submit" loading={saving} disabled={uploading}>
          {category ? "Save Changes" : "Create Category"}
        </PrimaryButton>
      </div>
    </form>
  );
}
