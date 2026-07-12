"use client";

import { useState } from "react";
import { ProductImage } from "@/components/cards/product-image";
import { cn } from "@/lib/utils";

/** Product image gallery with a main image + thumbnail strip (falls back to a
 * branded placeholder when no photos are uploaded yet). */
export function ProductGallery({
  images,
  alt,
  icon,
}: {
  images: string[];
  alt: string;
  icon?: string | null;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <ProductImage
        src={images[active]}
        alt={alt}
        icon={icon}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="rounded-xl border"
      />
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative size-16 overflow-hidden rounded-lg border",
                i === active ? "ring-2 ring-brand-600" : "opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage src={src} alt="" icon={icon} sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
