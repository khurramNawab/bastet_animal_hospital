import { describe, it, expect } from 'vitest';
import { getAnimals, getAnimalBySlug, getServicesByAnimal } from '@/lib/data';
import { waitlistSchema } from '@/lib/schemas/waitlist';
import { POST } from '@/app/api/waitlist/route';
import { NextRequest } from 'next/server';

describe('Animal & Service Data Loaders', () => {
  it('correctly filters services by animal species', () => {
    const dogServices = getServicesByAnimal('dog');
    expect(dogServices).toHaveLength(7);

    const catServices = getServicesByAnimal('cat');
    expect(catServices).toHaveLength(0);
  });

  it('retrieves animal categories by slug', () => {
    const dog = getAnimalBySlug('dog');
    expect(dog).toBeDefined();
    expect(dog?.comingSoon).toBe(false);
    expect(dog?.active).toBe(true);

    const cat = getAnimalBySlug('cat');
    expect(cat).toBeDefined();
    expect(cat?.comingSoon).toBe(true);

    const nonExistent = getAnimalBySlug('dragon');
    expect(nonExistent).toBeUndefined();
  });

  it('contains valid service slugs and feature bullet arrays', () => {
    const dogServices = getServicesByAnimal('dog');
    dogServices.forEach((service) => {
      expect(service.slug).toBeDefined();
      expect(service.slug.length).toBeGreaterThan(3);
      expect(service.features).toBeDefined();
      expect(service.features?.length).toBeGreaterThanOrEqual(3);
    });
  });
});

describe('Waitlist Schema Validation', () => {
  it('accepts valid waitlist input', () => {
    const result = waitlistSchema.safeParse({
      email: 'parent@example.com',
      name: 'Aditi Sen',
      phone: '+91 98300 12345',
      animal: 'Feline (Cats)',
      hp: '',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal required waitlist input (only email and animal)', () => {
    const result = waitlistSchema.safeParse({
      email: 'parent@example.com',
      animal: 'Avian (Birds)',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    const result = waitlistSchema.safeParse({
      email: 'invalid-email-string',
      animal: 'Feline (Cats)',
    });
    expect(result.success).toBe(false);
  });

  it('rejects submissions when honeypot is populated by bots', () => {
    const result = waitlistSchema.safeParse({
      email: 'bot@spam.com',
      animal: 'Feline (Cats)',
      hp: 'http://spam-link.com',
    });
    expect(result.success).toBe(false);
  });
});

describe('/api/waitlist Route Handler', () => {
  it('returns 400 for invalid body payload', async () => {
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'bad-email' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 when honeypot field is filled', async () => {
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        email: 'bot@spam.com',
        animal: 'Feline (Cats)',
        hp: 'bot-input',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns successful 200/201 response for valid payload in offline/mock mode', async () => {
    const req = new NextRequest('http://localhost:3000/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        email: 'petlover@kolkata.in',
        name: 'Sourav Roy',
        animal: 'Feline (Cats)',
        hp: '',
      }),
    });
    const res = await POST(req);
    expect([200, 201]).toContain(res.status);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});
