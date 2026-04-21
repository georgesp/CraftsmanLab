# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev           # Start dev server at http://localhost:5173

# Build (runs prebuild scripts first: sitemap, RSS, categories)
npm run build         # tsc + vite build

# Testing
npm test              # Run all Jest tests
npm test -- --testPathPattern="<filename>"  # Run a single test file

# Code quality
npm run lint          # ESLint (max-warnings 50)
npm run format        # Prettier write
npm run format:check  # Prettier check

# Utility scripts (also run as part of prebuild)
npm run generate-sitemap
npm run fetch-rss
npm run generate-categories
```

## Architecture

This is a **React 18 + TypeScript + Vite** SPA deployed on **Azure Static Web Apps**. The backend is a single Azure Function (`api/src/functions/send-email.js`) powered by Nodemailer that handles contact form submissions.

### Routing

Five routes defined in [src/App.tsx](src/App.tsx): `/`, `/contact`, `/prompts`, `/prompts/:slug`, `/tips`, `/tips/:slug`, `/news`. The app is wrapped in MUI `ThemeProvider` with the custom `telerikTheme`.

### Content System (Tips & Prompts)

The site's primary content are **Tips** (technical articles about .NET/C#/SQL) and **Prompts** (AI prompt templates). Each content item follows a strict file-per-item structure under `src/components/tips/<slug>/` or `src/components/prompts/<slug>/`:

- `meta.ts` — exports a `TipMeta` or `PromptMeta` object with `slug`, `title`, `shortDescription`, `writtenOn`, `categories`, `searchKeywords`
- `<slug>.tsx` — the React component rendering the content (default export)
- `en.json` / `fr.json` — i18n translation namespaces for that item

**Adding a new tip or prompt does not require manually editing [src/components/content-manifest.ts](src/components/content-manifest.ts)** — that file is auto-generated (see the `AUTO-GENERATED` header) and is consumed by both the content registry and the i18n system.

To add content:
- create the new item folder under `src/components/tips/<slug>/` or `src/components/prompts/<slug>/`
- add the required files: `meta.ts`, `<slug>.tsx`, `en.json`, and `fr.json`
- run `npm run generate-manifest` to regenerate `src/components/content-manifest.ts`

Run `npm run generate-manifest` whenever you add, remove, or rename a tip/prompt, or make a structural change that affects the generated manifest entries.
### Internationalisation

The app supports **French and English** via `react-i18next`. Language is auto-detected from the browser and persisted in `localStorage`. Translation namespaces:
- `common` — shared UI strings (`src/locales/fr/common.json`, `src/locales/en/common.json`)
- `pages` — page-level strings (`src/locales/fr/pages.json`, `src/locales/en/pages.json`)
- `tips` — aggregated from all individual tip `fr.json`/`en.json` files via `content-manifest.ts`
- `prompts` — same pattern for prompts

Tip/prompt `title` and `shortDescription` fields in `meta.ts` are intentionally left as empty strings — their values come from the corresponding translation files.

### Theme & Styles

The MUI theme is built in [src/theme/theme.ts](src/theme/theme.ts) and references centralised tokens:
- `src/styles/colors.ts` — all colour constants
- `src/styles/typography.ts` — font sizes, weights, line heights
- `src/styles/spacing.ts` and `src/styles/shadows.ts`

All styling should use these tokens rather than inline values. `BORDER_RADIUS.none` (0) is the current global border-radius standard.

### Search

Client-side search is implemented in [src/utils/search-client.ts](src/utils/search-client.ts). It relies on the central content registry in [src/components/content-manifest.ts](src/components/content-manifest.ts) together with each item's `meta.ts` data and i18n translations, rather than scanning raw source files via `import.meta.glob`. When updating or testing search behavior, mock the current search client/registry flow instead of the removed `src/utils/search.ts` implementation.

### Azure Static Web Apps

[staticwebapp.config.json](staticwebapp.config.json) configures SPA fallback routing (all unknown paths rewrite to `/index.html`) and routes the `/api/send-email` endpoint to the Azure Function.
