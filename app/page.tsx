import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Services } from '@/components/sections/Services';
import { getSiteConfig, getServices, getStoryPanels, getAnimals } from '@/lib/data';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const services = getServices();
  const storyPanels = getStoryPanels();
  const animals = getAnimals();

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Cinematic 3D Hero Section */}
      <Hero siteConfig={siteConfig} />

      {/* Cinematic Pinned 3D Scroll Storytelling Section */}
      <Story panels={storyPanels} />

      {/* Dynamic Multi-Species Services Section with SpeciesTabs & Tilt Cards */}
      <Services animals={animals} services={services} defaultSpecies="dog" />
    </main>
  );
}
