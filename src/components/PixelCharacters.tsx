import type { CharacterId, CharacterState } from "@/types";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

// ===== LOOT - Cute Pixel Cat (Deal Hunter) =====
function LootSVG() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Body */}
      <rect x="8" y="12" width="16" height="12" fill="#00F0FF" />
      {/* Head */}
      <rect x="6" y="4" width="20" height="12" fill="#00F0FF" />
      {/* Ears */}
      <rect x="6" y="2" width="4" height="4" fill="#00F0FF" />
      <rect x="22" y="2" width="4" height="4" fill="#00F0FF" />
      <rect x="7" y="3" width="2" height="2" fill="#FF2BD6" />
      <rect x="23" y="3" width="2" height="2" fill="#FF2BD6" />
      {/* Eyes */}
      <rect x="10" y="8" width="4" height="4" fill="#08080C" />
      <rect x="18" y="8" width="4" height="4" fill="#08080C" />
      <rect x="11" y="9" width="2" height="2" fill="#F5F5F5" />
      <rect x="19" y="9" width="2" height="2" fill="#F5F5F5" />
      {/* Nose */}
      <rect x="15" y="11" width="2" height="1" fill="#FF2BD6" />
      {/* Mouth */}
      <rect x="13" y="12" width="6" height="1" fill="#08080C" />
      {/* Tail */}
      <rect x="24" y="14" width="2" height="2" fill="#00F0FF" />
      <rect x="26" y="12" width="2" height="2" fill="#00F0FF" />
      <rect x="27" y="10" width="2" height="2" fill="#00F0FF" />
      {/* Paws */}
      <rect x="8" y="24" width="4" height="2" fill="#00F0FF" />
      <rect x="20" y="24" width="4" height="2" fill="#00F0FF" />
      {/* Whiskers */}
      <rect x="3" y="9" width="3" height="1" fill="#F5F5F5" opacity="0.6" />
      <rect x="3" y="11" width="3" height="1" fill="#F5F5F5" opacity="0.6" />
      <rect x="26" y="9" width="3" height="1" fill="#F5F5F5" opacity="0.6" />
      <rect x="26" y="11" width="3" height="1" fill="#F5F5F5" opacity="0.6" />
    </svg>
  );
}

// ===== BYTE - Cute Pixel Alien (Regional Scanner) =====
function ByteSVG() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Head - large oval */}
      <rect x="8" y="2" width="16" height="14" fill="#65FF72" />
      <rect x="6" y="4" width="2" height="10" fill="#65FF72" />
      <rect x="24" y="4" width="2" height="10" fill="#65FF72" />
      {/* Eyes - big and alien */}
      <rect x="10" y="6" width="5" height="6" fill="#08080C" />
      <rect x="17" y="6" width="5" height="6" fill="#08080C" />
      <rect x="11" y="7" width="2" height="2" fill="#65FF72" />
      <rect x="18" y="7" width="2" height="2" fill="#65FF72" />
      {/* Antenna */}
      <rect x="15" y="0" width="2" height="3" fill="#FFD84D" />
      <rect x="14" y="0" width="4" height="1" fill="#FFD84D" />
      {/* Body */}
      <rect x="10" y="16" width="12" height="8" fill="#65FF72" />
      {/* Arms */}
      <rect x="6" y="18" width="4" height="2" fill="#65FF72" />
      <rect x="22" y="18" width="4" height="2" fill="#65FF72" />
      {/* Feet */}
      <rect x="10" y="24" width="4" height="2" fill="#65FF72" />
      <rect x="18" y="24" width="4" height="2" fill="#65FF72" />
      {/* Belt */}
      <rect x="10" y="20" width="12" height="2" fill="#FF2BD6" />
      <rect x="15" y="20" width="2" height="2" fill="#FFD84D" />
    </svg>
  );
}

