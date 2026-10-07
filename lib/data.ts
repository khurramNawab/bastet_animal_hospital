import siteData from '@/data/site.json';
import doctorsData from '@/data/doctors.json';
import servicesData from '@/data/services.json';
import animalsData from '@/data/animals.json';
import testimonialsData from '@/data/testimonials.json';
import storyData from '@/data/story.json';

import type {
  SiteConfig,
  Doctor,
  ServiceItem,
  AnimalCategory,
  Testimonial,
  StoryPanel,
} from './types';

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getDoctors(): Doctor[] {
  return doctorsData as Doctor[];
}

export function getDoctorById(id: string): Doctor | undefined {
  return (doctorsData as Doctor[]).find((doc) => doc.id === id);
}

export function getServices(): ServiceItem[] {
  return servicesData as ServiceItem[];
}

export function getServiceById(id: string): ServiceItem | undefined {
  return (servicesData as ServiceItem[]).find((service) => service.id === id);
}

export function getAnimals(): AnimalCategory[] {
  return animalsData as AnimalCategory[];
}

export function getActiveAnimals(): AnimalCategory[] {
  return (animalsData as AnimalCategory[]).filter((animal) => !animal.comingSoon);
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getStoryPanels(): StoryPanel[] {
  return storyData as StoryPanel[];
}
