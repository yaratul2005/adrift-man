cat << 'INNER_EOF' > src/components/sections/MainTrailerSection.tsx
'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Play, X } from 'lucide-react';

interface MainTrailerSectionProps {
  videoUrl?: string;
}

export function MainTrailerSection({
  videoUrl = 'https://drive.google.com/file/d/1oduQou4JRDfq35Rj3TeXwiHk5vk1Jb2d/preview',
}: MainTrailerSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionWrapper id="trailer" padding="xl" className="bg-site-surface relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-site-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <FadeUp>
        <div className="relative mx-auto w-full max-w-5xl flex flex-col items-center justify-center py-20 border border-white/[0.08] ring-1 ring-site-accent/10 rounded-2xl bg-black/40">

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex flex-col items-center gap-6 cursor-pointer"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-[0_0_40px_rgba(226,194,117,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent">
              <Play size={40} className="ml-2" fill="currentColor" />
            </div>
            { /* <h3 className="font-serif text-3xl md:text-5xl text-white tracking-widest drop-shadow-md transition-colors group-hover:text-site-accent">WATCH THE TRAILER</h3> */ }
            <span className="font-sans text-sm md:text-base text-site-accent tracking-[0.3em] uppercase drop-shadow">Watch the Trailer</span>
          </button>

        </div>
      </FadeUp>

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="w-[90vw] h-[80vh] max-w-6xl relative">
            <iframe
              src={videoUrl}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="w-full h-full border-0 absolute top-0 left-0 rounded-xl shadow-2xl"
              title="Main Trailer"
            ></iframe>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
INNER_EOF
