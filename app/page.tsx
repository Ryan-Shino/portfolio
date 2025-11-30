"use client";

import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const cards: Project[] = [
  { title: "Project One", id: 1, category: "Design" ,image: "/Images/Home.png" },
  { title: "Project One", id: 2, category: "Design" ,image: "/Images/Home.png" },
  { title: "Project One", id: 3, category: "Design" ,image: "/Images/Home.png" },
  { title: "Project One", id: 4, category: "Design" ,image: "/Images/Home.png" },
  { title: "Project One", id: 5, category: "Design" ,image: "/Images/Home.png" },
];

// Cards
const Card = ({ card }: { card: Project }) => {
  return (
    <div className="
      group relative h-[450px] w-[450px] overflow-hidden 
      bg-midnight-blue rounded-md
      border-2 border-deep-charcoal
    ">
      {/* Badge */}
      <div className="absolute top-4 right-4 z-20 bg-warm-taupe text-midnight-blue text-xs font-bold px-2 py-1 uppercase tracking-widest">
        {card.category}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 bg-slate-grey opacity-50">
      <Image 
        src={card.image}
        alt="Home Banner"
        fill                       
        className="object-cover"  
      />
      </div>
      
      {/* Text Content */}
      <div className="absolute bottom-0 z-10 w-full p-6">
        <h3 className="text-4xl font-black text-soft-sand uppercase leading-none">
          {card.title}
        </h3>
        <div className="h-1 w-12 bg-warm-taupe mt-4 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
};

// Horizontal Scroll
const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-cream-beige">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-12">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-cream-beige text-deep-charcoal">
      
      {/* HERO SECTION */}
      <div className="h-screen flex items-center justify-center flex-col relative mx-8">
        <span className="absolute top-8 left-0 font-bold tracking-tighter text-warm-taupe">EST. 2025</span>
        
        <h1 className="text-9xl font-black tracking-tighter uppercase text-deep-charcoal">
        Ryan Shino.
        </h1>
        
        <div className="flex items-center gap-4 mt-6">
           <div className="h-[2px] w-20 bg-deep-charcoal"></div>
           <p className="text-xl font-medium text-slate-grey">Computer Science Student</p>
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

      <HorizontalScrollCarousel />

      <div className="h-screen flex flex-col items-center justify-center bg-deep-charcoal text-soft-sand">
        <h2 className="text-6xl font-bold mb-8">Contact me</h2>
        <button className="px-8 py-4 bg-warm-taupe text-deep-charcoal font-bold text-xl rounded-full hover:bg-cream-beige transition-colors">
            Here
        </button>
      </div>

    </div>
  );
}