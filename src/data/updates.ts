import type { SocialUpdatesConfig } from '@/types/content';

// LinkedIn has no profile/company-page embed. To show posts, open a post on
// LinkedIn → "..." → "Embed this post", and paste the iframe `src` URL here
// (looks like https://www.linkedin.com/embed/feed/update/urn:li:share:123...).
// Newest first. With none listed, a link card to the company page is shown.
export const socialUpdates: SocialUpdatesConfig = {
  instagramProfileUrl: 'https://www.instagram.com/lobovccup/',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/lobovccup',
  linkedinPostEmbeds: [],
};
