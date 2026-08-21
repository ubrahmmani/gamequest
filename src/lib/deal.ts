import type { DealRank, DealScore, Game, Filters, RegionId, SortOption } from "@/types";

export function calculateDealPower(
  currentPrice: number,
  originalPrice: number,
): DealScore {
  if (originalPrice <= 0) {
    return { dealPower: 0, rank: "F", discountPercent: 0, savingsAmount: 0 };
  }

  const discountPercent = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100,
  );
  const savingsAmount = originalPrice - currentPrice;

  // Weighted scoring
  const discountScore = Math.min(discountPercent, 100);
  const savingsScore = Math.min((savingsAmount / originalPrice) * 100, 100);
  const priceValueScore = Math.max(0, 100 - (currentPrice / originalPrice) * 100);

  const dealPower = Math.round(
    discountScore * 0.45 +
    savingsScore * 0.3 +
    priceValueScore * 0.25,
  );

  return {
    dealPower: Math.min(dealPower, 100),
    rank: getRank(dealPower),
    discountPercent,
    savingsAmount,
  };
}

export function getRank(dealPower: number): DealRank {
  if (dealPower >= 90) return "S";
  if (dealPower >= 80) return "A";
  if (dealPower >= 70) return "B";
  if (dealPower >= 60) return "C";
  if (dealPower >= 40) return "D";
  return "F";
}

export function getRankColor(rank: DealRank): string {
  switch (rank) {
    case "S":
      return "text-gold";
    case "A":
      return "text-cyan";
    case "B":
      return "text-green";
    case "C":
      return "text-[#A0A0B0]";
    case "D":
      return "text-orange-400";
    case "F":
      return "text-red-400";
  }
}

export function getRankBgColor(rank: DealRank): string {
  switch (rank) {
    case "S":
      return "bg-gold/15 border-gold/30";
    case "A":
      return "bg-cyan/15 border-cyan/30";
    case "B":
      return "bg-green/15 border-green/30";
    case "C":
      return "bg-[#A0A0B0]/15 border-[#A0A0B0]/30";
    case "D":
      return "bg-orange-400/15 border-orange-400/30";
    case "F":
      return "bg-red-400/15 border-red-400/30";
  }
}

export function getDiscountReaction(discount: number): string {
  if (discount >= 90) return "LEGENDARY LOOT!";
  if (discount >= 75) return "THAT'S HUGE!";
  if (discount >= 50) return "Nice!";
  if (discount >= 25) return "Not bad!";
  return "Maybe wait...";
}

export function getDiscountReactionCharacter(discount: number): "excited" | "idle" | "sad" {
  if (discount >= 50) return "excited";
  if (discount >= 25) return "idle";
  return "sad";
}

export function filterGames(
  games: Game[],
  filters: Filters,
  regionId: RegionId,
): Game[] {
  return games.filter((game) => {
    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesTitle = game.title.toLowerCase().includes(q);
      const matchesGenre = game.genre.toLowerCase().includes(q);
      const matchesPlatform = game.platform.toLowerCase().includes(q);
      const matchesTags = game.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesGenre && !matchesPlatform && !matchesTags) {
        return false;
      }
    }

    // Genre filter
    if (filters.genres.length > 0 && !filters.genres.includes(game.genre)) {
      return false;
    }

    // Platform filter
    if (
      filters.platforms.length > 0 &&
      !filters.platforms.includes(game.platform)
    ) {
      return false;
    }

    const price = game.prices[regionId];
    if (!price) return false;

    // Price filter
    if (filters.maxPrice !== null && price.currentPrice > filters.maxPrice) {
      return false;
    }

    // Discount filter
    if (price.discount < filters.minDiscount) {
      return false;
    }

    return true;
  });
}

export function sortGames(
  games: Game[],
  sort: SortOption,
  regionId: RegionId,
): Game[] {
  const sorted = [...games];

  switch (sort) {
    case "best-deal":
      return sorted.sort((a, b) => {
        const aScore = calculateDealPower(
          a.prices[regionId].currentPrice,
          a.prices[regionId].originalPrice,
        );
        const bScore = calculateDealPower(
          b.prices[regionId].currentPrice,
          b.prices[regionId].originalPrice,
        );
        return bScore.dealPower - aScore.dealPower;
      });
    case "highest-discount":
      return sorted.sort(
        (a, b) => b.prices[regionId].discount - a.prices[regionId].discount,
      );
    case "lowest-price":
      return sorted.sort(
        (a, b) => a.prices[regionId].currentPrice - b.prices[regionId].currentPrice,
      );
    case "highest-price":
      return sorted.sort(
        (a, b) => b.prices[regionId].currentPrice - a.prices[regionId].currentPrice,
      );
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export function findSRank(
  games: Game[],
  regionId: RegionId,
): Game | null {
  if (games.length === 0) return null;

  let best: Game = games[0];
  let bestPower = calculateDealPower(
    best.prices[regionId].currentPrice,
    best.prices[regionId].originalPrice,
  ).dealPower;

  for (const game of games) {
    const price = game.prices[regionId];
    const power = calculateDealPower(
      price.currentPrice,
      price.originalPrice,
    ).dealPower;
    if (power > bestPower) {
      best = game;
      bestPower = power;
    }
  }

  return best;
}
