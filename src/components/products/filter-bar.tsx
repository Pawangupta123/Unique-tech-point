"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";

const ALL = "__all__";

/** Category / brand / in-stock filters that drive the /products query string. */
export function FilterBar({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const current = {
    category: params.get("category") ?? ALL,
    brand: params.get("brand") ?? ALL,
    stock: params.get("stock") === "1",
  };
  const hasFilters =
    current.category !== ALL || current.brand !== ALL || current.stock || params.get("q");

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value && value !== ALL) next.set(key, value);
    else next.delete(key);
    router.push(`/products?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={current.category} onValueChange={(v) => update("category", v)}>
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={current.brand} onValueChange={(v) => update("brand", v)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All brands</SelectItem>
          {brands.map((b) => (
            <SelectItem key={b} value={b}>
              {b}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant={current.stock ? "default" : "outline"}
        onClick={() => update("stock", current.stock ? null : "1")}
      >
        In stock
      </Button>

      {hasFilters && (
        <Button variant="ghost" onClick={() => router.push("/products")}>
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
