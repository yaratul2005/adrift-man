import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function FinalCallToActionSection() {
  return (
    <SectionWrapper id="final-cta" padding="xl" className="bg-[#05070B] border-t border-site-secondary/10 relative overflow-hidden">
      
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg aspect-square bg-site-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeUp delay={0.2}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-site-text mb-12 tracking-wide leading-tight drop-shadow-xl">
            Discover the story <br className="hidden md:block" /> behind the <span className="text-gradient">journey.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button asChild size="lg" className="w-full sm:w-auto px-12">
              <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </a>
            </Button>
            
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto px-12 text-site-text hover:text-site-accent hover:bg-site-accent/5">
              <Link href="#trailer">
                Watch Trailer
              </Link>
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={0.6}>
          <p className="font-serif text-lg md:text-xl text-site-secondary/70 italic tracking-widest mt-12 md:mt-24">
            Are you still counting?
          </p>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
