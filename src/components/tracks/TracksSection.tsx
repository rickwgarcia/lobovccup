import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import TrackCard from '@/components/tracks/TrackCard';
import { tracks } from '@/data/tracks';

export default function TracksSection() {
  return (
    <section id="about" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">Two Tracks</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          Experience both sides of the startup funding ecosystem: building companies and
          investing in them.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-10">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </Container>
    </section>
  );
}
