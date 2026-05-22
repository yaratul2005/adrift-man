'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Lenis from 'lenis';
import Image from 'next/image';
import Link from 'next/link';
import { GlobalNavigation } from '../layout/GlobalNavigation';

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
  const trackRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const fontsLoaded = useFontsLoaded();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

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

    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Opening Sequence
    const openingTl = gsap.timeline();
    if (!isReducedMotion) {
      openingTl
        .to(videoBgRef.current, { opacity: 1, duration: 2, ease: "power2.out" }, 0.8)
        .to('.gold-line-intro', { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 1.5)
        .fromTo('.title-drift', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 2, stagger: 0.1, ease: "power3.out" }, 2)
        .fromTo('.tagline-intro', { y: 10, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power2.out" }, 3)
        .fromTo('.scroll-prompt', { opacity: 0 }, { opacity: 0.7, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut" }, 4.5);
    } else {
      gsap.set([videoBgRef.current, '.gold-line-intro', '.title-drift', '.tagline-intro'], { opacity: 1, scaleX: 1, y: 0, filter: 'blur(0px)' });
    }

    const hidePrompt = () => {
      gsap.to('.scroll-prompt', { opacity: 0, duration: 0.5 });
      window.removeEventListener('scroll', hidePrompt);
    };
    window.addEventListener('scroll', hidePrompt, { once: true });

    // Scroll interactions
    if (!isMobile) {
      const sections = gsap.utils.toArray('.panel') as HTMLElement[];
      const trackWidth = trackRef.current ? trackRef.current.scrollWidth : 0;
      const amountToScroll = trackWidth - window.innerWidth;

      const tween = gsap.to(sections, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        }
      });

      if (!isReducedMotion) {
        sections.forEach((panel) => {
          if (panel.classList.contains('panel-tension')) {
            gsap.fromTo(panel.querySelector('.tension-text'),
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 80%", end: "center center", scrub: true } }
            );
            gsap.fromTo(panel.querySelector('.trailer-thumb'),
              { clipPath: 'inset(0 100% 0 0)', scale: 0.92 },
              { clipPath: 'inset(0 0% 0 0)', scale: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 70%", end: "center center", scrub: true } }
            );
          }
          if (panel.classList.contains('panel-book')) {
            gsap.fromTo(panel.querySelector('.book-cover'),
               { y: 50, opacity: 0, scale: 0.95 },
               { y: 0, opacity: 1, scale: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 75%", end: "center center", scrub: true } }
            );
            gsap.fromTo(panel.querySelectorAll('.book-text'),
               { x: 50, opacity: 0 },
               { x: 0, opacity: 1, stagger: 0.2, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 60%", end: "center center", scrub: true } }
            );
          }
          if (panel.classList.contains('panel-author')) {
            gsap.fromTo(panel.querySelector('.author-img'),
              { clipPath: 'inset(100% 0 0 0)', scale: 0.92 },
              { clipPath: 'inset(0% 0 0 0)', scale: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 80%", end: "center center", scrub: true } }
            );
             gsap.fromTo(panel.querySelector('.author-bio'),
              { x: 50, opacity: 0 },
              { x: 0, opacity: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 60%", end: "center center", scrub: true } }
            );
          }
          if (panel.classList.contains('panel-photos')) {
             gsap.fromTo(panel.querySelectorAll('.photo-frame'),
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.3, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 80%", end: "right center", scrub: true } }
             );
          }
          if (panel.classList.contains('panel-reviews')) {
            gsap.fromTo(panel.querySelectorAll('.review-block'),
               { y: 50, opacity: 0 },
               { y: 0, opacity: 1, stagger: 0.5, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 80%", end: "right center", scrub: true } }
            );
          }
          if (panel.classList.contains('panel-close')) {
            gsap.fromTo(panel.querySelector('.close-content'),
               { scale: 0.9, opacity: 0 },
               { scale: 1, opacity: 1, scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 70%", end: "center center", scrub: true } }
            );
          }
        });
      }
    } else {
      if (!isReducedMotion) {
        gsap.utils.toArray('.panel').forEach((panel: unknown) => {
            gsap.fromTo(panel as HTMLElement, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: panel as HTMLElement,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true
                }
            })
        });
      }
    }

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [fontsLoaded]);

  // Handle auto-scroll start after intro
  useEffect(() => {
    if (!fontsLoaded) return;
  const startAutoScroll = () => {
    setIsAutoScrolling(true);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    gsap.to(window, {
        duration: 120,
        scrollTo: maxScroll,
        ease: "none",
        onComplete: () => setIsAutoScrolling(false)
    });
  };

    const timer = setTimeout(() => {
        startAutoScroll();
    }, 6000); // start scrolling slightly after intro sequence ends
    return () => clearTimeout(timer);
  }, [fontsLoaded]);


  // Allow users to pause/cancel auto scroll if they interact (wheel/touch)
  useEffect(() => {
     const cancelAutoScroll = () => {
         if (isAutoScrolling) {
            gsap.killTweensOf(window, "scrollTo");
            setIsAutoScrolling(false);
         }
     };
     window.addEventListener('wheel', cancelAutoScroll, { passive: true });
     window.addEventListener('touchstart', cancelAutoScroll, { passive: true });
     return () => {
        window.removeEventListener('wheel', cancelAutoScroll);
        window.removeEventListener('touchstart', cancelAutoScroll);
     }
  }, [isAutoScrolling]);


  useEffect(() => {
    if (trailerOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [trailerOpen]);

  return (
    <div className="bg-transparent text-mist min-h-screen overflow-hidden selection:bg-gold selection:text-abyss">
      <GlobalNavigation />

      {/* Clear Video Background */}
      <div className="fixed inset-0 z-[-1] bg-video-wrapper opacity-0 pointer-events-none" ref={videoBgRef}>
        {/* We can use bg_2x.mp4 or bg_1x.mp4; using bg_1x.mp4 as mentioned in files */}
        <video
          src="/images/bg_1x.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Light scrim overlay to ensure text readability on the light theme */}
        <div className="absolute inset-0 bg-white/60 md:bg-white/40"></div>
      </div>

      <div ref={containerRef} className="relative w-full md:h-screen md:overflow-hidden z-10 pt-20">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:h-full md:w-[600vw]"
        >
          {/* 1. ATMOSPHERE */}
          <section className="panel panel-atmosphere w-full h-screen md:w-[100vw] flex flex-col items-center justify-center relative shrink-0">
            <div className="text-center space-y-6 max-w-4xl px-6">
              <h1 className="text-5xl md:text-8xl font-serif tracking-widest uppercase flex justify-center space-x-2 title-drift text-slate-900 drop-shadow-sm">
                <span>A</span><span>D</span><span>R</span><span>I</span><span>F</span><span>T</span>
              </h1>
              <div className="h-[2px] w-0 bg-gold mx-auto gold-line-intro transform origin-left"></div>
              <p className="text-lg md:text-2xl text-slate-800 font-medium tracking-wide italic tagline-intro">
                &quot;There were moments… I should not have survived.&quot;
              </p>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-slate-600 scroll-prompt">
              Cinematic Auto-Scroll
            </div>
          </section>

          {/* 2. TENSION */}
          <section className="panel panel-tension w-full min-h-screen md:h-screen md:w-[120vw] flex items-center shrink-0 px-6 md:px-24">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full">
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
          <section className="panel panel-book w-full min-h-screen md:h-screen md:w-[130vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full">
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
          <section className="panel panel-author w-full min-h-screen md:h-screen md:w-[120vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full">
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
          <section className="panel panel-photos w-full min-h-screen md:h-screen md:w-[180vw] flex items-center shrink-0 px-6 md:px-24 overflow-hidden relative">
             <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full items-center">
                <div className="photo-frame relative w-full md:w-[45vw] aspect-video rounded-xl overflow-hidden shadow-xl border border-white/50">
                  <Image src="/images/ocean-bg.jpg" alt="Ocean" fill className="object-cover" />
                  <p className="absolute bottom-6 left-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold">The Coast</p>
                </div>
                <div className="photo-frame relative w-full md:w-[35vw] aspect-[4/3] md:-mt-32 z-10 rounded-xl overflow-hidden shadow-2xl border border-white/50">
                  <Image src="/images/military-ph.jpg" alt="Military Service" fill className="object-cover" />
                  <p className="absolute bottom-6 right-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold">Service</p>
                </div>
                <div className="photo-frame relative w-full md:w-[30vw] aspect-square md:mt-48 rounded-xl overflow-hidden shadow-xl border border-white/50">
                  <Image src="/images/author.jpg" alt="Author reflection" fill className="object-cover" />
                  <p className="absolute bottom-6 left-6 text-sm tracking-widest text-white drop-shadow-md uppercase font-sans font-bold">Reflection</p>
                </div>
             </div>
          </section>

          {/* 6. WHAT READERS SAID */}
          <section className="panel panel-reviews w-full min-h-screen md:h-screen md:w-[200vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row gap-24 md:gap-48 items-center w-full">
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A powerful testimony of faith, resilience, and redemption.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— Bill Senter</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A gripping and heartwarming story of transformation.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— Rhonda J.</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;Even in the darkest moments, faith can pull you through.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— John M.</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center pr-24">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8 text-slate-900">&quot;A soul-stirring journey of divine guidance.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-slate-600 uppercase font-sans font-bold">— James Nelson</p>
                </div>
             </div>
          </section>

          {/* 7. THE CLOSE */}
          <section className="panel panel-close w-full min-h-screen md:h-screen md:w-[100vw] flex items-center justify-center shrink-0 relative">
             <div className="close-content flex flex-col items-center z-10 text-center space-y-12 bg-white/30 p-16 rounded-2xl backdrop-blur-md border border-white/50 shadow-2xl">
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
                <div className="flex gap-4 mt-8">
                  <Link href="/gallery" className="text-slate-800 hover:text-slate-600 font-sans tracking-wider uppercase text-sm border-b border-slate-400">View Photo Gallery</Link>
                  <span className="text-slate-400">|</span>
                  <Link href="/video" className="text-slate-800 hover:text-slate-600 font-sans tracking-wider uppercase text-sm border-b border-slate-400">Watch More Videos</Link>
                </div>
             </div>
          </section>

        </div>
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
