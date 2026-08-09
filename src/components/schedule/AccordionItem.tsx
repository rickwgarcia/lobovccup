import type { ScheduleItem } from '@/types/content';
import accordionFrame from '@/assets/icons/accordion-icon-frame.svg';
import accordionPlus from '@/assets/icons/accordion-icon-plus.svg';
import accordionMinus from '@/assets/icons/accordion-icon-minus.svg';

interface AccordionItemProps {
  item: ScheduleItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const panelId = `schedule-panel-${item.id}`;

  return (
    <div className="w-full rounded-card border border-ink bg-brand-silver px-5 py-5 shadow-hard sm:px-10 sm:py-7">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4 font-grotesk font-medium text-black sm:gap-5">
          <span className="text-2xl leading-none sm:text-h2">{item.id}</span>
          <span className="text-base leading-tight sm:text-h3">{item.title}</span>
        </div>

        <span className="relative size-9 shrink-0 sm:size-12">
          <img src={accordionFrame} alt="" className="absolute inset-0 h-full w-full" />
          <img
            src={isOpen ? accordionMinus : accordionPlus}
            alt=""
            className="absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[18px] sm:w-[18px]"
          />
        </span>
      </button>

      <p className="mt-2 font-grotesk text-sm text-brand-gray sm:hidden">{item.dateRange}</p>

      {isOpen && (
        <div id={panelId} className="mt-5 flex flex-col gap-5 border-t border-black pt-5 sm:mt-6 sm:gap-6 sm:pt-6">
          <p className="font-grotesk text-sm font-medium text-black sm:text-h4">{item.dateRange}</p>
          <p className="font-grotesk text-body text-black">{item.details}</p>
        </div>
      )}
    </div>
  );
}
