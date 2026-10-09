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

- **Phase 9 (SEO, Clinical Blog & Legal Architecture)**:
  - Created pure XSS-safe JSON-LD structured data generators (`lib/seo/jsonld.ts`) for `VeterinaryCare`, `Service`, `Person`, `BlogPosting`, and `BreadcrumbList`.
  - Strictly excluded `AggregateRating` and `Review` markup to maintain full compliance with Google Search policy.
  - Implemented dynamic Next.js `app/sitemap.ts` (covering core pages, doctors, active services, blog articles; comingSoon species excluded) and `app/robots.ts`.
  - Implemented dynamic Edge OpenGraph image generator (`app/opengraph-image.tsx`) generating 1200x630 branded social cards.
  - Built accessible `Breadcrumbs.tsx` component with integrated schema script.
  - Authored 4 comprehensive clinical veterinary articles in `data/blog.json` with structured sections, reading time, and mandatory disclaimers (`"needsVetReview": true`).
  - Built `/blog` directory (`app/blog/page.tsx`) with category filter chips and `/blog/[slug]` dynamic SSG pages (`app/blog/[slug]/page.tsx`) with sticky Table of Contents, pinned gold reading progress bar (`ArticleProgress.tsx`), related services, and consultation booking CTAs.
  - Built `/privacy-policy` (aligned with India's DPDP Act 2023), `/terms` (appointment request model and emergency protocol), and `/medical-disclaimer` legal pages.
  - Linked legal pages across `Footer.tsx` and consent checkboxes in `BookingForm.tsx`.
  - Added comprehensive test suites `tests/seo.test.ts` (8 tests) and `tests/blog.test.ts` (6 tests).
  - Passed full gatekeeper `npm run check` (13/13 files, 81/81 tests passing) and production build `npm run build` (30/30 static pages generated).

- **Redesign R1 (Brand Reskin & Visual Identity Overhaul)**:
  - Extracted new brand color palette directly from hospital identity:
    - `orange`: DEFAULT `#FF751B`, `deep`: `#C2410C`, `soft`: `#FFB27A`, `tint`: `#FFE3CF`
    - `olive`: DEFAULT `#5F6C37`, `deep`: `#2B3318`, `soft`: `#A3AD7C`, `tint`: `#EDEFE0`
    - `brown`: DEFAULT `#7B4A12`, `deep`: `#3B2208`
    - `cream`: `#FFF6E5`, `sand`: `#F7DAA7`, `ink`: `#241E10`
  - Replaced display & body typography with Google Fonts `Bricolage Grotesque` (headings) and `DM Sans` (body) loaded via `next/font/google`.
  - Built official `Logo.tsx` component with `logo.avif` and dark-mode pill backing for contrast.
  - Built `CrossDivider.tsx` replacing Egyptian dividers with rounded medical cross and paw motifs across all pages.
  - Reskinned all 28+ components, tools, forms, and pages across light and dark modes with WCAG AA compliance (4.5:1+ contrast guaranteed, including ink text on `#FF751B` orange buttons).
  - Reskinned `doctor-placeholder.svg`, `hero-placeholder.svg`, `icon.svg` (orange cross + paw), and `opengraph-image.tsx` social preview.
  - Added unit test suite `tests/brand.test.ts` (9 tests validating WCAG contrast and component specs; total 90/90 tests passing).
  - Passed full gatekeeper `npm run check` and `npm run build` (30/30 static pages generated).

- **Redesign R2 (New Hero Section & Playful Canine Visual Identity)**:
  - Built `FloatCard.tsx` floating glass badge component with 3 variations (24x7 Emergency with pulsing orange indicator, Live Asia/Kolkata OPD status, and 3 Expert Doctors), sine float, and mouse parallax. Zero fake ratings/stars.
  - Built `HeroServicesMarquee.tsx` infinite horizontal CSS marquee strip with paw print separators, pause-on-hover, accessible `aria-hidden` duplicate track, and static scrollable layout on `prefers-reduced-motion`.
  - Built `PawTrail.tsx` scroll-triggered S-curve paw trail with GSAP ScrollTrigger scrub, alternating paw angles, and `computePawTrailPoints` helper.
  - Enhanced `DogModel.tsx` with prominent scaling (~1.82 units height) and click/tap "boop" spring physics + DOM burst particles (paws, hearts, sparkles).
  - Enhanced `HeroCanvas.tsx` with optimal camera framing (`fov: 36`, position `[0, 0.85, 2.95]`), warm GoldDust sparkles (70 particles), and boop event handler.
  - Redesigned `HeroFallback.tsx` with tilted orange rounded cross plate, high-performance image fallback, and floating info cards.
  - Redesigned `Hero.tsx` with cream background, warm radial glows, single semantic H1, fluid Bricolage Grotesque display headline with animated hand-drawn SVG underline on "Royal Care", 3 floating parallax cards, large tilted orange rounded cross motif plate, olive hill bottom curve transition, and services marquee strip.
  - Expanded `tests/hero.test.ts` (12 tests covering H1, FloatCard, Marquee accessibility, and PawTrail points helper; total 99/99 tests passing).
  - Passed full gatekeeper `npm run check` and `npm run build` (30/30 static pages generated).

- **Redesign R2.1 (Hero & Section Layout Fixes)**:
  - **Dog Clipping Eliminated**: Computed safe camera distance dynamically via `fitCamera` pure math helper and tuned `DogModel.tsx` scale factor (1.62) & position (`y: -0.42`) with `HeroCanvas` camera `[0, 0.42, 3.2]` `fov: 34`, guaranteeing >10% headroom clearance across all viewports (1920x1080, 1440x900, 1366x768, 375x812).
  - **Card Overlap Cleared**: Repositioned floating glass cards away from the canine face/head bounding box (Emergency badge bottom-left, OPD badge mid-right, Doctors badge bottom-right). Created `lib/layout/rectsOverlap.ts` helper and verified clearance.
  - **Redundant Info Removed**: Removed duplicate trust stats row (24x7 / 3 Specialists / 5,000+) from `Hero.tsx` and `HeroFallback.tsx`, letting primary value prop and CTAs breathe.
  - **Semantic Status Indicators**: Added accessible green dot (`bg-emerald-600`) and amber dot (`bg-brown-600`) in `FloatCard.tsx` with WCAG AA compliance and pulsing emergency radar ring.
  - **Story Section Void Fixed**: Removed `min-h-[220vh]` doubled pin-spacing in `Story.tsx`, tuned `StoryDog.tsx` scale/target, and activated immediate intersection mount to eliminate large blank gap.
  - **Responsive Logo Sizing**: Tuned `Logo.tsx` for optimal height (`h-9 sm:h-10 md:h-11`) and left-alignment across header breakpoints.
  - **Bright Golden Dog Paws & Upward Bounce Lighting**: Added low warm fill light (`position={[0, -2, 3]}`), golden point lights (`position={[0, 0.2, 1.8]}`), and disabled harsh self-shadow on paws (`receiveShadow = false` in `DogModel.tsx` & `StoryDog.tsx`), ensuring paws glow in rich warm golden amber tones with zero black shadow cast.
  - **Tightened Navbar-to-Hero Spacing**: Reduced layout `main-content` top padding to `pt-4 sm:pt-6 md:pt-8` and Hero section padding to `pt-0`, placing the headline and badge closely under the navbar with an optimal luxury gap.
  - **Enlarged Story Section Dog Model**: Boosted `StoryDog.tsx` scale factor to `1.65 / size.y`, calibrated `data/story.json` poses to `dogScale: 1.6 - 1.68` at camera `z: 2.5 - 2.6` and `fov: 42`, restoring grand, prominent dog presence across all 3 storytelling steps with full paws visible.
  - **Testing**: Maintained full 108/108 unit test pass rate across 15 test suites.

## In Progress

- Branch `feat/r2-hero` completed locally with all visual refinements. Gatekeeper passing (108/108 tests).

## Next

- User review and confirmation before git push.
- **REDESIGN R3**: Micro-interactions, Motion refinement, and responsive mobile polish.
- **REDESIGN R4**: Performance tuning & final production verification.

## Decisions

- **Pure Zero-Dependency Blog & Structured Data**: Authored articles as structured JSON blocks in `data/blog.json` and rendered them via type-safe React components without bulky markdown/MDX compilation libraries.
- **XSS-Safe JSON-LD**: Escaped `<`, `>`, and `&` inside `serializeJsonLd()` to eliminate script injection vectors.
- **Strict Compliance with Google Rich Results Policies**: Intentionally omitted fake `AggregateRating` and `Review` schema markup to avoid manual search engine penalties on unverified reviews.
- **Dynamic Next.js OpenGraph**: Leveraged `next/og` `ImageResponse` on the Edge runtime for fast, zero-external-dependency social preview generation.
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

- Medical triage guidelines, age charts, and blog articles in `data/tools.json`, `data/symptom-checker.json`, and `data/blog.json` are marked with `"needsVetReview": true` and should be reviewed by attending veterinarians before hospital launch.
- Legal documents (`/privacy-policy`, `/terms`, `/medical-disclaimer`) are templates tailored to DPDP Act 2023 and should undergo clinical/legal counsel sign-off before hospital operations.
- In-memory rate limiting on `/api/book` and `/api/waitlist` is suitable for single-instance deployments; for multi-region serverless scale, an Upstash Redis or Supabase Edge rate limiter should be connected.
- Dummy doctors, reviews, and placeholder photos are currently active (marked with `"isDummy": true`) and need to be replaced with real hospital data prior to production launch.


