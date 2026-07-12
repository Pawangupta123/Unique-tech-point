import type { MetadataRoute } from "next";
import { getCategories, getProducts, getServices } from "@/lib/queries";
import { productHref } from "@/lib/links";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${site.url}${path}`;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/products"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: url("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [categories, products, services] = await Promise.all([
    getCategories(),
    getProducts(),
    getServices(),
  ]);

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/products/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(productHref(p)),
    lastModified: new Date(p.updated_at || now),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...servicePages];
}
