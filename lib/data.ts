import siteData from '@/data/site.json';
import doctorsData from '@/data/doctors.json';
import servicesData from '@/data/services.json';
import animalsData from '@/data/animals.json';
import testimonialsData from '@/data/testimonials.json';
import storyData from '@/data/story.json';
import toolsData from '@/data/tools.json';
import symptomCheckerData from '@/data/symptom-checker.json';

import type {
  SiteConfig,
  Doctor,
  ServiceItem,
  AnimalCategory,
  Testimonial,
  StoryPanel,
  AgeCalculatorConfig,
  SymptomCheckerConfig,
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

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return (doctorsData as Doctor[]).find((doc) => doc.slug === slug);
}

export function getDoctorsByAnimal(animalSlug: string): Doctor[] {
  return (doctorsData as Doctor[]).filter((doc) => doc.animals.includes(animalSlug));
}

export function getServices(): ServiceItem[] {
  return servicesData as ServiceItem[];
}

export function getServiceById(id: string): ServiceItem | undefined {
  return (servicesData as ServiceItem[]).find((service) => service.id === id);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return (servicesData as ServiceItem[]).find((service) => service.slug === slug);
}

export function getServicesByAnimal(animalSlug: string): ServiceItem[] {
  return (servicesData as ServiceItem[]).filter((service) => service.animals.includes(animalSlug));
}

export function getAnimals(): AnimalCategory[] {
  return animalsData as AnimalCategory[];
}

export function getAnimalBySlug(slug: string): AnimalCategory | undefined {
  return (animalsData as AnimalCategory[]).find((animal) => animal.slug === slug);
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

export function getAgeCalculatorConfig(): AgeCalculatorConfig {
  return toolsData.ageCalculator as AgeCalculatorConfig;
}

export function getSymptomCheckerConfig(): SymptomCheckerConfig {
  return symptomCheckerData.symptomChecker as SymptomCheckerConfig;
}

