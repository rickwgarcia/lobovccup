import Card from '@/components/common/Card';
import caseStudyArrow from '@/assets/icons/case-study-arrow.svg';

export default function ScheduleDownloadCard() {
  return (
    <Card bordered={false} className="bg-brand-gray px-6 py-8 sm:px-10 sm:py-12">
      <div className="flex flex-col items-start gap-4">
        <p className="font-grotesk text-xl font-bold leading-snug text-white sm:text-h3">
          Get the full week-by-week breakdown in the detailed schedule
        </p>
        <a
          href="/schedule/detailed_schedule.pdf"
          download
          className="inline-flex items-center gap-3 font-grotesk text-base leading-6 text-white"
        >
          <span className="underline decoration-solid underline-offset-2">Download PDF</span>
          <img src={caseStudyArrow} alt="" className="h-[10px] w-auto" />
        </a>
      </div>
    </Card>
  );
}
