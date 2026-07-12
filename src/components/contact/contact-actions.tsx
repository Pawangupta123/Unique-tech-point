import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/brand-icons";
import { cn } from "@/lib/utils";
import { site, telLink, whatsappLink } from "@/lib/site";

type Size = "sm" | "default" | "lg";

/** Call button → tel: link. Reused on product/service pages and nav. */
export function CallButton({
  size = "default",
  showNumber = false,
  className,
}: {
  size?: Size;
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <Button asChild variant="outline" size={size} className={className}>
      <Link href={telLink}>
        <Phone className="size-4" />
        {showNumber ? site.phoneDisplay : "Call now"}
      </Link>
    </Button>
  );
}

/** WhatsApp button → wa.me link with an optional pre-filled message. */
export function WhatsAppButton({
  message,
  size = "default",
  className,
  label = "WhatsApp",
}: {
  message?: string;
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
        className,
      )}
    >
      <Link href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="size-4" />
        {label}
      </Link>
    </Button>
  );
}
