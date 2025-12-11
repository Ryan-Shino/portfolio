"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <div 
      id="contact" 
      className="relative h-[80vh] bg-deep-charcoal text-cream-beige flex flex-col justify-between px-12 py-12 overflow-hidden"
    >
      
      <div className="flex flex-col gap-4 mt-20 z-10">
        <span className="uppercase tracking-widest text-sm opacity-50">
          What's Next?
        </span>
        <h2 className="text-8xl font-black uppercase leading-[0.9] tracking-tighter">
          Let's Work <br /> Together.
        </h2>
        
      </div>

      {/* Email Button */}
      <div className="absolute bottom-40 right-10 -translate-y-1/2 opacity-30 pointer-events-none">
        <motion.a 
            href="mailto:ryanshino@yahoo.com"
            whileHover={{ scale: 1.05, x: 20 }}
            className="text-4xl font-bold mt-8 underline decoration-5 underline-offset-2 hover:text-warm-taupe transition-colors w-max"
        >
            ryanshino@yahoo.com
        </motion.a>
      </div>

      {/* Add Timeline section with a animated visual */}

      {/* Socials and CV */}
      <div className="flex items-end justify-between border-t border-cream-beige/20 pt-8 z-10">
        
        <div className="flex flex-col gap-2">
            <span className="text-sm opacity-50 uppercase tracking-wider">Socials</span>
            <div className="flex gap-6 text-xl font-bold">
                <a href="https://github.com/Ryan-Shino/" target="_blank" className="hover:text-warm-taupe transition-colors">Github</a>
                <a href="https://www.linkedin.com/in/ryan-shino/" target="_blank" className="hover:text-warm-taupe transition-colors">LinkedIn</a>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <span className="text-sm opacity-50 uppercase tracking-wider">Downloads</span>
          <a 
          href="/RyanShinoCV.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold hover:text-warm-taupe transition-colors"
          >
          RyanShinoCV.pdf
          </a>
      </div>
      </div>
    </div>
  );
}