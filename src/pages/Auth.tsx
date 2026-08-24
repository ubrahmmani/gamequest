import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import { PixelCharacter } from "@/components/PixelCharacters";
import { ArrowRight, Loader2, Mail, Gamepad2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Failed to sign in as guest: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crt-black flex flex-col">
      <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-30" />
      <div className="absolute inset-0 crt-vignette pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
        <button
          onClick={() => navigate("/")}
          className="font-pixel text-sm md:text-base text-cyan text-crt-shift-strong hover:text-foreground transition-colors cursor-pointer"
        >
          GAMEQUEST
        </button>
      </header>

      {/* Auth content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md">
          {/* Decorative characters */}
          <div className="flex justify-center mb-6 gap-4">
            <PixelCharacter character="loot" size="w-12 h-12" />
            <PixelCharacter character="byte" size="w-14 h-14" />
            <PixelCharacter character="bargain" size="w-12 h-12" />
          </div>

          {/* Auth card */}
          <div className="bg-screen-dark border border-border rounded-xl overflow-hidden">
            {/* Card header with gradient accent */}
            <div className="relative px-6 pt-8 pb-6 text-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-magenta to-cyan" />
              <Gamepad2 className="w-8 h-8 text-cyan mx-auto mb-3" />
              <h1 className="font-pixel text-sm md:text-base text-foreground text-crt-shift">
                {step === "signIn" ? "ENTER GAMEQUEST" : "VERIFY YOUR CODE"}
              </h1>
              <p className="text-xs text-muted-foreground mt-2">
                {step === "signIn"
                  ? "Sign in to start hunting the best game deals"
                  : `We've sent a 6-digit code to ${step.email}`}
              </p>
            </div>

            {/* Form content */}
            <div className="px-6 pb-6">
              {step === "signIn" ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10 bg-surface border-border focus:border-cyan focus:ring-cyan/30"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-cyan text-crt-black font-pixel text-[10px] hover:bg-cyan/90 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        SEND CODE
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-screen-dark px-3 text-[10px] font-pixel text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-border bg-surface hover:bg-surface-hover text-foreground text-xs cursor-pointer"
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                  >
                    <Gamepad2 className="mr-2 h-3.5 w-3.5" />
                    Play as Guest
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <input type="hidden" name="email" value={step.email} />
                  <input type="hidden" name="code" value={otp} />

                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                          const form = (e.target as HTMLElement).closest("form");
                          if (form) form.requestSubmit();
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 text-center">{error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-cyan text-crt-black font-pixel text-[10px] hover:bg-cyan/90 cursor-pointer"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        VERIFYING...
                      </>
                    ) : (
                      <>
                        VERIFY & SIGN IN
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("signIn");
                        setOtp("");
                        setError(null);
                      }}
                      className="text-xs text-muted-foreground hover:text-cyan transition-colors cursor-pointer"
                    >
                      Use a different email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-muted-foreground/60 mt-6">
            By continuing, you agree to GameQuest's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
