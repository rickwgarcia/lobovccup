import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import MentorCard from '@/components/mentors/MentorCard';
import { mentors } from '@/data/mentors';

export default function MentorsSection() {
  return (
    <section id="mentors" className="py-16 lg:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">Mentors</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          [Meet the mentors guiding this year&rsquo;s founders and investors]
        </p>
      </Container>

      <Container className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </Container>
    </section>
  );
}
