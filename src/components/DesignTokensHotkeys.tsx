"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Tokens = {
  fontIndex: number;
  // Tailwind color family index and shade index
  colorFamilyIndex: number; // index into COLOR_FAMILIES
  shadeIndex: number; // index into SHADES
};

const STORAGE_KEY = "designTokens:v2";

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

const LOG_PREFIX = "[DesignTokens]";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function isDarkTheme() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

// Tailwind v4 default color families (subset, ordered for cycling)
const COLOR_FAMILIES = [
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

// Standard Tailwind shade scale
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function colorVar(family: (typeof COLOR_FAMILIES)[number], shade: (typeof SHADES)[number]) {
  // Tailwind v4 exposes CSS variables like --color-red-500
  return `var(--color-${family}-${shade})`;
}

function defaultTokensForTheme(): Tokens {
  const dark = isDarkTheme();
  // Choose a sensible default: gray-900 on light, gray-50 on dark
  const familyIndex = COLOR_FAMILIES.indexOf("gray");
  const shadeIndex = SHADES.indexOf(dark ? 50 : 900);
  return { fontIndex: 0, colorFamilyIndex: familyIndex < 0 ? 0 : familyIndex, shadeIndex: shadeIndex < 0 ? 0 : shadeIndex };
}

function readStored(): Tokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.fontIndex === "number" &&
      typeof parsed?.colorFamilyIndex === "number" &&
      typeof parsed?.shadeIndex === "number"
    )
      return parsed as Tokens;
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
  // Apply foreground color using Tailwind color variables
  const family = COLOR_FAMILIES[clamp(tokens.colorFamilyIndex, 0, COLOR_FAMILIES.length - 1)];
  const shade = SHADES[clamp(tokens.shadeIndex, 0, SHADES.length - 1)];
  const fg = colorVar(family, shade);
  root.style.setProperty("--foreground", fg);
  // Debug
  try {
    // eslint-disable-next-line no-console
  const applied = getComputedStyle(root).getPropertyValue("--foreground").trim();
  console.debug(LOG_PREFIX, "applyTokens", { tokens, font, fg, applied });
  } catch {}
}

