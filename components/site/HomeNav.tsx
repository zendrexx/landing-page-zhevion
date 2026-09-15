"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { trackCTA } from "@/lib/analytics";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "zhevion-theme";

const primaryLinks = [
  { href: "#work", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

const menuLinks = [
  ...primaryLinks,
  { href: "/work", label: "All work" },
  { href: "/legal", label: "Privacy & terms" },
] as const;

export function HomeNav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromSystem = () => {
      let saved: string | null = null;
      try {
        saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch {}

      if (saved !== "light" && saved !== "dark") {
        const systemValue = systemTheme.matches ? "dark" : "light";
        applyTheme(systemValue);
        setTheme(systemValue);
      } else {
        applyTheme(saved);
        setTheme(saved);
      }
    };

    syncFromSystem();
    systemTheme.addEventListener("change", syncFromSystem);
    return () => systemTheme.removeEventListener("change", syncFromSystem);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}

    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  const themeLabel =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
        ? "Switch to dark mode"
        : "Toggle color theme";

  return (
    <header className="zv-home-nav">
      <div className="zv-container zv-home-nav-row">
        <a href="/" className="zv-home-brand" aria-label="Zhevion home">
          <ZhevionMark size={28} />
          <span>Zhevion</span>
        </a>

        <div className="zv-home-nav-actions">
          <nav aria-label="Primary" className="zv-home-primary-nav">
            {primaryLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/start-a-project"
            className="zv-home-nav-cta"
            onClick={() => trackCTA("home-nav-start-project")}
          >
            Start a project
          </a>

          <button
            type="button"
            className="zv-theme-toggle"
            aria-label={themeLabel}
            aria-pressed={theme === "dark"}
            title={themeLabel}
            onClick={toggleTheme}
          >
            <svg className="zv-theme-icon zv-theme-icon-moon" viewBox="0 0 24 24" aria-hidden>
              <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
            </svg>
            <svg className="zv-theme-icon zv-theme-icon-sun" viewBox="0 0 24 24" aria-hidden>
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
            </svg>
          </button>

          <button
            type="button"
            className="zv-home-menu-button md:!hidden"
            aria-expanded={open}
            aria-controls="zv-home-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            <span aria-hidden>{open ? "×" : "•••"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="zv-home-menu"
            aria-label="More navigation"
            className="zv-home-menu md:!hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: [0.2, 1, 0.2, 1] }}
          >
            {menuLinks.map((link, index) => (
              <a href={link.href} key={`${link.href}-${link.label}`} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.label}
                <b aria-hidden>↗</b>
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = theme === "dark" ? "#151515" : "#f7f7f7";
  });
  window.dispatchEvent(new CustomEvent("zhevion-theme-change", { detail: theme }));
}
