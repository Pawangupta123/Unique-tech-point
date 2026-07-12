import { ShieldCheck, Headset, MapPin, Wrench } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "Genuine products", text: "Original stock with warranty" },
  { icon: Wrench, title: "On-site service", text: "Repair, install & AMC" },
  { icon: Headset, title: "Expert advice", text: "We help you choose right" },
  { icon: MapPin, title: "Local in Bhiwadi", text: "Walk in or we come to you" },
];

/** Trust strip shown directly under the hero. */
export function FeatureBar() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 px-5 py-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">{title}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
