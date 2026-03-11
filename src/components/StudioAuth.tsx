'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function StudioAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Hardcoded for demo, normally use process.env.NEXT_PUBLIC_STUDIO_PASSWORD
  const CORRECT_PASSWORD = 'admin'; 

  useEffect(() => {
    const authStatus = sessionStorage.getItem('studio-auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthorized(true);
      sessionStorage.setItem('studio-auth', 'true');
      setError('');
    } else {
      setError('Invalid password. Access denied.');
      setPassword('');
      // Vibrate effect on error
      const input = document.getElementById('pass-input');
      input?.classList.add('animate-shake');
      setTimeout(() => input?.classList.remove('animate-shake'), 500);
    }
  };

  if (isLoading) return null;

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-gold/10"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-gold/10 text-gold mb-2">
              <Lock size={32} />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Protected Area</h1>
              <p className="text-gray-400 text-sm">Please enter the administrative password to access the Sanity Studio.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="relative group/input">
                <input
                  id="pass-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#111] border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold/50 transition-all duration-300 placeholder:text-gray-600 focus:bg-[#151515]"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-gold text-black rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-all duration-300 active:scale-95 group-hover/input:scale-105"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-medium"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            <div className="pt-6 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
              <ShieldCheck size={12} className="text-gold" />
              <span>Secure Authentication System</span>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-gray-600 tracking-wider hover:text-gray-400 transition-colors duration-300 cursor-default">
          FOR AUTHORIZED PHOTOGRAPHERS ONLY
        </p>
      </motion.div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
          border-color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
