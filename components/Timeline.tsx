"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// --- 1. Types & Data (Added Images) ---
interface TimelineItem {
  id: number;
  year: string;
  title: string;
  text: string;
  img: string; // URL for the graphic
}

const timelineData: TimelineItem[] = [
  { 
    id: 1, 
    year: "2020", 
    title: "The Foundation", 
    text: "Started with a strong vision in a small room, laying the groundwork.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" // Skyscraper/Building
  },
  { 
    id: 2, 
    year: "2021", 
    title: "First Launch", 
    text: "Shipped v1.0 to the world. The feedback was instantaneous.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" // Data/Screen
  },
  { 
    id: 3, 
    year: "2022", 
    title: "Scaling Up", 
    text: "Expanded the team across three continents and opened research labs.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" // Team/People
  },
  { 
    id: 4, 
    year: "2023", 
    title: "Global Reach", 
    text: "Reached 1 million users worldwide, cementing our place as a leader.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" // Globe/Network
  },
];

const colors = {
  charcoal: "#242826",
  darkOlive: "#3D4A3A",
  sage: "#7A8C6F",
  tan: "#B8A88A",
  lightBeige: "#D4C9B5",
  cream: "#E8E3D9",
};

// --- 2. The Flip Card Component ---
const FlipCard = ({ data, isEven }: { data: TimelineItem; isEven: boolean }) => {
  // We use a state to track hover for the flip
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full md:w-[45%] h-[300px] perspective-1000" // Set fixed height or min-height for consistent flip
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- FRONT FACE (Text) --- */}
        <div
          className="absolute inset-0 w-full h-full p-8 rounded-2xl border flex flex-col justify-center"
          style={{
            backgroundColor: colors.charcoal,
            borderColor: colors.darkOlive,
            backfaceVisibility: "hidden", // Hides this face when rotated
            zIndex: 2,
          }}
        >
          <span
            className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-inner"
            style={{ backgroundColor: colors.darkOlive, color: colors.lightBeige }}
          >
            {data.year}
          </span>
          <h3 className="text-3xl font-serif mb-3 tracking-wide" style={{ color: colors.cream }}>
            {data.title}
          </h3>
          <p className="text-base leading-relaxed opacity-90" style={{ color: colors.tan }}>
            {data.text}
          </p>
          
          {/* Helper visual to indicate it flips */}
          <div className="absolute bottom-6 right-6 opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.tan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </div>
        </div>

        {/* --- BACK FACE (Image) --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: colors.darkOlive,
            borderColor: colors.sage,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", // Starts facing away
            zIndex: 1,
          }}
        >
          {/* The Image */}
          <img 
            src={data.img} 
            alt={data.title} 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-500"
          />
          
          {/* Overlay Gradient for readability/style */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Text on Back */}
          <div className="absolute bottom-0 left-0 w-full p-6 translate-z-10 text-white">
            <p className="font-serif italic text-xl">{data.title}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- 3. Wrapper Component for Scroll Animation ---
const TimelineItemWrapper = ({
  data,
  index,
  scrollYProgress,
}: {
  data: TimelineItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex w-full mb-32 relative ${isEven ? "justify-start" : "justify-end"}`}>
      
      {/* Connector Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: colors.sage,
          boxShadow: `0 0 0 4px ${colors.cream}`,
        }}
      />

      {/* Entrance Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex"
        style={{ justifyContent: isEven ? 'flex-start' : 'flex-end' }}
      >
        <FlipCard data={data} isEven={isEven} />
      </motion.div>
    </div>
  );
};

// --- 4. Main Timeline Component ---
const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="max-w-5xl mx-auto px-6 relative">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-black uppercase tracking-tighter" style={{ color: colors.charcoal }}>
            Legacy
          </h2>
        </motion.div>

        {/* Center Line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top rounded-full"
          style={{
            scaleY,
            backgroundColor: colors.sage,
            zIndex: 0,
          }}
        />
        
        {/* Background Track for Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gray-300 opacity-20 z-0" />

        {/* Items */}
        <div className="relative z-10">
          {timelineData.map((item, index) => (
            <TimelineItemWrapper
              key={item.id}
              data={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;