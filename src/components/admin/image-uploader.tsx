"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Star } from "lucide-react";
import { toast } from "sonner";
import { uploadProductImages } from "@/app/actions/products";
import { cn } from "@/lib/utils";

/** Controlled multi-image uploader. First image is the primary/cover. */
export function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));

    setUploading(true);
    const res = await uploadProductImages(fd);
    setUploading(false);
    e.target.value = "";

    if (res.error) {
      toast.error(res.error);
      return;
    }
    onChange([...value, ...res.urls]);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={url} className="group relative size-24 overflow-hidden rounded-lg border">
            <Image src={url} alt="" fill sizes="96px" className="object-cover" />
            {i === 0 && (
              <span className="absolute left-1 top-1 rounded bg-brand-700 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Cover
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              {i !== 0 && (
                <button
                  type="button"
                  onClick={() => onChange([url, ...value.filter((u) => u !== url)])}
                  className="rounded bg-white/90 p-1 text-brand-700"
                  aria-label="Make cover"
                >
                  <Star className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onChange(value.filter((u) => u !== url))}
                className="rounded bg-white/90 p-1 text-destructive"
                aria-label="Remove"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        ))}

        <label
          className={cn(
            "flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-muted-foreground hover:border-brand-300 hover:text-brand-700",
            uploading && "pointer-events-none opacity-60",
          )}
        >
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
          <span className="text-xs">{uploading ? "Uploading…" : "Add"}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
            disabled={uploading}
          />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">
        First image is the cover. Hover an image to set cover or remove.
      </p>
    </div>
  );
}
