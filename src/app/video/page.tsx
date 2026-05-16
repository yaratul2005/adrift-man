'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';

const videos = [
  {
    url: 'https://drive.google.com/file/d/1vDFU_0GQ5ibgNLKptsGknwZgIvO57IFw/preview',
    title: 'Podcast Interview',
    description: 'A deep dive into the author\'s life story and the inspiration behind Adrift.'
  },
  {
    url: 'https://drive.google.com/file/d/1G77enYcfJtPfrOJtQL6zn_PWhSD5zJH2/preview',
    title: 'Adrift Author\'s Life Journey',
    description: 'A personal look into the author\'s incredible life journey.'
  },
  {
    url: 'https://drive.google.com/file/d/1R36J148eiLVdiywC_Ftbu8S2W1_wVdvh/preview',
    title: 'Book Signing Session',
    description: 'Highlights from the official book signing event.'
  },
  {
    url: 'https://drive.google.com/file/d/1ftF6hNt0zYrHTkM74P99lDd8DYpz2_Lc/preview',
    title: 'Book Introduction',
    description: 'An overview of the themes and messages found in Adrift.'
  },
];

export default function VideoPage() {
  return (
    <SectionWrapper padding="xl" className="mt-20 min-h-screen">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <FadeUp>
          <p className="font-sans text-xs tracking-[0.35em] text-site-accent/70 uppercase mb-4">
            Watch & Listen
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-site-text tracking-wide drop-shadow-xl mb-6">
            Video <span className="text-gradient">Hub</span>
          </h1>
          <p className="font-sans text-lg text-site-secondary font-light max-w-xl mx-auto">
            Explore podcasts, author introductions, and event highlights that bring the story of <em>Adrift</em> to life.
          </p>
        </FadeUp>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {videos.map((video, index) => (
          <FadeUp key={index} delay={index * 0.1}>
            <div className="bg-site-surface border border-white/[0.06] rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
              <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                <iframe
                  src={video.url}
                  width="100%"
                  height="100%"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  className="w-full h-full border-0 absolute top-0 left-0"
                  style={{ border: 'none' }}
                  title={video.title}
                ></iframe>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl text-site-text mb-2">{video.title}</h3>
                <p className="font-sans text-sm text-site-secondary/80 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}

