import { Phone, Mail, Inbox } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { EnquiryStatusControl } from "@/components/admin/enquiry-status";
import { getEnquiries } from "@/lib/admin-queries";

export const metadata = { title: "Enquiries" };

const SOURCE_LABEL: Record<string, string> = {
  product: "Product",
  service: "Service",
  contact: "Contact form",
  general: "General",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enquiries</h1>

      {enquiries.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div key={e.id} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {SOURCE_LABEL[e.source] ?? e.source}
                    {e.subject ? ` · ${e.subject}` : ""}
                    {" · "}
                    {new Date(e.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <EnquiryStatusControl id={e.id} status={e.status} />
              </div>

              {e.message && <p className="mt-3 text-sm text-muted-foreground">{e.message}</p>}

              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 text-brand-700 hover:underline">
                  <Phone className="size-4" />
                  {e.phone}
                </a>
                <a
                  href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-whatsapp hover:underline"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </a>
                {e.email && (
                  <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                    <Mail className="size-4" />
                    {e.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
