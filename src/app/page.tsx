import { Hero } from "@/components/sections/hero";
import { FeatureBar } from "@/components/sections/feature-bar";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

/*
 * Home is a Server Component. Sections render directly (always visible) — the
 * hero carries a subtle CSS entrance animation; hover/transition polish lives
 * inside each section. No scroll-reveal wrappers here, so content can never be
 * left hidden.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStrip />
      <ServicesPreview />
      <Faq />
      <CtaBand />
    </>
  );
}
