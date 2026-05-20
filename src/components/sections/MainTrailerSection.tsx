'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface MainTrailerSectionProps {
  videoUrl?: string;
  thumbnailUrl?: string;
}

export function MainTrailerSection({
  videoUrl = 'https://drive.google.com/file/d/1bl89XnjH02dov1JOvxORZiZnuWwDXQJO/preview', 
  thumbnailUrl = '/images/ocean-bg.jpg', 
}: MainTrailerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SectionWrapper id="trailer" padding="xl" className="bg-site-surface relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-site-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <FadeUp>
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-black/80 shadow-[0_20px_60px_-15px_rgba(226,194,117,0.15)] aspect-video border border-white/[0.08] ring-1 ring-site-accent/10">
          {!isPlaying ? (
            <div 
              className="absolute inset-0 cursor-pointer group"
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
                src={thumbnailUrl}
                alt="Adrift trailer thumbnail"
                fill
                className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent mb-6">
                  <Play size={36} className="ml-2" fill="currentColor" />
                </div>
                <h3 className="font-serif text-4xl text-white tracking-widest drop-shadow-md mb-2">TRAILER</h3>
                <p className="font-sans text-sm text-white/80 uppercase tracking-[0.2em] drop-shadow">Click to watch</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={videoUrl}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer"
                className="w-full h-full border-0 absolute top-0 left-0"
                style={{ border: 'none' }}
                title="Main Trailer"
              ></iframe>
            </div>
          )}
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
