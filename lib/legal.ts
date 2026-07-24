/**
 * Zhevion legal documents — single source of truth for privacy & terms copy.
 *
 * HONESTY RULE (same as lib/content.ts, and it matters more here): every
 * statement below must be true of the shipping code. These pages are the
 * privacy-policy URL on the Play listing, the App Store listing, and the
 * Google/Facebook OAuth consent screens — a reviewer reads them next to the
 * app's real behaviour, and Play's Data Safety form must agree with them.
 *
 * Each claim here was checked against the app repos:
 *   Zebite   — groceryapp/ (Flutter + Hive + Supabase + OpenAI via ai-proxy)
 *   RepForge — Workout_App/client/ (Flutter + Isar, no network at all)
 *
 * Never add a practice we don't have (analytics, ads, location, push) just
 * because policy templates usually list it. Under-claiming is safe; over-
 * claiming is a false disclosure.
 */

import { CONTACT, FORGE, GROCERY, STUDIO } from "@/lib/content";

/** Bump both dates together when a document changes materially. */
export const LEGAL_EFFECTIVE = "24 July 2026";
export const LEGAL_UPDATED = "24 July 2026";

/**
 * The legal operator behind both apps. Zhevion is not an incorporated
 * company (see US.body in lib/content.ts) — it's two people, so the terms
 * name the individual who is actually responsible.
 */
export const OPERATOR = "Zendrex Adversalo";
export const JURISDICTION = "the Republic of the Philippines";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalSection = {
  /** Anchor id — also the table-of-contents target. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalApp = "zebite" | "repforge" | "website";

export type LegalDoc = {
  /** Route under /legal, e.g. "zebite/privacy". */
  slug: string;
  kind: "privacy" | "terms";
  app: LegalApp;
  /** Page <h1>. */
  title: string;
  /** Sits under the title, and doubles as the route's meta description. */
  summary: string;
  effective: string;
  updated: string;
  /** The "short version" band at the top — plain-language, no hedging. */
  tldr: string[];
  sections: LegalSection[];
};

const EMAIL = CONTACT.email;

/** Shared closing sections — identical obligations, so written once. */
function contactSection(subject: string): LegalSection {
  return {
    id: "contact",
    heading: "Contact us",
    blocks: [
      {
        type: "p",
        text: `${STUDIO.name} is an independent studio operated by ${OPERATOR}. For anything in this document — questions, corrections, or a request about your data — email ${EMAIL} with "${subject}" in the subject line. We are two people, so we answer personally, usually within a few days.`,
      },
    ],
  };
}

