/** Supabase env config + a helper to detect whether it's wired up yet. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

/**
 * True once the public Supabase env vars are present. When false, the site
 * gracefully falls back to sample data so it always renders.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Storage bucket that holds product images. */
export const PRODUCT_IMAGES_BUCKET = "product-images";
