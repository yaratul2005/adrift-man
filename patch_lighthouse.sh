# To bring more visual diversity as requested while maintaining the aesthetic:
# Lighthouse in Panel 1: https://images.unsplash.com/photo-1542385262-cdf06b2bb4fa?auto=format&fit=crop&q=80&w=1920
# For Panel 3, let's use another dramatic ocean/sea scene: https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?auto=format&fit=crop&q=80&w=1920 (rough sea)
sed -i 's/photo-1542385262-cdf06b2bb4fa/photo-1505159940484-eb2b9f2588e2/g' src/components/panels/Panel3StoryHook.tsx

# For Panel 9 CTA, a calm horizon ocean to end on: https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1920
sed -i 's/photo-1542385262-cdf06b2bb4fa/photo-1518837695005-2083093ee35b/g' src/components/panels/Panel9FinalCTA.tsx

# For Panel 6 Reviews, the existing water wave image is fine as a mix-blend overlay
sed -i 's/photo-1542385262-cdf06b2bb4fa/photo-1518837695005-2083093ee35b/g' src/components/panels/Panel6Reviews.tsx
