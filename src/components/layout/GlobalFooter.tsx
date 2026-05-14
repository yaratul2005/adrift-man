import Link from 'next/link';

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-site-bg border-t border-site-secondary/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          <div className="text-center md:text-left">
            <h2 className="font-serif text-xl tracking-wider text-site-text">ADRIFT</h2>
            <p className="text-sm text-site-secondary mt-2 max-w-sm">
              How God&apos;s Agents Helped Me Transform My Life
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-site-secondary">
              &copy; {currentYear} Andrew J. Key Jr. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 justify-center md:justify-end">
              <a href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW" target="_blank" rel="noopener noreferrer" className="text-site-secondary hover:text-site-accent transition-colors text-sm focus-ring rounded-sm outline-none">
                Purchase Book
              </a>
              <Link href="/author" className="text-site-secondary hover:text-site-accent transition-colors text-sm focus-ring rounded-sm outline-none">
                About the Author
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
