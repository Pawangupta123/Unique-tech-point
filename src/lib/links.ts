/** Single source of truth for internal URL construction. */
import type { ProductWithCategory } from "@/lib/types";

export function categoryHref(slug: string): string {
  return `/products/${slug}`;
}

export function productHref(
  product: Pick<ProductWithCategory, "slug" | "category">,
): string {
  const cat = product.category?.slug ?? "all";
  return `/products/${cat}/${product.slug}`;
}

export function serviceHref(slug: string): string {
  return `/services/${slug}`;
}
