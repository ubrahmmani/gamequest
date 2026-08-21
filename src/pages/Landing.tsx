import { motion } from "framer-motion";
import { Zap, Globe, Shield, Star, ChevronRight, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router";
import { PixelCharacter } from "@/components/PixelCharacters";

const FEATURES = [
  {
    icon: Globe,
    title: "REGIONAL PRICES",
    description: "Compare game prices across 5 regions with local currencies.",
    color: "text-cyan",
  },
  {
    icon: Zap,
    title: "DEAL POWER",
    description: "AI-powered deal scoring finds the best bargains for you.",
    color: "text-magenta",
  },
  {
    icon: Shield,
    title: "S-RANK SYSTEM",
    description: "The best deal in your results gets automatically ranked S-RANK.",
    color: "text-gold",
  },
  {
    icon: Star,
    title: "GAMIFIED HUNTING",
    description: "Earn achievements, track wishlist, and hunt deals like a game.",
    color: "text-neon-green",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-crt-black overflow-hidden">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
        <div className="font-pixel text-sm md:text-base text-cyan text-crt-shift-strong">
          GAMEQUEST
        </div>
        <button
          onClick={() => navigate("/auth")}
          className="font-pixel text-[9px] md:text-[10px] px-4 py-2 bg-cyan/10 border border-cyan/30 text-cyan rounded-lg hover:bg-cyan/20 transition-colors cursor-pointer"
        >
          SIGN IN
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-magenta/5 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full mb-6">
                <span className="font-pixel text-[7px] text-cyan tracking-wider">
                  WHAT IF FINDING A DEAL FELT LIKE PLAYING A GAME?
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-pixel text-3xl md:text-4xl lg:text-5xl text-foreground text-crt-shift-strong leading-tight"
            >
              FIND YOUR
              <span className="text-cyan"> NEXT </span>
              GAME.
              <br />
              HUNT THE
              <span className="text-magenta"> BEST </span>
              DEAL.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground mt-6 max-w-lg mx-auto lg:mx-0"
            >
              Compare game prices across regions, get smart deal scores, and
              find the best bargains — all in a retro-gaming experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/auth")}
                className="group flex items-center gap-2 px-8 py-3 bg-cyan text-crt-black font-pixel text-[11px] rounded-lg hover:bg-cyan/90 transition-colors glow-cyan cursor-pointer"
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
                <span>5 regions available</span>
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
            <div className="w-64 h-64 md:w-80 md:h-80 relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-cyan/10 rounded-full blur-3xl" />

              {/* Character grid */}
              <div className="relative grid grid-cols-3 gap-4 items-center justify-items-center h-full">
                <div />
                <PixelCharacter character="loot" size="w-20 h-20" />
                <div />
                <PixelCharacter character="byte" size="w-16 h-16" />
                <PixelCharacter character="bargain" size="w-20 h-20" />
                <PixelCharacter character="cache" size="w-14 h-14" />
                <div />
                <PixelCharacter character="scrappy" size="w-12 h-12" />
                <div />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
            POWER UP YOUR DEAL HUNTING
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
              className="p-6 bg-screen-dark border border-border rounded-xl hover:border-cyan/20 transition-colors group"
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

      {/* CTA Section */}
      <section className="relative px-4 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-cyan/10 via-screen-dark to-magenta/10 border border-border overflow-hidden">
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-30" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <Gamepad2 className="w-12 h-12 text-cyan" />
            <h2 className="font-pixel text-lg md:text-xl text-foreground text-crt-shift">
              READY TO PLAY?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Join GameQuest and start hunting the best deals across the globe.
              Your next legendary bargain is waiting.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="group flex items-center gap-2 px-10 py-4 bg-cyan text-crt-black font-pixel text-[11px] rounded-lg hover:bg-cyan/90 transition-colors glow-cyan cursor-pointer"
            >
              ENTER GAMEQUEST
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-pixel text-[10px] text-muted-foreground">
            GAMEQUEST © 2026
          </div>
          <div className="text-xs text-muted-foreground">
            Find your next game. Hunt the best deal.
          </div>
        </div>
      </footer>
    </div>
  );
}
