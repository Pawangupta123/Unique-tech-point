"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiries";
import type { EnquirySource } from "@/lib/types";

type Props = {
  source?: EnquirySource;
  productId?: number;
  serviceId?: number;
  subject?: string;
  onSuccess?: () => void;
};

const initial: EnquiryState = { ok: false };

/** Enquiry form used on the contact page and inside the product/service dialog. */
export function EnquiryForm({ source = "general", productId, serviceId, subject, onSuccess }: Props) {
  const [state, formAction] = useActionState(submitEnquiry, initial);

  useEffect(() => {
    if (state.ok) {
      toast.success("Thanks! We'll get back to you shortly.");
      onSuccess?.();
    }
  }, [state.ok, onSuccess]);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-brand-200 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="size-8 text-brand-700" />
        <p className="font-medium">Enquiry sent!</p>
        <p className="text-sm text-muted-foreground">
          Our team will contact you soon. For anything urgent, call or WhatsApp us.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      {productId && <input type="hidden" name="productId" value={productId} />}
      {serviceId && <input type="hidden" name="serviceId" value={serviceId} />}
      {subject && <input type="hidden" name="subject" value={subject} />}

      <Field label="Your name" name="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" placeholder="e.g. Rahul Sharma" required />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
          <Input id="phone" name="phone" type="tel" placeholder="10-digit mobile" required />
        </Field>
        <Field label="Email (optional)" name="email" error={state.fieldErrors?.email}>
          <Input id="email" name="email" type="email" placeholder="you@example.com" />
        </Field>
      </div>

      <Field label="Message (optional)" name="message" error={state.fieldErrors?.message}>
        <Textarea id="message" name="message" rows={3} placeholder="Tell us what you need…" />
      </Field>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <SubmitButton />
      <p className="text-center text-xs text-muted-foreground">
        We only use your details to respond to this enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="size-4 animate-spin" />}
      {pending ? "Sending…" : "Send enquiry"}
    </Button>
  );
}
