import type { Config } from "tailwindcss";

/**
 * Zhevion design tokens.
 * Studio base is neutral graphite/off-white so the two app accents carry color:
 *  - Grocery world → forest green + lime
 *  - Forge world   → electric violet
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Studio base (neutral, premium)
        graphite: {
          DEFAULT: "#0E0F10",
          900: "#0E0F10",
          800: "#16181A",
          700: "#1E2124",
          600: "#282C30",
        },
        cream: "#F5F5F3",
        muted: "#9A9A97",
        // Grocery accent world
        forest: {
          900: "#0D2E21",
          700: "#123B2A",
          500: "#1B5C41",
        },
        lime: {
          DEFAULT: "#B5E34D",
          ink: "#16290B",
        },
        // Forge accent world
        volt: {
          DEFAULT: "#7C5CFF",
          deep: "#5B34E0",
          soft: "#A88BFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Gentler than float-slow — for the mascot, who should feel alive
        // without looking like he's detached from the floor.
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-soft": "float-soft 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
