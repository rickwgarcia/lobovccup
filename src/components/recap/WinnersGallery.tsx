import SectionLabel from '@/components/common/SectionLabel';
import { winners } from '@/data/winners';

export default function WinnersGallery() {
  return (
    <div className="flex flex-col gap-8">
      {winners.map((winner) => {
        const imageOnRightAtDesktop = winner.imageSide === 'right';

        return (
          <div
            key={winner.id}
            className={`flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8 ${
              imageOnRightAtDesktop ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <img
              src={winner.photoSrc}
              alt={winner.photoAlt}
              className="h-[280px] w-full shrink-0 rounded-card border border-brand-gray object-cover sm:h-[320px] sm:w-1/2 sm:max-w-[540px]"
            />
            <div className="flex h-[280px] w-full flex-col items-start justify-center gap-3 rounded-card border border-brand-gray bg-brand-silver p-6 shadow-hard sm:h-[320px] sm:w-1/2 sm:max-w-[540px] sm:p-9">
              <SectionLabel as="h3" size="h3" bgClassName="bg-track-vc">
                {winner.teamName}
              </SectionLabel>
              <p className="line-clamp-6 font-grotesk text-body text-black">{winner.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
