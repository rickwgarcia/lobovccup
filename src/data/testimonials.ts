import type { Testimonial } from '@/types/content';

// Placeholder content — the Figma design repeats one identical "Positivus"
// boilerplate testimonial 3 times. Replace each entry with a real quote
// from a 2026 participant.
export const testimonials: Testimonial[] = [1, 2, 3].map((n) => ({
  id: `testimonial-${n}`,
  quote: `[Testimonial quote ${n}]`,
  name: `[Name ${n}]`,
  title: '[Title]',
  rating: 5,
}));
