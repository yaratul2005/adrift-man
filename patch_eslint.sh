sed -i 's/setShowText(false);/setTimeout(() => setShowText(false), 0);/g' src/components/panels/Panel1Lighthouse.tsx
sed -i 's/setAnimateLine(false);/setTimeout(() => setAnimateLine(false), 0);/g' src/components/panels/Panel2TitleCard.tsx
sed -i 's/setIsPlaying(false);/setTimeout(() => setIsPlaying(false), 0);/g' src/components/panels/Panel4Trailer.tsx
sed -i 's/startNextTimer();/setTimeout(() => startNextTimer(), 0);/g' src/hooks/useCinematicPlayer.ts
