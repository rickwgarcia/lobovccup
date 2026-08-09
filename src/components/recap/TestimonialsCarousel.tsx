import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import testimonialBubble from '@/assets/images/testimonial-bubble.svg';
import carouselArrowLeft from '@/assets/icons/carousel-arrow-left.svg';
import carouselArrowRight from '@/assets/icons/carousel-arrow-right.svg';

const VISIBLE_COUNT = 3;

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  const visible = Array.from({ length: Math.min(VISIBLE_COUNT, total) }, (_, offset) => ({
    ...testimonials[(index + offset) % total],
    slot: offset,
  }));

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-card bg-brand-gray px-5 py-8 sm:gap-10 sm:px-10 sm:py-10">
      <div className="flex w-full flex-col items-stretch gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {visible.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`flex w-full min-w-0 flex-1 flex-col items-end gap-5 ${testimonial.slot === 0 ? '' : 'hidden sm:flex'}`}
          >
            <div className="relative w-full max-w-[606px]">
              <img src={testimonialBubble} alt="" className="h-auto w-full" />
              <p className="absolute left-[8.5%] top-[18%] w-[83%] font-grotesk text-sm leading-normal text-black sm:text-body">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="flex w-full flex-col items-end text-right">
              <p className="font-grotesk text-h4 font-medium leading-normal text-black">
                {testimonial.name}
              </p>
              <p className="font-grotesk text-body leading-normal text-black">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[564px] items-center justify-between">
        <button type="button" aria-label="Previous testimonial" onClick={goPrev}>
          <img src={carouselArrowLeft} alt="" className="h-[22px] w-auto" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1} of ${total}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? 'bg-white' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
        <button type="button" aria-label="Next testimonial" onClick={goNext}>
          <img src={carouselArrowRight} alt="" className="h-[22px] w-auto" />
        </button>
      </div>
    </div>
  );
}
