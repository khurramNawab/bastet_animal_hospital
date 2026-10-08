# Project Progress

## Done

- Initialized Git repository and set up `chore/setup` branch.
- Created `AGENTS.md` (< 150 lines) and `CLAUDE.md`.
- Created `.gitignore`, `.env.example`, and `.claude/settings.json`.
- Configured Next.js 14, TypeScript (`tsconfig.json`), and Tailwind CSS (`tailwind.config.ts`) with Bastet brand tokens.
- Set up Vitest test framework (`vitest.config.ts`, `tests/sample.test.ts`).
- Configured Prettier, ESLint, lint-staged, Husky pre-commit hooks, and GitHub Actions CI workflow (`.github/workflows/ci.yml`).
- Executed `npm run check` (Lint + Typecheck + Vitest) successfully with 0 errors.
- **Phase 1 (Foundation)**:
  - Created `data/*.json` (site, doctors, services, animals, testimonials).
  - Created `lib/types.ts`, `lib/data.ts`, `lib/cn.ts`.
  - Configured luxury design tokens in `tailwind.config.ts` and `app/globals.css`.
  - Built `SmoothScroll` (Lenis + GSAP ticker + prefers-reduced-motion guard).
  - Built sticky glass `Navbar` with desktop underline indicator & accessible mobile drawer.
  - Built `Footer` with `GoldDivider`, OPD timings, and direct WhatsApp contact.
  - Configured root `app/layout.tsx` with Playfair Display + Inter Google Fonts.
  - Created placeholder `app/page.tsx` and route stubs (`/services`, `/doctors`, `/book`, `/tips`, `/contact`).
  - Added unit tests in `tests/data.test.ts` and `tests/cn.test.ts` (10 tests passing).
  - Successfully verified `npm run check` and `npm run build`.

- **Phase 3 (Scroll Storytelling)**:
  - Created `data/story.json` with 3 clinical journey steps (01 Prevent, 02 Diagnose, 03 Heal) and camera poses.
  - Implemented `lib/cameraInterpolation.ts` pure mathematical lerp helper.
  - Built `StoryDog.tsx` (reuses cached `dog.glb`, dynamic camera rig interpolation, dog scale/yaw transitions).
  - Built `StoryCanvas.tsx` (IntersectionObserver lazy mount within ~400px, offscreen pause, proper unmount disposal).
  - Built `Story.tsx` pinned desktop storytelling section with GSAP ScrollTrigger (pin, scrub: 0.6, 300vh scroll).
  - Implemented dynamic cream-to-deep-teal background color transition and step progress indicators (01, 02, 03).
  - Built `StoryFallback.tsx` for responsive mobile (<768px), low-power, and reduced-motion states without loading Three.js.
  - Added unit tests in `tests/story.test.ts` (schema validation + interpolation math at 0, 0.5, 1.0).
  - Passed `npm run check` (22/22 tests passing) and `npm run build`.

- **Phase 4 (Species Switcher & Services)**:
  - Enriched `data/animals.json` (active dogs + coming soon cats/birds/cattle) and `data/services.json` (slugs, detailed copy, features, durations).
  - Built `SpeciesTabs.tsx` with sliding Framer Motion gold pill and keyboard ARIA navigation.
  - Built `ServiceCard.tsx` with 3D cursor tilt, radial gold glow, and accessible routing.
  - Built `WaitlistForm.tsx` (react-hook-form + zod validation + honeypot spam protection).
  - Built `Services.tsx` section with dynamic species filtering and smooth cross-fade animation.
  - Built dynamic route `app/services/[animal]/page.tsx` with static generation (SSG) for all 4 species and rich SEO metadata.
  - Created server-side safe Supabase client `lib/supabase.ts` and API handler `app/api/waitlist/route.ts` with IP rate limiting and offline fallback.
  - Created migration SQL `supabase/migrations/001_waitlist.sql` with Row Level Security (RLS) enabled.
  - Added unit tests in `tests/services.test.ts` (10 tests; total 32/32 tests passing).
  - Passed `npm run check` and `npm run build`.

