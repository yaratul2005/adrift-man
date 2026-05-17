import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StoreButton } from '@/components/ui/StoreButton';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';

export function Panel5Book({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-site-surface flex flex-col md:flex-row">
      {/* Left side: Book Cover */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center bg-black/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] bg-site-accent/10 blur-3xl rounded-[2rem] pointer-events-none" />

        <div className={cn(
          "relative aspect-[2/3] w-48 md:w-80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden transition-all duration-1000",
          isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        )}>
          <Image
            src="/images/book-front.jpeg"
            alt="Adrift Book Cover"
            fill
            sizes="(max-width: 768px) 192px, 320px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Right side: Text */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <p className={cn(
          "font-sans text-xs tracking-[0.35em] text-site-accent/90 uppercase mb-3 transition-all duration-1000 delay-300",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Now Available
        </p>

        <h2 className={cn(
          "font-serif text-4xl md:text-6xl text-white mb-6 transition-all duration-1000 delay-400",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Adrift
        </h2>

        <p className={cn(
          "font-sans text-base md:text-lg text-white/80 leading-relaxed mb-10 tracking-wide font-light max-w-lg transition-all duration-1000 delay-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          A deeply personal memoir of transformation — revealing how moments of crisis, chance encounters, and unseen guidance shaped one man&apos;s life against all odds.
        </p>

        {/* CTA Buttons */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
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
    </BasePanel>
  );
}
