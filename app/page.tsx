import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Services } from '@/components/sections/Services';
import { Doctors } from '@/components/sections/Doctors';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { GoldDivider } from '@/components/ui/GoldDivider';
import {
  getSiteConfig,
  getServices,
  getStoryPanels,
  getAnimals,
  getDoctors,
  getTestimonials,
} from '@/lib/data';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const services = getServices();
  const storyPanels = getStoryPanels();
  const animals = getAnimals();
  const doctors = getDoctors();
  const testimonials = getTestimonials();

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* 1. Cinematic 3D Hero Section */}
      <Hero siteConfig={siteConfig} />

      {/* 2. Cinematic Pinned 3D Scroll Storytelling Section */}
      <Story panels={storyPanels} />

      {/* 3. Multi-Species Services Section with SpeciesTabs & Tilt Cards */}
      <Services animals={animals} services={services} defaultSpecies="dog" />

      {/* Egyptian Eye of Horus Gold Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoldDivider variant="eye" />
      </div>

      {/* 4. Doctors & Medical Faculty Showcase */}
      <Doctors doctors={doctors} />

      {/* 5. Viewport Stats Counters Band */}
      <Stats stats={siteConfig.stats} />

      {/* 6. Drag Slider Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Bottom Line Gold Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <GoldDivider variant="line" />
      </div>
    </main>
  );
}
