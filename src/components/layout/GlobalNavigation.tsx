'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const INSTAGRAM_URL = 'https://www.instagram.com/andrew.key.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61556330845904';

// Crisp inline SVG icons — no dependency needed
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

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
          true
            ? 'py-0'
            : 'py-0'
        )}
      >
        {/* Backdrop layer */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700',
            true
              ? 'bg-[#030508]/30 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_0_rgba(226,194,117,0.05),0_8px_32px_rgba(0,0,0,0.6)]'
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
                <span className="font-sans text-[9px] tracking-[0.3em] text-site-accent/80 uppercase group-hover:text-site-accent transition-colors duration-300">
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
                        : 'text-site-text/75 hover:text-site-text'
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

            {/* Desktop right-side: Social icons + CTA */}
            <div className="hidden md:flex items-center gap-3">

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Andrew on Instagram"
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-pink-400/40 hover:bg-pink-500/10 transition-all duration-300"
              >
                <span className="text-white/50 group-hover:text-pink-400 transition-colors duration-300">
                  <InstagramIcon size={16} />
                </span>
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-white/60 bg-site-surface border border-white/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Instagram
                </span>
              </a>

              {/* Facebook */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Andrew on Facebook"
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-300"
              >
                <span className="text-white/50 group-hover:text-blue-400 transition-colors duration-300">
                  <FacebookIcon size={16} />
                </span>
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-wide text-white/60 bg-site-surface border border-white/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Facebook
                </span>
              </a>

              {/* Vertical divider */}
              <div className="w-px h-5 bg-white/10" />

              {/* Get the Book CTA */}
              <a
                href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-semibold tracking-wide overflow-hidden transition-all duration-300"
              >
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
                <div className="h-px bg-gradient-to-r from-site-accent/20 to-transparent mb-6" />

                {/* Social links row */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/30 flex-shrink-0">Follow</span>
                  <div className="flex gap-3">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-pink-400/30 hover:bg-pink-500/10 transition-all duration-300"
                    >
                      <span className="text-white/40 group-hover:text-pink-400 transition-colors duration-300">
                        <InstagramIcon size={15} />
                      </span>
                      <span className="font-sans text-xs text-white/50 group-hover:text-pink-400 transition-colors duration-300">Instagram</span>
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-blue-400/30 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      <span className="text-white/40 group-hover:text-blue-400 transition-colors duration-300">
                        <FacebookIcon size={15} />
                      </span>
                      <span className="font-sans text-xs text-white/50 group-hover:text-blue-400 transition-colors duration-300">Facebook</span>
                    </a>
                  </div>
                </div>

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
