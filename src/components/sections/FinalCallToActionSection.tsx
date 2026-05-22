'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';

import { StoreButton } from '@/components/ui/StoreButton';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';

export function FinalCallToActionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = 'https://drive.google.com/file/d/1oduQou4JRDfq35Rj3TeXwiHk5vk1Jb2d/preview';

  return (
    <SectionWrapper id="final-cta" padding="xl" className="bg-[#05070B] border-t border-white/[0.05] relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg aspect-square bg-site-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        <FadeUp delay={0.1}>
          <p className="font-sans text-xs tracking-[0.4em] text-site-accent/80 uppercase mb-6">
            Begin the journey
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-xs tracking-[0.3em] uppercase mb-4 shadow-sm">
              Banner
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-site-text mb-6 tracking-wide leading-tight drop-shadow-xl">
            <span className="text-gradient">Adrift...</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.35}>
          <p className="font-sans text-lg text-white/70 font-light max-w-xl mx-auto mb-6">
            By Andrew J Key Jr.
          </p>
          <p className="font-sans text-base text-white/50 font-light max-w-xl mx-auto mb-12">
            Available now in paperback and digital editions from your preferred bookseller.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 px-8 py-3 mx-auto rounded-full bg-white/[0.04] border border-white/20 text-white hover:bg-site-accent hover:border-site-accent hover:text-black transition-all duration-300 font-sans tracking-wide mb-12"
          >
            <Play size={18} fill="currentColor" />
            <span className="uppercase text-sm tracking-widest font-semibold">Watch the Trailer</span>
          </button>
        </FadeUp>

        {/* Store buttons with logos — centre-aligned */}
        <FadeUp delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <StoreButton
              href={AMAZON_URL}
              logo="/images/logos/amazon.jpg"
              logoAlt="Amazon"
              sublabel="Buy on"
              label="Amazon"
              className="w-full sm:w-auto"
            />
            <StoreButton
              href={BN_URL}
              logo="/images/logos/barnes_noble.png"
              logoAlt="Barnes & Noble"
              sublabel="Buy on"
              label="Barnes & Noble"
              className="w-full sm:w-auto"
            />
          </div>
        </FadeUp>

        {/* Signature line */}
        <FadeUp delay={0.8}>
          <div className="mt-20 md:mt-28 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-site-accent/30" />
            <p className="font-serif text-lg md:text-xl text-white/60 italic tracking-widest">
              Are you still counting?
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-site-accent/30" />
          </div>
        </FadeUp>

      </div>

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
