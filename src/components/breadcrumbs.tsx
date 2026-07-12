import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/** Visual breadcrumb trail. JSON-LD BreadcrumbList is emitted separately (SEO). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-brand-700">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "font-medium text-foreground" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
