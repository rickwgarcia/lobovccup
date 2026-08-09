import Container from '@/components/common/Container';
import heroIllustration from '@/assets/images/hero-illustration.png';

export default function Hero() {
  return (
    <Container className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-20">
      <div className="flex max-w-[531px] flex-col gap-6 text-center lg:gap-[35px] lg:text-left">
        <h1 className="font-grotesk text-4xl font-medium leading-tight text-black sm:text-5xl lg:text-h1">
          Student founders pitch. Student VCs invest.
        </h1>
        <p className="font-grotesk text-base leading-7 text-black lg:text-body">
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
        className="w-full max-w-[420px] lg:max-w-[556px]"
      />
    </Container>
  );
}
