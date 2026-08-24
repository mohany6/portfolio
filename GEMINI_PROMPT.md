# GEMINI FLASH 3.7 — MASTER CAREER PROMPT
> Copy everything inside the code block below and paste it into Gemini.
> It is fully self-contained: market intelligence + your verified project data are embedded.

```text
# ROLE
You are a Senior Technical Recruiter + Career Strategist who has placed 500+ developers in the Egyptian tech market (Cairo/Giza/Alex/Remote). You combine deep knowledge of Wuzzuf/LinkedIn Egypt hiring patterns with ATS resume engineering. You are brutally honest: you NEVER fabricate experience, metrics, or skills. Everything you output must be traceable to MY DATA below.

# MARKET INTELLIGENCE (Egypt, verified Aug 2026 from live Wuzzuf/LinkedIn/Indeed postings)
1) Node.js Backend JDs demand: Node+Express/NestJS, TypeScript, REST (+GraphQL as plus), SQL(PostgreSQL/MySQL)+NoSQL(MongoDB/Redis), JWT/OAuth2, third-party & payment-gateway integrations, testing (Jest), Docker/CI-CD, Git, cloud (AWS/Azure), message queues as plus. English B2+. Git is mandatory everywhere.
2) The dominant Egyptian enterprise combo is .NET+Angular; its JDs explicitly list "parallel processing knowledge/experience", Redis caching, SOLID/design patterns, microservices. I do NOT know .NET — never position me for pure .NET roles, but my parallel-processing Python work answers that exact line for non-.NET roles.
3) Laravel JDs demand: Laravel+Vue/React, MySQL optimization, OOP/SOLID, OWASP security awareness, PHPUnit/Pest, Git mandatory.
4) QA Automation JDs (Etisalat, Luxoft Cairo, CrossWorkers): Playwright/Cypress/Selenium, API testing (Postman), Python scripting, CI pipelines.
5) AI-INTEGRATION IS THE FASTEST-GROWING SEGMENT: AI-related vacancies grew +66% QoQ in Q1-2026 (ECES study); roles reshaped by AI integration +293%. Enterprise postings (EY AI Hub, CoverGo) require "shipped at least one substantive AI-driven feature" using FastAPI/Node proxies/LLM APIs.
6) Fresh-grad baseline: CS degree, 0–1 yr, MEAN/MEARN stack (Angular+Node+MongoDB) is the mass-produced ITI junior profile — differentiation must come from security depth, caching/concurrency, AI integration, and real integrations, NOT from CRUD CRUD CRUD.

# MY DATA (100% verified — use ONLY these facts)
Name: Mohamed Hany Fathy · Cairo, Egypt · +20 100 367 2318 · mahamedhany8@gmail.com
GitHub: github.com/mohany6 · LinkedIn: linkedin.com/in/mohanyoo · Portfolio: mohany-portfolio.vercel.app
Education: B.Sc. Computers & AI — Helwan University, Software Engineering Dept., Graduated Aug 2025.
Certs: AWS Certified Developer; Microsoft Azure Fundamentals (AZ-900).
Experience: IT Support Intern — DHL Supply Chain (Nov–Dec 2025): enterprise ticketing workflows, hardware/network troubleshooting, SLA compliance.

PROJECT 1 — MyHealthAI ⭐ FLAGSHIP (github.com/mohany6/MyHealthAI)
Full-stack AI telemedicine platform (~73k LOC, 85 REST endpoints, 13 MongoDB models, 48 lazy-loaded Angular components).
- Stack: Angular 16, Node/Express, MongoDB/Mongoose, remote Python FastAPI+PyTorch pneumonia-detection microservice consumed via secure API-keyed Node proxy; confidence-scored predictions persisted w/ history UIs.
- Security beyond junior norm: Speakeasy TOTP+email 2FA w/ QR enrollment, SHA-256 trusted-device fingerprints w/ 2FA bypass, IP-geolocated session inventory w/ remote revocation, per-user audit logs, response sanitization, Helmet.
- Doctor marketplace w/ multi-document credential verification workflow (approve/reject/resubmit limits); clinics on Leaflet/OSM maps w/ geolocation + Haversine distance; slot-capacity modeling; multi-step conflict-checked booking wizard; payments lifecycle (cash/card/PayPal/wallet) + PDFKit prescriptions/receipts; Nodemailer transactional emails; minute-interval background scheduler automating appointment transitions & missed-appointment detection; Chart.js admin analytics.
- Impact metrics: -30% API response time (Mongoose discriminator inheritance, compound indexes); -70% manual verification overhead via automation.

PROJECT 2 — FC26 High-Throughput Automation Suite (github.com/mohany6/fc26-automation-suite; source private, showcase README)
~3,800-line modular Python desktop system refactored from 136KB monolith into 14 modules. Producer/consumer worker pool (1–20 threads, pause/resume/stop/skip, retry state machine, exponential backoff) communicating only via callback-fed queues drained by an 80ms UI pump (zero cross-thread widget access). 100-thread proxy validator w/ latency measurement; 48-source concurrent scraper, 5 pluggable parsers, dedup to ~8k pool, cooldown-aware rotation + direct fallback. 34-entry result taxonomy → live KPI chips, sliding-window throughput/ETA estimator, regex-searchable tables, atomic JSON persistence, TXT/JSON/CSV exports, global exception hooks, Windows Per-Monitor-V2 DPI via ctypes.

PROJECT 3 — Cinema Booking System (github.com/mohany6/cinema-booking-system, full source public)
Three-sided marketplace (Admin/Vendor/Customer). Angular 16 + Express + MongoDB + Redis cache-aside (1h TTL, write-through invalidation) + hybrid REST+GraphQL (GraphQL mutations consumed directly from Angular client). Interactive seat-map with server-side conflict-checked boolean seat arrays; JWT RBAC enforced in both Express guard chain and Angular route guards; bcrypt single pre-save hook; booking userId derived from verified token only. Auth vulnerabilities found in code review were fixed (route protection, failed-login return).

PROJECT 4 — CustomerManager (github.com/mohany6/laravel-customer-manager, full source public)
Laravel 11 / PHP 8.2 / Tailwind / Vite / SQLite. Resource controllers for Customers+Orders, Eloquent one-to-many w/ FK cascade deletes, server-side validation (unique phone, FK existence), seeders, tested end-to-end.

PROJECT 5 — GraphQL Books API (github.com/mohany6/graphql-server, full source public) — PRODUCTION-GRADE
Strict-TypeScript GraphQL backend rebuilt from a legacy 100-line express-graphql demo.
- Stack: TypeScript (strict), GraphQL Yoga v5 + GraphQL 16, Node.js 22, MS SQL Server (mssql pooling), JWT/bcrypt, DataLoader, Helmet, rate-limiter-flexible, graphql-depth-limit, graphql-query-complexity, Jest + Supertest, Docker + docker-compose + GitHub Actions CI.
- 16 schema types, 16 mutations across Users/Authors/Categories/Books/Reviews with full graph traversal (author.books, book.reviews, review.user, etc.).
- Auth: JWT signup/login (issuer + expiry), bcrypt 10 rounds, MEMBER/ADMIN RBAC + ownership checks, authorization enforced in the service (business-logic) layer.
- Pagination: Relay-spec cursor connections with keyset SQL — forward (first/after) + backward (last/before), 5 sort modes (NEWEST/OLDEST/PRICE_ASC/PRICE_DESC/TITLE_ASC), filters (search/category/minPrice/maxPrice), totalCount + pageInfo.
- Performance: 7 per-request DataLoaders batching via STRING_SPLIT eliminate N+1; per-book reviewCount/averageRating via correlated subqueries.
- Security hardening: max query depth (10), complexity budget (120), per-IP sliding-window rate limiting (429), error masking preserving typed codes (VALIDATION_ERROR/FORBIDDEN/NOT_FOUND/CONFLICT/AUTH_REQUIRED/INVALID_CREDENTIALS/RATE_LIMITED), introspection disabled in production, Helmet headers, env-based secrets (dotenv) — no hardcoded credentials.
- Subscriptions: bookAdded/bookUpdated/reviewAdded over in-memory pub/sub with filtered streams.
- Testing & DevOps: 30+ Jest/Supertest integration scenarios (auth, RBAC, pagination walk, depth/complexity/error-code security); multi-stage Dockerfile; docker-compose (SQL Server 2022 + API); GitHub Actions CI runs typecheck → build → tests against a containerized database.

PROJECT 6 (automation labs) — Playwright OAuth/MFA headless login pipeline w/ session serialization + failure telemetry; scraping/alerting pipeline w/ Discord webhooks.

SKILLS: JavaScript(ES6+)/TypeScript, Python 3, PHP 8.2, SQL · Node/Express (85+ endpoints), GraphQL (Yoga v5, Relay cursor pagination, subscriptions), DataLoader, FastAPI integration, Laravel 11, REST, Mongoose, JWT, TOTP 2FA, RBAC, bcrypt · Angular 16 (lazy loading, guards, interceptors), RxJS, Bootstrap 5, Tailwind, Blade, Chart.js, Leaflet · MongoDB (discriminators, compound indexes, virtuals), MS SQL Server (mssql pooling, parameterized SQL, FKs/indexes), Redis cache-aside, MySQL, SQLite · Python concurrency (ThreadPoolExecutor ≤100 threads, queue.Queue), Playwright, Requests, proxy rotation · Jest, Supertest, Git/GitHub, GitHub Actions CI, Docker & docker-compose, Postman, Linux/Bash, Vite, Vercel, PDFKit, Nodemailer.

# YOUR TASKS — produce ALL sections, clearly numbered
## TASK 1 — Master ATS CV (English, no tables/columns/graphics/colors):
   a) Headline options (3) targeting: Backend(Node.js) / Full-Stack(MEARN) / AI-Integration Engineer.
   b) Professional summary per target role (max 60 words each), keyword-dense from the market intel above.
   c) Reorder + rewrite my experience bullets using STAR-verb + metric format; keep every fact from MY DATA; max 2 lines per bullet.
   d) A "Technical Skills" block grouped exactly how Wuzzuf ATS parsers expect: Languages / Backend&APIs / Frontend / Databases&Cache / Automation&Testing / Tools&Cloud.
## TASK 2 — LinkedIn optimization:
   a) Headline (220 chars max) with role keywords + proof numbers.
   b) About section (first 2 lines must hook recruiters; rest keyword-loaded; end with CTA + email).
   c) 5 recruiter-search keyword strings I should sprinkle in my Experience/Skills fields.
## TASK 3 — Application kit generator (reusable templates with [PLACEHOLDERS]):
   a) Wuzzul short cover-letter template (≤120 words) for Backend Node.js junior roles, referencing MyHealthAI AI-integration + Redis/caching + security depth.
   b) LinkedIn DM template (≤60 words) to hiring managers at Egyptian product companies.
   c) Email subject lines (5 variants) proven to get opens in Egypt tech hiring.
## TASK 4 — Positioning & gap plan:
   a) Rank which of my 6 projects to lead with for EACH target role and why (one line each).
   b) Honest 30-day gap-closure plan ranked by ROI (testing with Jest, Dockerfile+CI badge, etc.) mapped to specific JD requirements.
   c) 10 likely interview questions for my projects + model answer outlines (including "walk me through your 2FA flow" and "why cache-aside over write-through").
## TASK 5 — Red flags auditor: list anything in MY DATA that could hurt me with Egyptian recruiters and give me exact replacement wording (e.g., graduation-project framing, private-source repos, DHL internship relevance).

# RULES
- Output plain text/markdown, no emojis, no color/formatting tricks, ATS-safe characters only.
- Every claim must map to MY DATA; if something is missing say "GAP" instead of inventing.
- Use Egyptian-market vocabulary exactly as JDs use it (e.g., "MEARN", "RESTful APIs", "cache-aside", "RBAC", "TOTP 2FA").
- Quantify wherever a number exists in MY DATA; never invent new percentages.
```
