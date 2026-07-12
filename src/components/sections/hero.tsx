"use client";

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

/** Animated floating particle */
function Particle({
  size,
  top,
  left,
  delay,
  duration,
}: {
  size: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
}) {
  return (
    <div
      className="absolute rounded-full bg-brand-400 opacity-20"
      style={{
        width: size,
        height: size,
        top,
        left,
        animation: `particle-float ${duration} ease-in-out ${delay} infinite`,
      }}
    />
  );
}

/** Premium animated hero with particles, glow effects & enhanced transitions. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white grain">
      {/* Ambient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 90% at 100% 0%, rgba(37,99,235,0.35) 0%, transparent 60%), radial-gradient(50% 70% at 0% 100%, rgba(29,78,216,0.25) 0%, transparent 55%), linear-gradient(160deg, #0b1220 0%, #0a0a0c 75%)",
        }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          animation: "fade-in 2s ease both",
        }}
      />

      {/* Floating particles */}
      <Particle size={4} top="15%" left="20%" delay="0s" duration="6s" />
      <Particle size={6} top="30%" left="70%" delay="1s" duration="8s" />
      <Particle size={3} top="60%" left="40%" delay="2s" duration="7s" />
      <Particle size={5} top="80%" left="80%" delay="0.5s" duration="9s" />
      <Particle size={4} top="45%" left="10%" delay="1.5s" duration="6.5s" />
      <Particle size={3} top="70%" left="55%" delay="3s" duration="7.5s" />
      <Particle size={6} top="20%" left="50%" delay="2.5s" duration="8.5s" />
      <Particle size={4} top="50%" left="90%" delay="0.8s" duration="6s" />

      {/* Rotating glow orb */}
      <div
        className="absolute -right-40 -top-40 size-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)",
          animation: "spin-slow 30s linear infinite",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* Left: copy */}
        <div className="animate-fade-up">
          {/* Animated badge with pulse */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur animate-pulse-glow">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            Your local IT partner in {site.address.city}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="inline-block">Computers, CCTV</span>{" "}
            <span className="inline-block">&amp;{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_3s_linear_infinite]">
                complete IT solutions
              </span>
            </span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-white/70 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Laptops, custom PC builds, printers and security cameras — plus expert
            repair, installation and AMC for homes and businesses across {site.address.city}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button
              asChild
              size="lg"
              className="magnetic-btn ripple-container bg-white text-zinc-900 hover:bg-white/90"
            >
              <Link href="/products">
                Browse products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <WhatsAppButton
              size="lg"
              className="magnetic-btn ripple-container"
              message={`Hi ${site.name}, I need help choosing a product.`}
            />
          </div>

          {/* Animated stats */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6 stagger-children">
            {STATS.map((s) => (
              <div key={s.label} className="group">
                <dt className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-xs text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: framed image */}
        <div className="animate-fade-up relative lg:pl-6" style={{ animationDelay: "120ms" }}>
          {/* Glowing backdrop */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-blue-600/20 blur-2xl opacity-60 animate-pulse" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-blue-950/50">
            <Image
              src="/hero.jpg"
              alt="Computer hardware and technology"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
          </div>

          {/* Floating trust card with enhanced glass effect */}
          <div
            className="animate-float absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="relative flex size-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300">
              <div className="absolute inset-0 rounded-lg bg-blue-500/30 animate-ping opacity-20" />
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
