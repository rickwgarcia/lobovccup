import type { MentorItem } from '@/types/content';

// Photos are loaded from /public/mentors/<id>.png. LinkedIn blocks
// unauthenticated photo scraping, so headshots must be downloaded manually
// from each mentor's LinkedIn profile and dropped in that folder using the
// filename matching the mentor's `id` below. MentorCard falls back to a
// placeholder circle when a photo file isn't present yet.
export const mentors: MentorItem[] = [
  {
    id: 'paul-zelizer',
    name: 'Paul Zelizer',
    title: 'NM Tech Talks',
    track: 'startup',
    photoSrc: '/mentors/paul-zelizer.png',
    photoAlt: 'Paul Zelizer',
    socialHref: 'https://www.linkedin.com/in/paulzelizer/',
  },
  {
    id: 'vicki-apodaca',
    name: 'Vicki Apodaca',
    title: 'NM Tech Talks',
    track: 'startup',
    photoSrc: '/mentors/vicki-apodaca.png',
    photoAlt: 'Vicki Apodaca',
    socialHref: 'https://www.linkedin.com/in/victoriaapodaca/',
  },
  {
    id: 'michael-davis',
    name: 'Michael Davis',
    title: 'Merek Security Solutions',
    track: 'startup',
    photoSrc: '/mentors/michael-davis.png',
    photoAlt: 'Michael Davis',
    socialHref: 'https://www.linkedin.com/in/mereksecurity/',
  },
  {
    id: 'billy-rogers',
    name: 'Billy Rogers',
    title: 'Cutter Associates',
    track: 'startup',
    photoSrc: '/mentors/billy-rogers.png',
    photoAlt: 'Billy Rogers',
    socialHref: 'https://www.linkedin.com/in/billyrogersnm/',
  },
  {
    id: 'mariano-fernandez',
    name: 'Mariano Fernandez',
    title: 'Liberty Fusion',
    track: 'startup',
    photoSrc: '/mentors/mariano-fernandez.png',
    photoAlt: 'Mariano Fernandez',
    socialHref: 'https://www.linkedin.com/in/marianof23/',
  },
  {
    id: 'talal-saint-lot',
    name: 'Talal Saint-Lot',
    title: 'New Mexico Grant Administration',
    track: 'startup',
    photoSrc: '/mentors/talal-saint-lot.png',
    photoAlt: 'Talal Saint-Lot',
    socialHref: 'https://www.linkedin.com/in/talalsaintlot/',
  },
  {
    id: 'ward-hendon',
    name: 'Ward Hendon',
    title: 'Dangerous Ventures',
    track: 'vc',
    photoSrc: '/mentors/ward-hendon.png',
    photoAlt: 'Ward Hendon',
    socialHref: 'https://www.linkedin.com/in/wardhendon/',
  },
  {
    id: 'joey-juang',
    name: 'Joey Juang',
    title: 'Tramway Ventures',
    track: 'vc',
    photoSrc: '/mentors/joey-juang.png',
    photoAlt: 'Joey Juang',
    socialHref: 'https://www.linkedin.com/in/joey-j-ab1361114/',
  },
  {
    id: 'stephanie-dubois',
    name: 'Stephanie Dubois',
    title: 'Farmties Capital',
    track: 'vc',
    photoSrc: '/mentors/stephanie-dubois.png',
    photoAlt: 'Stephanie Dubois',
    socialHref: 'https://www.linkedin.com/in/stephaniedubois703/',
  },
  {
    id: 'john-chavez',
    name: 'John Chavez',
    title: 'NM Startup Factory',
    track: 'vc',
    photoSrc: '/mentors/john-chavez.png',
    photoAlt: 'John Chavez',
    socialHref: 'https://www.linkedin.com/in/john-chavez-206a143/',
  },
];
