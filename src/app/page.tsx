import { Hero } from "@/components/sections/hero";
import { FeatureBar } from "@/components/sections/feature-bar";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/reveal";

/*
 * Home is a Server Component (it renders async, data-fetching sections like
 * FeaturedProducts). Client-only motion lives inside <Reveal> and the section
 * components, which are their own client components.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBar />

      <Reveal direction="up">
        <div className="perspective">
          <CategoryGrid />
        </div>
      </Reveal>

      <Reveal direction="left" className="stagger-children">
        <FeaturedProducts />
      </Reveal>

      <Reveal direction="up" className="overflow-hidden">
        <BrandStrip />
      </Reveal>

      <Reveal direction="right" className="stagger-children">
        <ServicesPreview />
      </Reveal>

      <Reveal direction="up">
        <Faq />
      </Reveal>

      <Reveal direction="up">
        <CtaBand />
      </Reveal>
    </>
  );
}
