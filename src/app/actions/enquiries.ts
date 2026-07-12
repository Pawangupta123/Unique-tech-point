"use server";

import { revalidatePath } from "next/cache";
import { enquirySchema } from "@/lib/validation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/auth";
import type { EnquiryStatus } from "@/lib/types";

export type EnquiryState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Handle a public enquiry submission.
 * TODO(Phase 1): persist to Supabase `enquiries` + notify owner (email/WhatsApp).
 * For now it validates and succeeds so the UX is fully wired.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const d = parsed.data;

  try {
    if (isSupabaseConfigured) {
      const supabase = await createSupabaseServerClient();
      // Public INSERT is allowed by RLS; SELECT is not.
      const { error } = await supabase.from("enquiries").insert({
        name: d.name,
        phone: d.phone,
        email: d.email || null,
        message: d.message || null,
        product_id: d.productId ?? null,
        subject: d.subject || null,
        source: d.source,
      });
      if (error) throw error;
    } else {
      console.info("[enquiry] received (no DB configured):", d);
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call or WhatsApp us." };
  }
}

/** Admin: update an enquiry's status (new → contacted → closed). */
export async function updateEnquiryStatus(id: number, status: EnquiryStatus) {
  const user = await getAdminUser();
  if (!user) throw new Error("Not authorised");
  const supabase = createSupabaseAdminClient();
  await supabase.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