function changesSection(what: string): LegalSection {
  return {
    id: "changes",
    heading: `Changes to ${what}`,
    blocks: [
      {
        type: "p",
        text: `We update this document when the app changes, and we date every version at the top. If a change materially affects how your information is handled, we will say so in the app or by email before it takes effect — not quietly, and not retroactively.`,
      },
      {
        type: "p",
        text: `Continuing to use the app after a change takes effect means you accept the updated document.`,
      },
    ],
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   ZEBITE — PRIVACY POLICY

   Zebite requires an account (lib/core/router/app_router.dart redirects any
   signed-out user to /login), keeps Hive on-device as the source of truth,
   and mirrors that to Supabase. Every table named below exists in
   groceryapp/supabase/migrations/0001–0006.
   ══════════════════════════════════════════════════════════════════════════ */

const ZEBITE_PRIVACY: LegalDoc = {
  slug: "zebite/privacy",
  kind: "privacy",
  app: "zebite",
  title: `${GROCERY.name} Privacy Policy`,
  summary: `How ${GROCERY.name} handles your account, your pantry, your meal plans, and the photos you scan.`,
  effective: LEGAL_EFFECTIVE,
  updated: LEGAL_UPDATED,
  tldr: [
    "Your data lives on your phone first. The cloud copy exists so you can restore it on a new device.",
    "We do not sell your data, show you ads, or embed any analytics or tracking SDK. There are none in the app.",
    "Meal planning and photo scanning send your pantry, your profile and your photo to OpenAI to be processed. Nothing is used to train anyone's model.",
    "Receipt and shelf photos are analysed and discarded. We never store the image.",
    "Sharing grocery prices with other users is opt-in, off by default, and anonymous.",
    "You can ask us to delete your account and everything in it, at any time, by email.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} is made by ${STUDIO.name}, an independent studio operated by ${OPERATOR}. ${STUDIO.name} is not a company — it is two people building apps they use themselves. ${OPERATOR} is the person responsible for the data described here, and ${EMAIL} reaches them directly.`,
        },
        {
          type: "p",
          text: `This policy covers the ${GROCERY.name} mobile app (app id com.zhevion.grocery) on iOS and Android. The ${STUDIO.name} website and ${FORGE.name} are covered by their own separate documents.`,
        },
      ],
    },
    {
      id: "account-required",
      heading: "An account is required",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} needs an account to work. The features that make it useful — generating a meal plan, scanning a receipt — run on a server that has to know who is asking, both to return your data and to stop one person burning through everyone's AI budget. There is no anonymous or guest mode.`,
        },
        {
          type: "p",
          text: `You can sign up with an email address and password, or with Google or Facebook. If you use email, we send you a six-digit confirmation code to check the address is yours. If you use Google or Facebook, we receive only the basic profile they hand over — your email address, your name, and your profile picture — and never your password or your contacts, posts or friends.`,
        },
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect, and why",
      blocks: [
        {
          type: "p",
          text: `Everything below is something you type, choose, or photograph inside the app. We collect nothing in the background.`,
        },
        {
          type: "table",
          head: ["What", "Specifically", "Why we need it"],
          rows: [
            [
              "Account",
              "Email address; a password (stored only as a hash by our authentication provider, never in plain text); or your Google/Facebook email, name and avatar if you sign in that way",
              "To create your account, sign you in, and let you restore your data on a new phone",
            ],
            [
              "Nutrition profile",
              "Name, height, weight, age, sex, activity level, goal (lose / maintain / gain), weekly budget, plan length, meals per day",
              "To calculate your calorie and macro targets, and to size a meal plan to your budget",
            ],
            [
              "Food preferences",
              "Diet type, allergies, ingredients you avoid, ingredients you like",
              "So generated plans exclude what you can't or won't eat",
            ],
            [
              "Pantry",
              "Items, quantities, units, categories and expiry dates you add or scan",
              "So the app plans around what you already own instead of buying it again",
            ],
            [
              "Plans and lists",
              "Generated meal plans and recipes, grocery lists, meals you log as cooked",
              "They are the app — this is the content you came for",
            ],
            [
              "Spending history",
              "Store name, date, items and amounts from receipts you scan or enter",
              "To show weekly spending against your budget on the Insights screen",
            ],
            [
              "AI usage counters",
              "A timestamp and a type ('plan' or 'scan') for each AI request. No prompt, no reply, no image is kept",
              "To enforce the daily limits and show you how many requests you have left",
            ],
            [
              "Subscription tier",
              "'free', 'plus' or 'pro', and how it was granted",
              "To know what your account is entitled to. No paid tier is currently sold — see the Terms",
            ],
          ],
        },
        {
          type: "p",
          text: `Some of this is health-related information: your weight, your age, your sex, your goal, and especially your allergies. We treat it as sensitive. It is used only to generate your plans and targets, it is never shared with anyone for advertising or profiling, and it is never sold.`,
        },
      ],
    },
    {
      id: "what-we-dont-collect",
      heading: "What we do not collect",
      blocks: [
        {
          type: "p",
          text: `To be specific, because privacy policies are usually vague about this:`,
        },
        {
          type: "list",
          items: [
            "No analytics SDK. There is no Firebase, no Google Analytics, no Amplitude, no PostHog, no Mixpanel in the app.",
            "No advertising. No ad SDK, no advertising identifier (IDFA / AAID), no ad network, no attribution or install tracking.",
            "No location. The app never requests or reads your location, coarse or fine.",
            "No contacts, calendar, microphone, or health-app data. The app requests only camera and photo-library access, and only when you tap to scan.",
            "No crash-reporting SDK, so we do not receive automatic crash reports containing your data.",
            "No data brokers, no profile enrichment, no purchase of information about you from anyone.",
          ],
        },
      ],
    },
    {
      id: "photos",
      heading: "Photos you scan",
      blocks: [
        {
          type: "p",
          text: `When you photograph a receipt or your shelf, the app resizes the image on your device (to at most 1600 pixels wide), sends it to our server, which forwards it to OpenAI to be read, and receives back a list of items. That list is what gets saved to your pantry.`,
        },
        {
          type: "p",
          text: `The image itself is never written to our database and never uploaded to any file storage. It exists only for the seconds the request takes. If a scan fails, nothing is kept at all. The photo also remains in your own camera roll if your phone saved it there — that copy is yours and we have no access to it.`,
        },
        {
          type: "p",
          text: `A receipt can contain more than groceries. We only extract food and drink lines, but the whole image is transmitted for analysis, so if your receipt shows something you would rather not send, crop it or type the items in by hand instead.`,
        },
      ],
    },
    {
      id: "where-it-lives",
      heading: "Where your data lives",
      blocks: [
        {
          type: "p",
          text: `Your phone is the source of truth. ${GROCERY.name} writes everything to a local database on your device first, which is why the app keeps working with no signal. That local copy sits in the app's private storage, readable only by ${GROCERY.name}.`,
        },
        {
          type: "p",
          text: `While you are signed in, the app also mirrors that data to our backend so a new or reset phone can restore it. The backend runs on Supabase, and every table enforces row-level security: your rows are readable and writable only by your own signed-in account. Not by other users, and not by an app rebuilt to try.`,
        },
        {
          type: "p",
          text: `Supabase Inc. is based in the United States and runs on cloud data centres, so your data is processed outside the Philippines. Transmission is encrypted in transit (HTTPS/TLS) and the database is encrypted at rest by the provider.`,
          // If you want to name the exact region, it's in the Supabase
          // dashboard under Project Settings → General → Region. Left
          // unnamed here rather than guessed.
        },
      ],
    },
    {
      id: "ai",
      heading: "How AI processing works",
      blocks: [
        {
          type: "p",
          text: `Two features use AI: generating a meal plan, and reading a photo of a receipt or your groceries. Both run through our own server, which holds the AI provider's key. The app never talks to the AI provider directly and never holds a key that could be extracted from the installed app.`,
        },
        {
          type: "p",
          text: `For a meal plan, what is sent is the information the plan has to be built from: your pantry contents, your calorie and macro targets, your diet type, your allergies and avoided ingredients, your weekly budget and the number of days and meals you asked for. For a scan, what is sent is the photo and an instruction describing what to extract.`,
        },
        {
          type: "p",
          text: `Your name, your email address and your account identifier are not part of these requests. The AI provider is OpenAI, and under their API terms the content sent through it is not used to train their models; they retain requests for a limited period for abuse monitoring and then delete them.`,
        },
        {
          type: "p",
          text: `AI requests are rate limited per account — currently five meal plans and twenty scans per rolling 24 hours, with a short cooldown between requests. To enforce that we record the time and type of each request, and nothing else about it.`,
        },
        {
          type: "p",
          text: `AI output is an estimate and can be wrong. Check anything that matters, especially allergens. See the Terms of Service for the full disclaimer.`,
        },
      ],
    },
    {
      id: "community-prices",
      heading: "Community grocery prices (opt-in)",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} can show what other users recently paid for an ingredient, so budgets are based on real local prices. Contributing to that pool is a setting you turn on yourself — it is off by default, and turning it off stops any further contribution immediately.`,
        },
        {
          type: "p",
          text: `If you turn it on, what is shared is a single price observation at a time: the ingredient, the price, the quantity and unit, the store and branch, and the date. Each price is stored as its own separate row, never grouped by receipt or by shopping trip, so nobody can reconstruct a basket or a shopping pattern from the pool.`,
        },
        {
          type: "p",
          text: `Your account id is attached to a row only so the database can enforce that you may edit and delete your own contributions. It is never shown to other users, and the app has no screen anywhere that displays who submitted a price. You can delete your own contributions at any time.`,
        },
      ],
    },
    {
      id: "notifications",
      heading: "Notifications",
      blocks: [
        {
          type: "p",
          text: `If you enable expiry reminders, ${GROCERY.name} schedules a notification on your device for the morning before a pantry item expires. These are local notifications: they are created and fired by your phone, from data already on your phone.`,
        },
        {
          type: "p",
          text: `There is no push server, no push token, and no notification is ever sent by us. We cannot send you a notification even if we wanted to, and we have no way to know whether you saw one. Turning reminders off, in the app or in your system settings, cancels them.`,
        },
      ],
    },
    {
      id: "sharing",
      heading: "Who else touches your data",
      blocks: [
        {
          type: "p",
          text: `We use a small number of service providers to run the app. They process data on our instructions, for the purpose listed, and for nothing else.`,
        },
        {
          type: "table",
          head: ["Provider", "What it handles", "When"],
          rows: [
            [
              "Supabase",
              "Authentication, database, and the server functions that gate AI requests",
              "Whenever you are signed in",
            ],
            [
              "OpenAI",
              "Generating meal plans; reading receipt and grocery photos",
              "Only when you tap to generate a plan or scan a photo",
            ],
            [
              "Resend",
              "Delivering account emails — confirmation codes and password resets",
              "Only for email sign-up and password recovery",
            ],
            [
              "Google / Facebook",
              "Verifying your identity if you choose social sign-in",
              "Only if you tap that button",
            ],
            [
              "Apple App Store / Google Play",
              "App distribution and updates. They collect their own install and crash data under their own policies",
              "Independently of us",
            ],
          ],
        },
        {
          type: "p",
          text: `That is the entire list. We do not sell, rent, or trade your personal information, and we do not share it for advertising, profiling, or anyone else's model training. We would disclose data only if a valid legal order under Philippine law required it — and we would tell you unless legally barred from doing so.`,
        },
      ],
    },
    {
      id: "retention-deletion",
      heading: "Keeping and deleting your data",
      blocks: [
        {
          type: "p",
          text: `We keep your data for as long as your account exists, because it is your data — your pantry and your history are only useful if they persist. AI usage counters are only meaningful for a day and age out on their own.`,
        },
        {
          type: "p",
          text: `To remove the local copy, sign out or uninstall the app, or clear the app's data in your system settings. To delete your account and everything stored for it, email ${EMAIL} from the address on the account and ask. We will delete it within 30 days and confirm when it is done. Deleting your account removes your profile, your synced app data, your AI usage records and your subscription record.`,
        },
        {
          type: "p",
          text: `Prices you contributed to the community pool are detached from your account rather than deleted, since other users' budgets already rely on them and they carry nothing identifying. If you want them removed too, say so in the same email and we will remove them.`,
        },
        {
          type: "p",
          text: `We are working on making account deletion available inside the app. Until it ships, email is the way, and it works.`,
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: `Under the Data Privacy Act of 2012 (Republic Act No. 10173) you have the right to be informed about how your data is used, to access it, to correct it, to object to its processing, to have it erased or blocked, to obtain a copy in a portable format, and to be compensated for damage caused by its misuse.`,
        },
        {
          type: "p",
          text: `Most of these you can exercise directly in the app: your profile and preferences are editable on the Profile screen, and your pantry, plans and history are yours to edit or clear. For anything else — a full export, an erasure request, or a question about how something is processed — email ${EMAIL} and we will act on it within 30 days.`,
        },
        {
          type: "p",
          text: `If you are not satisfied with how we handled your request, you may lodge a complaint with the National Privacy Commission of the Philippines.`,
        },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} is not designed for or directed at children under 13, and calculates nutrition targets using formulas intended for adults. Do not create an account if you are under 13. If you are between 13 and 18, use it with a parent or guardian's involvement.`,
        },
        {
          type: "p",
          text: `We do not knowingly collect information from a child under 13. If you believe a child has created an account, email ${EMAIL} and we will delete it.`,
        },
      ],
    },
    {
      id: "security",
      heading: "Security",
      blocks: [
        {
          type: "list",
          items: [
            "All traffic between the app and our backend is encrypted with HTTPS/TLS.",
            "Every cloud table enforces row-level security, so a request can only ever read or write rows belonging to the signed-in account that made it.",
            "The AI provider's key lives on the server as a secret. It is not in the app, so it cannot be extracted from an installed or repackaged build.",
            "Your subscription tier is server-authoritative — the app can ask, but only the server can grant it. A modified app cannot upgrade itself.",
            "Passwords are stored only as hashes by our authentication provider. We never see your password, and we cannot recover it for you.",
          ],
        },
        {
          type: "p",
          text: `No system is perfectly secure, and we will not pretend otherwise. If you find a vulnerability, email ${EMAIL} and we will take it seriously and credit you if you want the credit.`,
        },
      ],
    },
    changesSection("this policy"),
    contactSection(`${GROCERY.name} privacy`),
  ],
};

