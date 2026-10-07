import dynamic from 'next/dynamic';

export const HeroCanvas = dynamic(() => import('./HeroCanvas').then((mod) => mod.HeroCanvas), {
  ssr: false,
});
