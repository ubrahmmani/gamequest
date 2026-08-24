import { motion } from "framer-motion";
import { Zap, Globe, Shield, Star, ChevronRight, Gamepad2, Search, BarChart3, Trophy, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { PixelCharacter } from "@/components/PixelCharacters";
import { GAMES } from "@/data/games";
import { calculateDealPower } from "@/lib/deal";
import { formatPrice } from "@/lib/currency";
import { RankBadge } from "@/components/RankBadge";
import { DealPowerBar } from "@/components/DealPowerBar";

const FEATURES = [
  {
    icon: Globe,
    title: "LOCAL PRICES, EVERYWHERE",
    description: "Compare game prices across 5 regions with real local currencies — no guessing, no conversion headaches.",
    color: "text-cyan",
    bgColor: "bg-cyan/5",
    borderColor: "border-cyan/20",
  },
  {
    icon: Zap,
    title: "SMART DEAL SCORING",
    description: "Our Deal Power algorithm ranks every discount so you always know which ones are actually worth it.",
    color: "text-magenta",
    bgColor: "bg-magenta/5",
    borderColor: "border-magenta/20",
  },
  {
    icon: Shield,
    title: "S-RANK THE BEST",
    description: "The top deal in your results gets automatically highlighted with our S-Rank system — never miss a steal.",
    color: "text-gold",
    bgColor: "bg-gold/5",
    borderColor: "border-gold/20",
  },
  {
    icon: Star,
    title: "YOUR DEAL HUNTING HQ",
    description: "Wishlist your favorites, track achievements, and build your deal-hunting record over time.",
    color: "text-neon-green",
    bgColor: "bg-neon-green/5",
    borderColor: "border-neon-green/20",
  },
];

const HOW_IT_WORKS = [
  { step: "01", icon: Search, title: "PICK YOUR REGION", description: "Select where you're shopping from. We'll load local prices and currencies." },
  { step: "02", icon: BarChart3, title: "DISCOVER DEALS", description: "Browse games with smart Deal Power scores. The best deals rise to the top." },
  { step: "03", icon: Trophy, title: "HUNT THE BEST PRICE", description: "Compare across stores and regions. Save to your wishlist and track drops." },
];

// Featured games with best deals
const FEATURED = GAMES.slice(0, 3);

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-crt-black overflow-hidden">
      {/* CRT overlays */}
      <div className="fixed inset-0 crt-scanlines pointer-events-none opacity-20" />
      <div className="fixed inset-0 crt-vignette pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
        <div className="font-pixel text-sm md:text-base text-cyan text-crt-shift-strong">
          GAMEQUEST
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/auth")}
            className="hidden sm:block font-pixel text-[9px] px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            SIGN IN
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="font-pixel text-[9px] md:text-[10px] px-4 py-2 bg-cyan/10 border border-cyan/30 text-cyan rounded-lg hover:bg-cyan/20 transition-colors cursor-pointer"
          >
            GET STARTED
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20 max-w-6xl mx-auto">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-magenta/[0.04] rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan/10 border border-cyan/20 rounded-full mb-6">
                <Sparkles className="w-3 h-3 text-cyan" />
                <span className="font-pixel text-[7px] text-cyan tracking-wider">
                  RETRO-POWERED DEAL HUNTING
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-pixel text-3xl md:text-4xl lg:text-5xl text-foreground text-crt-shift-strong leading-[1.2]"
            >
              FIND YOUR
              <span className="text-cyan"> NEXT </span>
              FAVORITE
              <br />
              GAME AT THE
              <span className="text-magenta"> BEST </span>
              PRICE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Compare game prices across regions, get smart deal scores, and
              never overpay — all wrapped in a retro-powered gaming experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/auth")}
                className="group flex items-center gap-2 px-8 py-3.5 bg-cyan text-crt-black font-pixel text-[11px] rounded-lg hover:bg-cyan/90 transition-all glow-cyan cursor-pointer"
              >
                START HUNTING
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex -space-x-2">
                  {["🇮🇳", "🇺🇸", "🇬🇧", "🇯🇵", "🇨🇳"].map((flag) => (
                    <span
                      key={flag}
                      className="w-7 h-7 flex items-center justify-center bg-screen-dark border border-border rounded-full text-sm"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
                <span>5 regions supported</span>
              </div>
            </motion.div>
          </div>

          {/* Character showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 relative">
              <div className="absolute inset-0 bg-cyan/[0.08] rounded-full blur-3xl" />
              <div className="relative grid grid-cols-3 gap-6 items-center justify-items-center h-full">
                <div />
                <PixelCharacter character="loot" size="w-24 h-24" />
                <div />
                <PixelCharacter character="byte" size="w-16 h-16" />
                <PixelCharacter character="bargain" size="w-24 h-24" />
                <PixelCharacter character="cache" size="w-16 h-16" />
                <div />
                <PixelCharacter character="scrappy" size="w-14 h-14" />
                <div />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 border-y border-border/50 bg-screen-dark/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "20+", label: "Games Tracked", color: "text-cyan" },
              { value: "5", label: "Regions", color: "text-magenta" },
              { value: "85%", label: "Max Discount", color: "text-neon-green" },
              { value: "S-Rank", label: "Deal Ranking", color: "text-gold" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`font-pixel text-lg md:text-xl ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
            BUILT FOR SMART SHOPPERS
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Everything you need to find the best game prices, all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 ${feature.bgColor} border ${feature.borderColor} rounded-xl hover:border-opacity-40 transition-all group`}
            >
              <feature.icon
                className={`w-8 h-8 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
              />
              <h3 className="font-pixel text-[10px] text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Deals Preview */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
            TODAY'S TOP DEALS
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            A sneak peek at what's waiting for you inside GameQuest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((game, i) => {
            const price = game.prices.india;
            const deal = calculateDealPower(price.currentPrice, price.originalPrice);
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="game-card bg-screen-dark border border-border rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {price.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-neon-green text-crt-black font-pixel text-[8px] px-2 py-1 rounded">
                      -{price.discount}%
                    </div>
                  )}
                  {deal.rank === "S" && (
                    <div className="absolute top-3 left-3 bg-gold text-crt-black font-pixel text-[8px] px-2 py-1 rounded flex items-center gap-1">
                      ★ S-RANK
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-pixel text-[10px] text-foreground truncate">
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {game.genre} / {game.platform}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(price.currentPrice, "india")}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(price.originalPrice, "india")}
                    </span>
                  </div>
                  <div className="mt-3">
                    <DealPowerBar value={price.discount} size="sm" />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <RankBadge rank={deal.rank} isSRank={deal.rank === "S"} size="sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/auth")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-lg font-pixel text-[10px] text-foreground hover:border-cyan/30 transition-colors cursor-pointer"
          >
            VIEW ALL DEALS
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
            HOW IT WORKS
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Three simple steps to finding the best game deals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-screen-dark border border-border flex items-center justify-center relative">
                <item.icon className="w-7 h-7 text-cyan" />
                <span className="absolute -top-2 -right-2 font-pixel text-[8px] text-gold bg-gold/15 border border-gold/30 w-6 h-6 rounded-full flex items-center justify-center">
                  {item.step}
                </span>
              </div>
              <h3 className="font-pixel text-[10px] text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="relative p-8 md:p-14 rounded-2xl bg-gradient-to-br from-cyan/[0.08] via-screen-dark to-magenta/[0.08] border border-border overflow-hidden">
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
                READY TO HUNT SOME DEALS?
              </h2>
              <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto md:mx-0">
                Join GameQuest and start comparing game prices across the globe.
                Sign up in seconds — no credit card required.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="mt-6 group inline-flex items-center gap-2 px-10 py-4 bg-cyan text-crt-black font-pixel text-[11px] rounded-lg hover:bg-cyan/90 transition-all glow-cyan cursor-pointer"
              >
                GET STARTED FREE
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4 opacity-60">
              <PixelCharacter character="loot" size="w-20 h-20" />
              <PixelCharacter character="bargain" size="w-16 h-16" />
              <PixelCharacter character="byte" size="w-14 h-14" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 md:px-8 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-pixel text-[10px] text-cyan">GAMEQUEST</span>
            <span className="text-[10px] text-muted-foreground">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
            <span>Find your next favorite game at the best price.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
