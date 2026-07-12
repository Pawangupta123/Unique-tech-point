import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL, isSupabaseConfigured } from "@/lib/supabase/config";
import type { User } from "@supabase/supabase-js";

/**
 * Returns the verified admin user, or null. Uses getUser() (revalidates the
 * JWT with Supabase — not just a cookie read) and enforces the ADMIN_EMAIL
 * allow-list. Call this in the admin layout and in every admin Server Action.
 */
export async function getAdminUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  if (ADMIN_EMAIL && user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return null;
  }
  return user;
}
