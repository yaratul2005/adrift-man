import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

export default function AuthorPage() {
  return (
    <SectionWrapper padding="none" className="bg-site-bg min-h-screen">

      {/* ─── HERO: Creative Floating Design ─── */}
      <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 px-4">

        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-[800px] bg-site-accent/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Global Keyframes for floating animation (injected into a style tag) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          @keyframes floatFast {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-1deg); }
          }
          @keyframes floatMedium {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
          .animate-float-fast { animation: floatFast 4s ease-in-out infinite; }
          .animate-float-medium { animation: floatMedium 5s ease-in-out infinite; }
        `}} />

        {/* Central Image Container */}
        <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 group mb-16">
          <Image
            src="/images/author.jpg"
            alt="Andrew J. Key Jr. — Official U.S. Coast Guard Portrait"
            fill
            priority
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Overlay Title */}
          <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 flex flex-col items-center justify-end text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            <FadeUp delay={0.2}>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.45em] text-site-accent uppercase mb-4 drop-shadow-md">
                About the Author
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <h1 className="font-serif text-4xl md:text-6xl tracking-wide leading-[1.1] drop-shadow-2xl">
                <span className="text-white">Andrew</span><br />
                <span className="text-gradient">J. Key Jr.</span>
              </h1>
            </FadeUp>
          </div>

          {/* Floating Stat Tags */}

          {/* Top Right - Years of Service */}
          <div className="absolute -top-4 -right-4 md:top-8 md:-right-12 z-20 animate-float-slow transition-transform duration-300 hover:scale-110">
            <FadeUp delay={0.6}>
              <div className="flex flex-col items-center px-4 md:px-6 py-2 md:py-3 rounded-xl bg-[#05070B]/70 backdrop-blur-md border border-white/10 shadow-xl">
                <span className="font-serif text-xl md:text-2xl text-site-accent font-semibold drop-shadow-md">27+</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Years of Service</span>
              </div>
            </FadeUp>
          </div>

          {/* Middle Left - Final Rank */}
          <div className="absolute top-1/2 -left-6 md:top-1/3 md:-left-16 -translate-y-1/2 z-20 animate-float-medium transition-transform duration-300 hover:scale-110" style={{ animationDelay: '1s' }}>
            <FadeUp delay={0.7}>
              <div className="flex flex-col items-center px-4 md:px-6 py-2 md:py-3 rounded-xl bg-[#05070B]/70 backdrop-blur-md border border-white/10 shadow-xl">
                <span className="font-serif text-lg md:text-xl text-site-accent font-semibold drop-shadow-md text-center">Lt. Commander</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Final Rank</span>
              </div>
            </FadeUp>
          </div>

          {/* Bottom Right - Enlisted */}
          <div className="absolute bottom-32 -right-4 md:bottom-24 md:-right-8 z-20 animate-float-fast transition-transform duration-300 hover:scale-110" style={{ animationDelay: '2s' }}>
            <FadeUp delay={0.8}>
              <div className="flex flex-col items-center px-4 md:px-6 py-2 md:py-3 rounded-xl bg-[#05070B]/70 backdrop-blur-md border border-white/10 shadow-xl">
                <span className="font-serif text-xl md:text-2xl text-site-accent font-semibold drop-shadow-md">1957</span>
                <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase mt-1">Enlisted</span>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Description Below Image */}
        <div className="relative z-10 max-w-2xl text-center px-4">
          <FadeUp delay={1.0}>
            <p className="font-sans text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
              Retired U.S. Coast Guard Lieutenant-Commander. Husband. Father. Author.
              <br className="hidden md:block" />
              <span className="text-site-accent/90 italic"> A life shaped by duty, loss, faith — and the unseen forces that changed everything.</span>
            </p>
          </FadeUp>
          {/* Bottom decorative line */}
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-site-accent/50 to-transparent" />
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
