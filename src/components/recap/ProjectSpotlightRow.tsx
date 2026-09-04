import type { ProjectSpotlight } from '@/types/content';
import SectionLabel from '@/components/common/SectionLabel';
import PdfSlideViewer from './PdfSlideViewer';

interface ProjectSpotlightRowProps {
  project: ProjectSpotlight;
}

export default function ProjectSpotlightRow({ project }: ProjectSpotlightRowProps) {
  const imageOnRightAtDesktop = project.imageSide === 'right';

  return (
    <div
      className={`flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8 ${
        imageOnRightAtDesktop ? 'sm:flex-row-reverse' : ''
      }`}
    >
      <PdfSlideViewer
        src={project.deckSrc}
        title={project.imageAlt}
        className="h-[280px] w-full shrink-0 sm:h-[320px] sm:w-1/2 sm:max-w-[540px]"
      />
      <div className="flex h-[280px] w-full flex-col items-start justify-center gap-3 rounded-card border border-brand-gray bg-brand-silver p-6 shadow-hard sm:h-[320px] sm:w-1/2 sm:max-w-[540px] sm:p-9">
        <SectionLabel as="h3" size="h3" bgClassName="bg-track-startup">
          {project.name}
        </SectionLabel>
        <p className="line-clamp-6 font-grotesk text-body text-black">{project.description}</p>
      </div>
    </div>
  );
}
