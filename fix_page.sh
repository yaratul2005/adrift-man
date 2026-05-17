#!/bin/bash
# Re-apply our clean version of page.tsx because the original one we overwrote had a merge conflict
# since someone else also tried to rebuild the homepage differently
cat << 'INNER_EOF' > src/app/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useCinematicPlayer, PanelConfig } from '@/hooks/useCinematicPlayer';
import { Panel1Lighthouse } from '@/components/panels/Panel1Lighthouse';
import { Panel2TitleCard } from '@/components/panels/Panel2TitleCard';
import { Panel3StoryHook } from '@/components/panels/Panel3StoryHook';
import { Panel4Trailer } from '@/components/panels/Panel4Trailer';
import { Panel5Book } from '@/components/panels/Panel5Book';
import { Panel6Reviews } from '@/components/panels/Panel6Reviews';
import { Panel7Author } from '@/components/panels/Panel7Author';
import { Panel8Gallery } from '@/components/panels/Panel8Gallery';
import { Panel9FinalCTA } from '@/components/panels/Panel9FinalCTA';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const PANELS: PanelConfig[] = [
  { id: 'panel-1', dwellTime: 7000 },
  { id: 'panel-2', dwellTime: 5000 },
  { id: 'panel-3', dwellTime: 8000 },
  { id: 'panel-4', dwellTime: 0, pauseOnPanel: true }, // Pause on trailer
  { id: 'panel-5', dwellTime: 9000 },
  { id: 'panel-6', dwellTime: 9000 },
  { id: 'panel-7', dwellTime: 8000 },
  { id: 'panel-8', dwellTime: 7000 },
  { id: 'panel-9', dwellTime: 0, isFinal: true }, // Final
];

export default function Home() {
  const {
    currentPanelIndex,
    isPlaying,
    togglePlay,
    play,
    goToPanel,
    nextPanel,
    prevPanel
  } = useCinematicPlayer(PANELS, 1500);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPanel();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPanel, prevPanel]);

  // Touch handling for mobile swipe / desktop drag
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setTouchEnd(null);
    if ('touches' in e) {
      setTouchStart((e as React.TouchEvent).targetTouches[0].clientX);
    } else {
      setTouchStart((e as React.MouseEvent).clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e) {
      setTouchEnd((e as React.TouchEvent).targetTouches[0].clientX);
    } else if (touchStart !== null) {
      setTouchEnd((e as React.MouseEvent).clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPanel();
    } else if (isRightSwipe) {
      prevPanel();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-site-bg">
      {/* Horizontal Track Container */}
      <div
        ref={containerRef}
        className="flex flex-row h-full transition-transform duration-[1200ms] ease-in-out"
        style={{
          width: \`calc(100vw * \${PANELS.length})\`,
          transform: \`translateX(-\${currentPanelIndex * 100}vw)\`
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
        onMouseLeave={onTouchEnd}
      >
        <Panel1Lighthouse isActive={currentPanelIndex === 0} speedRatio={0.3} />
        <Panel2TitleCard isActive={currentPanelIndex === 1} speedRatio={0.3} />
        <Panel3StoryHook isActive={currentPanelIndex === 2} speedRatio={0.3} />
        <Panel4Trailer isActive={currentPanelIndex === 3} onContinue={() => { nextPanel(); play(); }} />
        <Panel5Book isActive={currentPanelIndex === 4} speedRatio={0.3} />
        <Panel6Reviews isActive={currentPanelIndex === 5} speedRatio={0.3} />
        <Panel7Author isActive={currentPanelIndex === 6} speedRatio={0.3} />
        <Panel8Gallery isActive={currentPanelIndex === 7} speedRatio={0.3} />
        <Panel9FinalCTA isActive={currentPanelIndex === 8} speedRatio={0.3} />
      </div>

      {/* Progress Indicator (Dot-Nav) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
        {PANELS.map((panel, idx) => (
          <div key={panel.id} className="flex items-center">
            <button
              onClick={() => goToPanel(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === currentPanelIndex
                  ? "bg-white w-3 h-3 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={\`Go to panel \${idx + 1}\`}
            />
            {idx < PANELS.length - 1 && (
              <div className="w-4 h-[1px] bg-white/20 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Play/Pause Toggle */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all duration-300 shadow-lg"
        aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
      >
        {isPlaying ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" className="ml-1" />
        )}
      </button>
    </div>
  );
}
INNER_EOF
