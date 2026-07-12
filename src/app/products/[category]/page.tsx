import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/cards/product-grid";
import { JsonLd } from "@/components/json-ld";
import { getCategoryBySlug, getProducts } from "@/lib/queries";
import { breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = Promise<{ category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Category not found" };

  return {
    title: `${cat.name} in ${site.address.city}`,
    description:
      cat.description ?? `Shop ${cat.name} at ${site.name}, ${site.address.city}.`,
    alternates: { canonical: `/products/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const products = await getProducts({ category: cat.slug });

  return (
    <>
      <PageHeader title={cat.name} description={cat.description ?? undefined} />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <JsonLd
          data={breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: cat.name, path: `/products/${cat.slug}` },
          ])}
        />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: cat.name },
          ]}
        />
        <ProductGrid
          products={products}
          emptyMessage={`No ${cat.name.toLowerCase()} listed yet — WhatsApp us for current stock.`}
        />
      </section>
    </>
  );
}
