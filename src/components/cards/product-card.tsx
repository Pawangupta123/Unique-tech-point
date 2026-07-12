"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/cards/product-image";
import { WhatsAppButton } from "@/components/contact/contact-actions";
import { productHref } from "@/lib/links";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import type { ProductWithCategory } from "@/lib/types";
import { useRef, useState } from "react";

/** Reusable product card with 3D tilt & enhanced animations. */
export function ProductCard({ product }: { product: ProductWithCategory }) {
  const href = productHref(product);
  const priceText = formatPrice(product.price, product.price_label);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all perspective"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            padding: "1px",
            background: "linear-gradient(135deg, var(--brand-500), var(--brand-700), #a855f7)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>

      <Link href={href} className="relative block">
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          icon={product.category?.slug}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {!product.in_stock && (
          <Badge variant="secondary" className="absolute left-2 top-2">
            Out of stock
          </Badge>
        )}
        {product.featured && product.in_stock && (
          <Badge className="absolute left-2 top-2 bg-gradient-to-r from-brand-600 to-brand-700">Featured</Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-brand-600">
            {product.brand}
          </span>
        )}
        <Link href={href} className="mt-1">
          <h3 className="line-clamp-2 font-semibold leading-snug transition-colors duration-300 group-hover:text-brand-700">
            {product.title}
          </h3>
        </Link>
        {product.short_description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {product.short_description}
          </p>
        )}
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="text-lg font-bold text-foreground group-hover:text-brand-700 transition-colors duration-300">{priceText}</span>
        </div>
        <div className="mt-3">
          <WhatsAppButton
            size="sm"
            className="w-full magnetic-btn ripple-container"
            label="Enquire"
            message={`Hi ${site.name}, I'm interested in "${product.title}". Please share details.`}
          />
        </div>
      </div>
    </div>
  );
}
