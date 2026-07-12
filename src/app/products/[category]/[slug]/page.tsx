import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/cards/product-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { EnquiryDialog } from "@/components/contact/enquiry-dialog";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

type Params = Promise<{ category: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };

  const title = p.meta_title ?? p.title;
  const description =
    p.meta_description ?? p.short_description ?? `${p.title} available at ${site.name}, ${site.address.city}.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${p.category?.slug ?? "all"}/${p.slug}` },
    openGraph: { title, description, images: p.images.slice(0, 1) },
  };
}

const TRUST = [
  { icon: ShieldCheck, text: "Genuine product with warranty" },
  { icon: Store, text: "Buy in-store or get home delivery in Bhiwadi" },
];

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category?.slug, product.slug);
  const enquiryMsg = `Hi ${site.name}, I'm interested in "${product.title}". Please share price & availability.`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          ...(product.category
            ? [{ label: product.category.name, href: `/products/${product.category.slug}` }]
            : []),
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} icon={product.category?.slug} />

        <div>
          {product.brand && (
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </span>
          )}
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-brand-700">
              {formatPrice(product.price, product.price_label)}
            </span>
            {product.in_stock ? (
              <Badge className="bg-in-stock">In stock</Badge>
            ) : (
              <Badge variant="secondary">Out of stock</Badge>
            )}
          </div>

          {product.short_description && (
            <p className="mt-4 text-muted-foreground">{product.short_description}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" message={enquiryMsg} label="WhatsApp enquiry" />
            <CallButton size="lg" showNumber />
            <EnquiryDialog source="product" productId={product.id} subject={product.title} />
          </div>

          <ul className="mt-6 space-y-2">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-brand-700" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(product.description || product.specs) && (
        <div className="mt-12 max-w-3xl">
          <Separator className="mb-6" />
          {product.description && (
            <>
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 whitespace-pre-line text-muted-foreground">{product.description}</p>
            </>
          )}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Specifications</h2>
              <dl className="mt-3 divide-y rounded-lg border">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex gap-4 px-4 py-2.5 text-sm">
                    <dt className="w-40 shrink-0 font-medium text-muted-foreground">{k}</dt>
                    <dd className="flex items-center gap-1.5">
                      <Check className="size-3.5 text-in-stock" />
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading title="You may also like" />
          <ProductGrid products={related} />
        </div>
      )}
    </section>
  );
}
