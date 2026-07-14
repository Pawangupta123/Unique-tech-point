import Link from "next/link";
import { WhatsAppIcon } from "@/components/brand-icons";
import { whatsappLink, site } from "@/lib/site";

/** Sticky WhatsApp bubble shown site-wide (bottom-right). */
export function FloatingWhatsApp() {
  return (
    <Link
      href={whatsappLink(`Hi ${site.name}, I have a query.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 md:flex"
    >
      <WhatsAppIcon className="size-7" />
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-whatsapp/40" />
    </Link>
  );
}
