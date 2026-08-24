/**
 * ==============================================================================
 * Mohamed Hany Fathy — Portfolio Projects Data Store
 * ==============================================================================
 * 
 * Sourced directly from PROJECTS_ANALYSIS.md — Verified codebase analysis,
 * engineering metrics, live endpoints, and verified feature screenshots.
 * 
 * Supported Categories:
 * - "Full-Stack"
 * - "AI"
 * - "Desktop Automation"
 * - "Automation"
 * - "Data"
 * - "Labs"
 * ==============================================================================
 */

const PROJECTS_DATA = [
  // ============================================================================
  // 1. MyHealthAI — AI-Powered Telemedicine Platform ⭐ FLAGSHIP
  // ============================================================================
  {
    id: "myhealthai-telemedicine",
    title: "MyHealthAI — AI-Powered Telemedicine Platform",
    shortTitle: "MyHealthAI Telemedicine",
    tagline: "Full-Stack Lung Health Platform with Remote AI Pneumonia Diagnostics & Bank-Grade Security",
    category: "Full-Stack",
    secondaryCategory: "AI",
    featured: true, // Renders as extra-large flagship Hero card
    badge: "Flagship Graduation Project",
    period: "2026",
    stats: [
      { label: "REST Endpoints", value: "85+" },
      { label: "AI Accuracy", value: "95%" },
      { label: "Query Optimization", value: "-30% Latency" },
      { label: "Manual Verification", value: "-70% Reduced" }
    ],
    techStack: [
      "Angular 16",
      "Node.js",
      "Express",
      "MongoDB / Mongoose",
      "FastAPI",
      "Python AI / PyTorch",
      "JWT / TOTP 2FA",
      "Leaflet OSM",
      "PDFKit",
      "Chart.js"
    ],
    summary: "A comprehensive ~73,000-line lung-health telemedicine platform connecting patients with chest specialists. Features remote AI X-ray diagnostics, multi-document doctor onboarding, interactive clinic maps, slot capacity scheduling, and bank-grade session security.",
    highlights: [
      "Integrated a remote Python/FastAPI pneumonia-detection model (95% accuracy) via a secure Node.js proxy layer with confidence-scored predictions and diagnosis history tracking.",
      "Engineered bank-grade security: Speakeasy TOTP & email 2FA, SHA-256 trusted-device fingerprints with 2FA bypass, IP-geolocated session inventory with remote revocation, and immutable audit logs.",
      "Built a 3-role ecosystem (Patient / Doctor / Admin) with document verification workflows, Leaflet + Haversine geolocation, slot-capacity booking wizard, PDFKit receipt generation, and automated minute-interval appointment lifecycle transitions."
    ],
    architecturalDetails: [
      "Dual-layer RBAC: Express guard chains (isAuthenticated, isAdmin, isDoctor) mirrored on the client with Angular route guards across 48 lazy-loaded components.",
      "Database Optimization: Mongoose discriminator inheritance (Doctor ⊂ User), compound indexing, virtuals, and query sanitization yielding a 30% reduction in API response times.",
      "Automated Services: Background scheduler detecting missed appointments with transactional Nodemailer alerts and server-side PDF prescription generation."
    ],
    links: {
      github: "https://github.com/mohany6/MyHealthAI",
      live: "https://myhealthai-demo.vercel.app",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/healthcare-ai.png",
      caption: "MyHealthAI Telemedicine & AI Diagnostic Platform"
    },
    gallery: [
      {
        url: "assets/images/projects/myhealthai/01-home-telemedicine-hero.png",
        caption: "Patient Telemedicine Portal & Health Dashboard",
        category: "Portal"
      },
      {
        url: "assets/images/projects/myhealthai/02-ai-xray-pneumonia-scanner.png",
        caption: "FastAPI Deep-Learning AI Pneumonia X-Ray Classifier",
        category: "AI Engine"
      },
      {
        url: "assets/images/projects/myhealthai/03-ai-prediction-confidence.png",
        caption: "AI Diagnostic Confidence Scoring & Probability Metrics",
        category: "AI Engine"
      },
      {
        url: "assets/images/projects/myhealthai/04-ai-diagnosis-metrics.png",
        caption: "AI Radiology History & Diagnostic Logs",
        category: "AI Engine"
      },
      {
        url: "assets/images/projects/myhealthai/07-leaflet-clinic-map.png",
        caption: "Leaflet OpenStreetMap Geospatial Clinic Discovery",
        category: "Discovery"
      },
      {
        url: "assets/images/projects/myhealthai/12-totp-authenticator-2fa.png",
        caption: "Speakeasy TOTP 2FA Authenticator Workflow",
        category: "Security"
      },
      {
        url: "assets/images/projects/myhealthai/14-bank-grade-security-hub.png",
        caption: "Bank-Grade Security Settings Hub",
        category: "Security"
      },
      {
        url: "assets/images/projects/myhealthai/15-sha256-trusted-devices.png",
        caption: "SHA-256 Trusted Device Hardware Fingerprinting",
        category: "Security"
      },
      {
        url: "assets/images/projects/myhealthai/16-ip-geolocated-sessions.png",
        caption: "IP-Geolocated Session Inventory & Remote Kill Switch",
        category: "Security"
      },
      {
        url: "assets/images/projects/myhealthai/17-doctor-dashboard-workspace.png",
        caption: "Doctor Clinical Workspace & Daily Schedule",
        category: "Doctor Portal"
      },
      {
        url: "assets/images/projects/myhealthai/18-doctor-clinic-slot-manager.png",
        caption: "Clinic Slot Capacity & Schedule Modeling",
        category: "Doctor Portal"
      },
      {
        url: "assets/images/projects/myhealthai/22-admin-oversight-dashboard.png",
        caption: "Administrator System Operations Dashboard",
        category: "Admin"
      },
      {
        url: "assets/images/projects/myhealthai/24-admin-doctor-license-verification.png",
        caption: "Multi-Document Doctor Credential Verification Workflow",
        category: "Admin"
      },
      {
        url: "assets/images/projects/myhealthai/27-booking-wizard-slot-capacity.png",
        caption: "Multi-Step Conflict-Checked Booking Wizard",
        category: "Scheduler"
      }
    ]
  },

  // ============================================================================
  // 2. FC26 Automation Suite ⚡ — High-Throughput Desktop Tool ⭐ STRONG
  // ============================================================================
  {
    id: "fc26-automation-suite",
    title: "FC26 Automation Suite — High-Throughput Desktop Pipeline",
    shortTitle: "FC26 Automation Suite (Desktop)",
    tagline: "Educational Desktop Concurrency Suite with Reverse-Engineered Protocol Pipeline & 100-Thread Proxy Validator",
    category: "Desktop Automation",
    secondaryCategory: "Data",
    featured: false,
    badge: "⭐ Concurrency & Reverse-Engineering",
    period: "2026",
    stats: [
      { label: "Concurrency", value: "100 Threads" },
      { label: "Modular Design", value: "14 Packages" },
      { label: "Scraper Sources", value: "48 Sources" },
      { label: "Status Taxonomy", value: "34 Buckets" }
    ],
    techStack: [
      "Python 3",
      "CustomTkinter",
      "Threading / Queue",
      "ThreadPoolExecutor",
      "Requests",
      "Playwright",
      "JSON Persistence",
      "Win32 ctypes"
    ],
    summary: "Built strictly for educational research to master desktop concurrency, reverse-engineering, and web scraping in the absence of a public EA API. Reverse-engineered undocumented REST endpoints, session cookie flows, and OAuth redirects into a resilient 4-step headless authentication and verification pipeline (~3,800 LOC across 14 modules).",
    highlights: [
      "Reverse-Engineered Protocol Pipeline: Analyzed undocumented REST endpoints, token minting (JWT → Gateway PID → authCode), and UTAS account gateway flows without a public API.",
      "Thread-Safe Producer/Consumer Concurrency: Orchestrated 1–20 background workers via callback-fed queues drained by an 80ms main-thread UI pump — eliminating cross-thread UI contention.",
      "100-Thread Proxy Subsystem & Scraper: Built a 100-thread health validator testing against live endpoints and a 48-source concurrent scraper with 5 parsers (8k deduplicated pool) and dynamic cooldown-aware rotation.",
      "34-Entry Status Taxonomy (ResultClassifier): Engineered a unified single source of truth mapping raw response payloads to 8 real-time KPI counters, sliding-window ETA estimators, regex search tables, and atomic file persistence."
    ],
    architecturalDetails: [
      "4-Step Headless & Hybrid Verification Pipeline: Step 1 (OAuth exchange) → Step 2 (JWT & Gateway PID minting) → Step 3 (Browserless UTAS verification) → Step 4 (Hybrid Playwright market probe).",
      "14-Module Architecture (fut26_ui): Decomposed a 136 KB monolith into 14 cohesive, typed modules (workers, models, status, gather, proxy_modal, main_window, store, etc.) with explicit size budgets and design tokens.",
      "Educational & Legal Notice: Developed strictly as an academic exercise in desktop concurrency, HTTP protocol analysis, and resilient automation design without commercial distribution."
    ],
    links: {
      github: "https://github.com/mohany6/fc26-automation-suite",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/automation-suite.png",
      caption: "Desktop Concurrency Engine & 14-Module Telemetry Dashboard"
    },
    gallery: [
      {
        url: "assets/images/projects/fc26/01-main-dashboard-telemetry.png",
        caption: "Main Concurrency Dashboard with 8 KPI Counters, Sliding-Window ETA, and Accounts Queue",
        category: "Dashboard"
      },
      {
        url: "assets/images/projects/fc26/02-proxy-live-health-tester.png",
        caption: "Proxy Manager & 100-Thread Live Latency Health Validator against accounts.ea.com",
        category: "Proxy Engine"
      },
      {
        url: "assets/images/projects/fc26/03-proxy-auto-gatherer-48-sources.png",
        caption: "Auto-Gatherer Subsystem Deep-Scraping 48 Public Proxy Sources into a Deduped Pool",
        category: "Scraper"
      }
    ]
  },

  // ============================================================================
  // 3. Cinema Booking System — Three-Sided Marketplace ✅ REDESIGNED & LIVE
  // ============================================================================
  {
    id: "cinema-booking-system",
    title: "Cinema Booking System — 3-Sided Marketplace",
    shortTitle: "Cinema Booking Marketplace",
    tagline: "High-Availability Ticket Reservation Platform with Zero-Setup SQLite, Redis Cache-Aside & Hybrid GraphQL",
    category: "Full-Stack",
    secondaryCategory: "Labs",
    featured: false,
    badge: "Full-Stack Marketplace",
    period: "2026",
    stats: [
      { label: "Marketplace Roles", value: "3 Personas" },
      { label: "Database Engine", value: "Auto-Seeded SQLite" },
      { label: "Caching Layer", value: "Redis Cache-Aside" },
      { label: "API Pattern", value: "Hybrid REST + GraphQL" }
    ],
    techStack: [
      "Angular 16",
      "Node.js",
      "Express",
      "SQLite / better-sqlite3",
      "Redis (Graceful Fallback)",
      "express-graphql",
      "JWT / RBAC",
      "SCSS"
    ],
    summary: "A three-sided cinema marketplace catering to Admins, Vendors, and Customers. Features an interactive visual seat-map with server-side atomic inventory locks, auto-seeded SQLite test environment with demo accounts, optional Redis caching, and a modern cinematic UI redesign with 12 verified screenshots.",
    highlights: [
      "Engineered an interactive seat-map grid (available / booked / selected) with server-side conflict-checked seat inventory and live availability calculations across showtimes.",
      "Delivered a zero-setup test environment migrating from MongoDB to auto-seeded SQLite (better-sqlite3) with 5 movies, 3 halls, 105 showtimes, and ready-to-use demo accounts.",
      "Implemented a Redis cache-aside catalog layer with 1-hour TTL and write-through invalidation that gracefully degrades when Redis is not running.",
      "Built a hybrid REST + GraphQL architecture with fixed JWT execution context for authenticated mutations and persona-driven Angular layouts."
    ],
    architecturalDetails: [
      "Zero-Setup Test Pipeline: SQLite database (database.sqlite) is auto-created and populated with complete demo data on server startup — eliminating all external database prerequisites.",
      "Fixed GraphQL Context Bug: Converted express-graphql static context to function form, enabling requireVendor middleware to correctly receive request headers and verify JWT tokens.",
      "Marketplace-Modern UI: Curved ambient screen indicator, sticky booking summary panel, and full administrative vendor CRUD dashboards."
    ],
    links: {
      github: "https://github.com/mohany6/cinema-booking-system",
      live: "https://cinema-booking-demo.vercel.app",
      demoVideo: ""
    },
    image: {
      banner: "screenshots/cinema-booking-system/1-home.png",
      caption: "VOX Cinemas — Premier 3-Role Booking Marketplace"
    },
    gallery: [
      {
        url: "screenshots/cinema-booking-system/1-home.png",
        caption: "Home Showcase — Luxury Hero Banner & Now Premiering Lineup",
        category: "Portal"
      },
      {
        url: "screenshots/cinema-booking-system/2-movies.png",
        caption: "Movie Catalogue — High-Resolution Poster Grid & Showtimes Browser",
        category: "Catalogue"
      },
      {
        url: "screenshots/cinema-booking-system/5-showtimes.png",
        caption: "Showtimes Engine — Date Selection Strip & Dolby Atmos Schedules",
        category: "Showtimes"
      },
      {
        url: "screenshots/cinema-booking-system/6-seat-selection.png",
        caption: "Auditorium Seat Map — Curved Screen Glow & Live Seat Selection",
        category: "Seat Engine"
      },
      {
        url: "screenshots/cinema-booking-system/7-booking-confirmed.png",
        caption: "Instant Confirmation — Booking Success Notification & Flow",
        category: "Booking"
      },
      {
        url: "screenshots/cinema-booking-system/8-profile.png",
        caption: "VIP Member Profile — Platinum Tier Status & Security Hub",
        category: "Profile"
      },
      {
        url: "screenshots/cinema-booking-system/3-login.png",
        caption: "Customer & VIP Authentication — Frosted Glass Login Portal",
        category: "Security"
      },
      {
        url: "screenshots/cinema-booking-system/4-register.png",
        caption: "VIP Registration — Account Creation with Password Visibility Toggle",
        category: "Security"
      },
      {
        url: "screenshots/cinema-booking-system/9-vendor-panel.png",
        caption: "Vendor Control Center — Movie Catalogue & Cinema Hall Overview",
        category: "Vendor Portal"
      },
      {
        url: "screenshots/cinema-booking-system/10-vendor-create-movie.png",
        caption: "Vendor Movie Publisher — Showtime Scheduler & Hall Assignment",
        category: "Vendor Portal"
      },
      {
        url: "screenshots/cinema-booking-system/11-vendor-create-hall.png",
        caption: "Vendor Hall Creator — Auditorium Capacity & Seat Grid Setup",
        category: "Vendor Portal"
      },
      {
        url: "screenshots/cinema-booking-system/12-admin-vendors.png",
        caption: "Superadmin Control Center — Cinema Vendor Partner CRUD Operations",
        category: "Admin"
      }
    ]
  },

  // ============================================================================
  // 4. GrandStay — Enterprise Hotel Booking (MEAN Stack) ✅ PRODUCTION-GRADE
  // ============================================================================
  {
    id: "grandstay-hotel-booking",
    title: "GrandStay — Enterprise Hotel Reservation Platform",
    shortTitle: "GrandStay Hotel Booking (MEAN)",
    tagline: "Full-Stack Hospitality Platform with Dual Persistence, Overbooking Collision Prevention & 22 Jest Tests",
    category: "Full-Stack",
    secondaryCategory: "Labs",
    featured: false,
    badge: "Angular 18 & Node.js",
    period: "2026",
    stats: [
      { label: "Frontend", value: "Angular 18 SPA" },
      { label: "Backend", value: "Node.js 22 + TS" },
      { label: "Integration Tests", value: "22 Jest Tests" },
      { label: "CI / CD", value: "GitHub Actions" }
    ],
    techStack: [
      "Angular 18",
      "TypeScript",
      "Node.js 22",
      "Express",
      "MongoDB / Mongoose",
      "Embedded JSON Engine",
      "Tailwind CSS",
      "JWT / RBAC",
      "Jest + Supertest",
      "Docker Compose",
      "GitHub Actions"
    ],
    summary: "A production-grade full-stack hotel booking platform featuring guest discovery and reservations alongside a complete administrative property management suite. Hardened through a security audit that resolved 6 real vulnerabilities and backed by a 22-test integration suite, multi-stage Dockerfiles, and GitHub Actions CI.",
    highlights: [
      "Engineered mathematical room collision detection via date-range overlap queries (checkIn < reqCheckOut && checkOut > reqCheckIn) that prevents overbooking and auto-frees capacity on cancellation.",
      "Architected dual persistence behind a single unified REST contract: zero-dependency embedded JSON engine for immediate testing ⇄ MongoDB/Atlas mode via single DB_URI flag.",
      "Hardened security lifecycle: fixed privilege escalation, rate-limited auth endpoints, sanitized card tokenization with CVV never persisted, and resolved 6 CVEs with regression tests.",
      "Constructed full testing & CI pipeline with 22 Jest/Supertest tests, multi-stage Docker builds (nginx + Node), and automated GitHub Actions verification."
    ],
    architecturalDetails: [
      "Dual Persistence Architecture: Single codebase effortlessly switches between zero-dependency embedded engine and MongoDB Atlas without altering API contracts or Angular service interfaces.",
      "Full Test Coverage: 22 integration tests covering privilege-escalation prevention, overbooking capacity boundaries, admin role security, and ownership validation.",
      "Angular 18 Modern Patterns: Standalone components, functional route guards, functional HTTP interceptors, and RxJS reactive streams."
    ],
    links: {
      github: "https://github.com/mohany6/hotel-booking-system",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "screenshots/grandstay/01-home-hero.png",
      caption: "GrandStay Hotel Booking — Enterprise MEAN Platform"
    },
    gallery: [
      {
        url: "screenshots/grandstay/01-home-hero.png",
        caption: "GrandStay Hero Portal — Luxury Hotel Discovery & Booking Search",
        category: "Discovery"
      },
      {
        url: "screenshots/grandstay/04-search-pagination-page2.png",
        caption: "Multi-Attribute Hotel Search — Paginated Results with Ratings & Amenities",
        category: "Search Engine"
      },
      {
        url: "screenshots/grandstay/05-booking-payment-form.png",
        caption: "Collision-Checked Reservation Form — Guest Details & Card Masking",
        category: "Reservation"
      },
      {
        url: "screenshots/grandstay/03-guest-profile-bookings.png",
        caption: "Guest Dashboard — Active Booking Cards & Reservation History",
        category: "Guest Portal"
      },
      {
        url: "screenshots/grandstay/02-login-portal.png",
        caption: "Secure Authentication — Role-Based Guest & Admin Access",
        category: "Security"
      },
      {
        url: "screenshots/grandstay/06-admin-dashboard.png",
        caption: "Admin Control Center — Hotel Property Management & Room Inventory",
        category: "Admin"
      },
      {
        url: "screenshots/grandstay/07-live-api-health.png",
        caption: "Backend Telemetry — Live REST API Health & Microservice Diagnostics",
        category: "API Engine"
      }
    ]
  },

  // ============================================================================
  // 5. CustomerManager (Laravel 11) ✅ REDESIGNED & VERIFIED LIVE
  // ============================================================================
  {
    id: "laravel-customer-manager",
    title: "CustomerManager — Laravel 11 CRUD Application",
    shortTitle: "CustomerManager (Laravel 11)",
    tagline: "Relational Resource Management System with Eloquent Cascade Deletes, Eager Aggregates & SaaS Dashboard",
    category: "Full-Stack",
    secondaryCategory: "Labs",
    featured: false,
    badge: "PHP & Laravel 11",
    period: "2026",
    stats: [
      { label: "Framework", value: "Laravel 11 (PHP 8.2)" },
      { label: "REST Routes", value: "14 Resource Routes" },
      { label: "Query Speed", value: "withCount (Zero N+1)" },
      { label: "UI Pipeline", value: "Tailwind 3 + Vite 5" }
    ],
    techStack: [
      "PHP 8.2",
      "Laravel 11.34",
      "Eloquent ORM",
      "Blade Templates",
      "Tailwind CSS 3",
      "Vite 5",
      "SQLite / MySQL",
      "Form Validation"
    ],
    summary: "A relational Customer & Order management platform engineered on Laravel 11 and PHP 8.2. Features 14 RESTful resource routes, Eloquent one-to-many relationships with foreign-key cascade deletes, withCount eager aggregate loading, server-side validation with self-exclusion rules, and a redesigned SaaS analytics dashboard verified live with 5 screenshots.",
    highlights: [
      "Built complete 14 RESTful resource controllers for Customers and Orders with strict server-side validation (unique phone formats with update self-exclusion, foreign-key existence).",
      "Engineered Eloquent one-to-many relationships with foreign-key cascade deletion at migration level and withCount eager aggregates to eliminate N+1 queries.",
      "Delivered a modern responsive Tailwind CSS SaaS UI compiled via Vite with metric KPI cards, client-side live search filters, initials avatar generators, and session flash alerts.",
      "Verified end-to-end on a live server (fresh migration/seed → Vite production build → HTTP 200 on all 5 key routes) with complete screenshot documentation."
    ],
    architecturalDetails: [
      "Clean MVC architecture following Laravel 11 streamlined directory layout, implicit route-model binding, and route resource definitions.",
      "Seeded database factories generating realistic customer portfolios and order histories with formatted reference codes.",
      "Reusable Blade partials for form validation error displays and auto-dismissing toast notifications."
    ],
    links: {
      github: "https://github.com/mohany6/laravel-customer-manager",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "screenshots/customer-manager/customers.png",
      caption: "Laravel 11 Resource Management Dashboard"
    },
    gallery: [
      {
        url: "screenshots/customer-manager/customers.png",
        caption: "Customers Dashboard — KPI Cards & Filterable Contact Registry",
        category: "Dashboard"
      },
      {
        url: "screenshots/customer-manager/customer-show.png",
        caption: "Customer Profile — Lifetime Value, Overview Grid & Order History",
        category: "Profile"
      },
      {
        url: "screenshots/customer-manager/customer-create.png",
        caption: "New Customer Form — Responsive Layout & Validated Contact Capture",
        category: "Create"
      },
      {
        url: "screenshots/customer-manager/orders.png",
        caption: "Orders Dashboard — Revenue Metrics & Live Searchable Order Registry",
        category: "Dashboard"
      },
      {
        url: "screenshots/customer-manager/order-create.png",
        caption: "New Order Form — Customer Selector & Suggested Code Generation",
        category: "Create"
      }
    ]
  },

  // ============================================================================
  // 6. GraphQL Books API — Production-Grade Backend ✅ UPGRADED
  // ============================================================================
  {
    id: "graphql-books-api",
    title: "GraphQL Books API — Production-Grade Backend",
    shortTitle: "GraphQL Books API",
    tagline: "Strict-TypeScript GraphQL Yoga Server with JWT/RBAC, Relay Cursor Pagination, DataLoader N+1 Fix & Layered Security",
    category: "Labs",
    secondaryCategory: "Full-Stack",
    featured: false,
    badge: "Production-Grade Backend",
    period: "2026",
    stats: [
      { label: "GraphQL Types", value: "16" },
      { label: "Mutations", value: "16" },
      { label: "Security Layers", value: "5+" },
      { label: "Integration Tests", value: "30+" }
    ],
    techStack: [
      "TypeScript (strict)",
      "GraphQL Yoga v5",
      "GraphQL 16",
      "Node.js 22",
      "MS SQL Server",
      "JWT / bcrypt / RBAC",
      "DataLoader",
      "graphql-depth-limit",
      "rate-limiter-flexible",
      "Jest + Supertest",
      "Docker Compose",
      "GitHub Actions"
    ],
    summary: "A production-grade GraphQL API for a book store (authors, categories, reviews, users) rewritten from a legacy express-graphql demo into strict TypeScript on GraphQL Yoga v5. Features JWT authentication with role-based access control, Relay-spec cursor pagination, DataLoader-based N+1 elimination, real-time subscriptions, layered security hardening, 30+ integration tests, and Docker/CI.",
    highlights: [
      "Migrated from deprecated express-graphql to GraphQL Yoga v5 + GraphQL 16 in strict TypeScript with complete JWT signup/login, MEMBER/ADMIN RBAC, and granular review ownership enforcement.",
      "Engineered Relay-spec cursor pagination with keyset SQL queries supporting forward (first/after) and backward (last/before) traversal, 5 sort modes, 4 filters, and totalCount.",
      "Eliminated N+1 query bottlenecks with 7 per-request DataLoaders that batch authors, categories, reviews, users, and books into single STRING_SPLIT SQL queries.",
      "Hardened the API with query depth limiting (max 10), complexity budgeting (120), per-IP rate limiting, domain error code masking, production-gated introspection, and parameterized SQL.",
      "Authored 30+ scenario integration test suite (Jest + Supertest) running in CI via multi-stage Docker and GitHub Actions against a containerized MS SQL Server."
    ],
    architecturalDetails: [
      "Layered Request Architecture: Express (Helmet, rate limit) → Yoga context (JWT verify + DataLoaders) → validation rules (depth/complexity/introspection gate) → resolvers → service authorization → parameterized SQL repositories.",
      "Real-time Subscriptions: In-memory PubSub broadcasting bookAdded, bookUpdated, and reviewAdded event streams with filtered per-book channels.",
      "Relational Schema on MS SQL: Users, Authors, Categories, Books, Reviews with foreign keys, indexes, CHECK constraints, UNIQUE(book,user), and cascade deletions."
    ],
    links: {
      github: "https://github.com/mohany6/graphql-server",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/graphql-api.svg",
      caption: "GraphQL Books API — Schema, Pagination & Security"
    }
  },

  // ============================================================================
  // 7. Headless Login Automation & MFA Pipeline
  // ============================================================================
  {
    id: "login-automation-playwright",
    title: "Headless Login Automation & MFA Pipeline",
    shortTitle: "Login Automation Pipeline",
    tagline: "Resilient Multi-Worker Authentication Engine with Session Persistence & Failure Telemetry",
    category: "Automation",
    secondaryCategory: "Data",
    featured: false,
    badge: "Automation Engineering",
    period: "2026",
    stats: [
      { label: "Driver Engine", value: "Playwright" },
      { label: "Parallelism", value: "Multiprocessing" },
      { label: "Auth Flows", value: "OAuth / MFA" },
      { label: "Telemetry", value: "JSON & Screenshots" }
    ],
    techStack: [
      "Python 3",
      "Playwright",
      "Multiprocessing",
      "OAuth 2.0 / MFA",
      "JSON Logging"
    ],
    summary: "An automated OAuth and MFA authentication pipeline running parallel headless browser workers with persistent session state, automated challenge resolution, and diagnostic failure dumps.",
    highlights: [
      "Automated complex OAuth and MFA authentication sequences across diverse identity providers with intelligent step retries and exponential backoff.",
      "Engineered cookie and session storage caching to eliminate redundant logins and bypass recurring bot-detection challenges.",
      "Configured automated diagnostic reporting: captures structured JSON event logs and timestamped failure screenshots upon any execution anomaly."
    ],
    architecturalDetails: [
      "Multiprocessing worker pool with independent browser contexts preventing cross-session pollution.",
      "Headless / Headful toggle with proxy integration for geolocated authentication validation."
    ],
    links: {
      github: "https://github.com/mohany6/login-automation",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/login-automation.svg",
      caption: "Playwright Worker Pool & MFA Challenge Resolution"
    }
  },

  // ============================================================================
  // 8. Market Monitor & Real-Time Alerting Pipeline
  // ============================================================================
  {
    id: "market-monitor-scraper",
    title: "Market Monitor & Real-Time Alerting Pipeline",
    shortTitle: "Market Monitor & Scraper",
    tagline: "Asynchronous Data Ingestion Engine with Activity Scoring & Tiered Webhook Notifications",
    category: "Data",
    secondaryCategory: "Automation",
    featured: false,
    badge: "Data & Alerting",
    period: "2026",
    stats: [
      { label: "Data Pipeline", value: "HTML & JSON" },
      { label: "Scoring Engine", value: "Activity Index" },
      { label: "Notifications", value: "Discord Webhooks" },
      { label: "Analytics", value: "Daily Summaries" }
    ],
    techStack: [
      "Python 3",
      "Requests",
      "BeautifulSoup4",
      "Discord Webhooks",
      "JSON Analytics"
    ],
    summary: "A continuous sales and listing monitoring pipeline that parses multi-source web targets, computes algorithmic activity scores, and dispatches rich real-time alerts.",
    highlights: [
      "Built resilient HTTP scrapers handling dynamic HTML and nested JSON endpoints with custom user-agent and header cycling.",
      "Developed a real-time activity scoring algorithm to detect anomalous inventory shifts and trigger tiered priority alerts.",
      "Integrated formatted Discord Webhooks for instantaneous notifications alongside rolling daily JSON analytics summaries."
    ],
    architecturalDetails: [
      "Stateless parser modules supporting plug-and-play addition of new target web platforms.",
      "Local lightweight persistence ensuring zero duplicate alert dispatches across continuous polling intervals."
    ],
    links: {
      github: "https://github.com/mohany6/market-monitor",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/market-monitor.svg",
      caption: "Data Ingestion & Discord Alerting Pipeline"
    }
  }
];
