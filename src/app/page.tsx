import { Hero } from "@/components/sections/hero";
import { FeatureBar } from "@/components/sections/feature-bar";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <Reveal>
        <CategoryGrid />
      </Reveal>
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <BrandStrip />
      </Reveal>
      <Reveal>
        <ServicesPreview />
      </Reveal>
      <Reveal>
        <CtaBand />
      </Reveal>
    </>
  );
}
