"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

// ─── Data ────────────────────────────────────────────────────────────────────

interface GraphNode {
  id: string;
  label: string;
  year: string;
  track: "path" | "hackathon" | "converge";
  description: string;
  winner?: string;
  stack?: string;
  x?: number;
  y?: number;
  z?: number;
}

interface GraphLink {
  source: string;
  target: string;
  primary?: boolean;
}

const graphNodes: GraphNode[] = [
  { id: "a1", label: "The Foundation",  year: "2019–2020", track: "path",      description: "Autoclicker software, introduction to scripting and writing programs." },
  { id: "a2", label: "First Taste",     year: "2021",      track: "path",      description: "Discovered Python, started writing proper automation scripts." },
  { id: "a3", label: "Leveling Up",     year: "2022",      track: "path",      description: "A-Level Computer Science, learned C# and new programming paradigms." },
  { id: "a4", label: "Experience",      year: "2024",      track: "path",      description: "Developer placement with the team at Southampton General Hospital." },
  { id: "a5", label: "Committing",      year: "2024",      track: "path",      description: "Enrolled in Computer Science at the University of Southampton." },
  { id: "a6", label: "Expanding",       year: "2025",      track: "path",      description: "Learned JavaScript and React, started building for the web." },
  { id: "b1", label: "Wander Quest",   year: "2024",      track: "hackathon", winner: "WECS × Soton Datascience Hackathon — Winner",       description: "Gamified real-world exploration app inspired by Stardew Valley. Geolocation categorises environment and rewards with XP, level-ups and a friends leaderboard.", stack: "React, Tailwind, FastAPI, Python, Mapbox API" },
  { id: "b2", label: "Echo",            year: "2026",      track: "hackathon", winner: "SotonHack 2026 — Winner, Best Use of ElevenLabs",   description: "Voice-based social platform combining anonymous Reddit-style Q&A with BeReal-style daily check-ins. ElevenLabs voices for anonymity, Gemini API for interest classification.", stack: "React, Tailwind, FastAPI, Python, ElevenLabs API, Gemini API, MongoDB Atlas" },
  { id: "c1", label: "What's Next?",   year: "",          track: "converge",  description: "The story's still being written." },
];

// Path nodes: a1-a3 use accent2 tone (formative), a4-a6 use accent (committed)
const PATH_NODE_EARLY = new Set(["a1", "a2", "a3"]);

const graphLinks: GraphLink[] = [
  { source: "a1", target: "a2", primary: true },
  { source: "a2", target: "a3", primary: true },
  { source: "a3", target: "a4", primary: true },
  { source: "a4", target: "a5", primary: true },
  { source: "a5", target: "a6", primary: true },
  { source: "a6", target: "c1", primary: true },
  { source: "a3", target: "b1", primary: true },
  { source: "b1", target: "b2", primary: true },
  { source: "b2", target: "c1", primary: true },
  { source: "a1", target: "a3" },
  { source: "a2", target: "b1" },
  { source: "a5", target: "b2" },
  { source: "a4", target: "b1" },
  { source: "a6", target: "b2" },
  { source: "a3", target: "a5" },
  { source: "a2", target: "a4" },
  { source: "b1", target: "a5" },
];

const traversalOrder = ["a1", "a2", "a3", "b1", "a4", "b2", "a5", "a6", "c1"];

