"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { PRODUCT_IMAGES_BUCKET } from "@/lib/supabase/config";

export type ProductFormState = { error?: string };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function assertAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Not authorised");
}

function refreshPublic() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

/** Parse the product form fields into a DB row. */
function parseForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const specsRaw = String(formData.get("specs") ?? "").trim();
  const imagesRaw = String(formData.get("images") ?? "").trim();

  let specs: Record<string, string> | null = null;
  if (specsRaw) {
    try {
      const parsed = JSON.parse(specsRaw);
      if (parsed && typeof parsed === "object") specs = parsed;
    } catch {
      specs = null;
    }
  }

  return {
    title,
    slug: String(formData.get("slug") ?? "").trim() || slugify(title),
    short_description: String(formData.get("short_description") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    price: priceRaw ? Number(priceRaw) : null,
    price_label: String(formData.get("price_label") ?? "").trim() || null,
    category_slug: String(formData.get("category_slug") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim() || null,
    images: imagesRaw ? (JSON.parse(imagesRaw) as string[]) : [],
    in_stock: formData.get("in_stock") === "on" || formData.get("in_stock") === "true",
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    specs,
    meta_title: String(formData.get("meta_title") ?? "").trim() || null,
    meta_description: String(formData.get("meta_description") ?? "").trim() || null,
  };
}

export async function saveProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await assertAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;
  const row = parseForm(formData);

  if (!row.title || !row.category_slug) {
    return { error: "Title and category are required." };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);

  if (error) {
    if (error.code === "23505") return { error: "That slug is already used. Change the title or slug." };
    return { error: error.message };
  }

  refreshPublic();
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await assertAdmin();
  const supabase = createSupabaseAdminClient();
  await supabase.from("products").delete().eq("id", id);
  refreshPublic();
}

/** Upload image files to Storage and return their public URLs. */
export async function uploadProductImages(
  formData: FormData,
): Promise<{ urls: string[]; error?: string }> {
  await assertAdmin();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) return { urls: [] };

  const supabase = createSupabaseAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const key = `${slugify(file.name.replace(/\.[^.]+$/, ""))}-${urls.length}-${file.size}.${ext}`;
    const { error } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(key, file, { upsert: true, contentType: file.type });
    if (error) return { urls, error: error.message };
    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(key);
    urls.push(data.publicUrl);
  }

  return { urls };
}
