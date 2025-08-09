"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Tokens = {
  fontIndex: number;
  animationsEnabled: boolean; // user preference (still overridden by reduced motion)
};

const STORAGE_KEY = "designTokens:v7"; // v7: dynamic default animations (respect reduced motion)

const FONTS = [
  { name: "Inter", value: "'Inter', Arial, Helvetica, sans-serif" },
  {
    name: "System UI",
    value:
      "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif",
  },
  { name: "Serif", value: "Georgia, 'Times New Roman', Times, serif" },
  {
    name: "Mono",
    value:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function isDarkTheme() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function defaultTokensForTheme(): Tokens { return { fontIndex: 0, animationsEnabled: true }; }

function readStored(): Tokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.fontIndex === "number") {
      return {
        fontIndex: parsed.fontIndex,
        animationsEnabled: !!parsed.animationsEnabled,
      } as Tokens;
    }
    return null;
  } catch {
    return null;
  }
}

function storeTokens(tokens: Tokens) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // ignore
  }
}

function applyTokens(tokens: Tokens) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  // Apply font family via CSS variable so Tailwind can consume it in CSS
  const font = FONTS[clamp(tokens.fontIndex, 0, FONTS.length - 1)]?.value;
  if (font) root.style.setProperty("--font-body", font);
  root.dataset.anim = tokens.animationsEnabled ? "on" : "off";
  root.style.setProperty("--animations-enabled", tokens.animationsEnabled ? "1" : "0");
  // Broadcast change for listeners (e.g. BoxReveal)
  document.dispatchEvent(new CustomEvent("design-tokens:updated", { detail: { tokens } }));
}

