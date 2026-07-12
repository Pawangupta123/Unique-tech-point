/**
 * JSON-LD structured-data builders — single source of truth for SEO schema.
 * All read from `site` config so NAP stays consistent across the site.
 */
import { site, fullAddress } from "@/lib/site";
import type { ProductWithCategory, Service } from "@/lib/types";

const ORG_ID = `${site.url}/#organization`;
const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

/** LocalBusiness (the ranking backbone for local SEO). */
export function localBusinessLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "ComputerStore", "ElectronicsStore"],
    "@id": ORG_ID,
    name: site.name,
    image: abs("/logo.png"),
    logo: abs("/icon.png"),
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    address: postalAddress(),
    geo: { "@type": "GeoCoordinates", latitude: 28.2006, longitude: 76.8608 },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: site.hours.weekdays.open,
        closes: site.hours.weekdays.close,
      },
    ],
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: abs("/icon.png"),
    email: site.email,
    telephone: site.phone,
    address: postalAddress(),
  };
}

/** WebSite + sitelinks search box (points at the products search). */
export function websiteLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/products?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productLd(product: ProductWithCategory, path: string): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: abs(path),
    priceCurrency: site.currency,
    availability: product.in_stock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    seller: { "@id": ORG_ID },
  };
  if (product.price != null) offer.price = product.price;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.short_description ?? product.description ?? undefined,
    image: product.images.length ? product.images.map(abs) : abs("/logo.png"),
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category?.name,
    offers: offer,
  };
}

export function serviceLd(service: Service, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short_description ?? service.description ?? undefined,
    serviceType: service.title,
    url: abs(path),
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    provider: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
