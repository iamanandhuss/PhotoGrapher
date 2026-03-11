'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface Stat {
  num: string;
  suffix: string;
  label: string;
}

interface AboutData {
  title: string;
  description: string;
  image: any;
  stats: Stat[];
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await client.fetch(`*[_type == "about"][0]`);
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="bg-[#0a0a0a] text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Image with Cutout Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative w-full h-[600px] flex justify-center items-end hidden lg:flex"
        >
          {/* Subtle background glow/shape */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/20 rounded-full blur-3xl z-0"
          ></motion.div>
          
          <img 
            src={aboutData?.image ? urlFor(aboutData.image).url() : "profile.png"}
            alt="Photographer holding camera"
            className="relative z-10 w-auto h-[110%] object-cover object-bottom drop-shadow-2xl grayscale brightness-125 hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Right Column: Content and Stats */}
        <div className="space-y-12 text-center lg:text-left">
          
          {/* Stats Bar */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 pb-10 border-b border-gray-800"
          >
            {(aboutData?.stats || [
              { num: '12', suffix: ' YRS', label: 'EXPERIENCE' },
              { num: '50', suffix: '+', label: 'PROJECTS' },
              { num: '1.2', suffix: ' M', label: 'FOLLOWERS' },
            ]).map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <h3 className="text-3xl font-serif text-gold mb-1">
                  {stat.num}<span className="text-xl">{stat.suffix}</span>
                </h3>
                <p className="text-sm tracking-wider text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Heading and Bio */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="space-y-6 flex flex-col items-center lg:items-start"
          >
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
              {aboutData?.title || (
                <>
                  World-Class <br />
                  <span className="text-outline text-transparent">Photographer</span>
                </>
              )}
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed text-base sm:text-lg max-w-xl">
              {aboutData?.description || 'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. At tellus at urna condimentum mattis. Arcu cursus euismod quis viverra. Tellus id interdum velit laoreet id donec. Sem fringilla ut morbi tincidunt augue.'}
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="px-10 py-3.5 border border-gold text-gold font-semibold tracking-wide rounded-full hover:bg-gold hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
          >
            ABOUT
          </motion.button>
          
        </div>
      </div>
    </section>
  );
}
