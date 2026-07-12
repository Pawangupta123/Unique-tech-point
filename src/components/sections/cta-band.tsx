import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { site } from "@/lib/site";

/** Full-width CTA with animated gradient background & floating shapes. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-800 text-white">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 130% at 12% 120%, #2563eb 0%, transparent 55%)",
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-10 -left-10 size-40 rounded-full border-2 border-white/5"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/4 right-20 size-20 rounded-lg rotate-45 border border-white/5"
          style={{ animation: "float 8s ease-in-out 1s infinite" }}
        />
        <div
          className="absolute bottom-10 left-1/3 size-16 rounded-full border border-white/5"
          style={{ animation: "float 7s ease-in-out 2s infinite" }}
        />
        <div
          className="absolute top-10 right-1/4 size-12 rounded-lg -rotate-12 border border-white/5"
          style={{ animation: "float 9s ease-in-out 0.5s infinite" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl animate-fade-up">
            Need a quote or expert advice?
          </h2>
          <p className="mt-2 text-white/80 animate-fade-in" style={{ animationDelay: "150ms" }}>
            Tell us what you need — a new laptop, an office CCTV setup or a repair.
            Our {site.address.city} team will help you pick the right solution.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <WhatsAppButton
            size="lg"
            className="magnetic-btn ripple-container"
            message={`Hi ${site.name}, I'd like a quote.`}
          />
          <CallButton
            size="lg"
            showNumber
            className="magnetic-btn ripple-container border-white/30 bg-white/10 text-white hover:bg-white/20"
          />
        </div>
      </div>
    </section>
  );
}
