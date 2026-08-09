import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import testimonialBubble from '@/assets/images/testimonial-bubble.svg';
import carouselArrowLeft from '@/assets/icons/carousel-arrow-left.svg';
import carouselArrowRight from '@/assets/icons/carousel-arrow-right.svg';
import carouselStars from '@/assets/icons/carousel-stars.svg';

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
    <div className="flex w-full flex-col items-center gap-12 rounded-card bg-brand-gray px-6 py-12 sm:gap-16 sm:px-16 sm:py-16">
      <div className="flex w-full flex-col items-stretch gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
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
        <img src={carouselStars} alt="5 star rating" className="h-[14px] w-auto" />
        <button type="button" aria-label="Next testimonial" onClick={goNext}>
          <img src={carouselArrowRight} alt="" className="h-[22px] w-auto" />
        </button>
      </div>
    </div>
  );
}
