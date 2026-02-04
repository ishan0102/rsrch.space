"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "rsrch.theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? getInitialTheme()) === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
    applyTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-[42px] items-center justify-center rounded-md border border-gray-400 bg-[#f0eadd] px-3 py-2.5 text-sm font-medium text-gray-600 dark:border-gray-700 dark:bg-[#2a2a2e] dark:text-gray-200"
    >
      {isDark ? (
        <>
          <SunIcon className="mr-2 h-4 w-4" />
          <span>Light</span>
        </>
      ) : (
        <>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

