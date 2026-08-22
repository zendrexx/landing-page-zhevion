"use client";

import { motion, useReducedMotion } from "motion/react";
import { GROCERY, FORGE, PROJECTS } from "@/lib/content";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { trackCTA } from "@/lib/analytics";

type Project = (typeof PROJECTS)[number];

// Alternating tilt per card position — the "popped up" read from the
// reference, without needing a real pin.
const TILT = [-2, 2, -1.5] as const;

/**
 * One story card. Zebite/RepForge draw their screenshot from GROCERY/FORGE;
 * Guanzon (`placeholder: true`) has no screenshot yet, so it renders a plain
 * wordmark card instead of a fabricated device mockup — same HONESTY RULE
 * lib/content.ts already holds every other feature claim to.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const tilt = TILT[index % TILT.length];
  const source = project.key === "zebite" ? GROCERY : project.key === "repforge" ? FORGE : null;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: 0 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={
        reduce
          ? { duration: 0.4 }
          : { duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }
      }
      className="flex flex-col rounded-card border border-white/10 bg-graphite-800 p-6"
    >
      {source ? (
        <div className="mx-auto">
          <DeviceFrame
            src={source.screens[0].src}
            alt={source.screens[0].alt}
            imgWidth={source.screenSize.w}
            imgHeight={source.screenSize.h}
            width={148}
            chrome={source.screenChrome}
            bandIncluded={source.screenBandIncluded}
          />
        </div>
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-[14px] border border-dashed border-white/15 bg-white/[0.03]">
          <span className="text-2xl font-extrabold tracking-tightest text-cream/70">
            {project.name}
          </span>
        </div>
      )}

      <div className="mt-6">
        <span className="eyebrow text-volt-soft">{project.kind}</span>
        <h3 className="mt-2 text-lg font-bold text-cream">{project.name}</h3>
        <p className="mt-1.5 text-sm text-cream/70">{project.summary}</p>
      </div>

      {project.ctaLabel && project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackCTA(`work-${project.key}`)}
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-cream underline underline-offset-4"
        >
          {project.ctaLabel} <span aria-hidden>→</span>
        </a>
      ) : null}
    </motion.div>
  );
}
