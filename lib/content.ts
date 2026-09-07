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
 *
 * CONTACT_EMAIL is the studio inbox (Zhevion), not Zen's personal address —
 * used on every legal doc, the contact form, and anywhere the site promises
 * "email us". Keep it a real, checked inbox: every /legal page tells a
 * reviewer or a user to write to this address and expects an answer.
 */
const CONTACT_EMAIL = "hello@zhevion.com";

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
  // 4300×9320 v5 masters in assets/v5/ — the Android status bar and gesture
  // bar cropped off, downscaled to 840px, and given the top/bottom band
  // DeviceFrame lays its Dynamic Island and home indicator over.
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

/**
 * Hero — the first screen.
 *
 * The rotating words are the studio's service offering, not app features, so
 * the HONESTY RULE above applies differently here: nothing in this list claims
 * a shipped capability of Zebite or RepForge. Keep it that way — if a word
 * would read as a product claim, it belongs in GROCERY/FORGE instead.
 *
 * Word order is deliberate: it opens on the two broadest words, drops into the
 * concrete deliverables in the middle, and closes on the widest one before
 * looping, so the loop point never feels like a hard cut.
 */
export const HERO = {
  eyebrow: "Independent design & product studio",
  lead: "We design and build",
  tail: "for people who expect more.",
  words: [
    "BRANDS",
    "PRODUCTS",
    "MOBILE APPS",
    "SAAS",
    "WEBSITES",
    "SOFTWARE",
    "LANDING PAGES",
    "DIGITAL EXPERIENCES",
  ],
  /**
   * The word the cycler rests on when the visitor prefers reduced motion, and
   * the one used for server render so the first paint is never blank. Must be
   * a member of `words`.
   */
  restWord: "PRODUCTS",
  /**
   * What a screen reader is given, once, in place of the animation. Written out
   * rather than generated from `words` so the casing ("SaaS") and the final
   * conjunction read as English instead of as a list.
   */
  spoken:
    "We design and build brands, products, mobile apps, SaaS, websites, software, landing pages and digital experiences for people who expect more.",
  meta: "",
};

/**
 * Work — the section after the hero. Repositions the studio as one you can
 * hire (websites, apps, SaaS, embedded tooling), using Zebite and RepForge as
 * proof-of-craft case studies rather than the whole identity. See PROJECTS for
 * the case-study entries themselves.
 */
export const STACK = {
  eyebrow: "What we build with",
  items: [
    "Flutter",
    "Firebase",
    "Next.js",
    "React",
    "TypeScript",
    "Dart",
    "Swift",
    "Tailwind CSS",
    "Figma",
    "Node.js",
  ],
} as const;

export const WORK = {
  eyebrow: "Selected work",
  statement:
    "Building a great product takes months. Starting with Zhevion takes less. We design, build, and ship products people want to use.",
  deliverables: [
    {
      title: "Websites & Landing Pages",
      body: "Fast, editorial sites that convert — not templates.",
    },
    {
      title: "Mobile Apps",
      body: "iOS and Android, one codebase, native feel.",
    },
    {
      title: "SaaS & Web Platforms",
      body: "Full-stack products, from auth to billing.",
    },
    {
      title: "Embedded in your workflow",
      body: "Tools and integrations that plug into how you already work.",
    },
  ],
  storiesEyebrow: "Our story",
  storiesHeading: "Two apps. One portfolio. Zero shortcuts.",
} as const;

export type ProjectKind = "Product" | "Portfolio";

/**
 * Case-study entries for the Work section's Stories block, and for the
 * standalone /work page. `zebite` and `repforge` are looked up by `key`
 * against GROCERY/FORGE for their real name/summary/screenshot — nothing
 * here duplicates that data.
 *
 * The remaining entries are real freelance/personal work by studio people —
 * `person` names who built it, `image` is a real screenshot (no fabricated
 * device mockups; HONESTY RULE applies here too).
 *
 * `guanzon` is the Inventory Stock Request System Zendrex built as a Junior
 * Software Developer at Guanzon Group of Companies — screenshot copied from
 * zendrex.zhevion.com's own portfolio (outsource.png there).
 */
