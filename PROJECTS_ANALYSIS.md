# Projects Analysis — Portfolio Addendum for Mohamed Hany Fathy

> Purpose: attach this file to the portfolio-generation prompt so the AI can build accurate,
> impressive project cards from real codebase analysis (not guesses).

---

## Quick Overview

| # | Project | Stack | Scale | Portfolio Status |
|---|---------|-------|-------|------------------|
| 1 | **MyHealthAI** — AI Telemedicine Platform | Angular 16, Express, MongoDB, FastAPI (AI service) | ~73k lines, 85 REST endpoints, 13 models | ⭐ FLAGSHIP — [showcase repo](https://github.com/mohany6/MyHealthAI) |
| 2 | **FC26 Account Automation Suite** (Desktop) | Python, CustomTkinter, ThreadPoolExecutor | ~3,800 lines, 14 modules | ⭐ STRONG — [showcase repo](https://github.com/mohany6/fc26-automation-suite) |
| 3 | **Cinema Booking System** | Angular 16, Express, SQLite (better-sqlite3), Redis (optional), GraphQL | Fullstack, 3-role marketplace | ✅ REDESIGNED & LIVE — [github.com/mohany6/cinema-booking-system](https://github.com/mohany6/cinema-booking-system) |
| 4 | **GraphQL Books API** | TypeScript, GraphQL Yoga, MS SQL Server, JWT/RBAC, DataLoader | Backend, 16 types / 16 mutations, auth + pagination + subscriptions + tests | ✅ UPGRADED — production-grade card |
| 5 | **CustomerManager (Laravel 11)** | PHP 8.2, Laravel 11, Tailwind, Vite, SQLite | Full CRUD, SaaS dashboard UI, 14 resource routes | ✅ REDESIGNED & VERIFIED LIVE — [github.com/mohany6/laravel-customer-manager](https://github.com/mohany6/laravel-customer-manager) |

---

## 1. MyHealthAI — AI-Powered Telemedicine Platform ⭐ FLAGSHIP

**What it is:** Full-stack lung-health telemedicine platform connecting patients with chest specialists. Patients upload chest X-rays analyzed by a remote Python/FastAPI ML model (pneumonia detection with confidence scores), book paid appointments at doctor-run clinics, receive PDF prescriptions/receipts, and rate doctors — under a full three-role system (Patient / Doctor / Admin).

**Tech Stack:**
- Frontend: Angular 16, Bootstrap 5, Chart.js, Leaflet + OpenStreetMap, ngx-toastr, AOS animations, QR codes
- Backend: Node.js, Express (~85 REST endpoints), Mongoose/MongoDB (13 models), JWT, bcrypt
- Security: speakeasy TOTP 2FA, qrcode enrollment, geoip-lite, Helmet
- Services: Nodemailer (styled HTML emails), PDFKit (prescriptions + receipts), Multer upload pipeline, Axios → remote FastAPI AI microservice

**Key Features:**
- AI diagnostics: X-ray upload (MIME-filtered, 10MB) → Node proxy → FastAPI model (API-key secured) → PNEUMONIA/NORMAL prediction persisted with history pages
- Bank-grade account security: TOTP + email 2FA, SHA-256 trusted-device fingerprints with 2FA bypass, IP-geolocated session inventory with remote revocation, per-user security audit log, response sanitization of credentials
- Dual-code email change flow, verified account self-deletion, remember-me JWT tiers (1h / 30d)
- Doctor marketplace: multi-document verification uploads (license, ID, CV) → admin approval workflow with rejection reasons and resubmission limits
- Clinics with map coordinates (Leaflet/geocoder), slot capacity modeling, multi-step booking wizard with re-verified availability
- Payments lifecycle (cash/card/PayPal/wallet/stripe records, refund flagging on cancellation) + PDFKit receipts
- Minute-interval background scheduler automating appointment transitions and detecting missed appointments, with transactional emails
- Admin analytics dashboards (Chart.js): user growth, appointment distribution, income metrics
- Geo features: clinic marker, user geolocation, route polyline, Haversine distance ("x.x km away")

**Architecture Highlights:**
- RBAC enforced twice: Express guard chain (`isAuthenticated`, `isAdmin` w/ access levels, `isDoctor`) mirrored by Angular route guards; lazy-loaded role modules (48 components)
- Mongoose discriminator inheritance (Doctor ⊂ User), `toJSON.transform` sanitization, compound indexes, computed virtuals
- Layered API: routes → guards → controllers → models, centralized error handler, asyncHandler wrapper
- Hardened per-class multer configs (photos/X-rays/documents with size tiers)

**CV-Ready Bullets:**
- Built MyHealthAI, a full-stack AI telemedicine platform (~73k lines, 85 REST endpoints, 13 MongoDB models) spanning patient, doctor, and admin experiences
- Integrated a remote Python pneumonia-detection model (FastAPI, API-key secured) through a secure Node proxy layer with persisted predictions and confidence scores
- Engineered advanced account security: TOTP/email 2FA, trusted-device fingerprints, IP-geolocated session management with remote revocation, and security audit trails
- Automated appointment lifecycle with a scheduler driving status transitions and email notifications; generated server-side PDF prescriptions and receipts

---

## 2. FC26 Automation Suite ⚡ — High-Throughput Desktop Automation Tool ⭐ STRONG

> **Production Desktop Application** | v5.0 · ~3,800 Lines of Code · 14 Cohesive Modules | Used in Daily Operation  
> **Source Code:** 🔒 Private — available on request for technical evaluation ([mahamedhany8@gmail.com](mailto:mahamedhany8@gmail.com))

---

### ⚠️ Educational Disclaimer & Legal Notice
*EA Sports FC™ and Ultimate Team are trademarks of Electronic Arts Inc. This project is not affiliated with, endorsed by, or sponsored by EA in any way.*
- EA does not provide any public API for its web app/companion services.
- All functionality in this suite was built strictly for **educational purposes only** — as a personal exercise in desktop concurrency architecture, HTTP protocol analysis, resilient automation design, and large-scale systems engineering.
- Techniques involved include reverse-engineering undocumented web endpoints (via browser traffic analysis) and web scraping, since no official interface exists.
- The software was never distributed or sold, no third-party accounts were accessed without their owners' involvement, and it must not be used to violate EA's Terms of Service or any applicable law.
- If you are a representative of EA and have concerns, please contact me and I will take it down: [mahamedhany8@gmail.com](mailto:mahamedhany8@gmail.com).

---

### 🔬 Technical Approach (How It Works Without a Public API)
Because EA does not provide any official public API for companion or web app platforms, the pipeline was engineered from the ground up:
1. **Traffic Capture & Protocol Analysis** — Inspected browser↔EA web-app HTTP traffic to map undocumented REST endpoints, dynamic headers, cryptographic tokens, and session-cookie lifecycles.
2. **Headless Session Handling** — Replayed stored session cookies through browserless HTTP login flows, accurately replicating OAuth redirects, token exchange, and MFA code verification polling.
3. **Response-Driven Classification** — Reverse-engineered the semantics of upstream status codes and payload signatures into a **34-entry result taxonomy** (club found / no market access / email changed / verification required / cooldowns).
4. **Rate-Limit Awareness & Mitigation** — Detected upstream throttling responses and engineered adaptive cooldown gates, dynamic proxy rotation with fault-isolated banning, and direct-connection fallback strategies.

---

### 🔄 4-Step Headless & Hybrid Verification Pipeline

1. **Step 1 — Headless Authentication & Session Replay (`ea_http_login` & `xbox_code_login`)**:
   - Executes browserless OAuth code exchange, replaying stored session cookies and polling Microsoft verification endpoints without launching browser processes.
2. **Step 2 — Token Minting & Identity Gateway (`gateway.ea.com`)**:
   - Mints `FC26_JS_WEB_APP` JWT tokens via promptless authentication, queries the Identity Gateway (`/proxy/identity/pids/me`) for the user persona ID (`pidId`), and acquires `FUTWEB_BK_OL_SERVER` authorization codes.
3. **Step 3 — Browserless UTAS Account Verification (`utas.mob.v5.prd.futc-ext.gcp.ea.com`)**:
   - Ingests nucleus headers and queries `/ut/game/fc26/v2/user/accountinfo`. HTTP 200 signals a returning club account; HTTP 465 signals no club; 4xx codes trigger specific taxonomy mapping.
4. **Step 4 — Hybrid Market Probe & Telemetry (`Playwright` + UTAS API)**:
   - For confirmed club accounts, automated Playwright sessions capture `X-UT-SID` session tokens, test the Transfer Market API (`/ut/game/fc26/transfermarket`), and classify market states into `open`, `banned`, `not_earned`, or `locked`.

---

### 🏛️ Concurrency Architecture & 14 Modular Packages (`fut26_ui`)

Refactored from a 136 KB single-file monolith into 14 cohesive, typed Python modules:
- `main_window.py` (Main GUI window, table layouts, live metric tickers, keyboard shortcuts)
- `workers.py` (`CheckWorkerPool` concurrency orchestrator, thread lifecycle controls, retry state machines)
- `models.py` (`EtaCalculator`, account data structures, pipeline state snapshots)
- `status.py` (`ResultClassifier` single source of truth mapping raw payloads → 8 KPI buckets, 7 filter tabs, 3 export buckets)
- `gather.py` (48-source concurrent proxy scraper with 5 pluggable parsers, deduped to 8k pool)
- `proxy_modal.py` (100-thread proxy health validator measuring microsecond latency against live endpoints)
- `inspect_modal.py` (Step-by-step pipeline inspector modal rendering JSON request/response telemetry)
- `exporters.py` (Multi-format export engine streaming to TXT, JSON, and CSV)
- `store.py` (Thread-safe atomic persistence store for sessions, history, and checkpoints)
- `settings_io.py` (Persistent settings serialization)
- `strings.py` (Taxonomy constants, error messages, and localized labels)
- `theme.py` (Dark/Light design tokens, CustomTkinter color palettes)
- `widgets.py` (Custom KPI chips, animated status indicators, custom table cells)
- `__init__.py` (Package initialization and application launcher)

#### 🧵 Concurrency Engine (`threading` + `queue.Queue` + `ThreadPoolExecutor`)
- **Producer/Consumer Worker Pool**: Dynamically configurable 1–20 parallel workers with full lifecycle controls (*pause / resume / stop / skip-in-flight*).
- **Zero Cross-Thread Widget Access (`UiBridge`)**: Background workers communicate exclusively through callback-fed queues drained by an 80ms main-thread UI pump; control states are synchronized via `threading.Event` primitives.

#### 🌐 High-Performance Proxy Subsystem
- **100-Thread Parallel Validator**: Tests candidate proxies against a live OAuth endpoint with microsecond latency measurement.
- **Dynamic Rotation & Fault Isolation**: Per-request rotation with bad-proxy reporting, automatic cooldown banning, and direct-connection fallback on exhaustion.

#### 🛡️ Resilience & Desktop Hardening
- **Global Exception Hooks**: Crash-proof interception across main and worker threads routing errors to structured diagnostic logs.
- **Windows Per-Monitor V2 DPI Awareness**: Multi-DPI scale-aware rendering using native `ctypes` integration.

---

### 🛠️ Tech Stack Matrix

| Layer | Technology |
| :--- | :--- |
| **GUI Framework** | Python 3, CustomTkinter, Tkinter/ttk, Dark/Light Design Tokens |
| **Concurrency** | `threading`, `queue.Queue`, `concurrent.futures.ThreadPoolExecutor` (≤ 100 threads) |
| **Networking** | `requests.Session`, urllib3, HTTP Proxy Pools & Rotation |
| **Persistence** | Atomic JSON / CSV / TXT stores, Thread-safe file locks |
| **Platform** | Windows `ctypes` (Per-Monitor V2 DPI), PyInstaller Executable Packaging |

---

### 💼 CV-Ready Bullets
- Engineered a ~3,800-line modular Python desktop automation suite by refactoring a 136 KB monolith into 14 cohesive modules with design-token theming and explicit size budgets.
- Designed a thread-safe producer/consumer concurrency architecture with up to 20 parallel workers communicating exclusively via callback-fed queues — eliminating cross-thread UI contention.
- Developed a 100-thread proxy validation engine and a 48-source scraper with pluggable parsers, automatic latency scoring, and dynamic cooldown rotation.
- Implemented a 34-entry status taxonomy, O(1) incremental telemetry, sliding-window ETA estimators, and atomic file persistence.

---

## 3. Cinema Booking System — Three-Sided Marketplace ✅ REDESIGNED & LIVE

**What it is:** Online movie-ticket booking platform with three roles: Admins manage vendors, Vendors run cinemas (halls/movies/showtimes), and Customers browse movies and book exact seats on an interactive seat map. Modernized with a cinematic UI redesign and zero-setup test environment.

**Tech Stack:** Angular 16 SPA, Express, **SQLite** (better-sqlite3, file-based `backend/database.sqlite`), Redis (optional — graceful fallback, no crash when not running), express-graphql (hybrid REST + GraphQL), JWT + bcrypt

**UI Redesign (marketplace-modern look):**
- Cinematic hero with gradient overlays, movie poster cards with hover zoom, rating badges, and "Now Showing" / "Coming Soon" horizontal scroll rows
- Premium seat-map UI: curved screen indicator, available/booked/selected states with color legend, booking summary side panel (movie info, ticket count, seat numbers, total price, sticky confirm button)
- Professional vendor dashboard with stat cards, data tables with status badges, search, and action buttons with confirmation modals
- Admin vendor management with CRUD table
- 12 screenshots captured across all roles and flows

**Key Features:**
- Interactive seat-map grid (available/booked/selected) with server-side validation against per-showtime boolean seat arrays; live free-seat counts; day-range showtime queries
- Vendor panel: create halls (unique hall numbers w/ duplicate-key handling mapped to 11000 error code), movies, and showtimes with capacity derived from hall
- Admin panel: full vendor CRUD behind admin middleware
- Redis cache-first movie catalog (1h TTL) with deliberate invalidation on writes — **gracefully degrades when Redis is not running**
- Hybrid REST + GraphQL: hall creation submitted as a GraphQL mutation from the Angular client — **JWT context fixed** (mutation auth now enforces role correctly)
- Lazy-loaded persona modules (admin/vendor/customer layouts), role-based post-login redirects, AuthGuard

**Zero-Setup Test Environment:**
- **No MongoDB or Redis required.** SQLite database (`database.sqlite`) is auto-created and seeded on first server start
- Demo accounts (password `password123`): `admin@cinema.com`, `vendor@cinema.com`, `customer@cinema.com`
- Seeded data: 5 movies (Inception, The Dark Knight, Interstellar, Parasite, Spirited Away), 3 halls (Grand Hall 40 seats, Platinum Suite 20 seats, Sky Cinema 30 seats), 105 showtimes (every movie × every hall × 7 days), all seats available
- Redis caching auto-skipped when unavailable — no configuration needed
- Fixed GraphQL context bug: `express-graphql` 0.12 passes `context` directly without invoking it → changed to function form so `requireVendor` receives the request and JWT correctly

**End-to-End Verified:**
- Register new customer, admin login, customer login
- Movie catalog, available dates query, day-range showtime query with populated hall data
- Seat map pull (boolean array), seat selection with toggle, booking with server-side conflict checking (seats atomically flip to `false`)
- Admin vendor CRUD (create, list, update, delete)
- Movie/hall CRUD via vendor panel
- GraphQL query (`cinemaHalls`) and mutation (`addCinemaHall`) with JWT auth enforcement
- Profile endpoint

**CV-Ready Bullets:**
- Built a three-role cinema booking platform (Angular 16 + Express) covering vendor onboarding, catalog scheduling, and end-customer seat reservation; migrated from MongoDB to zero-setup SQLite (better-sqlite3) eliminating external database dependencies
- Designed a seat-inventory model with server-side conflict-checked writes powering an interactive seat-selection UI with visual seat states and live availability counts
- Delivered a modern marketplace UI redesign (cinematic hero, poster cards, premium seat map, professional dashboards) with 12 feature screenshots
- Fixed GraphQL context bug enabling JWT-authenticated mutations; made Redis caching optional with graceful fallback

---

## 4. GraphQL Books API — Production-Grade GraphQL Backend ✅ UPGRADED

**Location:** `D:\New folder\graphql-server`  
**Repository:** push as `github.com/mohany6/graphql-server`  
**Stack:** TypeScript, Node.js 22, GraphQL Yoga (v5), Microsoft SQL Server, JWT + bcrypt, DataLoader, Zod-less (custom validation), Helmet, rate-limiter-flexible, graphql-depth-limit, graphql-query-complexity, Jest + Supertest, Docker + docker-compose + GitHub Actions CI

**What it is:** A production-grade GraphQL API for a book store with authors, categories, reviews, and users. Originally a 100-line `express-graphql` tutorial. Fully rewritten in TypeScript on the modern `graphql-yoga` stack with 16 schema types, 16 mutations, JWT-authenticated RBAC, Relay-spec cursor pagination, DataLoader N+1 batching, subscriptions, layered security hardening, and a full integration test suite.

> ✅ **VALIDATED end-to-end** against a real Microsoft SQL Server (Windows) — schema boots, 16 types / 16 mutations introspect correctly, GraphiQL works, and the `sa` credential leak + deprecated `express-graphql` were both eliminated. Screenshots of the running system are in `D:\New folder\graphql-server\screenshots\` (9 captures: pagination+relations, JWT `me`, signup, RBAC `FORBIDDEN`, admin `addBook`, depth-limit, `CONFLICT` code, `AUTH_REQUIRED`, complexity-limit).

### Key Features & Engineering Highlights

**Schema & Domain:**
- 5 entities (User, Author, Category, Book, Review) with full graph traversal — `Book.author`, `Book.category`, `Author.books`, `Category.books`, `Review.user`, `Review.book`
- Computed aggregates: `reviewCount`, `averageRating` on each book via SQL subqueries
- 16 mutations: signup, login, CRUD for books/authors/categories, add/delete reviews

**Modern GraphQL Stack:**
- Migrated from deprecated `express-graphql + graphql 15` → **GraphQL Yoga v5 + GraphQL 16** (the maintained ecosystem)
- Schema-first SDL (`makeExecutableSchema`) with TypeScript resolver maps
- `createPubSub` for in-memory real-time subscriptions (`bookAdded`, `bookUpdated`, `reviewAdded` with `@graphql-yoga/subscription` `filter` operator)

**Authentication & Authorization (JWT + RBAC):**
- JWT sign/verify with `sub` (userId), `email`, `role` claims, issuer + expiry validation
- bcrypt (10 rounds) password hashing
- Three-tier access: anonymous (read-only queries), MEMBER (add/delete own reviews), ADMIN (full CRUD on books/authors/categories)
- Authorization delegated to the **service layer** (business logic), not resolvers — per GraphQL best practice
- Ownership checks: a member can only delete their own reviews; admins can delete any

**Pagination (Relay Connections):**
- Keyset (cursor-based) pagination on `booksConnection` with `edges`/`nodes`/`pageInfo`/`totalCount`
- Supports forward (`first`/`after`) and backward (`last`/`before`) traversal
- Sort modes: `NEWEST`, `OLDEST`, `PRICE_ASC`, `PRICE_DESC`, `TITLE_ASC` with dynamic cursor encoding
- Filter: `search` (LIKE), `categoryId`, `minPrice`, `maxPrice`
- `authorsConnection` (offset-based) and `reviews` (keyset) also connection-wrapped
- Cursors are opaque `base64url` strings; no page offset leaks

**N+1 Elimination (DataLoader):**
- 7 per-request batched loaders: `userById`, `authorById`, `categoryById`, `bookById`, `reviewsByBook`, `booksByAuthor`, `booksByCategory`
- Batch SQL via `STRING_SPLIT` — single query per request, not per item

**Security Hardening:**
- **Query depth limit** (max 10 levels) — stops cyclic queries
- **Query complexity budget** (max 120) — `fieldExtensionsEstimator` + `simpleEstimator`
- **Per-IP rate limiting** — `rate-limiter-flexible` sliding window (300/15min default)
- **Error masking** — internal details hidden in production; domain codes (`VALIDATION_ERROR`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `AUTH_REQUIRED`, `INVALID_CREDENTIALS`, `RATE_LIMITED`) surfaced
- **Introspection disabled** in production (custom validation rule)
- **Helmet** security headers
- **Env-based secrets** — `dotenv`, no hardcoded credentials; `.env.example` with validation instructions
- **Parameterized SQL** everywhere — SQL injection safe

**Database & Repositories:**
- Microsoft SQL Server with `mssql` connection pooling (max 10, min 1)
- `ensureDatabaseAndSchema` creates DB + applies `init.sql` (idempotent)
- `withTransaction` helper for atomic multi-table operations
- Tables: Users, Authors, Categories, Books (with FKs, indexes, unique constraints), Reviews (FK cascade, UNIQUE(book,user), CHECK(rating 1-5))
- Demo seed data: 3 authors, 3 books, 2 users (admin + member)

**Testing:**
- Jest + Supertest integration suite against a real SQL Server (separate `BookDB_Test` database)
- `globalSetup` creates test DB + schema, `beforeEach` truncates data
- Test files: `auth.test.ts`, `books.test.ts`, `reviews.test.ts`, `pagination.test.ts`, `security.test.ts`
- Tests cover: signup/login, duplicate email, weak password, invalid credentials, me query, anonymous access, RBAC admin/member enforcement, book CRUD, author/category validation, ISBN validation, FK existence checks, review add/delete/duplicate/ownership, admin override, keyset forward/backward pagination walk, sort modes, search filter, depth limit, complexity budget, and error code masking

**Infrastructure:**
- Multi-stage Dockerfile (alpine, `npm ci --omit=dev`, `node` user)
- `docker-compose.yml` with mssql 2022 + API services, health check, init script mount
- GitHub Actions CI: typecheck → build → test (with mssql service container)

### CV-Ready Bullets
- Built a production-grade GraphQL API (TypeScript, GraphQL Yoga, MS SQL Server) with 16 schema types, 16 mutations, and full authentication/authorization (JWT, role-based access, ownership checks)
- Engineered Relay-spec cursor pagination with keyset queries, multiple sort modes, and forward/backward traversal — handling 5+ filters and total counts
- Eliminated N+1 query problems with a 7-loader DataLoader layer, batching SQL via `STRING_SPLIT` for authors, categories, reviews, and users
- Hardened the API against malicious queries with depth limiting (10), complexity budgeting (120), per-IP rate limiting, error masking, and production-gated introspection
- Wrote a 30+ scenario integration test suite (Jest + Supertest) covering auth flows, RBAC enforcement, pagination walk, and security boundary checks, runnable in CI via Dockerized SQL Server
- Containerized the application with multi-stage Dockerfile and docker-compose (SQL Server + app) and configured GitHub Actions CI for automated typecheck, build, and test

### ⚠️ Cleanup Before Pushing to GitHub
The `graphql-mutation/` folder (from the old tutorial) still contains hardcoded `sa`/`123456` credentials in `dbConfig.js`. **Delete it** before pushing this repo publicly. The new project fully supersedes it.

---

## 5. CustomerManager (Laravel 11) — COMPLETE ✅ REDESIGNED · VERIFIED LIVE · SCREENSHOTTED

**Location:** `D:\New folder (5)\my-project`  
**Repository:** https://github.com/mohany6/laravel-customer-manager  
**Stack:** PHP 8.2, Laravel 11.34, SQLite (Eloquent ORM + FK constraints), Blade, Tailwind CSS 3, Vite 5

**What it is:** A relational Customer–Order management application rebuilt from a broken beginner exercise into a clean, tested CRUD app with a SaaS-style analytics dashboard UI. Verified end-to-end on a live server (migrate → seed → build → serve → screenshot every screen).

### Key Features & Engineering Highlights

**Backend (Laravel 11 idioms):**
- 14 RESTful resource routes (7 per entity) via `Route::resource` — full CRUD for Customers and Orders
- Implicit route-model binding (`show(Customer $customer)`) — no manual 404 handling
- Eloquent one-to-many (`Customer hasMany Order` / `Order belongsTo Customer`) with FK cascade deletes at the migration level
- Eager aggregate loading with `withCount('orders')` — order counts per customer in a single query, no N+1
- Server-side validation arrays: unique phone (with self-exclusion rule on update: `unique:customers,phone,{id}`), integer age bounded 1–120, per-field max lengths, foreign-key existence on order creation
- Session flash messages for every create / update / delete action

**Frontend (redesigned SaaS dashboard UI):**
- Customers dashboard: KPI cards (total customers, associated orders, average customer age), searchable registry table with avatar initials, per-row order counts, and view/edit/delete actions
- Customer profile page: lifetime-value header, contact/age/address/orders-placed stat cards, and full order history table with per-order view/edit
- Orders dashboard: revenue KPIs (total orders, total revenue, average order value, active buyers) with customer-assigned order registry
- Create/edit forms with field-level hint text and an inline validation-error partial (`_form_errors.blade.php`)
- Responsive Tailwind layout shell (`layouts/app.blade.php`) with active-nav highlighting and a branded top bar
- 11 Blade views compiled through the Vite asset pipeline (`npm run build`)

**Data layer:**
- SQLite with foreign-key constraints enforced; migrations with proper FK + cascade-on-delete
- Realistic database seeder (4 customers / 5 orders with unique phones and order reference codes)

### ✅ Verified Live (end-to-end run)
Fresh `migrate:fresh --seed` → `vite build` → PHP built-in server → all 5 key routes returned HTTP 200 and were captured as screenshots. Screenshots live in `Portfolio/screenshots/customer-manager/` and are wired into the portfolio project modal gallery (`js/projects.js` → `laravel-customer-manager` → 5-entry gallery).

### 📸 Verified Feature Screenshots (`Portfolio/screenshots/customer-manager/`)
1. `customers.png` — customers dashboard: KPI cards + contact registry table
2. `customer-show.png` — customer profile: lifetime value, stat cards, order history
3. `customer-create.png` — new customer form with validation hints
4. `orders.png` — orders dashboard: revenue KPIs + order registry
5. `order-create.png` — new order form: customer dropdown, reference code, amount

**CV-Ready Bullets:**
- Built a Customer-Order management app on Laravel 11 (PHP 8.2) with 14 RESTful resource routes, implicit route-model binding, Eloquent one-to-many relationships, foreign-key cascade deletes, and array-based server-side validation (unique-phone with self-exclusion on update, bounded integer ranges)
- Designed a SaaS-style analytics UI (Tailwind CSS 3 + Blade + Vite) with KPI dashboards for customers and revenue, `withCount` eager aggregates to avoid N+1 queries, and reusable form-error partials with flash messaging
- Verified the app end-to-end on a live server (fresh migration/seed → production asset build → HTTP 200 on every route) and documented it with a 5-capture screenshot gallery embedded in the portfolio

---

## 6. GrandStay — Enterprise Hotel Reservation Platform (MEAN Stack) ✅ PRODUCTION-GRADE — TESTED · DOCKERIZED · CI-VERIFIED

**Location:** `D:\hotel-booking-mean-stack-master`  
**Repository:** https://github.com/mohany6/hotel-booking-system  
**Stack:** Angular 18 (TypeScript, Material, Tailwind), Node.js 22 (Express, TypeScript TSX), MongoDB 8 (Mongoose) + zero-dependency embedded engine, JWT, RBAC, Jest + Supertest, Docker Compose, GitHub Actions CI

### What it is:
A production-grade full-stack hotel booking platform featuring guest discovery and reservations alongside a complete administrative property management suite — hardened through a security/quality audit pass that fixed 6 real vulnerabilities and added a full engineering toolchain (tests, CI, containers).

### 🔥 Strongest Points — Mapped to What the Egyptian Market Asks For
| Market Demand (2026 JDs) | GrandStay Evidence |
|---|---|
| **Node.js + Express + TypeScript** (must-have) | End-to-end typed backend (TSX), clean layered architecture: routers → middleware → store/models, centralized error handler |
| **Testing Jest/Mocha** (must-have — was his #1 gap) | ✅ **22 Jest + Supertest tests across 5 suites** — including a privilege-escalation regression test and an overbooking capacity test; isolated temp DB per run |
| **Docker / CI-CD** (must-have — was undemonstrated) | ✅ Multi-stage Dockerfiles (Angular→nginx + Node), `docker-compose.yml` with healthchecks & volumes, **GitHub Actions pipeline** (typecheck + tests + prod build) with README badges |
| **JWT / auth flows + RBAC** (must-have) | JWT 7-day tokens with role claims, Express guard chain mirrored by Angular `AuthGuard`/`AdminGuard`, rate-limited login/register, self-assigned admin role impossible (tested) |
| **Data-layer pragmatism (SQL AND NoSQL thinking)** | **Dual persistence modes behind one REST contract**: zero-dependency atomic JSON engine (demos/CI) ⇄ Mongoose/Atlas mode via a single `DB_URI` env flag — a strong architecture story for interviews |
| **Payments lifecycle** (must-have) | Simulated gateway route with ownership enforcement, idempotent re-payment guard, masked `************last4` storage; **CVV never persisted** (schema-level + engine-level, test-asserted) |
| **Overbooking prevention / concurrency correctness** | Date-range overlap algorithm (`checkIn < reqCheckOut && checkOut > reqCheckIn`) counting confirmed bookings against room stock; cancellation frees capacity automatically; exact-capacity behavior locked by tests |
| **API design maturity** | Server-side pagination with `X-Total-Count` header consumed by an Angular pager UI, input validation (dates, room types, ratings), consistent 400/401/403/404 semantics |
| **Angular 18 modern patterns** | Standalone components, functional guards, functional HTTP interceptor, reactive forms, RxJS `map` pipelines over `HttpResponse` |

### 🩹 Security Audit Pass (real bugs found → fixed → regression-tested)
1. **Privilege escalation** — `isAdmin` was client-assignable at registration → forced server-side, locked by a test
2. **Overbooking** — no availability check, inventory never enforced → overlap-count enforcement + capacity test
3. **Missing admin endpoint** — frontend called `DELETE /api/admin/users/:id` which didn't exist → implemented with self-delete guard
4. **Secret hygiene** — JWT secret hardcoded fallback + `.env` committed to git → required env var, `.env` untracked & gitignored
5. **CVV stored raw in DB** → stripped before persistence in both engines
6. **Mongoose-stack defects** (when Atlas mode enabled) — missing `isAdmin` JWT claim (admin lockout), IDOR on user bookings, password hashes returned by `/admin/users`, Mongoose-8 callback API crash in payment route, regex injection in search

### 📸 Verified Live Proof (screenshots — `Portfolio/screenshots/grandstay/`)
1. `01-home-hero.png` — luxury landing page (Angular 18 + Tailwind)
2. `02-login-portal.png` — JWT auth portal
3. `03-guest-profile-bookings.png` — member portal: 4 confirmed bookings w/ masked cards + hotel catalog + **"Showing 9 of 11 — page 1/2" pagination**
4. `04-search-pagination-page2.png` — working pager controls
5. `05-booking-payment-form.png` — reservation + tokenized payment form
6. `06-admin-dashboard.png` — admin suite: KPI cards (11 properties / 245 rooms / $285 avg rate), inventory CRUD, user-role management
7. `07-live-api-health.png` — live API health JSON (`mode: embedded`, v2.1.0)

### CV-Ready Bullets:
- Built a full-stack hotel booking platform (Angular 18, Node.js 22, Express, TypeScript end-to-end) with multi-attribute search, server-side pagination (`X-Total-Count` → Angular pager), and a dual-persistence architecture: zero-dependency embedded engine ⇄ MongoDB/Atlas behind one REST contract
- Engineered a room collision-detection algorithm (date-range overlap counting) that mathematically prevents overbooking and auto-frees capacity on cancellation — behavior locked in by a Jest/Supertest suite of 22 tests including privilege-escalation and capacity regression tests
- Containerized the platform with multi-stage Docker builds + docker-compose (nginx reverse proxy, healthchecks) and a GitHub Actions CI pipeline running typecheck, API tests, and production builds on every push
- Hardened auth & payments: JWT RBAC mirrored across Express guards and Angular functional guards, rate-limited auth endpoints, PCI-hygiene card masking with CVV never persisted, ownership-enforced cancellations and payment simulation
- Conducted a security audit that found and fixed 6 real vulnerabilities (client-assigned admin role, overbooking, IDOR, secret leakage, CVV storage, Mongoose-8 API misuse) — each closed with a regression test

---

## 🏆 Summary of All Projects & Market Pull Alignment

1. **MyHealthAI ⭐ FLAGSHIP** ([github.com/mohany6/MyHealthAI](https://github.com/mohany6/MyHealthAI))
   - *Market Pull*: Rides the +293% AI-integration wave (FastAPI PyTorch proxy, confidence persistence) + bank-grade TOTP 2FA security + query optimization (-30% API latency).
2. **FC26 High-Throughput Automation Suite ⭐ STRONG** ([github.com/mohany6/fc26-automation-suite](https://github.com/mohany6/fc26-automation-suite))
   - *Market Pull*: Answers explicit enterprise "parallel processing / high concurrency" requirements (100-thread validator, producer/consumer queue with zero cross-thread UI blocking).
3. **Cinema Booking Marketplace ✅ REDESIGNED & LIVE** ([github.com/mohany6/cinema-booking-system](https://github.com/mohany6/cinema-booking-system))
   - *Market Pull*: Full-stack 3-role marketplace with a modern UI redesign (12 screenshots), conflict-checked seat matrix, hybrid REST + GraphQL with working JWT-authenticated mutations, and a **zero-setup test story** — MongoDB migrated to auto-seeded SQLite, Redis optional with graceful fallback. Any interviewer can run it in minutes with demo accounts.
4. **GrandStay Hotel Booking Platform ✅ PRODUCTION-GRADE** ([github.com/mohany6/hotel-booking-system](https://github.com/mohany6/hotel-booking-system))
   - *Market Pull*: Directly closes his two biggest JD gaps — **Jest/Supertest testing (22 tests)** and **Docker/CI-CD (compose + GitHub Actions)** — while proving Node/TypeScript/REST mastery, JWT+RBAC security depth, overbooking-prevention logic, and a dual-persistence architecture (embedded engine ⇄ MongoDB/Atlas) that makes a great interview story.
5. **CustomerManager (Laravel 11) ✅ REDESIGNED & VERIFIED LIVE** ([github.com/mohany6/laravel-customer-manager](https://github.com/mohany6/laravel-customer-manager))
   - *Market Pull*: Multi-framework breadth (PHP 8.2, Laravel 11, Eloquent ORM with `withCount` eager aggregates, cascade deletes, Tailwind/Blade via Vite) + a SaaS-style analytics dashboard UI, verified live with a 5-capture screenshot gallery embedded in the portfolio.
6. **GraphQL Books API ✅ PRODUCTION-GRADE** ([github.com/mohany6/graphql-server](https://github.com/mohany6/graphql-server))
   - *Market Pull*: The full modern GraphQL stack (TypeScript + Yoga + GraphQL 16) with JWT/RBAC, Relay cursor pagination, DataLoader, subscriptions, security hardening, tests, Docker & CI — directly answers the Node/GraphQL + testing + Docker gaps.

