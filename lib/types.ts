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

export interface OpeningHoursDay {
  open: string;
  close: string;
  label: string;
  isClosed?: boolean;
}

export interface SlotsConfig {
  durationMinutes: number;
  bookingWindowDays: number;
  minNoticeHours: number;
  maxPerSlot: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  isDummy?: boolean;
  timings: SiteTiming;
  openingHours: Record<string, OpeningHoursDay>;
  slotsConfig: SlotsConfig;
  closedDates: string[];
  mapEmbedUrl: string;
  mapLink: string;
  emergencyNote?: string;
  stats: SiteStat[];
  navLinks: NavLink[];
  credits?: {
    model3D?: ModelCredit;
  };
}

export interface BookingFormData {
  ownerName: string;
  phone: string;
  email?: string;
  animal: string;
  petName: string;
  breed?: string;
  petAge?: string;
  service: string;
  doctor?: string;
  date: string;
  time: string;
  message?: string;
  consent: boolean;
  hp?: string;
}

export interface BookingSubmissionResponse {
  ok: boolean;
  requestCode?: string;
  message?: string;
  error?: string;
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
  layout?: 'feature' | 'wide' | 'normal';
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

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  alt: string;
  rotation?: number;
  isDummy?: boolean;
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  dogRotationY: number;
  dogScale: number;
}

export type StorySceneEffect = 'sun' | 'scan' | 'pulse';

export interface StoryScene {
  id: string;
  mood: string;
  backgroundFrom: string;
  backgroundTo: string;
  glow: string;
  glowOpacity: number;
  effect: StorySceneEffect;
}

export interface StoryPanel {
  id: string;
  step: string;
  title: string;
  line: string;
  detail: string;
  icon: string;
  scene?: StoryScene;
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

export type BlogSectionType = 'h2' | 'p' | 'ul' | 'callout';

export interface BlogSection {
  type: BlogSectionType;
  content?: string;
  title?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  category: string;
  tags: string[];
  heroAlt: string;
  needsVetReview: boolean;
  isDraftContent: boolean;
  relatedServiceSlugs?: string[];
  sections: BlogSection[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}


