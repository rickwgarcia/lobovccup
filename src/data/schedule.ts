import type { ScheduleItem } from '@/types/content';

// Real 2027 schedule content from Figma node 1917:374 (the maintained
// "Process block" — a duplicate placeholder layer at the same position,
// node 338:195, contains fake "Consultation/Implementation" copy and was
// intentionally not used).
export const scheduleItems: ScheduleItem[] = [
  {
    id: '00',
    title: 'VC Cup Social',
    dateRange: 'Mar 1 - Mar 5',
    details: 'Kickoff mixer to meet fellow founders, investors, mentors, form teams, and get an overview of the competition.',
  },
  {
    id: '01',
    title: 'VC Education Week',
    dateRange: 'Mar 22 - Mar 26',
    details: 'VC teams attend workshops on investment theses, due diligence, and fund allocation, led by working VCs.',
  },
  {
    id: '02',
    title: 'Office Hours',
    dateRange: 'Fridays, Mar 26 - Apr 23',
    details: 'Weekly drop-in office hours for startup and VC teams to get feedback from organizers and mentors.',
  },
  {
    id: '03',
    title: 'Startup Education Week',
    dateRange: 'Mar 29 - Apr 2',
    details: 'Founders attend workshops on business models and pitch decks with guidance from entrepreneur mentors.',
  },
  {
    id: '04',
    title: 'Team Submission Due',
    dateRange: 'Apr 2',
    details: 'Deadline for startup and VC teams to finalize their rosters.',
  },
  {
    id: '05',
    title: 'Research Week One',
    dateRange: 'Apr 5 - Apr 9',
    details: 'Startup teams build their pitches, minimum viable products, participate in customer discovery, while VC teams build out their investment theses and target lists.',
  },
  {
    id: '06',
    title: 'VC Deliverables Due',
    dateRange: 'Apr 9',
    details: 'Deadline for VC teams to submit their investment thesis and target company list, in person.',
  },
  {
    id: '07',
    title: 'Research Week Two',
    dateRange: 'Apr 12 - Apr 16',
    details: 'Teams finalize materials and investment criteria ahead of pitch day and due diligence.',
  },
  {
    id: '08',
    title: 'Startup Deliverables Due',
    dateRange: 'Apr 16',
    details: 'Deadline for startup teams to submit their finalized pitch decks, in person.',
  },
  {
    id: '09',
    title: 'Discovery and Due Diligence',
    dateRange: 'Apr 19 - Apr 27',
    details: 'Startups pitch to student VC teams, who conduct due diligence and decide where to allocate capital.',
  },
  {
    id: '10',
    title: 'Final Submissions (VC)',
    dateRange: 'Apr 27',
    details: 'Deadline for VC teams to submit their final investment decisions and capital allocations.',
  },
  {
    id: '11',
    title: 'Mentor Review and Judging',
    dateRange: 'Apr 28 - May 5',
    details: 'Mentors review startup pitches and VC investment decisions to select finalists in each track.',
  },
  {
    id: '12',
    title: 'Awards',
    dateRange: 'May 7',
    details: 'Winners are announced and prize money is awarded to the top startup and VC teams.',
  },
];