// ===== BARGAIN - Cute Pixel Frog (Deal Specialist) =====
function BargainSVG() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Body */}
      <rect x="8" y="10" width="16" height="12" fill="#FF2BD6" />
      {/* Head - wide frog */}
      <rect x="4" y="4" width="24" height="10" fill="#FF2BD6" />
      {/* Eyes on top (frog style) */}
      <rect x="6" y="2" width="6" height="4" fill="#FF2BD6" />
      <rect x="20" y="2" width="6" height="4" fill="#FF2BD6" />
      <rect x="8" y="2" width="3" height="3" fill="#F5F5F5" />
      <rect x="22" y="2" width="3" height="3" fill="#F5F5F5" />
      <rect x="9" y="3" width="2" height="2" fill="#08080C" />
      <rect x="23" y="3" width="2" height="2" fill="#08080C" />
      {/* Mouth */}
      <rect x="10" y="11" width="12" height="2" fill="#08080C" />
      <rect x="11" y="10" width="2" height="1" fill="#FF2BD6" />
      <rect x="19" y="10" width="2" height="1" fill="#FF2BD6" />
      {/* Belly */}
      <rect x="12" y="14" width="8" height="6" fill="#FF8AE0" />
      {/* Legs */}
      <rect x="6" y="22" width="6" height="4" fill="#FF2BD6" />
      <rect x="20" y="22" width="6" height="4" fill="#FF2BD6" />
      {/* Crown (for S-rank moments) */}
      <rect x="10" y="0" width="2" height="2" fill="#FFD84D" />
      <rect x="14" y="0" width="4" height="1" fill="#FFD84D" />
      <rect x="20" y="0" width="2" height="2" fill="#FFD84D" />
    </svg>
  );
}

// ===== SCRAPPY - Tiny Pixel Robot (Data Assistant) =====
function ScrappySVG() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Antenna */}
      <rect x="15" y="0" width="2" height="3" fill="#FFD84D" />
      <rect x="14" y="0" width="4" height="1" fill="#FFD84D" />
      {/* Head - boxy robot */}
      <rect x="8" y="3" width="16" height="10" fill="#A0A0B0" />
      {/* Screen face */}
      <rect x="10" y="5" width="12" height="6" fill="#08080C" />
      {/* Eyes - pixel LEDs */}
      <rect x="11" y="6" width="3" height="2" fill="#00F0FF" />
      <rect x="18" y="6" width="3" height="2" fill="#00F0FF" />
      {/* Mouth - LED bar */}
      <rect x="12" y="9" width="8" height="1" fill="#65FF72" />
      {/* Body */}
      <rect x="10" y="13" width="12" height="10" fill="#A0A0B0" />
      {/* Chest light */}
      <rect x="14" y="15" width="4" height="4" fill="#FF2BD6" />
      <rect x="15" y="16" width="2" height="2" fill="#FFD84D" />
      {/* Arms */}
      <rect x="6" y="14" width="4" height="2" fill="#A0A0B0" />
      <rect x="22" y="14" width="4" height="2" fill="#A0A0B0" />
      {/* Hands */}
      <rect x="5" y="15" width="2" height="2" fill="#FFD84D" />
      <rect x="25" y="15" width="2" height="2" fill="#FFD84D" />
      {/* Legs */}
      <rect x="11" y="23" width="3" height="4" fill="#A0A0B0" />
      <rect x="18" y="23" width="3" height="4" fill="#A0A0B0" />
      {/* Feet */}
      <rect x="10" y="27" width="5" height="2" fill="#A0A0B0" />
      <rect x="17" y="27" width="5" height="2" fill="#A0A0B0" />
    </svg>
  );
}

