import type { Region, RegionId } from "@/types";
import { REGIONS } from "@/data/regions";

export function formatPrice(price: number, regionId: RegionId): string {
  const region = REGIONS[regionId];
  if (!region) return `$${price.toFixed(2)}`;

  try {
    return new Intl.NumberFormat(region.locale, {
      style: "currency",
      currency: region.currencyCode,
      minimumFractionDigits: region.currencyCode === "JPY" ? 0 : 2,
      maximumFractionDigits: region.currencyCode === "JPY" ? 0 : 2,
    }).format(price);
  } catch {
    return `${region.currencySymbol}${price.toFixed(region.currencyCode === "JPY" ? 0 : 2)}`;
  }
}

export function getPriceRanges(regionId: RegionId): { label: string; max: number }[] {
  const ranges: Record<RegionId, { label: string; max: number }[]> = {
    india: [
      { label: "Under ₹500", max: 500 },
      { label: "Under ₹1,000", max: 1000 },
      { label: "Under ₹1,500", max: 1500 },
      { label: "Under ₹2,500", max: 2500 },
      { label: "Under ₹5,000", max: 5000 },
    ],
    usa: [
      { label: "Under $10", max: 10 },
      { label: "Under $20", max: 20 },
      { label: "Under $30", max: 30 },
      { label: "Under $50", max: 50 },
      { label: "Under $70", max: 70 },
    ],
    uk: [
      { label: "Under £10", max: 10 },
      { label: "Under £20", max: 20 },
      { label: "Under £30", max: 30 },
      { label: "Under £50", max: 50 },
      { label: "Under £60", max: 60 },
    ],
    japan: [
      { label: "Under ¥1,000", max: 1000 },
      { label: "Under ¥2,000", max: 2000 },
      { label: "Under ¥3,000", max: 3000 },
      { label: "Under ¥5,000", max: 5000 },
      { label: "Under ¥10,000", max: 10000 },
    ],
    china: [
      { label: "Under ¥50", max: 50 },
      { label: "Under ¥100", max: 100 },
      { label: "Under ¥200", max: 200 },
      { label: "Under ¥300", max: 300 },
      { label: "Under ¥500", max: 500 },
    ],
  };
  return ranges[regionId] || ranges.usa;
}

export function getRegionConfig(regionId: RegionId): Region {
  return REGIONS[regionId];
}
