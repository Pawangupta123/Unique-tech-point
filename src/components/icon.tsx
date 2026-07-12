import {
  Laptop,
  Monitor,
  Cpu,
  MemoryStick,
  Printer,
  Cctv,
  Keyboard,
  Wrench,
  Network,
  ShieldCheck,
  Package,
  type LucideProps,
} from "lucide-react";

/** Maps the string icon names used in constants/DB to lucide components. */
const ICONS = {
  Laptop,
  Monitor,
  Cpu,
  MemoryStick,
  Printer,
  Cctv,
  Keyboard,
  Wrench,
  Network,
  ShieldCheck,
  Package,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  ...props
}: { name?: string | null } & Omit<LucideProps, "name">) {
  const Cmp = (name && ICONS[name as IconName]) || Package;
  return <Cmp {...props} />;
}
