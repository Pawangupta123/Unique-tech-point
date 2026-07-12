"use client";

import { useEffect, useRef, useState } from "react";

/** Parallax image that moves at a different scroll speed. */
export function ParallaxImage({
  src,
  alt,
  fill,
  className = "",
  speed = 0.3,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const diff = (center - viewportCenter) * speed;
      setOffset(diff);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  if (fill) {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `translateY(${offset}px) scale(1.1)` }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset * 0.3}px)` }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
}
