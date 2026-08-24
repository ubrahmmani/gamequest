import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { PixelCharacter } from "@/components/PixelCharacters";

export default function AchievementsPage() {
  const { achievementProgress, settings } = useApp();

  const getProgress = (field: string, requirement: number) => {
    const current = achievementProgress[field] || 0;
    return {
      current: Math.min(current, requirement),
      requirement,
      complete: current >= requirement,
      percent: Math.min(Math.round((current / requirement) * 100), 100),
    };
  };

  const totalUnlocked = ACHIEVEMENTS.filter(
    (a) => (achievementProgress[a.field] || 0) >= a.requirement,
  ).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full mb-4">
          <span className="font-pixel text-[7px] text-gold tracking-wider">PROGRESS</span>
        </div>
        <h1 className="font-pixel text-xl text-foreground text-crt-shift">
          ACHIEVEMENTS
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Every deal you find earns you recognition. Keep going!
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-pixel text-[10px] text-cyan">
            {totalUnlocked}/{ACHIEVEMENTS.length} UNLOCKED
          </span>
          <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan to-magenta rounded-full transition-all duration-500"
              style={{
                width: `${(totalUnlocked / ACHIEVEMENTS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {ACHIEVEMENTS.map((achievement, i) => {
          const progress = getProgress(
            achievement.field,
            achievement.requirement,
          );

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-lg border transition-colors ${
                progress.complete
                  ? "bg-gold/5 border-gold/30"
                  : "bg-screen-dark border-border opacity-70"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl ${
                    progress.complete
                      ? "bg-gold/15"
                      : "bg-surface"
                  }`}
                >
                  {progress.complete ? achievement.icon : "🔒"}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-pixel text-[10px] ${
                      progress.complete ? "text-gold" : "text-muted-foreground"
                    }`}>
                      {achievement.title}
                    </h3>
                    {progress.complete && settings.characters && (
                      <PixelCharacter character="cache" size="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">
                        {progress.current}/{progress.requirement}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {progress.percent}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress.complete
                            ? "bg-gold"
                            : "bg-cyan/60"
                        }`}
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                {progress.complete && (
                  <span className="font-pixel text-[8px] text-gold shrink-0">
                    ★ DONE
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
