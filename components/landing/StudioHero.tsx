import Image from "next/image";
import { HeroWordCycle } from "@/components/landing/HeroWordCycle";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY, GUANZON_PROJECT, HERO_WORK_INDEX, STUDIO_HOME } from "@/lib/content";

/**
 * The first screen.
 *
 * Typography carries it and the index below carries the proof. There is
 * deliberately no image here: the Guanzon capture starts at full width a few
 * hundred pixels down, and floating product shots above it only delayed the
 * strongest evidence behind a decorative one. It also makes the LCP a text
 * node instead of two device frames.
 */
export function StudioHero() {
  return (
    <section className="studio-hero relative" aria-labelledby="studio-hero-heading">
      <div className="shell">
        <div className="studio-hero-intro">
          <div>
            <p className="studio-hero-eyebrow">{STUDIO_HOME.hero.eyebrow}</p>
            <h1 id="studio-hero-heading" className="studio-hero-heading">
              <span className="studio-hero-line">We build software</span>{" "}
              <span className="studio-hero-line">that moves</span>{" "}
              <span className="studio-hero-line">
                businesses{" "}
                <HeroWordCycle words={STUDIO_HOME.hero.words} className="text-forest-500" />
              </span>
            </h1>
          </div>

          <div className="studio-hero-copy">
            <p className="studio-hero-description">{STUDIO_HOME.hero.body}</p>
            <div className="studio-hero-actions">
              <a href="#contact" className="studio-hero-primary">
                Start a project
                <span aria-hidden>↘</span>
              </a>
              <a href="#work" className="studio-hero-secondary">
                View our work
              </a>
            </div>
          </div>
        </div>

        <HeroWorkIndex />
      </div>
    </section>
  );
}

/**
 * A contents strip with a preview, not a gallery.
 *
 * Each row jumps to that project's case study, so the first screen answers
 * "can they build what my business needs?" and gives the visitor somewhere to
 * go. Hovering or tab-focusing a row swaps the panel beside it.
 *
 * The swap is pure CSS (`:has()` on the wrapper). No JS, no state, and if a
 * browser lacks `:has()` the panel simply stays on the default rather than
 * breaking. Focus is included alongside hover so keyboard users get the same
 * information, and the panel is hidden below lg where hover does not exist.
 *
 * The three previews preserve the products' native shapes. Guanzon is fitted
 * as a complete desktop window; Zebite and RepForge use paired, complete phone
 * screens. Nothing is cropped simply to make unlike products fill one box.
 */
function HeroWorkIndex() {
  return (
    <div className="hero-index-shell mt-[clamp(52px,7vw,88px)] border-t border-ink/20 pt-2">
      <nav aria-label="Selected work">
        <ul>
          {HERO_WORK_INDEX.map((item, i) => (
            <li key={item.name}>
              <a href={item.href} data-i={i + 1} className="hero-index-row group">
                <span className="hero-index-num text-sm font-bold tabular-nums text-ink-faint">
                  {item.number}
                </span>

                <span className="hero-index-name text-xl font-extrabold tracking-[-0.035em] text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-ink sm:text-2xl">
                  {item.name}
                </span>

                <span className="hero-index-line text-sm leading-[1.6] text-ink-soft sm:text-base">
                  {item.line}
                </span>

                <span className="hero-index-tag whitespace-nowrap text-sm font-semibold text-ink-faint">{item.tag}</span>

                <span
                  aria-hidden
                  className="hero-index-arrow text-ink-faint transition group-hover:translate-x-1 group-hover:text-ink"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Decorative: every project here is named in the list beside it and
          shown properly in its own case study below, so a screen reader would
          only hear the same three things twice.

          The desktop and mobile work keep their native aspect ratios here.
          These are compact compositions, while the case studies below provide
          the larger, inspectable product views. */}
      <div className="hero-index-preview" aria-hidden>
        <div data-p="1" className="hero-preview-plate hero-preview-guanzon">
          <div className="hero-preview-desktop">
            <Image
              src={GUANZON_PROJECT.image}
              alt=""
              width={GUANZON_PROJECT.imageSize.w}
              height={GUANZON_PROJECT.imageSize.h}
              quality={90}
              sizes="360px"
              className="hero-preview-desktop-image"
            />
          </div>
        </div>

        <div data-p="2" className="hero-preview-plate hero-preview-phones hero-preview-zebite">
          <div className="hero-preview-device-pair">
            <DeviceFrame
              src={GROCERY.screens[0].src}
              alt=""
              imgWidth={GROCERY.screenSize.w}
              imgHeight={GROCERY.screenSize.h}
              width={102}
              chrome={GROCERY.screenChrome}
              bandIncluded={GROCERY.screenBandIncluded}
              sizes="132px"
              className="hero-preview-phone hero-preview-phone-back"
            />
            <DeviceFrame
              src={GROCERY.screens[3].src}
              alt=""
              imgWidth={GROCERY.screenSize.w}
              imgHeight={GROCERY.screenSize.h}
              width={102}
              chrome={GROCERY.screenChrome}
              bandIncluded={GROCERY.screenBandIncluded}
              sizes="132px"
              className="hero-preview-phone hero-preview-phone-front"
            />
          </div>
        </div>

        <div data-p="3" className="hero-preview-plate hero-preview-phones hero-preview-repforge">
          <div className="hero-preview-device-pair">
            <DeviceFrame
              src={FORGE.screens[0].src}
              alt=""
              imgWidth={FORGE.screenSize.w}
              imgHeight={FORGE.screenSize.h}
              width={102}
              chrome={FORGE.screenChrome}
              bandIncluded={FORGE.screenBandIncluded}
              sizes="132px"
              className="hero-preview-phone hero-preview-phone-back"
            />
            <DeviceFrame
              src={FORGE.screens[5].src}
              alt=""
              imgWidth={FORGE.screenSize.w}
              imgHeight={FORGE.screenSize.h}
              width={102}
              chrome={FORGE.screenChrome}
              bandIncluded={FORGE.screenBandIncluded}
              sizes="132px"
              className="hero-preview-phone hero-preview-phone-front"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
