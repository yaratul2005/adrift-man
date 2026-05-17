import { BasePanel } from './BasePanel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Panel2TitleCard({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  const [animateLine, setAnimateLine] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setAnimateLine(true), 500);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setAnimateLine(false), 0);
    }
  }, [isActive]);

  return (
    <BasePanel isActive={isActive} className="bg-[#0a0e14]">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">

        {/* Author */}
        <p className={cn(
          "font-sans text-sm md:text-base tracking-[0.3em] text-white/50 uppercase mb-6 transition-all duration-1000 delay-300",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Andrew J. Key Jr.
        </p>

        {/* Title */}
        <h1 className={cn(
          "font-serif text-7xl md:text-9xl tracking-[0.2em] text-site-accent mb-6 transition-all duration-1000 delay-500",
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          ADRIFT
        </h1>

        {/* Animated Line */}
        <div className="w-64 md:w-96 h-px bg-white/10 mx-auto relative overflow-hidden mb-6">
          <div
            className={cn(
              "absolute top-0 left-0 h-full bg-site-accent transition-all duration-[3000ms] ease-out",
              animateLine ? "w-full" : "w-0"
            )}
          />
        </div>

        {/* Subtitle */}
        <p className={cn(
          "font-sans text-lg md:text-xl text-white/80 tracking-wide font-light italic transition-all duration-1000 delay-700",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          How God&apos;s Agents Helped Me Transform My Life
        </p>

      </div>
    </BasePanel>
  );
}
