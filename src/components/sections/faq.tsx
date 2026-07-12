import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { JsonLd } from "@/components/json-ld";
import { FAQS } from "@/lib/constants";
import { faqLd } from "@/lib/seo";

/** FAQ accordion (native <details> = crawlable) + FAQPage structured data. */
export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
      <JsonLd data={faqLd(FAQS)} />
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers about our products, services and area."
        align="center"
      />
      <div className="divide-y rounded-2xl border bg-card">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus className="size-4 shrink-0 text-brand-700 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
