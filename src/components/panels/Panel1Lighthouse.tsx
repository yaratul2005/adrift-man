import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Panel1Lighthouse({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowText(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowText(false), 0);
    }
  }, [isActive]);

  return (
    <BasePanel isActive={isActive} className="bg-black">
      {/* Background Image with parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-[1200ms] ease-in-out"
        style={{ transform: `translateX(${isActive ? 0 : 100 * speedRatio}vw)` }}
      >
        <Image
          src="/images/ocean-bg.jpg"
          alt="Dark ocean"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-80"
          style={{ objectPosition: 'center' }}
        />
        {/* Very subtle dark vignette at edges only */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className={cn(
            "font-serif text-5xl md:text-7xl xl:text-8xl tracking-wide leading-[1.2] text-white/90 drop-shadow-2xl transition-all duration-1000 transform",
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          There were moments&hellip;<br />
          I should not have survived.
        </h1>
      </div>
    </BasePanel>
  );
}
