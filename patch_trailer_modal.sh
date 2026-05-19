cat << 'INNER_EOF' > src/components/panels/Panel4Trailer.tsx
import { BasePanel } from './BasePanel';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import Image from 'next/image';

export function Panel4Trailer({ isActive, onContinue }: { isActive: boolean, onContinue: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = 'https://drive.google.com/file/d/1oduQou4JRDfq35Rj3TeXwiHk5vk1Jb2d/preview';

  // Close modal when navigating away
  useEffect(() => {
    if (!isActive) {
      setIsModalOpen(false);
    }
  }, [isActive]);

  return (
    <BasePanel isActive={isActive} className="bg-site-surface flex flex-col items-center justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-site-accent/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className={cn(
        "relative flex flex-col items-center justify-center z-10 transition-all duration-1000 delay-300",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Watch the Trailer Button replacing the inline player */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-col items-center gap-6 cursor-pointer"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-site-accent/90 text-site-bg shadow-[0_0_40px_rgba(226,194,117,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-site-accent">
            <Play size={40} className="ml-2" fill="currentColor" />
          </div>
          <span className="font-serif text-3xl md:text-5xl text-white tracking-widest drop-shadow-md transition-colors group-hover:text-site-accent">
            WATCH THE TRAILER
          </span>
        </button>

        <button
          onClick={onContinue}
          className="mt-16 px-8 py-3 rounded-full border border-site-accent/30 text-site-accent hover:bg-site-accent hover:text-site-bg transition-all duration-300 font-sans tracking-wide"
        >
          Continue &rarr;
        </button>
      </div>

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="w-[90vw] h-[80vh] max-w-6xl relative">
            <iframe
              src={videoUrl}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="w-full h-full border-0 absolute top-0 left-0 rounded-xl shadow-2xl"
              title="Main Trailer"
            ></iframe>
          </div>
        </div>
      )}
    </BasePanel>
  );
}
INNER_EOF
