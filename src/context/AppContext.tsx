import React, { createContext, useContext, useCallback, useState, useRef } from "react";
import type {
  RegionId,
  Filters,
  SortOption,
  AppSettings,
  CharacterId,
  CharacterState,
  GameEventType,
} from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AppContextValue {
  // Region
  regionId: RegionId;
  setRegionId: (id: RegionId) => void;
  regionLocked: boolean;
  setRegionLocked: (locked: boolean) => void;

  // Filters
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;

  // Sort
  sort: SortOption;
  setSort: (sort: SortOption) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;

  // Character state
  characterStates: Record<CharacterId, CharacterState>;
  setCharacterState: (character: CharacterId, state: CharacterState) => void;
  fireCharacterEvent: (event: GameEventType) => void;

  // Boot complete
  bootComplete: boolean;
  setBootComplete: (complete: boolean) => void;

  // Navigation
  activePage: string;
  setActivePage: (page: string) => void;

  // Selected game
  selectedGameId: string | null;
  setSelectedGameId: (id: string | null) => void;

  // Achievement progress
  achievementProgress: Record<string, number>;
  incrementAchievement: (field: string, amount?: number) => void;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  genres: [],
  platforms: [],
  maxPrice: null,
  minDiscount: 0,
};

const DEFAULT_SETTINGS: AppSettings = {
  characters: true,
  animations: true,
  crtEffects: true,
  sound: false,
  reducedMotion: false,
};

const DEFAULT_CHARACTERS: Record<CharacterId, CharacterState> = {
  loot: "idle",
  byte: "idle",
  bargain: "idle",
  scrappy: "idle",
  cache: "idle",
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [regionId, setRegionId] = useLocalStorage<RegionId>("gq-region", "india");
  const [regionLocked, setRegionLocked] = useLocalStorage("gq-region-locked", false);
  const [settings, setSettings] = useLocalStorage<AppSettings>("gq-settings", DEFAULT_SETTINGS);
  const [wishlist, setWishlist] = useLocalStorage<string[]>("gq-wishlist", []);
  const [bootComplete, setBootComplete] = useLocalStorage("gq-boot", false);
  const [activePage, setActivePage] = useState("discover");
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("best-deal");
  const [characterStates, setCharacterStates] = useState<Record<CharacterId, CharacterState>>(
    DEFAULT_CHARACTERS,
  );
  const [achievementProgress, setAchievementProgress] = useLocalStorage<Record<string, number>>(
    "gq-achievements",
    {},
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const toggleWishlist = useCallback(
    (gameId: string) => {
      setWishlist((prev) => {
        if (prev.includes(gameId)) {
          return prev.filter((id) => id !== gameId);
        }
        return [...prev, gameId];
      });
    },
    [],
  );

  const isInWishlist = useCallback(
    (gameId: string) => wishlist.includes(gameId),
    [wishlist],
  );

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const setCharacterState = useCallback(
    (character: CharacterId, state: CharacterState) => {
      setCharacterStates((prev) => ({ ...prev, [character]: state }));
    },
    [],
  );

  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fireCharacterEvent = useCallback(
    (event: GameEventType) => {
      // Clear idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      switch (event) {
        case "BOOT":
          setCharacterStates((prev) => ({
            ...prev,
            byte: "loading",
            scrappy: "loading",
          }));
          break;
        case "REGION_SELECTED":
          setCharacterStates((prev) => ({
            ...prev,
            byte: "excited",
            loot: "idle",
          }));
          break;
        case "REGION_LOADING":
          setCharacterStates((prev) => ({
            ...prev,
            byte: "search",
            scrappy: "loading",
          }));
          break;
        case "SCANNING":
          setCharacterStates((prev) => ({
            ...prev,
            loot: "search",
            scrappy: "loading",
          }));
          break;
        case "DEAL_FOUND":
          setCharacterStates((prev) => ({
            ...prev,
            bargain: "excited",
            loot: "idle",
          }));
          break;
        case "S_RANK_FOUND":
          setCharacterStates((prev) => ({
            ...prev,
            bargain: "excited",
            loot: "excited",
          }));
          break;
        case "SEARCH_EMPTY":
          setCharacterStates((prev) => ({
            ...prev,
            loot: "search",
            bargain: "idle",
          }));
          break;
        case "SCRAPER_ERROR":
          setCharacterStates((prev) => ({
            ...prev,
            scrappy: "error",
          }));
          break;
        case "ACHIEVEMENT":
          setCharacterStates((prev) => ({
            ...prev,
            cache: "excited",
          }));
          break;
        case "USER_IDLE":
          setCharacterStates((prev) => ({
            ...prev,
            loot: "sleep",
          }));
          break;
        default:
          break;
      }

      // Reset to idle after a delay (unless user idle)
      if (event !== "USER_IDLE") {
        idleTimerRef.current = setTimeout(() => {
          setCharacterStates((prev) => {
            const next = { ...prev };
            for (const key of Object.keys(next) as CharacterId[]) {
              if (next[key] !== "idle" && next[key] !== "sleep") {
                next[key] = "idle";
              }
            }
            return next;
          });
        }, 4000);
      }
    },
    [],
  );

  const incrementAchievement = useCallback(
    (field: string, amount = 1) => {
      setAchievementProgress((prev) => ({
        ...prev,
        [field]: (prev[field] || 0) + amount,
      }));
    },
    [],
  );

  const value: AppContextValue = {
    regionId,
    setRegionId,
    regionLocked,
    setRegionLocked,
    filters,
    setFilters,
    resetFilters,
    sort,
    setSort,
    settings,
    updateSettings,
    wishlist,
    toggleWishlist,
    isInWishlist,
    characterStates,
    setCharacterState,
    fireCharacterEvent,
    bootComplete,
    setBootComplete,
    activePage,
    setActivePage,
    selectedGameId,
    setSelectedGameId,
    achievementProgress,
    incrementAchievement,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
