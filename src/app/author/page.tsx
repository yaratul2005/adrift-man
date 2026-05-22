import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';

export default function AuthorPage() {
  return (
    <SectionWrapper padding="none" className="bg-site-bg min-h-screen">

      {/* ─── HERO: Split panel — text left, full portrait right ─── */}
      <div className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">

        {/* Left — title + intro */}
        <div className="relative z-10 flex flex-col justify-end lg:justify-center w-full lg:w-1/2 px-8 md:px-16 lg:px-20 pt-40 pb-16 lg:pt-32 lg:pb-24">

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-site-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <FadeUp delay={0.15}>
            <p className="font-sans text-[11px] tracking-[0.45em] text-site-accent/70 uppercase mb-5 relative z-10">
              About the Author
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <h1 className="relative z-10 font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide leading-[1.05] mb-6 drop-shadow-xl">
              <span className="text-white">Andrew</span><br />
              <span className="text-gradient">J. Key Jr.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.45}>
            <p className="relative z-10 font-sans text-lg text-white/70 font-light leading-relaxed max-w-md mb-8">
              Retired U.S. Coast Guard Lieutenant-Commander. Husband. Father. Author.
              A life shaped by duty, loss, faith — and the unseen forces that changed everything.
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="relative z-10 flex flex-wrap gap-4">
              {[
                { label: 'Years of Service', value: '27+' },
                { label: 'Final Rank', value: 'Lt. Commander' },
                { label: 'Enlisted', value: '1957' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <span className="font-serif text-xl text-site-accent font-semibold">{stat.value}</span>
                  <span className="font-sans text-[11px] tracking-[0.2em] text-white/45 uppercase mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Bottom decorative line */}
          <div className="relative z-10 mt-12 h-px w-24 bg-gradient-to-r from-site-accent/50 to-transparent" />
        </div>

        {/* Right — full portrait image */}
        <div className="relative w-full lg:w-1/2 h-[55vh] lg:h-auto lg:min-h-screen flex-shrink-0 overflow-hidden">

          {/* The portrait — object-contain so NO cropping, centred */}
          <div className="absolute inset-0 bg-[#08090d]">
            <Image
              src="/images/author.jpg"
              alt="Andrew J. Key Jr. — Official U.S. Coast Guard Portrait"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Gradient blends into dark bg on left edge so split is seamless */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-site-bg to-transparent pointer-events-none" />
          {/* Bottom fade for mobile */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-site-bg to-transparent pointer-events-none lg:hidden" />

          {/* Subtle gold accent glow behind the portrait */}
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-site-accent/8 rounded-full blur-[80px] pointer-events-none" />
        </div>

        {/* Full-width bottom fade so hero transitions cleanly into content */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-site-bg to-transparent pointer-events-none z-20" />
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
