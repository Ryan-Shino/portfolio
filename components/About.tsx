"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const techPills = [
  "React", "TypeScript", "Next.js",
  "Java", "C", "Python", "Haskell",
  "Docker", "Nginx", "Linux",
];

const panels = [
  {
    num: "01",
    title: "The Mission",
    content:
      "I'm a Computer Science student driven by impact. While I obsess over pixel-perfect design, my true goal is building meaningful software that tangibly improves people's lives. I don't want to just write code, I want to create solutions.",
    extra: null,
  },
  {
    num: "02",
    title: "The Toolkit",
    content:
      "My stack is a hybrid of academic rigor and self-taught agility. I build with React, TypeScript, and Next.js, while leveraging my university background in Java, C, Python, and Haskell. Beyond code, I handle deployment: managing Linux VMs with Systemd and UFW, configuring Nginx reverse proxies, and containerised environments with Docker.",
    extra: "pills",
  },
  {
    num: "03",
    title: "Offline",
    content:
      "I'm a serial hobbyist. When I'm not spinning up new projects on a whim to solve daily inefficiencies, you'll find me losing Elo in Chess, deep-diving into engineering documentaries, or capturing landscapes through photography.",
    extra: "icons",
  },
];

const offlineIcons = [
  {
    label: "Chess",
    svg: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="14" height="14" />
        <line x1="6" y1="1" x2="6" y2="15" />
        <line x1="10" y1="1" x2="10" y2="15" />
        <line x1="1" y1="6" x2="15" y2="6" />
        <line x1="1" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    label: "Documentaries",
    svg: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="14" height="10" />
        <line x1="4" y1="3" x2="4" y2="13" />
        <line x1="12" y1="3" x2="12" y2="13" />
        <line x1="1" y1="6" x2="4" y2="6" />
        <line x1="12" y1="6" x2="15" y2="6" />
        <line x1="1" y1="10" x2="4" y2="10" />
        <line x1="12" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    label: "Photography",
    svg: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 5h14v9H1z" />
        <path d="M5 5l1.5-3h3L11 5" />
        <circle cx="8" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

// A single panel on the right column
const Panel = ({
  panel,
  index,
}: {
  panel: (typeof panels)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
  };
  const pillVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 20 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className="relative min-h-[340px] pl-8 py-10 mb-4"
    >
      {/* Animated left border — alternates accent/accent2 */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top rounded-full"
        style={{ backgroundColor: index === 1 ? "#7B9E87" : "#B8A88A" }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 + 0.2 }}
      />

      {/* Large faded number */}
      <span
        className="absolute -top-6 left-6 font-black text-deep-charcoal select-none pointer-events-none"
        style={{ fontSize: "9rem", lineHeight: 1, opacity: 0.05 }}
      >
        {panel.num}
      </span>

      {/* Title */}
      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-warm-taupe mb-3">
        {panel.num} — {panel.title}
      </h3>

      {/* Content */}
      <p className="text-lg md:text-xl leading-relaxed text-deep-charcoal/80 font-medium max-w-prose">
        {panel.content}
      </p>

      {/* Toolkit pills */}
      {panel.extra === "pills" && (
        <motion.div
          className="flex flex-wrap gap-2 mt-6"
          variants={pillContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techPills.map((tech, ti) => (
            <motion.span
              key={tech}
              variants={pillVariants}
              className="px-3 py-1.5 rounded-full text-sm font-bold"
              style={
                ti < 4
                  ? { backgroundColor: "rgba(123,158,135,0.12)", color: "#7B9E87", border: "1px solid rgba(123,158,135,0.35)" }
                  : { backgroundColor: "rgba(184,168,138,0.12)", color: "#B8A88A", border: "1px solid rgba(184,168,138,0.3)" }
              }
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Offline icons */}
      {panel.extra === "icons" && (
        <div className="flex gap-6 mt-6">
          {offlineIcons.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-deep-charcoal/60">
              <span className="flex-shrink-0">{item.svg}</span>
              <span className="text-sm font-bold text-deep-charcoal/60 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const isLeftInView = useInView(leftRef, { once: true });

  return (
    <section id="about" ref={containerRef} className="relative bg-soft-sand py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop: two-column grid */}
        <div className="md:grid md:grid-cols-[280px_1fr] md:gap-16">

          {/* Left — sticky */}
          <div ref={leftRef} className="hidden md:block">
            <div className="sticky top-24">
              {/* Oversized heading (vertical feel) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2
                  className="font-black uppercase tracking-tighter leading-none text-deep-charcoal mb-8"
                  style={{ fontSize: "5.5rem" }}
                >
                  Behind<br />the<br />Code
                </h2>
              </motion.div>

              {/* Initials circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={isLeftInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl tracking-tighter"
                style={{ backgroundColor: "#3D4A3A", color: "#D4C9B5" }}
              >
                RS
              </motion.div>

              {/* Subtle vertical label */}
              <div
                className="mt-10 font-bold uppercase tracking-[0.3em] text-xs text-warm-taupe"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                About Me
              </div>
            </div>
          </div>

          {/* Mobile heading */}
          <div className="md:hidden mb-12">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none text-deep-charcoal">
              Behind the Code
            </h2>
          </div>

          {/* Right — scrolling panels */}
          <div className="flex flex-col divide-y divide-deep-charcoal/10">
            {panels.map((panel, i) => (
              <Panel key={panel.num} panel={panel} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}