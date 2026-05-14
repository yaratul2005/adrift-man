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
  // Placeholder YouTube URL that client can swap
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
  thumbnailUrl = '/images/authornow.jpg', // We'll use one of the assets for now
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent">
                  <Play size={36} className="ml-2" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                config={{
                  youtube: {}
                }}
              />
            </div>
          )}
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
