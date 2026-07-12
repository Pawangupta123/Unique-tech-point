import type { Metadata } from "next";
import { MessageSquareText, ClipboardCheck, Wrench } from "lucide-react";
import { ServiceCard } from "@/components/cards/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsAppButton, CallButton } from "@/components/contact/contact-actions";
import { getServices } from "@/lib/queries";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

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
      {/* Banner with particles */}
      <section className="relative overflow-hidden bg-zinc-950 text-white grain">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 100% at 100% 0%, rgba(37,99,235,0.35) 0%, transparent 60%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 80%)",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 size-3 rounded-full bg-blue-400/20 animate-[particle-float_7s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/3 left-1/3 size-2 rounded-full bg-purple-400/25 animate-[particle-float_9s_ease-in-out_1s_infinite]" />
          <div className="absolute top-1/2 right-1/3 size-2 rounded-full bg-blue-300/20 animate-[particle-float_6s_ease-in-out_2s_infinite]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <Reveal direction="up">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Our services</p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Repairs, CCTV &amp; IT support you can rely on
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-3 max-w-2xl text-white/70">
              From a single laptop repair to a full office CCTV and network setup — we support
              homes and businesses across {site.address.city}.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" message={`Hi ${site.name}, I need a service.`} />
              <CallButton
                size="lg"
                showNumber
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 magnetic-btn ripple-container"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s, i) => (
            <Reveal key={s.slug} direction="up" delay={i * 100}>
              <ServiceCard
                service={{
                  title: s.title,
                  slug: s.slug,
                  shortDescription: s.short_description ?? "",
                  icon: s.icon ?? "Wrench",
                  priceLabel: s.price_label ?? undefined,
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/20 via-transparent to-brand-50/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-14">
          <SectionHeading
            eyebrow="How it works"
            title="Simple, transparent process"
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-3 stagger-children">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} direction="up" delay={i * 150}>
                <div
                  key={step.title}
                  className="group relative rounded-2xl border bg-card p-6 transition-all duration-500 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100 hover:-translate-y-1"
                >
                  {/* Gradient border */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        padding: "1px",
                        background: "linear-gradient(135deg, var(--brand-500), #a855f7)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  </div>

                  <span className="absolute right-5 top-4 text-4xl font-black text-brand-100 transition-all duration-500 group-hover:text-brand-200 group-hover:scale-125">
                    {i + 1}
                  </span>
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-lg"
                      style={{ background: "linear-gradient(135deg, var(--brand-500), #a855f7)" }}
                    />
                    <div className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/30">
                      <step.icon className="size-5 transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold transition-colors duration-300 group-hover:text-brand-700">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{step.text}</p>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
