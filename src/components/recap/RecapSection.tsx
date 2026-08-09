import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import CaseStudyCard from '@/components/recap/CaseStudyCard';
import ProjectSpotlightRow from '@/components/recap/ProjectSpotlightRow';
import WinnersGallery from '@/components/recap/WinnersGallery';
import TestimonialsCarousel from '@/components/recap/TestimonialsCarousel';
import { projectSpotlights } from '@/data/projects';

export default function RecapSection() {
  return (
    <section id="recap" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">2026 Recap</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          Students have already walked away with hands-on experience in the startup ecosystem.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col gap-8">
        <CaseStudyCard />

        <WinnersGallery />

        {projectSpotlights.map((project) => (
          <ProjectSpotlightRow key={project.id} project={project} />
        ))}

        <TestimonialsCarousel />
      </Container>
    </section>
  );
}
