# 🚀 Mohamed Hany Fathy — Personal Portfolio

An ultra-fast, modern developer portfolio website designed to showcase full-stack systems, high-concurrency desktop tools, and Python automation pipelines.

![Portfolio Preview](assets/images/projects/healthcare-ai.png)

---

## 🛠️ Architecture & Tech Stack

- **Semantic HTML5 & Vanilla ES6+ Modular JavaScript**: Zero-build fragility, zero runtime dependencies, instant execution.
- **Glassmorphism Design System (CSS3)**: Dark & Light theme engine, smooth scroll telemetry, responsive mobile-first grid.
- **Hardware-Accelerated Particle Canvas**: 60fps interactive particle mesh with auto-pause on idle.
- **Single-Source Data Store**: All 6 featured projects and their metadata are managed directly in [`js/projects.js`](file:///c:/Users/MoHan/OneDrive/Desktop/New%20folder%20%283%29/Portfolio/js/projects.js).

---

## ⚡ Quick Start (Local Run)

### Option 1: 1-Click Launch (Windows)
Double-click [`start-local.bat`](file:///c:/Users/MoHan/OneDrive/Desktop/New%20folder%20%283%29/Portfolio/start-local.bat). It will automatically start a local server on port 3000 and launch your default browser.

### Option 2: Command Line
```bash
# Using NPX (Node.js):
npx serve -l 3000 .

# Or using Python:
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

---

## 🌐 Instant Deployment to Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: update portfolio"
   git push origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** → Click **"Add New Project"** → Select your `Portfolio` repository → Click **"Deploy"**.
3. Vercel automatically deploys the static site to their global Edge CDN with zero configuration needed.

---

## 📁 Repository Structure

```text
Portfolio/
├── index.html                   # High-performance semantic HTML5 entry point
├── cv.html                      # Print-optimized ATS-friendly Curriculum Vitae & PDF generator
├── start-local.bat              # 1-click local development launcher
├── vercel.json                  # Edge routing, security headers & immutable asset caching
├── README.md                    # Site documentation & setup guide
├── ProjectStructure.txt         # Project layout reference
├── PROJECTS_ANALYSIS.md         # Full codebase analysis reference
├── MARKET_ANALYSIS.md           # Egypt tech hiring market strategy & gap plan
│
├── css/
│   └── styles.css               # Design system: tokens, dark/light themes,
│                                # glassmorphism, responsive grid & animations
│
├── js/
│   ├── projects.js              # ⭐ SINGLE EDITABLE DATA FILE for all 7 projects + templates
│   └── main.js                  # Particle canvas, theme switcher, filters, modal,
│                                # animated counters & contact form handler
│
└── assets/
    ├── favicon.ico              # Browser favicon
    ├── cv/
    │   └── mohamed-hany-cv.pdf  # Downloadable PDF Resume
    └── images/
        ├── profile.jpg          # Profile photo
        └── projects/            # Real screenshots & vector UI mockups
            ├── healthcare-ai.png
            ├── automation-suite.png
            ├── cinema-booking.svg
            ├── hotel-booking.svg
            ├── customer-manager.svg
            ├── login-automation.svg
            ├── market-monitor.svg
            ├── graphql-api.svg
            ├── fc26/            # Desktop automation & 100-thread proxy screenshots
            └── myhealthai/      # 29 high-resolution categorized screenshots
```

---

## 📝 Adding & Editing Projects

All project cards, filter categories, stats, and modal deep-dive views are generated from [`js/projects.js`](file:///c:/Users/MoHan/OneDrive/Desktop/New%20folder%20%283%29/Portfolio/js/projects.js).

To add a new project, open `js/projects.js`, copy one of the commented template entries at the bottom of the file, fill in your details, and save. The portfolio updates immediately with zero build steps!

---

## 👤 Contact

**Mohamed Hany Fathy**
- **Email**: [mahamedhany8@gmail.com](mailto:mahamedhany8@gmail.com)
- **Phone**: +20 100 367 2318
- **GitHub**: [github.com/mohany6](https://github.com/mohany6)
- **LinkedIn**: [linkedin.com/in/mohanyoo](https://www.linkedin.com/in/mohanyoo/)
