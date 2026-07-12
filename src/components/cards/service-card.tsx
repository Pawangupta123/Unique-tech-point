"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export type ServiceCardData = {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  priceLabel?: string;
};

/** Reusable service card with 3D tilt & enhanced animations. */
export function ServiceCard({
  service,
  className,
}: {
  service: ServiceCardData;
  className?: string;
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
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border bg-card p-6 perspective",
        "transition-all duration-300",
        className,
      )}
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
            background: "linear-gradient(135deg, var(--brand-500), #a855f7, var(--brand-600))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Icon with glow */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-lg"
          style={{
            background: "linear-gradient(135deg, var(--brand-500), #a855f7)",
          }}
        />
        <div className="relative flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-all duration-500 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-500/30">
          <Icon name={service.icon} className="size-6 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
        </div>
      </div>

      <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-brand-700">{service.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
        {service.shortDescription}
      </p>

      <div className="mt-4 flex items-center justify-between">
        {service.priceLabel && (
          <Badge variant="secondary" className="font-medium transition-all duration-300 group-hover:bg-brand-50 group-hover:text-brand-700">
            {service.priceLabel}
          </Badge>
        )}
        <span className="ml-auto flex items-center gap-1 text-sm font-medium text-brand-700 transition-all duration-300 group-hover:gap-2">
          Learn more
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>

      {/* Hover line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-full" />
    </Link>
  );
}
