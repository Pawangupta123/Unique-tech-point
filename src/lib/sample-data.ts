/**
 * Sample catalog used until Supabase is connected (Phase 1).
 * queries.ts reads from here today; swapping to Supabase later keeps the same
 * function signatures, so pages don't change. Categories/services stay in
 * constants.ts (single source of truth); these are demo products only.
 */
import type { Product } from "@/lib/types";

type SampleProduct = Product;

const now = "2026-07-01T00:00:00.000Z";

const RAW: Omit<
  SampleProduct,
  | "id"
  | "images"
  | "specs"
  | "meta_title"
  | "meta_description"
  | "price_label"
  | "created_at"
  | "updated_at"
>[] = [
  {
    title: "HP 15s Core i5 12th Gen Laptop",
    slug: "hp-15s-core-i5-12th-gen",
    short_description: "16GB RAM · 512GB SSD · 15.6\" FHD — great for work & study.",
    description:
      "The HP 15s pairs a 12th-gen Intel Core i5 with 16GB RAM and a fast 512GB SSD in a slim 15.6-inch FHD body. A dependable everyday laptop for office work, students and browsing.",
    price: 52990,
    brand: "HP",
    in_stock: true,
    featured: true,
    category_slug: "laptops",
  },
  {
    title: "Dell Inspiron 15 Ryzen 5 Laptop",
    slug: "dell-inspiron-15-ryzen-5",
    short_description: "8GB RAM · 512GB SSD · backlit keyboard.",
    description:
      "Dell Inspiron 15 with AMD Ryzen 5, 8GB RAM and 512GB SSD. Balanced performance and battery life for home and business use.",
    price: 46990,
    brand: "Dell",
    in_stock: true,
    featured: false,
    category_slug: "laptops",
  },
  {
    title: "Unique Gaming PC — Ryzen 5 / RTX 4060",
    slug: "unique-gaming-pc-ryzen5-rtx4060",
    short_description: "Custom build · 16GB DDR5 · 1TB NVMe · RTX 4060.",
    description:
      "A custom-assembled gaming rig built in-house: Ryzen 5 CPU, RTX 4060 graphics, 16GB DDR5 and a 1TB NVMe SSD. Configurable to your budget — tell us your game and we'll spec it.",
    price: null,
    brand: "Custom Build",
    in_stock: true,
    featured: true,
    category_slug: "custom-pc-builds",
  },
  {
    title: "HP All-in-One 24 Desktop",
    slug: "hp-all-in-one-24-desktop",
    short_description: "23.8\" FHD · Core i3 · 8GB · 512GB SSD.",
    description:
      "Clean, space-saving All-in-One desktop with a 23.8-inch FHD display, Core i3, 8GB RAM and 512GB SSD. Ideal for reception desks and home offices.",
    price: 41990,
    brand: "HP",
    in_stock: true,
    featured: false,
    category_slug: "desktops",
  },
  {
    title: "Samsung 970 EVO Plus 1TB NVMe SSD",
    slug: "samsung-970-evo-plus-1tb-ssd",
    short_description: "PCIe NVMe · up to 3500 MB/s read.",
    description:
      "Speed up any PC or laptop with the Samsung 970 EVO Plus 1TB NVMe SSD — fast boot, fast load, 5-year warranty.",
    price: 6499,
    brand: "Samsung",
    in_stock: true,
    featured: true,
    category_slug: "components",
  },
  {
    title: "Corsair Vengeance 16GB DDR5 RAM",
    slug: "corsair-vengeance-16gb-ddr5",
    short_description: "DDR5 5200MHz · desktop memory.",
    description:
      "Corsair Vengeance 16GB (2x8GB) DDR5 5200MHz memory for a smooth upgrade to modern desktops.",
    price: 4299,
    brand: "Corsair",
    in_stock: true,
    featured: false,
    category_slug: "components",
  },
  {
    title: "HP LaserJet M1005 Multifunction Printer",
    slug: "hp-laserjet-m1005-mfp",
    short_description: "Print · scan · copy — mono laser.",
    description:
      "The reliable HP LaserJet M1005 all-in-one: crisp mono laser printing, scanning and copying for shops and offices.",
    price: 18990,
    brand: "HP",
    in_stock: true,
    featured: false,
    category_slug: "printers",
  },
  {
    title: "CP Plus 2MP HD CCTV Camera Kit (4 Cam)",
    slug: "cp-plus-2mp-cctv-kit-4-cam",
    short_description: "4 HD cameras · DVR · mobile viewing.",
    description:
      "Complete 4-camera CP Plus 2MP HD CCTV kit with DVR, cabling and mobile viewing setup. Installation available across Bhiwadi — ask for an on-site survey.",
    price: null,
    brand: "CP Plus",
    in_stock: true,
    featured: true,
    category_slug: "cctv-cameras",
  },
  {
    title: "Hikvision 4MP Wi-Fi Dome Camera",
    slug: "hikvision-4mp-wifi-dome-camera",
    short_description: "Indoor · 4MP · night vision · app.",
    description:
      "Hikvision 4MP Wi-Fi dome camera with clear night vision and mobile app access — great for shops, homes and small offices.",
    price: 3299,
    brand: "Hikvision",
    in_stock: true,
    featured: false,
    category_slug: "cctv-cameras",
  },
  {
    title: "APC 600VA UPS Battery Backup",
    slug: "apc-600va-ups-backup",
    short_description: "Backup for desktop, CCTV DVR & router.",
    description:
      "APC 600VA UPS keeps your desktop, CCTV DVR or router running through power cuts and protects against surges.",
    price: 3999,
    brand: "APC",
    in_stock: true,
    featured: false,
    category_slug: "accessories",
  },
];