export default function DesignTokensHotkeys() {
  const [active, setActive] = useState(false); // any supported modifier pressed
  const [isLeftAltDown, setIsLeftAltDown] = useState(false);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const [tokens, setTokens] = useState<Tokens>({ fontIndex: 0, colorFamilyIndex: 0, shadeIndex: 0 });
  const lastAppliedThemeIsDark = useRef<boolean | null>(null);
  // No wheel/gesture state — using arrow keys only

  // Load + apply on mount
  useEffect(() => {
  const saved = readStored();
  const initial = saved ?? defaultTokensForTheme();
    setTokens(initial);
    // apply immediately
    applyTokens(initial);
    lastAppliedThemeIsDark.current = isDarkTheme();
    try {
      // eslint-disable-next-line no-console
      console.debug(LOG_PREFIX, "mount: initial", {
        initial,
        dark: lastAppliedThemeIsDark.current,
      });
    } catch {}
  }, []);

  // Re-apply when theme toggles (external ThemeToggle changes .dark class)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = isDarkTheme();
      if (lastAppliedThemeIsDark.current !== dark) {
        lastAppliedThemeIsDark.current = dark;
        applyTokens(tokens);
        try {
          // eslint-disable-next-line no-console
          console.debug(LOG_PREFIX, "theme changed", { dark, tokens });
        } catch {}
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [tokens]);

  // Persist and apply whenever tokens change
  useEffect(() => {
    storeTokens(tokens);
    applyTokens(tokens);
    try {
      // eslint-disable-next-line no-console
      console.debug(LOG_PREFIX, "tokens changed", tokens);
    } catch {}
  }, [tokens]);

  // Keyboard state (Alt/Shift tracking + arrow controls)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "AltLeft") setIsLeftAltDown(true);
      if (e.key === "Shift") setIsShiftDown(true);
      if (e.code === "KeyR" && e.altKey) {
        // Reset tokens
        e.preventDefault();
        const reset = defaultTokensForTheme();
        setTokens(reset);
        applyTokens(reset);
        storeTokens(reset);
        try {
          // eslint-disable-next-line no-console
          console.debug(LOG_PREFIX, "reset", reset);
        } catch {}
      }

      // Alt + ArrowUp/ArrowDown to change font family (existing behavior)
      if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
        e.preventDefault();
        const direction = e.key === "ArrowDown" ? 1 : -1; // Down increases, Up decreases
        // Cycle font family with wrap
        setTokens((t) => {
          const n = FONTS.length;
          const nextIndex = ((t.fontIndex + direction) % n + n) % n;
          const next: Tokens = { ...t, fontIndex: nextIndex };
          applyTokens(next);
          storeTokens(next);
          try {
            // eslint-disable-next-line no-console
            console.debug(LOG_PREFIX, "font index", {
              from: t.fontIndex,
              to: nextIndex,
              name: FONTS[nextIndex]?.name,
              direction,
            });
          } catch {}
          return next;
        });
      }

      // Alt + C: cycle color family (Shift reverses direction)
      if (e.altKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        setTokens((t) => {
          const n = COLOR_FAMILIES.length;
          const nextIndex = ((t.colorFamilyIndex + direction) % n + n) % n;
          const next: Tokens = { ...t, colorFamilyIndex: nextIndex };
          applyTokens(next);
          storeTokens(next);
          try {
            // eslint-disable-next-line no-console
            console.debug(LOG_PREFIX, "color family", {
              from: COLOR_FAMILIES[t.colorFamilyIndex],
              to: COLOR_FAMILIES[nextIndex],
              direction,
            });
          } catch {}
          return next;
        });
      }

      // Alt + B: cycle brightness shade (Shift reverses direction)
      if (e.altKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        setTokens((t) => {
          const n = SHADES.length;
          const nextIndex = ((t.shadeIndex + direction) % n + n) % n;
          const next: Tokens = { ...t, shadeIndex: nextIndex };
          applyTokens(next);
          storeTokens(next);
          try {
            // eslint-disable-next-line no-console
            console.debug(LOG_PREFIX, "brightness shade", {
              from: SHADES[t.shadeIndex],
              to: SHADES[nextIndex],
              direction,
            });
          } catch {}
          return next;
        });
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "AltLeft") setIsLeftAltDown(false);
      if (e.key === "Shift") setIsShiftDown(false);
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
    setActive(isLeftAltDown || (isLeftAltDown && isShiftDown));
  }, [isLeftAltDown, isShiftDown]);

  const currentFont = useMemo(() => FONTS[clamp(tokens.fontIndex, 0, FONTS.length - 1)], [tokens.fontIndex]);
  const currentFamily = COLOR_FAMILIES[clamp(tokens.colorFamilyIndex, 0, COLOR_FAMILIES.length - 1)];
  const currentShade = SHADES[clamp(tokens.shadeIndex, 0, SHADES.length - 1)];
  const currentFg = useMemo(() => colorVar(currentFamily, currentShade), [currentFamily, currentShade]);

  // Legend overlay content
  return (
    <div
      aria-live="polite"
      className={
        active
          ? "pointer-events-none absolute right-4 top-4 z-50 rounded-md border bg-card/90 backdrop-blur px-3 py-2 shadow-sm text-sm"
          : "hidden"
      }
      style={{ fontFamily: "'Inter', Arial, Helvetica, sans-serif" }}
    >
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Design Tweaks</div>
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
          <span>↑/↓ — Font</span>
          <span className="ml-2 text-muted-foreground">({currentFont?.name})</span>
        </li>
        <li className="flex items-center gap-2">
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">C</kbd>
          <span>Color</span>
          <span className="ml-2 text-muted-foreground">({currentFamily})</span>
        </li>
        <li className="flex items-center gap-2">
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">B</kbd>
          <span>Brightness</span>
          <span className="ml-2 text-muted-foreground">({currentShade})</span>
          <span
            className="ml-2 inline-flex h-3 w-6 rounded border align-middle"
            style={{ background: currentFg }}
            aria-hidden="true"
            title={`--color-${currentFamily}-${currentShade}`}
          />
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌥</kbd>
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">R</kbd>
          <span>Reset</span>
        </li>
      </ul>
    </div>
  );
}
