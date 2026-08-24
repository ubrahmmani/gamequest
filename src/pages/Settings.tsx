import { useApp } from "@/context/AppContext";
import { REGIONS } from "@/data/regions";
import type { RegionId } from "@/types";
import { cn } from "@/lib/utils";

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "relative w-12 h-6 rounded-full transition-colors cursor-pointer",
          value ? "bg-cyan" : "bg-surface border border-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full transition-all",
            value
              ? "left-[22px] bg-crt-black"
              : "left-0.5 bg-muted-foreground",
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { settings, updateSettings, regionId, setRegionId } = useApp();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full mb-4">
          <span className="font-pixel text-[7px] text-cyan tracking-wider">CONFIGURE</span>
        </div>
        <h1 className="font-pixel text-xl text-foreground text-crt-shift">
          SETTINGS
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Customize the look and feel of GameQuest to your liking.
        </p>
      </div>

      {/* Region */}
      <div className="mb-8">
        <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider">
          REGION
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.values(REGIONS).map((region) => (
            <button
              key={region.id}
              onClick={() => setRegionId(region.id as RegionId)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border transition-colors cursor-pointer",
                regionId === region.id
                  ? "border-cyan bg-cyan/10"
                  : "border-border bg-screen-dark hover:border-cyan/30",
              )}
            >
              <span className="text-xl">{region.flag}</span>
              <div className="text-left">
                <p className="text-xs font-medium">{region.country}</p>
                <p className="text-[10px] text-muted-foreground">
                  {region.currencySymbol} {region.currencyCode}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Display */}
      <div className="mb-8">
        <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider">
          DISPLAY
        </h2>
        <div className="bg-screen-dark border border-border rounded-lg px-5">
          <Toggle
            label="Characters"
            value={settings.characters}
            onChange={(v) => updateSettings({ characters: v })}
          />
          <Toggle
            label="Animations"
            value={settings.animations}
            onChange={(v) => updateSettings({ animations: v })}
          />
          <Toggle
            label="CRT Effects"
            value={settings.crtEffects}
            onChange={(v) => updateSettings({ crtEffects: v })}
          />
          <Toggle
            label="Sound"
            value={settings.sound}
            onChange={(v) => updateSettings({ sound: v })}
          />
          <Toggle
            label="Reduced Motion"
            value={settings.reducedMotion}
            onChange={(v) => updateSettings({ reducedMotion: v })}
          />
        </div>
      </div>

      {/* About */}
      <div>
        <h2 className="font-pixel text-[10px] text-magenta mb-4 tracking-wider">
          ABOUT
        </h2>
        <div className="bg-screen-dark border border-border rounded-lg p-5">
          <p className="font-pixel text-sm text-cyan mb-2">GameQuest</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            GameQuest helps you find the best game deals in your region, with
            local prices, currencies, and a fun retro-gaming experience.
          </p>
          <p className="font-pixel text-[7px] text-muted-foreground mt-4">
            VERSION 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
