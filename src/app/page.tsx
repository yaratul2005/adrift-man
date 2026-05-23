import { ScrollPlane } from "@/components/ui/ScrollPlane";
import { HeroSection } from "@/components/sections/HeroSection";
import { MainTrailerSection } from "@/components/sections/MainTrailerSection";
import { StoryHookSection } from "@/components/sections/StoryHookSection";
import { BookShowcaseSection } from "@/components/sections/BookShowcaseSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { AuthorShortBioSection } from "@/components/sections/AuthorShortBioSection";
import { PhotoStripSection } from "@/components/sections/PhotoStripSection";
import { FinalCallToActionSection } from "@/components/sections/FinalCallToActionSection";

export default function Home() {
  return (
    <>
      <ScrollPlane />
      <HeroSection />
      <MainTrailerSection />
      <StoryHookSection />
      <BookShowcaseSection />
      <ReviewsSection />
      <AuthorShortBioSection />
      <PhotoStripSection />
      <FinalCallToActionSection />
    </>
  );
}
