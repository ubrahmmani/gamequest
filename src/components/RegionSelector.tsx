import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REGION_LIST, REGIONS } from "@/data/regions";
import { useApp } from "@/context/AppContext";
import { PixelCharacter } from "./PixelCharacters";
import type { RegionId } from "@/types";

interface RegionSelectorProps {
  onComplete: () => void;
}

export function RegionSelector({ onComplete }: RegionSelectorProps) {
  const { setRegionId, fireCharacterEvent, settings } = useApp();
  const [selected, setSelected] = useState<RegionId | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (id: RegionId) => {
    if (loading) return;
    setSelected(id);
  };

  const handleConfirm = () => {
    if (!selected || loading) return;
    setLoading(true);
    fireCharacterEvent("REGION_LOADING");

    setTimeout(() => {
      setRegionId(selected);
      setConfirmed(true);
      fireCharacterEvent("REGION_SELECTED");

      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-crt-black">
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />
      <div className="absolute inset-0 crt-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Title */}
              <div className="text-center">
                <h2 className="font-pixel text-lg md:text-xl text-cyan text-crt-shift-strong">
WHERE ARE YOU SHOPPING FROM?
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Pick your region so we can show you prices in your local currency
                </p>
              </div>

              {/* Byte character */}
              {settings.characters && (
                <div className="flex items-center gap-2">
                  <PixelCharacter character="byte" size="w-10 h-10" />
                  <span className="font-pixel text-[7px] text-neon-green">
                    {loading ? "SCANNING REGION..." : "BYTE IS READY TO HELP"}
                  </span>
                </div>
              )}

              {/* Country cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {REGION_LIST.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleSelect(region.id)}
                    disabled={loading}
                    className={`
                      relative flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all
                      ${
                        selected === region.id
                          ? "border-cyan bg-cyan/10 glow-cyan"
                          : "border-border hover:border-cyan/50 bg-screen-dark hover:bg-surface"
                      }
                      ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <span className="text-3xl">{region.flag}</span>
                    <div className="text-center">
                      <p className="font-pixel text-[10px] text-foreground">
                        {region.country.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {region.currencySymbol} {region.currencyCode}
                      </p>
                    </div>
                    {selected === region.id && (
                      <motion.div
                        layoutId="region-indicator"
                        className="absolute -top-1 -right-1 w-4 h-4 bg-cyan rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Confirm button */}
              {selected && !loading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleConfirm}
                  className="font-pixel text-sm px-8 py-3 bg-cyan text-crt-black rounded-lg hover:bg-cyan/90 transition-colors cursor-pointer glow-cyan"
                >
                  LOCK REGION
                </motion.button>
              )}

              {/* Loading state */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="font-pixel text-[10px] text-magenta">
                    REGION LOCKED
                  </p>
                  <p className="font-pixel text-xs text-cyan mt-2">
                    {REGIONS[selected!].flag} {REGIONS[selected!].country.toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    CURRENCY: {REGIONS[selected!].currencySymbol} {REGIONS[selected!].currencyCode}
                  </p>
                  <p className="font-pixel text-[8px] text-neon-green mt-3">
                    FINDING THE BEST DEALS FOR YOU...
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <p className="font-pixel text-lg text-cyan text-glow-cyan">
                  REGION LOCKED
                </p>
                <p className="text-4xl mt-4">{REGIONS[selected!].flag}</p>
                <p className="font-pixel text-sm text-foreground mt-3">
                  {REGIONS[selected!].country.toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  CURRENCY: {REGIONS[selected!].currencySymbol} {REGIONS[selected!].currencyCode}
                </p>
              </div>
              {settings.characters && (
                <PixelCharacter character="loot" size="w-16 h-16" />
              )}
              <p className="font-pixel text-[10px] text-neon-green">
                LET'S GO DEAL HUNTING!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
