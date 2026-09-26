"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

/* eslint-disable @next/next/no-img-element */
export default function ProductGallery({ images, alt, discountPercent }: { images: string[]; alt: string; discountPercent: number }) {
  const unique = [...new Set(images)];
  const [active, setActive] = useState(unique[0] ?? null);

  return (
    <div>
      <div className="relative aspect-square rounded-3xl bg-slate-50 flex items-center justify-center overflow-hidden">
        {discountPercent > 0 && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black">{discountPercent}% OFF</span>
        )}
        <ProductImage image={active} alt={alt} />
      </div>
      {unique.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-3">
          {unique.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(src)}
              aria-label="Show image"
              className={`aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 cursor-pointer ${active === src ? "border-brand-600" : "border-slate-200 hover:border-brand-300"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