/* ══════════════════════════════════════════════════════════════════════════
   ZEBITE — TERMS OF SERVICE
   ══════════════════════════════════════════════════════════════════════════ */

const ZEBITE_TERMS: LegalDoc = {
  slug: "zebite/terms",
  kind: "terms",
  app: "zebite",
  title: `${GROCERY.name} Terms of Service`,
  summary: `The agreement between you and ${STUDIO.name} for using ${GROCERY.name} — including what AI-generated meal plans are and aren't.`,
  effective: LEGAL_EFFECTIVE,
  updated: LEGAL_UPDATED,
  tldr: [
    "Use the app for your own meal planning. Don't attack it, resell it, or automate against it.",
    "Meal plans, recipes, macros, budgets and scan results are AI estimates. They can be wrong.",
    "Check allergens yourself, every time. Do not rely on the app for that.",
    "This is not medical, dietary or nutritional advice.",
    "Community prices come from other users. Treat them as a guide, not a quote.",
    "Your content stays yours. You can leave and take it with you.",
  ],
  sections: [
    {
      id: "agreement",
      heading: "This agreement",
      blocks: [
        {
          type: "p",
          text: `These terms are the agreement between you and ${STUDIO.name}, an independent studio operated by ${OPERATOR}, for your use of the ${GROCERY.name} mobile app. By creating an account or using the app, you accept them. If you do not accept them, do not use the app.`,
        },
        {
          type: "p",
          text: `Our Privacy Policy explains what happens to your information and forms part of this agreement.`,
        },
      ],
    },
    {
      id: "eligibility",
      heading: "Eligibility and your account",
      blocks: [
        {
          type: "list",
          items: [
            "You must be at least 13 years old to use the app, and under 18 only with a parent or guardian's involvement.",
            "You need an account. Give accurate information when you create it — the app calculates your targets from what you enter, so wrong details produce wrong plans.",
            "Keep your password to yourself. You are responsible for what happens under your account. Tell us at once if you think someone else has access.",
            "One account per person. Don't create accounts to get around usage limits.",
          ],
        },
      ],
    },
    {
      id: "licence",
      heading: "Your licence to use the app",
      blocks: [
        {
          type: "p",
          text: `We grant you a personal, non-exclusive, non-transferable, revocable licence to install and use ${GROCERY.name} on devices you own or control, for your own household's meal planning. The app itself — its code, design, mascot and brand — remains ours.`,
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "What you may not do",
      blocks: [
        {
          type: "list",
          items: [
            "Don't try to bypass, inflate or resell the AI usage limits, or automate requests to the app's backend.",
            "Don't scrape, bulk-export or resell the community price pool. It exists so people can budget, not as a dataset.",
            "Don't submit prices you know to be false, or otherwise pollute shared data.",
            "Don't reverse-engineer, decompile or modify the app to reach our backend in ways the app doesn't, or to access anyone else's data.",
            "Don't use the app to break the law, infringe someone's rights, or upload content you have no right to.",
            "Don't probe, load-test or attack our infrastructure. Responsible security reports are welcome by email instead.",
          ],
        },
        {
          type: "p",
          text: `We may suspend or close an account that does these things, usually after a warning, immediately if the abuse is serious.`,
        },
      ],
    },
    {
      id: "ai-disclaimer",
      heading: "AI output is an estimate",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} uses an AI model to generate meal plans and recipes and to read your photos. Everything it produces — ingredient lists, quantities, cooking instructions, calories and macros, prices, budget notes, and the items a scan pulls off a receipt or a shelf — is a generated estimate. It can be inaccurate, incomplete, or simply wrong.`,
        },
        {
          type: "p",
          text: `Read what it gives you before you act on it. Check quantities before you shop, check instructions before you cook, and check what a scan added to your pantry before you rely on it. Nutrition numbers are approximations, not laboratory values.`,
        },
        {
          type: "p",
          text: `Allergies are the case where this matters most. The app takes the allergies you enter into account when generating plans, but an AI model can miss a hidden ingredient, a cross-contamination risk, or an unfamiliar name for something you react to. Always verify ingredients yourself against the actual product label. Do not use ${GROCERY.name} as an allergy safeguard.`,
        },
      ],
    },
    {
      id: "not-advice",
      heading: "Not medical or nutritional advice",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} is a planning and budgeting tool, not a healthcare service. Its calorie and macro targets come from standard population formulas applied to what you entered; they are not a prescription, and they are not personalised to your medical history.`,
        },
        {
          type: "p",
          text: `Nothing in the app is medical, dietary or nutritional advice, and using it does not create any professional relationship. If you are pregnant, managing a medical condition such as diabetes or kidney disease, recovering from an eating disorder, taking medication affected by diet, or making a significant change to how you eat, talk to a doctor or a registered dietitian. Their advice overrides anything the app says.`,
        },
      ],
    },
    {
      id: "community-prices",
      heading: "Community prices",
      blocks: [
        {
          type: "p",
          text: `Prices in the community pool are observations submitted by other users, not offers, quotes or guarantees. They may be out of date, mistyped, from a different branch, or wrong. Prices change; treat the pool as a guide when budgeting and expect the till to disagree.`,
        },
        {
          type: "p",
          text: `Sharing is opt-in. If you turn it on, you confirm that the prices you submit are ones you actually observed, and you grant ${STUDIO.name} a non-exclusive, royalty-free licence to store them and show them anonymously to other users. You can stop contributing, and delete your contributions, at any time.`,
        },
      ],
    },
    {
      id: "your-content",
      heading: "Your content stays yours",
      blocks: [
        {
          type: "p",
          text: `Your profile, pantry, plans, lists and history belong to you. You grant us only the permission we need to run the service for you: to store your content, sync it between your devices, and process it to generate what you asked for. Nothing more — we do not use your content to build products, train models, or market to anyone.`,
        },
        {
          type: "p",
          text: `You can ask for an export or a deletion at any time, as described in the Privacy Policy.`,
        },
      ],
    },
    {
      id: "payments",
      heading: "Payments and subscriptions",
      blocks: [
        {
          type: "p",
          text: `${GROCERY.name} is currently free. There is no paid tier on sale, we take no payments, and we never see or store card details.`,
        },
        {
          type: "p",
          text: `If we introduce a paid tier later, it will be sold through the Apple App Store or Google Play, billed by them, and subject to their payment, renewal, cancellation and refund policies as well as these terms. We will publish the pricing and the changes to this section before that happens, and nothing you have today will start costing money without notice.`,
        },
      ],
    },
    {
      id: "availability",
      heading: "Availability and changes to the app",
      blocks: [
        {
          type: "p",
          text: `We do not promise the app will be available uninterrupted. It depends on services we do not run, and it can go down for maintenance, provider outages, or reasons outside our control. AI features have daily usage limits, and those limits can change.`,
        },
        {
          type: "p",
          text: `We may add, change or remove features. We build small on purpose and cut things that feel bloated, so features do sometimes go away. Your local data stays on your device regardless.`,
        },
      ],
    },
    {
      id: "warranties-liability",
      heading: "Warranties and liability",
      blocks: [
        {
          type: "p",
          text: `The app is provided "as is" and "as available". To the fullest extent allowed by Philippine law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement, and we do not warrant that the app will be error-free, uninterrupted, or that its output will be accurate.`,
        },
        {
          type: "p",
          text: `To the fullest extent allowed by law, ${STUDIO.name} and ${OPERATOR} are not liable for indirect, incidental, special or consequential damages, or for lost data, lost savings or wasted expenditure, arising from your use of the app. Where liability cannot be excluded, it is limited to the greater of the amount you paid us in the preceding twelve months or PHP 5,000.`,
        },
        {
          type: "p",
          text: `Nothing here limits liability for fraud, for wilful misconduct or gross negligence, or for anything else that Philippine law does not permit us to exclude — including your rights as a consumer.`,
        },
      ],
    },
    {
      id: "termination",
      heading: "Ending this agreement",
      blocks: [
        {
          type: "p",
          text: `You can stop at any time: uninstall the app, and email us to delete your account. We may suspend or terminate access if you materially breach these terms, or if we discontinue the app — in which case we will give reasonable notice and time to export your data.`,
        },
      ],
    },
    changesSection("these terms"),
    {
      id: "governing-law",
      heading: "Governing law",
      blocks: [
        {
          type: "p",
          text: `These terms are governed by the laws of ${JURISDICTION}, without regard to conflict-of-law rules. Any dispute that cannot be resolved by talking to us first will be brought before the courts of the Philippines.`,
        },
        {
          type: "p",
          text: `Please email us before anything formal. We are two people and we would much rather fix a problem than argue about one.`,
        },
      ],
    },
    contactSection(`${GROCERY.name} terms`),
  ],
};

