import { useState } from 'react';
import type { MentorItem } from '@/types/content';
import socialIcon from '@/assets/icons/social-icon.svg';

interface MentorCardProps {
  mentor: MentorItem;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="flex w-full flex-col gap-5 rounded-card border border-ink bg-white p-6 shadow-hard sm:p-7">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex items-end gap-4">
          {photoFailed ? (
            <div
              role="img"
              aria-label={mentor.photoAlt}
              className="size-16 shrink-0 rounded-full bg-brand-silver/40 sm:size-20"
            />
          ) : (
            <img
              src={mentor.photoSrc}
              alt={mentor.photoAlt}
              onError={() => setPhotoFailed(true)}
              className="size-16 shrink-0 rounded-full object-cover sm:size-20"
            />
          )}
          <div className="flex flex-col text-black">
            <p className="font-grotesk text-base font-medium leading-normal">{mentor.name}</p>
            <p className="font-grotesk text-sm leading-normal">{mentor.title}</p>
          </div>
        </div>
        <a
          href={mentor.socialHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${mentor.name} on LinkedIn`}
          className="shrink-0"
        >
          <img src={socialIcon} alt="" className="size-7" />
        </a>
      </div>

      {mentor.bio && (
        <>
          <div className="w-full border-t border-black" />
          <p className="font-grotesk text-body text-black">{mentor.bio}</p>
        </>
      )}
    </div>
  );
}
