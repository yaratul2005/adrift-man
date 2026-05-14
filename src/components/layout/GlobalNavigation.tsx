'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'The Story' },
    { href: '/author', label: 'About Andrew' },
    { href: '/video', label: 'Watch' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/reviews', label: 'Reviews' },
  ];

  const navClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
    {
      'bg-transparent py-8': isHomepage && !isScrolled,
      'bg-site-surface/70 backdrop-blur-2xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/[0.05]': !isHomepage || isScrolled,
    }
  );

  return (
    <header className={navClasses}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-2xl tracking-wider text-site-text hover:text-site-accent transition-colors focus-ring rounded-sm outline-none">
              ADRIFT
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors focus-ring rounded-sm outline-none',
                  pathname === link.href ? 'text-site-accent' : 'text-site-text/80 hover:text-site-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-site-text hover:text-site-accent transition-colors p-2 focus-ring rounded-md outline-none"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-site-bg flex flex-col px-6 py-8"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-site-text hover:text-site-accent transition-colors p-2 focus-ring rounded-md outline-none"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col space-y-8 mt-12 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-2xl font-serif tracking-widest transition-colors focus-ring rounded-sm outline-none',
                    pathname === link.href ? 'text-site-accent' : 'text-site-text hover:text-site-accent'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