// Verified-working Unsplash photos (placeholder product imagery until the
// owner uploads real photos via the admin panel). Ordered to match RAW.
const u = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80`;
const PRODUCT_IMAGES: string[][] = [
  [u("photo-1496181133206-80ce9b88a853"), u("photo-1531297484001-80022131f5a1"), u("photo-1593642632559-0c6d3fc62b89")], // HP laptop
  [u("photo-1593642632559-0c6d3fc62b89"), u("photo-1496181133206-80ce9b88a853"), u("photo-1531297484001-80022131f5a1")], // Dell laptop
  [u("photo-1587202372775-e229f172b9d7"), u("photo-1591488320449-011701bb6704"), u("photo-1587202372634-32705e3bf49c")], // Gaming PC
  [u("photo-1587202372634-32705e3bf49c"), u("photo-1587202372775-e229f172b9d7"), u("photo-1591488320449-011701bb6704")], // AiO desktop
  [u("photo-1597872200969-2b65d56bd16b"), u("photo-1555617981-dac3880eac6e"), u("photo-1550751827-4bd374c3f58b")], // SSD
  [u("photo-1555617981-dac3880eac6e"), u("photo-1597872200969-2b65d56bd16b"), u("photo-1550751827-4bd374c3f58b")], // RAM
  [u("photo-1550751827-4bd374c3f58b"), u("photo-1611186871348-b1ce696e52c9"), u("photo-1525547719571-a2d4ac8945e2")], // Printer
  [u("photo-1547082299-de196ea013d6"), u("photo-1606813907291-d86efa9b94db"), u("photo-1547082299-de196ea013d6")], // CCTV kit
  [u("photo-1606813907291-d86efa9b94db"), u("photo-1547082299-de196ea013d6"), u("photo-1606813907291-d86efa9b94db")], // Camera
  [u("photo-1550751827-4bd374c3f58b"), u("photo-1525547719571-a2d4ac8945e2"), u("photo-1611186871348-b1ce696e52c9")], // UPS
];

/** Fully-formed sample products with generated ids and default fields. */
export const SAMPLE_PRODUCTS: SampleProduct[] = RAW.map((p, i) => ({
  ...p,
  id: i + 1,
  images: PRODUCT_IMAGES[i],
  specs: null,
  price_label: null,
  meta_title: null,
  meta_description: null,
  created_at: now,
  updated_at: now,
}));
