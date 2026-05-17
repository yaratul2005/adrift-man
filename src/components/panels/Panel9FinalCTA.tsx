import { BasePanel } from './BasePanel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StoreButton } from '@/components/ui/StoreButton';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';
const INSTAGRAM_URL = 'https://www.instagram.com/andrew.key.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61556330845904';

// Crisp inline SVG icons
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Panel9FinalCTA({ isActive, speedRatio = 0.3 }: { isActive: boolean, speedRatio?: number }) {
  return (
    <BasePanel isActive={isActive} className="bg-black text-center flex flex-col justify-center items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-[1200ms] ease-in-out"
        style={{ transform: `translateX(${isActive ? 0 : 50 * speedRatio}vw)` }}
      >
        <Image
          src="/images/ocean-bg.jpg"
          alt="Dark ocean"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">

        <h1 className={cn(
          "font-serif text-6xl md:text-8xl tracking-[0.2em] text-white mb-4 transition-all duration-1000 delay-300",
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          ADRIFT
        </h1>

        <p className={cn(
          "font-sans text-lg md:text-xl text-site-accent tracking-wide font-light italic mb-2 transition-all duration-1000 delay-400",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          How God&apos;s Agents Helped Me Transform My Life
        </p>

        <p className={cn(
          "font-sans text-sm tracking-[0.2em] text-white/50 uppercase mb-12 transition-all duration-1000 delay-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          by Andrew J. Key Jr.
        </p>

        {/* CTA Buttons */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-600",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <StoreButton
            href={AMAZON_URL}
            logo="/images/logos/amazon.jpg"
            logoAlt="Amazon"
            sublabel="Buy on"
            label="Amazon"
            className="w-full sm:w-auto"
          />
          <StoreButton
            href={BN_URL}
            logo="/images/logos/barnes_noble.png"
            logoAlt="Barnes & Noble"
            sublabel="Buy on"
            label="Barnes & Noble"
            className="w-full sm:w-auto"
          />
        </div>

        {/* Social Icons */}
        <div className={cn(
          "flex gap-6 mb-16 transition-all duration-1000 delay-700",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pink-400 transition-colors">
            <InstagramIcon size={24} />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-blue-400 transition-colors">
            <FacebookIcon size={24} />
          </a>
        </div>

        {/* Footer info */}
        <p className={cn(
          "font-sans text-xs text-white/30 transition-all duration-1000 delay-800",
          isActive ? "opacity-100" : "opacity-0"
        )}>
          &copy; {new Date().getFullYear()} Andrew J. Key Jr. All rights reserved.
        </p>
      </div>
    </BasePanel>
  );
}
