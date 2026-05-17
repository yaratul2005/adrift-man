import { BasePanel } from './BasePanel';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const reviews = [
  { quote: "A powerful testimony of faith, resilience, and redemption.", author: "Bill Senter" },
  { quote: "A gripping and heartwarming story of transformation.", author: "Rhonda J." },
  { quote: "Even in the darkest moments, faith can pull you through.", author: "John M." }
];

export function Panel6Reviews({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-[#0D131C] relative">
      {/* Background Texture / Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-transform duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translateX(${isActive ? 0 : 50 * speedRatio}vw)`
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-20">
        <h2 className={cn(
          "font-sans text-xs tracking-[0.3em] text-white/50 uppercase mb-16 transition-all duration-1000",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        )}>
          What Readers Are Saying
        </h2>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col items-center text-center transition-all duration-1000",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${300 + idx * 300}ms` }}
            >
              <Quote className="text-site-accent/30 w-10 h-10 mb-6" />
              <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-6 font-light">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="h-[1px] w-12 bg-site-accent/50 mb-4" />
              <p className="font-sans text-sm text-site-accent tracking-[0.2em] uppercase">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BasePanel>
  );
}
