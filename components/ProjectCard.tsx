"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

const ProjectCard = ({ card, index }: { card: Project; index: number }) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl h-full"
      style={{
        backgroundColor: "#1e231f",
        border: "1px solid #3D4A3A55",
        minHeight: 520,
      }}
      whileHover={{ borderColor: "#B8A88A88", boxShadow: "0 0 40px rgba(184,168,138,0.1)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Faded background number */}
      <span
        className="absolute bottom-4 right-6 font-black select-none pointer-events-none leading-none"
        style={{ fontSize: "10rem", color: "#ffffff07", lineHeight: 1 }}
      >
        {num}
      </span>

      {/* Card content */}
      <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10">

        {/* Winner badge — always visible */}
        <span
          className="text-xs font-black uppercase tracking-wider mb-4 inline-block"
          style={{ color: "#B8A88A" }}
        >
          {card.tag}
        </span>

        {/* Title — shifts up slightly on hover */}
        <motion.h3
          className="font-black uppercase tracking-tighter leading-none mb-0"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#E8E3D9" }}
          initial={{ y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {card.title}
        </motion.h3>

        {/* Divider */}
        <motion.div
          className="h-[1px] w-12 mt-6 mb-6 origin-left"
          style={{ backgroundColor: "#B8A88A" }}
          initial={{ scaleX: 1 }}
          whileHover={{ scaleX: 2.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Description — fades in on hover (always visible, more opaque on hover) */}
        <motion.p
          className="text-base md:text-lg leading-relaxed flex-1"
          style={{ color: "#B8A88A99" }}
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, color: "#D4C9B5" }}
          transition={{ duration: 0.35 }}
        >
          {card.desc}
        </motion.p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          {card.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
              style={{
                backgroundColor: "#3D4A3A55",
                color: "#7A8C6F",
                border: "1px solid #3D4A3A",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <motion.a
          href={card.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-widest w-fit"
          style={{ color: "#7A8C6F" }}
          whileHover={{ color: "#B8A88A", x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
          <span style={{ color: "#3D4A3A" }}>→</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;