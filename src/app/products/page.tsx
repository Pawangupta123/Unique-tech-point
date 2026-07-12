import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FilterBar } from "@/components/products/filter-bar";
import { ProductGrid } from "@/components/cards/product-grid";
import { getProducts, getCategories, getBrands } from "@/lib/queries";
import type { ProductFilters } from "@/lib/types";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse laptops, desktops, custom PCs, printers, CCTV cameras, components and accessories at Unique Tech Point, Bhiwadi.",
  alternates: { canonical: "/products" },
};

type SP = Promise<{ [key: string]: string | string[] | undefined }>;

function str(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const filters: ProductFilters = {
    q: str(sp.q),
    category: str(sp.category),
    brand: str(sp.brand),
    stock: str(sp.stock) === "1",
  };

  const [products, categories, brands] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getBrands(),
  ]);

  const heading = filters.q ? `Results for “${filters.q}”` : "All products";

  return (
    <>
      <PageHeader
        title={heading}
        description="Everything IT for home and business — sales, service and support in Bhiwadi."
      >
        <FilterBar categories={categories} brands={brands} />
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <p className="mb-5 text-sm text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