/* ══════════════════════════════════════════════════════════════════════════
   REPFORGE — PRIVACY POLICY

   RepForge makes no network calls. supabase_flutter is listed in pubspec.yaml
   but never imported in lib/; the auth screens are unreachable (splash routes
   straight to /home) and back onto MockAuthRepository; and the Android
   manifest declares no uses-permission at all, not even INTERNET.
   If any of that changes, this document must change first.
   ══════════════════════════════════════════════════════════════════════════ */

const REPFORGE_PRIVACY: LegalDoc = {
  slug: "repforge/privacy",
  kind: "privacy",
  app: "repforge",
  title: `${FORGE.name} Privacy Policy`,
  summary: `${FORGE.name} collects nothing. Everything you log stays on your device.`,
  effective: LEGAL_EFFECTIVE,
  updated: LEGAL_UPDATED,
  tldr: [
    "We collect nothing. Not your workouts, not your bodyweight, not your email.",
    "There is no account and no sign-in. There is nothing to sign in to.",
    "Your training data never leaves your device. We have no server holding it.",
    "No analytics, no ads, no trackers, no crash reporting SDK.",
    "The Android app you install requests no permissions at all — not even internet access.",
    "Uninstalling the app deletes everything. We hold nothing to delete for you.",
  ],
  sections: [
    {
      id: "short-version",
      heading: "The whole policy in one paragraph",
      blocks: [
        {
          type: "p",
          text: `${FORGE.name} is an offline app. Everything you enter — your programs, your logged sets, your bodyweight, your records — is written to a database on your phone and stays there. The app makes no network requests, has no backend, and sends nothing anywhere. We could not see your training data if we tried, because it never reaches us.`,
        },
        {
          type: "p",
          text: `The rest of this page explains what that means precisely, and names the two things that are genuinely outside our control so you know about them.`,
        },
      ],
    },
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${FORGE.name} is made by ${STUDIO.name}, an independent studio operated by ${OPERATOR}. This policy covers the ${FORGE.name} mobile app on iOS and Android. The ${STUDIO.name} website and ${GROCERY.name} are covered by their own separate documents — ${GROCERY.name} is a different app that does use an account and a server, and nothing in its policy applies here.`,
        },
      ],
    },
    {
      id: "on-device",
      heading: "What the app stores on your device",
      blocks: [
        {
          type: "p",
          text: `All of this is stored in a local database in the app's private storage, which other apps on your phone cannot read:`,
        },
        {
          type: "list",
          items: [
            "Your lifter profile — display name, bio, an optional profile picture, height, bodyweight and your preferred unit, and any one-rep maxes you enter by hand.",
            "The programs you follow or build, their weeks, days, planned exercises and planned sets.",
            "Every workout you log — exercise, weight, reps, RPE, session duration, and when you did it.",
            "Everything derived from that: history, training volume, estimated one-rep maxes, personal records, your strength-level grade and your streak.",
          ],
        },
        {
          type: "p",
          text: `You entered all of it, you can edit or delete all of it in the app, and none of it is transmitted.`,
        },
      ],
    },
    {
      id: "what-we-dont-do",
      heading: "What the app does not do",
      blocks: [
        {
          type: "list",
          items: [
            "No account, no sign-up, no email address, no password. You open the app and train.",
            "No servers of ours. There is no backend to sync to, so there is nothing of yours on any machine we operate.",
            "No analytics, and no telemetry of any kind. No Firebase, no Google Analytics, no event tracking, no usage statistics.",
            "No advertising, no ad SDK, no advertising identifier, no attribution tracking.",
            "No crash-reporting SDK. We do not receive automatic crash reports from your device.",
            "No location, camera, microphone, contacts or health-app access.",
            // Release builds merge only main/AndroidManifest.xml, which declares
            // no uses-permission at all. (INTERNET appears in the debug and
            // profile manifests — Flutter's defaults for hot reload — and those
            // builds are never published, hence "released" here.)
            "The released Android app declares no permissions whatsoever — including no internet permission, which the Android system enforces. It is not able to make a network request.",
          ],
        },
      ],
    },
    {
      id: "outside-our-control",
      heading: "Two things outside our control",
      blocks: [
        {
          type: "p",
          text: `These are not us collecting anything, but they are honest caveats worth knowing:`,
        },
        {
          type: "p",
          text: `Device backups. If you have Android Auto Backup or iCloud backup switched on, your phone may copy the app's data into your own cloud account as part of a normal device backup. That copy belongs to you and lives in your Google or Apple account under their privacy policies, not ours. We have no access to it. You can exclude it by turning off backup for the app in your system settings.`,
        },
        {
          type: "p",
          text: `App stores. Apple and Google collect their own information about downloads, updates, device type and crashes, under their own policies, whether or not the app does anything. That happens between you and the store, and we see only aggregate, anonymous figures such as install counts.`,
        },
      ],
    },
    {
      id: "deleting",
      heading: "Deleting your data",
      blocks: [
        {
          type: "p",
          text: `Delete individual workouts, programs or profile details in the app. To remove everything, clear the app's data in your system settings, or uninstall the app — that erases the local database completely.`,
        },
        {
          type: "p",
          text: `There is nothing for us to delete on your behalf, and no account to close. It also means we cannot recover your training history if you lose or reset your phone. If your log matters to you, keep your own backup.`,
        },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: `${FORGE.name} is intended for people who lift, and heavy barbell training is not appropriate for young children. The app is not directed at children under 13. Since it collects no information at all, there is no children's data for us to hold.`,
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: `Under the Data Privacy Act of 2012 (Republic Act No. 10173) you have rights of access, correction, erasure, objection and portability over personal data an organisation holds about you. We hold none, so in practice there is nothing for you to request from us — your data is already entirely in your hands, on your device.`,
        },
        {
          type: "p",
          text: `If you believe otherwise, or want to check something in this document, email ${EMAIL} and we will answer.`,
        },
      ],
    },
    {
      id: "if-this-changes",
      heading: "If this ever changes",
      blocks: [
        {
          type: "p",
          text: `Optional cloud backup is something people ask for, and we may build it. If we do, three things are promised here: this policy will be updated and dated before the feature ships, the feature will be opt-in, and nothing will leave your device until you switch it on yourself.`,
        },
        {
          type: "p",
          text: `An app update will never quietly start collecting data that a previous version did not.`,
        },
      ],
    },
    contactSection(`${FORGE.name} privacy`),
  ],
};

