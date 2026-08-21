import type { DealRank } from "@/types";
import { cn } from "@/lib/utils";

interface RankBadgeProps {
  rank: DealRank;
  isSRank?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RANK_STYLES: Record<DealRank, string> = {
  S: "bg-gold/20 text-gold border-gold/40",
  A: "bg-cyan/20 text-cyan border-cyan/40",
  B: "bg-neon-green/20 text-neon-green border-neon-green/40",
  C: "bg-muted/40 text-muted-foreground border-muted-foreground/30",
  D: "bg-orange-400/20 text-orange-400 border-orange-400/40",
  F: "bg-red-400/20 text-red-400 border-red-400/40",
};

const SIZES = {
  sm: "text-[8px] px-1.5 py-0.5 min-w-[24px]",
  md: "text-[10px] px-2 py-1 min-w-[30px]",
  lg: "text-sm px-3 py-1.5 min-w-[36px]",
};

export function RankBadge({ rank, isSRank = false, size = "md", className }: RankBadgeProps) {
  return (
    <div
      className={cn(
        "font-pixel inline-flex items-center justify-center rounded border font-bold tracking-wider",
        RANK_STYLES[rank],
        SIZES[size],
        isSRank && "s-rank-pulse",
        className,
      )}
    >
      {rank}-RANK
    </div>
  );
}

interface DealPowerScoreProps {
  score: number;
  className?: string;
}

export function DealPowerScore({ score, className }: DealPowerScoreProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-pixel text-[7px] text-muted-foreground tracking-wider">
        DEAL POWER
      </span>
      <span className="font-pixel text-sm text-cyan text-glow-cyan">
        {score}
      </span>
    </div>
  );
}
