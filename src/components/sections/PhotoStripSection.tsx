import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

// ocean-bg.jpg = USCG seaplane (B&W) landing on water — cinematic military
// military-ph.jpg = USCG HU-16 aircraft in flight (color) — Coast Guard years
// family-ph.jpg = Andrew in officer's cap (modern portrait, side view) — Author today
// life-journey-ph.jpg = Physical book cover photo (painting of rescue at sea)
// author.jpg = Andrew young, full officer uniform portrait — USCG service
const photos = [
  {
    src: '/images/ocean-bg.jpg',
    alt: 'U.S. Coast Guard seaplane landing on water — from Andrew\'s service era',
    category: 'Coast Guard Service',
    caption: 'The waters of duty',
  },
  {
    src: '/images/military-ph.jpg',
    alt: 'U.S. Coast Guard HU-16 aircraft in flight',
    category: 'Military Aviation',
    caption: 'Above sea and sky',
  },
  {
    src: '/images/author.jpg',
    alt: 'Andrew J. Key Jr. — Official U.S. Coast Guard portrait',
    category: 'The Author',
    caption: 'Lieutenant-Commander Key',
  },
];

export function PhotoStripSection() {
  return (
    <SectionWrapper id="photo-strip" padding="none" className="bg-[#05070B] overflow-hidden py-12 md:py-24">
      <FadeUp>
        {/* Mobile: Horizontal scroll. Desktop: Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">

          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative flex-none w-[80vw] sm:w-[60vw] md:w-auto aspect-[4/3] md:aspect-[3/4] snap-center group overflow-hidden rounded-sm bg-site-bg border border-site-secondary/20"
            >
              {/* Image with cinematic filter (desaturated + slight contrast) */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-700 saturate-50 contrast-125 group-hover:saturate-100 group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, 33vw"
              />

              {/* Subtle film grain overlay effect done via CSS */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                   style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%22")' }}
              />

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6 md:p-8">
                <div>
                  <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-site-accent/80 font-medium mb-1">
                    {photo.category}
                  </span>
                  <span className="block font-serif text-sm md:text-base text-site-text/90 italic">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </FadeUp>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </SectionWrapper>
  );
}
