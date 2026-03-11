'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

interface TestimonialData {
  quote: string;
  authorName: string;
  authorImage: any;
  signatureImage: any;
}

export default function Testimonials() {
  const [testimonialData, setTestimonialData] = useState<TestimonialData | null>(null);

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const data = await client.fetch(`*[_type == "testimonial"][0]`);
        setTestimonialData(data);
      } catch (error) {
        console.error("Error fetching testimonial data:", error);
      }
    };
    fetchTestimonialData();
  }, []);
  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden flex justify-center text-center">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0,160 C320,300 420,0 720,160 C1020,320 1120,0 1440,160" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="max-w-4xl mx-auto px-6 relative z-10 space-y-12"
      >
        
        {/* Quote text */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif leading-tight text-gray-900 mx-auto"
        >
          "{testimonialData?.quote || 'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. At tellus at urna condimentum mattis.'}"
        </motion.h2>
        
        {/* Author info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold shadow-md">
            <img 
              src={testimonialData?.authorImage ? urlFor(testimonialData.authorImage).url() : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
              alt="Author Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.img 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6 }}
            src={testimonialData?.signatureImage ? urlFor(testimonialData.signatureImage).url() : "https://upload.wikimedia.org/wikipedia/commons/1/1a/Fictional_signature_for_a_John_Hancock.svg"} 
            alt="Signature" 
            className="w-32 h-auto"
          />
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
            {testimonialData?.authorName || 'David Gonzalez'}
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
