/**
 * Canonical navigation + category/service definitions.
 * Single source of truth: used for the site nav AND as the DB seed (Phase 1).
 * `icon` values are lucide-react icon names, resolved in `@/components/icon`.
 */

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Brands the shop deals in — shown as a credibility strip on the home page. */
export const BRANDS: string[] = [
  "HP",
  "Dell",
  "Lenovo",
  "Asus",
  "Acer",
  "CP Plus",
  "Hikvision",
  "Canon",
  "Epson",
  "Samsung",
  "Corsair",
  "APC",
];

export type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export const CATEGORIES: CategorySeed[] = [
  {
    name: "Laptops",
    slug: "laptops",
    description:
      "Branded and business laptops from HP, Dell, Lenovo, Asus and more — for work, study and gaming.",
    icon: "Laptop",
  },
  {
    name: "Desktops & PCs",
    slug: "desktops",
    description:
      "Ready-to-use branded desktops and all-in-one PCs for home and office.",
    icon: "Monitor",
  },
  {
    name: "Custom PC Builds",
    slug: "custom-pc-builds",
    description:
      "Made-to-order gaming and workstation PCs assembled to your budget and needs.",
    icon: "Cpu",
  },
  {
    name: "Components & Parts",
    slug: "components",
    description:
      "Processors, motherboards, RAM, SSDs, graphics cards, power supplies and cabinets.",
    icon: "MemoryStick",
  },
  {
    name: "Printers",
    slug: "printers",
    description:
      "Inkjet, laser and all-in-one printers plus cartridges and consumables.",
    icon: "Printer",
  },
  {
    name: "CCTV & Security",
    slug: "cctv-cameras",
    description:
      "CCTV cameras, DVR/NVR kits and security systems for homes, shops and offices.",
    icon: "Cctv",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description:
      "Keyboards, mice, monitors, UPS, networking gear, cables and everyday peripherals.",
    icon: "Keyboard",
  },
];

export type ServiceSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  priceLabel: string;
};

export const SERVICES: ServiceSeed[] = [
  {
    title: "Computer & Laptop Repair",
    slug: "computer-laptop-repair",
    shortDescription: "Hardware & software repair for all brands.",
    description:
      "Diagnosis and repair for laptops and desktops — screen, keyboard, battery, motherboard, OS installation, virus removal and data recovery.",
    icon: "Wrench",
    priceLabel: "Free diagnosis",
  },
  {
    title: "CCTV Installation",
    slug: "cctv-installation",
    shortDescription: "Camera setup for home, shop & office.",
    description:
      "End-to-end CCTV installation — site survey, camera and DVR/NVR setup, wiring, mobile viewing configuration and after-sales support.",
    icon: "Cctv",
    priceLabel: "Get a free quote",
  },
  {
    title: "Networking & Wi-Fi",
    slug: "networking-wifi",
    shortDescription: "LAN, Wi-Fi & office network setup.",
    description:
      "Structured cabling, router and Wi-Fi configuration, and reliable office networks for small and large businesses.",
    icon: "Network",
    priceLabel: "Get a quote",
  },
  {
    title: "Annual Maintenance (AMC)",
    slug: "annual-maintenance-amc",
    shortDescription: "Yearly IT support contracts.",
    description:
      "Annual maintenance contracts that keep your computers, printers and CCTV running with priority on-site support.",
    icon: "ShieldCheck",
    priceLabel: "Custom plans",
  },
];

/**
 * FAQs — natural, helpful answers that also target local + service search
 * queries (used on the home page and emitted as FAQPage JSON-LD).
 */
export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Which is the best computer and laptop shop in Bhiwadi?",
    answer:
      "Unique Tech Point in Bhiwadi Industrial Area (Samtal Road, opposite Shyam Vatika) is a trusted local shop for laptops, desktops, custom PC builds, printers and accessories — with genuine products, fair pricing and on-site service.",
  },
  {
    question: "Do you provide CCTV camera installation in Bhiwadi?",
    answer:
      "Yes. We supply and install CCTV cameras and DVR/NVR systems for homes, shops and offices across Bhiwadi, Tapukara, Chopanki and nearby areas — including wiring, mobile app setup and after-sales support.",
  },
  {
    question: "Can you build a custom gaming or workstation PC?",
    answer:
      "Absolutely. We assemble custom PCs to your budget and needs — gaming rigs, workstations and office desktops — and help you pick the right processor, graphics card, RAM and storage.",
  },
  {
    question: "Do you repair laptops, desktops and printers?",
    answer:
      "Yes, we repair all major brands — screen, keyboard, battery, motherboard, OS installation, virus removal and printer servicing. Diagnosis is free; we share a clear quote before any work.",
  },
  {
    question: "Do you offer annual maintenance (AMC) for offices?",
    answer:
      "Yes. Our annual maintenance contracts keep your computers, printers and CCTV running smoothly with priority on-site support for businesses in and around Bhiwadi.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve Bhiwadi, Tapukara, Chopanki, Khushkhera, Alwar, Neemrana and nearby areas. Walk in to our shop or contact us and we can visit you for installation and service.",
  },
  {
    question: "How do I get a price or place an order?",
    answer:
      "Just call or WhatsApp us on +91 77370 83723, or send an enquiry from any product or the contact page. We'll share the price, availability and the best option for you.",
  },
];
