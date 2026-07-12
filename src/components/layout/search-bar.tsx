"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Search box → navigates to /products?q=... (server-rendered, crawlable results). */
export function SearchBar({
  className,
  placeholder = "Search laptops, printers, CCTV…",
  autoFocus = false,
  onSubmitted,
}: {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search products"
        className="pl-9"
      />
    </form>
  );
}
