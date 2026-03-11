'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface CTAData {
  title: string;
  backgroundImage: any;
}

export default function CTA() {
  const [ctaData, setCtaData] = useState<CTAData | null>(null);

  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const data = await client.fetch(`*[_type == "cta"][0]`);
        setCtaData(data);
      } catch (error) {
        console.error("Error fetching CTA data:", error);
      }
    };
    fetchCtaData();
  }, []);
  return (
    <section className="relative py-32 bg-gray-900 flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Parallax-like scale */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-500 hover:bg-black/40"></div>
        <img 
          src={ctaData?.backgroundImage ? urlFor(ctaData.backgroundImage).url() : "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"} 
          alt="Studio Background" 
          className="w-full h-full object-cover grayscale"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 max-w-4xl mx-auto px-6 space-y-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
          {ctaData?.title || (
            <>
              Professionalism and <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">high credibility</span> in my work...
            </>
          )}
        </h2>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-6 inline-block"
        >
          <button className="px-10 py-3.5 border-2 border-white text-white font-semibold tracking-wide rounded-full hover:bg-white hover:text-black transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
            LET'S TALK
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
