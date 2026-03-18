"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const comingSoonCards = [
  { id: 1, label: "Side Project", hint: "Something big brewing..." },
  { id: 2, label: "Open Source Contrib", hint: "Contributing back to the community." },
  { id: 3, label: "New Build", hint: "An idea that won't leave me alone." },
];

export default function WhatNext() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="whatsnext"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{ backgroundColor: "#1a1f1c" }}
    >
      {/* Atmospheric background orb */}
      <div
        className="absolute pointer-events-none orb-animate"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3D4A3A55 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] font-bold mb-4"
          style={{ color: "#7A8C6F" }}
        >
          On the horizon
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          style={{ color: "#E8E3D9" }}
        >
          What's next?
        </motion.h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
        {comingSoonCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 + i * 0.12 }}
            className="relative rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[260px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Lock icon */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-xl"
              style={{ backgroundColor: "#3D4A3A", border: "1px solid #7A8C6F44" }}
            >
              🔒
            </div>

            <p
              className="text-xs uppercase tracking-[0.25em] font-bold mb-2"
              style={{ color: "#7A8C6F" }}
            >
              Coming Soon
            </p>

            <h3
              className="text-2xl font-black uppercase tracking-tight mb-3"
              style={{ color: "#D4C9B5" }}
            >
              {card.label}
            </h3>

            <p className="text-sm leading-relaxed" style={{ color: "#7A8C6F" }}>
              {card.hint}
            </p>

            {/* Subtle top gradient shimmer line */}
            <div
              className="absolute top-0 left-8 right-8 h-[1px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #B8A88A44, transparent)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
