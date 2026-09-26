/* eslint-disable @next/next/no-img-element */
import type { StoreCategory } from "@/lib/storefront";

// Category image from the backend, or its initial on a tinted tile when it has no image.
export default function CategoryIcon({ category, className = "w-9 h-9 rounded-lg text-sm" }: { category: StoreCategory; className?: string }) {
  return (
    <span className={`shrink-0 overflow-hidden flex items-center justify-center bg-blue-50 font-black text-blue-700 ${className}`}>
      {category.imageUrl ? <img src={category.imageUrl} alt="" className="w-full h-full object-cover" /> : category.name.charAt(0).toUpperCase()}
    </span>
  );
}
