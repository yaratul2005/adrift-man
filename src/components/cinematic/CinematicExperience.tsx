'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Lenis from 'lenis';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const useFontsLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setLoaded(true));
  }, []);
  return loaded;
};

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const fontsLoaded = useFontsLoaded();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!fontsLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isReducedMotion && videoBgRef.current) {
        gsap.to(videoBgRef.current, { opacity: 1, duration: 2, ease: "power2.out" });
    }

    const panels = gsap.utils.toArray('.panel') as HTMLElement[];
    const timelines: gsap.core.Timeline[] = [];

    if (!isReducedMotion) {
      panels.forEach((panel, i) => {
         const tl = gsap.timeline({ paused: true });

         if (panel.classList.contains('panel-atmosphere')) {
            tl.to('.gold-line-intro', { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.5)
              .fromTo('.title-drift', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 2, stagger: 0.1, ease: "power3.out" }, 1)
              .fromTo('.tagline-intro', { y: 10, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power2.out" }, 2);
         }

         if (panel.classList.contains('panel-tension')) {
             tl.fromTo(panel.querySelector('.tension-text'),
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 0.5
             )
             .fromTo(panel.querySelector('.trailer-thumb'),
                { clipPath: 'inset(0 100% 0 0)', scale: 0.95 },
                { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.5, ease: "power2.out" }, 1
             );
         }

         if (panel.classList.contains('panel-book')) {
            tl.fromTo(panel.querySelector('.book-cover'),
               { y: 50, opacity: 0, scale: 0.95 },
               { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0.5
            )
            .fromTo(panel.querySelectorAll('.book-text'),
               { x: 30, opacity: 0 },
               { x: 0, opacity: 1, stagger: 0.4, duration: 1.2, ease: "power2.out" }, 1
            );
         }

         if (panel.classList.contains('panel-author')) {
            tl.fromTo(panel.querySelector('.author-img'),
              { clipPath: 'inset(100% 0 0 0)', scale: 0.95 },
              { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.5, ease: "power2.out" }, 0.5
            )
            .fromTo(panel.querySelector('.author-bio'),
              { x: 30, opacity: 0 },
              { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1
            );
         }

         if (panel.classList.contains('panel-photos')) {
            tl.fromTo(panel.querySelectorAll('.photo-frame'),
               { y: 50, opacity: 0 },
               { y: 0, opacity: 1, stagger: 0.5, duration: 1.5, ease: "power2.out" }, 0.5
            );
         }

         if (panel.classList.contains('panel-reviews')) {
             tl.fromTo(panel.querySelectorAll('.review-block'),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 1.5, duration: 1.5, ease: "power2.out" }, 0.5
             );
         }

         if (panel.classList.contains('panel-close')) {
            tl.fromTo(panel.querySelector('.close-content'),
               { scale: 0.95, opacity: 0 },
               { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }, 0.5
            );
         }

         timelines.push(tl);

         // Trigger animations when panel comes into view
         ScrollTrigger.create({
            trigger: panel,
            start: "top 60%",
            onEnter: () => {
                tl.play();

                // If auto-scroll is active, schedule scroll to next section after timeline finishes + delay
                if (autoScrollActive && i < panels.length - 1) {
                    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

                    // Base reading time is 4 seconds + timeline duration
                    const readingTime = (tl.duration() + 4) * 1000;

                    scrollTimeoutRef.current = setTimeout(() => {
                        if (autoScrollActive) {
                            gsap.to(window, {
                                duration: 2,
                                scrollTo: { y: panels[i + 1], offsetY: 0 },
                                ease: "power2.inOut"
                            });
                        }
                    }, readingTime);
                }
            }
         });
      });
    }

    // Cancel auto-scroll if user interacts
    const cancelAutoScroll = () => {
        if (autoScrollActive) {
            setAutoScrollActive(false);
            gsap.killTweensOf(window, "scrollTo");
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        }
    };

    window.addEventListener('wheel', cancelAutoScroll, { passive: true });
    window.addEventListener('touchstart', cancelAutoScroll, { passive: true });

    // Start initial sequence
    if (autoScrollActive && !isReducedMotion && timelines.length > 0) {
        ScrollTrigger.refresh();
        // Manually play first timeline as it might already be in view on load
        timelines[0].play();

        scrollTimeoutRef.current = setTimeout(() => {
            if (autoScrollActive && panels.length > 1) {
                gsap.to(window, {
                    duration: 2,
                    scrollTo: { y: panels[1], offsetY: 0 },
                    ease: "power2.inOut"
                });
            }
        }, (timelines[0].duration() + 5) * 1000);
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('wheel', cancelAutoScroll);
      window.removeEventListener('touchstart', cancelAutoScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [fontsLoaded, autoScrollActive]);

  useEffect(() => {
    if (trailerOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [trailerOpen]);

  return (
    <div className="bg-transparent text-mist min-h-screen selection:bg-gold selection:text-abyss">
      {/* Clear Video Background */}
      <div className="fixed inset-0 z-[-1] bg-video-wrapper opacity-0 pointer-events-none" ref={videoBgRef}>
        <video
          src="/images/bg_1x.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Light scrim overlay to ensure text readability on the light theme */}
        <div className="absolute inset-0 bg-white/70 md:bg-white/60"></div>
      </div>

      <div ref={containerRef} className="relative w-full z-10 flex flex-col">
        {/* 1. ATMOSPHERE */}
        <section className="panel panel-atmosphere w-full min-h-screen flex flex-col items-center justify-center relative shrink-0">
          <div className="text-center space-y-6 max-w-4xl px-6 py-24">
            <h1 className="text-5xl md:text-8xl font-serif tracking-widest uppercase flex justify-center space-x-2 title-drift text-slate-900 drop-shadow-sm">
              <span>A</span><span>D</span><span>R</span><span>I</span><span>F</span><span>T</span>
            </h1>
            <div className="h-[2px] w-0 bg-gold mx-auto gold-line-intro transform origin-left"></div>
            <p className="text-lg md:text-2xl text-slate-800 font-medium tracking-wide italic tagline-intro">
              &quot;There were moments… I should not have survived.&quot;
            </p>
          </div>
        </section>

        {/* 2. TENSION */}
        <section className="panel panel-tension w-full min-h-screen flex items-center shrink-0 px-6 md:px-24 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full max-w-7xl mx-auto">
            <div className="md:w-1/2 tension-text">
              <p className="text-3xl md:text-5xl leading-tight font-serif text-slate-900 drop-shadow-sm">
                From a troubled youth to a Coast Guard officer, through personal failure, survival, and loss — this is a life shaped by forces both seen and unseen.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-video w-full cursor-pointer group trailer-thumb overflow-hidden rounded-xl shadow-2xl" onClick={() => setTrailerOpen(true)}>
              <Image src="/images/trailerthumb.png" alt="Trailer" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg bg-black/30 backdrop-blur-sm">
                  <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-t-transparent border-b-transparent border-l-white ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE BOOK */}
        <section className="panel panel-book w-full min-h-screen flex items-center shrink-0 px-6 md:px-24 py-24">
           <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full max-w-7xl mx-auto">
              <div className="md:w-[40%] relative aspect-[2/3] w-full max-w-md mx-auto book-cover shadow-2xl shadow-black/30 rounded-r-lg overflow-hidden border border-white/50">
                 <Image src="/images/book-front.jpeg" alt="Adrift Book Cover" fill className="object-cover" />
              </div>
              <div className="md:w-[60%] space-y-10">
                 <div className="space-y-4 book-text">
                   <h2 className="text-4xl md:text-6xl font-serif leading-tight text-slate-900 drop-shadow-sm">Adrift — How God&apos;s Agents Helped Me Transform My Life</h2>
                   <p className="text-xl md:text-2xl text-slate-700 font-medium">A true story of survival, faith, and the unseen forces that changed everything.</p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6 book-text font-sans">
                    <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer" className="border-2 border-slate-900 text-slate-900 px-8 py-4 uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors text-center font-bold">
                      Buy on Amazon
                    </a>
                    <a href="https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499" target="_blank" rel="noopener noreferrer" className="border-2 border-slate-900 text-slate-900 px-8 py-4 uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors text-center font-bold">
                      Buy on Barnes & Noble
                    </a>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. THE AUTHOR */}
        <section className="panel panel-author w-full min-h-screen flex items-center shrink-0 px-6 md:px-24 py-24">
           <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full max-w-7xl mx-auto">
              <div className="md:w-[40%] relative aspect-[3/4] w-full max-w-md mx-auto author-img overflow-hidden rounded-xl shadow-2xl border border-white/50">
                 <Image src="/images/author.jpg" alt="Andrew J. Key Jr." fill className="object-cover" />
              </div>
              <div className="md:w-[60%] author-bio">
                 <h3 className="text-gold text-sm tracking-[0.3em] uppercase mb-6 font-sans font-bold">The Author</h3>
                 <h2 className="text-5xl md:text-7xl font-serif mb-8 text-slate-900">Andrew J. Key Jr.</h2>
                 <p className="text-2xl md:text-4xl text-slate-800 leading-relaxed font-medium">
                   is a retired Coast Guard Lieutenant Commander whose life journey spans hardship, service, and transformation through faith.
                 </p>
              </div>
           </div>
        </section>

        {/* 5. THE PHOTOGRAPHS */}
        <section className="panel panel-photos w-full min-h-screen flex items-center shrink-0 px-6 md:px-24 py-24 relative">
           <div className="flex flex-col md:flex-row gap-12 w-full max-w-7xl mx-auto items-center justify-center">
              <div className="photo-frame relative w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/50">
                <Image src="/images/ocean-bg.jpg" alt="Ocean" fill className="object-cover" />
                <p className="absolute bottom-6 left-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold z-10">The Coast</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="photo-frame relative w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/50 md:-mt-16">
                <Image src="/images/military-ph.jpg" alt="Military Service" fill className="object-cover" />
                <p className="absolute bottom-6 right-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold z-10">Service</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="photo-frame relative w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/50 md:mt-16">
                <Image src="/images/author.jpg" alt="Author reflection" fill className="object-cover" />
                <p className="absolute bottom-6 left-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold z-10">Reflection</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
           </div>
        </section>

        {/* 6. WHAT READERS SAID */}
        <section className="panel panel-reviews w-full min-h-screen flex flex-col justify-center shrink-0 px-6 md:px-24 py-24 space-y-24 max-w-5xl mx-auto">
           <div className="review-block w-full text-center">
              <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A powerful testimony of faith, resilience, and redemption.&quot;</p>
              <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— Bill Senter</p>
           </div>
           <div className="review-block w-full text-center">
              <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A gripping and heartwarming story of transformation.&quot;</p>
              <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— Rhonda J.</p>
           </div>
           <div className="review-block w-full text-center">
              <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;Even in the darkest moments, faith can pull you through.&quot;</p>
              <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— John M.</p>
           </div>
           <div className="review-block w-full text-center">
              <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A soul-stirring journey of divine guidance.&quot;</p>
              <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— James Nelson</p>
           </div>
        </section>

        {/* 7. THE CLOSE */}
        <section className="panel panel-close w-full min-h-screen flex items-center justify-center shrink-0 relative py-24">
           <div className="close-content flex flex-col items-center z-10 text-center space-y-12 bg-white/40 p-12 md:p-16 rounded-3xl backdrop-blur-lg border border-white/60 shadow-2xl max-w-2xl mx-4">
              <div className="relative w-64 aspect-[2/3] shadow-2xl shadow-black/40 rounded-r-lg overflow-hidden border border-white/60">
                 <Image src="/images/book-front.jpeg" alt="Adrift Book Cover" fill className="object-cover" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 font-sans">
                <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer" className="border-2 border-slate-900 text-slate-900 px-8 py-4 uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors font-bold">
                  Buy on Amazon
                </a>
                <a href="https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499" target="_blank" rel="noopener noreferrer" className="border-2 border-slate-900 text-slate-900 px-8 py-4 uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors font-bold">
                  Buy on Barnes & Noble
                </a>
              </div>
              <div className="flex gap-4 mt-8 pt-8 border-t border-slate-400/30 w-full justify-center">
                <Link href="/gallery" className="text-slate-800 hover:text-slate-600 font-sans tracking-wider uppercase text-sm border-b border-slate-400">View Photo Gallery</Link>
                <span className="text-slate-400">|</span>
                <Link href="/video" className="text-slate-800 hover:text-slate-600 font-sans tracking-wider uppercase text-sm border-b border-slate-400">Watch More Videos</Link>
              </div>
           </div>
        </section>

      </div>

      {/* Trailer Overlay */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-in fade-in duration-300">
           <button
             onClick={() => setTrailerOpen(false)}
             className="absolute top-8 right-8 text-white text-3xl font-sans hover:text-mist transition-colors p-4"
             aria-label="Close trailer"
           >
             ✕
           </button>
           <div className="w-full max-w-6xl aspect-video px-4 animate-in zoom-in-95 duration-500 delay-100 fill-mode-both">
              <iframe
                src="https://www.youtube.com/embed/p1o1a7jYgZ0?autoplay=1"
                className="w-full h-full rounded-xl shadow-2xl border border-white/20"
                allow="autoplay; fullscreen"
                frameBorder="0"
                title="Adrift Trailer"
              ></iframe>
           </div>
        </div>
      )}
    </div>
  );
}
