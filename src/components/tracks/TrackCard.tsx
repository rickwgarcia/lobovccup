import type { TrackInfo } from '@/types/content';
import SectionLabel from '@/components/common/SectionLabel';
import IconLink from '@/components/common/IconLink';

interface TrackCardProps {
  track: TrackInfo;
}

export default function TrackCard({ track }: TrackCardProps) {
  const isDark = track.variant === 'dark';

  return (
    <div
      className={`flex w-full min-w-0 max-w-[600px] flex-1 flex-col items-center gap-8 rounded-card border border-brand-gray p-8 shadow-hard sm:flex-row sm:items-center sm:justify-between sm:p-[50px] ${
        isDark ? 'bg-brand-gray' : 'bg-brand-silver'
      }`}
    >
      <div className="flex flex-col items-center gap-8 sm:items-start sm:justify-center sm:gap-16 lg:gap-[93px]">
        <SectionLabel as="h3" size="h3">
          {track.heading}
        </SectionLabel>
        <IconLink
          icon={track.iconSrc}
          iconAlt=""
          href={track.detailsHref}
          className={isDark ? 'text-white' : 'text-black'}
        >
          Details
        </IconLink>
      </div>

      <img
        src={track.illustrationSrc}
        alt={track.illustrationAlt}
        className="h-auto w-[150px] shrink-0 sm:w-[180px] lg:w-[210px]"
      />
    </div>
  );
}
