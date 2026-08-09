import type { MentorItem } from '@/types/content';

// Photos are loaded from /public/mentors/<id>.jpg. LinkedIn blocks
// unauthenticated photo scraping, so headshots must be downloaded manually
// from each mentor's LinkedIn profile and dropped in that folder using the
// filename matching the mentor's `id` below. MentorCard falls back to a
// placeholder circle when a photo file isn't present yet.
export const mentors: MentorItem[] = [
  {
    id: 'paul-zelizer',
    name: 'Paul Zelizer',
    title: 'NM Tech Talks',
    photoSrc: '/mentors/paul-zelizer.jpg',
    photoAlt: 'Paul Zelizer',
    socialHref: 'https://www.linkedin.com/in/paulzelizer/',
  },
  {
    id: 'vicki-apodaca',
    name: 'Vicki Apodaca',
    title: 'NM Tech Talks',
    photoSrc: '/mentors/vicki-apodaca.jpg',
    photoAlt: 'Vicki Apodaca',
    socialHref: 'https://www.linkedin.com/in/victoriaapodaca/',
  },
  {
    id: 'michael-davis',
    name: 'Michael Davis',
    title: 'Merek Security Solutions',
    photoSrc: '/mentors/michael-davis.jpg',
    photoAlt: 'Michael Davis',
    socialHref: 'https://www.linkedin.com/in/mereksecurity/',
  },
  {
    id: 'billy-rogers',
    name: 'Billy Rogers',
    title: 'Institutional Asset Management and FinTech',
    photoSrc: '/mentors/billy-rogers.jpg',
    photoAlt: 'Billy Rogers',
    socialHref: 'https://www.linkedin.com/in/billyrogersnm/',
  },
  {
    id: 'mariano-fernandez',
    name: 'Mariano Fernandez',
    title: 'Liberty Fusion',
    photoSrc: '/mentors/mariano-fernandez.jpg',
    photoAlt: 'Mariano Fernandez',
    socialHref: 'https://www.linkedin.com/in/marianof23/',
  },
  {
    id: 'talal-saint-lot',
    name: 'Talal Saint-Lot',
    title: 'New Mexico Grant Administration',
    photoSrc: '/mentors/talal-saint-lot.jpg',
    photoAlt: 'Talal Saint-Lot',
    socialHref: 'https://www.linkedin.com/in/talalsaintlot/',
  },
  {
    id: 'ward-hendon',
    name: 'Ward Hendon',
    title: 'Dangerous Ventures',
    photoSrc: '/mentors/ward-hendon.jpg',
    photoAlt: 'Ward Hendon',
    socialHref: 'https://www.linkedin.com/in/wardhendon/',
  },
  {
    id: 'joey-juang',
    name: 'Joey Juang',
    title: 'Tramway Ventures',
    photoSrc: '/mentors/joey-juang.jpg',
    photoAlt: 'Joey Juang',
    socialHref: 'https://www.linkedin.com/in/joey-j-ab1361114/',
  },
  {
    id: 'stephanie-dubois',
    name: 'Stephanie Dubois',
    title: 'Farmties Capital',
    photoSrc: '/mentors/stephanie-dubois.jpg',
    photoAlt: 'Stephanie Dubois',
    socialHref: 'https://www.linkedin.com/in/stephaniedubois703/',
  },
  {
    id: 'john-chavez',
    name: 'John Chavez',
    title: 'NM Startup Factory',
    photoSrc: '/mentors/john-chavez.jpg',
    photoAlt: 'John Chavez',
    socialHref: 'https://www.linkedin.com/in/john-chavez-206a143/',
  },
];