export default function DesignTokensHotkeys() {
  const [active, setActive] = useState(false); // any supported modifier pressed
  const [isAltDown, setIsAltDown] = useState(false);
  // Initial placeholder; real value set on mount
  const [tokens, setTokens] = useState<Tokens>({ fontIndex: 0, animationsEnabled: true });
  const lastAppliedThemeIsDark = useRef<boolean | null>(null);
  const [isDark, setIsDark] = useState(false);
  const tokensRef = useRef(tokens);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load + apply on mount
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    try {
      const root = document.documentElement;
      const stored = localStorage.getItem("theme");
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nextDark = stored ? stored === "dark" : prefersDark;
      if (nextDark) root.classList.add("dark");
      else root.classList.remove("dark");
      lastAppliedThemeIsDark.current = nextDark;
      setIsDark(nextDark);
    } catch {}

    // Reduced motion preference
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const apply = () => setReducedMotion(mq.matches);
      apply();
      mq.addEventListener?.("change", apply);
      // cleanup
      const cleanup = () => mq.removeEventListener?.("change", apply);
      // Continue with tokens load
  const saved = readStored();
  const initial: Tokens = saved ?? { fontIndex: 0, animationsEnabled: !mq.matches };
  setTokens(initial);
  applyTokens({ ...initial, animationsEnabled: initial.animationsEnabled && !mq.matches });
      return cleanup;
    } else {
      const saved = readStored();
      const initial = saved ?? defaultTokensForTheme();
      setTokens(initial);
      applyTokens(initial);
    }
  }, []);

  // Re-apply when theme toggles (external ThemeToggle changes .dark class)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = isDarkTheme();
      if (lastAppliedThemeIsDark.current !== dark) {
        lastAppliedThemeIsDark.current = dark;
        setIsDark(dark);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Persist and apply whenever tokens or reduced motion change
  useEffect(() => {
    tokensRef.current = tokens;
    storeTokens(tokens);
    const effective: Tokens = {
      ...tokens,
      animationsEnabled: tokens.animationsEnabled && !reducedMotion,
    };
    applyTokens(effective);
  }, [tokens, reducedMotion]);

  // Keyboard state (Alt/Shift tracking + arrow controls)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Track either Alt key and either Shift key
      if (e.altKey || e.getModifierState?.("Alt")) setIsAltDown(true);
      
      // Alt + T: toggle theme dark/light
      if (e.altKey && e.code === "KeyT") {
        e.preventDefault();
        const root = document.documentElement;
        const currentlyDark = root.classList.contains("dark");
        const nextDark = !currentlyDark;
        if (nextDark) root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", nextDark ? "dark" : "light");
        setIsDark(nextDark);
        return;
      }
      // Alt + A: toggle animations
      if (e.altKey && e.code === "KeyA") {
        e.preventDefault();
        setTokens(t => ({ ...t, animationsEnabled: !t.animationsEnabled }));
        return;
      }
      if (e.code === "KeyR" && e.altKey) {
        // Reset tokens (font index to 0, animations based on current reduced motion preference)
        e.preventDefault();
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const reset: Tokens = { fontIndex: 0, animationsEnabled: !prefersReduced };
        setTokens(reset);
        // apply immediately with effective value (will also re-apply in effect)
        applyTokens({ ...reset, animationsEnabled: reset.animationsEnabled && !prefersReduced });
        storeTokens(reset);
      }

      // Alt + F to change font family (existing behavior)
      if (e.altKey && e.code === "KeyF") {
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        // Cycle font family with wrap
        setTokens((t) => {
          const n = FONTS.length;
          const nextIndex = ((t.fontIndex + direction) % n + n) % n;
          const next: Tokens = { ...t, fontIndex: nextIndex };
          applyTokens(next);
          storeTokens(next);
          return next;
        });
      }

    };
    const onKeyUp = (e: KeyboardEvent) => {
      // On any key up, reflect current modifier state
      setIsAltDown(!!e.altKey);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Track overlay visibility
  useEffect(() => {
    // Show overlay whenever Alt is held (with or without Shift)
    setActive(isAltDown);
  }, [isAltDown]);

  const currentFont = useMemo(() => FONTS[clamp(tokens.fontIndex, 0, FONTS.length - 1)], [tokens.fontIndex]);
  const currentThemeLabel = isDark ? "Dark" : "Light";
  const animationsLabel = reducedMotion
    ? "Off (Reduced Motion)"
    : tokens.animationsEnabled ? "On" : "Off";

  // Legend overlay content + minimal indicator when inactive
  return (
    <>
      {/* Active overlay */}
  <div
        aria-live="polite"        
        className={
          active
    ? "pointer-events-none fixed right-4 top-4 z-50 rounded-md border backdrop-blur-xs bg-card/90 px-3 py-2 shadow-sm text-sm"
            : "hidden"
        }
        style={{ fontFamily: "'Inter', Arial, Helvetica, sans-serif" }}
      >
        <div className="text-xs uppercase tracking-wide text-muted mb-1">Design Tweaks</div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">F</kbd>
            <span>Font</span>
            <span className="ml-2 text-muted">({currentFont?.name})</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">T</kbd>
            <span>Theme</span>
            <span className="ml-2 text-muted">({currentThemeLabel})</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">A</kbd>
            <span>Animations</span>
            <span className="ml-2 text-muted">({animationsLabel})</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]">R</kbd>
            <span>Reset</span>
          </li>
        </ul>
      </div>

      {/* Minimal indicator when inactive */}
      {!active && (
        <div
          className="absolute right-4 top-4 z-40 text-muted hidden sm:block"
          style={{ fontFamily: "'Inter', Arial, Helvetica, sans-serif" }}
          role="note"          
          title="Press Option (⌥) for design tweaks"
        >
          <span className="sr-only">Press Option for design tweaks</span>
          <span className="inline-flex items-center gap-1 rounded border bg-card/70 px-2 py-1 text-[10px] leading-none">
            Press <kbd className="rounded border px-1 py-0.5 text-xs">⌥</kbd> for
            <span className="text-[10px]">design tweaks</span>
          </span>
        </div>
      )}
    </>
  );
}
