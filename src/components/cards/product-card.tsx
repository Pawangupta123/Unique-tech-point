import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/cards/product-image";
import { WhatsAppButton } from "@/components/contact/contact-actions";
import { productHref } from "@/lib/links";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import type { ProductWithCategory } from "@/lib/types";

/** Reusable product card for grids across the site. */
export function ProductCard({ product }: { product: ProductWithCategory }) {
  const href = productHref(product);
  const priceText = formatPrice(product.price, product.price_label);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100">
      <Link href={href} className="relative block">
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          icon={product.category?.slug}
        />
        {!product.in_stock && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            Out of stock
          </Badge>
        )}
        {product.featured && product.in_stock && (
          <Badge className="absolute left-2 top-2 bg-brand-700">Featured</Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </span>
        )}
        <Link href={href} className="mt-1">
          <h3 className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-brand-700">
            {product.title}
          </h3>
        </Link>
        {product.short_description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {product.short_description}
          </p>
        )}
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="text-lg font-bold text-foreground">{priceText}</span>
        </div>
        <div className="mt-3">
          <WhatsAppButton
            size="sm"
            className="w-full"
            label="Enquire"
            message={`Hi ${site.name}, I'm interested in "${product.title}". Please share details.`}
          />
        </div>
      </div>
    </div>
  );
}
