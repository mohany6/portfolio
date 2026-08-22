# Projects Analysis — Portfolio Addendum for Mohamed Hany Fathy

> Purpose: attach this file to the portfolio-generation prompt so the AI can build accurate,
> impressive project cards from real codebase analysis (not guesses).

---

## Quick Overview

| # | Project | Stack | Scale | Portfolio Status |
|---|---------|-------|-------|------------------|
| 1 | **MyHealthAI** — AI Telemedicine Platform | Angular 16, Express, MongoDB, FastAPI (AI service) | ~73k lines, 85 REST endpoints, 13 models | ⭐ FLAGSHIP — [showcase repo](https://github.com/mohany6/MyHealthAI) |
| 2 | **FC26 Account Automation Suite** (Desktop) | Python, CustomTkinter, ThreadPoolExecutor | ~3,800 lines, 14 modules | ⭐ STRONG — [showcase repo](https://github.com/mohany6/fc26-automation-suite) |
| 3 | **Cinema Booking System** | Angular 16, Express, MongoDB, Redis, GraphQL | Fullstack, 3-role marketplace | ✅ FIXED & LIVE — [github.com/mohany6/cinema-booking-system](https://github.com/mohany6/cinema-booking-system) |
| 4 | **GraphQL Books API** | Node.js, express-graphql, MS SQL Server | Small demo (~100 LOC) | ⚠️ MINOR — list briefly or upgrade first |
| 5 | **CustomerManager (Laravel 11)** | PHP 8.2, Laravel 11, Tailwind, Vite, SQLite | Full CRUD, tested end-to-end | ✅ COMPLETE & LIVE — [github.com/mohany6/laravel-customer-manager](https://github.com/mohany6/laravel-customer-manager) |

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

## 2. FC26 Club Checker v5.0 — Desktop Automation Suite ⭐ STRONG

**What it is:** A production-used Windows desktop tool (~3,800 lines) for bulk account verification pipelines: loads session files, runs parallel HTTP check flows through rotating proxies, classifies results into a 34-entry status taxonomy, and feeds live KPI dashboards, filterable tables, and multi-format exports.

**Tech Stack:** Python 3, CustomTkinter/Tkinter, requests, threading + queue + ThreadPoolExecutor (up to 100 threads), JSON persistence, ctypes (Windows Per-Monitor V2 DPI)

**Key Features:**
- Worker-pool engine (1–20 parallel workers) with pause/resume/stop/skip-in-flight controls, retry-after-cooldown delayed re-queues, and start-from index
- Proxy subsystem: 100-thread health validator against a live OAuth endpoint with latency measurement, auto-gatherer scraping 48 public sources with 5 pluggable parsers (dedupe cap 8,000), rotation with banning + direct fallback
- Live dashboard: 8 O(1)-incremented KPI chips, throughput (acc/min) + ETA sliding-window estimator, color-coded sortable table with regex search and 7-way filters
- Account inspect modal with pipeline step dump; right-click context actions; live console log with keyword colorization and batching
- Atomic JSON persistence (settings/history/resets/run summaries); exports to TXT/JSON/CSV; keyboard shortcuts, toasts, persisted workspace state

**Architecture Highlights:**
- Clean producer/consumer "UiBridge": workers never touch widgets — callback-fed queues drained by an 80ms UI pump; control via threading.Events
- Refactored a 136KB single-file monolith into 14 cohesive modules with explicit size budgets and design-token theming
- Stateless ResultClassifier as single source of truth mapping raw results → label/colors/KPI/filter/export buckets (eliminated triple-duplicated logic)
- Global exception hooks (main + threads) writing to error log; every task wrapped so exceptions become classified results instead of crashes

**CV-Ready Bullets:**
- Engineered a ~3,800-line modular Python desktop application by decomposing a monolith into 14 modules with design-token theming and explicit size budgets
- Designed a thread-safe producer/consumer architecture where background workers communicate exclusively through callback-fed queues — zero cross-thread widget access
- Built a retry state machine for proxy rotation plus a 100-thread proxy validator and a 48-source concurrent scraper with pluggable parsers
- Implemented O(1) incremental statistics, sliding-window ETA estimation, atomic persistence, and multi-format exports

> ⚠️ Presentation note: frame publicly as a "high-throughput automation & monitoring desktop tool" (concurrency, resilience, data pipeline focus). Avoid emphasizing that it targets game-account checking, which can raise ToS questions with recruiters.

---

## 3. Cinema Booking System — Three-Sided Marketplace ✅ GOOD (fix bugs first)

**What it is:** Online movie-ticket booking platform with three roles: Admins manage vendors, Vendors run cinemas (halls/movies/showtimes), Customers browse and book exact seats on an interactive seat map.

**Tech Stack:** Angular 16 SPA, Express, MongoDB/Mongoose, Redis (cache-aside), express-graphql (hybrid REST + GraphQL), JWT + bcrypt, SB Admin 2 template

**Key Features:**
- Interactive seat-map grid (available/booked/selected) with server-side validation against per-showtime boolean seat arrays; live free-seat counts; day-range showtime queries
- Vendor panel: create halls (unique hall numbers w/ duplicate-key handling), movies, and showtimes with capacity derived from hall
- Admin panel: vendor CRUD behind admin middleware
- Redis cache-first movie catalog (1h TTL) with deliberate invalidation on writes
- Hybrid REST + GraphQL: hall creation submitted as a GraphQL mutation directly from the Angular client
- Lazy-loaded persona modules (admin/vendor/customer layouts), role-based post-login redirects, AuthGuard

**⚠️ Fix Before Showcasing (real bugs found):**
1. `/vendor/*` routes mounted without auth middleware in server.js — anyone can call them
2. Failed password compare does not `return` — login issues a token anyway (auth bypass!)
3. Password double-hashed (manual hash + pre-save hook)
4. Booking page uses `Math.random()` mock seats (prototype leftover)

**CV-Ready Bullets:**
- Built a three-role cinema booking platform (Angular 16 + Express/MongoDB) covering vendor onboarding, catalog scheduling, and end-customer seat reservation
- Designed a seat-inventory model with server-side conflict-checked writes powering an interactive seat-selection UI
- Introduced Redis cache-aside caching with TTL and write-through invalidation; delivered a hybrid REST + GraphQL API consumed from the Angular client

---

## 4. GraphQL Books API — Minor/Learning ⚠️

Small demo: Node.js + express-graphql with full CRUD (queries + mutations) over Microsoft SQL Server using parameterized queries and connection pooling. Shows both SDL (`buildSchema`) and code-first (`GraphQLObjectType`) schema styles.

**Honest status:** tutorial-scale, single entity, no auth. Hardcoded DB credentials committed in source (`sa`/`123456` in dbConfig.js) — remove before any public push.

**Recommendation:** Either list one line ("GraphQL API with SQL Server integration, code-first schemas") on a "Learning / Labs" section, or upgrade it (JWT context auth, relations, pagination, migrate off deprecated express-graphql, env-based secrets) and make it a proper card.

---

## 5. CustomerManager (Laravel 11) — COMPLETE ✅

**Live:** https://github.com/mohany6/laravel-customer-manager

Rebuilt from a broken beginner exercise into a clean, tested CRUD application: full resource controllers for Customers and Orders with server-side validation (unique phone, FK existence), Eloquent one-to-many relations with cascade deletes, fixed migrations with proper foreign keys, 9 Tailwind CSS Blade views, database seeder, and README with screenshot. Verified end-to-end (create/read/update/delete + duplicate rejection) on PHP 8.2 / Laravel 11 / SQLite.

**CV-Ready Bullets:**
- Built a Customer-Order management app on Laravel 11 (PHP 8.2) with RESTful resource controllers, Eloquent one-to-many relationships, foreign-key cascade deletes, and server-side validation
- Delivered a responsive Tailwind CSS UI via Vite with flash messaging and inline validation errors; seeded SQLite database for demo data

---

## How To Use This With The Gemini Prompt

Paste the block below at the end of your portfolio prompt (after MY DATA):

```text
ADDITIONAL PROJECTS (analyzed from my actual codebases — use these descriptions):

1. MyHealthAI — AI Telemedicine Platform (FLAGSHIP): Full-stack platform (Angular 16,
   Express, MongoDB, 85 REST endpoints, 13 models) connecting patients with chest
   specialists. Remote Python/FastAPI pneumonia-detection model integrated via secure
   Node proxy (confidence-scored predictions + history UIs). Bank-grade security: TOTP +
   email 2FA, SHA-256 trusted-device fingerprints, IP-geolocated session manager with
   remote revocation, security audit logs. Doctor marketplace with document verification
   workflow, clinics with Leaflet maps + Haversine distances, multi-step booking wizard
   with slot-capacity modeling, payments lifecycle with PDFKit receipts, minute-interval
   scheduler automating appointment lifecycle + transactional emails, Chart.js admin
   analytics dashboards.
   SHOWCASE: https://github.com/mohany6/MyHealthAI

2. FC26 High-Throughput Automation Suite (Desktop, Python): ~3,800-line CustomTkinter
   app refactored from a monolith into 14 modules. Thread-safe producer/consumer worker
   pool (1–20 workers, pause/resume/stop/skip, retry state machine), 100-thread proxy
   validator, 48-source concurrent scraper with pluggable parsers, 34-entry result
   classifier driving 8 live KPI chips, regex-searchable/filterable tables, sliding-window
   throughput+ETA estimator, atomic JSON persistence, TXT/JSON/CSV exports, global
   exception hooks.
   SHOWCASE: https://github.com/mohany6/fc26-automation-suite

3. Cinema Booking System (Full-stack Marketplace): Angular 16 + Express + MongoDB +
   Redis. Three roles (admin/vendor/customer); interactive seat-map with server-side
   conflict-checked seat inventory; Redis cache-aside catalog with invalidation; hybrid
   REST + GraphQL API (GraphQL mutation consumed directly from Angular); lazy-loaded
   persona modules; JWT + RBAC across backend guards and frontend route guards.
   LIVE: https://github.com/mohany6/cinema-booking-system

4. CustomerManager (Laravel 11 CRUD): PHP 8.2 + Tailwind CSS + SQLite. Full resource
   controllers for Customers/Orders with server-side validation, Eloquent one-to-many
   relations with FK cascade deletes, seeded database, responsive Blade UI via Vite;
   tested end-to-end. LIVE: https://github.com/mohany6/laravel-customer-manager

5. GraphQL SQL Server API (Lab): Node.js GraphQL server with full CRUD mutations over
   Microsoft SQL Server, parameterized queries, connection pooling; implemented in both
   SDL and code-first schema styles.

Suggested portfolio presentation order: MyHealthAI (hero project) → Automation Suite →
Cinema Booking → CustomerManager (Laravel) → GraphQL lab. Each GitHub link above can be
attached to its project card; include a screenshot for Cinema Booking and CustomerManager. For each project card include tech badges, 2-3 bullet
highlights, and placeholder GitHub/live links I will fill in later. Keep them in the
single editable projects data file as instructed earlier.
```
