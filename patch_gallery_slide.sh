# "as you can see in the screenshot, make this gallery images auto slide."
cat << 'INNER_EOF' > src/components/panels/Panel8Gallery.tsx
import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const galleryImages = [
  '/album/family together.jpg',
  '/album/A-17.png',
  '/album/author.jpg',
  '/album/military-ph.jpg',
  '/album/A-4.png',
  '/album/fishing 099.jpg'
];

export function Panel8Gallery({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  const [slideOffset, setSlideOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentOffset = 0;

    if (isActive) {
      const animateSlide = () => {
        currentOffset -= 0.3; // continuous auto-slide to the left
        // loop seamlessly (rough approximation, assuming fixed width. Will reset eventually or just keep going)
        // With limited dwell time, just keeping going is fine.
        setSlideOffset(currentOffset);
        animationFrameId = requestAnimationFrame(animateSlide);
      };
      animationFrameId = requestAnimationFrame(animateSlide);
    } else {
      setSlideOffset(0);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <BasePanel isActive={isActive} className="bg-black flex flex-col justify-center items-center overflow-hidden">

      {/* Top Text Overlay */}
      <div className={cn(
        "relative z-20 text-center mb-12 transition-all duration-800 delay-300",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      )}>
        <p className="font-sans text-sm md:text-base tracking-[0.2em] text-white/60 uppercase">
          76 images from the journey.
        </p>
      </div>

      {/* Filmstrip with continuous auto slide */}
      <div className="w-[150vw] md:w-[120vw] relative h-[30vh] md:h-[40vh] flex items-center z-10 py-4 my-8">
        <div
          className="flex gap-4 md:gap-8 px-8 transition-transform duration-[1500ms] ease-out w-max"
          style={{ transform: \`translateX(calc(\${isActive ? slideOffset : 20}vw + \${slideOffset}px))\` }}
        >
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className={cn(
                "relative h-full w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] flex-shrink-0 transition-all duration-800",
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
          {/* Duplicate for seamless looping look during the slow slide */}
          {galleryImages.map((src, idx) => (
            <div
              key={idx + galleryImages.length}
              className={cn(
                "relative h-full w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] flex-shrink-0 transition-all duration-800",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: \`\${400 + (idx + galleryImages.length) * 100}ms\` }}
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
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
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
