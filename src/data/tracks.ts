import type { TrackInfo } from '@/types/content';
import trackStartupIllustration from '@/assets/images/track-startup-illustration.png';
import trackVcIllustration from '@/assets/images/track-vc-illustration.png';
import trackDetailsIconStartup from '@/assets/icons/track-details-icon-startup.svg';
import trackDetailsIconVc from '@/assets/icons/track-details-icon-vc.svg';

export const tracks: TrackInfo[] = [
  {
    id: 'startup',
    heading: 'Startup Track',
    detailsHref: '#',
    illustrationSrc: trackStartupIllustration,
    illustrationAlt: 'Startup Track illustration',
    iconSrc: trackDetailsIconStartup,
    variant: 'silver',
  },
  {
    id: 'vc',
    heading: 'The VC Track',
    detailsHref: '#',
    illustrationSrc: trackVcIllustration,
    illustrationAlt: 'VC Track illustration',
    iconSrc: trackDetailsIconVc,
    variant: 'dark',
  },
];
