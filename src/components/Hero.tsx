'use client';

import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface HeroData {
  name: string;
  profession: string;
  titleTag: string;
  description: string;
  image: any;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch(`*[_type == "hero"][0]`);
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchHeroData();
  }, []);
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 lg:pt-0 lg:pb-0 flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Image Area */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center order-2 lg:order-1 mt-12 lg:mt-0"
        >
          {/* Gold Target Background Shape */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute w-[80%] h-[90%] bg-gold rounded-br-[120px] left-0 bottom-0 z-0"
          ></motion.div>
          
          {/* Main Image Base */}
          <div className="relative z-10 w-[90%] h-full overflow-hidden rounded-md shadow-2xl">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" as const }}
              src={heroData?.image ? urlFor(heroData.image).url() : "https://via.placeholder.com/500"}
              alt={heroData?.name || "Unni Krishnan Photographer"}
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Right Column: Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-2 lg:pl-12"
        >
          <div className="space-y-4">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight">
              Hi, I'm <br />
              {heroData?.name || 'Unni Krishnan'}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-8 text-gray-500 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="text-gold w-5 h-5" />
                <span>{heroData?.profession || 'Professional Photographer'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-gold w-5 h-5" />
                <span>{heroData?.titleTag || 'Famous Influencer'}</span>
              </div>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-gray-600 max-w-md leading-relaxed">
            {heroData?.description || 'Capturing the essence of moments with a professional touch. Specialized in fashion, portrait, and lifestyle photography.'}
          </motion.p>

          {/* Contact Input CTA */}
          <motion.div variants={itemVariants} className="relative max-w-md group">
            <input 
              type="text" 
              placeholder="Enter your phone" 
              className="w-full pl-6 pr-36 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-gold shadow-sm transition-all duration-300 group-hover:shadow-md"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-gold text-black font-semibold px-6 rounded-full hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300">
              Get in touch
            </button>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-4">
            <button className="group flex items-center space-x-3 bg-[#111] text-white px-8 py-3.5 rounded-full hover:bg-gold hover:text-black transition-all duration-300 font-medium tracking-wide text-sm">
              <span>PORTFOLIO</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-sm text-gray-400 max-w-[120px] font-medium leading-tight">
              Hire me for a professional job
            </span>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
