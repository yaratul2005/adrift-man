'use client';

import { useState, useEffect } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import ReactPlayer from 'react-player';

const videos = [
  {
    url: '/video/02 - Podcast.MOV',
    title: 'Podcast Interview',
    description: 'A deep dive into the author\'s life story and the inspiration behind Adrift.'
  },
  {
    url: '/video/03 - lv_0_20241003225759.mp4',
    title: 'The Journey Continues',
    description: 'Additional thoughts and reflections.'
  },
  {
    url: '/video/04 - Booksigning_SA_5_15_24- Made with Clipchamp.mp4',
    title: 'Book Signing Event',
    description: 'Highlights from the book signing event on May 15, 2024.'
  },
  {
    url: '/video/05 - My Intro to Adrift.mov',
    title: 'My Intro to Adrift',
    description: 'A personal introduction to the book and its message.'
  },
];

export default function VideoPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
              <div className="relative w-full aspect-video bg-black/50">
                {isMounted && (
                  <ReactPlayer
                    url={video.url}
                    width="100%"
                    height="100%"
                    controls={true}
                    className="absolute top-0 left-0"
                  />
                )}
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

