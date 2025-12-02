import Image from "next/image";
import { Project } from "@/data/projects"; 

const ProjectCard = ({ card }: { card: Project }) => {
  return (
    <div className="group relative flex flex-col items-center h-[600px] w-[550px] transition-transform duration-700 hover:scale-110 bg-soft-sand">
      {/* Hover Effect Container */}
      <div className="relative h-[450px] w-[450px] mt-7 transition-transform duration-700 group-hover:scale-105 bg-slate-grey opacity-50">
        <Image 
          src={card.image}
          alt={card.title}
          fill                 
          className="object-cover p-3"  
        />
      </div>
      
      {/* Badge */}
      <div className="flex flex-wrap mt-5 gap-2">
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

export default ProjectCard;