// ===== CACHE - Tiny Pixel Dragon (Guardian) =====
function CacheSVG() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
      {/* Wings */}
      <rect x="2" y="6" width="6" height="8" fill="#A78BFA" />
      <rect x="24" y="6" width="6" height="8" fill="#A78BFA" />
      <rect x="4" y="4" width="4" height="4" fill="#A78BFA" opacity="0.7" />
      <rect x="24" y="4" width="4" height="4" fill="#A78BFA" opacity="0.7" />
      {/* Head */}
      <rect x="10" y="4" width="12" height="10" fill="#A78BFA" />
      {/* Horns */}
      <rect x="10" y="2" width="2" height="3" fill="#FFD84D" />
      <rect x="20" y="2" width="2" height="3" fill="#FFD84D" />
      {/* Eyes */}
      <rect x="12" y="6" width="3" height="3" fill="#08080C" />
      <rect x="17" y="6" width="3" height="3" fill="#08080C" />
      <rect x="13" y="7" width="1" height="1" fill="#FFD84D" />
      <rect x="18" y="7" width="1" height="1" fill="#FFD84D" />
      {/* Snout */}
      <rect x="14" y="10" width="4" height="2" fill="#C4B5FD" />
      <rect x="15" y="11" width="1" height="1" fill="#08080C" />
      <rect x="17" y="11" width="1" height="1" fill="#08080C" />
      {/* Body */}
      <rect x="10" y="14" width="12" height="10" fill="#A78BFA" />
      {/* Belly */}
      <rect x="12" y="16" width="8" height="6" fill="#C4B5FD" />
      {/* Belly spots */}
      <rect x="13" y="17" width="2" height="2" fill="#FFD84D" opacity="0.5" />
      <rect x="17" y="19" width="2" height="2" fill="#FFD84D" opacity="0.5" />
      {/* Legs */}
      <rect x="10" y="24" width="4" height="3" fill="#A78BFA" />
      <rect x="18" y="24" width="4" height="3" fill="#A78BFA" />
      {/* Tail */}
      <rect x="22" y="18" width="4" height="2" fill="#A78BFA" />
      <rect x="25" y="16" width="3" height="2" fill="#A78BFA" />
      <rect x="27" y="14" width="2" height="2" fill="#FFD84D" />
      {/* Flame at tail tip */}
      <rect x="28" y="13" width="2" height="2" fill="#FF2BD6" />
    </svg>
  );
}

const CHARACTER_COMPONENTS: Record<CharacterId, React.FC> = {
  loot: LootSVG,
  byte: ByteSVG,
  bargain: BargainSVG,
  scrappy: ScrappySVG,
  cache: CacheSVG,
};

const CHARACTER_SIZE: Record<CharacterId, string> = {
  loot: "w-12 h-12",
  byte: "w-10 h-10",
  bargain: "w-12 h-12",
  scrappy: "w-8 h-8",
  cache: "w-8 h-8",
};

function getAnimationClass(state: CharacterState): string {
  switch (state) {
    case "idle":
      return "char-idle";
    case "excited":
      return "char-excited";
    case "search":
      return "char-search";
    case "loading":
      return "char-loading";
    case "error":
      return "char-error";
    case "sleep":
      return "char-sleep";
    default:
      return "";
  }
}

interface PixelCharacterProps {
  character: CharacterId;
  size?: string;
  className?: string;
  showLabel?: boolean;
}

export function PixelCharacter({
  character,
  size,
  className,
  showLabel = false,
}: PixelCharacterProps) {
  const { characterStates, settings } = useApp();
  const state = characterStates[character];
  const Component = CHARACTER_COMPONENTS[character];

  if (!settings.characters) return null;
  if (!settings.animations && state !== "idle") return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        size || CHARACTER_SIZE[character],
        !settings.reducedMotion && getAnimationClass(state),
        className,
      )}
    >
      <div className="relative">
        <Component />
        {state === "sleep" && (
          <span className="absolute -top-2 -right-1 text-xs font-pixel text-muted-foreground">
            💤
          </span>
        )}
      </div>
      {showLabel && (
        <span className="font-pixel text-[6px] text-muted-foreground uppercase tracking-wider">
          {character}
        </span>
      )}
    </div>
  );
}

interface CharacterReactionProps {
  discount: number;
  className?: string;
}

export function CharacterReaction({ discount, className }: CharacterReactionProps) {
  let text = "Hmm, maybe shop around...";
  let color = "text-muted-foreground";

  if (discount >= 90) {
    text = "LEGENDARY DEAL!";
    color = "text-gold";
  } else if (discount >= 75) {
    text = "INCREDIBLE SAVINGS!";
    color = "text-magenta";
  } else if (discount >= 50) {
    text = "Great find!";
    color = "text-cyan";
  } else if (discount >= 25) {
    text = "Not bad at all!";
    color = "text-neon-green";
  }

  return (
    <span className={cn("font-pixel text-[8px] uppercase tracking-wider", color, className)}>
      {text}
    </span>
  );
}
