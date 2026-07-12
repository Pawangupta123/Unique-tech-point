import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { WhatsAppButton, CallButton } from "@/components/contact/contact-actions";
import { site, fullAddress, telLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit or call ${site.name} in ${site.address.city}. Address, phone, WhatsApp and hours — plus an enquiry form.`,
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have a question or need a quote? Reach out — we're happy to help."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        {/* Details */}
        <div>
          <h2 className="text-lg font-semibold">Get in touch</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <ContactRow icon={MapPin} label="Address">
              {fullAddress}
            </ContactRow>
            <ContactRow icon={Phone} label="Phone">
              <a href={telLink} className="hover:text-brand-700">{site.phoneDisplay}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-brand-700">{site.email}</a>
            </ContactRow>
            <ContactRow icon={Clock} label="Hours">
              {site.hours.days}: {site.hours.weekdays.open}–{site.hours.weekdays.close}
            </ContactRow>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton />
            <CallButton showNumber />
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border">
            <iframe
              title={`Map to ${site.name}`}
              src={mapSrc}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Send an enquiry</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill this and we'll get back to you shortly.
          </p>
          <div className="mt-5">
            <EnquiryForm source="contact" />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-brand-700" />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </li>
  );
}
