import type { ProjectSpotlight } from '@/types/content';

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
      <iframe
        src={project.deckSrc}
        title={project.imageAlt}
        className="h-[320px] w-full shrink-0 rounded-card border border-brand-gray bg-brand-silver/40 sm:h-[380px] sm:w-1/2 sm:max-w-[480px]"
        loading="lazy"
      />
      <div className="flex h-[320px] w-full flex-col items-start justify-center gap-3 rounded-card border border-brand-gray bg-brand-silver p-6 shadow-hard sm:h-[380px] sm:w-1/2 sm:max-w-[460px] sm:p-9">
        <h3 className="font-grotesk text-xl font-bold leading-tight text-black sm:text-h3">
          {project.name}
        </h3>
        <p className="line-clamp-6 font-grotesk text-body text-black">{project.description}</p>
      </div>
    </div>
  );
}
