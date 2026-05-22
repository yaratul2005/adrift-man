import Link from 'next/link';
import Image from 'next/image';

const AMAZON_URL = 'https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW';
const BN_URL = 'https://www.barnesandnoble.com/w/adrift-jr-andrew-j-key/1144974499?ean=9798890418159';
const INSTAGRAM_URL = 'https://www.instagram.com/andrew.key.10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61556330845904';

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
            <p className="font-sans text-xs text-white/50 mb-6">
              by Andrew J. Key Jr.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Andrew on Instagram"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-pink-400/50 hover:bg-pink-500/10 shadow-[0_0_0_0_rgba(236,72,153,0)] hover:shadow-[0_0_16px_rgba(236,72,153,0.25)] transition-all duration-400"
              >
                <span className="text-white/45 group-hover:text-pink-400 transition-colors duration-300">
                  <InstagramIcon size={17} />
                </span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Andrew on Facebook"
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-blue-400/50 hover:bg-blue-500/10 shadow-[0_0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_16px_rgba(59,130,246,0.25)] transition-all duration-400"
              >
                <span className="text-white/45 group-hover:text-blue-400 transition-colors duration-300">
                  <FacebookIcon size={17} />
                </span>
              </a>
            </div>
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
