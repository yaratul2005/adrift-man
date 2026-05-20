'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import { OceanMistParticles } from '@/components/ui/OceanMistParticles';

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <div className="absolute inset-0 scale-105 origin-center animate-[ken-burns_40s_ease-out_forwards]">
          <Image
            src="https://tenor.com/bfgdG.gif"
            alt="Ocean lighthouse background"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 60%' }}
          />
        </div>
        {/* Enhanced gradient overlays for cinematic depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* Live Particle Canvas */}
      <OceanMistParticles />

      {/* Interactive Mouse Parallax Container */}
      <div 
        className="relative z-10 mx-auto max-w-5xl px-4 text-center mt-16 transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      >
        <FadeUp delay={0.3}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide leading-[1.1] mb-6 drop-shadow-2xl">
            <span className="text-white/90">There were moments&hellip;</span> <br className="hidden md:block" /> 
            <span className="text-gradient">I should not have survived.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.7}>
          <p className="font-sans text-lg md:text-2xl text-white/85 mb-12 max-w-3xl mx-auto tracking-wide font-light drop-shadow-md">
            A true story of survival, faith, and the unseen forces that changed everything.
          </p>
        </FadeUp>

        <FadeUp delay={1.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8">
            <Button asChild size="lg" className="w-full sm:w-auto px-10">
              <a href="#trailer">
                <span className="mr-2 text-lg leading-none">&#9654;</span> Watch Trailer
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-10">
              <Link href="/author">
                Learn More
              </Link>
            </Button>
          </div>
        </FadeUp>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ken-burns {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}} />
    </section>
  );
}
