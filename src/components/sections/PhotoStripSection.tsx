import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=800', // Ocean Coast
    alt: 'Coast Guard Service Days',
    category: 'Military',
  },
  {
    src: '/images/family-ph.jpg', // Keep local for family placeholder to maintain respect/privacy in demo
    alt: 'Family moments',
    category: 'Family',
  },
  {
    src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800', // Calm sea / Journey
    alt: 'Life journey reflection',
    category: 'Life Journey',
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-8">
                <span className="font-sans text-sm md:text-base tracking-widest uppercase text-site-text/90 font-medium">
                  {photo.category}
                </span>
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
