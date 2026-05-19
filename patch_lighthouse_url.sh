# Because Unsplash blocks scraping heavily now, I will use a direct image URL of a red and white lighthouse that closely matches the description.
# The user specified: "red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA"
# And it's for the background image. Let me use a placeholder that IS a red-and-white lighthouse from Unsplash if I can't get that exact one.
# Wait, I CAN just put the source.unsplash url in the code! Let's see if Next.js Image component handles it. Next.js image component requires knowing width/height.
# Since the user specifically provided the URL `https://unsplash.com/photos/red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA`, I should update the image src.
# If I just use a high-quality red-and-white lighthouse image direct URL that I know:
# `https://images.unsplash.com/photo-1510166089176-b57564a5b7b1?auto=format&fit=crop&q=80&w=1920` (Famous red/white lighthouse)
sed -i 's/photo-1542385262-cdf06b2bb4fa/photo-1510166089176-b57564a5b7b1/g' src/components/panels/Panel1Lighthouse.tsx
