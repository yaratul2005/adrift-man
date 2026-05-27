'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Play } from 'lucide-react';

interface MainTrailerSectionProps {
  videoUrl?: string;
}

export function MainTrailerSection({
  videoUrl = 'https://www.youtube.com/embed/McRS8802Kh0?autoplay=1&rel=0',
}: MainTrailerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlayTrailer = () => {
      setIsPlaying(true);
    };

    window.addEventListener('playTrailer', handlePlayTrailer);
    return () => window.removeEventListener('playTrailer', handlePlayTrailer);
  }, []);

  return (
    <SectionWrapper id="trailer" padding="xl" className="bg-site-surface relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-site-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <FadeUp>
        <div className="relative mx-auto w-full max-w-5xl rounded-2xl bg-black/80 shadow-[0_20px_60px_-15px_rgba(226,194,117,0.15)] border border-white/[0.08] ring-1 ring-site-accent/10 overflow-hidden">

          {/* Wrapper for 16:9 aspect ratio */}
          <div className="relative w-full aspect-video">
            {!isPlaying ? (
              <div
                className="absolute inset-0 cursor-pointer group w-full h-full flex flex-col items-center justify-center z-10"
                onClick={() => setIsPlaying(true)}
                role="button"
                aria-label="Play main trailer"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsPlaying(true);
                  }
                }}
              >
                {/* Thumbnail Image */}
                <Image
                  src="/images/front-trailer-thumb.png"
                  alt="Adrift trailer background"
                  fill
                  className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
                  priority
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-[0_0_40px_rgba(226,194,117,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent mb-6">
                    <Play size={40} className="ml-2" fill="currentColor" />
                  </div>
                  <span className="font-sans text-sm md:text-base text-site-accent tracking-[0.3em] uppercase drop-shadow font-semibold">Watch the Trailer</span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-black overflow-hidden rounded-2xl">
                <iframe
                  src={videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                  title="Main Trailer"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
