import type { Metadata } from "next";
import { Cpu, Cctv, Wrench, Users, MapPin } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, a trusted computer and CCTV shop in ${site.address.city} offering sales, service and support.`,
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: "10+", label: "Years of experience" },
  { value: `${CATEGORIES.length}`, label: "Product categories" },
  { value: `${SERVICES.length}`, label: "Services offered" },
  { value: `${site.areaServed.length}+`, label: "Areas served" },
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
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 100% at 0% 0%, rgba(37,99,235,0.3) 0%, transparent 60%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 80%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">About us</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Your trusted IT partner in {site.address.city}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            {site.name} is a one-stop shop for computers, CCTV and IT services — built on honest
            advice, genuine products and reliable support.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-5 py-8 text-center">
              <p className="text-3xl font-extrabold text-brand-700">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight">Who we are</h2>
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

        <h2 className="mt-12 text-2xl font-bold tracking-tight">What we do</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border bg-muted/40 p-5">
          <MapPin className="mt-0.5 size-5 shrink-0 text-brand-700" />
          <div>
            <h3 className="font-semibold">Areas we serve</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.areaServed.join(" · ")} and nearby areas.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
