# Creation Backend

The API for **Creation** — a marketing and production agency. One Laravel application
serves two audiences from the same database:

| Audience                      | Base path              | Auth                          | Shape of the response                          |
| ----------------------------- | ---------------------- | ----------------------------- | --------------------------------------------- |
| [Dashboard](../Dashboard) admin | `/api/dashboard/admin/*` | JWT (`auth:api`) + permissions | full CRUD, **both** languages, paginated lists |
| [Website](../Website) (public) | `/api/website/*`       | none, read-only               | resolved to **one** language from `Accept-Language` |

Every response is the envelope `{ "data": …, "status": "success" | "fail", "message": "" }`.

---

## Stack

| Concern            | Choice                                                    |
| ------------------ | -------------------------------------------------------- |
| Framework          | Laravel 10                                               |
| Language           | PHP 8.1+                                                 |
| Database           | MySQL (`mysql2` also used by the Node sidecars)          |
| Auth               | `tymon/jwt-auth` — the `api` guard is `driver: jwt`      |
| Translations       | `astrotomic/laravel-translatable` (`*Translation` tables) |
| Localization URLs  | `mcamara/laravel-localization`                           |
| Queue / workers    | `laravel/horizon` on Redis (`predis`)                    |
| Debug (local)      | `laravel/telescope`                                      |
| Images             | `intervention/image` v2                                  |
| Excel export       | `maatwebsite/excel`                                      |
| Spatial data       | `matanyadaev/laravel-eloquent-spatial`                   |
| SMS / OTP          | `taqnyat/php`                                            |
| Realtime           | `php-mqtt/laravel-client` + Node MQTT broker + Socket.IO |

---

## Getting started

### Prerequisites

- PHP 8.1+ with the usual Laravel extensions
- Composer
- MySQL 8
- Redis (for queues / Horizon; optional in bare local dev)
- Node 18+ (only for the realtime sidecars in `Mqtt/` and `socketio/`)

