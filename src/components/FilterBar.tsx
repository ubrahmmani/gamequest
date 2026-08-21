import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getPriceRanges } from "@/lib/currency";
import type { Genre, Platform } from "@/types";
import { cn } from "@/lib/utils";

const ALL_GENRES: Genre[] = [
  "Action",
  "RPG",
  "Adventure",
  "Strategy",
  "Simulation",
  "Indie",
  "Sports",
  "Horror",
];

const ALL_PLATFORMS: Platform[] = ["PC", "PlayStation", "Xbox", "Switch"];

const DISCOUNT_RANGES = [
  { label: "10%+", min: 10 },
  { label: "25%+", min: 25 },
  { label: "50%+", min: 50 },
  { label: "75%+", min: 75 },
];

export function FilterBar() {
  const { filters, setFilters, regionId, resetFilters } = useApp();
  const [expanded, setExpanded] = useState(false);
  const priceRanges = getPriceRanges(regionId);

  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.platforms.length > 0 ||
    filters.maxPrice !== null ||
    filters.minDiscount > 0;

  const toggleGenre = (genre: Genre) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const togglePlatform = (platform: Platform) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const setMaxPrice = (max: number | null) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: prev.maxPrice === max ? null : max,
    }));
  };

  const setMinDiscount = (min: number) => {
    setFilters((prev) => ({
      ...prev,
      minDiscount: prev.minDiscount === min ? 0 : min,
    }));
  };

  return (
    <div className="w-full">
      {/* Filter toggle + active filter chips */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors font-pixel text-[8px] md:text-[9px] cursor-pointer",
            expanded
              ? "border-cyan bg-cyan/10 text-cyan"
              : "border-border text-muted-foreground hover:border-cyan/50 hover:text-foreground",
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          FILTERS
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-magenta/30 text-magenta hover:bg-magenta/10 transition-colors font-pixel text-[7px] cursor-pointer"
          >
            <X className="w-3 h-3" />
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Expanded filter panel */}
      {expanded && (
        <div className="mt-4 p-5 bg-screen-dark border border-border rounded-lg space-y-5">
          {/* Genres */}
          <div>
            <h4 className="font-pixel text-[8px] text-cyan mb-3 tracking-wider">
              GENRE
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALL_GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border",
                    filters.genres.includes(genre)
                      ? "bg-cyan/15 border-cyan/40 text-cyan"
                      : "bg-surface border-border text-muted-foreground hover:border-cyan/30 hover:text-foreground",
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-pixel text-[8px] text-cyan mb-3 tracking-wider">
              PLATFORM
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALL_PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border",
                    filters.platforms.includes(platform)
                      ? "bg-cyan/15 border-cyan/40 text-cyan"
                      : "bg-surface border-border text-muted-foreground hover:border-cyan/30 hover:text-foreground",
                  )}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-pixel text-[8px] text-cyan mb-3 tracking-wider">
              MAX PRICE
            </h4>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.max}
                  onClick={() => setMaxPrice(range.max)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border",
                    filters.maxPrice === range.max
                      ? "bg-cyan/15 border-cyan/40 text-cyan"
                      : "bg-surface border-border text-muted-foreground hover:border-cyan/30 hover:text-foreground",
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div>
            <h4 className="font-pixel text-[8px] text-cyan mb-3 tracking-wider">
              MIN DISCOUNT
            </h4>
            <div className="flex flex-wrap gap-2">
              {DISCOUNT_RANGES.map((range) => (
                <button
                  key={range.min}
                  onClick={() => setMinDiscount(range.min)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border",
                    filters.minDiscount === range.min
                      ? "bg-neon-green/15 border-neon-green/40 text-neon-green"
                      : "bg-surface border-border text-muted-foreground hover:border-neon-green/30 hover:text-foreground",
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
