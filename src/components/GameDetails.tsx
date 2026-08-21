import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Heart, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { GAMES } from "@/data/games";
import { formatPrice } from "@/lib/currency";
import { calculateDealPower, getDiscountReaction } from "@/lib/deal";
import { DealPowerBar } from "./DealPowerBar";
import { RankBadge, DealPowerScore } from "./RankBadge";
import { PixelCharacter, CharacterReaction } from "./PixelCharacters";
import { cn } from "@/lib/utils";

export function GameDetails() {
  const {
    selectedGameId,
    setSelectedGameId,
    regionId,
    settings,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const game = selectedGameId ? GAMES.find((g) => g.id === selectedGameId) : null;

  if (!game) return null;

  const price = game.prices[regionId];
  if (!price) return null;

  const deal = calculateDealPower(price.currentPrice, price.originalPrice);
  const inWishlist = isInWishlist(game.id);

  return (
    <AnimatePresence>
      {selectedGameId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGameId(null)}
            className="fixed inset-0 z-50 bg-crt-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] z-50 bg-screen-dark border border-border rounded-xl overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedGameId(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-crt-black/50 border border-border hover:border-cyan/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cover image */}
            <div className="relative aspect-[16/7] overflow-hidden">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-screen-dark via-transparent to-transparent" />

              {/* S-Rank overlay */}
              {deal.rank === "S" && (
                <div className="absolute top-4 left-4 bg-gold text-crt-black font-pixel text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2">
                  ★ S-RANK
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Title and genre */}
              <div>
                <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
                  {game.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {game.genre} / {game.platform}
                </p>
              </div>

              {/* Price section */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 p-4 bg-surface rounded-lg border border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CURRENT PRICE</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatPrice(price.currentPrice, regionId)}
                  </p>
                </div>
                {price.originalPrice > price.currentPrice && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">WAS</p>
                    <p className="text-lg text-muted-foreground line-through">
                      {formatPrice(price.originalPrice, regionId)}
                    </p>
                  </div>
                )}
                {price.discount > 0 && (
                  <div className="bg-neon-green/15 border border-neon-green/30 px-3 py-1.5 rounded-lg">
                    <span className="font-pixel text-[10px] text-neon-green">
                      -{price.discount}% OFF
                    </span>
                  </div>
                )}
                {price.isConverted && (
                  <div className="bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-lg">
                    <span className="font-pixel text-[8px] text-gold">
                      ESTIMATED CONVERSION
                    </span>
                  </div>
                )}
              </div>

              {/* Deal metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="font-pixel text-[8px] text-muted-foreground mb-2">
                    DEAL HP
                  </p>
                  <DealPowerBar value={price.discount} />
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-pixel text-[8px] text-muted-foreground">
                      DEAL POWER
                    </p>
                    <DealPowerScore score={deal.dealPower} />
                    <RankBadge rank={deal.rank} isSRank={deal.rank === "S"} />
                  </div>
                </div>
              </div>

              {/* Discount reaction */}
              {settings.characters && (
                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
                  <PixelCharacter character="bargain" size="w-10 h-10" />
                  <div>
                    <CharacterReaction discount={price.discount} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getDiscountReaction(price.discount)}
                    </p>
                  </div>
                </div>
              )}

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-surface rounded-lg border border-border">
                  <p className="text-muted-foreground mb-1">STORE</p>
                  <p className="text-foreground">{game.store}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-border">
                  <p className="text-muted-foreground mb-1">PLATFORM</p>
                  <p className="text-foreground">{game.platform}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-border flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">LAST UPDATED</p>
                    <p className="text-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-border">
                  <p className="text-muted-foreground mb-1">REGION</p>
                  <p className="text-foreground">{regionId.toUpperCase()}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={game.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan text-crt-black font-pixel text-[10px] rounded-lg hover:bg-cyan/90 transition-colors glow-cyan"
                >
                  VIEW DEAL
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => toggleWishlist(game.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-pixel text-[10px] transition-colors cursor-pointer",
                    inWishlist
                      ? "bg-magenta/10 border-magenta/40 text-magenta"
                      : "bg-surface border-border text-muted-foreground hover:border-magenta/50 hover:text-magenta",
                  )}
                >
                  <Heart
                    className={cn(
                      "w-3.5 h-3.5",
                      inWishlist && "fill-current",
                    )}
                  />
                  {inWishlist ? "SAVED" : "WISHLIST"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
