import Link from 'next/link';
import Image from 'next/image';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';

const navLinks = [
  { href: '/author', label: 'About Andrew' },
  { href: '/video', label: 'Watch' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
];

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020407] border-t border-white/[0.05]">

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl tracking-[0.2em] text-gradient mb-2">ADRIFT</h2>
            <p className="font-sans text-sm text-white/70 italic leading-relaxed mb-1">
              How God&apos;s Agents Helped Me Transform My Life
            </p>
            <p className="font-sans text-xs text-white/50">
              by Andrew J. Key Jr.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-site-secondary/40 mb-5">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-white/65 hover:text-site-accent transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Store Logos */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-site-secondary/40 mb-5">
              Get the Book
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-site-accent/20 hover:bg-white/[0.06] transition-all duration-300 w-fit"
                aria-label="Buy on Amazon"
              >
                <div className="relative w-16 h-7 rounded-md overflow-hidden bg-white/95 flex-shrink-0">
                  <Image
                    src="/images/logos/amazon.jpg"
                    alt="Amazon"
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <span className="font-sans text-xs text-white/60 group-hover:text-site-accent/80 transition-colors duration-300">
                  amazon.com →
                </span>
              </a>

              <a
                href={BN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-site-accent/20 hover:bg-white/[0.06] transition-all duration-300 w-fit"
                aria-label="Buy on Barnes & Noble"
              >
                <div className="relative w-16 h-7 rounded-md overflow-hidden bg-white/95 flex-shrink-0">
                  <Image
                    src="/images/logos/barnes_noble.png"
                    alt="Barnes & Noble"
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <span className="font-sans text-xs text-site-secondary/60 group-hover:text-site-accent/80 transition-colors duration-300">
                  barnesandnoble.com →
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-white/40">
            &copy; {currentYear} Andrew J. Key Jr. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/25 italic">
            &ldquo;Are you still counting?&rdquo;
          </p>
        </div>
      </div>

    </footer>
  );
}
