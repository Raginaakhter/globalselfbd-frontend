/* eslint-disable @next/next/no-img-element */
import { Package } from "lucide-react";

// Shows the product photo, or a neutral placeholder when the product has none.
export default function ProductImage({ image, alt, className = "" }: { image?: string | null; alt: string; className?: string }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" className={`w-full h-full object-contain ${className}`} />;
  }
  return <Package className="w-1/3 h-1/3 text-slate-300" aria-hidden="true" />;
}
