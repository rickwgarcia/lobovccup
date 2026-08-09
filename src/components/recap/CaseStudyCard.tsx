import Card from '@/components/common/Card';
import caseStudyArrow from '@/assets/icons/case-study-arrow.svg';

export default function CaseStudyCard() {
  return (
    <Card bordered={false} className="bg-brand-gray px-8 py-10 sm:px-[60px] sm:py-[70px]">
      <div className="flex flex-col items-start gap-5">
        <p className="font-grotesk text-2xl font-bold leading-snug text-black sm:text-h3">
          Inaugural Lobo Venture Capital Cup showcases student innovation and investment skills
        </p>
        <a
          href="https://business.unm.edu/news/highlights/2026/04/inaugural-lobo-venture-capital-cup-showcases-student-innovation-and-investment-skills.html?image"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-[15px] font-grotesk text-lg leading-7 text-black"
        >
          <span className="underline decoration-solid underline-offset-2">Read story</span>
          <img src={caseStudyArrow} alt="" className="h-[10px] w-auto" />
        </a>
      </div>
    </Card>
  );
}
