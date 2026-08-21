export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  field: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "deal-hunter",
    title: "Deal Hunter",
    description: "View 10 discounted games",
    icon: "🔍",
    requirement: 10,
    field: "gamesViewed",
  },
  {
    id: "bargain-master",
    title: "Bargain Master",
    description: "Find a 75%+ discount",
    icon: "💰",
    requirement: 1,
    field: "bigDealsFound",
  },
  {
    id: "world-gamer",
    title: "World Gamer",
    description: "Explore 3 regions",
    icon: "🌍",
    requirement: 3,
    field: "regionsVisited",
  },
  {
    id: "s-rank-collector",
    title: "S-Rank Collector",
    description: "Find 5 S-Rank deals",
    icon: "⭐",
    requirement: 5,
    field: "sRanksFound",
  },
  {
    id: "wishlist-warrior",
    title: "Wishlist Warrior",
    description: "Add 5 games to wishlist",
    icon: "❤️",
    requirement: 5,
    field: "wishlistCount",
  },
  {
    id: "genre-explorer",
    title: "Genre Explorer",
    description: "Search across 4 different genres",
    icon: "🎮",
    requirement: 4,
    field: "genresExplored",
  },
];

export interface AchievementProgress {
  [key: string]: number;
}
