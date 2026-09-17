# Creation Dashboard

Admin dashboard for managing the content of the [creation.sa](https://creation.sa) website — blogs, projects, solutions, a drag-and-drop page builder, clients, footer/header, SEO metadata, and site-wide settings. Built as a React SPA that talks to a Laravel-style REST API.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| Forms | React Hook Form + Zod (via `@hookform/resolvers`) |
| HTTP client | Axios |
| i18n | i18next / react-i18next (English + Arabic, RTL-aware) |
| Notifications | react-hot-toast |
| Select inputs | react-select |
| Linting/formatting | ESLint (typescript-eslint) + Prettier (with the Tailwind class-sorting plugin) |

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on Vite's default port. Local environment/configuration values are not part of this repo — ask a team member for what you need before your first run.

### Requirements

- Node.js (a version compatible with Vite 8 / the TypeScript 6 toolchain — Node 20+ recommended)
- A running instance of the backend API

## Available Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check the whole project (`tsc -b`) then produce a production build (`vite build`) |
| `npm run preview` | Serve the last production build locally, for a final sanity check |
| `npm run lint` | Run ESLint across the project |

`npm run build` is the same command the deploy pipeline runs — if it fails locally, it will fail on deploy too.

## Project Structure

```
src/
├── app/                  # App shell: routing, layouts, providers
│   ├── layouts/          # AppLayout, sidebar, header chrome
│   ├── navigation/       # Route path constants, top-level <Navigation>
│   └── providers/        # Query client, theme, toast, routes composition
├── features/             # One folder per business domain (see below)
├── shared/                # Cross-feature building blocks
│   ├── api/               # Axios instance, shared endpoints, query keys
│   ├── components/        # Reusable composite components (SEO form, page tabs, ...)
│   ├── constants/         # Validation limits, regexes, shared constants
│   ├── hooks/              # Cross-feature hooks (attachment upload, SEO fetch, ...)
│   ├── storage/            # Auth token storage
│   ├── types/               # Shared TS types
│   ├── ui/                  # Design-system primitives (Button, Input, Select, ...)
│   └── utils/                # Zod field helpers, error formatting, misc utils
├── i18n.ts                # i18next setup
└── public/Locale/         # En.json / Ar.json translation dictionaries
```

### Features

Each folder under `src/features/` follows the same shape: `api/` (HTTP calls), `hooks/` (React Query wrappers), `components/` (forms, sections), `pages/`, and `types.ts`.

| Feature | Covers |
|---|---|
| `auth` | Login, profile, logout |
| `statistics` | Dashboard home / stat cards |
| `blogs` | Blog CRUD, blog SEO |
| `projects` | Project CRUD, project SEO |
| `solutions` | Solution CRUD, solution SEO |
| `pagesBuilder` | The custom page builder (see below) |
| `clients` | Client logos section |
| `footer` / `header` | Global site footer & header content |
| `settings` | Site-wide settings |

### Page Builder

`features/pagesBuilder` lets an admin compose a page out of an ordered list of typed **sections**, each with its own Zod schema, default values, and form UI, under `sections/`:

`bannerSection`, `displayInformationSection`, `featuredWorksSection`, `achievementsSection`, `cultureIdentity`, `newsTickerSection`, `mediaContentSection`, `advancedOverviewSection`, `customAccordion`, `ctaBanner`, `header`, `logos`, `reviewsSection`, `blogsTeaser`, `contactSection`, `textListSection`.

The overall page schema (`pageSchema.ts`) is a Zod discriminated union over every section's `{ type, content }` shape — this is intentionally the most type-complex part of the codebase; see the note on `usePageForm.ts` below.

### SEO

`shared/components/seoForm` is a reusable SEO form (title/description/image/keywords, optionally a site name for the homepage) mounted from the SEO tab of blogs, projects, solutions, and pages. When editing content that's linked to a project/solution/page, the title/description/image fields are optional and fall back to the parent record's own content when left blank.

## Internationalization

The UI ships in English and Arabic (`src/public/Locale/En.json` / `Ar.json`) via `react-i18next`, with automatic language detection (`i18next-browser-languagedetector`) and full RTL support for Arabic. Every user-facing form field is bilingual by convention — most content models store `*_en` / `*_ar` pairs (e.g. `title_en`, `title_ar`).

## Notable Implementation Details

- **Zod field helpers** (`shared/utils/errorsHelpers.ts`): `englishField` / `arabicField` / `normalField` enforce length + character-set rules; `optionalEnglishField` / `optionalNormalField` are the same but allow an empty value (used for SEO fields on linked records); `imageField` / `svgImageField` accept either an uploaded `File` or an existing URL string.
- **`usePageForm.ts`**: the page builder's combined schema is large enough (15+ section variants) that TypeScript occasionally hits its own type-complexity ceiling when re-verifying the resolver type against itself, producing spurious "two different types... unrelated" errors. A couple of narrow, deliberate type assertions there work around this — they're type-level only, Zod still validates the real data at runtime.
- **Attachments**: file uploads go through `shared/hooks/useUploadAttachment`, uploading first and swapping the field's value for the resulting URL before the rest of the form data is submitted.

## Deployment

`.github/workflows/deploy.yml` deploys automatically on every push to `main`: it SSHes into the production host and runs `git pull`, `npm install`, and `npm run build` directly there — the live server builds its own bundle in place, using whatever local configuration already exists on that server.

Since the build (including the full TypeScript check) happens on the server itself, make sure `npm run build` passes locally before pushing to `main`.

## Linting & Formatting

```bash
npm run lint
```

Prettier is configured with `prettier-plugin-tailwindcss` for automatic class sorting. Run it through your editor's format-on-save or `npx prettier --write .`.