### Install & run

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
# set DB_* in .env, then:
php artisan migrate --seed
php artisan storage:link          # exposes storage/app/public at /storage
php artisan serve                 # http://127.0.0.1:8000
```

`--seed` runs `DatabaseSeeder` → `AdminSeeder` (a default super-admin),
`PermissionSeeder`, `CountrySeeder`, `CitySeeder`.

### Environment (`.env`)

Key variables beyond the Laravel defaults:

| Variable          | Notes                                        |
| ----------------- | ------------------------------------------- |
| `DB_*`            | MySQL connection                             |
| `JWT_SECRET`      | set by `php artisan jwt:secret`             |
| `DEFUALT_LOCALE`  | fallback locale, `en` (spelling matches `config/translatable.php`) |
| `REDIS_*`         | Horizon / cache / queue                      |

### Useful commands

| Command                            | Purpose                          |
| ---------------------------------- | ------------------------------- |
| `php artisan serve`                | dev server                      |
| `php artisan migrate --seed`       | build/refresh the schema        |
| `php artisan horizon`              | run the queue worker            |
| `php artisan telescope:install`    | local request/query inspector   |
| `php artisan test` / `phpunit`     | test suite (currently examples only) |
| `./vendor/bin/pint`               | code style (`laravel/pint`)     |

---

## Project structure

```
app/
├── Http/
│   ├── Controllers/Api/
│   │   ├── Dashboard/Admin/<Domain>/<Domain>Controller.php   # admin CRUD
│   │   ├── Website/<Domain>/<Domain>Controller.php           # public read-only
│   │   └── General/                                          # shared lookups
│   ├── Requests/Api/…            # FormRequest validation, mirrors the controller tree
│   ├── Resources/Api/…           # API Resources, mirrors the controller tree
│   └── Middleware/setLocale.php  # sets app locale from Accept-Language
├── Models/
│   ├── <Model>.php               # each translatable model has a sibling…
│   └── <Model>Translation.php    #   …translation model + <model>_translations table
├── Services/
│   ├── Website/MenuItemResolver.php   # header/footer menu item → {key, href, label}
│   ├── Website/LogoResolver.php       # resolves the active logo + alt
│   ├── Website/AssetProxy.php
│   └── UploadFileService.php          # image upload + resize (SVGs pass through)
├── Traits/ApiResponse.php        # successResponse() / errorResponse()
└── …
routes/api/
├── dashboard/admin.php           # /api/dashboard/admin/*
├── website/website.php           # /api/website/*
└── general/general.php
database/
├── migrations/                   # ~55 migrations
└── seeders/                      # AdminSeeder, PermissionSeeder, Country/City
Mqtt/  socketio/                  # Node realtime sidecars (aedes broker + Socket.IO)
```

Controllers, Requests, and Resources share the same folder tree — for any domain
`X`, look in `Controllers/Api/Dashboard/Admin/X/`, `Requests/Api/Dashboard/Admin/X/`,
`Resources/Api/Dashboard/Admin/X/`.

---

## The two API surfaces

### Dashboard admin — `routes/api/dashboard/admin.php`

- `POST login` is public; everything else is wrapped in
  `middleware: ['auth:api', 'CustomPermission']`.
- Most domains are `Route::apiResource(...)`; a few singletons
  (`header`, `footer`, `settings`, `*MainData`) are `GET` + `match(['put','post'])`.
- Listing endpoints (`allProjects`, `allSolutions`, `page`, `blogs`) accept
  `?page=&per_page=&sort=asc|desc&keyword=` and return a Laravel paginator
  (`data` + `meta`). `per_page` is clamped `1..100`, default `10` — **the client owns
  the page size**.
- "Picker" endpoints (`blogs/picker`, `allProjects/picker`, `allSolutions/picker`,
  `menu-options`) are unpaginated lists for select inputs.
- Resources return **both** languages (`title_en` / `title_ar` …) so the same form can
  edit both.

### Website public — `routes/api/website/website.php`

- No auth. Read-only. `GET` only.
- Every response is resolved for the **request locale** (`Accept-Language`) — a single
  `title`, `slug`, etc.
- `…/slugs` endpoints exist for the Website's `generateStaticParams`.
- Header / footer menu items are fully resolved server-side by `MenuItemResolver`
  into `{ key, href, label }`; unresolvable items (deleted page, unfilled nav
  title/slug) are dropped so the Website never has to guard against them.

Both surfaces run through the **`setLocale`** middleware, which calls
`app()->setLocale()` from the `Accept-Language` header (falling back to
`DEFUALT_LOCALE`).

---

## Auth & permissions

- JWT via `tymon/jwt-auth`; `auth('api')->attempt(...)` in
  `Dashboard/Admin/Auth/AuthController`. Login also rejects `!is_admin_active_user`
  and `is_ban` users.
- The login response is a `UserResource` with `token`, the user's `role`, and a flat
  `permission[]` list.
- **`CustomPermission`** middleware checks the authenticated user's permissions
  against the matched route name on every admin request. Permissions are seeded by
  `PermissionSeeder` and manageable under `permissions` / `roles`.

---

## Translations

- Translatable models declare `public $translatedAttributes = [...]` and have a
  sibling `*Translation` model + `<table>_translations` table (locale + the
  translated columns).
- Read: `$model->title` returns the value for the current app locale (set by
  `setLocale`). Admin Resources read `$model->translate('en')?->title` etc. for both.
- Search: `->whereTranslationLike('title', "%$keyword%")` on listing endpoints.
- Locales are `['en', 'ar']` (`config/translatable.php`), fallback `en`.

---

## Media & uploads

- `UploadFileService::uploadImg(...)` stores under `storage/app/public/images/<dir>/`,
  resizes rasters with Intervention, and stores **SVGs as-is** (vectors can't be
  processed like bitmaps).
- Run `php artisan storage:link` so uploads are served from `/storage/...`.
- `AppMedia` is a polymorphic media model (`media_type` = `image | video`, cover /
  poster options) attached to projects, solutions, builder-page sections, etc.

---

## Key domain concepts

| Concept                | Where                                                            |
| ---------------------- | -------------------------------------------------------------- |
| **Builder pages**      | `BuilderPage` + `sections` JSON blob. The backend is deliberately schema-agnostic about section shapes except `blogs_teaser_section` (whose `applied_at` is server-set). |
| **Main-data singletons** | `ProjectsMainData` / `SolutionsMainData` / `BlogsMainData` — one row each, holds the landing page's `nav_title` + `slug` and section content. |
| **Menu options**       | `GET dashboard/admin/menu-options` — every linkable destination (builder pages + the three main-data pages) in one localized `{type, id, title, slug}` list. |
| **SEO / metadata**     | `Metadata` is polymorphic (`metadataable`) — a builder page, project, or solution each `morphOne` a metadata record; standalone category SEO is keyed by `for`. |
| **Header / Footer**    | one row each; `syncMenuItems()` deletes & recreates all menu rows on every save in submitted order. |

---

## Realtime sidecars

`Mqtt/` and `socketio/` are small Node services (`aedes` MQTT broker, `socket.io`,
`redis`) used for chat / notifications. They run alongside PHP, not inside it. See
`package.json` and the `*.yml` deploy files at the repo root.

---

## Testing & tooling

- `phpunit.xml` is configured; `tests/` currently holds only the framework example
  tests — **no real coverage yet**.
- `laravel/pint` for code style, `barryvdh/laravel-ide-helper` for IDE metadata
  (`_ide_helper.php`).

---

## Known gaps

- CORS is wide open — `config/cors.php` has `allowed_origins => ['*']`.
- No test coverage, no CI.
- `config/translatable.php` uses the key `defualt_locale` (typo baked into the app);
  keep the matching `DEFUALT_LOCALE` env spelling.
