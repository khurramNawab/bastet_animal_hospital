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

- **Phase 2 (Cinematic 3D Hero)**:
  - Integrated "Dog Puppy" GLTF model (2.8MB, 46 joints, idle animation).
  - Built `HeroCanvas.tsx` (DPR [1, 1.5], antialias, camera fov 35, offscreen/visibility pause).
  - Built `DogModel.tsx` (auto-centering, ground alignment, rig bone mouse-follow yaw ±25°/pitch ±12°, idle loop).
  - Built `Lighting.tsx` (offline procedural studio lighting with Lightformers, contact shadows).
  - Built `GoldDust.tsx` (70 floating gold particles with mouse parallax).
  - Built `Loader3D.tsx` (gold paw progress spinner).
  - Built `Hero.tsx` (full-screen split grid, semantic H1, Playfair display tagline, magnetic CTAs, trust badges, GSAP animations).
  - Built `HeroFallback.tsx` (mobile <768px, low-power, reduced-motion fallback with zero layout shift).
  - Built `MagneticButton.tsx` (spring-back hover physics on fine pointers, accessible fallback on touch/reduced-motion).
  - Built `useCanRender3D.ts` and `useWordReveal.ts` hooks.
  - Added dynamic model credit in `data/site.json` and `components/sections/Footer.tsx`.
  - Added unit tests (`tests/useCanRender3D.test.ts`, `tests/hero.test.ts`) — all 16 tests passing.
  - Successfully verified `npm run check` and `npm run build`.

## In Progress

- Awaiting confirmation to proceed to Phase 3.

## Next

- Phase 3: Interactive Multi-Species Sanctuary & Services Showcase with GSAP ScrollTrigger.

## Decisions

- **Next.js 14 App Router**: Chosen for fast SSR, modern routing, and SEO optimization for the clinic's website.
- **Vitest + Testing Library**: Selected for fast native ESM test execution and component testing.
- **Tailwind with strict tokens**: Ensures unified design language matching Bastet luxury vet aesthetic (Teal, Gold, Cream, Ink).

## Known Issues

- None at setup stage.
