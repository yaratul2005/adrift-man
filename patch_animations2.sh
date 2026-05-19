# "and on other panels, make text animated appearance, so that users do not waits on static contents."
sed -i 's/opacity-0 -translate-x-12/opacity-0 -translate-x-[20vw] blur-sm/g' src/components/panels/Panel3StoryHook.tsx
sed -i 's/opacity-100 translate-x-0/opacity-100 translate-x-0 blur-0/g' src/components/panels/Panel3StoryHook.tsx

sed -i 's/opacity-0 scale-95/opacity-0 scale-90 blur-md/g' src/components/panels/Panel9FinalCTA.tsx
sed -i 's/opacity-100 scale-100/opacity-100 scale-100 blur-0/g' src/components/panels/Panel9FinalCTA.tsx
