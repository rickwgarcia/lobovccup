import type { MentorItem } from '@/types/content';

// Placeholder content — the Figma design uses unrelated stock
// marketing-agency bios ("John Smith, CEO and Founder", etc.) that don't
// describe real Lobo VC Cup mentors. Replace each entry with real mentor
// info when available.
export const mentors: MentorItem[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `mentor-${n}`,
  name: `[Mentor Name ${n}]`,
  title: '[Mentor Title]',
  bio: '[One-line bio describing this mentor’s background and expertise]',
  photoAlt: `[Mentor ${n} photo]`,
  socialHref: '#',
}));
