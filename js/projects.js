/**
 * ==============================================================================
 * Mohamed Hany Fathy — Portfolio Projects Data Store
 * ==============================================================================
 * 
 * INSTRUCTIONS FOR ADDING / EDITING PROJECTS:
 * To add a new project, simply copy one of the commented template objects at 
 * the bottom of the `PROJECTS_DATA` array, uncomment it, fill in your details,
 * and save this file. The portfolio will automatically re-render the project cards, 
 * filter tags, tech badges, and modal deep-dive views!
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
  {
    id: "myhealthai-telemedicine",
    title: "MyHealthAI — AI-Powered Telemedicine Platform",
    shortTitle: "MyHealthAI Telemedicine",
    tagline: "Full-Stack Lung Health Platform with Remote AI Pneumonia Diagnostics & Bank-Grade Security",
    category: "Full-Stack",
    secondaryCategory: "AI",
    featured: true, // Renders as extra-large flagship Hero card
    badge: "⭐ Flagship Graduation Project",
    period: "2024 – 2025",
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
      "Python AI",
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

  {
    id: "fc26-automation-suite",
    title: "High-Throughput Automation & Monitoring Suite",
    shortTitle: "Automation & Monitoring Suite",
    tagline: "Modular Multi-Threaded Python Engine with 100-Thread Proxy Validator & Live KPI Telemetry",
    category: "Desktop Automation",
    secondaryCategory: "Data",
    featured: false,
    badge: "⭐ Production-Tested Concurrency",
    period: "2024",
    stats: [
      { label: "Concurrent Threads", value: "100" },
      { label: "Codebase Scale", value: "~3,800 LOC" },
      { label: "Scraper Sources", value: "48 Concurrent" },
      { label: "Status Taxonomy", value: "34 Buckets" }
    ],
    techStack: [
      "Python 3",
      "CustomTkinter",
      "Threading / Queue",
      "ThreadPoolExecutor",
      "Requests",
      "JSON Persistence",
      "Win32 ctypes"
    ],
    summary: "A production-tested Windows desktop concurrency system (~3,800 LOC) refactored from a single-file monolith into 14 cohesive modules. Implements an airtight producer/consumer pipeline with live O(1) telemetry and sliding-window ETA estimators.",
    highlights: [
      "Designed a thread-safe producer/consumer architecture with 1–20 parallel workers; workers communicate exclusively through callback-fed queues drained by an 80ms UI pump — zero cross-thread widget access.",
      "Built a 100-thread proxy validator against live OAuth endpoints with latency measurement, alongside a 48-source concurrent scraper with 5 pluggable parsers and automatic rotation.",
      "Implemented a stateless ResultClassifier mapping raw pipeline outputs into a 34-entry status taxonomy, driving live KPI chips, regex-searchable tables, sliding-window ETA estimators, and atomic JSON/CSV exports."
    ],
    architecturalDetails: [
      "Clean UI Bridge: Decoupled UI and background thread pools using threading.Events for pause, resume, stop, and skip-in-flight operations.",
      "Resilient Error Handling: Global exception hooks across main and thread workers transforming unhandled crashes into classified, retryable task results.",
      "Data Integrity: Atomic JSON file persistence for settings, historical run states, and multi-format exports (TXT, JSON, CSV)."
    ],
    links: {
      github: "https://github.com/mohany6/automation-suite", // Replace with your repository URL
      live: "",                                             // Leave empty if desktop-only
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/automation-suite.png",
      caption: "Desktop Concurrency Engine & Telemetry Dashboard"
    }
  },

  {
    id: "cinema-booking-system",
    title: "Cinema Booking System — 3-Sided Marketplace",
    shortTitle: "Cinema Booking Marketplace",
    tagline: "High-Availability Ticket Reservation Platform with Redis Cache-Aside & Hybrid GraphQL",
    category: "Full-Stack",
    secondaryCategory: "Labs",
    featured: false,
    badge: "Full-Stack Marketplace",
    period: "2024",
    stats: [
      { label: "Marketplace Roles", value: "3 Personas" },
      { label: "Caching Layer", value: "Redis Cache-Aside" },
      { label: "API Pattern", value: "Hybrid REST + GraphQL" },
      { label: "Seat Engine", value: "Zero-Conflict Arrays" }
    ],
    techStack: [
      "Angular 16",
      "Node.js",
      "Express",
      "MongoDB / Mongoose",
      "Redis",
      "express-graphql",
      "JWT / RBAC",
      "SCSS"
    ],
    summary: "A three-sided cinema marketplace catering to Admins, Vendors, and Customers. Features an interactive visual seat-map with server-side atomic inventory locks and a Redis-backed movie catalog.",
    highlights: [
      "Engineered an interactive seat-map grid (available / booked / selected) with server-side conflict-checked seat inventory and live availability calculations across showtimes.",
      "Implemented a Redis cache-aside catalog layer with 1-hour TTL and write-through invalidation to serve high-volume movie listings with minimal database load.",
      "Delivered a hybrid REST + GraphQL architecture where hall creation and deep catalog mutations are consumed directly via GraphQL from the Angular client."
    ],
    architecturalDetails: [
      "Persona-driven Angular layout modules with lazy loading and route guard protection matching backend middleware.",
      "Vendor cinema management allowing creation of custom hall layouts, dynamic showtime scheduling, and capacity calculations.",
      "Comprehensive admin oversight dashboard for vendor onboarding and dispute resolution."
    ],
    links: {
      github: "https://github.com/mohany6/cinema-booking-system", // Replace with your repository URL
      live: "https://cinema-booking-demo.vercel.app",             // Replace with your live demo URL
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/cinema-booking.svg",
      caption: "Seat Map Selector & 3-Role Cinema Portal"
    }
  },

  {
    id: "login-automation-playwright",
    title: "Headless Login Automation & MFA Pipeline",
    shortTitle: "Login Automation Pipeline",
    tagline: "Resilient Multi-Worker Authentication Engine with Session Persistence & Failure Telemetry",
    category: "Automation",
    secondaryCategory: "Data",
    featured: false,
    badge: "Automation Engineering",
    period: "2024",
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

  {
    id: "market-monitor-scraper",
    title: "Market Monitor & Real-Time Alerting Pipeline",
    shortTitle: "Market Monitor & Scraper",
    tagline: "Asynchronous Data Ingestion Engine with Activity Scoring & Tiered Webhook Notifications",
    category: "Data",
    secondaryCategory: "Automation",
    featured: false,
    badge: "Data & Alerting",
    period: "2024",
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
  },

  {
    id: "graphql-sqlserver-api",
    title: "GraphQL SQL Server Enterprise Service",
    shortTitle: "GraphQL SQL Server API",
    tagline: "High-Performance Data Layer Implementing SDL & Code-First Schemas over MS SQL Server",
    category: "Labs",
    secondaryCategory: "Full-Stack",
    featured: false,
    badge: "Backend Lab",
    period: "2024",
    stats: [
      { label: "Schema Styles", value: "SDL + Code-First" },
      { label: "Database", value: "MS SQL Server" },
      { label: "Query Safety", value: "Parameterized" },
      { label: "Pool Engine", value: "Connection Pooling" }
    ],
    techStack: [
      "Node.js",
      "express-graphql",
      "MS SQL Server (mssql)",
      "GraphQL SDL",
      "JavaScript ES6+"
    ],
    summary: "A backend service demonstrating complete CRUD queries and mutations over Microsoft SQL Server using both Schema Definition Language (SDL) and code-first programmatic schema definitions.",
    highlights: [
      "Implemented full CRUD GraphQL queries and mutations interfacing with Microsoft SQL Server using optimized connection pools.",
      "Constructed parallel schema architectures: compared declarative SDL (buildSchema) against programmatic GraphQLObjectType definitions.",
      "Enforced parameterized queries across all database resolvers to guarantee safety against SQL injection."
    ],
    architecturalDetails: [
      "Modular resolver pattern mapping GraphQL fields directly to async SQL stored procedures and queries.",
      "Centralized database connection pool configuration with automated reconnect and error handling."
    ],
    links: {
      github: "https://github.com/mohany6/graphql-sqlserver-api",
      live: "",
      demoVideo: ""
    },
    image: {
      banner: "assets/images/projects/graphql-api.svg",
      caption: "GraphQL Schema Visualizer & MS SQL Resolvers"
    }
  }

  /*
  // ===========================================================================
  // 📝 COMMENTED-OUT EXAMPLE 1: Standard Full-Stack / Web Project
  // ===========================================================================
  // To add a new web project, copy this block, uncomment it, fill in your details,
  // and make sure it has a unique 'id'.
  //
  // {
  //   id: "my-new-web-app",
  //   title: "CloudTask — Distributed Task Orchestrator",
  //   shortTitle: "CloudTask Orchestrator",
  //   tagline: "Microservices-Based Workflow Engine with Redis Queues & Real-Time WebSockets",
  //   category: "Full-Stack", // Options: "Full-Stack", "AI", "Desktop Automation", "Automation", "Data", "Labs"
  //   secondaryCategory: "Backend",
  //   featured: false, // Set to true if you want it prominently displayed
  //   badge: "New Release",
  //   period: "2025",
  //   stats: [
  //     { label: "Throughput", value: "10k req/s" },
  //     { label: "Latency", value: "< 15ms" },
  //     { label: "Test Coverage", value: "94%" },
  //     { label: "Architecture", value: "Event-Driven" }
  //   ],
  //   techStack: [
  //     "React",
  //     "TypeScript",
  //     "Node.js",
  //     "Docker",
  //     "Redis",
  //     "PostgreSQL"
  //   ],
  //   summary: "A scalable workflow orchestration platform allowing developers to coordinate distributed cron jobs and worker queues with live WebSocket telemetry.",
  //   highlights: [
  //     "Designed an event-driven task distribution engine capable of handling 10,000+ jobs/second across Redis-backed consumer pools.",
  //     "Built an interactive React/TypeScript monitoring canvas with live node status visualizations and drag-and-drop workflow authoring.",
  //     "Containerized the entire stack with Docker Compose and automated testing pipelines via GitHub Actions."
  //   ],
  //   architecturalDetails: [
  //     "Implemented BullMQ worker queues with exponential backoff retries and dead-letter queues.",
  //     "Secured API gateway using JWT bearer tokens and rate limiting middleware."
  //   ],
  //   links: {
  //     github: "https://github.com/mohany6/cloudtask",
  //     live: "https://cloudtask.example.com",
  //     demoVideo: ""
  //   },
  //   image: {
  //     banner: "assets/images/projects/cloudtask.svg",
  //     caption: "CloudTask Workflow Engine Dashboard"
  //   }
  // },

  // ===========================================================================
  // 📝 COMMENTED-OUT EXAMPLE 2: Python / AI / Automation / Data Project
  // ===========================================================================
  // To add a new Python, AI, or Data pipeline project, use this template.
  //
  // {
  //   id: "ai-log-anomaly-detector",
  //   title: "NeuralLog — AI Server Log Anomaly Detector",
  //   shortTitle: "NeuralLog Anomaly Detector",
  //   tagline: "Unsupervised Machine Learning Pipeline for Real-Time Server Anomaly Classification",
  //   category: "AI", // Options: "Full-Stack", "AI", "Desktop Automation", "Automation", "Data", "Labs"
  //   secondaryCategory: "Data",
  //   featured: false,
  //   badge: "AI & ML",
  //   period: "2025",
  //   stats: [
  //     { label: "F1 Score", value: "0.96" },
  //     { label: "Processing Speed", value: "50 MB/s" },
  //     { label: "False Positives", value: "< 2%" },
  //     { label: "Model", value: "Isolation Forest" }
  //   ],
  //   techStack: [
  //     "Python 3",
  //     "FastAPI",
  //     "Scikit-Learn",
  //     "Pandas",
  //     "Docker",
  //     "Prometheus"
  //   ],
  //   summary: "An end-to-end unsupervised ML pipeline analyzing live server access logs to detect DDoS patterns, brute-force attempts, and unauthorized data exfiltration.",
  //   highlights: [
  //     "Streamed and vectorized high-volume Nginx/Apache logs using custom tokenizers and TF-IDF feature extractors.",
  //     "Trained Isolation Forest and Autoencoder models achieving a 0.96 F1 score on real-world intrusion datasets.",
  //     "Exposed FastAPI inference endpoints with Prometheus metrics export for real-time Grafana dashboards."
  //   ],
  //   architecturalDetails: [
  //     "Optimized NumPy matrix transformations reducing classification latency to under 8ms per log batch.",
  //     "Deployed as a lightweight Docker container with automated health probes and rolling memory recycling."
  //   ],
  //   links: {
  //     github: "https://github.com/mohany6/neurallog",
  //     live: "",
  //     demoVideo: ""
  //   },
  //   image: {
  //     banner: "assets/images/projects/neurallog.svg",
  //     caption: "Anomaly Scoring Pipeline & Metric Telemetry"
  //   }
  // }
  */
];

// Export for ES modules and standard script tags
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS_DATA };
}
