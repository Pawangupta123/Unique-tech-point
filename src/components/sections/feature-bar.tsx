import { ShieldCheck, Headset, MapPin, Wrench } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "Genuine products", text: "Original stock with warranty" },
  { icon: Wrench, title: "On-site service", text: "Repair, install & AMC" },
  { icon: Headset, title: "Expert advice", text: "We help you choose right" },
  { icon: MapPin, title: "Local in Bhiwadi", text: "Walk in or we come to you" },
];

/** Trust strip with enhanced icon animations. */
export function FeatureBar() {
  return (
    <section className="border-b bg-card relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-50/50 via-transparent to-brand-50/50 opacity-0 transition-opacity duration-500 hover:opacity-100" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="group flex items-center gap-3 px-5 py-5 relative"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Icon with animated background */}
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/20">
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, var(--brand-500), #a855f7)",
                }}
              />
              <Icon className="relative size-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>

            <div>
              <p className="text-sm font-semibold leading-tight transition-colors duration-300 group-hover:text-brand-700">{title}</p>
              <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{text}</p>
            </div>

            {/* Hover line */}
            <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
