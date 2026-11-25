import Container from '@/components/common/Container';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function EmailSignup() {
  return (
    <section id="join" className="py-12 lg:py-16">
      <Container>
        <Card bordered={false} className="flex flex-col items-start gap-6 bg-brand-gray px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-grotesk text-3xl font-bold leading-snug text-white sm:text-h3">
              Don&rsquo;t miss the 2027 Lobo VC Cup
            </h2>
            <p className="max-w-[580px] font-grotesk text-body text-white">
              Join the email list for registration dates, event invites, and competition updates.
            </p>
          </div>
          <Button
            variant="solid-white"
            href="https://forms.cloud.microsoft/r/WiVugkpssj"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-10 py-5 text-xl font-bold shadow-hard sm:w-auto sm:text-2xl"
          >
            Join the Email List &rarr;
          </Button>
        </Card>
      </Container>
    </section>
  );
}
