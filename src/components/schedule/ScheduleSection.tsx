import { useState } from 'react';
import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import AccordionItem from '@/components/schedule/AccordionItem';
import { scheduleItems } from '@/data/schedule';

export default function ScheduleSection() {
  const [openId, setOpenId] = useState<string | null>(scheduleItems[0]?.id ?? null);

  return (
    <section id="schedule" className="py-16 lg:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">2027 Schedule</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          Eight weeks. From first lecture to real deal making.
        </p>
      </Container>

      <Container className="mt-10 flex flex-col gap-[30px]">
        {scheduleItems.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </Container>
    </section>
  );
}
