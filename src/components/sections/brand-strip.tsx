import { BRANDS } from "@/lib/constants";

/** Animated infinite marquee strip of brands the shop stocks. */
export function BrandStrip() {
  // Duplicate brands for seamless infinite scroll
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="border-y bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Brands we deal in
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

        <div
          className="flex gap-x-12 gap-y-4 items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {marqueeBrands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-xl font-bold text-muted-foreground/60 transition-all duration-300 hover:text-foreground hover:scale-110 cursor-default select-none whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
