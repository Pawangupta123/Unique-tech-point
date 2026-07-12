/**
 * Single source of truth for all business / site-wide information.
 * Update contact details, address, and hours here — everything else reads from this.
 *
 * Real business details sourced from the shop's GST tax invoice.
 * TODO(owner): confirm business hours + domain; add socials/Google Maps link.
 */

export const site = {
  name: "Unique Tech Point",
  shortName: "UTP",
  legalName: "Unique Tech Point",
  tagline: "Computers, CCTV & IT Services in Bhiwadi",
  description:
    "Unique Tech Point is Bhiwadi's trusted IT shop for laptops, desktops, custom PC builds, printers, CCTV cameras and IT services — for homes and businesses.",

  // Canonical URL (used by metadata, sitemap, canonicals). TODO(owner): real domain.
  url: "https://www.uniquetechpoint.com",

  // Contact — real details from the shop's tax invoice.
  phone: "+917737083723",
  phoneDisplay: "+91 77370 83723",
  whatsapp: "917737083723", // digits only, no + (for wa.me links)
  email: "utpbhiwadi@gmail.com",

  // Tax / registration (shown in footer for credibility)
  gstin: "08AWJPG8499C1Z4",
  pan: "AWJPG8499C",

  // Location / NAP (must match Google Business Profile exactly)
  address: {
    line1: "SR-221, Opp. Shyam Vatika",
    line2: "Samtal Road, Bhiwadi, Alwar (Raj.)",
    city: "Bhiwadi",
    state: "Rajasthan",
    postalCode: "301019",
    country: "IN",
  },
  areaServed: ["Bhiwadi", "Tapukara", "Chopanki", "Khushkhera", "Alwar", "Neemrana"],

  // Opening hours — 24h "HH:MM". TODO(owner): confirm.
  hours: {
    weekdays: { open: "10:00", close: "20:00" },
    sunday: { open: "10:00", close: "17:00", closed: false },
    days: "Mon – Sat",
  },

  // Social / external profiles for JSON-LD sameAs + footer. TODO(owner).
  social: {
    facebook: "",
    instagram: "",
    googleMaps: "",
    justdial:
      "https://www.justdial.com/Bhiwadi/Unique-Tech-Point-Opp-Shyam-Vatika-Bhiwadi-Industrial-Area/9999P1493-1493-170430151019-M4Y1_BZDET",
  },

  priceRange: "₹₹",
  locale: "en_IN",
  currency: "INR",
} as const;

/** wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link from the raw phone number. */
export const telLink = `tel:${site.phone}`;

/** Full one-line address string. */
export const fullAddress = [
  site.address.line1,
  site.address.line2,
  `${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
].join(", ");
