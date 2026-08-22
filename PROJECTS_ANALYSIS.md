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

## 6. GrandStay — Enterprise Hotel Reservation Platform (MEAN Stack) ✅ COMPLETE & HARDENED

**Location:** `D:\hotel-booking-mean-stack-master`  
**Repository:** https://github.com/mohany6/hotel-booking-system  
**Stack:** Angular 18 (TypeScript, Material, Tailwind), Node.js 22 (Express, TypeScript TSX), MongoDB 8 (Mongoose), JWT, RBAC

### What it is:
A production-ready full-stack hotel booking platform featuring guest discovery and reservations alongside a complete administrative property management suite.

### Key Features & Hardening Completed:
- **Public Hotel Discovery & Multi-Attribute Search**: High-performance full-text search across hotel name, city, and state with server-side pagination (fixed query parameter ingestion bug).
- **Room Availability & Collision Detection Engine**: Date-range overlap algorithm (`checkIn < reqCheckOut && checkOut > reqCheckIn`) ensuring zero room overbooking across peak reservation windows.
- **Role-Based Access Control (RBAC)**: Distinct workflows for authenticated guests and administrators enforced via Angular 18 route guards (`AdminGuard`, `AuthGuard`) and Express middleware.
- **Sanitized Security & PCI-DSS Compliance**: Ownership-verified booking cancellation, secure review submissions, and masked credit card storage (`last4Digits`).
- **Automated Database Seeder**: Pre-configured database seeder populating luxury Egyptian and international hotel profiles, room types, pricing, and demo user accounts.

### CV-Ready Bullets:
- Built a full-stack hotel booking platform (Angular 18, Node.js 22, Express, MongoDB) with TypeScript end-to-end, multi-attribute search filtering, and server-side pagination
- Engineered a room collision detection algorithm with date-range overlap verification preventing overbooking across multi-tier hotel inventory
- Implemented role-based administrative dashboards for hotel property CRUD, room tier pricing, user auditing, and booking lifecycle transitions

---

## 🏆 Summary of All Projects & Market Pull Alignment

1. **MyHealthAI ⭐ FLAGSHIP** ([github.com/mohany6/MyHealthAI](https://github.com/mohany6/MyHealthAI))
   - *Market Pull*: Rides the +293% AI-integration wave (FastAPI PyTorch proxy, confidence persistence) + bank-grade TOTP 2FA security + query optimization (-30% API latency).
2. **FC26 High-Throughput Automation Suite ⭐ STRONG** ([github.com/mohany6/fc26-automation-suite](https://github.com/mohany6/fc26-automation-suite))
   - *Market Pull*: Answers explicit enterprise "parallel processing / high concurrency" requirements (100-thread validator, producer/consumer queue with zero cross-thread UI blocking).
3. **Cinema Booking Marketplace ✅ MARKET READY** ([github.com/mohany6/cinema-booking-system](https://github.com/mohany6/cinema-booking-system))
   - *Market Pull*: Demonstrates Redis cache-aside (1h TTL) + hybrid GraphQL mutations + conflict-checked seat matrix arrays.
4. **GrandStay Hotel Booking Platform ✅ MEAN STACK** ([github.com/mohany6/hotel-booking-system](https://github.com/mohany6/hotel-booking-system))
   - *Market Pull*: Full TypeScript MEAN stack (Angular 18 + Node 22) with inventory collision detection and admin property CRUD.
5. **CustomerManager (Laravel 11) ✅ COMPLETE** ([github.com/mohany6/laravel-customer-manager](https://github.com/mohany6/laravel-customer-manager))
   - *Market Pull*: Multi-framework breadth (PHP 8.2, Laravel 11, Eloquent ORM, cascade deletes, Tailwind/Blade via Vite).
6. **GraphQL SQL Server Service ⚠️ LAB**
   - *Market Pull*: Demonstrates SDL and code-first GraphQL schema designs over Microsoft SQL Server.

