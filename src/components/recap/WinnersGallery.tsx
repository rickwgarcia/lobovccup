import Card from '@/components/common/Card';
import { winners } from '@/data/winners';

export default function WinnersGallery() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {winners.map((winner) => (
        <Card key={winner.id} bordered className="flex w-full flex-col overflow-hidden">
          <img src={winner.photoSrc} alt={winner.photoAlt} className="h-[220px] w-full object-cover sm:h-[260px]" />
          <div className="flex flex-col items-start gap-1 p-6">
            <span className="rounded-pill bg-turquoise px-[7px] font-grotesk text-sm font-medium leading-tight text-black">
              {winner.place} · {winner.prize}
            </span>
            <h3 className="font-grotesk text-xl font-bold leading-tight text-black sm:text-h3">
              {winner.teamName}
            </h3>
            <p className="font-grotesk text-body text-black">{winner.track}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
