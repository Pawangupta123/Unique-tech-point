import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Consistent section header with optional eyebrow and "view all" link. */
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
          <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-brand-700">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
        >
          {viewAllLabel}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
