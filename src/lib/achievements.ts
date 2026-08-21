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
    title: "Deal Spotter",
    description: "Browse through 10 discounted games to hone your instincts.",
    icon: "🔍",
    requirement: 10,
    field: "gamesViewed",
  },
  {
    id: "bargain-master",
    title: "Bargain Master",
    description: "Uncover a discount of 75% or more — a true steal.",
    icon: "💰",
    requirement: 1,
    field: "bigDealsFound",
  },
  {
    id: "world-gamer",
    title: "Globe Trotter",
    description: "Explore deals across 3 different regions worldwide.",
    icon: "🌍",
    requirement: 3,
    field: "regionsVisited",
  },
  {
    id: "s-rank-collector",
    title: "S-Rank Collector",
    description: "Discover 5 top-rated deals that earn the coveted S-Rank.",
    icon: "⭐",
    requirement: 5,
    field: "sRanksFound",
  },
  {
    id: "wishlist-warrior",
    title: "Wishlist Warrior",
    description: "Build your dream list by saving 5 games you love.",
    icon: "❤️",
    requirement: 5,
    field: "wishlistCount",
  },
  {
    id: "genre-explorer",
    title: "Genre Explorer",
    description: "Cast a wide net by searching across 4 different genres.",
    icon: "🎮",
    requirement: 4,
    field: "genresExplored",
  },
];

export interface AchievementProgress {
  [key: string]: number;
}
