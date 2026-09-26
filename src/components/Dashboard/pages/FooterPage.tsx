"use client";

import { useState } from "react";
import { CirclePlus, Trash, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SOCIAL_NETWORKS, type FooterSettings } from "@/lib/backend-types";
import { useApiAction, useApiQuery } from "../api";
import { ErrorBox, FieldError, PageHeader, PrimaryButton, Spinner, inputClass, labelClass } from "../ui";
import { SingleImageField } from "./ProductMedia";

const MAX_COLUMNS = 6;
const MAX_LINKS = 12;

export default function FooterPage() {
  const footer = useApiQuery<FooterSettings>("/settings/footer");
  if (footer.error) return <ErrorBox message={footer.error} onRetry={footer.reload} />;
  if (!footer.data) return <Spinner label="Loading footer..." />;
  return <FooterForm initial={footer.data} />;
}

function FooterForm({ initial }: { initial: FooterSettings }) {
  const { hasPermission } = useAuth();
  const action = useApiAction();
  const [form, setForm] = useState<FooterSettings>(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const readOnly = !hasPermission("settings.update");

  const card = "flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs";
  const setColumns = (fn: (cols: FooterSettings["columns"]) => FooterSettings["columns"]) => setForm((f) => ({ ...f, columns: fn(f.columns) }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const badLink = form.columns.flatMap((c) => c.links).find((l) => l.url && !l.url.startsWith("/") && !/^https?:\/\//i.test(l.url) && !/^(mailto|tel):/i.test(l.url));
    if (form.columns.some((c) => !c.title.trim())) return setError("Every column needs a title.");
    if (form.columns.some((c) => c.links.some((l) => !l.label.trim() || !l.url.trim()))) return setError("Every link needs a label and a URL.");
    if (badLink) return setError(`Link "${badLink.label}" must start with "/" or http(s)://`);
    setError("");
    setSaving(true);
    const res = await action<FooterSettings>("/settings/footer", { method: "PUT", json: form }, "Footer saved");
    setSaving(false);
    if (res) setForm(res.data);
  };

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-6">
      <PageHeader title="Footer" subtitle="Website footer: logo, about text, contact details, social links and link columns. Empty fields are hidden.">
        {!readOnly && (
          <PrimaryButton type="submit" loading={saving}>
            Save Footer
          </PrimaryButton>
        )}
      </PageHeader>
      <FieldError message={error} />

      <fieldset disabled={readOnly} className="grid gap-6 lg:grid-cols-2">
        <section className={card}>
          <h2 className="text-sm font-extrabold text-slate-900">Brand</h2>
          <SingleImageField label="Footer logo" value={form.logoUrl} onChange={(logoUrl) => setForm((f) => ({ ...f, logoUrl }))} folder="site" hint="Leave empty to use the default logo." />
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>About text</span>
            <textarea className={inputClass} rows={3} value={form.aboutText} onChange={(e) => setForm((f) => ({ ...f, aboutText: e.target.value }))} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Copyright text</span>
            <input className={inputClass} value={form.copyrightText} placeholder="© 2026 GlobalShelfBD. All rights reserved." onChange={(e) => setForm((f) => ({ ...f, copyrightText: e.target.value }))} />
          </label>
        </section>

        <section className={card}>
          <h2 className="text-sm font-extrabold text-slate-900">Contact</h2>
          {(["phone", "email", "address"] as const).map((k) => (
            <label key={k} className="flex flex-col gap-1.5">
              <span className={`${labelClass} capitalize`}>{k}</span>
              <input className={inputClass} value={form.contact[k]} onChange={(e) => setForm((f) => ({ ...f, contact: { ...f.contact, [k]: e.target.value } }))} />
            </label>
          ))}
        </section>

        <section className={`${card} lg:col-span-2`}>
          <h2 className="text-sm font-extrabold text-slate-900">Social links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIAL_NETWORKS.map((k) => (
              <label key={k} className="flex flex-col gap-1.5">
                <span className={`${labelClass} capitalize`}>{k}</span>
                <input
                  className={inputClass}
                  value={form.socialLinks[k] ?? ""}
                  placeholder={k === "whatsapp" ? "https://wa.me/8801..." : `https://${k}.com/...`}
                  onChange={(e) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [k]: e.target.value } }))}
                />
              </label>
            ))}
          </div>
        </section>

        <section className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900">
              Link columns ({form.columns.length}/{MAX_COLUMNS})
            </h2>
            {!readOnly && form.columns.length < MAX_COLUMNS && (
              <button type="button" onClick={() => setColumns((c) => [...c, { title: "", links: [{ label: "", url: "" }] }])} className="flex cursor-pointer items-center gap-1 text-xs font-bold text-blue-600">
                <CirclePlus className="h-4 w-4" /> Add column
              </button>
            )}
          </div>
          {!form.columns.length && <p className="text-xs text-slate-400">No columns. The website shows its default links until you add some.</p>}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {form.columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-2 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <input
                    className={inputClass}
                    value={col.title}
                    placeholder="Column title"
                    onChange={(e) => setColumns((cols) => cols.map((c, i) => (i === ci ? { ...c, title: e.target.value } : c)))}
                  />
                  {!readOnly && (
                    <button type="button" title="Remove column" onClick={() => setColumns((cols) => cols.filter((_, i) => i !== ci))} className="cursor-pointer p-1.5 text-slate-400 hover:text-rose-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {col.links.map((l, li) => {
                  const setLink = (patch: Partial<typeof l>) =>
                    setColumns((cols) => cols.map((c, i) => (i === ci ? { ...c, links: c.links.map((x, j) => (j === li ? { ...x, ...patch } : x)) } : c)));
                  return (
                    <div key={li} className="flex items-center gap-1.5">
                      <input className={`${inputClass} py-2 text-xs`} value={l.label} placeholder="Label" onChange={(e) => setLink({ label: e.target.value })} />
                      <input className={`${inputClass} py-2 text-xs`} value={l.url} placeholder="/shop" onChange={(e) => setLink({ url: e.target.value })} />
                      {!readOnly && (
                        <button
                          type="button"
                          title="Remove link"
                          onClick={() => setColumns((cols) => cols.map((c, i) => (i === ci ? { ...c, links: c.links.filter((_, j) => j !== li) } : c)))}
                          className="cursor-pointer p-1 text-slate-400 hover:text-rose-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
                {!readOnly && col.links.length < MAX_LINKS && (
                  <button
                    type="button"
                    onClick={() => setColumns((cols) => cols.map((c, i) => (i === ci ? { ...c, links: [...c.links, { label: "", url: "" }] } : c)))}
                    className="cursor-pointer self-start text-xs font-bold text-blue-600"
                  >
                    + Add link
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </fieldset>
    </form>
  );
}
