'use client';

import { Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface Skill {
  name: string;
  percent: number;
}

interface ServicesData {
  skills: Skill[];
  backImage: any;
  frontImage: any;
}

export default function Services() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await client.fetch(`*[_type == "services"][0]`);
        setServicesData(data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };
    fetchServicesData();
  }, []);

  const skills = servicesData?.skills || [
    { name: 'PHOTOGRAPHY', percent: 95 },
    { name: 'PHOTOSHOP', percent: 30 },
    { name: 'COMMUNICATIONS', percent: 95 },
  ];

  return (
    <section className="py-24 bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Skills */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
            Job <br className="hidden lg:block" />
            Specialization
          </h2>
          
          <div className="space-y-8 w-full max-w-lg lg:max-w-none">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold tracking-wider text-gray-800">
                  <span>{skill.name}</span>
                  <span>{skill.percent}%</span>
                </div>
                {/* Progress bar background (black) and fill (gold) */}
                <div className="w-full bg-[#111] h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" as const }}
                    className="bg-gold h-full rounded-full" 
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="group flex items-center space-x-3 bg-[#111] text-white px-8 py-3.5 rounded-full hover:bg-gold hover:text-black transition-all duration-300 font-medium tracking-wide text-sm">
              <span>SKILL / SERVICES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </motion.div>

        {/* Right Column: Images */}
        <div className="relative h-[600px] w-full hidden md:block">
          {/* Back Image */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 w-[60%] h-[70%] bg-gray-200 overflow-hidden shadow-xl rounded-md"
          >
            <img 
              src={servicesData?.backImage ? urlFor(servicesData.backImage).url() : "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"} 
              alt="Photography Back" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </motion.div>
          
          {/* Front Image with Video Play Icon */}
          <motion.div 
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-[60%] h-[70%] bg-gray-200 overflow-hidden shadow-2xl border-8 border-white rounded-md z-10 flex items-center justify-center group"
          >
            <img 
              src={servicesData?.frontImage ? urlFor(servicesData.frontImage).url() : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"} 
              alt="Photography Video" 
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-75 mix-blend-multiply transition-all duration-700 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 w-20 h-20 bg-gold/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-gold transition-colors backdrop-blur-sm shadow-lg"
            >
              <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
