import Image from "next/image";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * Product image with a branded fallback. When a product has no uploaded photo
 * yet, we render the category icon on a soft gradient instead of a broken box.
 */
export function ProductImage({
  src,
  alt,
  icon,
  sizes,
  priority = false,
  className,
}: {
  src?: string;
  alt: string;
  icon?: string | null;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-muted", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-linear-to-br from-brand-50 to-brand-100">
          <Icon name={icon} className="size-12 text-brand-300" />
        </div>
      )}
    </div>
  );
}
