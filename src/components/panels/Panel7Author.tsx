import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Panel7Author({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-site-surface flex flex-col md:flex-row">
      {/* Left side: Text */}
      <div className="w-full md:w-[40%] h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-black relative z-10">
        <p className={cn(
          "font-sans text-xs tracking-[0.35em] text-white/50 uppercase mb-4 transition-all duration-1000 delay-300",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          About the Author
        </p>

        <h2 className={cn(
          "font-serif text-4xl md:text-5xl text-site-accent mb-6 transition-all duration-1000 delay-400",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          Andrew J. Key Jr.
        </h2>

        <p className={cn(
          "font-sans text-base text-white/80 leading-relaxed mb-8 font-light transition-all duration-1000 delay-500",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          Born in Texas and forged by hardship, Andrew transformed his life through resilience and unexpected interventions. He spent 25 years as a commissioned officer and aviator in the United States Coast Guard.
        </p>

        <div className={cn(
          "transition-all duration-1000 delay-600",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        )}>
          <Link href="/author" className="inline-flex items-center text-sm font-sans tracking-widest uppercase text-white hover:text-site-accent transition-colors group">
            <span className="border-b border-white/30 group-hover:border-site-accent pb-1">Read Full Story</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Right side: Image with Parallax */}
      <div className="w-full md:w-[60%] h-1/2 md:h-full relative overflow-hidden bg-site-bg z-0">
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `translateX(${isActive ? 0 : 50 * speedRatio}vw)` }}
        >
          <Image
            src="/images/author.jpg"
            alt="Andrew J. Key Jr."
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
          {/* Subtle fade to blend with left side */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent hidden md:block" />
        </div>
      </div>
    </BasePanel>
  );
}
