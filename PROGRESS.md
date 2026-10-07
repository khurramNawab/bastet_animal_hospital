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

## In Progress

- Awaiting confirmation to proceed to Phase 5.

## Next

- Phase 5: Doctors & Medical Faculty Showcase + Dynamic Testimonials Slider.

## Decisions

- **Next.js 14 App Router**: Chosen for fast SSR, modern routing, and SEO optimization for the clinic's website.
- **Vitest + Testing Library**: Selected for fast native ESM test execution and component testing.
- **Tailwind with strict tokens**: Ensures unified design language matching Bastet luxury vet aesthetic (Teal, Gold, Cream, Ink).

## Known Issues

- None at setup stage.
