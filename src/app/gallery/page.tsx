import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';

export default function GalleryPage() {
  return (
    <SectionWrapper padding="xl" className="mt-20">
      <FadeUp>
        <h1 className="font-serif text-4xl md:text-5xl text-site-text mb-8">Photo Gallery</h1>
        <p className="font-sans text-lg text-site-secondary">Photography organized by Military, Family, and Life Journey categories will go here.</p>
      </FadeUp>
    </SectionWrapper>
  );
}
