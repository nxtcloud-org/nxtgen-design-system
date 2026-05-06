"use client";

import { Moon, Sun } from "@nxtgen-org/icons";
import { Button } from "@nxtgen-org/react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("nxtgen-theme", next);
    setTheme(next);
  };

  if (!mounted) return <div style={{ width: 40, height: 40 }} />;

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="테마 전환">
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </Button>
  );
}
