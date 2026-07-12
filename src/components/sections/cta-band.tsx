import { CallButton, WhatsAppButton } from "@/components/contact/contact-actions";
import { site } from "@/lib/site";

/** Full-width call-to-action band inviting an enquiry. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-800 text-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 130% at 12% 120%, #2563eb 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Need a quote or expert advice?
          </h2>
          <p className="mt-2 text-white/80">
            Tell us what you need — a new laptop, an office CCTV setup or a repair.
            Our {site.address.city} team will help you pick the right solution.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsAppButton size="lg" message={`Hi ${site.name}, I'd like a quote.`} />
          <CallButton
            size="lg"
            showNumber
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          />
        </div>
      </div>
    </section>
  );
}
