"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { useSite } from "@/context/SiteContext";
import type { Brand } from "@/lib/backend-types";

// Scroll time per brand: the loop length grows with the number of brands so the speed stays constant.
const SECONDS_PER_BRAND = 4;

function BrandTile({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  const content = (
    <>
      <img src={brand.logoUrl} alt={brand.name} loading="lazy" className="h-10 w-auto max-w-[120px] object-contain" />
      <span className="text-sm font-black tracking-wide text-navy-600 whitespace-nowrap">{brand.name}</span>
    </>
  );
  const className =
    "flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-brand-50 hover:border-brand-300 transition-colors";
  if (!brand.link) return <span aria-hidden={hidden} className={className}>{content}</span>;
  return /^https?:\/\//i.test(brand.link) ? (
    <a href={brand.link} target="_blank" rel="noreferrer" aria-hidden={hidden} tabIndex={hidden ? -1 : undefined} className={className} title={brand.description || brand.name}>
      {content}
    </a>
  ) : (
    <Link href={brand.link} aria-hidden={hidden} tabIndex={hidden ? -1 : undefined} className={className} title={brand.description || brand.name}>
      {content}
    </Link>
  );
}

/** Shop Top Brands, from the brands starred in the dashboard (GET /api/public/brands?featured=true). */
export default function BrandsMarquee() {
  const { brands } = useSite();
  if (brands.length === 0) return null;

  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...brands, ...brands];

  return (
    <section id="brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 scroll-mt-32">
      <SectionHeading title="Shop Top Brands" bn="বিশ্বসেরা ব্র্যান্ডগুলো এক জায়গায়" linkLabel="Shop all" />
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: `${Math.max(brands.length * SECONDS_PER_BRAND, 30)}s` }}
        >
          {loop.map((b, i) => (
            <BrandTile key={`${b._id}-${i}`} brand={b} hidden={i >= brands.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
