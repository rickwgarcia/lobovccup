import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import Button from '@/components/common/Button';
import { socialUpdates } from '@/data/updates';

const panel = 'flex w-full flex-col gap-5 rounded-card border border-ink bg-brand-silver px-5 py-5 shadow-hard sm:px-8 sm:py-7';

export default function UpdatesSection() {
  const { instagramProfileUrl, linkedinCompanyUrl, linkedinPostEmbeds } = socialUpdates;

  return (
    <section id="updates" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">Updates</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          The latest from Lobo VC Cup on Instagram and LinkedIn.
        </p>
      </Container>

      <Container className="mt-8 grid gap-[30px] lg:grid-cols-2">
        <div className={panel}>
          <div className="flex items-center justify-between gap-4 border-b border-black pb-4">
            <h3 className="font-grotesk text-xl font-medium text-black sm:text-h4">Instagram</h3>
            <a
              href={instagramProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk text-sm text-black underline underline-offset-2"
            >
              @lobovccup
            </a>
          </div>
          <iframe
            src={`${instagramProfileUrl}embed`}
            title="Lobo VC Cup on Instagram"
            loading="lazy"
            scrolling="yes"
            className="h-[560px] w-full rounded-card border border-ink bg-white"
          />
        </div>

        <div className={panel}>
          <div className="flex items-center justify-between gap-4 border-b border-black pb-4">
            <h3 className="font-grotesk text-xl font-medium text-black sm:text-h4">LinkedIn</h3>
            <a
              href={linkedinCompanyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk text-sm text-black underline underline-offset-2"
            >
              Lobo VC Cup
            </a>
          </div>
          {linkedinPostEmbeds.length > 0 ? (
            <div className="flex h-[560px] flex-col gap-4 overflow-y-auto">
              {linkedinPostEmbeds.map((src) => (
                <iframe
                  key={src}
                  src={src}
                  title="Lobo VC Cup LinkedIn post"
                  loading="lazy"
                  allowFullScreen
                  className="h-[500px] w-full shrink-0 rounded-card border border-ink bg-white"
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[560px] flex-col items-start justify-center gap-4 rounded-card border border-ink bg-white p-6">
              <p className="font-grotesk text-body text-black">
                Follow Lobo VC Cup on LinkedIn for announcements, mentor spotlights, and event recaps.
              </p>
              <Button href={linkedinCompanyUrl} target="_blank" rel="noopener noreferrer">
                Follow on LinkedIn
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
