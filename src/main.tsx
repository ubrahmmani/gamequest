import "@vly-ai/integrations";
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AppProvider, useApp } from "@/context/AppContext";
import { CRTOverlay } from "@/components/CRTOverlay";
import { BootSequence } from "@/components/BootSequence";
import { RegionSelector } from "@/components/RegionSelector";
import "./index.css";

// Lazy load route components
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-crt-black">
      <div className="font-pixel text-[10px] text-muted-foreground animate-pulse">
        LOADING...
      </div>
    </div>
  );
}

class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-crt-black text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="font-pixel text-sm text-red-400">SYSTEM ERROR</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Guard against missing VITE_CONVEX_URL — crash here kills the module
// before React ever mounts, producing a permanently blank preview.
let convex: ConvexReactClient | null = null;
try {
  const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
  if (url) {
    convex = new ConvexReactClient(url);
  } else {
    console.warn("[DealQuest] VITE_CONVEX_URL is not set — running without Convex backend.");
  }
} catch (e) {
  console.warn("[DealQuest] Failed to initialise Convex client:", e);
}

// Wrap children in ConvexAuthProvider only when the client is available.
// Without a valid client the app still renders the boot sequence, landing
// page, and dashboard — auth-protected routes simply stay unauthenticated.

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

// Boot flow wrapper for the main app
function AppBootFlow() {
  const { bootComplete, setBootComplete, regionLocked, setRegionLocked } = useApp();
  const [showRegion, setShowRegion] = useState(!regionLocked);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  const handleRegionComplete = useCallback(() => {
    setRegionLocked(true);
    setShowRegion(false);
  }, []);

  // If boot is complete and region is locked, show nothing (let router handle it)
  if (bootComplete && !showRegion) return null;

  // Show boot sequence first
  if (!bootComplete) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  // Then show region selection
  if (showRegion) {
    return <RegionSelector onComplete={handleRegionComplete} />;
  }

  return null;
}

// Main app wrapper that handles the boot flow overlay
function AppShell() {
  const { bootComplete, regionLocked } = useApp();
  const isReady = bootComplete && regionLocked;

  return (
    <>
      {/* Boot/Region overlay */}
      {!isReady && <AppBootFlow />}

      {/* Main app content (rendered behind boot sequence) */}
      <div
        className={`transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/auth"
            element={<AuthPage redirectAfterAuth="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* CRT Overlay */}
      <CRTOverlay />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      {convex ? (
        <ConvexAuthProvider client={convex}>
          <AppProvider>
            <BrowserRouter>
              <RouteSyncer />
              <Suspense fallback={<RouteLoading />}>
                <AppShell />
              </Suspense>
            </BrowserRouter>
            <Toaster />
          </AppProvider>
        </ConvexAuthProvider>
      ) : (
        <AppProvider>
          <BrowserRouter>
            <RouteSyncer />
            <Suspense fallback={<RouteLoading />}>
              <AppShell />
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </AppProvider>
      )}
    </RootErrorBoundary>
  </StrictMode>,
);
