"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import HorizontalScrollCarousel from "@/components/HorizontalScroll";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import useMousePosition from "@/components/useMousePosition";

// ─── Stagger Words ────────────────────────────────────────────────────────────
const StaggerWords = ({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className={`inline-block overflow-hidden mr-[0.18em] ${className ?? ""}`}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
              delay: delay + i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
};

// ─── What's Next Constellation Section ───────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  burst?: boolean;
  life?: number;
  maxLife?: number;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const WhatsNextSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  const teaserLines = [
    "Internship. Summer 2026.",
    "Something I haven't built yet.",
    "...",
  ];

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const section = sectionRef.current;
      canvas.width = section?.offsetWidth ?? window.innerWidth;
      canvas.height = section?.offsetHeight ?? window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 80 base particles
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      vx: randomBetween(-0.4, 0.4) || 0.2,
      vy: randomBetween(-0.4, 0.4) || 0.2,
      r: 2,
      alpha: 0.15,
    }));

    const ACCENT = "123,158,135"; // accent2 — sage green, distinct from Journey
    const CONNECTION_DIST = 130;
    const ATTRACTION_DIST = 100;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        if (p.burst) {
          p.life = (p.life ?? 0) + 1;
          p.alpha = Math.max(0, 1 - (p.life! / p.maxLife!)) * 0.9;
          if (p.life! >= p.maxLife!) { p.r = -1; continue; }
        } else {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ATTRACTION_DIST && dist > 0) {
            p.vx += (dx / dist) * 0.015;
            p.vy += (dy / dist) * 0.015;
          }
          p.vx *= 0.99;
          p.vy *= 0.99;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.5) { p.vx = (p.vx / speed) * 0.5; p.vy = (p.vy / speed) * 0.5; }
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
        p.x += p.vx;
        p.y += p.vy;
      }

      particlesRef.current = particles.filter((p) => p.r >= 0);

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          if (a.burst || b.burst) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT},${(1 - dist / CONNECTION_DIST) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.abs(p.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT},${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const bursts: Particle[] = Array.from({ length: 8 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(1.5, 4);
        return {
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 2.5, alpha: 0.9,
          burst: true, life: 0,
          maxLife: Math.floor(randomBetween(40, 80)),
        };
      });
      particlesRef.current.push(...bursts);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <section
      id="whats-next"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#1a1f1c" }}
    >
      {/* Canvas constellation — background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "block",
          pointerEvents: "all",
        }}
      />

      {/* Content — foreground */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div ref={headingRef} style={{ textAlign: "center", width: "min(600px, 88vw)" }}>

          {/* Heading */}
          <h2
            className="font-black uppercase tracking-tighter leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "#E8E3D9",
              pointerEvents: "auto",
            }}
          >
            {["What's", "Next."].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.18em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.65, ease: "easeOut" as const, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ color: "#7A8C6F", fontSize: "1rem", pointerEvents: "auto" }}
            className="mb-10"
          >
            The story&apos;s still being written.
          </motion.p>

          {/* Teaser lines */}
          <div className="flex flex-col gap-3 mb-10">
            {teaserLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                style={{ color: "#B8A88A55", fontSize: "0.9rem", pointerEvents: "auto" }}
                className="font-medium"
              >
                — {line}
              </motion.p>
            ))}
          </div>

          {/* Get in touch link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3, duration: 0.5 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-bold transition-all duration-200"
            style={{
              color: "#B8A88A",
              pointerEvents: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
          >
            Get in touch →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();

  const size = isHovered ? 400 : 40;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const dotY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    mouseX.set(((e.clientX - rect.left - cx) / cx) * 10);
    mouseY.set(((e.clientY - rect.top - cy) / cy) * 10);
  };

  return (
    <div className="relative">
      <CustomCursor />
      <ScrollProgress />
      <FloatingNav />

      {/* ─── SECTION 1: HERO ─── */}
      <section
        id="home"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Dot-grid background with parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: dotX,
            y: dotY,
            backgroundImage:
              "radial-gradient(circle, #24282622 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Main hero layer */}
        <div className="h-full w-full bg-cream-beige text-deep-charcoal flex items-center justify-center flex-col relative px-8">
          {/* EST badge */}
          <motion.span
            className="absolute top-8 left-8 font-bold tracking-tighter text-warm-taupe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ rotate: 8, scale: 1.05 }}
          >
            <span className="shimmer select-none">EST. 2025</span>
          </motion.span>

          {/* Headline */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-deep-charcoal text-center">
            <StaggerWords text="Ryan Shino." delay={0.3} />
          </h1>

          {/* Subheading */}
          <div className="flex items-center gap-4 mt-6">
            <motion.div
              className="h-[2px] bg-deep-charcoal"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-xl font-medium text-slate-grey"
            >
              Computer Science Student
            </motion.p>
            <motion.div
              className="h-[2px] bg-deep-charcoal"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-warm-taupe">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-warm-taupe text-xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>

        {/* Mask layer */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full flex items-center justify-center flex-col px-8 pointer-events-none"
          animate={{
            maskPosition: `${x - size / 2}px ${y - size / 2}px`,
            maskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          style={{
            maskImage: "url('/mask.svg')",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('/mask.svg')",
            WebkitMaskRepeat: "no-repeat",
            backgroundColor: "#3D4A3A",
            color: "#7A8C6F",
          }}
        >
          <span className="absolute top-8 left-8 font-bold tracking-tighter text-black">
            EST. 2025
          </span>
          <h1
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase pointer-events-auto"
          >
            I write code.
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-[2px] w-20 bg-black" />
            <p
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-xl font-medium tracking-tighter uppercase pointer-events-auto text-slate-grey"
            >
              Sometimes
            </p>
            <div className="h-[2px] w-20 bg-black" />
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: PROJECTS ─── */}
      <HorizontalScrollCarousel />

      {/* ─── SECTION 3: ABOUT ─── */}
      <About />

      {/* ─── SECTION 4: JOURNEY ─── */}
      <Timeline />

      {/* ─── SECTION 5: WHAT'S NEXT ─── */}
      <WhatsNextSection />

      {/* ─── SECTION 6: CONTACT ─── */}
      <Footer />
    </div>
  );
}