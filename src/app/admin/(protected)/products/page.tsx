import Link from "next/link";
import { Plus, Pencil, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { getAdminProducts } from "@/lib/admin-queries";
import { formatPrice } from "@/lib/format";
import { CATEGORIES } from "@/lib/constants";

export const metadata = { title: "Products" };

const catName = (slug: string | null) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug ?? "—";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            Add product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card py-16 text-center">
          <PackageSearch className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">No products yet. Add your first one.</p>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="size-4" />
              Add product
            </Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{catName(p.category_slug)}</td>
                  <td className="px-4 py-3">{formatPrice(p.price, p.price_label)}</td>
                  <td className="px-4 py-3">
                    {p.in_stock ? (
                      <Badge className="bg-in-stock">In stock</Badge>
                    ) : (
                      <Badge variant="secondary">Out</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" aria-label="Edit">
                        <Link href={`/admin/products/${p.id}/edit`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteProductButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
