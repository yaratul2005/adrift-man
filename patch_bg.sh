# The user explicitly asked for the background image: "https://unsplash.com/photos/red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA"
# We know the ID is F_zec7P_OwA but without the direct URL, Next.js / Image component can't render it directly if we just pass the unsplash page URL.
# Wait, actually Unsplash photos can be accessed via source.unsplash.com. But source.unsplash.com was discontinued and returns 503 as seen.
# Let's use another direct red-and-white lighthouse image ID from Unsplash. Or wait, does the user want this exact image? Yes.
# Let me try to search unsplash for the direct image URL using curl on api or search.
