import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Panel3StoryHook({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-black">
      {/* Background Image with parallax and slow pan */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-[1200ms] ease-in-out"
        style={{
          transform: `translateX(${isActive ? 0 : 100 * speedRatio}vw) scale(${isActive ? 1.1 : 1})`,
          transition: isActive ? 'transform 12s linear' : 'transform 1200ms ease-in-out'
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1920"
          alt="Dark ocean"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* Dark gradient overlay (left side darker) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/80 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-24 lg:px-32 max-w-4xl">
        <div className={cn(
          "transition-all duration-[10000ms] ease-out flex flex-col",
          isActive ? "-translate-y-4" : "translate-y-4"
        )}>
          <p className={cn(
            "font-sans text-xs md:text-sm tracking-[0.3em] text-site-accent/90 uppercase mb-6 transition-all duration-1000 delay-300",
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            A True Story
          </p>

          <h2 className={cn(
            "font-serif text-4xl md:text-6xl text-white leading-tight mb-8 transition-all duration-1000 delay-500",
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            From a troubled youth to a Coast Guard officer —<br className="hidden md:block" />
            through failure, survival, and loss.
          </h2>

          <p className={cn(
            "font-sans text-lg md:text-xl text-white/70 font-light tracking-wide transition-all duration-1000 delay-700",
            isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            A life shaped by forces both seen and unseen.
          </p>
        </div>
      </div>
    </BasePanel>
  );
}
