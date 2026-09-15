"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HomeProjectMontage } from "@/components/landing/HomeProjectMontage";
import { HomeProjectVisual } from "@/components/landing/HomeProjectVisual";
import { HOME_PROJECTS, type HomeProject } from "@/lib/home-projects";

const headline = [
  { text: "We build software", muted: false },
  { text: "that moves businesses", muted: false },
  { text: "forward.", muted: true },
] as const;

export function HomeHero() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const selectedProject = selectedIndex === null ? null : HOME_PROJECTS[selectedIndex]!;

  const closeDrawer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeDrawer, selectedProject]);

  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflowRef.current;
    },
    [],
  );

  const openDrawer = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const keepFocusInDrawer = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !drawerRef.current) return;

    const focusable = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section className="zv-hero" aria-labelledby="zv-hero-heading">
      <div className="zv-container">
        <motion.h1
          id="zv-hero-heading"
          className="zv-hero-heading"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.11, delayChildren: 0.12 },
            },
          }}
        >
          {headline.map((line) => (
            <span className="zv-hero-line" key={line.text}>
              <motion.span
                className={line.muted ? "is-muted" : undefined}
                variants={{
                  hidden: { opacity: 0, y: "1ch" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: reduceMotion ? 0 : 0.5,
                      ease: [0.2, 1, 0.2, 1],
                    },
                  },
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="zv-hero-projects"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.62,
            ease: [0.2, 1, 0.2, 1],
          }}
        >
          <div className="zv-hero-tabs" aria-label="Featured projects">
            {HOME_PROJECTS.map((project, index) => (
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open ${project.name} project preview`}
                key={project.key}
                className="zv-hero-tab"
                onClick={(event) => openDrawer(index, event.currentTarget)}
              >
                <span className="zv-hero-thumb">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="96px"
                    className={
                      project.key === "zebite" || project.key === "repforge"
                        ? "object-cover object-top"
                        : "object-cover"
                    }
                  />
                </span>
                <span className="zv-hero-tab-copy">
                  <span>
                    <strong>{project.name}.</strong> {project.teaser}
                  </span>
                  <small>{project.category}</small>
                </span>
              </button>
            ))}
          </div>

          <HomeProjectMontage />
        </motion.div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = previousOverflowRef.current;
          triggerRef.current?.focus();
        }}
      >
        {selectedProject ? (
          <motion.div
            className="zv-project-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDrawer();
            }}
          >
            <motion.aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`zv-drawer-title-${selectedProject.key}`}
              data-lenis-prevent
              className="zv-project-drawer"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: [0.2, 1, 0.2, 1] }}
              onKeyDown={keepFocusInDrawer}
            >
              <ProjectDrawerContent
                project={selectedProject}
                closeButtonRef={closeButtonRef}
                onClose={closeDrawer}
              />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ProjectDrawerContent({
  project,
  closeButtonRef,
  onClose,
}: {
  project: HomeProject;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <>
      <header className="zv-project-drawer-header">
        <a
          href={project.href}
          target={project.external ? "_blank" : undefined}
          rel={project.external ? "noreferrer" : undefined}
        >
          <span aria-hidden>↗</span> Expand
        </a>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project preview">
          ×
        </button>
      </header>

      <div className="zv-project-drawer-body">
        <div className="zv-project-drawer-visual">
          <HomeProjectVisual project={project} priority />
        </div>

        <div className="zv-project-drawer-copy">
          <h2 id={`zv-drawer-title-${project.key}`}>
            <span>{project.name}.</span>
            {project.headline}
          </h2>
          <p className="zv-project-drawer-category">{project.category}</p>

          <section className="zv-project-drawer-details" aria-label={`${project.name} details`}>
            <p>Project details</p>
            <dl>
              {project.facts.map((fact) => (
                <div key={`${project.key}-${fact.label}-${fact.value}`}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <a
            href={project.href}
            target={project.external ? "_blank" : undefined}
            rel={project.external ? "noreferrer" : undefined}
            className="zv-project-drawer-cta"
          >
            View full project <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
