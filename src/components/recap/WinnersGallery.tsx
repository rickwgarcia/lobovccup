import { winners } from '@/data/winners';

export default function WinnersGallery() {
  return (
    <div className="flex flex-col gap-8">
      {winners.map((winner) => {
        const imageOnRightAtDesktop = winner.imageSide === 'right';

        return (
          <div
            key={winner.id}
            className={`flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8 ${
              imageOnRightAtDesktop ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <img
              src={winner.photoSrc}
              alt={winner.photoAlt}
              className="h-[320px] w-full shrink-0 rounded-card border border-brand-gray object-cover sm:h-auto sm:min-h-[360px] sm:w-1/2 sm:max-w-[480px]"
            />
            <div className="flex w-full flex-col items-start justify-center gap-3 rounded-card border border-brand-gray bg-brand-silver p-6 shadow-hard sm:w-1/2 sm:max-w-[460px] sm:p-9">
              <h3 className="font-grotesk text-xl font-bold leading-tight text-black sm:text-h3">
                {winner.teamName}
              </h3>
              <p className="font-grotesk text-body text-black">{winner.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
