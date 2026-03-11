'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface Project {
  _id: string;
  title: string;
  image: any;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"]{
          _id,
          title,
          image
        }`);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const imgVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="portfolio" className="bg-[#fafafa] py-24 text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Text & List */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 space-y-8 self-center text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
            My <br className="hidden lg:block" />
            Projects
          </h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            Amet dictum sit amet justo donec enim diam. Orci a scelerisque purus semper eget duis at.
          </p>
          
          <motion.ul 
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5 text-lg font-medium text-gray-800"
          >
            {[
              { num: '01', title: 'Gwen & Lily Inc', active: true },
              { num: '02', title: 'Stephen Studio', active: false },
              { num: '03', title: 'SpotHub Media', active: false }
            ].map((item, i) => (
              <motion.li key={i} variants={itemVariants} className={`flex items-center justify-center lg:justify-start space-x-4 ${i !== 2 ? 'border-b border-gray-200 pb-4' : ''}`}>
                <span className={`${item.active ? 'text-gold' : 'text-gray-400'} font-serif text-2xl`}>{item.num}</span>
                <span className="cursor-pointer hover:text-gold transition-colors">{item.title}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="pt-6">
            <button className="px-8 py-3.5 border-2 border-gold text-gold font-semibold tracking-wide rounded-full hover:bg-gold hover:text-black hover:scale-105 active:scale-95 transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </motion.div>

        {/* Right Column: Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {projects.map((p, index) => (
            <motion.div 
              key={p._id} 
              variants={imgVariants}
              whileHover={{ y: -10 }}
              className={`w-full overflow-hidden rounded-md group shadow-sm hover:shadow-xl transition-shadow duration-300 ${index % 3 === 1 ? 'md:mt-12' : ''}`}
            >
              {p.image && (
                <img 
                  src={urlFor(p.image).url()} 
                  alt={p.title || `Portfolio ${p._id}`} 
                  className="w-full h-[250px] sm:h-[300px] object-cover bg-gray-200 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
