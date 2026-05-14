import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';

export default function VideoPage() {
  return (
    <SectionWrapper padding="xl" className="mt-20">
      <FadeUp>
        <h1 className="font-serif text-4xl md:text-5xl text-site-text mb-8">Video Hub</h1>
        <p className="font-sans text-lg text-site-secondary">The primary life story trailer and secondary videos will go here.</p>
      </FadeUp>
    </SectionWrapper>
  );
}
