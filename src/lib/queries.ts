/**
 * Data-access layer. Reads from Supabase when it's configured, otherwise falls
 * back to the in-memory sample catalog so the site always renders. Categories
 * and services live in constants.ts (single source of truth).
 */
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Category,
  Product,
  ProductWithCategory,
  ProductFilters,
  Service,
} from "@/lib/types";

/** Attach the category name/slug (from constants) to a product row. */
function withCategory(p: Product): ProductWithCategory {
  const cat = CATEGORIES.find((c) => c.slug === p.category_slug);
  return { ...p, category: cat ? { name: cat.name, slug: cat.slug } : null };
}

const SAMPLE = SAMPLE_PRODUCTS.map(withCategory);

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

export async function getFeaturedProducts(limit = 8): Promise<ProductWithCategory[]> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data) return data.map(withCategory);
  }
  return SAMPLE.filter((p) => p.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
    return data ? withCategory(data) : null;
  }
  return SAMPLE.find((p) => p.slug === slug) ?? null;
}

export async function getBrands(): Promise<string[]> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("products").select("brand");
    if (data) {
      return [...new Set(data.map((r) => r.brand).filter(Boolean) as string[])].sort();
    }
  }
  return [...new Set(SAMPLE.map((p) => p.brand).filter(Boolean) as string[])].sort();
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductWithCategory[]> {
  const { q, category, brand, stock } = filters;

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    let query = supabase.from("products").select("*");
    if (category) query = query.eq("category_slug", category);
    if (brand) query = query.eq("brand", brand);
    if (stock) query = query.eq("in_stock", true);
    if (q?.trim()) query = query.textSearch("search_tsv", q.trim(), { type: "websearch" });
    const { data } = await query.order("created_at", { ascending: false });
    if (data) return data.map(withCategory);
  }

  const needle = q?.trim().toLowerCase();
  return SAMPLE.filter((p) => {
    if (category && p.category_slug !== category) return false;
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

export async function getRelatedProducts(
  categorySlug: string | null | undefined,
  excludeSlug: string,
  limit = 4,
): Promise<ProductWithCategory[]> {
  if (!categorySlug) return [];
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_slug", categorySlug)
      .neq("slug", excludeSlug)
      .limit(limit);
    if (data) return data.map(withCategory);
  }
  return SAMPLE.filter(
    (p) => p.category_slug === categorySlug && p.slug !== excludeSlug,
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
