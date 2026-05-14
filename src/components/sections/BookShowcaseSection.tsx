import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import { StoreButton } from '@/components/ui/StoreButton';
import Image from 'next/image';
import Link from 'next/link';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';

export function BookShowcaseSection() {
  return (
    <SectionWrapper id="book" padding="xl" className="bg-site-surface border-y border-white/[0.05] relative overflow-hidden">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-site-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Book Cover with Glow */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] bg-site-accent/20 blur-3xl rounded-[2rem] pointer-events-none" />
            
            <FadeUp delay={0.2} className="w-full max-w-[320px] lg:max-w-[400px]">
              <div className="relative aspect-[2/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden group border border-white/10">
                <Image
                  src="/images/book-front.jpeg"
                  alt="Adrift — How God's Agents Helped Me Transform My Life, by Andrew J. Key Jr."
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </FadeUp>
          </div>

          {/* Book Info + CTAs */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <FadeUp delay={0.3}>
              <p className="font-sans text-xs tracking-[0.35em] text-site-accent/90 uppercase mb-3">
                Now Available
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-3">
                <span className="text-gradient">Adrift</span>
              </h2>
              <p className="font-sans text-sm tracking-wide text-site-secondary/70 mb-6 italic">
                How God&apos;s Agents Helped Me Transform My Life
              </p>
            </FadeUp>
            
            <FadeUp delay={0.5}>
              <p className="font-sans text-lg text-white/80 leading-relaxed mb-10 tracking-wide font-light max-w-lg mx-auto md:mx-0">
                A deeply personal memoir of transformation — revealing how moments of crisis, chance encounters, and unseen guidance shaped one man&apos;s life against all odds.
              </p>
            </FadeUp>

            {/* Retailer Store Buttons with Logos */}
            <FadeUp delay={0.6}>
              <div className="mb-3">
                <p className="font-sans text-[10px] tracking-[0.3em] text-site-text/70 uppercase mb-4 text-center md:text-left">
                  Available at
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <StoreButton
                    href={AMAZON_URL}
                    logo="/images/logos/amazon.jpg"
                    logoAlt="Amazon"
                    sublabel="Buy on"
                    label="Amazon"
                  />
                  <StoreButton
                    href={BN_URL}
                    logo="/images/logos/barnes_noble.png"
                    logoAlt="Barnes & Noble"
                    sublabel="Buy on"
                    label="Barnes & Noble"
                  />
                </div>
              </div>
            </FadeUp>

            {/* Secondary text link */}
            <FadeUp delay={0.7}>
              <div className="flex justify-center md:justify-start">
                <Button asChild variant="link" size="sm" className="text-site-text/60 hover:text-site-accent text-sm px-0">
                  <Link href="/author">
                    Learn about the author →
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
