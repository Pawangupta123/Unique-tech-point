import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

/** Animated page title band with gradient background. */
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
    <section className={cn("relative overflow-hidden border-b grain", className)}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 100% at 0% 0%, rgba(37,99,235,0.15) 0%, transparent 60%), linear-gradient(160deg, var(--muted) 0%, var(--background) 80%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 size-2 rounded-full bg-brand-400/20 animate-[particle-float_7s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/3 size-3 rounded-full bg-purple-400/15 animate-[particle-float_9s_ease-in-out_1.5s_infinite]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <Reveal direction="up">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
        </Reveal>
        <Reveal direction="up" delay={100}>
          {description && (
            <p className="mt-2 max-w-2xl text-muted-foreground transition-all duration-500 hover:text-foreground/70">
              {description}
            </p>
          )}
        </Reveal>
        <Reveal direction="up" delay={200}>
          {children && <div className="mt-4">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
