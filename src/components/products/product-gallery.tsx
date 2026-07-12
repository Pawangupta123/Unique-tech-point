"use client";

import { useState, useRef } from "react";
import { ProductImage } from "@/components/cards/product-image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

/** Premium product image gallery with zoom, swipe, smooth transitions & animated thumbnails. */
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
  const [zoom, setZoom] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current || !zoom) return;
    const rect = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  };

  return (
    <div className="space-y-3">
      {/* Main image container */}
      <div
        ref={mainRef}
        className="group relative overflow-hidden rounded-xl border bg-muted cursor-zoom-in"
        style={{
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (zoom) setZoom(false);
        }}
        onClick={() => setZoom(!zoom)}
      >
        {/* Image with smooth transition */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage
            src={images[active]}
            alt={alt}
            icon={icon}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-full w-full object-cover transition-all duration-500 ease-out"
            style={{
              transform: zoom
                ? `scale(2) translate(-${(hoverPos.x - 50) * 0.5}%, -${(hoverPos.y - 50) * 0.5}%)`
                : "scale(1)",
            }}
          />
        </div>

        {/* Zoom indicator */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(!zoom);
            }}
            className="flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
          >
            {zoom ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
          </button>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-black/70 group-hover:opacity-100 flex items-center justify-center"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-black/70 group-hover:opacity-100 flex items-center justify-center"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
          {active + 1} / {images.length}
        </div>

        {/* Hover glow effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 60px rgba(59, 130, 246, 0.1)`,
          }}
        />
      </div>

      {/* Thumbnail strip with animated selection */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300",
                "hover:scale-105 hover:shadow-md",
                i === active
                  ? "border-brand-600 shadow-md shadow-brand-500/20 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <div className="relative aspect-[4/3] w-16">
                <ProductImage src={src} alt="" icon={icon} sizes="64px" />
              </div>
              {/* Active indicator bar */}
              {i === active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
