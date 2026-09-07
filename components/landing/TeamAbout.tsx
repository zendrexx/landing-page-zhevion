import Image from "next/image";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { Reveal } from "@/components/ui/Reveal";
import { STUDIO_HOME, TEAM } from "@/lib/content";

type TeamMember = (typeof TEAM)[number];

export function TeamSection() {
  return (
    <section className="border-y border-ink/10 bg-paper-deep py-[clamp(84px,12vw,150px)]" aria-labelledby="team-heading">
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow text-ink-faint">{STUDIO_HOME.team.eyebrow}</p>
            <h2
              id="team-heading"
              className="mt-4 max-w-[12ch] text-[clamp(2.4rem,5vw,4.8rem)] font-extrabold leading-none tracking-[-0.055em]"
            >
              {STUDIO_HOME.team.heading}
            </h2>
          </div>
          <p className="max-w-lg text-base font-medium leading-[1.75] text-ink-soft sm:text-lg lg:justify-self-end">
            {STUDIO_HOME.team.body}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
          {TEAM.map((member, index) => (
            <Reveal as="li" key={member.name} delay={index * 70}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group h-full overflow-hidden rounded-[24px] border border-ink/10 bg-paper">
      <div className="relative aspect-[4/4.6] overflow-hidden bg-ink">
        {member.src ? (
          <Image
            src={member.src}
            alt={member.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="studio-grid-lines flex h-full items-end p-6 text-paper sm:p-8">
            <span className="text-[clamp(7rem,18vw,13rem)] font-extrabold leading-[0.72] tracking-[-0.09em] text-paper/90" aria-hidden>
              A
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-pill border border-white/15 bg-graphite-900/55 px-3 py-1.5 text-xs font-bold text-cream backdrop-blur-md">
          {member.role}
        </span>
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{member.name}</h3>
          {member.href ? (
            <a
              href={member.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${member.name}'s portfolio`}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 text-sm transition hover:bg-ink hover:text-paper"
            >
              ↗
            </a>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{member.body}</p>
      </div>
    </article>
  );
}

const CAPABILITIES = [
  "Business systems",
  "Mobile apps",
  "Websites",
  "Internal tools",
  "Automation",
  "Custom products",
] as const;

export function AboutSection() {
  return (
    <section id="about" className="dark-panel scroll-mt-24 py-[clamp(84px,12vw,160px)]" aria-labelledby="about-heading">
      <div className="shell">
        <Reveal className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <ZhevionMark size={34} />
              <p className="eyebrow text-lime">{STUDIO_HOME.about.eyebrow}</p>
            </div>
            <h2
              id="about-heading"
              className="mt-7 max-w-[13ch] text-[clamp(2.45rem,5.4vw,5.3rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
            >
              {STUDIO_HOME.about.heading}
            </h2>
          </div>

          <div className="flex flex-col justify-between gap-10">
            <p className="max-w-xl text-base font-medium leading-[1.8] text-cream/65 sm:text-lg">
              {STUDIO_HOME.about.body}
            </p>
            <ul className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025]">
              {CAPABILITIES.map((capability, index) => (
                <li
                  key={capability}
                  className={`min-h-24 border-white/10 p-4 text-sm font-bold leading-snug text-cream/80 sm:p-5 ${
                    index % 2 === 0 ? "border-r" : ""
                  } ${index < CAPABILITIES.length - 2 ? "border-b" : ""}`}
                >
                  <span className="mb-4 block h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
