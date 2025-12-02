"use client";

import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

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
        {navLinks.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.id.toLowerCase())}
            className="text-deep-charcoal font-bold text-sm uppercase tracking-wider hover:text-warm-taupe transition-colors"
          >
            {item.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingNav;