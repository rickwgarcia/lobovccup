import SectionLabel from '@/components/common/SectionLabel';

const LUMA_SRC = 'https://luma.com/embed/calendar/cal-MxV4UlKG78FbP9M/events?compact=true&lt=light';

export default function LumaCalendarEmbed() {
  return (
    <div className="w-full rounded-card border border-ink bg-brand-silver px-5 py-5 shadow-hard sm:px-10 sm:py-7">
      <div className="flex">
        <SectionLabel as="h3" size="h3">
          Upcoming Events
        </SectionLabel>
      </div>

      <div className="mt-5 border-t border-black pt-5 sm:mt-6 sm:pt-6">
        <iframe
          src={LUMA_SRC}
          title="Lobo VC Cup events calendar"
          loading="lazy"
          allowFullScreen
          className="h-[450px] w-full rounded-card border border-ink bg-white"
        />
      </div>
    </div>
  );
}
