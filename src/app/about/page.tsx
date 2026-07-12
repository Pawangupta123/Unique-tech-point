import type { Metadata } from "next";
import { Cpu, Cctv, Wrench, Users, MapPin } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { site } from "@/lib/site";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, a trusted computer and CCTV shop in ${site.address.city} offering sales, service and support.`,
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: CATEGORIES.length, label: "Product categories" },
  { value: SERVICES.length, label: "Services offered" },
  { value: site.areaServed.length, suffix: "+", label: "Areas served" },
];

const WHAT_WE_DO = [
  { icon: Cpu, title: "Sales", text: "Laptops, desktops, custom PC builds, printers, components and accessories." },
  { icon: Cctv, title: "CCTV & Security", text: "Camera supply and installation for homes, shops and offices." },
  { icon: Wrench, title: "Service & Repair", text: "Computer and printer repair, upgrades, networking and AMC." },
  { icon: Users, title: "For everyone", text: "Support for home users and small-to-large businesses alike." },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-zinc-950 text-white grain">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 100% at 0% 0%, rgba(37,99,235,0.3) 0%, transparent 60%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 80%)",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 size-2 rounded-full bg-blue-400/30 animate-[particle-float_6s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 right-1/3 size-3 rounded-full bg-purple-400/20 animate-[particle-float_8s_ease-in-out_1s_infinite]" />
          <div className="absolute bottom-1/4 left-1/2 size-2 rounded-full bg-blue-300/25 animate-[particle-float_7s_ease-in-out_2s_infinite]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <Reveal direction="up">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">About us</p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Your trusted IT partner in {site.address.city}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              {site.name} is a one-stop shop for computers, CCTV and IT services — built on honest
              advice, genuine products and reliable support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section className="border-b bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-transparent to-brand-50/30" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label} direction="up" delay={s.label === STATS[0].label ? 0 : s.label === STATS[1].label ? 100 : s.label === STATS[2].label ? 200 : 300}>
              <div className="bg-card px-5 py-8 text-center group hover:bg-brand-50/30 transition-colors duration-300">
                <p className="text-3xl font-extrabold text-brand-700">
                  <Counter end={s.value} suffix={s.suffix || ""} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <Reveal direction="right">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Who we are
          </h2>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">{site.name}</strong> is a one-stop IT shop in{" "}
              {site.address.line2}, {site.address.city}. From a single cable to a complete gaming PC
              or a full office CCTV setup, we help homes and businesses buy the right technology —
              and keep it running.
            </p>
            <p>
              We sell computers, printers, security cameras, components and accessories, and back
              every sale with hands-on service: repairs, installation, networking and annual
              maintenance. Our goal is simple — honest advice, genuine products and reliable support
              you can walk in and count on.
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={300}>
          <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">
            What we do
          </h2>
        </Reveal>

        <Reveal direction="right" delay={450}>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {WHAT_WE_DO.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group rounded-2xl border bg-card p-5 relative overflow-hidden transition-all duration-500 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100 hover:-translate-y-1"
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

                {/* Icon glow */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-lg"
                    style={{ background: "linear-gradient(135deg, var(--brand-500), #a855f7)" }}
                  />
                  <div className="relative flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/30">
                    <Icon className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                </div>
                <h3 className="mt-3 font-semibold transition-colors duration-300 group-hover:text-brand-700">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="up" delay={600}>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border bg-muted/40 p-5 group hover:bg-brand-50/50 transition-all duration-300">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-700 transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-500" />
            <div>
              <h3 className="font-semibold">Areas we serve</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {site.areaServed.join(" · ")} and nearby areas.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
