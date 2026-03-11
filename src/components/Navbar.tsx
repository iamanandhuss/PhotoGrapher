'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', href: '#', active: true },
  { name: 'Pages', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Blog', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold font-serif tracking-tight z-50">
          My<span className="text-gold">Shoot.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold ${
                link.active ? 'text-gold' : 'text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="px-6 py-2.5 border border-gray-900 text-gray-900 text-sm font-semibold tracking-wide rounded-full hover:bg-gray-900 hover:text-white transition-all"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 relative z-50 p-2 -mr-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-serif ${link.active ? 'text-gold' : 'text-gray-900'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 bg-gray-900 text-white rounded-full mt-4"
          >
            CONTACT
          </Link>
        </div>
      )}
    </nav>
  );
}
