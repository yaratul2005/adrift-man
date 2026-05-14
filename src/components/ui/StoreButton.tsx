import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StoreButtonProps {
  href: string;
  logo: string;
  logoAlt: string;
  label: string;
  sublabel?: string;
  className?: string;
}

export function StoreButton({ href, logo, logoAlt, label, sublabel, className }: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex items-center gap-4 pl-4 pr-6 py-3.5 rounded-2xl',
        'bg-white/[0.04] border border-white/[0.08]',
        'hover:bg-white/[0.08] hover:border-site-accent/30',
        'shadow-[0_2px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_30px_rgba(226,194,117,0.1)]',
        'transition-all duration-400 ease-out hover:-translate-y-0.5',
        'backdrop-blur-md min-w-[200px]',
        className
      )}
      aria-label={`Buy Adrift on ${logoAlt}`}
    >
      {/* Logo pill — white bg to show original brand colors */}
      <div className="relative flex-shrink-0 w-20 h-10 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center p-2 shadow-sm">
        <Image
          src={logo}
          alt={logoAlt}
          fill
          className="object-contain p-1.5"
          sizes="80px"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col text-left">
        {sublabel && (
          <span className="font-sans text-[10px] tracking-[0.2em] text-site-secondary/60 uppercase">
            {sublabel}
          </span>
        )}
        <span className="font-sans text-sm font-semibold text-site-text/90 group-hover:text-site-accent transition-colors duration-300 leading-tight">
          {label}
        </span>
      </div>

      {/* Subtle arrow */}
      <span className="ml-auto text-site-secondary/30 group-hover:text-site-accent/70 group-hover:translate-x-1 transition-all duration-300 text-lg leading-none">
        →
      </span>
    </a>
  );
}
