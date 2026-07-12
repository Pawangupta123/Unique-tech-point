import type { Metadata } from "next";
import { MessageSquareText, ClipboardCheck, Wrench } from "lucide-react";
import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsAppButton, CallButton } from "@/components/contact/contact-actions";
import { getServices } from "@/lib/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IT Services",
  description: `Computer repair, CCTV installation, networking and AMC in ${site.address.city}. On-site service for homes and businesses.`,
  alternates: { canonical: "/services" },
};

const STEPS = [
  { icon: MessageSquareText, title: "Tell us what you need", text: "Call, WhatsApp or send an enquiry — describe your problem or requirement." },
  { icon: ClipboardCheck, title: "Free assessment & quote", text: "We diagnose or do a site survey and share a clear, upfront quote." },
  { icon: Wrench, title: "We get it done", text: "Our technicians fix, install or set up — with after-service support." },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 100% at 100% 0%, rgba(37,99,235,0.35) 0%, transparent 60%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 80%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Our services</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Repairs, CCTV &amp; IT support you can rely on
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            From a single laptop repair to a full office CCTV and network setup — we support
            homes and businesses across {site.address.city}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" message={`Hi ${site.name}, I need a service.`} />
            <CallButton
              size="lg"
              showNumber
              className="border-white/25 bg-white/10 text-white hover:bg-white/20"
            />
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
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
      </section>

      {/* Process */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <SectionHeading
            eyebrow="How it works"
            title="Simple, transparent process"
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border bg-card p-6">
                <span className="absolute right-5 top-4 text-4xl font-black text-brand-100">
                  {i + 1}
                </span>
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <step.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
