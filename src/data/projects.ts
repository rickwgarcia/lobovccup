import type { ProjectSpotlight } from '@/types/content';

// Placeholder content — the Figma design reuses one unrelated stock
// "Queue Skin" dermatology-startup blurb across all 4 cards. Replace each
// entry with a real 2026 cohort project once available.
export const projectSpotlights: ProjectSpotlight[] = [1, 2, 3, 4].map((n) => ({
  id: `project-${n}`,
  name: `[Project Name ${n}]`,
  description: '[One-line project description]',
  imageAlt: `[Project ${n} embed or screenshot]`,
  imageSide: n % 2 === 1 ? 'left' : 'right',
}));
