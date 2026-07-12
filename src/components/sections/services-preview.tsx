import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { SERVICES } from "@/lib/constants";

/** Home-page services teaser, driven by the canonical SERVICES list. */
export function ServicesPreview() {
  return (
    <section className="border-y bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <SectionHeading
          eyebrow="Our services"
          title="Beyond the counter — we install & support"
          description="Repairs, CCTV installation, networking and annual maintenance for homes and offices."
          viewAllHref="/services"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.slug}
              service={{
                title: service.title,
                slug: service.slug,
                shortDescription: service.shortDescription,
                icon: service.icon,
                priceLabel: service.priceLabel,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
