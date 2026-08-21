import { ArrowUpDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "best-deal", label: "BEST DEAL" },
  { value: "highest-discount", label: "HIGHEST DISCOUNT" },
  { value: "lowest-price", label: "LOWEST PRICE" },
  { value: "highest-price", label: "HIGHEST PRICE" },
  { value: "a-z", label: "A – Z" },
];

export function SortBar() {
  const { sort, setSort } = useApp();

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="bg-screen-dark border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-cyan transition-colors cursor-pointer appearance-none pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236B7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
