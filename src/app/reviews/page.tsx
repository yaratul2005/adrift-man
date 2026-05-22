import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { Quote } from 'lucide-react';

const fullReviews = [
  {
    quote: "Adrift is a compelling, well-written story about God's hands in our lives through thick and thin. Andy is an engaging storyteller, and this book is a gift from his heart.",
    author: "Amazon Reviewer"
  },
  {
    quote: "A powerful testimony of faith, resilience, and redemption.",
    author: "Bill Senter"
  },
  {
    quote: "A gripping and heartwarming story of transformation.",
    author: "Rhonda J."
  },
  {
    quote: "Even in the darkest moments, faith can pull you through.",
    author: "John M."
  },
  {
    quote: "A soul-stirring journey of divine guidance.",
    author: "James Nelson"
  }
];

export default function ReviewsPage() {
  return (
    <SectionWrapper padding="xl" className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <FadeUp>
          <h1 className="font-serif text-5xl md:text-6xl text-site-text tracking-wide drop-shadow-xl mb-6">
            Reader <span className="text-gradient">Reviews</span>
          </h1>
          <p className="font-sans text-xl text-site-secondary font-light">
            Discover what others are saying about Adrift.
          </p>
        </FadeUp>
      </div>

      <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
        {fullReviews.map((review, index) => (
          <FadeUp key={index} delay={0.1 * index}>
            <div className="h-full glass-panel p-8 md:p-12 rounded-2xl flex flex-col justify-between group hover:border-site-accent/30 hover:shadow-[0_8px_32px_rgba(226,194,117,0.1)] transition-all duration-500">
              <div>
                <Quote className="text-site-accent/30 mb-8 h-10 w-10 group-hover:text-site-accent/50 transition-colors duration-500" />
                <p className="font-serif text-xl md:text-2xl text-site-text/90 leading-relaxed mb-8 tracking-wide font-light">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center mt-auto">
                <div className="h-[2px] w-10 bg-gradient-to-r from-site-accent to-transparent mr-4" />
                <p className="font-sans font-medium text-site-accent tracking-[0.2em] text-xs uppercase">
                  {review.author}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.4}>
        <div className="text-center mt-16 flex flex-col items-center">
          <p className="text-site-secondary/80 font-sans tracking-wide mb-6">
            More reviews available on:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.amazon.com/Adrift-Gods-Agents-Helped-Transform/dp/B0CWPV45NW"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-48 h-16 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center p-2 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-white/10 hover:border-site-accent/30"
            >
              <img
                src="/images/logos/amazon.jpg"
                alt="Amazon"
                className="w-full h-full object-contain p-1"
              />
            </a>
            <a
              href="https://www.goodreads.com/book/show/209276776-adrift"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-48 h-16 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center p-2 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-white/10 hover:border-site-accent/30"
            >
              <img
                src="/images/logos/goodreads.png"
                alt="Goodreads"
                className="w-full h-full object-contain p-1"
              />
            </a>
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