export const PROJECTS = [
  {
    key: "zebite",
    kind: "Product",
    name: GROCERY.name,
    summary: GROCERY.pitch,
    ctaLabel: "View project",
    href: GROCERY.learnMoreHref,
  },
  {
    key: "repforge",
    kind: "Product",
    name: FORGE.name,
    summary: FORGE.pitch,
    ctaLabel: null as string | null,
    href: FORGE.learnMoreHref,
  },
  {
    key: "guanzon",
    kind: "Portfolio",
    name: "Inventory Stock Request System",
    person: "Zendrex",
    summary:
      "A Java/JavaFX desktop module handling item requests, multi-step approvals, and stock tracking, built as part of Guanzon Group of Companies' internal software.",
    image: "/work/guanzon.png",
    tags: ["Java", "JavaFX", "MySQL"],
    href: US.people[0].href,
  },
  {
    key: "safetycrib",
    kind: "Portfolio",
    name: "SafetyCrib",
    person: "Aldrin",
    summary:
      "An infant safety system that uses computer vision to detect vomiting events, combining a YOLO-based detection model with a React Native mobile application.",
    image: "/work/safetycrib.png",
    tags: ["Computer vision", "YOLO", "React Native"],
    href: "https://aldrin.zhevion.com",
  },
  {
    key: "rgm",
    kind: "Portfolio",
    name: "RGM Furniture",
    person: "Aldrin",
    summary:
      "A full-stack e-commerce platform built for a local furniture business, featuring product browsing, cart and ordering functionality, Stripe payments, and MongoDB.",
    image: "/work/rgm.png",
    tags: ["E-commerce", "Stripe", "MongoDB"],
    href: "https://aldrin.zhevion.com",
  },
  {
    key: "beru",
    kind: "Portfolio",
    name: "Beru",
    person: "Aldrin",
    summary:
      "An interactive mental-health-focused web application that combines a 3D digital world, real-time communication, and immersive user interactions.",
    image: "/work/beru.jpg",
    tags: ["3D world", "Real-time", "Web app"],
    href: "https://aldrin.zhevion.com",
  },
] as const;

/**
 * Where the phone's screen sits inside /hero/hand-phone.png, as a percentage
 * of that image's own box.
 *
 * Measured, not eyeballed — `python scripts/export-hand.py` derives these from
 * the master's pixels and is the only thing allowed to change them.
 *
 * The screen is 182x418 (aspect 0.4354). Getting this wrong is very visible:
 * an earlier pass matched the bezel's grey gradient as well as the screen and
 * came out 202x435, which put the app UI on top of the bezel and past the
 * phone's silhouette. The bezel inset is ~10px per side on a 1584px master, so
 * the margin for error is small.
 */
export const HAND_SCREEN_RECT = {
  left: 15.135,
  top: 1.957,
  width: 49.189,
  height: 74.377,
  /** Corner radius, as a % of the rect's own width / height (22px @ 182x418). */
  radius: "12.09% / 5.26%",
};

/**
 * Main studio homepage content.
 *
 * Unlike the app feature lists above, these entries describe work Zhevion can
 * be hired to do. They deliberately make no claims about client counts,
 * outcomes, timelines, or case studies that are not present in this repo.
 */
export const STUDIO_HOME = {
  hero: {
    eyebrow: "Independent software & product studio",
    heading: "We build software that moves businesses forward.",
    /**
     * The closing word of `heading` cycles through this list (StudioHero
     * renders it separately from the static lead-in text). Each entry keeps
     * its own trailing period since it stands in as the sentence's full stop.
     * First entry must match `heading`'s static word so SSR/no-JS matches.
     */
    words: ["forward.", "faster.", "further.", "ahead."],
    body:
      "Zhevion designs and develops mobile apps, business systems, websites, and digital products built around how businesses actually work.",
  },
  work: {
    eyebrow: "Selected work",
    heading: "Working products, not presentation theatre.",
    body:
      "Our own products are where product thinking, interface design, and engineering meet. Every screen below comes from software we are actively building.",
  },
  services: {
    eyebrow: "Services",
    heading: "The right system for the work in front of you.",
    body:
      "We start with the business problem, then choose the smallest useful product that can solve it well.",
  },
  value: {
    eyebrow: "From scattered to clear",
    heading: "Your workflow should not depend on memory and manual follow-up.",
    body:
      "We study how information enters your business, where it gets stuck, and what your team repeats. Then we design one practical system around the way the work needs to move.",
  },
  process: {
    eyebrow: "Process",
    heading: "Clear decisions at every stage.",
  },
  team: {
    eyebrow: "The people behind Zhevion",
    heading: "Small team. Close collaboration.",
    body:
      "The people discussing the problem are the same people shaping and building the solution.",
  },
  about: {
    eyebrow: "About Zhevion",
    heading: "One studio for client software and products of our own.",
    body:
      "Zhevion is the umbrella behind the software we build for businesses and the focused products we build ourselves. We take ideas from an early conversation through product decisions, interface design, engineering, launch, and the improvements that follow.",
  },
  contact: {
    eyebrow: "Start a project",
    heading: "Have something your business should be doing better?",
    body:
      "Tell us about the work, the bottleneck, or the idea. You don't need to know what should be built yet — we'll help figure that out with you.",
  },
} as const;

