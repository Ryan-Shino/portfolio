"use client";

import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// --- Types ---
interface Project {
  id: number;
  title: string;
  desc: string;
  languages: string[];
  image: string;
}

const cards: Project[] = [
  { 
    title: "Movie Vault", 
    id: 1, 
    desc: "A movie discovery app allowing users to search, filter by genre, and manage personal 'Watch Later' and 'Favorites' lists, complete with a sleek UI.", 
    languages: ["React", "REST API"], 
    image: "/Images/Home.png" 
  },
  { 
    title: "P2P Chess with AI", 
    id: 2, 
    desc: "An interactive chess application featuring real-time online matchmaking via Peer.js and a single-player mode against a custom-built AI opponent.", 
    languages: ["React", "Peer.js", "ML"], 
    image: "/Images/Chess.png" 
  },
  { 
    title: "Market Analysis", 
    id: 3, 
    desc: "A quantitative finance project utilizing Python and Pandas to analyze Ethereum market microstructure, visualizing liquidity metrics and volatility data.", 
    languages: ["Python Pandas", "Matplotlib", "Jupyter Notebooks"], 
    image: "/Images/CryptoAnalysis.png" 
  },
  { 
    title: "Automated CI/CD ", 
    id: 4, 
    desc: "A full CI/CD implementation for a Flask app on a Linux Ubuntu VM. Utilizes Docker for containerization, Nginx as a reverse proxy, and GitHub Actions for automated deployment.", 
    languages: ["Flask", "Docker", "Nginx", "Linux", "GitHub Actions"], 
    image: "/Images/FlaskApp.png" 
  },
];

// --- Components ---

// 1. Floating Navigation Banner
const FloatingNav = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-8 px-8 py-3 rounded-full bg-cream-beige/30 backdrop-blur-md border border-deep-charcoal/10 shadow-lg">
        {["Home", "Projects", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-deep-charcoal font-bold text-sm uppercase tracking-wider hover:text-warm-taupe transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// 2. Card Component
const Card = ({ card }: { card: Project }) => {
  return (
    <div className="
      group relative flex flex-col items-center h-[700px] w-[550px] transition-transform duration-700 hover:scale-110 bg-soft-sand">

      {/* Hover Effect */}
      <div className="relative h-[450] w-[450] mt-7 transition-transform duration-700 group-hover:scale-105 bg-slate-grey opacity-50">
        <Image 
          src={card.image}
          alt={card.title}
          fill                 
          className="object-cover p-3"  
        />
      </div>
      
      {/* Badge */}
      <div className="flex flex-wrap mt-5 gap-2 ">
        {card.languages.map((language, index) => (
          <span 
            key={index} 
            className="bg-warm-taupe text-midnight-blue text-xs font-bold px-3 py-1 uppercase"
          >
            {language}
          </span>
        ))}
      </div>
      
      {/* Text Content */}
      <div className="bottom-0 z-10 bg-warm-taupe mb-0 mt-5 p-6 w-full">
        <h3 className="text-4xl font-black text-midnight-blue uppercase leading-none mb-2">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed">
          {card.desc}
        </p>
        <div className="h-1 w-12 bg-deep-charcoal mt-4 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
};

// 3. Horizontal Scroll Section
const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["17.2%", "-63%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[250vh] bg-cream-beige">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-15 pl-15">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page ---
export default function Home() {
  return (
    <div className="bg-cream-beige text-deep-charcoal relative">
      
      {/* Floating Navigation */}
      <FloatingNav />

      {/* HERO SECTION */}
      <div id="home" className="h-screen flex items-center justify-center flex-col relative mx-8">
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

      {/* PROJECTS SECTION */}
      <HorizontalScrollCarousel />

      {/* CONTACT SECTION */}
      <div id="contact" className="h-screen flex flex-col items-center justify-center bg-deep-charcoal text-soft-sand">
        <h2 className="text-6xl font-bold mb-8">Contact me</h2>
        <button className="px-8 py-4 bg-warm-taupe text-deep-charcoal font-bold text-xl rounded-full hover:bg-cream-beige transition-colors">
            Get in Touch
        </button>
      </div>

    </div>
  );
}