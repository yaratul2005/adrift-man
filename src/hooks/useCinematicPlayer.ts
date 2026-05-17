import { useState, useEffect, useRef, useCallback } from 'react';

export interface PanelConfig {
  id: string;
  dwellTime: number; // in milliseconds
  pauseOnPanel?: boolean; // If true, auto-play will stop upon reaching this panel
  isFinal?: boolean; // If true, auto-play ends and never resumes
}

export function useCinematicPlayer(panels: PanelConfig[], autoplayDelay: number = 1500) {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startNextTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const currentPanel = panels[currentPanelIndex];

    if (currentPanel.isFinal || !isPlaying) {
      return;
    }

    if (currentPanel.pauseOnPanel) {
      // Pause exactly on this panel without starting a timer for the next one
      setIsPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentPanelIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex < panels.length) {
          return nextIndex;
        }
        return prev;
      });
    }, currentPanel.dwellTime);
  }, [currentPanelIndex, isPlaying, panels]);

  useEffect(() => {
    if (!hasStarted) {
      const initialDelay = setTimeout(() => {
        setHasStarted(true);
        setIsPlaying(true);
      }, autoplayDelay);
      return () => clearTimeout(initialDelay);
    }
  }, [hasStarted, autoplayDelay]);

  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => startNextTimer(), 0);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentPanelIndex, isPlaying, startNextTimer, hasStarted]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const goToPanel = useCallback((index: number) => {
    setCurrentPanelIndex(index);
    setIsPlaying(false);
  }, []);

  const nextPanel = useCallback(() => {
    setCurrentPanelIndex((prev) => {
      if (prev + 1 < panels.length) return prev + 1;
      return prev;
    });
    setIsPlaying(false);
  }, [panels.length]);

  const prevPanel = useCallback(() => {
    setCurrentPanelIndex((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return prev;
    });
    setIsPlaying(false);
  }, []);

  return {
    currentPanelIndex,
    isPlaying,
    togglePlay,
    play,
    pause,
    goToPanel,
    nextPanel,
    prevPanel
  };
}
