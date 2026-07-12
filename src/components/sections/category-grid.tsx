"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { CATEGORIES } from "@/lib/constants";
import { useRef, useState } from "react";

/** 3D tilt category card */
function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY, scale: 1.03 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/products/${cat.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 perspective"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
      }}
    >
      {/* Animated gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: "1px",
            background: "linear-gradient(135deg, var(--brand-500), var(--brand-700), #a855f7)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Top accent bar with spring animation */}
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-purple-500 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-x-100"
        style={{ transformOrigin: "left center" }}
      />

      {/* Shimmer effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>

      {/* Icon with glow */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-lg"
          style={{
            background: "linear-gradient(135deg, var(--brand-500), #a855f7)",
          }}
        />
        <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/30">
          <Icon name={cat.icon} className="size-6 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="flex items-center gap-1 font-semibold">
          {cat.name}
          <ArrowUpRight className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
          {cat.description}
        </p>
      </div>

      {/* Corner decoration */}
      <div className="absolute -bottom-2 -right-2 size-16 rounded-full bg-brand-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );
}

/** Grid of shop categories, driven by the canonical CATEGORIES list. */
export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
      <SectionHeading
        eyebrow="Shop by category"
        title="Everything IT, under one roof"
        description="From a single cable to a complete gaming rig or office CCTV setup."
        viewAllHref="/products"
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.slug} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
