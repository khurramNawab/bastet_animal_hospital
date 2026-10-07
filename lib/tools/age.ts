import type { AgeCalculatorConfig, DogLifeStage, DogSizeId } from '@/lib/types';

export interface CalcAgeInput {
  years: number;
  months?: number;
  size: DogSizeId;
}

export interface CalcAgeResult {
  isValid: boolean;
  errorMessage?: string;
  totalDogYears: number;
  exactHumanAge: number;
  roundedHumanAge: number;
  lifeStage?: DogLifeStage;
  careHint?: string;
}

export function calcHumanAge(
  input: CalcAgeInput,
  config: AgeCalculatorConfig,
): CalcAgeResult {
  const years = Number(input.years) || 0;
  const months = Number(input.months) || 0;
  const totalDogYears = years + months / 12;

  if (totalDogYears <= 0) {
    return {
      isValid: false,
      errorMessage: 'Please enter an age greater than 0.',
      totalDogYears: 0,
      exactHumanAge: 0,
      roundedHumanAge: 0,
    };
  }

  if (totalDogYears > 30) {
    return {
      isValid: false,
      errorMessage: 'Canine age typically does not exceed 30 years.',
      totalDogYears,
      exactHumanAge: 0,
      roundedHumanAge: 0,
    };
  }

  const sizeCategory = config.sizes.find((s) => s.id === input.size) || config.sizes[1]; // default medium
  const { year1Equivalent, year2Equivalent } = config;
  const perYearRate = sizeCategory.perYearAfter2;

  let humanAge: number;

  if (totalDogYears <= 1) {
    humanAge = totalDogYears * year1Equivalent;
  } else if (totalDogYears <= 2) {
    humanAge = year1Equivalent + (totalDogYears - 1) * year2Equivalent;
  } else {
    humanAge = year1Equivalent + year2Equivalent + (totalDogYears - 2) * perYearRate;
  }

  const exactHumanAge = Math.round(humanAge * 10) / 10;
  const roundedHumanAge = Math.round(humanAge);

  // Identify matching life stage
  const lifeStage =
    config.lifeStages.find(
      (stage) => exactHumanAge >= stage.minHumanAge && exactHumanAge <= stage.maxHumanAge,
    ) || config.lifeStages[config.lifeStages.length - 1];

  return {
    isValid: true,
    totalDogYears: Math.round(totalDogYears * 10) / 10,
    exactHumanAge,
    roundedHumanAge,
    lifeStage,
    careHint: lifeStage?.careHint,
  };
}
