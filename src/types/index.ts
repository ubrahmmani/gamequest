export type RegionId = "india" | "usa" | "uk" | "japan" | "china";

export interface Region {
  id: RegionId;
  country: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
}

export type Genre =
  | "Action"
  | "RPG"
  | "Adventure"
  | "Strategy"
  | "Simulation"
  | "Indie"
  | "Sports"
  | "Horror";

export type Platform = "PC" | "PlayStation" | "Xbox" | "Switch";

export interface Game {
  id: string;
  title: string;
  genre: Genre;
  platform: Platform;
  imageUrl: string;
  store: string;
  storeUrl: string;
  prices: Record<RegionId, RegionalPrice>;
  tags: string[];
}

export interface RegionalPrice {
  currentPrice: number;
  originalPrice: number;
  discount: number;
  isConverted: boolean;
}

export type DealRank = "S" | "A" | "B" | "C" | "D" | "F";

export interface DealScore {
  dealPower: number;
  rank: DealRank;
  discountPercent: number;
  savingsAmount: number;
}

export type CharacterId = "loot" | "byte" | "bargain" | "scrappy" | "cache";

export type CharacterState =
  | "idle"
  | "walk"
  | "search"
  | "loading"
  | "excited"
  | "sad"
  | "error"
  | "sleep";

export interface CharacterEvent {
  character: CharacterId;
  state: CharacterState;
}

export type SortOption =
  | "best-deal"
  | "highest-discount"
  | "lowest-price"
  | "highest-price"
  | "a-z";

export interface Filters {
  search: string;
  genres: Genre[];
  platforms: Platform[];
  maxPrice: number | null;
  minDiscount: number;
}

export interface AppSettings {
  characters: boolean;
  animations: boolean;
  crtEffects: boolean;
  sound: boolean;
  reducedMotion: boolean;
}

export type GameEventType =
  | "BOOT"
  | "REGION_SELECTED"
  | "REGION_LOADING"
  | "SCANNING"
  | "DEAL_FOUND"
  | "S_RANK_FOUND"
  | "SEARCH_EMPTY"
  | "SCRAPER_ERROR"
  | "PRICE_DROP"
  | "ACHIEVEMENT"
  | "USER_IDLE";
