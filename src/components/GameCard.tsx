import { memo } from "react";
import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import { calculateDealPower, getDiscountReaction } from "@/lib/deal";
import { DealPowerBar } from "./DealPowerBar";
import { RankBadge, DealPowerScore } from "./RankBadge";
import { CharacterReaction, PixelCharacter } from "./PixelCharacters";
import type { Game, RegionId } from "@/types";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  isSRank: boolean;
  index: number;
}

function GameCardInner({ game, isSRank, index }: GameCardProps) {
  const {
    regionId,
    settings,
    toggleWishlist,
    isInWishlist,
    setSelectedGameId,
  } = useApp();

  const price = game.prices[regionId];
  if (!price) return null;

  const deal = calculateDealPower(price.currentPrice, price.originalPrice);
  const inWishlist = isInWishlist(game.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "game-card relative flex flex-col bg-screen-dark border rounded-lg overflow-hidden group",
        isSRank
          ? "border-gold/40 s-rank-pulse"
          : "border-border hover:border-cyan/30",
      )}
    >
      {/* S-Rank ribbon */}
      {isSRank && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-300 to-gold z-10" />
      )}

      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount badge */}
        {price.discount > 0 && (
          <div className="absolute top-2 right-2 bg-neon-green text-crt-black font-pixel text-[8px] px-2 py-1 rounded">
            -{price.discount}%
          </div>
        )}

        {/* S-Rank badge */}
        {isSRank && (
          <div className="absolute top-2 left-2 bg-gold text-crt-black font-pixel text-[8px] px-2 py-1 rounded flex items-center gap-1">
            ★ S-RANK
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(game.id);
          }}
          className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-crt-black/70 border border-border hover:border-magenta/50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              inWishlist ? "text-magenta fill-magenta" : "text-muted-foreground",
            )}
          />
        </button>

        {/* Character peek on hover (desktop) */}
        {settings.characters && (
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            <PixelCharacter character="loot" size="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Title and genre */}
        <div>
          <h3 className="font-pixel text-[9px] md:text-[10px] text-foreground leading-tight truncate">
            {game.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {game.genre} / {game.platform}
          </p>
        </div>

        {/* Prices */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-base text-foreground">
            {formatPrice(price.currentPrice, regionId)}
          </span>
          {price.originalPrice > price.currentPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(price.originalPrice, regionId)}
            </span>
          )}
        </div>

        {/* Deal HP bar */}
        <DealPowerBar value={price.discount} size="sm" />

        {/* Rank and Deal Power */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <RankBadge rank={deal.rank} isSRank={isSRank} size="sm" />
          <DealPowerScore score={deal.dealPower} />
        </div>

        {/* Character reaction */}
        {settings.characters && (
          <div className="flex items-center gap-2 mt-1">
            <PixelCharacter character="bargain" size="w-5 h-5" />
            <CharacterReaction discount={price.discount} />
          </div>
        )}

        {/* View Deal button */}
        <button
          onClick={() => setSelectedGameId(game.id)}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-cyan/10 border border-cyan/30 text-cyan font-pixel text-[8px] hover:bg-cyan/20 transition-colors cursor-pointer"
        >
          <Eye className="w-3 h-3" />
          VIEW DETAILS
        </button>
      </div>
    </motion.div>
  );
}

export const GameCard = memo(GameCardInner);
