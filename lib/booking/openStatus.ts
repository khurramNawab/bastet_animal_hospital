import type { SiteConfig } from '@/lib/types';

export interface ClinicOpenStatus {
  isOpen: boolean;
  statusLabel: 'Open Now' | 'Closed';
  dayName: string;
  hoursLabel: string;
  message: string;
}

const DAY_KEYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export function getKolkataTime(now: Date = new Date()): {
  dayIndex: number;
  minutesNow: number;
  timeString: string;
} {
  // Convert date to Asia/Kolkata timezone (+05:30)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const weekday = parts.find((p) => p.type === 'weekday')?.value || '';

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayIndex = weekdayMap[weekday] ?? now.getDay();
  const minutesNow = hour * 60 + minute;
  const timeString = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;

  return { dayIndex, minutesNow, timeString };
}

export function getClinicOpenStatus(
  siteConfig: SiteConfig,
  now: Date = new Date(),
): ClinicOpenStatus {
  const { dayIndex, minutesNow } = getKolkataTime(now);
  const dayKey = DAY_KEYS[dayIndex];
  const schedule = siteConfig.openingHours?.[dayKey];

  if (!schedule || schedule.isClosed) {
    return {
      isOpen: false,
      statusLabel: 'Closed',
      dayName: dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
      hoursLabel: 'Closed Today',
      message: 'OPD is closed today. Emergency unit is 24/7 active.',
    };
  }

  const [openH, openM] = schedule.open.split(':').map(Number);
  const [closeH, closeM] = schedule.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = minutesNow >= openMinutes && minutesNow < closeMinutes;

  return {
    isOpen,
    statusLabel: isOpen ? 'Open Now' : 'Closed',
    dayName: dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
    hoursLabel: schedule.label,
    message: isOpen
      ? `OPD is open until ${schedule.close} today. 24x7 Emergency active.`
      : `OPD is currently closed (Hours: ${schedule.label}). 24x7 Emergency active.`,
  };
}
