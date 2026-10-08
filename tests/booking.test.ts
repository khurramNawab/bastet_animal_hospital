import { describe, it, expect } from 'vitest';
import { normalizeIndianPhone, bookingSchema } from '@/lib/schemas/booking';
import { generateTimeSlots, getDateConstraints, formatTime12h } from '@/lib/booking/slots';
import { buildWhatsAppBookingUrl } from '@/lib/booking/whatsapp';
import { getClinicOpenStatus } from '@/lib/booking/openStatus';
import { getSiteConfig } from '@/lib/data';

describe('Phase 7: Booking & Contact Utilities', () => {
  const siteConfig = getSiteConfig();

  describe('Indian Phone Number Normalization & Validation', () => {
    it('normalizes 10-digit numbers starting with 6, 7, 8, 9', () => {
      expect(normalizeIndianPhone('9830012345')).toBe('+919830012345');
      expect(normalizeIndianPhone('8100022738')).toBe('+918100022738');
      expect(normalizeIndianPhone('7003011223')).toBe('+917003011223');
      expect(normalizeIndianPhone('6290011223')).toBe('+916290011223');
    });

    it('handles +91 and 0 prefixes with spaces and dashes', () => {
      expect(normalizeIndianPhone('+91 98300-12345')).toBe('+919830012345');
      expect(normalizeIndianPhone('09830012345')).toBe('+919830012345');
      expect(normalizeIndianPhone('919830012345')).toBe('+919830012345');
    });

    it('rejects invalid numbers (starting with 0-5, too short, or containing letters)', () => {
      expect(normalizeIndianPhone('5123456789')).toBeNull();
      expect(normalizeIndianPhone('12345')).toBeNull();
      expect(normalizeIndianPhone('98300abcde')).toBeNull();
      expect(normalizeIndianPhone('')).toBeNull();
    });
  });

  describe('Booking Form Schema Validation', () => {
    it('validates a complete, compliant booking payload', () => {
      const validData = {
        ownerName: 'Souvik Ghosh',
        phone: '9830012345',
        email: 'souvik@example.com',
        animal: 'dog',
        petName: 'Bruno',
        breed: 'German Shepherd',
        petAge: '4 years',
        service: 'cardiac-screening',
        doctor: 'dr-ananya-sen',
        date: '2026-10-15',
        time: '11:00',
        message: 'Annual echocardiogram check',
        consent: true,
      };

      const result = bookingSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.phone).toBe('+919830012345');
        expect(result.data.ownerName).toBe('Souvik Ghosh');
      }
    });

    it('fails when mandatory consent is false', () => {
      const invalidData = {
        ownerName: 'Souvik Ghosh',
        phone: '9830012345',
        petName: 'Bruno',
        service: 'cardiac-screening',
        date: '2026-10-15',
        time: '11:00',
        consent: false,
      };

      const result = bookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('fails when phone number is invalid', () => {
      const invalidData = {
        ownerName: 'Souvik Ghosh',
        phone: '12345',
        petName: 'Bruno',
        service: 'cardiac-screening',
        date: '2026-10-15',
        time: '11:00',
        consent: true,
      };

      const result = bookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Time Slots Generator', () => {
    it('generates correct number of slots for Mon-Sat (09:00 - 21:00, 30 min duration)', () => {
      // 2026-10-12 is a Monday
      const mondaySlots = generateTimeSlots('2026-10-12', siteConfig, new Date(2026, 9, 1, 8, 0));
      // 9:00 to 21:00 = 12 hours = 24 slots of 30 mins
      expect(mondaySlots.length).toBe(24);
      expect(mondaySlots[0].time).toBe('09:00');
      expect(mondaySlots[mondaySlots.length - 1].time).toBe('20:30');
    });

    it('generates correct number of slots for Sunday (10:00 - 14:00, 30 min duration)', () => {
      // 2026-10-18 is a Sunday
      const sundaySlots = generateTimeSlots('2026-10-18', siteConfig, new Date(2026, 9, 1, 8, 0));
      // 10:00 to 14:00 = 4 hours = 8 slots of 30 mins
      expect(sundaySlots.length).toBe(8);
      expect(sundaySlots[0].time).toBe('10:00');
      expect(sundaySlots[sundaySlots.length - 1].time).toBe('13:30');
    });

    it('disables past slots when booking for today with 2h notice', () => {
      // Suppose today is Monday 2026-10-12 at 14:00 (2:00 PM)
      const mockNow = new Date(2026, 9, 12, 14, 0);
      const slots = generateTimeSlots('2026-10-12', siteConfig, mockNow);

      // Cutoff is 14:00 + 2h = 16:00
      const slot1400 = slots.find((s) => s.time === '14:00');
      const slot1530 = slots.find((s) => s.time === '15:30');
      const slot1630 = slots.find((s) => s.time === '16:30');

      expect(slot1400?.isAvailable).toBe(false);
      expect(slot1530?.isAvailable).toBe(false);
      expect(slot1630?.isAvailable).toBe(true);
    });

    it('formats 24h times to 12h AM/PM nicely', () => {
      expect(formatTime12h('09:00')).toBe('9:00 AM');
      expect(formatTime12h('12:30')).toBe('12:30 PM');
      expect(formatTime12h('18:00')).toBe('6:00 PM');
    });
  });

  describe('WhatsApp Link Builder', () => {
    it('creates properly encoded WhatsApp booking URL', () => {
      const url = buildWhatsAppBookingUrl({
        ownerName: 'Priyanka Roy',
        petName: 'Bella',
        serviceTitle: 'Dental Scaling',
        date: '2026-10-16',
        time: '14:30',
        requestCode: 'BST-ABC123',
        whatsappNumber: '919000000000',
      });

      expect(url).toContain('https://wa.me/919000000000?text=');
      expect(url).toContain(encodeURIComponent('BST-ABC123'));
      expect(url).toContain(encodeURIComponent('Bella'));
      expect(url).toContain(encodeURIComponent('Dental Scaling'));
    });
  });

  describe('Clinic Real-Time Open Status', () => {
    it('calculates open/closed status in Kolkata timezone', () => {
      // Mock Tuesday at 11:30 AM IST (06:00 UTC)
      const mockTuesdayOpen = new Date('2026-10-13T06:00:00Z');
      const statusOpen = getClinicOpenStatus(siteConfig, mockTuesdayOpen);
      expect(statusOpen.isOpen).toBe(true);
      expect(statusOpen.statusLabel).toBe('Open Now');

      // Mock Tuesday at 11:30 PM IST (18:00 UTC)
      const mockTuesdayClosed = new Date('2026-10-13T18:00:00Z');
      const statusClosed = getClinicOpenStatus(siteConfig, mockTuesdayClosed);
      expect(statusClosed.isOpen).toBe(false);
      expect(statusClosed.statusLabel).toBe('Closed');
    });
  });
});
