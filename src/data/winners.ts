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
    photoSrc: gVenturesPhoto,
    photoAlt: 'G Ventures accepting the first place award for the Venture Capital track',
  },
  {
    id: 'apex-capital',
    teamName: 'Apex Capital',
    track: 'Venture Capital Track',
    place: '2nd Place',
    prize: '$5,000',
    photoSrc: apexCapitalPhoto,
    photoAlt: 'Apex Capital accepting the second place award for the Venture Capital track',
  },
];
