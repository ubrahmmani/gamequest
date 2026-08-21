import { motion } from "framer-motion";
import {
  Package,
  Globe,
  BarChart3,
  Settings,
  TrendingUp,
  Eye,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { GAMES } from "@/data/games";
import { REGIONS } from "@/data/regions";
import { formatPrice } from "@/lib/currency";
import { calculateDealPower } from "@/lib/deal";
import { RankBadge } from "@/components/RankBadge";

const STATS = [
  { label: "Total Games", value: "20", icon: Package, color: "text-cyan" },
  { label: "Active Regions", value: "5", icon: Globe, color: "text-magenta" },
  { label: "Avg. Discount", value: "46%", icon: TrendingUp, color: "text-neon-green" },
  { label: "Page Views", value: "1,247", icon: Eye, color: "text-gold" },
];

export default function AdminPage() {
  const { regionId } = useApp();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-pixel text-xl text-cyan text-crt-shift">
          ADMIN DASHBOARD
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your catalog, monitor performance, and keep deals up to date.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 bg-screen-dark border border-border rounded-xl"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Game Catalog */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-pixel text-[10px] text-magenta tracking-wider flex items-center gap-2">
            <Package className="w-3.5 h-3.5" />
            GAME CATALOG
          </h2>
          <span className="text-xs text-muted-foreground">
            {GAMES.length} games in catalog
          </span>
        </div>

        <div className="bg-screen-dark border border-border rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border text-[10px] font-pixel text-muted-foreground tracking-wider">
            <div className="col-span-4">GAME</div>
            <div className="col-span-2">PLATFORM</div>
            <div className="col-span-2">PRICE</div>
            <div className="col-span-1">DISC.</div>
            <div className="col-span-1">RANK</div>
            <div className="col-span-2">DEAL PWR</div>
          </div>

          {/* Table rows */}
          {GAMES.map((game, i) => {
            const price = game.prices[regionId];
            if (!price) return null;
            const deal = calculateDealPower(
              price.currentPrice,
              price.originalPrice,
            );

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border/50 last:border-0 hover:bg-surface/50 transition-colors items-center"
              >
                {/* Game */}
                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded overflow-hidden bg-surface shrink-0">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-foreground truncate font-medium">
                      {game.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {game.genre}
                    </p>
                  </div>
                </div>

                {/* Platform */}
                <div className="col-span-4 md:col-span-2">
                  <span className="text-xs text-muted-foreground">
                    {game.platform}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2">
                  <span className="text-xs text-foreground font-medium">
                    {formatPrice(price.currentPrice, regionId)}
                  </span>
                </div>

                {/* Discount */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className={`font-pixel text-[8px] ${
                      price.discount >= 50
                        ? "text-neon-green"
                        : price.discount >= 25
                          ? "text-cyan"
                          : "text-muted-foreground"
                    }`}
                  >
                    {price.discount}%
                  </span>
                </div>

                {/* Rank */}
                <div className="col-span-2 md:col-span-1">
                  <RankBadge rank={deal.rank} size="sm" />
                </div>

                {/* Deal Power */}
                <div className="col-span-12 md:col-span-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden hidden md:block">
                    <div
                      className="h-full bg-cyan rounded-full"
                      style={{ width: `${deal.dealPower}%` }}
                    />
                  </div>
                  <span className="font-pixel text-[8px] text-cyan shrink-0">
                    {deal.dealPower}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Region Overview */}
      <div className="mb-8">
        <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" />
          REGION OVERVIEW
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(REGIONS).map((r) => (
            <div
              key={r.id}
              className={`p-4 bg-screen-dark border rounded-xl transition-colors ${
                r.id === regionId
                  ? "border-cyan/40"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{r.flag}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {r.country}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {r.currencySymbol} {r.currencyCode}
                  </p>
                </div>
                {r.id === regionId && (
                  <span className="ml-auto font-pixel text-[7px] px-2 py-0.5 bg-cyan/15 border border-cyan/30 text-cyan rounded">
                    ACTIVE
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-surface rounded-lg p-2">
                  <p className="text-muted-foreground">Games</p>
                  <p className="text-foreground font-medium">{GAMES.length}</p>
                </div>
                <div className="bg-surface rounded-lg p-2">
                  <p className="text-muted-foreground">Avg. Disc.</p>
                  <p className="text-foreground font-medium">
                    {Math.round(
                      GAMES.reduce(
                        (sum, g) => sum + (g.prices[r.id]?.discount || 0),
                        0,
                      ) / GAMES.length,
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider flex items-center gap-2">
          <Settings className="w-3.5 h-3.5" />
          QUICK ACTIONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="p-4 bg-screen-dark border border-border rounded-xl text-left hover:border-cyan/30 transition-colors cursor-pointer">
            <Package className="w-5 h-5 text-cyan mb-2" />
            <p className="text-xs text-foreground font-medium">Add Game</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Add a new title to the catalog
            </p>
          </button>
          <button className="p-4 bg-screen-dark border border-border rounded-xl text-left hover:border-magenta/30 transition-colors cursor-pointer">
            <Globe className="w-5 h-5 text-magenta mb-2" />
            <p className="text-xs text-foreground font-medium">Add Region</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Expand to a new market
            </p>
          </button>
          <button className="p-4 bg-screen-dark border border-border rounded-xl text-left hover:border-neon-green/30 transition-colors cursor-pointer">
            <BarChart3 className="w-5 h-5 text-neon-green mb-2" />
            <p className="text-xs text-foreground font-medium">
              Refresh Prices
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Re-scrape prices for all regions
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
