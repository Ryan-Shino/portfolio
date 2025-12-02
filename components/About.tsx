"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// The Data for your cards
const cards = [
    {
      title: "The Mission", 
      description: "I’m a Computer Science student driven by impact. While I obsess over pixel-perfect design, my true goal is building meaningful software that tangibly improves people's lives. I don't want to just write code, I want to create solutions.",
      bg: "bg-deep-charcoal",
      text: "text-cream-beige",
      rotation: -4, 
    },
    {
      title: "The Toolkit",
      description: "My stack is a hybrid of academic rigor and self-taught agility. I build with React, TypeScript, and Next.js, while leveraging my university background in Java, C, Python, and Haskell. Beyond code, I handle deployment: managing Linux VMs with Systemd and UFW, configuring Nginx reverse proxies, and containerised environments with Docker.",
      bg: "bg-warm-taupe",
      text: "text-deep-charcoal",
      rotation: 2,
    },
    {
      title: "Offline",
      description: "I’m a serial hobbyist. When I'm not spinning up new projects on a whim to solve daily inefficiencies, you'll find me losing Elo in Chess, deep-diving into engineering documentaries, or capturing landscapes through photography.",
      bg: "bg-cream-beige",
      text: "text-deep-charcoal",
      rotation: -2,
    },
  ];

// Single Card Component
const Card = ({ title, description, bg, text, rotation, index, range, targetScale }: any) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-30">
      <motion.div 
        className={`relative flex flex-col gap-8 w-[500px] h-[700px] rounded-3xl p-12 border-2 border-deep-charcoal shadow-2xl origin-top ${bg} ${text}`}
        style={{ 
            scale: range, //shrinking effect 
            rotate: rotation,
            top: `calc(-10% + ${index * 25}px)` // Offset 
        }}
      >
        <h2 className="text-6xl font-black uppercase tracking-tighter">{title}</h2>
        
        <div className="h-[2px] w-full bg-current opacity-20"></div>
        
        <p className="text-2xl font-medium leading-relaxed">
            {description}
        </p>

        <span className="absolute bottom-8 right-8 text-8xl font-bold opacity-10">
          0{index + 1}
        </span>
      </motion.div>
    </div>
  );
};

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div id="about" ref={container} className="relative mt-20">
        {/* Intro Text before the cards start stacking */}
        <div className="h-[50vh] flex items-center justify-center text-deep-charcoal">
            <h2 className="text-4xl font-bold uppercase tracking-widest animate-pulse">
                Behind the Code
            </h2>
        </div>

      {cards.map((card, i) => {
        // This math makes the cards shrink slightly as they stack
        const targetScale = 1 - ( (cards.length - i) * 0.05); 
        const range = useTransform(scrollYProgress, [i * 0.25, 1], [1, targetScale]);

        return (
          <Card 
            key={i} 
            {...card} 
            index={i} 
            range={range} 
            targetScale={targetScale} 
          />
        );
      })}
    </div>
  );
}