export interface NavLink {
  label: string;
  href: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  dateRange: string;
  details: string;
}

export interface MentorItem {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photoSrc: string;
  photoAlt: string;
  socialHref: string;
}

export interface ProjectSpotlight {
  id: string;
  name: string;
  description: string;
  deckSrc: string;
  imageAlt: string;
  imageSide: 'left' | 'right';
}

export interface Winner {
  id: string;
  teamName: string;
  track: string;
  place: string;
  prize: string;
  description: string;
  photoSrc: string;
  photoAlt: string;
  imageSide: 'left' | 'right';
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  rating: number;
}

export interface TrackInfo {
  id: 'startup' | 'vc';
  heading: string;
  description: string;
  illustrationSrc: string;
  illustrationAlt: string;
  iconSrc: string;
  variant: 'silver' | 'dark';
  accentClassName: string;
}
