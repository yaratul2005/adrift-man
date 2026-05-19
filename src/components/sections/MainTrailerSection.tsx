'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    <SectionWrapper id="trailer" padding="none" className="bg-site-surface relative h-[60vh] min-h-[400px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/ocean-bg.jpg"
          alt="Ocean Background"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-site-bg via-transparent to-site-bg/80" />
      </div>

      <FadeUp className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8">

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex flex-col items-center gap-6 cursor-pointer"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-[0_0_40px_rgba(226,194,117,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent">
              <Play size={40} className="ml-2" fill="currentColor" />
            </div>
            <span className="font-sans text-sm md:text-base text-site-accent tracking-[0.3em] uppercase drop-shadow font-semibold">Watch the Trailer</span>
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
