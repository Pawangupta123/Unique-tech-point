import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/contact/contact-actions";
import { site } from "@/lib/site";

const STATS = [
  { value: "10+", label: "Years serving Bhiwadi" },
  { value: "7", label: "Product categories" },
  { value: "24×7", label: "Support on WhatsApp" },
];

/** Premium two-column hero: message + CTAs on the left, framed tech image right. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 90% at 100% 0%, rgba(37,99,235,0.32) 0%, transparent 60%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="size-1.5 rounded-full bg-blue-400" />
            Your local IT partner in {site.address.city}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Computer, CCTV &amp; IT shop{" "}
            <span className="bg-linear-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              in {site.address.city}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-white/70">
            Laptops, custom PC builds, printers and security cameras — plus expert
            repair, installation and AMC for homes and businesses across {site.address.city}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-zinc-900 hover:bg-white/90">
              <Link href="/products">
                Browse products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <WhatsAppButton size="lg" message={`Hi ${site.name}, I need help choosing a product.`} />
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-bold text-white">{s.value}</dt>
                <dd className="mt-0.5 text-xs text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up relative lg:pl-6" style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-blue-950/50">
            <Image
              src="/hero.jpg"
              alt="Computer hardware and technology"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/40 to-transparent" />
          </div>

          <div className="animate-float absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-xl backdrop-blur sm:flex">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Genuine &amp; warranty</p>
              <p className="flex items-center gap-1 text-xs text-white/60">
                <Star className="size-3 fill-blue-400 text-blue-400" />
                Trusted local store
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