const MobileTimeline = () => (
  <div className="py-16 px-6 max-w-2xl mx-auto">
    {graphNodes.map((n) => (
      <div key={n.id} className="mb-8 pb-8 border-b border-white/10">
        {n.year && <span className="font-mono text-xs" style={{ color: "#7A8C6F" }}>{n.year}</span>}
        <h4 className="text-lg font-bold mt-1" style={{ color: "#E8E3D9" }}>{n.label}</h4>
        {n.winner && <span className="text-xs uppercase tracking-wider font-bold block mt-1" style={{ color: "#B8A88A" }}>{n.winner}</span>}
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7A8C6F" }}>{n.description}</p>
        {n.stack && (
          <div className="flex flex-wrap gap-2 mt-3">
            {n.stack.split(", ").map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#3D4A3A55", color: "#7A8C6F", border: "1px solid #3D4A3A" }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Timeline = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const graphRef = useRef<any>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [traversalStep, setTraversalStep] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rotateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const angleRef = useRef(0);

  // Left-side scroll progress
  const progressMV = useMotionValue(0);
  const progressSpring = useSpring(progressMV, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
      ));
      progressMV.set(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rotateIntervalRef.current) clearInterval(rotateIntervalRef.current);
    };
  }, [progressMV]);

  const startRotation = useCallback(() => {
    if (rotateIntervalRef.current) clearInterval(rotateIntervalRef.current);
    rotateIntervalRef.current = setInterval(() => {
      if (!graphRef.current) return;
      angleRef.current += 0.003;
      const dist = 400;
      graphRef.current.cameraPosition({
        x: dist * Math.sin(angleRef.current),
        z: dist * Math.cos(angleRef.current),
      });
    }, 16);
  }, []);

  const stopRotation = useCallback(() => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
      rotateIntervalRef.current = null;
    }
  }, []);

  const activeNode = activeNodeId ? graphNodes.find((n) => n.id === activeNodeId) ?? null : null;

  const focusNode = useCallback((node: GraphNode) => {
    if (node.id === "c1") {
      document.getElementById("whats-next")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    stopRotation();
    setActiveNodeId(node.id);
    setVisitedNodes((prev) => new Set(prev).add(node.id));
    if (graphRef.current && node.x !== undefined) {
      graphRef.current.cameraPosition(
        { x: node.x, y: node.y, z: (node.z ?? 0) + 150 },
        node,
        800
      );
    }
  }, [stopRotation]);

  const handleNodeClick = useCallback((node: any) => {
    focusNode(node as GraphNode);
  }, [focusNode]);

  const handleNext = () => {
    const nextStep = traversalStep + 1;
    if (nextStep >= traversalOrder.length) return;
    const nodeId = traversalOrder[nextStep];
    setTraversalStep(nextStep);
    if (nodeId === "c1") {
      document.getElementById("whats-next")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const node = graphNodes.find((n) => n.id === nodeId)!;
    focusNode(node);
  };

  const nodeColor = useCallback((node: any): string => {
    const n = node as GraphNode;
    if (n.track === "hackathon") return "#B8A88A";
    if (n.track === "converge") return "#ffffff";
    // Early path nodes get accent2 tone, recent get accent tone
    if (PATH_NODE_EARLY.has(n.id)) return "rgba(123,158,135,0.6)";
    return visitedNodes.has(n.id) ? "rgba(184,168,138,0.9)" : "rgba(184,168,138,0.7)";
  }, [visitedNodes]);

  const linkColor = useCallback((link: any): string => {
    return link.primary ? "rgba(184,168,138,0.25)" : "rgba(184,168,138,0.08)";
  }, []);

  const nodeThreeObject = useCallback((node: any) => {
    if (node.id !== activeNodeId) return undefined;
    try {
      const THREE = (window as any).THREE;
      if (!THREE) return undefined;
      const group = new THREE.Group();
      const geo = new THREE.SphereGeometry(6, 16, 16);
      const mat = new THREE.MeshStandardMaterial({ color: "#B8A88A", emissive: "#B8A88A", emissiveIntensity: 0.6 });
      group.add(new THREE.Mesh(geo, mat));
      const light = new THREE.PointLight("#B8A88A", 2, 60);
      group.add(light);
      return group;
    } catch {
      return undefined;
    }
  }, [activeNodeId]);

  const isLastStep = traversalStep === traversalOrder.length - 1;
  const nextButtonLabel = isLastStep ? "Scroll to What's Next ↓" : "Next →";

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#1a1f1c", height: "100vh" }}
    >
      {/* ── Left-side scroll progress bar ── */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: "10%",
          height: "80%",
          width: 2,
          backgroundColor: "rgba(184,168,138,0.15)",
          zIndex: 15,
          borderRadius: 2,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            scaleY: progressSpring,
            transformOrigin: "top",
            background: "linear-gradient(to bottom, #7B9E87, #B8A88A)",
            borderRadius: 2,
            height: "100%",
          }}
        />
        {/* Pulsing chevron at bottom */}
        <button
          onClick={() => document.getElementById("whats-next")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            position: "absolute",
            bottom: -28,
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#B8A88A",
            fontSize: "14px",
            animation: "chevron-pulse 2s ease-in-out infinite",
          }}
          aria-label="Scroll to What's Next"
        >
          ↓
        </button>
      </div>

      {/* Heading overlay */}
      <motion.div
        className="absolute top-10 left-0 right-0 z-10 text-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="font-black uppercase tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#E8E3D9" }}
        >
          My Journey
        </h2>
        <p className="text-lg mt-2 font-medium italic" style={{ color: "#7A8C6F" }}>
          The road so far.
        </p>
      </motion.div>

      {/* Mobile */}
      {mounted && isMobile && (
        <div className="overflow-y-auto h-full pt-32">
          <MobileTimeline />
        </div>
      )}

      {/* 3D Graph */}
      {mounted && !isMobile && (
        <ForceGraph3D
          ref={graphRef}
          graphData={{ nodes: graphNodes, links: graphLinks }}
          backgroundColor="rgba(0,0,0,0)"
          nodeLabel=""
          nodeColor={nodeColor}
          nodeVal={(node: any) => {
            const n = node as GraphNode;
            return n.track === "converge" ? 6 : n.track === "hackathon" ? 4 : 2;
          }}
          nodeThreeObject={nodeThreeObject}
          nodeThreeObjectExtend={false}
          linkColor={linkColor}
          linkWidth={0.5}
          linkOpacity={1}
          nodeOpacity={0.9}
          nodeResolution={32}
          enableNodeDrag={true}
          enableNavigationControls={true}
          showNavInfo={false}
          onNodeClick={handleNodeClick}
          width={typeof window !== "undefined" ? window.innerWidth : undefined}
          height={typeof window !== "undefined" ? window.innerHeight : undefined}
          onEngineStop={() => {
            const fg = graphRef.current;
            if (!fg) return;
            try {
              fg.d3Force("charge")?.strength(-200);
              fg.d3Force("link")?.distance(120);
              if (fg.controls) {
                fg.controls().enableZoom = false;
                fg.controls().enableRotate = true;
              }
            } catch {}
            startRotation();
          }}
        />
      )}

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-8 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mb-5 mx-4 max-w-lg w-full rounded-2xl p-5 text-left pointer-events-auto"
              style={{
                backgroundColor: "rgba(26,31,28,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(184,168,138,0.2)",
              }}
            >
              {activeNode.year && (
                <span className="font-mono text-xs block mb-1" style={{ color: "#7A8C6F" }}>
                  {activeNode.year}
                </span>
              )}
              <h4 className="text-lg font-bold leading-tight mb-1" style={{ color: "#E8E3D9" }}>
                {activeNode.label}
              </h4>
              {activeNode.winner && (
                <span className="text-xs uppercase tracking-wider font-black block mb-2" style={{ color: "#B8A88A" }}>
                  {activeNode.winner}
                </span>
              )}
              <p className="text-sm leading-relaxed" style={{ color: "#B8A88A99" }}>
                {activeNode.description}
              </p>
              {activeNode.stack && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeNode.stack.split(", ").map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#3D4A3A55", color: "#7A8C6F", border: "1px solid #3D4A3A" }}>{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-5 pointer-events-auto">
          <span className="font-mono text-xs" style={{ color: "#7A8C6F55" }}>
            {traversalStep < 0 ? "—" : `${traversalStep + 1} / ${traversalOrder.length}`}
          </span>
          <button
            onClick={handleNext}
            className="text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ color: "#B8A88A", border: "1px solid #B8A88A", background: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#B8A88A22"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            {nextButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Timeline;