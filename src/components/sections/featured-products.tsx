import { ProductGrid } from "@/components/cards/product-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { getFeaturedProducts } from "@/lib/queries";

/** Home-page featured products strip. */
export async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
      <SectionHeading
        eyebrow="Popular picks"
        title="Featured products"
        description="Hand-picked laptops, components and security gear our customers love."
        viewAllHref="/products"
      />
      <ProductGrid products={products} />
    </section>
  );
}
