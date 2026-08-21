import { useApp } from "@/context/AppContext";

export function CRTOverlay() {
  const { settings } = useApp();

  if (!settings.crtEffects) return null;

  return (
    <div className="crt-overlay">
      <div className="crt-scanlines absolute inset-0" />
      <div className="crt-vignette absolute inset-0" />
      {settings.animations && (
        <div className="crt-flicker absolute inset-0" />
      )}
    </div>
  );
}
