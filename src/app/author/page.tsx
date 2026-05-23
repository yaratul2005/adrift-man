import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

export default function AuthorPage() {
  return (
    <SectionWrapper padding="none" className="bg-site-bg min-h-screen">

      {/* ─── HERO: Side-by-Side Design ─── */}
      <div className="relative w-full min-h-[70vh] flex flex-row items-center overflow-hidden bg-[#05070B]">
        {/* Left Side: Typography and Details */}
        <div className="relative z-20 w-[60%] md:w-1/2 flex flex-col justify-center pl-6 pr-2 md:pl-16 lg:pl-32 xl:pl-48 pt-32 pb-24">
          <FadeUp delay={0.2}>
            <p className="font-sans text-[8px] md:text-xs tracking-[0.45em] text-site-accent uppercase mb-2 md:mb-4 drop-shadow-md">
              About the Author
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-5xl lg:text-7xl tracking-wide leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl">
              <span className="text-white">Andrew</span><br />
              <span className="text-gradient">J. Key Jr.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-light leading-relaxed mb-6 md:mb-10 max-w-xl pr-2 md:pr-0 z-20">
              Retired U.S. Coast Guard Lieutenant-Commander. Husband. Father. Author.
              <br className="hidden md:block" />
              <span className="text-site-accent/90 italic">A life shaped by duty, loss, faith — and the unseen forces that changed everything.</span>
            </p>
          </FadeUp>

          {/* Stats Container - Non-floating */}
          <FadeUp delay={0.6}>
            <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 z-20">
              <div className="flex flex-col items-start">
                <span className="font-serif text-xl md:text-2xl text-site-accent font-semibold drop-shadow-md">27+</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Years of Service</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col items-start">
                <span className="font-serif text-xl md:text-2xl text-site-accent font-semibold drop-shadow-md">Lt. Commander</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Final Rank</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col items-start">
                <span className="font-serif text-xl md:text-2xl text-site-accent font-semibold drop-shadow-md">1957</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Enlisted</span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Right Side: Image with Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] md:w-1/2 z-10">
           <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/80 to-transparent z-10 pointer-events-none" />
           <div className="relative w-full h-full -z-10">
             <Image
                src="/images/author.jpg"
                alt="Andrew J. Key Jr. — Official U.S. Coast Guard Portrait"
                fill
                className="object-cover object-center"
                priority
             />
           </div>
        </div>
      </div>

      {/* ─── CONTENT SECTIONS ─── */}
      <SectionWrapper padding="xl" className="pt-8">
        <div className="mx-auto max-w-4xl space-y-16">

          <FadeUp delay={0.1}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Early Life</h2>
              <div className="font-sans text-lg text-white/80 leading-relaxed space-y-5 font-light">
                <p>
                  I was born in the vibrant city of San Antonio, TX, in the late 1930s to a nurturing stay-at-home mom and father who had firm principles.
                </p>
                <p>
                  I began working early, at just twelve, and by sixteen, I had left school behind. At seventeen, I embarked on a journey with the U.S. Coast Guard, a branch of the U.S. Armed Forces, beginning a career which would take me through rigorous training and multiple relocations.
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp delay={0.15}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Coast Guard Years</h2>
              <div className="font-sans text-lg text-white/80 leading-relaxed space-y-5 font-light">
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

          {/* Aircraft image break */}
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
                <Image
                  src="/images/ocean-bg.jpg"
                  alt="U.S. Coast Guard seaplane No. 1285 — water landing, c. 1950s"
                  fill
                  className="object-cover saturate-0 group-hover:saturate-50 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-3 left-4 font-sans text-[10px] tracking-[0.25em] uppercase text-site-accent/70">USCG Seaplane · c. 1950s</p>
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
                <Image
                  src="/images/military-ph.jpg"
                  alt="U.S. Coast Guard HU-16 Albatross No. 7250 in flight"
                  fill
                  className="object-cover saturate-50 group-hover:saturate-100 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-3 left-4 font-sans text-[10px] tracking-[0.25em] uppercase text-site-accent/70">HU-16 Albatross No. 7250</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <section className="glass-panel p-8 md:p-12 rounded-2xl">
              <h2 className="font-serif text-3xl text-site-accent mb-6">Personal Transformation</h2>
              <div className="font-sans text-lg text-white/80 leading-relaxed space-y-5 font-light">
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
              <div className="font-sans text-lg text-white/80 leading-relaxed space-y-5 font-light relative z-10">
                <p>
                  After my Coast Guard days, I explored new horizons, working with aerospace companies and later as a District Lighting Engineer for a major lighting manufacturer before transitioning to full retirement in 1995.
                </p>
                <p>
                  Marie and I spent the next thirty years touring the country in our RV in the Summertime, spending our Winters in Continental Country Club in central Florida before relocating to Sun City West, Arizona in 2011. In 2007, we found a cozy little mountain retreat near Flagstaff where we enjoyed the beauty of nature from June to October each year.
                </p>
                <p className="pt-4 border-t border-white/10 italic text-white/90">
                  Sadly, I lost Marie, the love of my life to an incurable disease on the day after Thanksgiving 2021.
                </p>
              </div>
            </section>
          </FadeUp>

        </div>
      </SectionWrapper>

    </SectionWrapper>
  );
}
