sed -i '/<<<<<<< Updated upstream/,/=======\|>>>>>>> Stashed changes/d' src/components/layout/GlobalNavigation.tsx
sed -i 's/>>>>>>> Stashed changes//g' src/components/layout/GlobalNavigation.tsx
