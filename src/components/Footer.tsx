'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-10 border-t border-gray-900 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        
        {/* Top Section: Newsletter and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-16 border-b border-gray-800 space-y-10 md:space-y-0">
          
          <motion.div variants={itemVariants} className="max-w-xl w-full text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
              Subscribe newsletter for interesting information
            </h3>
            
            <div className="relative w-full group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#111] text-white pl-6 pr-36 py-4 rounded-full border border-gray-800 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-gold text-black font-semibold px-8 rounded-full hover:bg-yellow-400 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex space-x-4 justify-center md:justify-start">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i}
                href="#" 
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
          
        </div>

        {/* Bottom Section: Nav and Copyright */}
        <motion.div variants={itemVariants} className="pt-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm font-medium tracking-wide">
            {['Home', 'Pages', 'About', 'Portfolio', 'Blog'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold hover:-translate-y-1 transition-all duration-300">
                {item}
              </Link>
            ))}
          </div>

          <p className="text-gray-500 text-sm text-center md:text-left mt-6 md:mt-0">
            © Copyright by AkiDesign Studio - All rights reserved.
          </p>
          
        </motion.div>

      </motion.div>
    </footer>
  );
}
