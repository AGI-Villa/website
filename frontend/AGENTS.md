# Repository Guidelines

## Project Structure & Module Organization
The Next.js 14 app router lives in `app/` with `layout.tsx`, `page.tsx`, and global CSS. Shared UI sits in `components/`, split into `components/sections/` for page-level sections and `components/ui/` for reusable primitives. Layout scaffolding resides in `components/layout/`, utilities in `lib/`, and long-form specs in `docs/`. Static assets are stored in `public/`; reference `docs/ASSETS_GUIDE.md` before adding images or media.

## Build, Test, and Development Commands
Install dependencies with `pnpm install` and ensure `.env.local` matches `.env.example`. During development run `pnpm dev` for the local server. Ship-ready builds use `pnpm build`, followed by `pnpm start` for a production preview. Quality gates include `pnpm lint` (Next.js ESLint rules) and `pnpm type-check` (TypeScript without emit). Run both before opening any pull request.

## Coding Style & Naming Conventions
This codebase uses TypeScript, React Server Components, and TailwindCSS. Follow the default Prettier formatting used across existing files: two-space indentation, semicolons omitted, single quotes, and Tailwind classes grouped from layout → spacing → color. Prefer descriptive PascalCase component names (e.g., `HeroSection`), camelCase utilities, and `snake-case` asset filenames. Keep client components opt-in via `'use client'` at the top when needed.

## Testing Guidelines
No automated tests ship yet; new work should include component tests in a future `__tests__/` directory using React Testing Library and Vitest (add dependencies as part of your change). While that suite matures, validate manually by covering core page flows and running `pnpm lint` + `pnpm type-check`. Document any test gaps in the pull request.

## Commit & Pull Request Guidelines
The history currently contains a single `Initial commit`; keep future messages in present-tense imperative ("Add hero particles") and avoid multi-topic commits. Each PR should include: a clear summary, linked Linear/Jira issue when available, screenshots or GIFs for UI updates, notes on testing (commands run or scenarios exercised), and callouts for follow-up tasks. Request review from at least one maintainer before merging.

## Environment & Configuration Tips
Copy `.env.example` to `.env.local` and keep secrets out of version control. Tailwind and PostCSS configs live at the repo root; restart `pnpm dev` after editing them. When introducing new assets or APIs, update the relevant document under `docs/` so future agents can build on your work.
