import type {
  SymptomCheckerConfig,
  TriageUrgency,
  TriageUrgencyDetails,
} from '@/lib/types';

export interface TriageInput {
  selectedRedFlags: string[];
  questionAnswers: Record<string, string>; // questionId -> optionId
}

export interface TriageEvaluationResult {
  urgency: TriageUrgency;
  urgencyDetails: TriageUrgencyDetails;
  isRedFlag: boolean;
  triggeredRedFlags: string[];
  totalScore: number;
  disclaimer: string;
}

export function evaluateTriage(
  input: TriageInput,
  config: SymptomCheckerConfig,
): TriageEvaluationResult {
  const { selectedRedFlags = [], questionAnswers = {} } = input;

  // 1. Red Flag Short-Circuit Rule: Immediate Emergency Priority
  if (selectedRedFlags.length > 0) {
    const triggeredLabels = config.redFlags
      .filter((rf) => selectedRedFlags.includes(rf.id))
      .map((rf) => rf.label);

    return {
      urgency: 'emergency',
      urgencyDetails: config.urgencyLevels.emergency,
      isRedFlag: true,
      triggeredRedFlags: triggeredLabels,
      totalScore: 99,
      disclaimer: config.disclaimer,
    };
  }

  // 2. Calculate Weighted Clinical Score across answered questions
  let totalScore = 0;
  let maxIndividualScore = 0;

  config.questions.forEach((question) => {
    const chosenOptionId = questionAnswers[question.id];
    if (chosenOptionId) {
      const option = question.options.find((opt) => opt.id === chosenOptionId);
      if (option) {
        totalScore += option.score;
        if (option.score > maxIndividualScore) {
          maxIndividualScore = option.score;
        }
      }
    }
  });

  // 3. Determine Urgency (Conservative Clinical Triage)
  let urgency: TriageUrgency = 'monitor';

  if (maxIndividualScore >= 10 || totalScore >= 12) {
    urgency = 'emergency';
  } else if (maxIndividualScore >= 6 || totalScore >= 5) {
    urgency = 'today';
  } else if (totalScore >= 2) {
    urgency = 'soon';
  } else {
    urgency = 'monitor';
  }

  return {
    urgency,
    urgencyDetails: config.urgencyLevels[urgency],
    isRedFlag: false,
    triggeredRedFlags: [],
    totalScore,
    disclaimer: config.disclaimer,
  };
}
