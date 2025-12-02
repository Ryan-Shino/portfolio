"use client";

import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/data/projects";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Adjust these values based on the number of cards to ensure smooth scrolling
  const x: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["17.2%", "-63%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[250vh] bg-cream-beige">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-15 pl-15">
          {projectsData.map((card) => {
            return <ProjectCard card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;