import { useMemo, useEffect, useCallback, lazy, Suspense } from "react";
import {
  Gamepad2,
  Heart,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { GAMES } from "@/data/games";
import { REGIONS } from "@/data/regions";
import {
  filterGames,
  sortGames,
  findSRank,
} from "@/lib/deal";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { SortBar } from "@/components/SortBar";
import { GameCard } from "@/components/GameCard";
import { EmptyState } from "@/components/EmptyState";
import { GameDetails } from "@/components/GameDetails";
import { PixelCharacter } from "@/components/PixelCharacters";
import { cn } from "@/lib/utils";

const WishlistPage = lazy(() => import("./Wishlist"));
const AchievementsPage = lazy(() => import("./Achievements"));
const SettingsPage = lazy(() => import("./Settings"));

const NAV_ITEMS = [
  { id: "discover", label: "DISCOVER", icon: Gamepad2 },
  { id: "wishlist", label: "WISHLIST", icon: Heart },
  { id: "achievements", label: "ACHIEVEMENTS", icon: Trophy },
  { id: "settings", label: "SETTINGS", icon: Settings },
] as const;

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="font-pixel text-[10px] text-muted-foreground animate-pulse">
        LOADING...
      </div>
    </div>
  );
}

function DiscoverPage() {
  const {
    regionId,
    filters,
    sort,
    settings,
    fireCharacterEvent,
    incrementAchievement,
  } = useApp();

  const filteredGames = useMemo(() => {
    const filtered = filterGames(GAMES, filters, regionId);
    return sortGames(filtered, sort, regionId);
  }, [filters, sort, regionId]);

  const sRankGame = useMemo(
    () => findSRank(filteredGames, regionId),
    [filteredGames, regionId],
  );

  useEffect(() => {
    if (filteredGames.length === 0 && filters.search) {
      fireCharacterEvent("SEARCH_EMPTY");
    } else if (filteredGames.length > 0) {
      fireCharacterEvent("DEAL_FOUND");
    }
  }, [filteredGames.length, filters.search]);

  useEffect(() => {
    if (sRankGame) {
      fireCharacterEvent("S_RANK_FOUND");
      incrementAchievement("sRanksFound");
    }
  }, [sRankGame?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fireCharacterEvent("USER_IDLE");
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="relative mb-8 p-6 md:p-10 rounded-xl bg-gradient-to-br from-screen-dark via-surface to-screen-dark border border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-magenta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h1 className="font-pixel text-xl md:text-2xl text-cyan text-crt-shift-strong">
              FIND YOUR NEXT LOOT
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Scan the market. Hunt the deal. Claim the S-RANK.
            </p>
          </div>
          {settings.characters && (
            <PixelCharacter character="loot" size="w-20 h-20 md:w-24 md:h-24" />
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <SearchBar />
        <SortBar />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">
          {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} found
          {filters.search && (
            <span className="text-cyan ml-1">
              for &quot;{filters.search}&quot;
            </span>
          )}
        </p>
        {sRankGame && (
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] text-gold">
              ★ BEST DEAL: {sRankGame.title}
            </span>
          </div>
        )}
      </div>

      {/* Game grid */}
      {filteredGames.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredGames.map((game, i) => (
            <GameCard
              key={game.id}
              game={game}
              isSRank={sRankGame?.id === game.id}
              index={i}
            />
          ))}
        </div>
      )}

      <GameDetails />
    </>
  );
}

export default function Dashboard() {
  const { activePage, setActivePage, setSelectedGameId, regionId, settings } =
    useApp();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const region = REGIONS[regionId];

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate("/");
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen bg-crt-black">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-crt-black/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => {
                setActivePage("discover");
                setSelectedGameId(null);
              }}
              className="font-pixel text-sm md:text-base text-cyan text-crt-shift-strong hover:text-foreground transition-colors cursor-pointer"
            >
              GAMEQUEST
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                    activePage === item.id
                      ? "bg-cyan/10 text-cyan"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface",
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePage("settings")}
                className="flex items-center gap-2 px-3 py-1.5 bg-screen-dark border border-border rounded-lg text-xs cursor-pointer hover:border-cyan/30 transition-colors"
              >
                <span>{region.flag}</span>
                <span className="hidden sm:inline text-muted-foreground">
                  {region.currencySymbol}
                </span>
                <span className="hidden sm:inline text-foreground">
                  {region.currencyCode}
                </span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Mobile */}
        <div className="md:hidden border-t border-border">
          <div className="flex items-center justify-around px-2 py-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer",
                  activePage === item.id
                    ? "text-cyan"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <Suspense fallback={<PageLoader />}>
          {activePage === "discover" && <DiscoverPage />}
          {activePage === "wishlist" && <WishlistPage />}
          {activePage === "achievements" && <AchievementsPage />}
          {activePage === "settings" && <SettingsPage />}
        </Suspense>
      </main>

      {/* Decorative characters - edges of interface (desktop) */}
      {settings.characters && (
        <>
          <div className="fixed bottom-4 left-4 hidden lg:block opacity-30 hover:opacity-100 transition-opacity z-20">
            <PixelCharacter character="scrappy" size="w-10 h-10" />
          </div>
          <div className="fixed bottom-4 right-4 hidden lg:block opacity-30 hover:opacity-100 transition-opacity z-20">
            <PixelCharacter character="cache" size="w-10 h-10" />
          </div>
        </>
      )}
    </div>
  );
}
