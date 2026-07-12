"use client";

import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import type { EnquirySource } from "@/lib/types";

/** "Get a quote" button that opens the enquiry form in a modal. */
export function EnquiryDialog({
  source,
  productId,
  serviceId,
  subject,
  label = "Get a quote",
  size = "lg",
  className,
}: {
  source: EnquirySource;
  productId?: number;
  serviceId?: number;
  subject?: string;
  label?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={size} className={className}>
          <MessageSquareText className="size-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send an enquiry</DialogTitle>
          <DialogDescription>
            {subject ? `About: ${subject}` : "Tell us what you need and we'll get back to you."}
          </DialogDescription>
        </DialogHeader>
        <EnquiryForm
          source={source}
          productId={productId}
          serviceId={serviceId}
          subject={subject}
          onSuccess={() => setTimeout(() => setOpen(false), 1800)}
        />
      </DialogContent>
    </Dialog>
  );
}
