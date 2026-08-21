import { useState, useEffect, useCallback, useMemo } from "react";
import { useApp } from "@/context/AppContext";

const STATUS_MESSAGES = [
  "BOOTING UP GAMEQUEST...",
  "LOADING GAME CATALOG...",
  "SCANNING REGIONAL PRICES...",
  "CALIBRATING DEAL ENGINE...",
  "PREPARING YOUR DASHBOARD...",
  "READY TO FIND SOME DEALS!",
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const { settings } = useApp();
  const reducedMotion = settings.reducedMotion;

  const [progress, setProgress] = useState(() =>
    reducedMotion ? 100 : 0,
  );
  const [showPressStart, setShowPressStart] = useState(() => reducedMotion);
  const [bootComplete, setBootComplete] = useState(false);

  // Derived value instead of state — avoids setState in effect
  const currentMessage = useMemo(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * STATUS_MESSAGES.length),
      STATUS_MESSAGES.length - 1,
    );
    return idx;
  }, [progress]);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12 + 3;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Show PRESS START after progress reaches 100
  useEffect(() => {
    if (reducedMotion) return;
    if (progress >= 100 && !showPressStart) {
      const t = setTimeout(() => setShowPressStart(true), 500);
      return () => clearTimeout(t);
    }
  }, [progress, showPressStart, reducedMotion]);

  const handleStart = useCallback(() => {
    if (!showPressStart) return;
    setBootComplete(true);
    setTimeout(() => onComplete(), 600);
  }, [showPressStart, onComplete]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleStart]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-crt-black transition-opacity duration-500 ${
        bootComplete ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />
      <div className="absolute inset-0 crt-vignette pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-lg w-full">
        <div className="text-center">
          <h1 className="font-pixel text-3xl md:text-4xl text-cyan text-crt-shift-strong tracking-wider">
            GAMEQUEST
          </h1>
          <p className="font-pixel text-[8px] md:text-[10px] text-magenta mt-3 tracking-[0.3em]">
            YOUR NEXT FAVORITE GAME AT THE BEST PRICE
          </p>
        </div>

        <div className="w-full text-left">
          <p className="font-pixel text-[8px] md:text-[10px] text-neon-green min-h-[20px]">
            &gt; {STATUS_MESSAGES[currentMessage]}
          </p>
        </div>

        <div className="w-full">
          <div className="w-full h-3 bg-screen-dark border border-border rounded-sm overflow-hidden">
            <div
              className="h-full boot-progress rounded-sm"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-pixel text-[8px] text-muted-foreground">
              LOADED
            </span>
            <span className="font-pixel text-[8px] text-cyan">
              {Math.round(Math.min(progress, 100))}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 32 32" style={{ imageRendering: "pixelated" }}>
              <rect x="8" y="3" width="16" height="10" fill="#65FF72" />
              <rect x="6" y="5" width="2" height="6" fill="#65FF72" />
              <rect x="24" y="5" width="2" height="6" fill="#65FF72" />
              <rect x="10" y="5" width="4" height="4" fill="#08080C" />
              <rect x="18" y="5" width="4" height="4" fill="#08080C" />
              <rect x="11" y="6" width="2" height="2" fill="#65FF72" />
              <rect x="19" y="6" width="2" height="2" fill="#65FF72" />
              <rect x="15" y="0" width="2" height="3" fill="#FFD84D" />
              <rect x="10" y="13" width="12" height="8" fill="#65FF72" />
              <rect x="6" y="15" width="4" height="2" fill="#65FF72" />
              <rect x="22" y="15" width="4" height="2" fill="#65FF72" />
              <rect x="10" y="21" width="4" height="2" fill="#65FF72" />
              <rect x="18" y="21" width="4" height="2" fill="#65FF72" />
            </svg>
          </div>
          <span className="font-pixel text-[7px] text-neon-green">
            BYTE IS SCANNING...
          </span>
        </div>

        {showPressStart && (
          <button
            onClick={handleStart}
            className="mt-4 font-pixel text-sm md:text-base text-gold blink hover:text-cyan transition-colors cursor-pointer focus:outline-none"
          >
            ▶ PRESS START ◀
          </button>
        )}
      </div>
    </div>
  );
}
