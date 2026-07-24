/**
 * Zhevion content model — single source of truth for copy & features.
 *
 * HONESTY RULE: every feature listed here must be a real, shipping capability
 * of the named app. Zebite features come from the app's verified feature list;
 * RepForge features are taken from its real marketing renders. Do not add
 * features, metrics, ratings, download counts, or named testimonials that
 * don't exist.
 *
 * NAMING: the two apps are Zebite (grocery) and RepForge (lifting). "Forge
 * Linear", "Forge Strength" and "Forge Peak" are training programs *inside*
 * RepForge and appear in the real screenshots — never rename those.
 */

/**
 * Real contact details — same ones used on the portfolio and the AI Grocery
 * Planner landing page. No placeholder handles: if an account doesn't exist,
 * it doesn't get a link.
 */
const CONTACT_EMAIL = "adversalozen8@gmail.com";

export type ContactIcon = "mail" | "linkedin" | "github";

export const CONTACT = {
  email: CONTACT_EMAIL,
  links: [
    {
      icon: "mail" as ContactIcon,
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: "linkedin" as ContactIcon,
      label: "LinkedIn",
      value: "Zendrex Adversalo",
      href: "https://www.linkedin.com/in/zendrex-adversalo-1abb69355",
    },
    {
      icon: "github" as ContactIcon,
      label: "GitHub",
      value: "@zendrexx",
      href: "https://github.com/zendrexx",
    },
  ],
};

export const STUDIO = {
  name: "Zhevion",
  // 2–3 candidate taglines tying "eat smarter" + "train stronger" together.
  tagline: "Eat smarter. Train stronger.",
  taglineAlt: "Apps for a stronger, smarter you.",
  taglineAlt2: "Fuel and strength: two apps, one studio.",
  ethos:
    "Zhevion is a small studio building design-led, AI-powered apps that make everyday life healthier and more intentional. Each one is focused, fast, and genuinely useful, never bloated.",
  email: CONTACT_EMAIL,
  principles: [
    {
      title: "Focused, not bloated",
      body: "Each app does a few things exceptionally well. No feature bloat, no clutter.",
    },
    {
      title: "AI that reasons, not guesses",
      body: "We use AI to reason over real models and your real data, never to fabricate numbers.",
    },
    {
      title: "Design-led & fast",
      body: "Premium, considered design and offline-first speed on iOS and Android.",
    },
  ],
  // Honest "what we don't do": a credibility band, not a comparison to rivals.
  antiPatterns: ["No ads", "No clutter", "No dark patterns", "No selling your data"],
};

export type Feature = { title: string; body: string };

export const GROCERY = {
  name: "Zebite",
  accent: "grocery" as const,
  pitch:
    "Smarter groceries, planned by AI around your pantry, your goals, and your budget.",
  triad: ["What you HAVE", "What you WANT", "Your BUDGET"],
  blurb:
    "Plan a week of meals and groceries around what's already in your pantry. The AI looks at what you own first and only buys what's missing, cutting waste and overspending.",
  platforms: "iOS · Android · Built with Flutter",
  learnMoreHref: "https://zebite.zhevion.com", // dedicated Zebite landing page
  // Store links. Both are null ("coming soon") while the app is still in
  // development. `next: "googlePlay"` promotes the Play badge to an "Up next"
  // hint — the store expected to launch first. When the Play listing goes
  // live, set googlePlay to
  // "https://play.google.com/store/apps/details?id=com.zhevion.grocery"
  // (Zebite's real Android applicationId); set appStore once the iOS listing
  // exists.
  store: {
    googlePlay: null as string | null,
    appStore: null as string | null,
    next: "googlePlay" as "googlePlay" | "appStore" | null,
  },
  features: [
    {
      title: "AI meal planning",
      body: "Multi-day plans with real recipes (ingredients, quantities, instructions, and per-meal macros) built around your pantry, goals, diet, allergies, and weekly budget.",
    },
    {
      title: "Pantry-first logic",
      body: "Reuses what you already own, prefers items nearing expiry, and avoids duplicate buys.",
    },
    {
      title: "Always on budget",
      body: "A smart grocery list of only what the pantry doesn't cover, kept within budget, with money-saving swaps and a plain-language budget note.",
    },
    {
      title: "Snap to stock",
      body: "Photograph a receipt or your shelf and AI vision adds the items to your pantry and logs the spend.",
    },
  ] satisfies Feature[],
  // Real portrait screenshots (in /public/screens/grocery), 720×1471.
  screens: [
    { src: "/screens/grocery/home.png", label: "Today's plan", alt: "Zebite home screen showing today's meal plan with all three meals cooked and daily macro targets." },
    { src: "/screens/grocery/plan.png", label: "Meal plan", alt: "Five-day meal plan with calories and macros eaten so far and today's meals." },
    { src: "/screens/grocery/plan_recipe.png", label: "AI recipe", alt: "A generated AI recipe with ingredients, macros, and a Cook this action." },
    { src: "/screens/grocery/grocery.png", label: "Within budget", alt: "Smart grocery list with a Within budget confirmation, one item to buy and the rest already owned." },
    { src: "/screens/grocery/pantry.png", label: "Pantry", alt: "Categorized pantry with quantities and expiry states like expires in 3 days." },
    { src: "/screens/grocery/insights.png", label: "Insights", alt: "Insights dashboard with weekly spending versus budget and nutrition trends." },
    { src: "/screens/grocery/scan.png", label: "Snap to stock", alt: "Snap to stock screen to scan a receipt or photograph your groceries." },
  ],
  screenSize: { w: 720, h: 1471 },
  screenChrome: "#f3f1e9", // matches the capture's cream top edge
};

