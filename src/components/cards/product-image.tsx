import Image from "next/image";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * Presentational product image with a branded fallback. The card/gallery
 * wrappers own their own tilt/zoom motion; this stays simple and adds a subtle
 * group-hover zoom. When a product has no photo yet, we render the category
 * icon on a soft gradient instead of a broken box.
 */
export function ProductImage({
  src,
  alt,
  icon,
  sizes,
  priority = false,
  className,
  style,
}: {
  src?: string;
  alt: string;
  icon?: string | null;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("relative aspect-[4/3] overflow-hidden bg-muted", className)}
      style={style}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-linear-to-br from-brand-50 to-brand-100">
          <Icon name={icon} className="size-12 text-brand-300" />
        </div>
      )}
    </div>
  );
}
