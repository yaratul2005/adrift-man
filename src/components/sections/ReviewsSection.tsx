'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeUp } from '@/components/ui/FadeUp';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
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

export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <SectionWrapper id="reviews" padding="xl" className="bg-[#0D131C]">
      <FadeUp>
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-site-text mb-4">
            What Readers Are Saying
          </h2>
          <div className="h-1 w-16 bg-site-accent mx-auto rounded-full" />
        </div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="relative mx-auto max-w-6xl px-12 mb-16">
          
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-8">
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0 pl-4 md:pl-8 md:flex-[0_0_50%]"
                >
                  <div className="h-full glass-panel p-8 md:p-12 rounded-2xl flex flex-col justify-between group hover:border-site-accent/30 hover:shadow-[0_8px_32px_rgba(226,194,117,0.1)] transition-all duration-500">
                    <div>
                      <Quote className="text-site-accent/30 mb-8 h-12 w-12 group-hover:text-site-accent/50 transition-colors duration-500" />
                      <p className="font-serif text-2xl md:text-3xl text-site-text/90 leading-relaxed mb-10 tracking-wide font-light">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-[2px] w-12 bg-gradient-to-r from-site-accent to-transparent mr-6" />
                      <p className="font-sans font-medium text-site-accent tracking-[0.2em] text-sm uppercase">
                        {review.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center text-site-secondary/50 hover:text-site-accent transition-all duration-300 disabled:opacity-20 hover:scale-110"
            aria-label="Previous review"
          >
            <ChevronLeft size={40} strokeWidth={1.5} />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center text-site-secondary/50 hover:text-site-accent transition-all duration-300 disabled:opacity-20 hover:scale-110"
            aria-label="Next review"
          >
            <ChevronRight size={40} strokeWidth={1.5} />
          </button>

        </div>
      </FadeUp>

      <FadeUp delay={0.4}>
        <div className="text-center mt-12">
          <p className="text-site-secondary/80 font-sans tracking-wide">
            More reviews available on Amazon and Goodreads
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
