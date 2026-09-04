import Container from '@/components/common/Container';
import heroIllustration from '@/assets/images/hero-illustration.png';

export default function Hero() {
  return (
    <Container className="flex flex-col items-center gap-10 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-16">
      <div className="flex max-w-[480px] flex-col gap-5 text-center lg:gap-6 lg:text-left">
        <h1 className="font-grotesk text-3xl font-medium leading-tight text-black sm:text-4xl lg:text-h1">
          Student founders pitch. Student VCs invest.
        </h1>
        <p className="font-grotesk text-sm leading-6 text-black lg:text-body">
          Student driven startup investment competition, where student-run VC funds go
          head-to-head to identify, evaluate, and invest in the next generation of student
          founders, uniting students from across the university, from business, engineering,
          CS, pre-med, and beyond, to discover what&rsquo;s possible at the intersection of
          disciplines.
        </p>
      </div>

      <img
        src={heroIllustration}
        alt="Illustration of a trophy on a pedestal representing the Lobo VC Cup"
        className="h-auto max-h-[260px] w-auto sm:max-h-[300px] lg:max-h-[380px]"
      />
    </Container>
  );
}
