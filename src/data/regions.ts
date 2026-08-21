import type { Region, RegionId } from "@/types";

export const REGIONS: Record<RegionId, Region> = {
  india: {
    id: "india",
    country: "India",
    flag: "🇮🇳",
    currencyCode: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
  },
  usa: {
    id: "usa",
    country: "USA",
    flag: "🇺🇸",
    currencyCode: "USD",
    currencySymbol: "$",
    locale: "en-US",
  },
  uk: {
    id: "uk",
    country: "UK",
    flag: "🇬🇧",
    currencyCode: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
  },
  japan: {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    currencyCode: "JPY",
    currencySymbol: "¥",
    locale: "ja-JP",
  },
  china: {
    id: "china",
    country: "China",
    flag: "🇨🇳",
    currencyCode: "CNY",
    currencySymbol: "¥",
    locale: "zh-CN",
  },
};

export const REGION_LIST = Object.values(REGIONS);
