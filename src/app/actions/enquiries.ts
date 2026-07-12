"use server";

import { enquirySchema } from "@/lib/validation";

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

  try {
    // Placeholder for Supabase insert (Phase 1).
    console.info("[enquiry] received:", parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call or WhatsApp us." };
  }
}
