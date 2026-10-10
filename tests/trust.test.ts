import { describe, it, expect } from 'vitest';
import { getDoctors, getDoctorBySlug, getDoctorsByAnimal, getTestimonials } from '@/lib/data';
import { formatIndianNumber } from '@/components/sections/Stats';

describe('Doctor Loaders & Schema', () => {
  it('loads all 3 veterinary doctors with complete profiles and isDummy flag', () => {
    const doctors = getDoctors();
    expect(doctors).toHaveLength(3);
    doctors.forEach((doc) => {
      expect(doc.id).toBeDefined();
      expect(doc.slug).toBeDefined();
      expect(doc.qualifications).toBeDefined();
      expect(doc.languages?.length).toBeGreaterThanOrEqual(2);
      expect(doc.specialties?.length).toBeGreaterThanOrEqual(3);
      expect(doc.isDummy).toBe(true);
    });
  });

  it('retrieves a doctor by slug', () => {
    const doctor = getDoctorBySlug('dr-ananya-sen');
    expect(doctor).toBeDefined();
    expect(doctor?.name).toBe('Dr. Ananya Sen');
    expect(doctor?.yearsOfExperience).toBe(12);

    const nonExistent = getDoctorBySlug('dr-unknown');
    expect(nonExistent).toBeUndefined();
  });

  it('filters doctors by animal species specialization', () => {
    const dogDoctors = getDoctorsByAnimal('dog');
    expect(dogDoctors).toHaveLength(3);

    const catDoctors = getDoctorsByAnimal('cat');
    expect(catDoctors).toHaveLength(0);
  });
});

describe('Indian Number Formatting for Stats', () => {
  it('formats numbers with Indian comma placement (Lakhs / Thousands)', () => {
    expect(formatIndianNumber(5000)).toBe('5,000');
    expect(formatIndianNumber(15)).toBe('15');
    expect(formatIndianNumber(24)).toBe('24');
    expect(formatIndianNumber(100000)).toBe('1,00,000');
  });
});

describe('Testimonials Loaders & Schema', () => {
  it('loads all 3 customer testimonials with valid Kolkata locations', () => {
    const testimonials = getTestimonials();
    expect(testimonials).toHaveLength(3);
    testimonials.forEach((t) => {
      expect(t.name).toBeDefined();
      expect(t.area).toContain('Kolkata');
      expect(t.rating).toBeGreaterThanOrEqual(4);
      expect(t.isDummy).toBe(true);
    });
  });
});
