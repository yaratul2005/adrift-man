'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Ensure fonts are loaded before calculating layout
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

  useEffect(() => {
    if (!fontsLoaded) return;

    // 1. Initialize Lenis for smooth scroll
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

    // 2. Determine layout mode (Horizontal for desktop/tablet, Vertical for mobile)
    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Opening Sequence Timeline
    const openingTl = gsap.timeline();

    if (!isReducedMotion) {
      // Atmospheric breathing video
      gsap.to(videoBgRef.current, {
        scale: 1.04,
        duration: 8,
        ease: 'none',
        yoyo: true,
        repeat: -1
      });

      // Intro sequence
      openingTl
        .to(videoBgRef.current, { opacity: 1, duration: 2, scale: 1, ease: "power2.out" }, 0.8)
        .to('.gold-line-intro', { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 1.5)
        .fromTo('.title-drift', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 2, stagger: 0.1, ease: "power3.out" }, 2)
        .fromTo('.tagline-intro', { y: 10, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power2.out" }, 3)
        .fromTo('.scroll-prompt', { opacity: 0 }, { opacity: 0.7, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut" }, 4.5);
    } else {
      gsap.set([videoBgRef.current, '.gold-line-intro', '.title-drift', '.tagline-intro'], { opacity: 1, scaleX: 1, scale: 1, y: 0, filter: 'blur(0px)' });
    }

    // Scroll interactions
    const hidePrompt = () => {
      gsap.to('.scroll-prompt', { opacity: 0, duration: 0.5 });
      window.removeEventListener('scroll', hidePrompt);
    };
    window.addEventListener('scroll', hidePrompt, { once: true });



    if (!isMobile) {
      // Horizontal Scroll Setup
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

      // Add individual panel animations based on containerAnimation
      if (!isReducedMotion) {
        sections.forEach((panel) => {
          // Tension
          if (panel.classList.contains('panel-tension')) {
            gsap.fromTo(panel.querySelector('.tension-text'),
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 80%", end: "center center", scrub: true } }
            );
            gsap.fromTo(panel.querySelector('.trailer-thumb'),
              { clipPath: 'inset(0 100% 0 0)', scale: 0.92 },
              { clipPath: 'inset(0 0% 0 0)', scale: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 70%", end: "center center", scrub: true } }
            );
          }
          // The Book
          if (panel.classList.contains('panel-book')) {
            gsap.fromTo(panel.querySelector('.book-cover'),
               { y: 50, opacity: 0, scale: 0.95 },
               { y: 0, opacity: 1, scale: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 75%", end: "center center", scrub: true } }
            );
            gsap.fromTo(panel.querySelectorAll('.book-text'),
               { x: 50, opacity: 0 },
               { x: 0, opacity: 1, stagger: 0.2, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 60%", end: "center center", scrub: true } }
            );
            // Change bg color
            ScrollTrigger.create({
              trigger: panel as HTMLElement,
              containerAnimation: tween,
              start: "left center",
              end: "right center",
              scrub: true,
              onUpdate: (self) => {
                document.body.style.backgroundColor = gsap.utils.interpolate('#07090f', '#0a0e1a', self.progress);
              }
            });
          }
          // The Author
          if (panel.classList.contains('panel-author')) {
            gsap.fromTo(panel.querySelector('.author-img'),
              { clipPath: 'inset(100% 0 0 0)', scale: 0.92 },
              { clipPath: 'inset(0% 0 0 0)', scale: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 80%", end: "center center", scrub: true } }
            );
             gsap.fromTo(panel.querySelector('.author-bio'),
              { x: 50, opacity: 0 },
              { x: 0, opacity: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 60%", end: "center center", scrub: true } }
            );
          }
          // Photographs
          if (panel.classList.contains('panel-photos')) {
             gsap.fromTo(panel.querySelectorAll('.photo-frame'),
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.3, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 80%", end: "right center", scrub: true } }
             );
          }
          // Reviews
          if (panel.classList.contains('panel-reviews')) {
            gsap.fromTo(panel.querySelectorAll('.review-block'),
               { y: 50, opacity: 0 },
               { y: 0, opacity: 1, stagger: 0.5, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 80%", end: "right center", scrub: true } }
            );
          }
          // Close
          if (panel.classList.contains('panel-close')) {
            ScrollTrigger.create({
              trigger: panel as HTMLElement,
              containerAnimation: tween,
              start: "left center",
              end: "right center",
              scrub: true,
              onUpdate: (self) => {
                document.body.style.backgroundColor = gsap.utils.interpolate('#0a0e1a', '#07090f', self.progress);
              }
            });
            gsap.fromTo(panel.querySelector('.close-content'),
               { scale: 0.9, opacity: 0 },
               { scale: 1, opacity: 1, scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "left 70%", end: "center center", scrub: true } }
            );
            gsap.to('.bg-video-wrapper', {
               opacity: 0,
               scrollTrigger: { trigger: panel as HTMLElement, containerAnimation: tween, start: "center center", end: "right center", scrub: true }
            });
          }
        });
      }
    } else {
      // Vertical Scroll Setup for Mobile
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

    // Refresh on resize
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

  // Handle Trailer Open/Close
  useEffect(() => {
    if (trailerOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [trailerOpen]);

  return (
    <div className="bg-abyss text-mist min-h-screen overflow-hidden selection:bg-gold selection:text-abyss">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 bg-video-wrapper opacity-0" ref={videoBgRef}>
        <video
          src="/images/bg_1x.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/80 to-abyss"></div>
      </div>

      <div ref={containerRef} className="relative z-10 w-full md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:h-full md:w-[600vw]"
        >
          {/* 1. ATMOSPHERE */}
          <section className="panel panel-atmosphere w-full h-screen md:w-[100vw] flex flex-col items-center justify-center relative shrink-0">
            <div className="text-center space-y-6 max-w-4xl px-6">
              <h1 className="text-5xl md:text-8xl font-serif tracking-widest uppercase flex justify-center space-x-2 title-drift">
                <span>A</span><span>D</span><span>R</span><span>I</span><span>F</span><span>T</span>
              </h1>
              <div className="h-[1px] w-0 bg-gold mx-auto gold-line-intro transform origin-left"></div>
              <p className="text-lg md:text-2xl text-fog font-light tracking-wide italic tagline-intro">
                &quot;There were moments… I should not have survived.&quot;
              </p>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-fog scroll-prompt">
              Scroll
            </div>
          </section>

          {/* 2. TENSION */}
          <section className="panel panel-tension w-full min-h-screen md:h-screen md:w-[120vw] flex items-center shrink-0 px-6 md:px-24">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full">
              <div className="md:w-1/2 tension-text">
                <p className="text-3xl md:text-5xl leading-tight font-serif text-mist">
                  From a troubled youth to a Coast Guard officer, through personal failure, survival, and loss — this is a life shaped by forces both seen and unseen.
                </p>
              </div>
              <div className="md:w-1/2 relative aspect-video w-full cursor-pointer group trailer-thumb overflow-hidden" onClick={() => setTrailerOpen(true)}>
                <Image src="/images/trailerthumb.png" alt="Trailer" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-500">
                  <div className="w-16 h-16 border border-mist/50 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-mist ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. THE BOOK */}
          <section className="panel panel-book w-full min-h-screen md:h-screen md:w-[130vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full">
                <div className="md:w-[40%] relative aspect-[2/3] w-full max-w-md mx-auto book-cover shadow-2xl shadow-black/50">
                   <Image src="/images/book-front.jpeg" alt="Adrift Book Cover" fill className="object-cover" />
                </div>
                <div className="md:w-[60%] space-y-10">
                   <div className="space-y-4 book-text">
                     <h2 className="text-4xl md:text-6xl font-serif leading-tight">Adrift — How God&apos;s Agents Helped Me Transform My Life</h2>
                     <p className="text-xl md:text-2xl text-fog font-light">A true story of survival, faith, and the unseen forces that changed everything.</p>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-6 book-text font-sans">
                      <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer" className="border border-gold text-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-abyss transition-colors text-center">
                        Buy on Amazon
                      </a>
                      <a href="https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499" target="_blank" rel="noopener noreferrer" className="border border-gold text-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-abyss transition-colors text-center">
                        Buy on Barnes & Noble
                      </a>
                   </div>
                </div>
             </div>
          </section>

          {/* 4. THE AUTHOR */}
          <section className="panel panel-author w-full min-h-screen md:h-screen md:w-[120vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full">
                <div className="md:w-[40%] relative aspect-[3/4] w-full max-w-md mx-auto author-img overflow-hidden grayscale contrast-125">
                   <Image src="/images/author.jpg" alt="Andrew J. Key Jr." fill className="object-cover" />
                </div>
                <div className="md:w-[60%] author-bio">
                   <h3 className="text-gold text-sm tracking-[0.3em] uppercase mb-6 font-sans">The Author</h3>
                   <h2 className="text-5xl md:text-7xl font-serif mb-8">Andrew J. Key Jr.</h2>
                   <p className="text-2xl md:text-4xl text-mist leading-relaxed font-light">
                     is a retired Coast Guard Lieutenant Commander whose life journey spans hardship, service, and transformation through faith.
                   </p>
                </div>
             </div>
          </section>

          {/* 5. THE PHOTOGRAPHS */}
          <section className="panel panel-photos w-full min-h-screen md:h-screen md:w-[180vw] flex items-center shrink-0 px-6 md:px-24 overflow-hidden relative">
             <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full items-center">
                <div className="photo-frame relative w-full md:w-[45vw] aspect-video">
                  <Image src="/images/ocean-bg.jpg" alt="Ocean" fill className="object-cover grayscale opacity-80" />
                  <p className="absolute -bottom-10 left-0 text-sm tracking-widest text-fog uppercase font-sans">The Coast</p>
                </div>
                <div className="photo-frame relative w-full md:w-[35vw] aspect-[4/3] md:-mt-32 z-10">
                  <Image src="/images/military-ph.jpg" alt="Military Service" fill className="object-cover grayscale opacity-90" />
                  <p className="absolute -bottom-10 right-0 text-sm tracking-widest text-fog uppercase font-sans">Service</p>
                </div>
                <div className="photo-frame relative w-full md:w-[30vw] aspect-square md:mt-48">
                  <Image src="/images/author.jpg" alt="Author reflection" fill className="object-cover grayscale opacity-70" />
                  <p className="absolute -bottom-10 left-0 text-sm tracking-widest text-fog uppercase font-sans">Reflection</p>
                </div>
             </div>
          </section>

          {/* 6. WHAT READERS SAID */}
          <section className="panel panel-reviews w-full min-h-screen md:h-screen md:w-[200vw] flex items-center shrink-0 px-6 md:px-24">
             <div className="flex flex-col md:flex-row gap-24 md:gap-48 items-center w-full">
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8">&quot;A powerful testimony of faith, resilience, and redemption.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-fog uppercase font-sans">— Bill Senter</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8">&quot;A gripping and heartwarming story of transformation.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-fog uppercase font-sans">— Rhonda J.</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8">&quot;Even in the darkest moments, faith can pull you through.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-fog uppercase font-sans">— John M.</p>
                </div>
                <div className="review-block w-full md:w-auto max-w-2xl text-center pr-24">
                   <p className="text-3xl md:text-5xl font-serif leading-tight italic mb-8">&quot;A soul-stirring journey of divine guidance.&quot;</p>
                   <p className="text-sm tracking-[0.2em] text-fog uppercase font-sans">— James Nelson</p>
                </div>
             </div>
          </section>

          {/* 7. THE CLOSE */}
          <section className="panel panel-close w-full min-h-screen md:h-screen md:w-[100vw] flex items-center justify-center shrink-0 relative">
             <div className="close-content flex flex-col items-center z-10 text-center space-y-12">
                <div className="relative w-48 aspect-[2/3] shadow-2xl opacity-80">
                   <Image src="/images/book-front.jpeg" alt="Adrift Book Cover" fill className="object-cover" />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 font-sans">
                  <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer" className="border border-gold text-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-abyss transition-colors">
                    Buy on Amazon
                  </a>
                  <a href="https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499" target="_blank" rel="noopener noreferrer" className="border border-gold text-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold hover:text-abyss transition-colors">
                    Buy on Barnes & Noble
                  </a>
                </div>
             </div>
          </section>

        </div>
      </div>

      {/* Trailer Overlay */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 bg-abyss flex items-center justify-center animate-in fade-in duration-300">
           <button
             onClick={() => setTrailerOpen(false)}
             className="absolute top-8 right-8 text-fog text-2xl font-sans hover:text-mist transition-colors p-4"
             aria-label="Close trailer"
           >
             ✕
           </button>
           <div className="w-full max-w-6xl aspect-video px-4 animate-in zoom-in-95 duration-500 delay-100 fill-mode-both">
              <iframe
                src="https://www.youtube.com/embed/p1o1a7jYgZ0?autoplay=1"
                className="w-full h-full"
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
