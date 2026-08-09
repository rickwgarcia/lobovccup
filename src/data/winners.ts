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
      "G Ventures brought a rare combination of entrepreneurship and economics to the table, evaluating founders with the instincts of operators who've built something and the analytical rigor of economists who understand markets. That dual lens shaped how they diligenced each pitch and ultimately what set their investment thesis apart.",
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
      "Apex Capital is led by David Davila and Samuel Landis, leaders of the Investment Club at UNM. Their background running a student-led investment portfolio gave them a head start on diligence, valuation, and the kind of disciplined, risk-aware thinking that carried through their picks at the Cup.",
    photoSrc: apexCapitalPhoto,
    photoAlt: 'Apex Capital accepting the second place award for the Venture Capital track',
    imageSide: 'right',
  },
];
