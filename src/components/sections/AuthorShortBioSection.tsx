import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export function AuthorShortBioSection() {
  return (
    <SectionWrapper id="author" padding="xl" className="bg-site-bg">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full md:w-5/12 flex justify-center md:justify-end">
            <FadeUp delay={0.2}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(226,194,117,0.15)] border border-site-accent/20 ring-4 ring-white/5 group">
                <Image
                  src="/images/author.jpg"
                  alt="Andrew J. Key Jr. — U.S. Coast Guard Officer Portrait"
                  fill
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </FadeUp>
          </div>

          <div className="w-full md:w-7/12 text-center md:text-left flex flex-col justify-center">
            <FadeUp delay={0.4}>
              <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-8">
                Andrew J. Key Jr. is a retired Coast Guard Lieutenant Commander whose life journey spans hardship, service, and transformation through faith.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.6}>
              <Button asChild variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-site-accent hover:border-site-accent/50">
                <Link href="/author">
                  Read Full Story &rarr;
                </Link>
              </Button>
            </FadeUp>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
