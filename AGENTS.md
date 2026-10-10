# AGENTS.md — Bastet Small Animal Hospital

## Project & Stack

- **Project**: Bastet Small Animal Hospital (Kolkata) veterinary website.
- **Stack**: Next.js 14 App Router + TypeScript + Tailwind CSS + R3F + GSAP + Framer Motion + Lenis + react-hook-form + zod + Supabase.
- **Package Manager**: `npm` | **Test Runner**: `Vitest`

## Essential Commands

- `npm run dev` — Start local development server
- `npm run build` — Build production application
- `npm run lint` — Run ESLint checks
- `npm run typecheck` — Type check with `tsc --noEmit`
- `npm test` — Run Vitest test suite (`vitest run`)
- `npm run format` — Format codebase with Prettier
- `npm run check` — Run full gatekeeper check (`npm run lint && npm run typecheck && npm test`)

## Folder Map

- `app/` — App Router pages, layouts, and route handlers
- `components/ui/` — Reusable primitive UI components
- `components/sections/` — Page sections and composite blocks
- `components/three/` — R3F/Three.js 3D canvas and model components
- `data/` — Static JSON content files (all content lives here)
- `lib/` — Shared utilities, Supabase client/server setup, helpers
- `hooks/` — Custom React hooks
- `public/models/` — 3D assets (.glb, .gltf)
- `tests/` — Vitest unit and integration test files
- `PROGRESS.md` — Project state, decisions log, and task checklist

## General Agent Rules

1. Only modify files and code explicitly requested.
2. Never refactor, rename, delete files, or add new dependencies without explicit confirmation.
3. Follow existing code patterns and architectural conventions.
4. Always execute `npm run check` after every code change.
5. For complex tasks: present a step-by-step plan, wait for user confirmation, then write code.
6. Keep changes small, atomic, and focused.
7. If unsure about requirements or implementation details, ask questions rather than guessing.

## Project & Brand Constraints

- **Content**: Never hardcode text content. All content must load from `data/*.json`. Adding animals must only require a JSON entry (`comingSoon` flag supported).
- **Brand Tokens**: Use Tailwind tokens exclusively:
  - Orange: `#FF751B` (deep: `#C2410C`, soft: `#FFB27A`, tint: `#FFE3CF`)
  - Olive: `#5F6C37` (deep: `#2B3318`, soft: `#A3AD7C`, tint: `#EDEFE0`)
  - Brown: `#7B4A12` (deep: `#3B2208`)
  - Cream: `#FFF6E5` (sand: `#F7DAA7`, ink: `#241E10`)
  - Fonts: _Bricolage Grotesque_ (headings) & _DM Sans_ (body)
  - Motifs: Medical Cross, Paw prints, Warm arches
- **3D Components**: Strictly inside `components/three/`, loaded via dynamic import (`ssr: false`). Limit 3D to hero and at most one scroll section. Mobile (<768px) must show image fallback; max DPR capped at 1.5.
- **Motion & Animations**: Respect `prefers-reduced-motion` in all animations. Use 0.6–1.0s `power3.out` curves. Fewer, high-impact animations over excessive motion.
- **Symptom Checker**: Mandatory disclaimer on all outputs: _"This is not a diagnosis"_.
- **Images & A11y**: Use `next/image` with WebP/AVIF format. Ensure keyboard navigability, WCAG AA contrast, and descriptive alt attributes.

## Quality Bar

- Warm, clinical elegance: bold typography hierarchy, warm glassmorphism cards, subtle warm glow highlights.
- Verify layouts across responsive breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop).

## Security & Privacy

- Never read, display, commit, or log `.env` files, API keys, or credentials.
- Do not hardcode secrets anywhere in the codebase.
- Validate all client and server inputs with Zod schemas.
- `SUPABASE_SERVICE_ROLE_KEY` is strictly restricted to server-side code.
- Never log personally identifiable information (PII).
- Never bypass git hooks (`--no-verify` is prohibited).

## Handoff Protocol

- Always update `PROGRESS.md` at the conclusion of every task with Done, In Progress, Next, and Architectural Decisions.
