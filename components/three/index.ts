import dynamic from 'next/dynamic';

export const HeroCanvas = dynamic(() => import('./HeroCanvas').then((mod) => mod.HeroCanvas), {
  ssr: false,
});

export const StoryCanvas = dynamic(() => import('./StoryCanvas').then((mod) => mod.StoryCanvas), {
  ssr: false,
});
