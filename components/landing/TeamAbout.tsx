import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { STUDIO_HOME, TEAM } from "@/lib/content";

type TeamMember = (typeof TEAM)[number];

/**
 * Team — and, since this section absorbed it, the only "about" the page needs.
 *
 * There used to be a separate AboutSection directly below this one. It restated
 * the three STUDIO_SERVICES blocks as a six-item capabilities grid and repeated
 * the hero's positioning, so the page explained the studio three times over.
 * Its one genuinely new idea — that Zhevion builds both software for businesses
 * and products of its own — now lives in STUDIO_HOME.team.body, and this
 * section carries the `#about` anchor so the nav and footer links still land
 * somewhere real.
 */
export function TeamSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-ink/10 bg-paper-deep py-[clamp(76px,10vw,136px)]"
      aria-labelledby="team-heading"
    >
      <div className="shell">
        <header className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <p className="text-sm font-semibold text-ink-soft">{STUDIO_HOME.team.eyebrow}</p>
          <div>
            <h2
              id="team-heading"
              className="max-w-[17ch] text-[clamp(2.35rem,4.7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em]"
            >
              {STUDIO_HOME.team.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              {STUDIO_HOME.team.body}
            </p>
          </div>
        </header>

        <ul className="mt-[clamp(48px,7vw,80px)] grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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

/**
 * One person. The role sits in the text block rather than as a translucent chip
 * floating on the photo — the chip was the page's only piece of glassmorphism,
 * and a role reads better as a label than as a sticker.
 */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/4.6] overflow-hidden rounded-card border border-ink/10 bg-ink">
        {member.src ? (
          <Image
            src={member.src}
            alt={member.alt}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          // No photo for this person yet. A large initial is an honest
          // placeholder; a stock portrait would not be.
          <div className="studio-grid-lines flex h-full items-end p-6 text-paper sm:p-8">
            <span
              className="text-[clamp(7rem,18vw,13rem)] font-extrabold leading-[0.72] tracking-[-0.09em] text-paper/90"
              aria-hidden
            >
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-ink/15 pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-extrabold tracking-[-0.035em] sm:text-2xl">{member.name}</h3>
          {member.href ? (
            <a
              href={member.href}
              target="_blank"
              rel="noreferrer"
              className="text-link shrink-0 text-sm font-bold"
            >
              Portfolio
            </a>
          ) : null}
        </div>
        <p className="mt-1.5 text-sm font-semibold text-ink-soft">{member.role}</p>
        <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{member.body}</p>
      </div>
    </article>
  );
}
