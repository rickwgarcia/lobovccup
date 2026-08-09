import type { ProjectSpotlight } from '@/types/content';

export const projectSpotlights: ProjectSpotlight[] = [
  {
    id: 'brandtrend-ai',
    name: 'BrandTrend.ai',
    description:
      'AI search optimization for brands, turning meeting transcripts into authentic content that boosts visibility across AI chat platforms like ChatGPT.',
    deckSrc: '/decks/brandtrend-ai.pdf',
    imageAlt: 'BrandTrend.ai pitch deck',
    imageSide: 'left',
  },
  {
    id: 'synkro',
    name: 'Synkro',
    description:
      'A mobile-first digital campus ID platform that replaces plastic cards with secure, integrated mobile credentials combining ID, payments, and safety in one app.',
    deckSrc: '/decks/synkro.pdf',
    imageAlt: 'Synkro pitch deck',
    imageSide: 'right',
  },
  {
    id: 'queueskin',
    name: 'QueueSkin',
    description:
      'A dermatology triage platform that scores clinical urgency from patient photos and history, automatically scheduling priority-based appointments to cut months-long wait times.',
    deckSrc: '/decks/queueskin.pdf',
    imageAlt: 'QueueSkin pitch deck',
    imageSide: 'left',
  },
];
