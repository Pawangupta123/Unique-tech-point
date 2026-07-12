import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · UTP Admin" },
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
