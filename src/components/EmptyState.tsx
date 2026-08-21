import { useApp } from "@/context/AppContext";
import { PixelCharacter } from "./PixelCharacters";

export function EmptyState() {
  const { settings, resetFilters } = useApp();

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {settings.characters && (
        <PixelCharacter character="loot" size="w-20 h-20" />
      )}
      <div className="text-center">
        <h3 className="font-pixel text-sm text-foreground text-crt-shift mb-2">
          NO LOOT FOUND
        </h3>
        <p className="text-sm text-muted-foreground">
          The loot is hiding. Try adjusting your filters or search.
        </p>
      </div>
      <button
        onClick={resetFilters}
        className="font-pixel text-[9px] px-6 py-2.5 bg-surface border border-border rounded-lg text-foreground hover:border-cyan/50 transition-colors cursor-pointer"
      >
        CLEAR FILTERS
      </button>
    </div>
  );
}
