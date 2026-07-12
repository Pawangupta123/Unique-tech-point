import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { WhatsAppIcon } from "@/components/brand-icons";
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { site, telLink, whatsappLink, fullAddress } from "@/lib/site";

/** Site footer with enhanced hover animations. */
export function Footer() {
  return (
    <footer className="mt-auto border-t bg-zinc-950 text-zinc-300 relative overflow-hidden">
      {/* Subtle gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo invert />
          <p className="text-sm text-zinc-400">{site.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
            {site.areaServed.map((area) => (
              <span
                key={area}
                className="rounded-full bg-white/5 px-2.5 py-1 transition-all duration-300 hover:bg-brand-500/20 hover:text-brand-300 cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <FooterLinks
          title="Categories"
          links={CATEGORIES.map((c) => ({ label: c.name, href: `/products/${c.slug}` }))}
        />
        <FooterLinks
          title="Services"
          links={SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
        />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <address className="space-y-3 text-sm not-italic text-zinc-400">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500 transition-transform duration-300 hover:scale-110 hover:text-brand-400" />
              <span>{fullAddress}</span>
            </p>
            <a href={telLink} className="flex items-center gap-2.5 hover:text-white transition-colors duration-300">
              <Phone className="size-4 shrink-0 text-brand-500 transition-transform duration-300 hover:scale-110 hover:text-brand-400" />
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-white transition-colors duration-300"
            >
              <WhatsAppIcon className="size-4 shrink-0 text-whatsapp transition-transform duration-300 hover:scale-110" />
              WhatsApp us
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors duration-300">
              <Mail className="size-4 shrink-0 text-brand-500 transition-transform duration-300 hover:scale-110 hover:text-brand-400" />
              {site.email}
            </a>
            <p className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-brand-500 transition-transform duration-300 hover:scale-110 hover:text-brand-400" />
              {site.hours.days}: {site.hours.weekdays.open}–{site.hours.weekdays.close}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {"2026"} {site.name}. All rights reserved.
            <span className="ml-2 hidden sm:inline">GSTIN: {site.gstin}</span>
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-zinc-300 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full">About</Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-zinc-400">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
