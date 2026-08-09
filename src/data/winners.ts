import type { Winner } from '@/types/content';
import gVenturesPhoto from '@/assets/images/winners/g-ventures.jpg';
import apexCapitalPhoto from '@/assets/images/winners/apex-capital.jpg';

export const winners: Winner[] = [
  {
    id: 'g-ventures',
    teamName: 'G Ventures',
    track: 'Venture Capital Track',
    place: '1st Place',
    prize: '$10,000',
    description:
      "G Ventures paired founder instincts with the analytical rigor of trained economists, diligencing each pitch with a dual lens that set their investment thesis apart.",
    photoSrc: gVenturesPhoto,
    photoAlt: 'G Ventures accepting the first place award for the Venture Capital track',
    imageSide: 'left',
  },
  {
    id: 'apex-capital',
    teamName: 'Apex Capital',
    track: 'Venture Capital Track',
    place: '2nd Place',
    prize: '$5,000',
    description:
      "Led by David Davila and Samuel Landis of UNM's Investment Club, Apex Capital brought disciplined, risk-aware thinking from managing a student-led portfolio to every pick at the Cup.",
    photoSrc: apexCapitalPhoto,
    photoAlt: 'Apex Capital accepting the second place award for the Venture Capital track',
    imageSide: 'right',
  },
];
