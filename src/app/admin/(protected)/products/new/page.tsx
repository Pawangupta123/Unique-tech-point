import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";

export const metadata = { title: "Add product" };

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Back to products
      </Link>
      <h1 className="text-2xl font-bold">Add product</h1>
      <ProductForm />
    </div>
  );
}
