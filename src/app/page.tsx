'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play, ArrowRight, ChevronRight, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

// Panel dwell times (in ms). null means auto-play pauses at this panel.
const PANEL_DURATIONS = [
  7000, // 0: Lighthouse Opening
  5000, // 1: Title Card
  8000, // 2: Story Hook
  null, // 3: Trailer (Waits for "Continue")
  9000, // 4: The Book
  9000, // 5: Reviews
  8000, // 6: The Author
  7000, // 7: Gallery Teaser
  null, // 8: Final CTA (Ends)
];

const TOTAL_PANELS = PANEL_DURATIONS.length;

export default function CinematicHomepage() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-play initialization
  useEffect(() => {
    const t = setTimeout(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // Auto-play engine
  useEffect(() => {
    if (!isPlaying) return;

    const duration = PANEL_DURATIONS[currentPanel];
    if (duration === null) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      if (currentPanel < TOTAL_PANELS - 1) {
        setCurrentPanel((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPanel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setIsPlaying(false);
        if (currentPanel < TOTAL_PANELS - 1) setCurrentPanel((p) => p + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        if (currentPanel > 0) setCurrentPanel((p) => p - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPanel]);

  // Pointer events for drag/swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStart(e.clientX);
    setIsPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.clientX - dragStart);
    }
  };

  const handlePointerUp = () => {
    if (dragStart !== null) {
      if (dragOffset < -75 && currentPanel < TOTAL_PANELS - 1) {
        setCurrentPanel((p) => p + 1);
      } else if (dragOffset > 75 && currentPanel > 0) {
        setCurrentPanel((p) => p - 1);
      }
      setDragStart(null);
      setDragOffset(0);
    }
  };

  // Helper for parallax style
  const getParallaxStyle = (index: number) => {
    const diff = currentPanel - index;
    return {
      transform: \`translateX(\${diff * 30}%)\`,
      transition: dragStart !== null ? 'none' : 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-site-accent/30">
      
      {/* The Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex flex-row h-full touch-none cursor-grab active:cursor-grabbing"
        style={{
          width: \`\${TOTAL_PANELS * 100}vw\`,
          transform: \`translateX(calc(-\${currentPanel * 100}vw + \${dragOffset}px))\`,
          transition: dragStart !== null ? 'none' : 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ================= PANEL 1: Lighthouse Opening ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-[120%] -left-[10%] h-full" style={getParallaxStyle(0)}>
            <Image src="/images/ocean-bg.jpg" alt="Ocean Opening" fill className="object-cover" priority />
          </div>
          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none" />
          
          <div className={cn(
            "relative z-10 text-center transition-all duration-[2000ms] delay-1000",
            currentPanel === 0 && hasStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider leading-relaxed text-white drop-shadow-xl">
              "There were moments…<br />I should not have survived."
            </h2>
          </div>
        </div>

        {/* ================= PANEL 2: Title Card ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-[#050B14] flex flex-col items-center justify-center overflow-hidden">
          {/* Animated drawing line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-site-accent/20">
            <div className={cn(
              "h-full bg-site-accent transition-all duration-[4000ms] ease-out",
              currentPanel === 1 ? "w-full" : "w-0"
            )} />
          </div>
          
          <div className={cn(
            "relative z-10 flex flex-col items-center justify-center bg-[#050B14] px-12 py-8 transition-opacity duration-1000 delay-500",
            currentPanel === 1 ? "opacity-100" : "opacity-0"
          )}>
            <h1 className="font-serif text-7xl md:text-9xl tracking-[0.2em] text-white drop-shadow-2xl mb-6">
              ADRIFT
            </h1>
            <p className="font-sans text-sm md:text-lg uppercase tracking-[0.3em] text-site-accent/90 mb-4 text-center">
              How God's Agents Helped Me Transform My Life
            </p>
            <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-white/50">
              Andrew J. Key Jr.
            </p>
          </div>
        </div>

        {/* ================= PANEL 3: The Story Hook ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative overflow-hidden flex items-center">
          <div className="absolute inset-0 w-[120%] -left-[10%] h-full" style={getParallaxStyle(2)}>
            <Image src="/images/ocean-bg.jpg" alt="Ocean Background" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          
          <div className={cn(
            "relative z-10 max-w-2xl px-8 md:px-24 transition-all duration-[1500ms] delay-500",
            currentPanel === 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-site-accent mb-6">A True Story</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-snug text-white mb-6">
              From a troubled youth to a Coast Guard officer — through failure, survival, and loss.
            </h2>
            <p className="font-sans text-lg text-white/70 font-light">
              A life shaped by forces both seen and unseen.
            </p>
          </div>
        </div>

        {/* ================= PANEL 4: The Trailer ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-black flex flex-col items-center justify-center pt-20">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-site-accent/70 mb-8 mt-12">Watch the Trailer</p>
          <div className={cn(
            "w-[90vw] max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(226,194,117,0.1)] transition-all duration-[1500ms] delay-300",
            currentPanel === 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <iframe
              src="https://drive.google.com/file/d/1oduQou4JRDfq35Rj3TeXwiHk5vk1Jb2d/preview"
              width="100%"
              height="100%"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="w-full h-full border-0 bg-black/50"
            ></iframe>
          </div>
          <button
            onClick={() => {
              setCurrentPanel(4);
              setIsPlaying(true);
            }}
            className={cn(
              "mt-8 group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300",
              currentPanel === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <span className="font-sans text-sm tracking-[0.2em] uppercase">Continue</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ================= PANEL 5: The Book ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-[#050B14] flex flex-col md:flex-row items-center pt-20 md:pt-0">
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-8 md:p-24">
            <div className={cn(
              "relative w-full max-w-[300px] md:max-w-[400px] aspect-[2/3] shadow-2xl transition-all duration-[1500ms] delay-300",
              currentPanel === 4 ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 -rotate-2"
            )}>
              <Image src="/images/book-front.jpeg" alt="Adrift Book Cover" fill className="object-cover rounded-sm" />
            </div>
          </div>
          <div className={cn(
            "w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-24 transition-all duration-[1500ms] delay-700",
            currentPanel === 4 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-site-accent mb-4">Now Available</p>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">Adrift</h2>
            <p className="font-sans text-white/70 text-lg leading-relaxed mb-10 max-w-lg font-light">
              This compelling memoir follows a man's extraordinary journey from a chaotic youth into a decorated military career, proving that even when we feel completely lost at sea, unseen forces are guiding us home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noreferrer" className="px-6 py-3 bg-site-accent text-black font-semibold text-sm tracking-widest uppercase rounded text-center hover:bg-site-accent-dark transition-colors">
                Buy on Amazon
              </a>
              <a href="https://www.barnesandnoble.com/w/adrift-andrew-j-key-jr/1145009581" target="_blank" rel="noreferrer" className="px-6 py-3 border border-white/20 text-white font-semibold text-sm tracking-widest uppercase rounded text-center hover:bg-white/10 transition-colors">
                Buy on Barnes & Noble
              </a>
            </div>
          </div>
        </div>

        {/* ================= PANEL 6: Reviews ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-[#020408] flex items-center justify-center overflow-hidden">
          {/* Subtle wave texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
          
          <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative z-10">
            {[
              { text: "A profoundly moving story of redemption and faith. I couldn't put it down.", name: "S. Williams" },
              { text: "Raw, honest, and inspiring. Key's journey is a testament to the human spirit.", name: "D. Martinez" },
              { text: "This book will make you look back at your own life and recognize the unseen hands that guided you.", name: "J. Peterson" }
            ].map((review, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col transition-all duration-[1000ms]",
                  currentPanel === 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: \`\${500 + idx * 300}ms\` }}
              >
                <span className="font-serif text-6xl text-site-accent/30 leading-none mb-4">"</span>
                <p className="font-serif text-xl md:text-2xl text-white/90 leading-snug mb-6 flex-grow">{review.text}</p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-site-accent">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PANEL 7: The Author ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-[#050B14] flex flex-col-reverse md:flex-row items-center pt-20 md:pt-0">
          <div className={cn(
            "w-full md:w-2/5 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-24 relative z-20 bg-[#050B14]/80 md:bg-transparent transition-all duration-[1500ms] delay-500",
            currentPanel === 6 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-site-accent mb-4">About the Author</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Andrew J. Key Jr.</h2>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed mb-8 font-light">
              Raised in Southeast Texas, Andrew overcame a turbulent early life to serve with distinction in the U.S. Coast Guard for nearly thirty years. His story is one of perseverance, duty, and spiritual awakening.
            </p>
            <Link href="/author" className="group flex items-center gap-2 text-site-accent hover:text-white transition-colors w-fit">
              <span className="font-sans text-sm tracking-[0.2em] uppercase">Read Full Story</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden">
            <div className="absolute inset-0 w-[120%] h-full" style={getParallaxStyle(6)}>
              <Image src="/images/author.jpg" alt="Andrew J. Key Jr." fill className="object-cover object-top md:object-center" />
            </div>
            {/* Gradient to blend with text side */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050B14] via-[#050B14]/40 to-transparent" />
          </div>
        </div>

        {/* ================= PANEL 8: Gallery Teaser ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative bg-[#020408] flex flex-col items-center justify-center overflow-hidden">
          <div className={cn(
            "text-center mb-12 transition-all duration-1000 delay-300",
            currentPanel === 7 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          )}>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">A Life in Photographs</h2>
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-site-accent/70">76 images from the journey</p>
          </div>
          
          <div className={cn(
            "w-[120vw] -ml-[10vw] flex gap-4 md:gap-8 justify-center items-center py-8 transition-all duration-[2000ms] delay-500",
            currentPanel === 7 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            {/* Filmstrip representation using 5 random images */}
            {[
              '/album/1714491009852.jpg',
              '/album/A-6.remini-enhanced.jpg',
              '/album/Jeff Key Age - 3.jpg',
              '/album/Mom and Dad circa 1937_edited.jpg',
              '/album/fishing 099.jpg'
            ].map((src, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "relative h-[20vh] md:h-[30vh] w-[40vw] md:w-[25vw] flex-shrink-0 border border-white/10 shadow-2xl overflow-hidden rounded-md",
                  idx % 2 === 0 ? "rotate-2" : "-rotate-1"
                )}
              >
                <Image src={src} alt="Gallery teaser" fill className="object-cover saturate-50 hover:saturate-100 transition-all duration-500" />
              </div>
            ))}
          </div>

          <Link 
            href="/gallery" 
            className={cn(
              "mt-12 group flex items-center gap-2 text-white/80 hover:text-white transition-all duration-1000 delay-1000",
              currentPanel === 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="font-sans text-sm tracking-[0.2em] uppercase border-b border-site-accent/50 pb-1 group-hover:border-site-accent">View Full Gallery</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ================= PANEL 9: Final CTA ================= */}
        <div className="w-[100vw] h-screen flex-shrink-0 relative overflow-hidden flex flex-col items-center justify-center pt-16">
          <div className="absolute inset-0 w-[120%] -left-[10%] h-full" style={getParallaxStyle(8)}>
            <Image src="/images/ocean-bg.jpg" alt="Ocean Final" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/85" />
          
          <div className={cn(
            "relative z-10 flex flex-col items-center text-center px-6 transition-all duration-[1500ms] delay-500",
            currentPanel === 8 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <h1 className="font-serif text-6xl md:text-8xl tracking-[0.2em] text-white drop-shadow-2xl mb-6">
              ADRIFT
            </h1>
            <p className="font-sans text-sm md:text-lg uppercase tracking-[0.3em] text-site-accent mb-8">
              How God's Agents Helped Me Transform My Life
            </p>
            <p className="font-serif text-xl italic text-white/70 mb-12">
              by Andrew J. Key Jr.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-site-accent text-black font-semibold tracking-widest uppercase rounded-sm hover:bg-white transition-colors">
                <span>Buy on Amazon</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://www.barnesandnoble.com/w/adrift-andrew-j-key-jr/1145009581" target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold tracking-widest uppercase rounded-sm hover:bg-white/10 transition-colors">
                <span>Buy on Barnes & Noble</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex items-center gap-6 mb-12">
              <a href="https://www.instagram.com/andrew.key.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-white/50 hover:text-site-accent transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61556330845904" target="_blank" rel="noreferrer" className="text-white/50 hover:text-site-accent transition-colors">
                <Facebook size={24} />
              </a>
            </div>

            <p className="font-sans text-xs text-white/30 uppercase tracking-[0.2em]">
              &copy; 2026 Andrew J. Key Jr. All rights reserved.
            </p>
          </div>
        </div>

      </div>

      {/* ================= USER CONTROLS ================= */}
      
      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300"
        aria-label={isPlaying ? "Pause cinematic experience" : "Play cinematic experience"}
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
      </button>

      {/* Progress Indicator (Filmstrip dots) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
        {Array.from({ length: TOTAL_PANELS }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentPanel(i);
              setIsPlaying(false);
            }}
            className={cn(
              "relative z-10 rounded-full transition-all duration-500",
              currentPanel === i 
                ? "w-2.5 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            )}
            aria-label={\`Go to panel \${i + 1}\`}
          />
        ))}
      </div>

    </div>
  );
}
