import { useNavigate } from "react-router";
import { PixelCharacter } from "@/components/PixelCharacters";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-crt-black flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <PixelCharacter character="scrappy" size="w-20 h-20" />

        <div>
          <h1 className="font-pixel text-3xl md:text-4xl text-magenta text-crt-shift-strong">
            404
          </h1>
          <p className="font-pixel text-[10px] text-foreground mt-3">
            LEVEL NOT FOUND
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This page doesn’t exist. Let’s get you back to where the deals are.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="font-pixel text-[10px] px-6 py-3 bg-cyan/10 border border-cyan/30 text-cyan rounded-lg hover:bg-cyan/20 transition-colors cursor-pointer"
        >
          BACK TO DEALS
        </button>
      </div>
    </div>
  );
}
