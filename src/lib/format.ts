/** Formatting helpers shared across product UI. */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Price → "₹52,990", or a friendly fallback when there's no price. */
export function formatPrice(
  price: number | null | undefined,
  label?: string | null,
): string {
  if (price == null) return label?.trim() || "Ask for price";
  const formatted = inr.format(price);
  return label?.trim() ? `${label} ${formatted}` : formatted;
}