/* ══════════════════════════════════════════════════════════════════════════
   REPFORGE — TERMS OF SERVICE
   ══════════════════════════════════════════════════════════════════════════ */

const REPFORGE_TERMS: LegalDoc = {
  slug: "repforge/terms",
  kind: "terms",
  app: "repforge",
  title: `${FORGE.name} Terms of Service`,
  summary: `The agreement between you and ${STUDIO.name} for using ${FORGE.name} — including the training-safety terms that matter most.`,
  effective: LEGAL_EFFECTIVE,
  updated: LEGAL_UPDATED,
  tldr: [
    "Use the app to train. Don't resell it or pull it apart.",
    "Lifting heavy carries real injury risk, and you accept that risk yourself.",
    "The built-in programs are general templates, not coaching written for you.",
    "Strength grades and estimated one-rep maxes are formulas, not measurements.",
    "Your data is on your device only. We cannot recover it if you lose your phone.",
  ],
  sections: [
    {
      id: "agreement",
      heading: "This agreement",
      blocks: [
        {
          type: "p",
          text: `These terms are the agreement between you and ${STUDIO.name}, an independent studio operated by ${OPERATOR}, for your use of the ${FORGE.name} mobile app. By installing or using the app, you accept them. If you do not accept them, do not use the app.`,
        },
        {
          type: "p",
          text: `${FORGE.name} needs no account, so there is nothing to sign up for and nothing for us to close. Our Privacy Policy — the short version of which is that we collect nothing — forms part of this agreement.`,
        },
      ],
    },
    {
      id: "licence",
      heading: "Your licence to use the app",
      blocks: [
        {
          type: "p",
          text: `We grant you a personal, non-exclusive, non-transferable, revocable licence to install and use ${FORGE.name} on devices you own or control, for your own training. The app itself — its code, design, program templates, mascot and brand — remains ours.`,
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "What you may not do",
      blocks: [
        {
          type: "list",
          items: [
            "Don't resell, sublicense or redistribute the app or its program content.",
            "Don't reverse-engineer, decompile or modify the app, except where law expressly allows it.",
            "Don't remove or obscure our branding and pass the app off as your own.",
            "Don't use the app to coach clients commercially as a substitute for your own qualified programming.",
          ],
        },
      ],
    },
    {
      id: "health-safety",
      heading: "Training safety — read this one",
      blocks: [
        {
          type: "p",
          text: `Powerlifting carries a real risk of injury. Squatting, benching and deadlifting near your limit can cause strains, tears, disc injuries, joint damage and worse, and no app can see your form, your fatigue, or the day you should have stopped a set early.`,
        },
        {
          type: "p",
          text: `The programs included in ${FORGE.name} — including ${FORGE.name}'s own templates such as Forge Linear, Forge Strength and Forge Peak — are general strength templates. They are not personalised coaching, they were not written for your body, your injury history or your schedule, and nobody reviews your training when you use them. They are a starting structure you are expected to apply with judgement.`,
        },
        {
          type: "p",
          text: `Nothing in the app is medical advice. Talk to a doctor before starting or significantly changing a training programme, especially if you have an injury, a heart or joint condition, are pregnant, or have been away from training for a long time. Stop and get help if something hurts in a way that is not ordinary training fatigue.`,
        },
        {
          type: "p",
          text: `You train at your own risk, and you are responsible for the loads you choose, your technique, your equipment, your warm-up and your decision to attempt any lift. To the fullest extent allowed by law, ${STUDIO.name} and ${OPERATOR} accept no liability for injury arising from your training. Use spotters and safety pins when you train heavy.`,
        },
      ],
    },
    {
      id: "estimates",
      heading: "Numbers the app calculates",
      blocks: [
        {
          type: "p",
          text: `Estimated one-rep maxes are calculated from your logged sets with a standard formula. They are arithmetic, not a tested max, and they get less reliable as reps go up. Do not walk up to a bar loaded to an estimate and assume it will move.`,
        },
        {
          type: "p",
          text: `Strength-level grades compare your lifts against published bodyweight standards. They are a rough reference point for context, not a certification, a ranking, or a judgement about you as a lifter.`,
        },
        {
          type: "p",
          text: `Volume, streak and progress figures are computed from what you logged. If your log is incomplete, so are they.`,
        },
      ],
    },
    {
      id: "your-data",
      heading: "Your data is local, and irreplaceable",
      blocks: [
        {
          type: "p",
          text: `Everything you log stays on your device. That is the design, and it is why the app needs no account. The trade-off is that ${FORGE.name} is not a backup service: if you lose your phone, reset it, or uninstall the app, your training history is gone and we cannot restore it, because we never had a copy.`,
        },
        {
          type: "p",
          text: `Your device's own backup (iCloud or Android Auto Backup) may include the app's data if you have it switched on. If your log matters to you, check that it does.`,
        },
      ],
    },
    {
      id: "availability",
      heading: "Changes to the app",
      blocks: [
        {
          type: "p",
          text: `We may add, change or remove features, and we may stop publishing the app. Because it works offline, a version you have already installed keeps working on your device regardless. We will give reasonable notice before discontinuing it.`,
        },
      ],
    },
    {
      id: "warranties-liability",
      heading: "Warranties and liability",
      blocks: [
        {
          type: "p",
          text: `The app is provided "as is" and "as available". To the fullest extent allowed by Philippine law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement, and we do not warrant that the app will be error-free or that its calculations will be accurate.`,
        },
        {
          type: "p",
          text: `To the fullest extent allowed by law, ${STUDIO.name} and ${OPERATOR} are not liable for indirect, incidental, special or consequential damages, or for lost training data, arising from your use of the app. Where liability cannot be excluded, it is limited to the greater of the amount you paid us in the preceding twelve months or PHP 5,000.`,
        },
        {
          type: "p",
          text: `Nothing here limits liability for fraud, for wilful misconduct or gross negligence, or for anything else Philippine law does not permit us to exclude — including your rights as a consumer.`,
        },
      ],
    },
    changesSection("these terms"),
    {
      id: "governing-law",
      heading: "Governing law",
      blocks: [
        {
          type: "p",
          text: `These terms are governed by the laws of ${JURISDICTION}, without regard to conflict-of-law rules. Any dispute that cannot be resolved by talking to us first will be brought before the courts of the Philippines.`,
        },
      ],
    },
    contactSection(`${FORGE.name} terms`),
  ],
};

/* ══════════════════════════════════════════════════════════════════════════
   WEBSITE — PRIVACY NOTICE

   Covers zhevion.com itself. Both forms POST to Web3Forms
   (components/sections/Contact.tsx, ClosingCTA.tsx). The analytics slot in
   app/layout.tsx is empty — if a snippet is ever dropped in there, the
   "no analytics" section below must be rewritten in the same commit.
   ══════════════════════════════════════════════════════════════════════════ */

const WEBSITE_PRIVACY: LegalDoc = {
  slug: "website",
  kind: "privacy",
  app: "website",
  title: "Website Privacy Notice",
  summary: `What happens to your information on the ${STUDIO.name} website — which is very little.`,
  effective: LEGAL_EFFECTIVE,
  updated: LEGAL_UPDATED,
  tldr: [
    "No cookies. No analytics. No tracking pixels. Nothing follows you off this site.",
    "You are only in our records if you emailed us or typed your address into a form.",
    "Form submissions reach our inbox through a form relay, and go nowhere else.",
    "Ask us to delete your address and we will.",
  ],
  sections: [
    {
      id: "scope",
      heading: "What this covers",
      blocks: [
        {
          type: "p",
          text: `This notice covers the ${STUDIO.name} website at zhevion.com. The ${GROCERY.name} and ${FORGE.name} mobile apps are separate and each has its own policy, linked from the legal index.`,
        },
      ],
    },
    {
      id: "no-tracking",
      heading: "No cookies, no analytics",
      blocks: [
        {
          type: "p",
          text: `This site sets no cookies, runs no analytics, and embeds no tracking pixels, session recorders or social widgets. There is no consent banner because there is nothing to consent to. Browsing the site leaves no profile of you with us.`,
        },
        {
          type: "p",
          text: `If we add privacy-respecting analytics later, we will update this notice and say what it measures before switching it on.`,
        },
      ],
    },
    {
      id: "forms",
      heading: "The contact form and the launch list",
      blocks: [
        {
          type: "p",
          text: `Two forms on this site send us something. The contact form sends your name, your email address and your message. The launch-notify signup sends your email address only.`,
        },
        {
          type: "p",
          text: `Both are delivered by Web3Forms, a form-relay service that forwards the submission to our email inbox. It passes through their systems on the way; it is not stored in a database of ours, because we do not run one for this site. We use what you send to reply to you, and — if you joined the launch list — to email you when the apps are released.`,
        },
        {
          type: "p",
          text: `We do not add you to any other list, and we do not pass your address to anyone else. Every launch email will have a way to unsubscribe, and you can also just reply and ask.`,
        },
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      blocks: [
        {
          type: "p",
          text: `Contact messages stay in our email inbox while the conversation is useful, and we clear out old ones periodically. Launch-list addresses are kept until the apps launch and you have been told, or until you ask to be removed — whichever comes first.`,
        },
        {
          type: "p",
          text: `To be removed at any time, email ${EMAIL} and say so. There is no form to fill in and no waiting period beyond the time it takes us to read it.`,
        },
      ],
    },
    {
      id: "hosting",
      heading: "Hosting and links out",
      blocks: [
        {
          type: "p",
          text: `Like any website, the server that delivers these pages processes standard request information — your IP address, the page requested, and a timestamp — to serve the page and to keep the service secure. We do not combine that with anything else or use it to identify you.`,
        },
        {
          type: "p",
          text: `This site links out to LinkedIn, GitHub, the app stores and our own personal pages. Once you follow a link you are on someone else's site under their privacy policy, not ours.`,
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: `Under the Data Privacy Act of 2012 (Republic Act No. 10173) you can ask what we hold about you, have it corrected, or have it deleted. Given the above, the answer is usually "your email address and whatever you wrote to us". Email ${EMAIL} and we will respond within 30 days.`,
        },
      ],
    },
    changesSection("this notice"),
    contactSection("Website privacy"),
  ],
};

/** Every document, keyed for direct import by its route. */
export const LEGAL_DOCS = {
  zebitePrivacy: ZEBITE_PRIVACY,
  zebiteTerms: ZEBITE_TERMS,
  repforgePrivacy: REPFORGE_PRIVACY,
  repforgeTerms: REPFORGE_TERMS,
  websitePrivacy: WEBSITE_PRIVACY,
} satisfies Record<string, LegalDoc>;

/**
 * Hub listing (/legal). Ordered app-first, since the store and OAuth consoles
 * are what send people here.
 */
export const LEGAL_INDEX: {
  app: LegalApp;
  label: string;
  note: string;
  docs: { href: string; title: string; blurb: string }[];
}[] = [
  {
    app: "zebite",
    label: GROCERY.name,
    note: "Grocery, meal planning and pantry — uses an account, cloud sync and AI.",
    docs: [
      {
        href: "/legal/zebite/privacy",
        title: "Privacy Policy",
        blurb: "What we collect, what reaches the AI, and how to delete it all.",
      },
      {
        href: "/legal/zebite/terms",
        title: "Terms of Service",
        blurb: "Your licence, and what AI-generated plans are and aren't.",
      },
    ],
  },
  {
    app: "repforge",
    label: FORGE.name,
    note: "Powerlifting programs and logging — fully offline, no account, no servers.",
    docs: [
      {
        href: "/legal/repforge/privacy",
        title: "Privacy Policy",
        blurb: "Short version: we collect nothing. It never leaves your device.",
      },
      {
        href: "/legal/repforge/terms",
        title: "Terms of Service",
        blurb: "Your licence, and the training-safety terms that matter.",
      },
    ],
  },
  {
    app: "website",
    label: "This website",
    note: "zhevion.com itself — no cookies, no analytics.",
    docs: [
      {
        href: "/legal/website",
        title: "Privacy Notice",
        blurb: "What happens to a contact form or launch-list signup.",
      },
    ],
  },
];
