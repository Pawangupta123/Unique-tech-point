import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Brand logo + wordmark, links home. Used in navbar & footer. */
export function Logo({
  className,
  showText = true,
  invert = false,
}: {
  className?: string;
  showText?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("flex items-center gap-2.5", className)}
    >
      <Image
        src="/logo.png"
        alt={`${site.name} logo`}
        width={44}
        height={44}
        priority
        className="size-9 w-auto object-contain sm:size-10"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-base font-bold tracking-tight sm:text-lg",
              invert ? "text-white" : "text-foreground",
            )}
          >
            Unique Tech Point
          </span>
          <span
            className={cn(
              "text-[11px] font-medium",
              invert ? "text-white/70" : "text-muted-foreground",
            )}
          >
            Computers · CCTV · IT Services
          </span>
        </span>
      )}
    </Link>
  );
}
