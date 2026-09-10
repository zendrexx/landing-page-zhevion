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
        // Studio light canvas — the home page's ground. Faint values are
        // pre-mixed because Tailwind 3 cannot apply an opacity modifier to a
        // var() colour (see the note in globals.css).
        paper: {
          DEFAULT: "#F2F1EC",
          deep: "#E8E7E0",
        },
        ink: {
          DEFAULT: "#0D2E21",
          soft: "#4A554E",
          faint: "rgba(13, 46, 33, 0.42)",
          rule: "rgba(13, 46, 33, 0.12)",
        },
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
      /**
       * Four radius tokens, each with one job. The two-token rule the design
       * doc used to state was never actually true in the code (15 distinct
       * values), and the approved hero itself uses both a 4px control radius
       * and a 38px stage radius — so the doc was what was wrong, not the hero.
       *
       *  control  anything pressed, typed into, focused, or read as a chip
       *  card     genuine objects sitting on a ground
       *  stage    exactly one surface type: the oversized dark product stage
       *  pill     only genuine lozenges and circles
       *
       * `stage` is 38px because that is the approved hero's own upper value
       * (StudioHero.tsx keeps its literal `rounded-[30px] sm:rounded-[38px]`
       * and is the one documented exception to this system — it was signed off
       * as-is and is deliberately not swept).
       *
       * Radii expressed as a percentage of their own element — the logo mark,
       * the app lockups, DeviceFrame's `width * 0.16` — are *shapes*, not
       * surface radii. They are exempt and must not be migrated to a token.
       */
      borderRadius: {
        control: "4px",
        card: "20px",
        stage: "38px",
        pill: "999px",
      },
      letterSpacing: {
        tightest: "-0.045em",
        // The display wordmark is set far tighter than body copy: at 15vw the
        // default sidebearings open gaps you can park a car in.
        display: "-0.055em",
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
        // The hero hand's idle drift. Lives on its own wrapper element so it
        // never competes with the pointer-parallax transform on the child.
        "float-hand": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Track holds 3 copies of the list (see Stack.tsx) so -33.3333% loops
        // seamlessly back to an identical copy, with enough runway that a
        // short item list doesn't leave a visible gap on ultrawide viewports.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.3333%)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-soft": "float-soft 7s ease-in-out infinite",
        "float-hand": "float-hand 7s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
