import { useState } from 'react';
import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import AccordionItem from '@/components/schedule/AccordionItem';
import ScheduleDownloadCard from '@/components/schedule/ScheduleDownloadCard';
import { scheduleItems } from '@/data/schedule';

export default function ScheduleSection() {
  const [openId, setOpenId] = useState<string | null>(scheduleItems[0]?.id ?? null);

  return (
    <section id="schedule" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">2027 Schedule</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          Eight weeks. From first lecture to real deal making.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col gap-[30px]">
        {scheduleItems.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}

        <iframe
          src="https://luma.com/embed/calendar/cal-MxV4UlKG78FbP9M/events?compact=true&lt=light"
          title="Lobo VC Cup events calendar"
          width="600"
          height="450"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          className="h-[450px] w-full max-w-[600px] rounded border border-[#bfcbda88]"
        />

        <ScheduleDownloadCard />
      </Container>
    </section>
  );
}
