import { motion } from "framer-motion";
import { Heart, Trash2, Eye } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { GAMES } from "@/data/games";
import { formatPrice } from "@/lib/currency";
import { calculateDealPower } from "@/lib/deal";
import { RankBadge } from "@/components/RankBadge";
import { PixelCharacter } from "@/components/PixelCharacters";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    regionId,
    settings,
    setSelectedGameId,
  } = useApp();

  const savedGames = GAMES.filter((g) => wishlist.includes(g.id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-pixel text-xl text-magenta text-glow-magenta">
          WISHLIST
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Games you've saved for later — your personal collection of favorites
        </p>
      </div>

      {savedGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          {settings.characters && (
            <PixelCharacter character="cache" size="w-16 h-16" />
          )}
          <div className="text-center">
            <h3 className="font-pixel text-sm text-foreground text-crt-shift mb-2">
              YOUR LIST IS EMPTY
            </h3>
            <p className="text-sm text-muted-foreground">
              Save games you love and we'll keep track of their prices for you.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {savedGames.map((game, i) => {
            const price = game.prices[regionId];
            if (!price) return null;
            const deal = calculateDealPower(
              price.currentPrice,
              price.originalPrice,
            );

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-screen-dark border border-border rounded-lg hover:border-magenta/30 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface shrink-0">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-pixel text-[9px] text-foreground truncate">
                    {game.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {game.genre} / {game.platform}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(price.currentPrice, regionId)}
                    </span>
                    {price.originalPrice > price.currentPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(price.originalPrice, regionId)}
                      </span>
                    )}
                    <RankBadge rank={deal.rank} size="sm" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedGameId(game.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/20 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(game.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-magenta/10 border border-magenta/30 text-magenta hover:bg-magenta/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
