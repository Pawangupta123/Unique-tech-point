import { BRANDS } from "@/lib/constants";

/** Understated strip of brand names the shop stocks. */
export function BrandStrip() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Brands we deal in
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
