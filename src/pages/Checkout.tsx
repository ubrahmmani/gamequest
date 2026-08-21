import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ShoppingCart,
  Shield,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { GAMES } from "@/data/games";
import { formatPrice } from "@/lib/currency";
import { PixelCharacter } from "@/components/PixelCharacters";

export default function CheckoutPage() {
  const { regionId, settings, setSelectedGameId } = useApp();
  const [completed, setCompleted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const game = GAMES[0];
  const price = game.prices[regionId];

  const handlePurchase = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-12 gap-6"
        >
          {settings.characters && (
            <PixelCharacter character="bargain" size="w-20 h-20" />
          )}
          <CheckCircle2 className="w-16 h-16 text-neon-green" />
          <h1 className="font-pixel text-xl text-cyan text-glow-cyan">
            PURCHASE COMPLETE!
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your copy of <span className="text-foreground font-medium">{game.title}</span> is
            ready. Check your email for the activation code.
          </p>
          <button
            onClick={() => {
              setCompleted(false);
              setSelectedGameId(null);
            }}
            className="font-pixel text-[10px] px-8 py-3 bg-cyan/10 border border-cyan/30 text-cyan rounded-lg hover:bg-cyan/20 transition-colors cursor-pointer"
          >
            CONTINUE SHOPPING
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-pixel text-xl text-cyan text-crt-shift">
          CHECKOUT
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Review your order and complete your purchase.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Order Summary */}
        <div className="bg-screen-dark border border-border rounded-xl p-6">
          <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider flex items-center gap-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            ORDER SUMMARY
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface shrink-0">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-pixel text-[10px] text-foreground">
                {game.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {game.genre} / {game.platform} / {game.store}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">
                {formatPrice(price.currentPrice, regionId)}
              </p>
              {price.originalPrice > price.currentPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(price.originalPrice, regionId)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-screen-dark border border-border rounded-xl p-6">
          <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" />
            PAYMENT DETAILS
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="bg-screen-dark border border-border rounded-xl p-6">
          <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider">
            ORDER TOTAL
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Game price</span>
              <span className="text-foreground">
                {formatPrice(price.currentPrice, regionId)}
              </span>
            </div>
            {price.originalPrice > price.currentPrice && (
              <div className="flex justify-between text-neon-green">
                <span>You save</span>
                <span>
                  -{formatPrice(price.originalPrice - price.currentPrice, regionId)}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground text-lg">
                {formatPrice(price.currentPrice, regionId)}
              </span>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface rounded-lg border border-border">
          <Lock className="w-3.5 h-3.5 text-neon-green shrink-0" />
          <p className="text-[11px] text-muted-foreground">
            Your payment is encrypted and secure. We never store your card details.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedGameId(null)}
            className="flex items-center gap-2 px-5 py-3 bg-surface border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handlePurchase}
            disabled={processing}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan text-crt-black font-pixel text-[10px] rounded-lg hover:bg-cyan/90 transition-colors glow-cyan cursor-pointer disabled:opacity-50"
          >
            {processing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-crt-black border-t-transparent rounded-full animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5" />
                COMPLETE PURCHASE — {formatPrice(price.currentPrice, regionId)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
