"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/app/actions/products";

export function DeleteProductButton({ id, title }: { id: number; title: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteProduct(id);
      toast.success("Product deleted");
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={pending}
      aria-label={`Delete ${title}`}
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </Button>
  );
}
