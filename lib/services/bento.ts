import type { ServiceItem } from '@/lib/types';

export interface BentoSpan {
  colSpan: string;
  rowSpan: string;
  isFeature: boolean;
  isWide: boolean;
}

/**
 * Pure helper to compute Bento grid responsive layout spans from service metadata
 */
export function getBentoLayout(service: ServiceItem): BentoSpan {
  const layout = service.layout || 'normal';

  switch (layout) {
    case 'feature':
      return {
        colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
        rowSpan: 'row-span-1 md:row-span-2 lg:row-span-2',
        isFeature: true,
        isWide: false,
      };
    case 'wide':
      return {
        colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
        rowSpan: 'row-span-1',
        isFeature: false,
        isWide: true,
      };
    case 'normal':
    default:
      return {
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
        isFeature: false,
        isWide: false,
      };
  }
}
