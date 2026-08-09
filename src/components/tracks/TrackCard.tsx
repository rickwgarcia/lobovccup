import { useState } from 'react';
import type { TrackInfo } from '@/types/content';
import SectionLabel from '@/components/common/SectionLabel';

interface TrackCardProps {
  track: TrackInfo;
}

export default function TrackCard({ track }: TrackCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = track.variant === 'dark';
  const panelId = `track-details-${track.id}`;
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <div
      className={`flex w-full min-w-0 max-w-[600px] flex-1 flex-col items-center gap-6 rounded-card border border-brand-gray p-6 shadow-hard sm:flex-row sm:items-center sm:justify-between sm:p-9 ${
        isDark ? 'bg-brand-gray' : 'bg-brand-silver'
      }`}
    >
      <div className="flex flex-col items-center gap-6 sm:items-start sm:justify-center sm:gap-10 lg:gap-14">
        <SectionLabel as="h3" size="h3">
          {track.heading}
        </SectionLabel>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`inline-flex items-center gap-3 font-grotesk text-base leading-6 ${textColor}`}
        >
          <img src={track.iconSrc} alt="" className="size-8 shrink-0" />
          <span>{isOpen ? 'Hide Details' : 'Details'}</span>
        </button>

        {isOpen && (
          <p id={panelId} className={`text-center font-grotesk text-body sm:text-left ${textColor}`}>
            {track.description}
          </p>
        )}
      </div>

      <img
        src={track.illustrationSrc}
        alt={track.illustrationAlt}
        className="h-auto w-[120px] shrink-0 sm:w-[140px] lg:w-[160px]"
      />
    </div>
  );
}
