import { describe, it, expect } from 'vitest';
import { evaluateTriage } from '@/lib/tools/triage';
import { calcHumanAge } from '@/lib/tools/age';
import { generateTimeSlots, getDateConstraints } from '@/lib/booking/slots';
import { getSiteConfig, getSymptomCheckerConfig, getAgeCalculatorConfig } from '@/lib/data';

describe('R5 Inner Pages & Features QA Suite', () => {
  const siteConfig = getSiteConfig();
  const symptomConfig = getSymptomCheckerConfig();
  const ageConfig = getAgeCalculatorConfig();

  describe('1. Urgency Token Mapping & Clinical Triage', () => {
    it('maps red flags directly to emergency urgency level', () => {
      const redFlagId = symptomConfig.redFlags[0].id;
      const triage = evaluateTriage(
        {
          selectedRedFlags: [redFlagId],
          questionAnswers: {},
        },
        symptomConfig,
      );

      expect(triage.urgency).toBe('emergency');
      expect(triage.triggeredRedFlags.length).toBeGreaterThan(0);
      expect(triage.urgencyDetails.actionPrimary).toBeDefined();
    });

    it('maps benign questions to monitor urgency level', () => {
      const benignAnswers: Record<string, string> = {
        'breathing-difficulty': 'breathing-normal',
        'vomiting-frequency': 'vomit-none',
        'eating-drinking': 'appetite-normal',
        'energy-level': 'energy-normal',
      };

      const triage = evaluateTriage(
        {
          selectedRedFlags: [],
          questionAnswers: benignAnswers,
        },
        symptomConfig,
      );

      expect(triage.urgency).toBe('monitor');
    });

    it('always includes mandatory non-diagnosis disclaimer in symptom config', () => {
      expect(symptomConfig.disclaimer).toMatch(/NOT a medical diagnosis/i);
    });
  });

  describe('2. Canine Age Calculator Count-Up & Life Stages', () => {
    it('correctly computes human years for medium dogs', () => {
      const result = calcHumanAge(
        {
          years: 3,
          months: 0,
          size: 'medium',
        },
        ageConfig,
      );

      expect(result.isValid).toBe(true);
      expect(result.roundedHumanAge).toBe(29);
      expect(result.lifeStage?.label).toBe('Young Adult');
      expect(result.careHint).toBeDefined();
    });

    it('gracefully handles boundary 0 years 0 months', () => {
      const result = calcHumanAge(
        {
          years: 0,
          months: 0,
          size: 'small',
        },
        ageConfig,
      );

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBeDefined();
    });
  });

  describe('3. Booking Slot Chips & Date Constraints', () => {
    it('generates valid appointment date boundaries', () => {
      const { minDate, maxDate } = getDateConstraints(siteConfig);
      expect(minDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(maxDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(maxDate).getTime()).toBeGreaterThan(new Date(minDate).getTime());
    });

    it('generates time slots for valid weekdays', () => {
      const d = new Date();
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
      }
      const mondayStr = d.toISOString().split('T')[0];
      const slots = generateTimeSlots(mondayStr, siteConfig);

      expect(slots.length).toBeGreaterThan(0);
      expect(slots[0]).toHaveProperty('time');
      expect(slots[0]).toHaveProperty('label');
      expect(slots[0]).toHaveProperty('isAvailable');
    });
  });

  describe('4. Site Configuration Integrity', () => {
    it('verifies all navigation links have valid routes', () => {
      expect(siteConfig.navLinks.length).toBeGreaterThan(0);
      for (const link of siteConfig.navLinks) {
        expect(link.href).toBeDefined();
        expect(link.href.startsWith('/') || link.href.startsWith('/#')).toBe(true);
      }
    });

    it('ensures 24/7 phone number is formatted for click-to-call', () => {
      const phoneDigits = siteConfig.phone.replace(/\D/g, '');
      expect(phoneDigits.length).toBeGreaterThanOrEqual(10);
    });
  });
});
