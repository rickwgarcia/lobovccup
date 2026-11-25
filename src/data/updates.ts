import type { SocialUpdatesConfig } from '@/types/content';

// Each post is an image tile that links to the original post.
// Save a screenshot/export of the post in public/updates/ (square or 4:5 works best)
// and add an entry here, newest first. The first 5 are shown.
export const socialUpdates: SocialUpdatesConfig = {
  instagramProfileUrl: 'https://www.instagram.com/lobovccup/',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/lobovccup',
  posts: [
    // {
    //   platform: 'instagram',
    //   href: 'https://www.instagram.com/p/XXXXXXXXXXX/',
    //   imageSrc: '/updates/post-1.jpg',
    //   alt: 'Short description of the post',
    // },
  ],
};
