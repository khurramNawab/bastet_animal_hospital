export interface SiteTiming {
  weekdays: string;
  sunday: string;
  emergency: string;
}

export interface SiteStat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timings: SiteTiming;
  stats: SiteStat[];
  navLinks: NavLink[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  yearsOfExperience: number;
  bio: string;
  image: string;
  animals: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  animals: string[];
}

export interface AnimalCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  comingSoon: boolean;
  tagline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  pet: string;
  text: string;
  rating: number;
}
