"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public site chrome (navbar/footer/floating WhatsApp) on /admin
 * routes, which have their own layout. Children are created in the server
 * layout and simply gated here.
 */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
