import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { SceneWipe } from '@/components/ui/SceneWipe';
import { Story } from '@/components/sections/Story';
import { HillDivider } from '@/components/ui/HillDivider';
import { EmergencyBand } from '@/components/sections/EmergencyBand';
import { Services } from '@/components/sections/Services';
import { Doctors } from '@/components/sections/Doctors';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { Tools } from '@/components/sections/Tools';
import { CrossDivider } from '@/components/ui/CrossDivider';
import {
  getSiteConfig,
  getServices,
  getStoryPanels,
  getAnimals,
  getDoctors,
  getTestimonials,
  getAgeCalculatorConfig,
  getSymptomCheckerConfig,
} from '@/lib/data';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const services = getServices();
  const storyPanels = getStoryPanels();
  const animals = getAnimals();
  const doctors = getDoctors();
  const testimonials = getTestimonials();
  const ageConfig = getAgeCalculatorConfig();
  const symptomConfig = getSymptomCheckerConfig();

  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* 1. Cinematic 3D Hero Section with Floating Badges & Services Marquee */}
      <Hero siteConfig={siteConfig} />

      {/* 2. Hero -> Story Hill Wipe Transition */}
      <SceneWipe />

      {/* 3. Cinematic Pinned 3D Multi-Scene Scroll Storytelling Section */}
      <Story panels={storyPanels} />

      {/* 4. Story -> Emergency Curved Transition */}
      <HillDivider fromColor="olive-deep" toColor="orange-deep" variant="hill" />

      {/* 5. 24x7 Emergency Band with Scroll-Animated ECG Waveform */}
      <EmergencyBand siteConfig={siteConfig} />

      {/* 6. Emergency -> Services Curved Transition */}
      <HillDivider fromColor="orange-deep" toColor="cream" variant="concave" />

      {/* 7. Multi-Species Services Section with SpeciesTabs & Tilt Cards */}
      <Services animals={animals} services={services} defaultSpecies="dog" />

      {/* Medical Cross Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CrossDivider variant="cross" />
      </div>

      {/* 4. Interactive Pet Health & Triage Tools */}
      <Tools
        ageConfig={ageConfig}
        symptomConfig={symptomConfig}
        siteConfig={siteConfig}
      />

      {/* Paw Prints Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CrossDivider variant="paws" />
      </div>

      {/* 5. Doctors & Medical Faculty Showcase */}
      <Doctors doctors={doctors} />

      {/* 6. Viewport Stats Counters Band */}
      <Stats stats={siteConfig.stats} />

      {/* 7. Drag Slider Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Bottom Line Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CrossDivider variant="line" />
      </div>
    </main>
  );
}
