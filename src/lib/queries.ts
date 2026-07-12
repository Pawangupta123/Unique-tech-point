/**
 * Data-access layer. Today it reads from sample-data + constants; in Phase 1
 * the internals are swapped for Supabase queries WITHOUT changing these
 * signatures, so pages/components never change. All functions are async so the
 * call sites already `await` (matching the future Supabase client).
 */
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import type {
  Category,
  ProductWithCategory,
  ProductFilters,
  Service,
} from "@/lib/types";

const categoryMeta = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

function toProductWithCategory(
  p: (typeof SAMPLE_PRODUCTS)[number],
): ProductWithCategory {
  const cat = categoryMeta(p.categorySlug);
  const { categorySlug: _omit, ...rest } = p;
  void _omit;
  return {
    ...rest,
    category: cat ? { name: cat.name, slug: cat.slug } : null,
  };
}

const ALL = SAMPLE_PRODUCTS.map(toProductWithCategory);

/* ----------------------------- Categories ----------------------------- */

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES.map((c, i) => ({
    id: i + 1,
    name: c.name,
    slug: c.slug,
    description: c.description,
    icon: c.icon,
    sort_order: i,
    created_at: "",
  }));
}

export async function getCategoryBySlug(slug: string) {
  return (await getCategories()).find((c) => c.slug === slug) ?? null;
}

/* ------------------------------ Products ------------------------------ */

export async function getFeaturedProducts(limit = 6): Promise<ProductWithCategory[]> {
  return ALL.filter((p) => p.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  return ALL.find((p) => p.slug === slug) ?? null;
}

export async function getBrands(): Promise<string[]> {
  return [...new Set(ALL.map((p) => p.brand).filter(Boolean) as string[])].sort();
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductWithCategory[]> {
  const { q, category, brand, stock } = filters;
  const needle = q?.trim().toLowerCase();

  return ALL.filter((p) => {
    if (category && p.category?.slug !== category) return false;
    if (brand && p.brand !== brand) return false;
    if (stock && !p.in_stock) return false;
    if (needle) {
      const hay = [p.title, p.brand, p.short_description, p.category?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
}

/** Products within a category, for related lists on the detail page. */
export async function getRelatedProducts(
  categorySlug: string | undefined,
  excludeSlug: string,
  limit = 4,
): Promise<ProductWithCategory[]> {
  return ALL.filter(
    (p) => p.category?.slug === categorySlug && p.slug !== excludeSlug,
  ).slice(0, limit);
}

/* ------------------------------ Services ------------------------------ */

export async function getServices(): Promise<Service[]> {
  return SERVICES.map((s, i) => ({
    id: i + 1,
    title: s.title,
    slug: s.slug,
    description: s.description,
    short_description: s.shortDescription,
    icon: s.icon,
    image: null,
    price_label: s.priceLabel,
    featured: i < 2,
    sort_order: i,
    meta_title: null,
    meta_description: null,
    created_at: "",
    updated_at: "",
  }));
}

export async function getServiceBySlug(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}
