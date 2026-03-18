"use client";

import { useEffect, useRef, useState } from "react";

// ─── Card Data ────────────────────────────────────────────────────────────────

interface ProjectCard {
  id: number;
  title: string;
  badge?: string;
  desc: string;
  stack: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "Echo",
    badge: "SOTONHACK 2026 — WINNER",
    desc: "Voice-based social platform combining anonymous Reddit-style Q&A with BeReal-style daily check-ins. ElevenLabs voices for anonymity, Gemini API for interest classification.",
    stack: ["React", "Tailwind", "FastAPI", "Python", "ElevenLabs", "Gemini", "MongoDB"],
    github: "https://github.com/kiwifruit0/Echo",
    featured: true,
  },
  {
    id: 2,
    title: "Wander Quest",
    badge: "WECS × SOTON DATASCIENCE — WINNER",
    desc: "Gamified real-world exploration app inspired by Stardew Valley. Geolocation categorises your environment and rewards you with XP, level-ups and a friends leaderboard. Pixel art UI.",
    stack: ["React", "Tailwind", "FastAPI", "Python", "Mapbox API"],
    github: "https://github.com/Ryan-Shino/WECSHackathonProject",
    featured: true,
  },
  {
    id: 3,
    title: "P2P Chess with AI",
    desc: "Fully-featured chess app with a custom Negamax AI opponent (alpha-beta pruning, transposition tables, Sicilian opening book). Play online via PeerJS — no backend required.",
    stack: ["React", "PeerJS", "chess.js", "Vite"],
    live: "https://react-chess-ai.vercel.app/",
    github: "https://github.com/Ryan-Shino/react-chess-ai",
  },
  {
    id: 4,
    title: "Ethereum Market Analysis",
    desc: "Quantitative analysis of Ethereum microstructure using high-frequency market data. Studied liquidity metrics, price impact and volatility patterns using statistical analysis.",
    stack: ["Python", "Pandas", "Matplotlib", "Jupyter Notebooks"],
  },
];

// ─── Mobile fallback ──────────────────────────────────────────────────────────
const MobileStack = () => (
  <section id="projects" className="relative bg-deep-charcoal pt-16 pb-20 px-6">
    <p className="text-xs uppercase tracking-[0.25em] font-bold mb-8 opacity-50" style={{ color: "#B8A88A" }}>
      Selected Work
    </p>
    <div className="flex flex-col gap-8">
      {projects.map((card, i) => {
        const numColor = card.featured ? "#B8A88A" : "#7B9E87";
        return (
          <div key={card.id} className="relative rounded-2xl p-7 flex flex-col gap-4" style={{ backgroundColor: "#111111", border: "1px solid #3D4A3A44" }}>
            <span className="absolute top-4 right-5 font-black select-none pointer-events-none" style={{ fontSize: "5rem", color: numColor, opacity: 0.05, lineHeight: 1 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {card.badge && <span className="text-xs font-black uppercase tracking-wider" style={{ color: "#B8A88A" }}>{card.badge}</span>}
            <h3 className="font-black uppercase tracking-tighter leading-none text-3xl" style={{ color: "#E8E3D9" }}>{card.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#B8A88A88" }}>{card.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {card.stack.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#3D4A3A55", color: "#7A8C6F", border: "1px solid #3D4A3A" }}>{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              {card.github && <a href={card.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7A8C6F" }}>GitHub ↗</a>}
              {card.live && <a href={card.live} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7A8C6F" }}>Live ↗</a>}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

// ─── Full-screen sticky scroll ────────────────────────────────────────────────
const DesktopScroll = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    if (!outer || !track) return;

    const NUM_CARDS = projects.length;
    const CARD_W = window.innerWidth;
    const totalTrackW = CARD_W * NUM_CARDS;
    const maxScroll = totalTrackW - window.innerWidth;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const sectionScrolled = -rect.top;
      const sectionScrollable = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, sectionScrolled / sectionScrollable));
      targetXRef.current = -(maxScroll * progress);
      if (progressBar) progressBar.style.width = `${progress * 100}%`;
    };

    const animate = () => {
      // Lerp for smooth glide
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.08;
      if (track) track.style.transform = `translateX(${currentXRef.current}px)`;
      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      id="projects"
      style={{ height: `${projects.length * 100}vh`, position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#111111",
        }}
      >
        {/* Eyebrow — always visible */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 40,
            zIndex: 10,
          }}
        >
          <p className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: "#7A8C6F" }}>
            Selected Work
          </p>
        </div>

        {/* Card track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${projects.length * 100}vw`,
            height: "100%",
            willChange: "transform",
          }}
        >
          {projects.map((card, i) => {
            const num = String(i + 1).padStart(2, "0");
            const numColor = card.featured ? "#B8A88A" : "#7B9E87";
            return (
              <div
                key={card.id}
                style={{
                  width: "100vw",
                  height: "100vh",
                  flexShrink: 0,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "0 10% 80px 10%",
                  backgroundColor: "#111111",
                  borderRight: "1px solid #3D4A3A22",
                }}
              >
                {/* Faded large number — top right */}
                <span
                  style={{
                    position: "absolute",
                    top: "8%",
                    right: "6%",
                    fontSize: "12rem",
                    fontWeight: 900,
                    color: numColor,
                    opacity: 0.04,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    fontFamily: "inherit",
                  }}
                >
                  {num}
                </span>

                {/* Content — bottom aligned */}
                <div style={{ maxWidth: 700, zIndex: 1 }}>
                  {/* Badge */}
                  {card.badge && (
                    <p
                      className="text-xs font-black uppercase tracking-wider mb-4"
                      style={{ color: "#B8A88A" }}
                    >
                      {card.badge}
                    </p>
                  )}

                  {/* Title */}
                  <h2
                    className="font-black uppercase tracking-tighter leading-none mb-6"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                      color: "#E8E3D9",
                    }}
                  >
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg leading-relaxed mb-6"
                    style={{ color: "#B8A88A77", maxWidth: 580 }}
                  >
                    {card.desc}
                  </p>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
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

                  {/* Links */}
                  <div className="flex gap-6">
                    {card.github && (
                      <a
                        href={card.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: "#B8A88A", textDecoration: "none" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {card.live && (
                      <a
                        href={card.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase tracking-widest"
                        style={{ color: "#7B9E87" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                      >
                        ↗ Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: "rgba(184,168,138,0.12)",
            zIndex: 20,
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(to right, #7B9E87, #B8A88A)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;
  return isMobile ? <MobileStack /> : <DesktopScroll />;
}