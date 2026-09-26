"use client";

import { useState } from "react";
import { ImagePlus, Loader2, Star, X } from "lucide-react";
import { toast } from "sonner";
import { errorMessage, useImageUpload } from "../api";
import { labelClass } from "../ui";

const MAX_GALLERY = 10;
const MAX_SIZE = 5 * 1024 * 1024;

/**
 * Thumbnail + gallery editor. Files are uploaded to the backend straight away (POST /uploads/images)
 * and only their URLs are kept in the form.
 */
export function ProductImages({
  thumbnail,
  gallery,
  onChange,
}: {
  thumbnail: string;
  gallery: string[];
  onChange: (next: { thumbnail: string; gallery: string[] }) => void;
}) {
  const upload = useImageUpload();
  const [busy, setBusy] = useState<"thumbnail" | "gallery" | null>(null);

  const pick = (target: "thumbnail" | "gallery") => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    const tooBig = files.find((f) => f.size > MAX_SIZE);
    if (tooBig) return toast.error(`${tooBig.name} is larger than 5MB`);
    const room = target === "thumbnail" ? 1 : MAX_GALLERY - gallery.length;
    if (room <= 0) return toast.error(`A product can have at most ${MAX_GALLERY} gallery images`);

    setBusy(target);
    try {
      const urls = await upload(files.slice(0, room), "products");
      if (target === "thumbnail") onChange({ thumbnail: urls[0], gallery });
      else onChange({ thumbnail, gallery: [...gallery, ...urls] });
    } catch (err) {
      toast.error(errorMessage(err, "Image upload failed"));
    } finally {
      setBusy(null);
    }
  };

  const tile = "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className={labelClass}>Thumbnail *</span>
        <div className="flex items-center gap-3">
          <div className={tile}>
            {busy === "thumbnail" ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            ) : thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt="Thumbnail" className="h-full w-full object-cover" />
            ) : (
              <ImagePlus className="h-6 w-6 text-slate-300" />
            )}
          </div>
          <label className="cursor-pointer rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            {thumbnail ? "Replace" : "Upload"} thumbnail
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={pick("thumbnail")} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>
          Gallery ({gallery.length}/{MAX_GALLERY})
        </span>
        <div className="flex flex-wrap gap-3">
          {gallery.map((url) => (
            <div key={url} className={`${tile} group`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 flex justify-between p-1 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  title="Use as thumbnail"
                  onClick={() => onChange({ thumbnail: url, gallery })}
                  className="cursor-pointer rounded-full bg-white/90 p-1 text-amber-500 shadow"
                >
                  <Star className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="Remove"
                  onClick={() => onChange({ thumbnail, gallery: gallery.filter((g) => g !== url) })}
                  className="cursor-pointer rounded-full bg-white/90 p-1 text-rose-500 shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {gallery.length < MAX_GALLERY && (
            <label className={`${tile} cursor-pointer border-dashed hover:bg-slate-100`}>
              {busy === "gallery" ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : <ImagePlus className="h-6 w-6 text-slate-400" />}
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={pick("gallery")} />
            </label>
          )}
        </div>
        <p className="text-[11px] text-slate-400">JPG, PNG, WEBP or GIF, up to 5MB each.</p>
      </div>
    </div>
  );
}

/** One image uploaded to the backend straight away; the form keeps only its URL. */
export function SingleImageField({
  label,
  value,
  onChange,
  folder,
  hint,
  wide,
  removable = true,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: "banners" | "brands" | "site" | "categories";
  hint?: string;
  /** Landscape preview (banners) instead of a square one. */
  wide?: boolean;
  removable?: boolean;
}) {
  const upload = useImageUpload();
  const [busy, setBusy] = useState(false);

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_SIZE) return toast.error(`${file.name} is larger than 5MB`);
    setBusy(true);
    try {
      const [url] = await upload([file], folder);
      onChange(url);
    } catch (err) {
      toast.error(errorMessage(err, "Image upload failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 ${wide ? "aspect-[16/7] w-full" : "h-24 w-24"}`}>
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
        ) : value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={`h-full w-full ${wide ? "object-cover" : "object-contain"}`} />
        ) : (
          <ImagePlus className="h-6 w-6 text-slate-300" />
        )}
      </div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          {value ? "Replace" : "Upload"} image
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={pick} />
        </label>
        {value && removable && (
          <button type="button" onClick={() => onChange("")} className="cursor-pointer text-xs font-semibold text-rose-500">
            Remove
          </button>
        )}
      </div>
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}
