import { cn } from "@/lib/utils";

/** Consistent page title band for listing and static pages. */
export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b bg-muted/40", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
