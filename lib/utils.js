import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(value, options = {}) {
  const { showSign = false, compact = false } = options ?? {};

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...(compact && { notation: "compact" }),
  });

  const formatted = formatter.format(Math.abs(value));

  if (showSign && value > 0) return `+${formatted}`;
  if (showSign && value < 0) return `-${formatted}`;
  return formatted;
}

export function formatNumber(value) {
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
}
