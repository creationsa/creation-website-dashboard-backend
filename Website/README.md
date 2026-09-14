# Creation Website

The public site for **Creation** — a marketing and production agency. It is a
bilingual (Arabic / English), server-rendered Next.js app. Every page's content comes
from the shared [Backend](../Backend) API; editors manage that content through the
[Dashboard](../Dashboard).

- **Admin panel:** [`../Dashboard`](../Dashboard) (Vite + React SPA)
- **API:** [`../Backend`](../Backend) (Laravel) — read-only `website/*` endpoints, no auth

---

## Stack

| Concern           | Choice                                       |
| ----------------- | -------------------------------------------- |
| Framework         | Next.js 16 (App Router, RSC)                 |
| Language          | TypeScript 5                                 |
| UI                | React 19                                     |
| Styling           | Tailwind CSS 4 (PostCSS)                     |
| Animation         | Framer Motion                                |
| Carousels         | Swiper                                       |
| Theming           | `next-themes` (`data-theme` attribute)       |
| Forms             | React Hook Form + Zod (contact form)         |
| Contact delivery  | EmailJS (`emailjs-com`)                      |
| i18n              | custom — middleware locale routing + JSON dictionaries |
| SVG               | `react-inlinesvg`                            |

---

## Getting started

### Prerequisites

- Node.js 20+
- A running [Backend](../Backend) API

### Install & run

```bash
npm install
touch .env.local     # then add the variables listed below
npm run dev          # http://localhost:3000
```

### Environment (`.env.local`)

| Variable                          | Purpose                                        |
| --------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | Backend base URL, e.g. `http://127.0.0.1:8000/api/` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service id (contact form)             |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template id                           |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | EmailJS public key                            |

### Scripts

| Command           | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Next dev server (`localhost:3000`)          |
| `npm run build`   | Production build                            |
| `npm run start`   | Serve the production build on **port 5050** |
| `npm run lint`    | ESLint (`eslint-config-next`)               |

---

## Project structure

```
src/
├── app/
│   └── [locale]/                 # every route is under a locale segment
│       ├── layout.tsx            # <html>, fonts, ThemeProvider, Navbar/Footer, GA, root generateMetadata
│       ├── page.tsx              # home
│       ├── loading.tsx  error.tsx  not-found.tsx
│       ├── blogs/  projects/  solutions/     # listing + [slug] detail routes
│       └── [slug]/page.tsx       # dynamic builder pages (About, Career, Contact, …)
├── components/
│   ├── common/                   # shared building blocks (navigation, clients, contactForm, news…)
│   ├── layout/                   # navbar, footer
│   ├── pages/                    # page-specific component trees, incl. dynamicPage/SectionRenderer
│   └── ui/                       # primitives (AppButton, BaseSlider, SmartMedia, Video, Icon…)
├── dictionaries/
│   ├── en/*.json  ar/*.json      # translation namespaces (common, nav, blogs, project, contact…)
│   └── types.ts                  # typed shape of each namespace
├── lib/
│   ├── api/                      # client.ts (apiClient), endpoints.ts, getHeader/getFooter/getSeoForPage
│   ├── translation.ts            # getTrans(locale, namespace) — dynamic-imports a dictionary
│   └── getCurrentLocale.ts       # reads the locale from the request URL (via x-url header)
├── constants/  hooks/  icons/  types/
├── i18n.config.ts                # locales, default locale
└── middleware.ts                 # locale detection + redirect
```

---

## Routing & i18n

- **`middleware.ts`** runs on every non-asset request. If the path has no locale
  prefix it detects one from `Accept-Language` (via `negotiator` +
  `@formatjs/intl-localematcher`) and redirects to `/{locale}{path}`. It also stashes
  the full URL in an `x-url` request header.
- All routes live under **`app/[locale]/`**. `generateStaticParams` in the layout
  pre-renders both `ar` and `en`.
- **`getCurrentLocale()`** reads the locale back out of `x-url` inside Server
  Components that don't receive `params`.
- **Translations** are per-namespace JSON files. `getTrans(locale, "common")`
  dynamic-imports `dictionaries/{locale}/common.json`; it is `server-only`.
- Direction: `layout.tsx` sets `<html lang dir>` from the locale; components use
  logical Tailwind properties for RTL.

---

## Data fetching

All data is fetched in **Server Components** with `fetch` + ISR — there is no client
data layer.

- **`lib/api/client.ts` — `apiClient<T>(endpoint, locale, options?, revalidate = 60)`**
  wraps `fetch`, sends `Accept-Language`, sets `next: { revalidate }`, throws on
  non-OK, and returns `json.data` (the Backend envelope is `{ data, status, message }`).
- Each feature has its own `getX.ts` fetcher (e.g. `getProjects`, `getPageBySlug`,
  `getClients`) that calls `apiClient` with an appropriate `revalidate` (listings
  60s, header/footer 3600s).
- Detail pages use **`generateStaticParams`** driven by a `…/slugs` endpoint, so
  every project / solution / blog / builder page is statically generated for both
  locales.
- **`generateMetadata`** per route builds `title` / `description` / canonical +
  `hreflang` alternates / Open Graph / Twitter from `getSeoForPage(...)` and the
  page's own SEO record.

---

## The dynamic page builder

Routes under `app/[locale]/[slug]/` render pages that editors assemble in the
Dashboard's *Pages Builder*. The Backend returns an ordered `sections[]` array;
**`components/pages/dynamicPage/SectionRenderer.tsx`** switches on `section.type` and
renders one of ~17 section components (`banner_section`, `featured_works_section`,
`media_content_section`, `culture_identity_section`, `contact_section`, …). The set of
types here must stay in sync with the Dashboard's `pagesBuilder` feature and the
Backend's section schemas.

---

## Rendering model

- Server Components by default. ~34 files opt into `"use client"` — anything using
  Framer Motion, Swiper, `next-themes`, form state, or browser APIs.
- Theming: `next-themes` with `attribute="data-theme"`, `defaultTheme="dark"`,
  `enableSystem={false}`.
- Fonts: self-hosted Thmanyah Display / Text via `next/font/local`.
- Images: `next/image` with AVIF/WebP, `remotePatterns` allow-listing the Backend
  hosts (`creation.sa`, `127.0.0.1:8000`, …); unoptimized outside production.

---

## Security & headers

`next.config.ts` sets, for all routes: `X-Frame-Options: SAMEORIGIN`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
a locked-down `Permissions-Policy`, `poweredByHeader: false`, and `compress: true`.

---

## Analytics

Google Analytics (`gtag`, id `G-0ESPCDTWXN`) is loaded in `layout.tsx` via `next/script`
with `afterInteractive`.

---

## Build & deploy

```bash
npm run build && npm run start   # serves on :5050
```

Deploy as a Node server (the app uses ISR + `generateStaticParams`, not a pure static
export). Ensure the Backend host is in `next.config.ts` `images.remotePatterns` and
that `NEXT_PUBLIC_API_URL` points at the right environment.

---

## Known gaps

- `apiClient` has no timeout / abort and surfaces only `API error: <status>` on
  failure — the Backend's real error message isn't read.
- Framer Motion is imported in ~16 files without `LazyMotion` / `m` — the full
  library ships to those routes.
