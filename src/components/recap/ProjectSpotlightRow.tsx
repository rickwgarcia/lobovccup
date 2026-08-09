import type { ProjectSpotlight } from '@/types/content';

interface ProjectSpotlightRowProps {
  project: ProjectSpotlight;
}

export default function ProjectSpotlightRow({ project }: ProjectSpotlightRowProps) {
  const imageOnRightAtDesktop = project.imageSide === 'right';

  return (
    <div
      className={`flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8 ${
        imageOnRightAtDesktop ? 'sm:flex-row-reverse' : ''
      }`}
    >
      <div
        role="img"
        aria-label={project.imageAlt}
        className="h-[160px] w-full shrink-0 rounded-card bg-brand-silver/40 sm:h-auto sm:w-1/2 sm:max-w-[480px]"
      />
      <div className="flex w-full flex-col items-start justify-center gap-3 rounded-card border border-brand-gray bg-brand-silver p-6 shadow-hard sm:w-1/2 sm:max-w-[460px] sm:p-9">
        <h3 className="font-grotesk text-xl font-bold leading-tight text-black sm:text-h3">
          {project.name}
        </h3>
        <p className="font-grotesk text-body text-black">{project.description}</p>
      </div>
    </div>
  );
}
