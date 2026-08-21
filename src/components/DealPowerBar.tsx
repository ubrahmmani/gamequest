import { cn } from "@/lib/utils";

interface DealPowerBarProps {
  value: number;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function DealPowerBar({
  value,
  label = "DEAL HP",
  className,
  size = "md",
}: DealPowerBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const getColor = (v: number) => {
    if (v >= 80) return "bg-neon-green";
    if (v >= 60) return "bg-cyan";
    if (v >= 40) return "bg-gold";
    return "bg-muted-foreground";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-pixel text-[6px] md:text-[7px] text-muted-foreground tracking-wider">
          {label}
        </span>
        <span className="font-pixel text-[7px] md:text-[8px] text-foreground">
          {clampedValue}%
        </span>
      </div>
      <div
        className={cn(
          "w-full bg-surface rounded-sm overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2",
        )}
      >
        <div
          className={cn(
            "h-full rounded-sm deal-hp-fill",
            getColor(clampedValue),
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