- **Phase 5 (Doctors, Stats & Testimonials)**:
  - Enriched `data/doctors.json` (qualifications, specialties, languages, longBio, isDummy) and `data/testimonials.json`.
  - Extended `GoldDivider.tsx` with 3 SVG variants (`line`, `eye` Eye-of-Horus, `ankh-pattern`).
  - Built `DoctorCard.tsx` with Egyptian arch frame and slide-up specialties panel on hover/tap/focus.
  - Built `Doctors.tsx` faculty section with responsive 3-column auto-wrap.
  - Built dynamic SSG doctor route `app/doctors/[slug]/page.tsx` with metadata, full biography, and appointment CTA.
  - Built `Stats.tsx` with viewport count-up numbers using `Intl.NumberFormat('en-IN')` (e.g. 5,000+), zero layout shift via tabular nums, and deep teal luxury band.
  - Built `Testimonials.tsx` drag slider carousel with Framer Motion (snap physics, keyboard arrows, dots, 6s autoplay with hover/focus pause).
  - Added unit tests in `tests/trust.test.ts` (5 tests; total 37/37 tests passing).
  - Passed `npm run check` and `npm run build`.

- **Visual Polish & Section Layout Fixes**:
  - Refactored `Story.tsx` to provide seamless full-width dark teal backdrop and refined pinning scroll distance (eliminating large blank vertical gaps).
  - Fixed `Testimonials.tsx` carousel tracking and responsive layout (guaranteed visible cards on desktop 3-col grid and mobile/tablet touch slider).
  - Redesigned `doctor-placeholder.svg` with gold-gilded Egyptian archway, Bastet caduceus crest, and luminous silhouette.
  - Verified gatekeeper checks: `npm run check` (37/37 tests passing) and `npm run build`.

- **Phase 6 (Interactive Tools: Age Calculator & Symptom Triage)**:
  - Created data-driven configurations `data/tools.json` and `data/symptom-checker.json` (marked with `"needsVetReview": true`).
  - Implemented pure math helper `lib/tools/age.ts` for canine-to-human age conversion across 4 weight classes with puppy/adult/senior life stages.
  - Implemented pure deterministic triage function `lib/tools/triage.ts` with immediate red-flag short circuiting, conservative scoring, and emergency escalation.
  - Built accessible modal component `components/ui/ToolDialog.tsx` (focus trap, Esc key listener, focus restoration, body scroll lock, mobile bottom-sheet).
  - Built `components/tools/AgeCalculator.tsx` with animated count-up, size chips, and wellness check booking CTA.
  - Built `components/tools/SymptomChecker.tsx` multi-step triage engine with consent disclaimer, red flag screening, clinical guidance, emergency dialer, and WhatsApp links (zero network requests, zero answer storage).
  - Built homepage section `components/sections/Tools.tsx` and dedicated `/tools` page (`app/tools/page.tsx`) with SEO metadata.
  - Added comprehensive unit tests in `tests/tools.test.ts` (13 tests; total 50/50 tests passing).
  - Passed full gatekeeper `npm run check` and production build `npm run build`.

- **Phase 7 (Booking Request & Contact System)**:
  - Configured slots config, daily opening hours, Google Maps links, and `isDummy: true` in `data/site.json`.
  - Implemented pure helpers `lib/booking/slots.ts` (dynamic 30-min slot generation, 2h notice cutoff), `lib/booking/whatsapp.ts` (prefilled WhatsApp booking message builder), and `lib/booking/openStatus.ts` (real-time Asia/Kolkata open/closed status).
  - Built Zod schema `lib/schemas/booking.ts` with Indian mobile phone normalizer (`+91XXXXXXXXXX`) and server/client shared validation.
  - Implemented secure API route `app/api/book/route.ts` with honeypot spam defense, IP/phone rate limiting, slot capacity conflict checking, and Supabase insertion with zero PII in responses.
  - Created SQL migration `supabase/migrations/002_appointments.sql` with unique request codes, slot indexes, and RLS enabled.
  - Built luxury 3-step form `components/sections/BookingForm.tsx` (Patient Info → Service, Doctor, Date & Time Slots → Review & Submit) with URL query param prefill and direct WhatsApp confirmation.
  - Built dedicated `/book` (`app/book/page.tsx`) and `/contact` (`app/contact/page.tsx`) pages with SEO metadata.
  - Built `components/sections/Contact.tsx` with weekly timings table, live "Open Now" indicator, and interactive Google Maps facade.
  - Built `components/ui/FloatingActions.tsx` with quick WhatsApp desk & 24/7 emergency call buttons.
