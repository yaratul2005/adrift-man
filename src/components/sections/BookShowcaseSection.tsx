import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export function BookShowcaseSection() {
  return (
    <SectionWrapper id="book" padding="xl" className="bg-site-surface border-y border-white/[0.05] relative overflow-hidden">
      
      {/* Subtle ambient glow behind the book section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-site-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Book Cover Image with Glow */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* Soft glowing shadow for the book */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] bg-site-accent/20 blur-3xl rounded-[2rem] pointer-events-none" />
            
            <FadeUp delay={0.2} className="w-full max-w-[320px] lg:max-w-[400px]">
              <div className="relative aspect-[2/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden group border border-white/10">
                <Image
                  src="/images/book-front.jpeg"
                  alt="Adrift Book Cover"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle reflection over the cover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </FadeUp>
          </div>

          {/* Book Description & CTAs */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <FadeUp delay={0.4}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                <span className="text-gradient">Adrift</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.5}>
              <p className="font-sans text-xl text-site-text/80 leading-relaxed mb-12 tracking-wide font-light max-w-lg mx-auto md:mx-0">
                Adrift is a deeply personal memoir of transformation, revealing how moments of crisis, chance encounters, and unseen guidance shaped one man&apos;s life.
              </p>
            </FadeUp>

            <FadeUp delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
                <Button asChild size="lg" className="w-full sm:w-auto px-8">
                  <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                  </a>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  <Link href="/author">
                    Read the Story
                  </Link>
                </Button>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
