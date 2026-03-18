"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const sections = [
  { id: "home",       label: "Home" },
  { id: "projects",   label: "Projects" },
  { id: "about",      label: "About" },
  { id: "journey",    label: "Journey" },
  { id: "whats-next", label: "What's Next" },
  { id: "contact",    label: "Contact" },
];

export default function ScrollProgress() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          threshold: 0.2,
          rootMargin: "-10% 0px -10% 0px",
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  if (pathname !== "/") return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 pointer-events-none hidden md:flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-xs font-bold tracking-widest"
          style={{ color: "#B8A88A", writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {pad(activeIndex + 1)} / {pad(sections.length)}
        </motion.span>
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        {sections.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === activeIndex ? 18 : 5,
              height: 5,
              backgroundColor: i === activeIndex ? "#B8A88A" : "#B8A88A44",
            }}
            transition={{ duration: 0.3 }}
            style={{ borderRadius: 4 }}
          />
        ))}
      </div>
    </div>
  );
}
