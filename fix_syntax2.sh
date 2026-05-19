cat << 'INNER_EOF' > src/components/panels/Panel8Gallery.tsx
import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const galleryImages = [
  '/album/A-4.png',
  '/album/family together.jpg',
  '/album/author.jpg',
  '/album/military-ph.jpg',
  '/album/A-17.png',
];

export function Panel8Gallery({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-black flex flex-col justify-center items-center">

      {/* Top Text Overlay */}
      <div className={cn(
        "relative z-20 text-center mb-12 transition-all duration-800 delay-300",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      )}>
        { /* <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">A Life in Photographs</h2> */ }
        <p className="font-sans text-sm md:text-base tracking-[0.2em] text-white/60 uppercase">
          76 images from the journey.
        </p>
      </div>

      {/* Filmstrip */}
      <div className="w-full relative overflow-hidden h-[30vh] md:h-[40vh] flex items-center justify-center z-10 bg-white/5 py-4 my-8">
        <div
          className="flex gap-4 px-8 md:px-16 transition-transform duration-[1500ms] ease-out w-max"
          style={{ transform: \`translateX(\${isActive ? 0 : 20}vw)\` }}
        >
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className={cn(
                "relative h-full w-[40vw] md:w-[25vw] aspect-[4/3] flex-shrink-0 transition-all duration-800",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: \`\${400 + idx * 100}ms\` }}
            >
              <Image
                src={src}
                alt={\`Gallery Teaser \${idx + 1}\`}
                fill
                className="object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={cn(
        "relative z-20 mt-8 transition-all duration-800 delay-700",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <Link
          href="/gallery"
          className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-sans tracking-wide uppercase text-sm"
        >
          View Full Gallery &rarr;
        </Link>
      </div>

    </BasePanel>
  );
}
INNER_EOF
