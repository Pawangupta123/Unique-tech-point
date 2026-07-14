import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { site, telLink, whatsappLink } from "@/lib/site";

/** Fixed bottom Call / WhatsApp bar on phones (one-tap contact). */
export function MobileActionBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden">
        <Link
          href={telLink}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-brand-700"
        >
          <Phone className="size-5" />
          Call now
        </Link>
        <Link
          href={whatsappLink(`Hi ${site.name}, I have a query.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </Link>
      </div>
      {/* Spacer so the fixed bar never covers page content */}
      <div className="h-14 md:hidden" aria-hidden />
    </>
  );
}
