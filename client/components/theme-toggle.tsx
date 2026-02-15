"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-8 h-8 rounded-md text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
    >
      <SunIcon className="hidden dark:block h-4 w-4" />
      <MoonIcon className="block dark:hidden h-4 w-4" />
    </button>
  );
}
