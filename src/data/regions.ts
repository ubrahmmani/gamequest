import type { Region, RegionId } from "@/types";

export const REGIONS: Record<RegionId, Region> = {
  india: {
    id: "india",
    country: "India",
    flag: "🇮🇳",
    currencyCode: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    accentColor: "#00F0FF",
  },
  usa: {
    id: "usa",
    country: "USA",
    flag: "🇺🇸",
    currencyCode: "USD",
    currencySymbol: "$",
    locale: "en-US",
    accentColor: "#65FF72",
  },
  uk: {
    id: "uk",
    country: "UK",
    flag: "🇬🇧",
    currencyCode: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    accentColor: "#FF2BD6",
  },
  japan: {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    currencyCode: "JPY",
    currencySymbol: "¥",
    locale: "ja-JP",
    accentColor: "#FFD84D",
  },
  china: {
    id: "china",
    country: "China",
    flag: "🇨🇳",
    currencyCode: "CNY",
    currencySymbol: "¥",
    locale: "zh-CN",
    accentColor: "#A78BFA",
  },
};

export const REGION_LIST = Object.values(REGIONS);
