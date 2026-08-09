import type { ScheduleItem } from '@/types/content';

// Real 2027 schedule content from Figma node 1917:374 (the maintained
// "Process block" — a duplicate placeholder layer at the same position,
// node 338:195, contains fake "Consultation/Implementation" copy and was
// intentionally not used).
export const scheduleItems: ScheduleItem[] = [
  { id: '00', title: 'VC Cup Social', dateRange: 'Mar 1 - Mar 5', details: '[Event details]' },
  { id: '01', title: 'VC Education Week', dateRange: 'Mar 22 - Mar 26', details: '[Event details]' },
  { id: '02', title: 'Startup Education Week', dateRange: 'Mar 29 - Apr 2', details: '[Event details]' },
  { id: '03', title: 'Research Week One', dateRange: 'Apr 5 - Apr 9', details: '[Event details]' },
  { id: '04', title: 'Research Week Two', dateRange: 'Apr 12 - Apr 16', details: '[Event details]' },
  { id: '05', title: 'Discovery and Due Diligence', dateRange: 'Apr 19 - Apr 27', details: '[Event details]' },
  { id: '06', title: 'Mentor Review and Judging', dateRange: 'Apr 28 - May 5', details: '[Event details]' },
  { id: '07', title: 'Awards', dateRange: 'May 7', details: '[Event details]' },
];
