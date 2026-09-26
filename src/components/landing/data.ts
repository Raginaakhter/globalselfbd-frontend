// Storefront content: static copy in @/lib/site-content, live categories and products from the backend
// public API (@/lib/storefront for the shapes, @/context/SiteContext (useSite) to read site content).

export type { StoreProduct as Product } from "@/lib/storefront";
export type { Category } from "@/lib/site-types";
