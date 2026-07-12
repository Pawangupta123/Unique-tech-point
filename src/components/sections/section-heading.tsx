import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Consistent section header with animated eyebrow and view-all link. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-brand-700 relative inline-block">
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-500 transition-all duration-500 group-hover:w-full" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent bg-[length:100%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-500 hover:bg-[length:100%_100%]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-muted-foreground transition-colors duration-300 hover:text-foreground/70">
            {description}
          </p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 hover:gap-2 transition-all duration-300 magnetic-btn"
        >
          {viewAllLabel}
          <ArrowRight className="size-4 transition-transform duration-300" />
        </Link>
      )}
    </div>
  );
}
