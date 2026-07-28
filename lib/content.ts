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
  // Real portrait screenshots, built by scripts/export-screens.py from the
  // 2580×5592 masters in assets/screens/grocery-v4/ — the Android status bar
  // and gesture bar cropped off, downscaled to 840px, and given the top/bottom
  // band DeviceFrame lays its Dynamic Island and home indicator over.
  //
  // The app ships light and dark themes and the export writes both sets to
  // /public/screens/grocery/<theme>/; the site uses the light set because its
  // cream surface reads as a bright object against the studio's graphite
  // background instead of dissolving into it. Adding a screen here means adding
  // its name to SCREENS in the export script and re-running it.
  screens: [
    { src: "/screens/grocery/light/10_home.webp", label: "Today's plan", alt: "Zebite home screen: Zeb flagging food that expires soon, today's three planned meals with calories, and daily macro targets." },
    { src: "/screens/grocery/light/20_plan.webp", label: "Meal plan", alt: "Five-day meal plan with calories and macros eaten so far, a shopping and daily food-cost summary, and today's meals." },
    { src: "/screens/grocery/light/21_plan_recipe.webp", label: "AI recipe", alt: "A recipe generated for one of the planned meals, with its ingredient list and macros." },
    { src: "/screens/grocery/light/30_grocery.webp", label: "Within budget", alt: "Grocery list showing the budget left this week with a Within budget badge, three items to buy with prices, and the items already owned." },
    { src: "/screens/grocery/light/40_pantry.webp", label: "Pantry", alt: "Pantry with items-in-stock and needs-attention counts, search, category filters, and per-item quantities flagged when they are running low." },
    { src: "/screens/grocery/light/41_add_to_pantry.webp", label: "Snap to stock", alt: "Add to pantry sheet offering manual entry, scanning a receipt, or snapping a photo of your groceries for the AI to identify." },
    { src: "/screens/grocery/light/50_insights.webp", label: "Insights", alt: "Insights screen summarising weekly spending against budget alongside nutrition trends." },
    { src: "/screens/grocery/light/71_zeb_chat.webp", label: "Ask Zeb", alt: "Ask Zeb chat answering what to cook right now using ingredients already in the pantry." },
  ],
  screenSize: { w: 840, h: 1801 },
  screenChrome: "#f3f1e9", // matches the capture's cream top edge
  screenBandIncluded: true,
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
  // No dedicated RepForge page yet, so "Learn more" renders muted and
  // non-interactive rather than linking somewhere that isn't there — the same
  // rule the store badges follow. Set this to "https://repforge.zhevion.com"
  // once that site is live and the link turns itself back on.
  learnMoreHref: null as string | null,
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
  // Captured flush at the app's own header with no band around it, so
  // DeviceFrame reserves its own status strip for the island.
  screenBandIncluded: false,
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
