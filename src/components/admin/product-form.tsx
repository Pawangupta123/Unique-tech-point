"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { saveProduct, type ProductFormState } from "@/app/actions/products";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/types";

const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring";

function specsToText(specs: Record<string, string> | null): string {
  if (!specs) return "";
  return Object.entries(specs)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function textToSpecs(text: string): Record<string, string> | null {
  const entries = text
    .split("\n")
    .map((l) => l.split(/:(.+)/))
    .filter((p) => p[0]?.trim() && p[1]?.trim())
    .map((p) => [p[0].trim(), p[1].trim()] as const);
  return entries.length ? Object.fromEntries(entries) : null;
}

export function ProductForm({ product }: { product?: Product }) {
  const [state, formAction] = useActionState<ProductFormState, FormData>(saveProduct, {});
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [specsText, setSpecsText] = useState(specsToText(product?.specs ?? null));

  const specsJson = JSON.stringify(textToSpecs(specsText) ?? "");

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="specs" value={specsJson} />

      {/* Images */}
      <Field label="Photos">
        <ImageUploader value={images} onChange={setImages} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" required>
          <Input name="title" defaultValue={product?.title} required placeholder="HP 15s Core i5 Laptop" />
        </Field>
        <Field label="Brand">
          <Input name="brand" defaultValue={product?.brand ?? ""} placeholder="HP" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Category" required>
          <select name="category_slug" defaultValue={product?.category_slug ?? ""} required className={selectClass}>
            <option value="" disabled>Select…</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Price (₹)">
          <Input name="price" type="number" min="0" step="1" defaultValue={product?.price ?? ""} placeholder="52990" />
        </Field>
        <Field label="Price label">
          <Input name="price_label" defaultValue={product?.price_label ?? ""} placeholder="Starting from" />
        </Field>
      </div>

      <Field label="Short description">
        <Input name="short_description" defaultValue={product?.short_description ?? ""} placeholder={'16GB RAM · 512GB SSD · 15.6" FHD'} />
      </Field>

      <Field label="Full description">
        <Textarea name="description" rows={4} defaultValue={product?.description ?? ""} />
      </Field>

      <Field label="Specifications (one per line, e.g. RAM: 16GB)">
        <Textarea rows={4} value={specsText} onChange={(e) => setSpecsText(e.target.value)} placeholder={"RAM: 16GB\nStorage: 512GB SSD"} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Checkbox name="in_stock" label="In stock" defaultChecked={product?.in_stock ?? true} />
        <Checkbox name="featured" label="Featured on home" defaultChecked={product?.featured ?? false} />
      </div>

      <details className="rounded-lg border p-4">
        <summary className="cursor-pointer text-sm font-medium">SEO (optional)</summary>
        <div className="mt-4 space-y-4">
          <Field label="Meta title">
            <Input name="meta_title" defaultValue={product?.meta_title ?? ""} />
          </Field>
          <Field label="Meta description">
            <Textarea name="meta_description" rows={2} defaultValue={product?.meta_description ?? ""} />
          </Field>
          <Field label="Slug (auto from title if empty)">
            <Input name="slug" defaultValue={product?.slug ?? ""} placeholder="hp-15s-core-i5" />
          </Field>
        </div>
      </details>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <SubmitButton editing={Boolean(product)} />
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-brand-700" />
      {label}
    </label>
  );
}

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending && <Loader2 className="size-4 animate-spin" />}
      {editing ? "Save changes" : "Create product"}
    </Button>
  );
}
