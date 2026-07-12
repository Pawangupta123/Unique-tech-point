import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { EnquiryDialog } from "@/components/contact/enquiry-dialog";
import { ServiceCard } from "@/components/cards/service-card";
import { JsonLd } from "@/components/json-ld";
import { getServiceBySlug, getServices } from "@/lib/queries";
import { serviceLd, breadcrumbLd } from "@/lib/seo";
import { serviceHref } from "@/lib/links";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.title} in ${site.address.city}`,
    description: s.meta_description ?? s.short_description ?? s.description ?? undefined,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const others = (await getServices()).filter((s) => s.slug !== service.slug).slice(0, 3);
  const msg = `Hi ${site.name}, I need "${service.title}". Please help.`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <JsonLd
        data={[
          serviceLd(service, serviceHref(service.slug)),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: serviceHref(service.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <div className="rounded-2xl border bg-linear-to-br from-brand-50 to-white p-6 sm:p-10">
        <div className="flex size-14 items-center justify-center rounded-xl bg-brand-700 text-white">
          <Icon name={service.icon} className="size-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">{service.title}</h1>
        {service.price_label && (
          <p className="mt-2 font-medium text-brand-700">{service.price_label}</p>
        )}
        {service.description && (
          <p className="mt-4 max-w-2xl whitespace-pre-line text-muted-foreground">
            {service.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton size="lg" message={msg} label="WhatsApp us" />
          <CallButton size="lg" showNumber />
          <EnquiryDialog source="service" serviceId={service.id} subject={service.title} />
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Why choose {site.name}?</h2>
          <ul className="mt-4 space-y-3">
            {[
              `Local team based in ${site.address.city} — quick on-site response`,
              "Trained technicians and genuine parts",
              "Transparent pricing and free advice",
              "Support for homes, shops and offices",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-in-stock" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-6 text-xl font-bold tracking-tight">Other services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard
                key={s.slug}
                service={{
                  title: s.title,
                  slug: s.slug,
                  shortDescription: s.short_description ?? "",
                  icon: s.icon ?? "Wrench",
                  priceLabel: s.price_label ?? undefined,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
