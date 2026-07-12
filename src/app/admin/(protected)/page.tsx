import Link from "next/link";
import { Package, Inbox, BellDot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardCounts, getEnquiries } from "@/lib/admin-queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminDashboard() {
  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h1 className="text-xl font-bold">Almost there</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your Supabase keys to <code className="rounded bg-muted px-1">.env.local</code> and run
          the SQL in <code className="rounded bg-muted px-1">supabase/schema.sql</code> to activate
          the admin panel.
        </p>
      </div>
    );
  }

  const [counts, enquiries] = await Promise.all([getDashboardCounts(), getEnquiries()]);
  const recent = enquiries.slice(0, 5);

  const stats = [
    { label: "Products", value: counts.products, icon: Package, href: "/admin/products" },
    { label: "Total enquiries", value: counts.enquiries, icon: Inbox, href: "/admin/enquiries" },
    { label: "New enquiries", value: counts.newEnquiries, icon: BellDot, href: "/admin/enquiries" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            Add product
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:border-brand-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="size-5 text-brand-700" />
            </div>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Recent enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-medium text-brand-700 hover:underline">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No enquiries yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{e.name} · {e.phone}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {e.subject || e.message || e.source}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs capitalize">
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
