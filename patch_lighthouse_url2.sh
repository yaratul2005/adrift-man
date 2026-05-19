# Ok, photo-1510166089176-b57564a5b7b1 is 404. Let's use the one we used originally which worked.
# Wait, I originally used photo-1518837695005-2083093ee35b which works perfectly.
# The user wants "red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA"
# The Unsplash ID is F_zec7P_OwA. I can construct the URL like this:
# https://source.unsplash.com/F_zec7P_OwA/1920x1080
sed -i 's/https:\/\/images.unsplash.com\/photo-[0-9a-z-]*?auto=format\&fit=crop\&q=80\&w=1920/https:\/\/source.unsplash.com\/F_zec7P_OwA\/1920x1080/g' src/components/panels/Panel1Lighthouse.tsx
