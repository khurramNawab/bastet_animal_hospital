import type { SiteConfig } from '@/lib/types';

export interface TimeSlot {
  time: string; // "09:00"
  label: string; // "09:00 AM"
  isAvailable: boolean;
}

const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m < 10 ? '0' : ''}${m} ${period}`;
}

export function generateTimeSlots(
  dateString: string,
  siteConfig: SiteConfig,
  now: Date = new Date(),
): TimeSlot[] {
  if (!dateString) return [];

  // Parse target date (using UTC/local parts to avoid timezone shifting)
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3) return [];
  const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);

  if (isNaN(targetDate.getTime())) return [];

  const dayName = DAY_NAMES[targetDate.getDay()];
  const daySchedule = siteConfig.openingHours?.[dayName];

  if (!daySchedule || daySchedule.isClosed) {
    return [];
  }

  // Parse opening and closing times in minutes
  const [openH, openM] = daySchedule.open.split(':').map(Number);
  const [closeH, closeM] = daySchedule.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const duration = siteConfig.slotsConfig.durationMinutes || 30;
  const minNoticeHours = siteConfig.slotsConfig.minNoticeHours || 2;

  // Check if targetDate is today
  const isToday =
    targetDate.getFullYear() === now.getFullYear() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getDate() === now.getDate();

  const currentMinutesToday = now.getHours() * 60 + now.getMinutes();
  const noticeMinutesCutoff = currentMinutesToday + minNoticeHours * 60;

  const slots: TimeSlot[] = [];

  for (let m = openMinutes; m + duration <= closeMinutes; m += duration) {
    const slotH = Math.floor(m / 60);
    const slotM = m % 60;
    const time24 = `${slotH < 10 ? '0' : ''}${slotH}:${slotM < 10 ? '0' : ''}${slotM}`;
    const label = formatTime12h(time24);

    let isAvailable = true;

    if (isToday && m < noticeMinutesCutoff) {
      isAvailable = false;
    }

    slots.push({
      time: time24,
      label,
      isAvailable,
    });
  }

  return slots;
}

export function getDateConstraints(siteConfig: SiteConfig, now: Date = new Date()) {
  const minDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;

  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + (siteConfig.slotsConfig.bookingWindowDays || 30));

  const maxDateStr = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(maxDate.getDate()).padStart(2, '0')}`;

  return {
    minDate: minDateStr,
    maxDate: maxDateStr,
  };
}
