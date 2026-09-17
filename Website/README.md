# CREATION — Corporate Website

The marketing website for **Creation** — a bilingual (Arabic/English), fully localized, content‑driven site covering the home page, solutions, projects (portfolio), blogs, and CMS‑managed dynamic pages. Built with the Next.js App Router and backed by a headless Laravel API.

- Production: https://www.creation.sa

## Tech Stack

| Layer              | Choice                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Framework          | [Next.js 16](https://nextjs.org) (App Router, React Server Components)                                                               |
| Language           | TypeScript                                                                                                                           |
| UI                 | React 19, [Tailwind CSS v4](https://tailwindcss.com)                                                                                 |
| Animation          | [Framer Motion](https://www.framer.com/motion/)                                                                                      |
| Forms              | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation                                                   |
| Email              | [EmailJS](https://www.emailjs.com) (client‑side contact form submission)                                                             |
| Carousels          | [Swiper](https://swiperjs.com)                                                                                                       |
| Theming            | [next-themes](https://github.com/pacocoursey/next-themes) (dark/light via `data-theme`)                                              |
| i18n               | Custom middleware + [`@formatjs/intl-localematcher`](https://formatjs.io) + [`negotiator`](https://www.npmjs.com/package/negotiator) |
| Linting/Formatting | ESLint 9 (flat config) + Prettier (with `prettier-plugin-tailwindcss`)                                                               |

## Features

- **Bilingual routing** — every route is prefixed with a locale (`/en/...`, `/ar/...`), with automatic RTL/LTR switching and browser-language detection on first visit.
- **CMS‑driven dynamic pages** — `/[locale]/[slug]` renders a page assembled from an ordered list of "sections" returned by the API (banner, achievements, culture/identity, accordion, media content, reviews, text list, featured works, CTA banner, etc.) via `SectionRenderer`.
- **Portfolio, Solutions & Blog** — list + detail views for `projects`, `solutions`, and `blogs`, each statically generated at build time from API-provided slugs, with per-page SEO metadata (Open Graph, Twitter cards, canonical + hreflang alternates).
- **Smart media rendering** — a single `SmartMedia` component transparently renders either an optimized `next/image` or an autoplaying `<video>` depending on what the CMS returned for a given field.
- **Dynamic SVG icons** — CMS‑uploaded icons are rendered client‑side via `react-inlinesvg` and recolored through CSS (see [Notes for maintainers](#notes-for-maintainers)).
- **SEO** — auto-generated `sitemap.xml` and `robots.txt`, per-page metadata sourced from the API, Google Analytics (gtag).
- **Resilient builds** — slug-fetching for static generation and the sitemap never crashes the whole build if a single API endpoint is temporarily unavailable (falls back to an empty list for that section).

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of the Creation API, plus the local environment config for it (ask a teammate — not part of this repo)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/ar` based on your browser's language.

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Every real page lives under the locale segment
│   │   ├── page.tsx           # Home
│   │   ├── [slug]/            # CMS dynamic pages (page-builder driven)
│   │   ├── projects/[slug]/
│   │   ├── solutions/[slug]/
│   │   ├── blogs/[slug]/
│   │   ├── layout.tsx         # Root layout: fonts, theme, navbar/footer, GA
│   │   └── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── middleware.ts               # Locale detection + redirect to /[locale]/...
├── components/
│   ├── layout/                 # Navbar, footer, language switcher
│   ├── common/                 # Shared building blocks (contact form, banners, news ticker, ...)
│   ├── pages/                  # Feature/page-specific components, one folder per route
│   │   └── dynamicPage/sections/  # One folder per CMS section type + SectionRenderer
│   └── ui/                     # Low-level reusable primitives (SmartMedia, DynamicSvg, MainTitle, ...)
├── lib/api/                     # apiClient fetch wrapper + endpoints.ts (single source of truth for API paths)
├── dictionaries/{ar,en}/*.json  # Static UI copy, loaded per-namespace via getTrans()
├── constants/enums.ts           # Languages, Directions
├── i18n.config.ts               # Locale list + default locale
├── hooks/
├── icons/
├── types/
└── utils/
```

## Internationalization (i18n)

- Supported locales: `en` (default), `ar`.
- `middleware.ts` inspects `Accept-Language` (via `negotiator` + `@formatjs/intl-localematcher`) and redirects any locale-less path to `/{locale}/...` on first visit.
- The root `<html>` tag sets `dir="rtl"`/`dir="ltr"` based on the current locale.
- Static UI strings live in `src/dictionaries/{ar,en}/*.json`, one file per feature ("namespace"), loaded server-side with `getTrans(locale, namespace)`.
- Content (blog posts, project copy, page-builder sections, SEO metadata, etc.) is localized by the API itself — the frontend just passes `locale` through as an `Accept-Language` header and/or requests the matching slug.
- `LanguageSwitcher` swaps the locale segment of the current path and uses `router.replace` (not `push`) so toggling the language doesn't create an extra browser‑history entry.

## Data Fetching

All API calls go through `src/lib/api/client.ts` (`apiClient`), a thin `fetch` wrapper that:

- prefixes requests with the configured API base URL,
- forwards the current locale as an `Accept-Language` header,
- unwraps the API's `{ data: ... }` envelope,
- uses Next's `fetch` cache with `revalidate` (default 60s, i.e. ISR) unless a call overrides it.

Endpoint paths are centralized in `src/lib/api/endpoints.ts` — add new routes there rather than hardcoding strings in feature code.

Each feature folder under `src/components/pages/<feature>/` has its own `getX.ts` fetcher(s) (e.g. `getProjects`, `getProjectBySlug`, `getProjectSlugs`) built on top of `apiClient`.

**Static generation:** `generateStaticParams` for `projects/[slug]`, `solutions/[slug]`, `blogs/[slug]`, `[locale]/[slug]`, and `sitemap.ts` all wrap their slug fetches in `.catch(() => [])`. If the API is briefly down or a single endpoint 404s, that section is simply omitted from the build instead of failing the entire deployment.

## Images & Media

- `SmartMedia` (`src/components/ui/SmartMedia.tsx`) is the single entry point for rendering CMS media: it renders a `next/image` for images and a plain autoplaying `<video>` for video content, based on the `type` field the API returns.
- `next.config.ts` restricts remote images to an explicit allow‑list (`images.remotePatterns`): the production domains (`creation.sa`, `api.creation.sa`, …) always, plus `127.0.0.1:8000`/`localhost:8000` **only outside production**. Any new image host (backend domain change, CDN, etc.) must be added here or `next/image` will refuse to load it.
- `images.unoptimized` is `true` in development (fast local iteration, no optimizer round‑trip) and `false` in production (real resizing/AVIF/WebP conversion). **Production image optimization requires the `sharp` package to be installed** — it's present in `node_modules` today but not yet pinned in `package.json`; run `npm install sharp` and commit the lockfile before relying on a self-hosted (Hostinger) production build.

## SEO

- `src/app/sitemap.ts` builds `/sitemap.xml` from page/project/solution/blog slugs (both locales, with `hreflang` alternates).
- `src/app/robots.ts` serves `/robots.txt`, disallowing `/api/` and `/_next/`.
- Every route's `generateMetadata` pulls title/description/OG/Twitter data from the API (`getSeoForPage` / the entity's own `seo` field), falling back to `{}` if the fetch fails so metadata errors never break page rendering.

## Scripts

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start the dev server (local API, unoptimized images) |
| `npm run build` | Production build (production API, optimized images)  |
| `npm run start` | Serve the production build on port `5050`            |
| `npm run lint`  | Run ESLint                                           |

## Deployment

The app is deployed to two targets from the same codebase, split by branch:

- **`main`** → production.
- **`staging`** → staging/preview.

- **Vercel**: works out of the box (native image optimization, no extra setup).
- **Hostinger** (self-hosted, `next start`): make sure `sharp` is a real dependency (see [Images & Media](#images--media)) before shipping, or production image optimization will fail at runtime.
