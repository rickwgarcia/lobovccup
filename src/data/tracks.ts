import type { TrackInfo } from '@/types/content';
import trackStartupIllustration from '@/assets/images/track-startup-illustration.png';
import trackVcIllustration from '@/assets/images/track-vc-illustration.png';
import trackDetailsIconStartup from '@/assets/icons/track-details-icon-startup.svg';
import trackDetailsIconVc from '@/assets/icons/track-details-icon-vc.svg';

export const tracks: TrackInfo[] = [
  {
    id: 'startup',
    heading: 'Startup Track',
    description:
      'Student founders form teams to develop and pitch their own startup ideas. With guidance from experienced entrepreneur mentors, they refine their business models, craft their pitch decks, and present to student VC teams on pitch day. The capital they raise from student investors becomes their prize money. The better the pitch, the bigger the win.',
    illustrationSrc: trackStartupIllustration,
    illustrationAlt: 'Startup Track illustration',
    iconSrc: trackDetailsIconStartup,
    variant: 'silver',
    accentClassName: 'bg-track-startup',
  },
  {
    id: 'vc',
    heading: 'The VC Track',
    description:
      'Student VCs form investment teams and learn to operate like real venture capitalists. They develop investment theses, pitch to LPs for fund allocation, evaluate startup pitches from their peers, conduct due diligence, and make actual investment decisions. Top-performing VC teams compete for prizes based on their investment strategy and execution.',
    illustrationSrc: trackVcIllustration,
    illustrationAlt: 'VC Track illustration',
    iconSrc: trackDetailsIconVc,
    variant: 'dark',
    accentClassName: 'bg-track-vc',
  },
];
