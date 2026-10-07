export interface SiteTiming {
  weekdays: string;
  sunday: string;
  emergency: string;
}

export interface SiteStat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ModelCredit {
  title: string;
  author: string;
  license: string;
  source: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timings: SiteTiming;
  stats: SiteStat[];
  navLinks: NavLink[];
  credits?: {
    model3D?: ModelCredit;
  };
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  role: string;
  yearsOfExperience: number;
  qualifications?: string;
  languages?: string[];
  specialties?: string[];
  bio: string;
  longBio?: string;
  image: string;
  animals: string[];
  isDummy?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  duration?: string;
  icon: string;
  animals: string[];
}

export interface AnimalCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  comingSoon: boolean;
  active?: boolean;
  tagline: string;
  heroLine?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  pet: string;
  animal?: string;
  date?: string;
  text: string;
  rating: number;
  isDummy?: boolean;
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  dogRotationY: number;
  dogScale: number;
}

export interface StoryPanel {
  id: string;
  step: string;
  title: string;
  line: string;
  detail: string;
  icon: string;
  cameraPose: CameraPose;
}

export interface WaitlistSubmission {
  name?: string;
  email: string;
  phone?: string;
  animal: string;
  hp?: string;
}

export type DogSizeId = 'small' | 'medium' | 'large' | 'giant';

export interface DogSizeCategory {
  id: DogSizeId;
  label: string;
  weightRange: string;
  description: string;
  perYearAfter2: number;
}

export interface DogLifeStage {
  id: string;
  label: string;
  minHumanAge: number;
  maxHumanAge: number;
  careHint: string;
}

export interface AgeCalculatorConfig {
  title: string;
  tagline: string;
  year1Equivalent: number;
  year2Equivalent: number;
  sizes: DogSizeCategory[];
  lifeStages: DogLifeStage[];
  disclaimer: string;
  needsVetReview: boolean;
}

export type TriageUrgency = 'emergency' | 'today' | 'soon' | 'monitor';

export interface RedFlagItem {
  id: string;
  label: string;
}

export interface TriageOption {
  id: string;
  label: string;
  score: number;
}

export interface TriageQuestion {
  id: string;
  title: string;
  prompt: string;
  options: TriageOption[];
}

export interface TriageUrgencyDetails {
  id: TriageUrgency;
  title: string;
  subtitle: string;
  badge: string;
  level: number;
  actionPrimary: string;
  actionSecondary: string;
  guidance: string[];
}

export interface SymptomCheckerConfig {
  title: string;
  tagline: string;
  disclaimer: string;
  needsVetReview: boolean;
  redFlags: RedFlagItem[];
  questions: TriageQuestion[];
  urgencyLevels: Record<TriageUrgency, TriageUrgencyDetails>;
}

