import { getMockSiteData } from "@/lib/mockData";
import { type SiteData } from "@/lib/site-types";

/** Server-side helper: load storefront content directly from mock data. */
export async function fetchSite(): Promise<SiteData> {
  return getMockSiteData();
}

