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
import { JsonLd } from "@/components/json-ld";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { productLd, breadcrumbLd } from "@/lib/seo";
import { productHref } from "@/lib/links";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

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
  const href = productHref(product);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <JsonLd
        data={[
          productLd(product, href),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            ...(product.category
              ? [{ name: product.category.name, path: `/products/${product.category.slug}` }]
              : []),
            { name: product.title, path: href },
          ]),
        ]}
      />
      <Reveal direction="left">
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
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal direction="right" className="perspective">
          <ProductGallery images={product.images} alt={product.title} icon={product.category?.slug} />
        </Reveal>

        <div className="space-y-6">
          <Reveal direction="left" delay={100}>
            {product.brand && (
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-brand-600">
                {product.brand}
              </span>
            )}
          </Reveal>

          <Reveal direction="left" delay={150}>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>
          </Reveal>

          <Reveal direction="left" delay={200}>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-bold text-brand-700">{formatPrice(product.price, product.price_label)}</span>
              {product.in_stock ? (
                <Badge className="bg-in-stock animate-pulse-glow">In stock</Badge>
              ) : (
                <Badge variant="secondary">Out of stock</Badge>
              )}
            </div>
          </Reveal>

          <Reveal direction="left" delay={250}>
            {product.short_description && (
              <p className="text-muted-foreground transition-colors hover:text-foreground/70">{product.short_description}</p>
            )}
          </Reveal>

          <Reveal direction="left" delay={300}>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton size="lg" message={enquiryMsg} label="WhatsApp enquiry" />
              <CallButton size="lg" showNumber className="magnetic-btn" />
              <EnquiryDialog source="product" productId={product.id} subject={product.title} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={400}>
            <ul className="space-y-2">
              {TRUST.map(({ icon: Icon, text }, i) => (
                <li key={text} className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-foreground">
                  <Icon className="size-4 text-brand-700 transition-transform duration-300 hover:scale-125" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {(product.description || product.specs) && (
        <Reveal direction="up" delay={200}>
          <div className="mt-12 max-w-3xl">
            <Separator className="mb-6" />
            {product.description && (
              <>
                <h2 className="text-lg font-semibold text-foreground">
                  Description
                </h2>
                <p className="mt-2 whitespace-pre-line text-muted-foreground transition-colors hover:text-foreground/70">{product.description}</p>
              </>
            )}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Specifications
                </h2>
                <dl className="mt-3 divide-y rounded-lg border transition-all duration-300 hover:border-brand-300 hover:shadow-md">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex gap-4 px-4 py-2.5 text-sm transition-colors hover:bg-brand-50/30">
                      <dt className="w-40 shrink-0 font-medium text-muted-foreground">{k}</dt>
                      <dd className="flex items-center gap-1.5">
                        <Check className="size-3.5 text-in-stock transition-transform duration-300 hover:scale-125" />
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {related.length > 0 && (
        <Reveal direction="up" delay={300}>
          <div className="mt-16">
            <SectionHeading title="You may also like" />
            <div className="stagger-children">
              <ProductGrid products={related} />
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
