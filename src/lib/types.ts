/** Shared domain types — single source of truth for data shapes across the app. */

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | null;
  price_label: string | null;
  category_id: number | null;
  brand: string | null;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  specs: Record<string, string> | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

/** Product joined with its category (for listings/detail). */
export type ProductWithCategory = Product & {
  category: Pick<Category, "name" | "slug"> | null;
};

export type Service = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  icon: string | null;
  image: string | null;
  price_label: string | null;
  featured: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type EnquirySource = "product" | "service" | "contact" | "general";
export type EnquiryStatus = "new" | "contacted" | "closed";

export type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  product_id: number | null;
  service_id: number | null;
  source: EnquirySource;
  status: EnquiryStatus;
  created_at: string;
};

/** Filters parsed from the products page search params. */
export type ProductFilters = {
  q?: string;
  category?: string;
  brand?: string;
  stock?: boolean;
};
