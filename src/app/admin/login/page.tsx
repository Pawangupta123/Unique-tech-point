import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo.png" alt={site.name} width={48} height={48} className="size-12 object-contain" />
          <h1 className="mt-3 text-lg font-bold">{site.name} — Admin</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage products &amp; enquiries.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
