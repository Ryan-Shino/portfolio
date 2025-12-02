"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import HorizontalScrollCarousel from "@/components/HorizontalScroll";
import useMousePosition from "@/components/useMousePosition"; // Adjust path if needed
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  
  // Size of the cursor mask: 40px default, 400px when hovering text
  const size = isHovered ? 400 : 40;

  return (
    <div className="main-container relative">
      <FloatingNav />

      {/* Title page */}
      <div id="home" className="relative h-screen w-full overflow-hidden">
        
        {/* Top layer */}
        <div className="h-full w-full bg-cream-beige text-deep-charcoal flex items-center justify-center flex-col relative px-8">
          <span className="absolute top-8 left-8 font-bold tracking-tighter text-warm-taupe">
            EST. 2025
          </span>

          <h1 className="text-9xl font-black tracking-tighter uppercase text-deep-charcoal">
            Ryan Shino.
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <div className="h-[2px] w-20 bg-deep-charcoal"></div>
            <p className="text-xl font-medium text-slate-grey">
              Computer Science Student
            </p>
            <div className="h-[2px] w-20 bg-deep-charcoal"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 text-sm font-bold uppercase tracking-widest text-warm-taupe animate-bounce"
          >
            Scroll to explore
          </motion.div>
        </div>

        {/* Layer underneath */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full flex items-center justify-center flex-col px-8 pointer-events-none"
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          style={{
            // Mask Properties
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

          {/* Grow effect */}
          <h1 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            className="text-9xl font-black tracking-tighter uppercase pointer-events-auto"
          >
            I write code.
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <div className="h-[2px] w-20 bg-black"></div>
            <p 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
              className="text-xl font-medium tracking-tighter uppercase pointer-events-auto text-slate-grey">
                Sometimes
            </p>
            <div className="h-[2px] w-20 bg-black"></div>
          </div>
        </motion.div>

      </div>

      {/* Projects */}
      <div id="projects" className="bg-cream-beige">
        <HorizontalScrollCarousel />
      </div>

      {/* About Section */}
      <div id="projects" className="bg-cream-beige">
        <About />
      </div>



      {/* Contact */}
      <div>
        <Footer />
      </div>
    </div>
  );
}