export const FORGE = {
  name: "RepForge",
  // The app's own strapline. Note "Forge Strength" is a *program* inside the
  // app (see features + screenshots), not the app name — don't reuse it here.
  wordmark: "Log it. Lift it. Level up.",
  accent: "forge" as const,
  pitch: "Train smart. Get stronger.",
  blurb:
    "Your all-in-one powerlifting companion. Follow coach-made programs, log every rep offline-first, and watch your strength climb. Built for lifters, driven by progress.",
  platforms: "iOS · Android · Built with Flutter",
  learnMoreHref: "https://repforge.zhevion.com", // dedicated RepForge landing page
  // Store links — same shape as GROCERY.store. RepForge isn't published yet
  // (its Android applicationId is still the Flutter placeholder
  // com.example.client), so both stores are "coming soon". When the Play
  // listing exists, set googlePlay to its URL to make the badge live.
  store: {
    googlePlay: null as string | null,
    appStore: null as string | null,
    // No store is promoted yet — RepForge trails Zebite to launch.
    next: null as "googlePlay" | "appStore" | null,
  },
  features: [
    {
      title: "Structured programs",
      body: "Follow coach-made strength programs from beginner to advanced, like Forge Linear and Forge Strength, or build your own sessions.",
    },
    {
      title: "Log every rep",
      body: "Offline-first workout logging for squat, bench, deadlift and accessories: sets, reps, weight, and RPE, with full history.",
    },
    {
      title: "Track your progress",
      body: "PRs, training volume, and strength over time, plus estimated 1RM from your working sets.",
    },
    {
      title: "Know your level",
      body: "A strength-level grade (Novice and up) measured against bodyweight standards, plus streaks to keep you consistent.",
    },
  ] satisfies Feature[],
  // Real portrait screenshots (in /public/screens/forge), 720×1560.
  screens: [
    { src: "/screens/forge/home.png", label: "Today", alt: "Forge home screen showing today's Bench Day session from Forge Strength, a quick-start tile, and a 15 day streak calendar." },
    { src: "/screens/forge/programs.png", label: "Programs", alt: "Browse Programs list with Forge Linear, Forge Strength and Forge Peak, each showing weeks, days per week and total workouts." },
    { src: "/screens/forge/view_program.png", label: "Program", alt: "Forge Strength program broken into weeks and days, with a Start Week 4 Day 2 button." },
    { src: "/screens/forge/log_workout.png", label: "Log a set", alt: "Log Workout screen with a live duration timer and per-set weight, reps and RPE entry for Bench Press." },
    { src: "/screens/forge/history.png", label: "History", alt: "History screen with this week's workouts, volume lifted, recent PRs and a weekly volume chart." },
    { src: "/screens/forge/profile.png", label: "Strength level", alt: "Profile showing an Advanced strength level graded against bodyweight, plus squat, bench and deadlift personal records." },
  ],
  screenSize: { w: 720, h: 1560 },
  screenChrome: "#0f0f0f", // matches the capture's near-black top edge
};

/**
 * The two people behind Zhevion — one portrait slot each.
 *
 * `/us/zen.jpg` is a real photo. `/us/partner.jpg` is a neutral stand-in until
 * a real one is dropped in; set `placeholder: false` on an entry once its photo
 * is real so the "photo coming" chip stops rendering. Names and roles are plain
 * strings — edit them here, not in the component.
 */
export const US = {
  eyebrow: "Us",
  heading: "Two of us, two apps.",
  people: [
    {
      name: "Zen",
      role: "Codes & ships both apps",
      src: "/us/zen.jpg",
      alt: "Zen, who builds and ships both Zhevion apps.",
      placeholder: false,
      href: "https://zendrex.zhevion.com",
    },
    {
      name: "JL",
      role: "UI/UX & marketing",
      src: "/us/partner.jpg",
      alt: "JL, who leads UI/UX and marketing for Zhevion.",
      placeholder: false,
      href: "https://jl.zhevion.com",
    },
  ],
  body: [
    "Zhevion isn't a company. It's the two of us. I write the code; my wife shapes how both apps look and feel and gets the word out about them, and she's the reason they exist in the first place.",
    "Zebite came from our own kitchen: overspending every week and throwing out food we forgot we bought. RepForge came from the other half of the same problem: training consistently and actually knowing whether it's working.",
    "We build slowly, ship what we'd use ourselves, and keep both apps small on purpose. If something feels bloated or off, it usually gets cut.",
  ],
};
