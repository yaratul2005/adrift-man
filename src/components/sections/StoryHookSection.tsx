import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';

export function StoryHookSection() {
  return (
    <SectionWrapper id="story-hook" padding="xl" className="bg-site-bg">
      <FadeUp>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-site-text leading-relaxed tracking-wide">
            From a troubled youth to a Coast Guard officer, through personal failure, survival, and loss &mdash; this is a life shaped by forces both seen and unseen.
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
