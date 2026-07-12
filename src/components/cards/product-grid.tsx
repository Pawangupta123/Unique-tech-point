import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/cards/product-card";
import type { ProductWithCategory } from "@/lib/types";

/** Responsive grid of products with an empty state. */
export function ProductGrid({
  products,
  emptyMessage = "No products found. Try a different search or category.",
}: {
  products: ProductWithCategory[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <PackageSearch className="size-10 text-muted-foreground" />
        <p className="mt-3 max-w-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