export const STUDIO_SERVICES = [
  {
    number: "01",
    title: "Business Systems",
    body:
      "Replace scattered records and manual follow-up with a system your team can see, trust, and use.",
    items: [
      "CRM and sales systems",
      "Inventory and operations",
      "Dashboards and admin tools",
      "Project and internal tracking",
    ],
    outcome: "Less chasing. Better visibility. Clearer decisions.",
  },
  {
    number: "02",
    title: "Apps & Digital Products",
    body:
      "Turn an idea or customer need into a focused product that is useful from its first release.",
    items: [
      "Mobile apps",
      "SaaS and MVP development",
      "Customer portals",
      "Product and interface design",
    ],
    outcome: "A product people can understand—and keep using.",
  },
  {
    number: "03",
    title: "Websites & Automation",
    body:
      "Create a clearer front door for the business and connect the repetitive work behind it.",
    items: [
      "Websites and landing pages",
      "Lead-generation workflows",
      "Forms, CRM, and API integration",
      "Automation and AI-assisted workflows",
    ],
    outcome: "Fewer handoffs. Faster response. A stronger customer journey.",
  },
] as const;

export const WORKFLOW_PROBLEMS = [
  "Leads disappearing in Messenger",
  "Manual tracking across spreadsheets",
  "Repetitive admin work",
  "No central source of business data",
  "Customers asking the same questions",
  "Tools and processes that do not connect",
] as const;

export const STUDIO_PROCESS = [
  {
    number: "01",
    title: "Discover",
    body: "Understand the business, the people doing the work, and the real constraint.",
  },
  {
    number: "02",
    title: "Plan",
    body: "Define the useful first version, priorities, and a practical route to delivery.",
  },
  {
    number: "03",
    title: "Design",
    body: "Shape the flow and interface around decisions users need to make.",
  },
  {
    number: "04",
    title: "Build",
    body: "Develop the working product with maintainable foundations and regular review.",
  },
  {
    number: "05",
    title: "Launch",
    body: "Prepare the product, content, and handoff for real-world use.",
  },
  {
    number: "06",
    title: "Improve",
    body: "Learn from use, remove friction, and evolve what creates value.",
  },
] as const;

export const TEAM = [
  {
    name: "Zendrex",
    role: "Product development",
    body:
      "Turns product plans into working web and mobile software, from interface details to the systems behind them.",
    src: "/us/zen.jpg" as string | null,
    alt: "Zendrex, product developer at Zhevion.",
    href: "https://zendrex.zhevion.com" as string | null,
  },
  {
    name: "Jheanlyn",
    role: "UI/UX & marketing",
    body:
      "Shapes how Zhevion products look, feel, and communicate with the people they are built for.",
    src: "/us/partner.jpg" as string | null,
    alt: "Jheanlyn, who works on UI, UX, and marketing at Zhevion.",
    href: "https://jl.zhevion.com" as string | null,
  },
  {
    name: "Aldrin",
    role: "Studio team",
    body:
      "Supports the studio as product work and client solutions move from early ideas into delivery.",
    src: "/us/aldrinhead.jpg" as string | null,
    alt: "Aldrin, a member of the Zhevion studio team.",
    href: "https://aldrin.zhevion.com" as string | null,
  },
] as const;

export const PROJECT_NEEDS = [
  "Business system",
  "Mobile app",
  "Website",
  "Automation",
  "Not sure yet",
] as const;
