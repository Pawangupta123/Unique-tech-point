import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { CATEGORIES } from "@/lib/constants";

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
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-600 transition-transform duration-200 group-hover:scale-x-100" />
            <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 transition-colors group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white">
              <Icon name={cat.icon} className="size-6" />
            </div>
            <div className="mt-4">
              <h3 className="flex items-center gap-1 font-semibold">
                {cat.name}
                <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
