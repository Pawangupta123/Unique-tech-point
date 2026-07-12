"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateEnquiryStatus } from "@/app/actions/enquiries";
import type { EnquiryStatus } from "@/lib/types";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "closed"];

export function EnquiryStatusControl({ id, status }: { id: number; status: EnquiryStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(async () => {
          await updateEnquiryStatus(id, e.target.value as EnquiryStatus);
          toast.success("Status updated");
        })
      }
      className="h-8 rounded-md border border-input bg-transparent px-2 text-xs capitalize outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}
