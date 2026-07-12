import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ServiceCardData = {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  priceLabel?: string;
};

/** Reusable service card — used on the home page and services listing. */
export function ServiceCard({
  service,
  className,
}: {
  service: ServiceCardData;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col rounded-xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-lg bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 transition-colors group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white">
        <Icon name={service.icon} className="size-6" />
      </div>
      <h3 className="mt-4 font-semibold transition-colors group-hover:text-brand-700">
        {service.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
        {service.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between">
        {service.priceLabel && (
          <Badge variant="secondary" className="font-medium">
            {service.priceLabel}
          </Badge>
        )}
        <span className="ml-auto flex items-center gap-1 text-sm font-medium text-brand-700">
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
