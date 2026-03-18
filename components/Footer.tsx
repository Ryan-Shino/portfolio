"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

// Magnetic link wrapper
const MagneticLink = ({
  href,
  target,
  rel,
  children,
  className,
  style,
  download,
  onMouseEnter,
  onMouseLeave: onMouseLeaveProp,
}: {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  download?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    x.set(0);
    y.set(0);
    onMouseLeaveProp?.(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
    </motion.a>
  );
};

// Character stagger for heading
const AnimatedHeading = ({ text, isInView }: { text: string; isInView: boolean }) => {
  const chunks = text.split(" ");
  return (
    <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.9] tracking-tighter">
      {chunks.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.15em] overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.65, ease: "easeOut", delay: wi * 0.12 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      id="contact"
      ref={ref}
      className="relative min-h-screen bg-deep-charcoal text-cream-beige flex flex-col justify-between px-8 md:px-16 py-20 overflow-hidden"
    >
      {/* Animated radial orb */}
      <div
        className="absolute pointer-events-none orb-animate"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3D4A3A55 0%, transparent 60%)",
          bottom: -200,
          right: -200,
          filter: "blur(80px)",
        }}
      />

      {/* Second smaller orb — accent2 (sage green) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,158,135,0.15) 0%, transparent 60%)",
          top: 100,
          left: -100,
          filter: "blur(60px)",
          animation: "orb-drift 12s ease-in-out infinite reverse",
        }}
      />

      {/* Top: label + heading */}
      <div className="flex flex-col gap-4 mt-10 z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-widest text-sm opacity-50"
        >
          Let's connect
        </motion.span>
        <AnimatedHeading text="Let's Work Together." isInView={isInView} />
      </div>

      {/* Middle: email */}
      <div className="z-10 mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-sm opacity-40 uppercase tracking-widest mb-3"
        >
          Drop a line
        </motion.p>
        <MagneticLink
          href="mailto:ryanshino@yahoo.com"
          className="text-2xl md:text-4xl font-bold underline decoration-2 underline-offset-4 hover:text-warm-taupe transition-colors duration-300 inline-block"
        >
          ryanshino@yahoo.com
        </MagneticLink>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-t border-cream-beige/20 pt-8 z-10 gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-sm opacity-40 uppercase tracking-wider">Socials</span>
          <div className="flex gap-6 text-xl font-bold">
            <MagneticLink
              href="https://github.com/Ryan-Shino/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: "inherit" }}
              onMouseEnter={(e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = "#7B9E87")}
              onMouseLeave={(e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = "inherit")}
            >
              Github
            </MagneticLink>
            <MagneticLink
              href="https://www.linkedin.com/in/ryan-shino/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{ color: "inherit" }}
              onMouseEnter={(e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = "#7B9E87")}
              onMouseLeave={(e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = "inherit")}
            >
              LinkedIn
            </MagneticLink>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:text-right">
          <span className="text-sm opacity-40 uppercase tracking-wider">Downloads</span>
          <MagneticLink
            href="/RyanShinoCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold hover:text-warm-taupe transition-colors duration-300"
          >
            RyanShinoCV.pdf
          </MagneticLink>
        </div>
      </div>
    </div>
  );
}