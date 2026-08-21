import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function SearchBar() {
  const { filters, setFilters } = useApp();
  const [localValue, setLocalValue] = useState(filters.search);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const debounce = useCallback((value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debounce(value);
  };

  const handleClear = () => {
    setLocalValue("");
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search for your next favorite game..."
          className="w-full pl-12 pr-12 py-3.5 bg-screen-dark border border-border rounded-lg font-pixel text-[10px] md:text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan/30 outline-none transition-colors"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
