import { BasePanel } from './BasePanel';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export function Panel4Trailer({ isActive, onContinue }: { isActive: boolean, onContinue: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = 'https://drive.google.com/file/d/1oduQou4JRDfq35Rj3TeXwiHk5vk1Jb2d/preview';
  const thumbnailUrl = '/images/ocean-bg.jpg';

  // Reset trailer state when navigating away
  useEffect(() => {
    if (!isActive) {
      setTimeout(() => setIsPlaying(false), 0);
    }
  }, [isActive]);

  return (
    <BasePanel isActive={isActive} className="bg-site-surface flex flex-col items-center justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-site-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <p className={cn(
        "absolute top-16 font-sans text-xs md:text-sm tracking-[0.3em] text-white/50 uppercase transition-all duration-1000",
        isActive ? "opacity-100" : "opacity-0"
      )}>
        WATCH THE TRAILER
      </p>

      <div className={cn(
        "relative w-[90vw] md:w-[70vw] aspect-video max-h-[60vh] overflow-hidden rounded-2xl bg-black/80 shadow-[0_20px_60px_-15px_rgba(226,194,117,0.15)] border border-white/[0.08] ring-1 ring-site-accent/10 transition-all duration-1000 delay-300",
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        {!isPlaying ? (
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
            role="button"
            aria-label="Play main trailer"
          >
            {/* Thumbnail Image */}
            <img
              src={thumbnailUrl}
              alt="Adrift trailer thumbnail"
              className="object-cover w-full h-full opacity-60 transition-opacity duration-500 group-hover:opacity-40"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent mb-6">
                <Play size={36} className="ml-2" fill="currentColor" />
              </div>
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
              title="Main Trailer"
            ></iframe>
          </div>
        )}
      </div>

      <button
        onClick={onContinue}
        className={cn(
          "absolute bottom-16 px-8 py-3 rounded-full border border-site-accent/30 text-site-accent hover:bg-site-accent hover:text-site-bg transition-all duration-300 font-sans tracking-wide",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: '800ms' }}
      >
        Continue &rarr;
      </button>
    </BasePanel>
  );
}