- **Phase 8 (Polish, Dark/Light Theme & Brand Identity)**:
  - Implemented zero-dependency `ThemeProvider.tsx` supporting `light`, `dark`, and `system` modes with `localStorage` persistence and anti-FOUC inline head script.
  - Built accessible `ThemeToggle.tsx` with Sun, Moon, and System monitors, integrated into desktop `Navbar` and mobile drawer.
  - Built additive `PawCursor.tsx` desktop-only mouse follower with `rAF` lerp, interactive element scaling, and automatic suppression on touch/coarse pointers and `prefers-reduced-motion`.
  - Built first-visit `SiteLoader.tsx` golden paw sequence overlay with `sessionStorage` guard (`bastet_intro_shown`), 1.1s auto-fade, and non-blocking SSR.
  - Added smooth Framer Motion page entrance transitions via `app/template.tsx` with reduced-motion support.
  - Designed custom Egyptian royal 404 (`app/not-found.tsx`), robust error boundary (`app/error.tsx`), and shimmering route loader (`app/loading.tsx`).
  - Created crisp SVG brand favicon (`app/icon.svg`) featuring golden feline silhouette and medical cross.
  - Updated real hospital credentials in `data/site.json` and `app/layout.tsx` (Rash Behari Avenue, Kolkata, +91 91473 27256, WhatsApp 919147327250, bastetsmallanimalhospital@gmail.com).
  - Added unit tests in `tests/polish.test.ts` (5 tests; total 67/67 tests passing).
  - Passed full gatekeeper `npm run check` and production build `npm run build` (20/20 static pages generated).

## In Progress

- Awaiting user confirmation to proceed to Phase 9.

## Next

- Phase 9: Knowledge Base & Care Articles (`/tips`) / Production Launch Preparation.

## Decisions

- **Zero-Dependency Theme Switcher**: Built custom React context + anti-FOUC script rather than external libraries to maintain zero runtime bloat and prevent SSR hydration mismatches.
- **Additive Mouse Follower**: The custom paw cursor is strictly additive—it does not hide the native system pointer, does not intercept clicks (`pointer-events-none`), and cleanly shuts down on touch screens or low-motion preferences.
- **Session-Guarded Splash**: `SiteLoader` only triggers once per browser session using `sessionStorage` so navigating internal routes remains instant and uncluttered.
- **Appointment Booking is a Request**: Clearly communicates that online submissions are appointment requests to be confirmed by hospital coordinators via phone or WhatsApp, avoiding false confirmation promises.
- **Pure Client-Side Triage**: Symptom evaluation runs deterministically in browser to ensure absolute user privacy and zero data leakage.
- **Conservative Emergency Escalation**: Any life-threatening red flag immediately short-circuits to the emergency protocol.
- **Next.js 14 App Router**: Chosen for fast SSR, modern routing, and SEO optimization for the clinic's website.
- **Vitest + Testing Library**: Selected for fast native ESM test execution and component testing.
- **Tailwind with strict tokens**: Ensures unified design language matching Bastet luxury vet aesthetic (Teal, Gold, Cream, Ink).

## Known Issues

- In-memory rate limiting on `/api/book` and `/api/waitlist` is suitable for single-instance deployments; for multi-region serverless scale, an Upstash Redis or Supabase Edge rate limiter should be connected.
- User data retention and privacy policy must be published prior to accepting real pet parent submissions.
- Medical triage guidelines and age charts in `data/tools.json` and `data/symptom-checker.json` are marked with `"needsVetReview": true` and must be reviewed by a licensed veterinarian prior to hospital launch.
- Dummy doctors, reviews, and placeholder photos are currently active (marked with `"isDummy": true`) and need to be replaced with real hospital data prior to production launch.

