import React from 'react';
import type { Metadata } from 'next';
import { Services } from '@/components/sections/Services';
import { getAnimals, getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Veterinary Services in Kolkata | Bastet Small Animal Hospital',
  description:
    'Explore comprehensive medical, surgical, dental, grooming, and 24x7 emergency services for canines, felines, and birds at Bastet Small Animal Hospital in Kolkata.',
};

export default function ServicesIndexPage() {
  const animals = getAnimals();
  const services = getServices();

  return (
    <main className="min-h-screen py-6">
      <Services animals={animals} services={services} defaultSpecies="dog" />
    </main>
  );
}
