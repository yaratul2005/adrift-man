import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

export default function AuthorPage() {
  return (
    <SectionWrapper padding="xl" className="pt-32 pb-24 bg-site-bg min-h-screen">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-[0_0_50px_rgba(226,194,117,0.1)] border border-white/10">
            {/* Using a placeholder for the hero author image, client can swap with a real wide image */}
            <Image
              src="/images/authornow.jpg"
              alt="Andrew J. Key Jr."
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-site-bg via-site-bg/40 to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <h1 className="font-serif text-5xl md:text-6xl text-site-text tracking-wide drop-shadow-xl">
                <span className="text-gradient">Andrew J. Key Jr.</span>
              </h1>
            </div>
          </div>
        </FadeUp>

        <div className="space-y-24">
          
          <FadeUp delay={0.2}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Early Life</h2>
              <div className="font-sans text-lg text-site-text/80 leading-relaxed space-y-6 font-light">
                <p>
                  I was born in the vibrant city of San Antonio, TX, in the late 1930s to a nurturing stay-at-home mom and father who had firm principles.
                </p>
                <p>
                  I began working early, at just twelve, and by sixteen, I had left school behind. At seventeen, I embarked on a journey with the U.S. Coast Guard, a branch of the U.S. Armed Forces, beginning a career which would take me through rigorous training and multiple relocations.
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={0.2}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Coast Guard Years</h2>
              <div className="font-sans text-lg text-site-text/80 leading-relaxed space-y-6 font-light">
                <p>
                  I spent the first few years of my journey attending military training schools and transferring from unit to unit.
                </p>
                <p>
                  I scaled the enlisted ranks to Chief Petty Officer before being promoted to Chief Warrant Officer in 1969. Later, after graduating from a special class of Officer Candidate School, I realized my goal of becoming an unrestricted line officer.
                </p>
                <p>
                  My career blossomed after becoming a regular commissioned officer, attaining the rank of Lieutenant-Commander before retiring in 1984.
                </p>
              </div>
            </section>
          </FadeUp>

          {/* Image Break */}
          <FadeUp delay={0.2}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(226,194,117,0.05)] border border-white/5">
              <Image
                src="/images/family-ph.jpg"
                alt="Family"
                fill
                className="object-cover saturate-50 mix-blend-luminosity opacity-80"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Personal Transformation</h2>
              <div className="font-sans text-lg text-site-text/80 leading-relaxed space-y-6 font-light">
                <p>
                  I survived the storms of a turbulent marriage that brought two wonderful children into my life and multiple separations, divorces, and a remarriage.
                </p>
                <p>
                  In 1966, I finally met Marie, the woman who would become my anchor, providing the stability I needed to refocus my life.
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={0.2}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-site-accent/5 rounded-full blur-[80px] pointer-events-none" />
              <h2 className="font-serif text-3xl text-site-accent mb-6 relative z-10">Retirement &amp; Loss</h2>
              <div className="font-sans text-lg text-site-text/80 leading-relaxed space-y-6 font-light relative z-10">
                <p>
                  After my Coast Guard days, I explored new horizons, working with aerospace companies and later as a District Lighting Engineer for a major lighting manufacturer before transitioning to full retirement in 1995.
                </p>
                <p>
                  Marie and I spent the next thirty years touring the country in our RV in the Summertime, spending our Winters in Continental Country Club in central Florida before relocating to Sun City West, Arizona in 2011. In 2007, we found a cozy little mountain retreat near Flagstaff where we enjoyed the beauty of nature from June to October each year.
                </p>
                <p className="pt-4 border-t border-white/10 italic text-site-text/90">
                  Sadly, I lost Marie, the love of my life to an incurable disease on the day after Thanksgiving 2021.
                </p>
              </div>
            </section>
          </FadeUp>

        </div>
      </div>
    </SectionWrapper>
  );
}
