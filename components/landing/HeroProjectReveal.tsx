"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY, GUANZON_PROJECT } from "@/lib/content";

const PROJECTS = [
  { name: "Guanzon GCAS", label: "Business system", note: "Inventory requests, approvals and stock workflows.", href: "/work/guanzon", tone: "paper" },
  { name: "Zebite", label: "Mobile product", note: "Pantry-first planning, budgets and meals.", href: "/work/zebite", tone: "green" },
  { name: "RepForge", label: "Mobile product", note: "Programs, training logs and progress.", href: "/work/repforge", tone: "ink" },
] as const;

export function HeroProjectReveal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const project = PROJECTS[active];

  return (
    <div className="hero-work-control">
      <button type="button" aria-expanded={open} aria-controls="hero-work-panel" onClick={() => setOpen(true)} className="hero-work-trigger">
        Selected work <span aria-hidden>↗</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside id="hero-work-panel" aria-label="Selected Zhevion projects" className="hero-work-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: 36 }} transition={{ duration: reduce ? 0.12 : 0.46, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-work-panel-top"><p>Selected work</p><button type="button" onClick={() => setOpen(false)} className="hero-work-close" aria-label="Close selected work">Close ×</button></div>
            <div className={`hero-work-visual hero-work-${project.tone}`} aria-live="polite">
              {active === 0 && <Image src={GUANZON_PROJECT.image} alt="" width={1630} height={965} className="h-full w-full object-cover object-left-top" />}
              {active === 1 && <div className="hero-work-phones"><DeviceFrame src={GROCERY.screens[0].src} alt="" imgWidth={GROCERY.screenSize.w} imgHeight={GROCERY.screenSize.h} width={150} chrome={GROCERY.screenChrome} bandIncluded /><DeviceFrame src={GROCERY.screens[3].src} alt="" imgWidth={GROCERY.screenSize.w} imgHeight={GROCERY.screenSize.h} width={150} chrome={GROCERY.screenChrome} bandIncluded /></div>}
              {active === 2 && <div className="hero-work-phones"><DeviceFrame src={FORGE.screens[0].src} alt="" imgWidth={FORGE.screenSize.w} imgHeight={FORGE.screenSize.h} width={150} chrome={FORGE.screenChrome} /><DeviceFrame src={FORGE.screens[3].src} alt="" imgWidth={FORGE.screenSize.w} imgHeight={FORGE.screenSize.h} width={150} chrome={FORGE.screenChrome} /></div>}
            </div>
            <div className="hero-work-list">{PROJECTS.map((item, index) => <button type="button" key={item.name} aria-pressed={index === active} onClick={() => setActive(index)} className={index === active ? "is-active" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><small>{item.label}</small></button>)}</div>
            <a href={project.href} className="hero-work-link">{project.note}<span>View work →</span></a>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
