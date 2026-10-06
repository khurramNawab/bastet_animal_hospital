import { describe, it, expect } from 'vitest';
import {
  getSiteConfig,
  getDoctors,
  getServices,
  getAnimals,
  getActiveAnimals,
  getTestimonials,
} from '@/lib/data';

describe('Data Loaders & Schema Validation', () => {
  it('loads site configuration with all essential contact and timing details', () => {
    const site = getSiteConfig();
    expect(site).toBeDefined();
    expect(site.name).toBe('Bastet Small Animal Hospital');
    expect(site.city).toBe('Kolkata');
    expect(site.timings.emergency).toBeDefined();
    expect(site.stats.length).toBeGreaterThanOrEqual(4);
    expect(site.navLinks.length).toBeGreaterThanOrEqual(5);
  });

  it('loads exactly 3 doctors with valid bio, experience, and dog speciality', () => {
    const doctors = getDoctors();
    expect(doctors).toHaveLength(3);
    doctors.forEach((doc) => {
      expect(doc.id).toBeDefined();
      expect(doc.name).toMatch(/^Dr\./);
      expect(doc.yearsOfExperience).toBeGreaterThan(0);
      expect(doc.animals).toContain('dog');
    });
  });

  it('loads exactly 7 veterinary services', () => {
    const services = getServices();
    expect(services).toHaveLength(7);
    const serviceIds = services.map((s) => s.id);
    expect(serviceIds).toContain('vaccination');
    expect(serviceIds).toContain('surgery');
    expect(serviceIds).toContain('dental-care');
    expect(serviceIds).toContain('grooming');
    expect(serviceIds).toContain('emergency');
    expect(serviceIds).toContain('diagnostics');
    expect(serviceIds).toContain('pet-boarding');
  });

  it('validates animals configuration: dog active and other 3 coming soon', () => {
    const animals = getAnimals();
    expect(animals).toHaveLength(4);

    const activeAnimals = getActiveAnimals();
    expect(activeAnimals).toHaveLength(1);
    expect(activeAnimals[0].id).toBe('dog');
    expect(activeAnimals[0].comingSoon).toBe(false);

    const comingSoonAnimals = animals.filter((a) => a.comingSoon);
    expect(comingSoonAnimals).toHaveLength(3);
  });

  it('loads 3 testimonials with valid Kolkata locations', () => {
    const testimonials = getTestimonials();
    expect(testimonials).toHaveLength(3);
    testimonials.forEach((item) => {
      expect(item.name).toBeDefined();
      expect(item.area).toContain('Kolkata');
      expect(item.rating).toBe(5);
    });
  });
});
