import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import Button from '@/components/common/Button';
import { socialUpdates } from '@/data/updates';

const MAX_POSTS = 5;

const platformLabel = { instagram: 'Instagram', linkedin: 'LinkedIn' } as const;

export default function UpdatesSection() {
  const { instagramProfileUrl, linkedinCompanyUrl, posts } = socialUpdates;
  const visible = posts.slice(0, MAX_POSTS);

  return (
    <section id="updates" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">Latest Updates</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          The latest from Lobo VC Cup on Instagram and LinkedIn.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col gap-6">
        {visible.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visible.map((post) => (
              <li key={post.href} className="first:col-span-2 sm:first:col-span-1">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.alt} (view on ${platformLabel[post.platform]})`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-card border border-ink bg-brand-silver shadow-hard transition-transform hover:-translate-y-1"
                >
                  <img
                    src={post.imageSrc}
                    alt={post.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-pill bg-turquoise px-2 py-0.5 font-grotesk text-xs text-black">
                    {platformLabel[post.platform]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-4">
          <Button href={instagramProfileUrl} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </Button>
          <Button
            href={linkedinCompanyUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid-turquoise"
          >
            Follow on LinkedIn
          </Button>
        </div>
      </Container>
    </section>
  );
}
