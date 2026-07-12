import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/auth";
import type { Enquiry, Product } from "@/lib/types";

/** All products for the admin table (service-role read). */
export async function getAdminProducts(): Promise<Product[]> {
  if (!(await getAdminUser())) return [];
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminProduct(id: number): Promise<Product | null> {
  if (!(await getAdminUser())) return null;
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  return data ?? null;
}

/** Enquiries for the admin inbox (anon can't read these — service-role only). */
export async function getEnquiries(): Promise<Enquiry[]> {
  if (!(await getAdminUser())) return [];
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Enquiry[]) ?? [];
}

/** Counts for the dashboard. */
export async function getDashboardCounts() {
  if (!(await getAdminUser())) return { products: 0, enquiries: 0, newEnquiries: 0 };
  const supabase = createSupabaseAdminClient();
  const [{ count: products }, { count: enquiries }, { count: newEnquiries }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);
  return {
    products: products ?? 0,
    enquiries: enquiries ?? 0,
    newEnquiries: newEnquiries ?? 0,
  };
}
