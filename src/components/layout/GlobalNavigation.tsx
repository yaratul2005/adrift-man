'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/#story', label: 'The Story', desc: 'A life transformed' },
  { href: '/author', label: 'About Andrew', desc: 'Meet the author' },
  { href: '/video', label: 'Watch', desc: 'Trailer & clips' },
  { href: '/gallery', label: 'Gallery', desc: 'Photography' },
  { href: '/reviews', label: 'Reviews', desc: 'Reader voices' },
];

export function GlobalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkHover = (index: number) => {
    setActiveIndex(index);
    const el = linkRefs.current[index];
    const nav = navRef.current;
    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  };

  const handleNavLeave = () => {
    setActiveIndex(null);
    setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href;
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out',
          isScrolled || !isHomepage
            ? 'py-0'
            : 'py-0'
        )}
      >
        {/* Backdrop layer */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700',
            isScrolled || !isHomepage
              ? 'bg-[#030508]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(226,194,117,0.05),0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-transparent'
          )}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-site-accent/20 to-site-accent-dark/10 border border-site-accent/30 group-hover:border-site-accent/60 transition-all duration-500" />
                <div className="absolute inset-0 rounded-full bg-site-accent/10 blur-sm group-hover:bg-site-accent/20 transition-all duration-500" />
                <BookOpen size={16} className="relative text-site-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl tracking-[0.25em] text-site-text group-hover:text-gradient transition-all duration-300">
                  ADRIFT
                </span>
                <span className="font-sans text-[9px] tracking-[0.3em] text-site-accent/60 uppercase group-hover:text-site-accent/90 transition-colors duration-300">
                  Andrew J. Key Jr.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={handleNavLeave}
            >
              {/* Sliding highlight indicator */}
              <motion.div
                className="absolute bottom-0 h-full rounded-xl bg-white/[0.04] border border-white/[0.08] pointer-events-none"
                animate={indicatorStyle}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />

              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[index] = el; }}
                  onMouseEnter={() => handleLinkHover(index)}
                  className={cn(
                    'relative flex flex-col items-center px-5 py-3 rounded-xl group transition-all duration-300 outline-none',
                  )}
                >
                  <span className={cn(
                    'font-sans text-sm font-medium tracking-[0.08em] transition-colors duration-300',
                    isLinkActive(link.href)
                      ? 'text-site-accent'
                      : activeIndex === index
                        ? 'text-site-text'
                        : 'text-site-text/50 hover:text-site-text/80'
                  )}>
                    {link.label}
                  </span>

                  {/* Active dot indicator */}
                  <span className={cn(
                    'mt-1 h-[2px] rounded-full transition-all duration-500',
                    isLinkActive(link.href)
                      ? 'w-4 bg-gradient-to-r from-site-accent to-site-accent-dark'
                      : 'w-0 bg-site-accent/0'
                  )} />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-semibold tracking-wide overflow-hidden transition-all duration-300"
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-r from-site-accent to-site-accent-dark rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-site-accent to-site-accent-dark rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                <span className="relative text-[#0a0e14] font-bold">Get the Book</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-site-accent/30 transition-all duration-300"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1px] bg-site-text/70 rounded-full transition-all duration-300" />
              <span className="w-3.5 h-[1px] bg-site-text/70 rounded-full transition-all duration-300" />
              <span className="w-5 h-[1px] bg-site-text/70 rounded-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-[#0a0e14] border-l border-white/[0.06] flex flex-col px-8 py-8 shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-lg tracking-[0.3em] text-site-accent">ADRIFT</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-site-text/70 hover:text-site-accent hover:border-site-accent/30 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Decorative line */}
              <div className="h-px bg-gradient-to-r from-site-accent/40 via-site-accent/10 to-transparent mb-10" />

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex flex-col gap-0.5 px-4 py-4 rounded-xl transition-all duration-300',
                        isLinkActive(link.href)
                          ? 'bg-site-accent/10 border border-site-accent/20'
                          : 'hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06]'
                      )}
                    >
                      <span className={cn(
                        'font-sans font-medium tracking-[0.1em] text-base',
                        isLinkActive(link.href) ? 'text-site-accent' : 'text-site-text/80'
                      )}>
                        {link.label}
                      </span>
                      <span className="text-site-secondary/50 text-xs tracking-wide">
                        {link.desc}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <div className="h-px bg-gradient-to-r from-site-accent/20 to-transparent mb-8" />
                <a
                  href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-site-accent to-site-accent-dark text-[#0a0e14] font-bold font-sans text-sm tracking-wide shadow-[0_0_20px_rgba(226,194,117,0.3)] hover:shadow-[0_0_30px_rgba(226,194,117,0.5)] transition-all duration-300"
                >
                  Get the Book →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
