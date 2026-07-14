import type { MetadataRoute } from "next";
import { getCategories, getProducts, getServices } from "@/lib/queries";
import { productHref } from "@/lib/links";
import { site } from "@/lib/site";

// Stable date-only lastmod (a per-request `new Date()` makes the sitemap look
// like it changes on every fetch, which parsers dislike). Products use their
// real updated_at; everything else uses this reference date.
const LASTMOD = "2026-07-14";
const dateOnly = (iso?: string | null) => (iso ? iso.slice(0, 10) : LASTMOD);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${site.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: LASTMOD, changeFrequency: "weekly", priority: 1 },
    { url: url("/products"), lastModified: LASTMOD, changeFrequency: "daily", priority: 0.9 },
    { url: url("/services"), lastModified: LASTMOD, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/about"), lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [categories, products, services] = await Promise.all([
    getCategories(),
    getProducts(),
    getServices(),
  ]);

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/products/${c.slug}`),
    lastModified: LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(productHref(p)),
    lastModified: dateOnly(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...servicePages];
}
