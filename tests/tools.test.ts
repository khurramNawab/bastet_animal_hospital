import { describe, it, expect } from 'vitest';
import { calcHumanAge } from '@/lib/tools/age';
import { evaluateTriage } from '@/lib/tools/triage';
import { getAgeCalculatorConfig, getSymptomCheckerConfig } from '@/lib/data';

describe('Phase 6: Interactive Tools', () => {
  const ageConfig = getAgeCalculatorConfig();
  const symptomConfig = getSymptomCheckerConfig();

  describe('Dog Age Calculator Math & Logic', () => {
    it('calculates 1 year canine as 15 human years across all sizes', () => {
      const resSmall = calcHumanAge({ years: 1, size: 'small' }, ageConfig);
      const resMedium = calcHumanAge({ years: 1, size: 'medium' }, ageConfig);
      const resGiant = calcHumanAge({ years: 1, size: 'giant' }, ageConfig);

      expect(resSmall.exactHumanAge).toBe(15);
      expect(resMedium.exactHumanAge).toBe(15);
      expect(resGiant.exactHumanAge).toBe(15);
    });

    it('calculates 2 year canine as 24 human years (15 + 9)', () => {
      const res = calcHumanAge({ years: 2, size: 'medium' }, ageConfig);
      expect(res.exactHumanAge).toBe(24);
    });

    it('calculates 3 year medium dog as 29 human years (15 + 9 + 5)', () => {
      const res = calcHumanAge({ years: 3, size: 'medium' }, ageConfig);
      expect(res.exactHumanAge).toBe(29);
      expect(res.roundedHumanAge).toBe(29);
      expect(res.isValid).toBe(true);
    });

    it('calculates 5 year dogs accurately based on breed size rates', () => {
      // Small: 15 + 9 + 3*4 = 36
      const resSmall = calcHumanAge({ years: 5, size: 'small' }, ageConfig);
      expect(resSmall.exactHumanAge).toBe(36);

      // Medium: 15 + 9 + 3*5 = 39
      const resMedium = calcHumanAge({ years: 5, size: 'medium' }, ageConfig);
      expect(resMedium.exactHumanAge).toBe(39);

      // Large: 15 + 9 + 3*6 = 42
      const resLarge = calcHumanAge({ years: 5, size: 'large' }, ageConfig);
      expect(resLarge.exactHumanAge).toBe(42);

      // Giant: 15 + 9 + 3*7 = 45
      const resGiant = calcHumanAge({ years: 5, size: 'giant' }, ageConfig);
      expect(resGiant.exactHumanAge).toBe(45);
    });

    it('handles fractional ages with months properly', () => {
      // 1 year 6 months = 1.5 yrs => 15 + 0.5 * 9 = 19.5
      const res = calcHumanAge({ years: 1, months: 6, size: 'medium' }, ageConfig);
      expect(res.exactHumanAge).toBe(19.5);
      expect(res.roundedHumanAge).toBe(20);
    });

    it('rejects invalid inputs gracefully (0 or >30 years)', () => {
      const resZero = calcHumanAge({ years: 0, months: 0, size: 'medium' }, ageConfig);
      expect(resZero.isValid).toBe(false);
      expect(resZero.errorMessage).toBeDefined();

      const resOld = calcHumanAge({ years: 35, size: 'medium' }, ageConfig);
      expect(resOld.isValid).toBe(false);
      expect(resOld.errorMessage).toBeDefined();
    });
  });

  describe('Symptom Checker Triage Engine', () => {
    it('immediately triggers emergency priority for any red flag', () => {
      const result = evaluateTriage(
        {
          selectedRedFlags: ['breathing'],
          questionAnswers: {},
        },
        symptomConfig,
      );

      expect(result.urgency).toBe('emergency');
      expect(result.isRedFlag).toBe(true);
      expect(result.triggeredRedFlags.length).toBeGreaterThan(0);
      expect(result.urgencyDetails.level).toBe(4);
    });

    it('evaluates mild non-critical answers as home monitoring', () => {
      const result = evaluateTriage(
        {
          selectedRedFlags: [],
          questionAnswers: {
            duration: 'd_hours',
            appetite: 'ap_normal',
            digestive: 'dg_none',
            energy: 'en_bright',
            pain: 'pn_none',
            age_group: 'ag_adult',
          },
        },
        symptomConfig,
      );

      expect(result.urgency).toBe('soon'); // score is 2 from duration
      expect(result.isRedFlag).toBe(false);
    });

    it('evaluates completely zero symptom scores as monitor', () => {
      const result = evaluateTriage(
        {
          selectedRedFlags: [],
          questionAnswers: {
            appetite: 'ap_normal',
            digestive: 'dg_none',
            energy: 'en_bright',
            pain: 'pn_none',
            age_group: 'ag_adult',
          },
        },
        symptomConfig,
      );

      expect(result.urgency).toBe('monitor');
      expect(result.totalScore).toBe(0);
    });

    it('escalates severe vomiting / blood to emergency conservatively', () => {
      const result = evaluateTriage(
        {
          selectedRedFlags: [],
          questionAnswers: {
            digestive: 'dg_blood',
          },
        },
        symptomConfig,
      );

      expect(result.urgency).toBe('emergency');
    });
  });

  describe('Data Integrity, Disclaimers & Safety Checks', () => {
    it('requires needsVetReview metadata flag on both tool datasets', () => {
      expect(ageConfig.needsVetReview).toBe(true);
      expect(symptomConfig.needsVetReview).toBe(true);
    });

    it('contains mandatory non-diagnostic disclaimers', () => {
      expect(ageConfig.disclaimer).toContain('approximate');
      expect(symptomConfig.disclaimer).toContain('NOT a medical diagnosis');
    });

    it('contains non-empty red flag and question sets', () => {
      expect(symptomConfig.redFlags.length).toBeGreaterThanOrEqual(10);
      expect(symptomConfig.questions.length).toBeGreaterThanOrEqual(5);
    });
  });
});
