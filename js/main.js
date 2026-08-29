/**
 * ==============================================================================
 * Mohamed Hany Fathy — Portfolio Application Core Controller
 * Art-Directed Cybernetic Obsidian & Cyan Glassmorphism 2.0 Engine
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initParticleCanvas();
  initRoleTyper();
  initNavbarScrollSpy();
  initAnimatedCounters();
  initProjects();
  initScrollReveal();
  initModal();
  initContactForm();
  initScrollProgress();
  initCursorSpotlight();
  initAvatarTilt();
  initCardTilt();
  initMagneticButtons();
  initProficiencyBars();
});

/* ==============================================================================
   1. THEME ENGINE (Dark / Light Mode with localStorage & System Preference)
   ============================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const storedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

  // Default to Dark Mode unless explicitly set to Light
  const activeTheme = storedTheme ? storedTheme : (systemPrefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("portfolio-theme", nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} mode`, "info");
    });
  }
}

/* ==============================================================================
   2. HIGH-PERFORMANCE INTERACTIVE PARTICLE CANVAS (BATTERY & MOBILE OPTIMIZED)
   ============================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animationFrameId = null;
  let isMobile = window.innerWidth <= 768;
  let isCanvasActive = true;
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveDataMode =
    (navigator.connection && navigator.connection.saveData === true) ||
    (navigator.deviceMemory && navigator.deviceMemory < 4);

  // If the Three.js background successfully activates, stop this 2D canvas.
  window.addEventListener("bg3d-active", () => {
    isCanvasActive = false;
    stopLoop();
    canvas.style.display = "none";
  });

  // On low-power devices / data-saver mode, render a single static frame and stop.
  if (saveDataMode) {
    resize();
    draw();
    return;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = width <= 768;
    createParticles();
  }

  function createParticles() {
    particles = [];
    if (prefersReducedMotion) {
      const count = isMobile ? 8 : 20;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.3 + 0.1
        });
      }
      return;
    }

    const divisor = isMobile ? 32000 : 18000;
    const density = Math.floor((width * height) / divisor);
    const particleCount = isMobile 
      ? Math.min(Math.max(density, 12), 22) 
      : Math.min(Math.max(density, 35), 85);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
        vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }

  function startLoop() {
    if (!animationFrameId && !prefersReducedMotion && isCanvasActive) {
      animationFrameId = requestAnimationFrame(draw);
    }
  }

  function stopLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function draw() {
    if (!isCanvasActive) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const particleColor = isLight ? "rgba(2, 132, 199, " : "rgba(56, 189, 248, ";
    const lineColor = isLight ? "rgba(2, 132, 199, " : "rgba(6, 182, 212, ";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (!isMobile && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + p.alpha + ")";
      ctx.fill();

      if (!prefersReducedMotion) {
        const maxDist = isMobile ? 80 : 110;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor + (0.15 * (1 - dist / maxDist)) + ")";
            ctx.lineWidth = isMobile ? 0.5 : 0.8;
            ctx.stroke();
          }
        }
      }
    }

    if (!prefersReducedMotion && isCanvasActive) {
      animationFrameId = requestAnimationFrame(draw);
    } else {
      animationFrameId = null;
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      stopLoop();
      resize();
      draw();
      startLoop();
    }, 150);
  });

  if (!isMobile) {
    let mouseRaf = null;
    window.addEventListener("mousemove", (e) => {
      if (!mouseRaf) {
        mouseRaf = requestAnimationFrame(() => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
          mouseRaf = null;
        });
      }
    }, { passive: true });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // Pause rendering when hero is scrolled out of view to save battery & GPU
  const heroSection = document.getElementById("hero");
  if (heroSection && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isCanvasActive = entry.isIntersecting;
        if (isCanvasActive) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { rootMargin: "200px 0px" });
    heroObserver.observe(heroSection);
  }

  // Pause when tab is not active
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopLoop();
    } else if (!prefersReducedMotion && isCanvasActive) {
      startLoop();
    }
  });

  resize();
  draw();
  startLoop();
}

/* ==============================================================================
   3. HERO ROLE TYPEWRITER EFFECT
   ============================================================================== */
function initRoleTyper() {
  const typerElement = document.getElementById("hero-typed-text");
  if (!typerElement) return;

  const roles = [
    "Full-Stack Developer (MEARN)",
    "Backend & API Architect",
    "AI Agents & Autonomous Workflows",
    "AI-Integrated Systems (FastAPI)",
    "High-Concurrency Python Pipelines"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typerElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typerElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==============================================================================
   4. NAVBAR SCROLLSPY & ACCESSIBLE MOBILE DRAWER (RAF THROTTLED)
   ============================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll("section[id]");

  let scrollTicking = false;

  // RAF throttled scrollspy to eliminate layout thrashing
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > 40) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        let currentSection = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 160;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
          }
        });

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Mobile drawer toggle with accessibility & outside dismiss
  if (mobileToggle && navMenu) {
    const toggleDrawer = (forceState) => {
      const isOpen = forceState !== undefined ? forceState : !navMenu.classList.contains("open");
      navMenu.classList.toggle("open", isOpen);
      mobileToggle.classList.toggle("active", isOpen);
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggleDrawer(false);
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleDrawer(false);
      }
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        toggleDrawer(false);
      }
    });
  }
}

/* ==============================================================================
   5. ANIMATED STATS COUNTERS (Intersection Observer)
   ============================================================================== */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute("data-target"), 10);
          animateCounter(target, endValue);
          obs.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));

  function animateCounter(element, endVal) {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * endVal);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = endVal;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==============================================================================
   6. SCROLL REVEAL ENGINE (STAGGERED & ACCESSIBLE)
   ============================================================================== */
let revealObserver = null;

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-init").forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  observeNewScrollReveals();
}

function observeNewScrollReveals() {
  if (!revealObserver) {
    document.querySelectorAll(".reveal-init").forEach((el) => el.classList.add("reveal-visible"));
    return;
  }
  const unobserved = document.querySelectorAll(".reveal-init:not(.reveal-visible)");
  unobserved.forEach((el) => revealObserver.observe(el));
}

/* ==============================================================================
   7. PROJECTS RENDERING, FILTERING & SEARCH
   ============================================================================== */
let currentCategory = "All";
let currentSearchQuery = "";

function initProjects() {
  renderProjects();

  // Category filter clicks
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderProjects();
    });
  });

  // Search input with debounce
  const searchInput = document.getElementById("project-search-input");
  if (searchInput) {
    let timeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        renderProjects();
      }, 200);
    });
  }
}

function renderProjects() {
  const featuredContainer = document.getElementById("featured-project-container");
  const standardGrid = document.getElementById("projects-standard-grid");
  const emptyState = document.getElementById("projects-empty-state");

  if (!Array.isArray(PROJECTS_DATA) || PROJECTS_DATA.length === 0) return;

  // Filter projects based on category and search query
  const filtered = PROJECTS_DATA.filter((p) => {
    const matchesCategory =
      currentCategory === "All" ||
      p.category.toLowerCase() === currentCategory.toLowerCase() ||
      (p.secondaryCategory && p.secondaryCategory.toLowerCase() === currentCategory.toLowerCase());

    const matchesSearch =
      !currentSearchQuery ||
      p.title.toLowerCase().includes(currentSearchQuery) ||
      p.summary.toLowerCase().includes(currentSearchQuery) ||
      p.tagline.toLowerCase().includes(currentSearchQuery) ||
      p.techStack.some((t) => t.toLowerCase().includes(currentSearchQuery));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    if (featuredContainer) featuredContainer.innerHTML = "";
    if (standardGrid) standardGrid.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Separate Featured / Flagship Hero Project
  const featuredProject = filtered.find((p) => p.featured);
  const remainingProjects = filtered.filter((p) => !p.featured || (p.featured && !featuredProject));

  // If no project matches featured condition, use first as primary when viewing "All"
  if (featuredContainer) {
    if (featuredProject) {
      featuredContainer.style.display = "block";
      featuredContainer.innerHTML = createFeaturedProjectHTML(featuredProject);
    } else {
      featuredContainer.style.display = "none";
      featuredContainer.innerHTML = "";
    }
  }

  // Render Standard Cards Grid
  if (standardGrid) {
    const listToRender = featuredProject ? remainingProjects : filtered;
    standardGrid.innerHTML = listToRender.map((p, idx) => createStandardProjectCardHTML(p, idx)).join("");
  }

  // Observe all newly injected cards for smooth scroll-reveal
  observeNewScrollReveals();

  // Attach modal trigger listeners to all rendered cards
  attachProjectModalTriggers();
}

function createFeaturedProjectHTML(project) {
  const techBadges = project.techStack
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join("");

  const highlights = project.highlights
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const stats = project.stats
    ? project.stats
        .map(
          (s) => `
        <div class="project-stat-box">
          <div class="project-stat-num">${escapeHtml(s.value)}</div>
          <div class="project-stat-lbl">${escapeHtml(s.label)}</div>
        </div>
      `
        )
        .join("")
    : "";

  const githubBtn = project.links.github
    ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        <i class="fab fa-github"></i> Source Code
      </a>`
    : "";

  const liveBtn = project.links.live
    ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <i class="fas fa-external-link-alt"></i> Live Platform
      </a>`
    : "";

  const showcaseTabs = [
    { label: "Telemedicine", icon: "fas fa-heartbeat", img: "assets/images/projects/myhealthai/01-home-telemedicine-hero.png", active: true },
    { label: "AI Scanner", icon: "fas fa-brain", img: "assets/images/projects/myhealthai/02-ai-xray-pneumonia-scanner.png", active: false },
    { label: "AI Metrics", icon: "fas fa-chart-pie", img: "assets/images/projects/myhealthai/03-ai-prediction-confidence.png", active: false },
    { label: "Clinic Map", icon: "fas fa-map-marked-alt", img: "assets/images/projects/myhealthai/07-leaflet-clinic-map.png", active: false },
    { label: "2FA Security", icon: "fas fa-shield-alt", img: "assets/images/projects/myhealthai/14-bank-grade-security-hub.png", active: false },
    { label: "Doctor Desk", icon: "fas fa-user-md", img: "assets/images/projects/myhealthai/17-doctor-dashboard-workspace.png", active: false },
    { label: "Admin Console", icon: "fas fa-sliders-h", img: "assets/images/projects/myhealthai/22-admin-oversight-dashboard.png", active: false }
  ];

  const showcaseTabsHTML = showcaseTabs
    .map(
      (tab) => `
      <button class="showcase-tab-btn ${tab.active ? "active" : ""}" data-img-src="${escapeHtml(tab.img)}">
        <i class="${tab.icon}"></i> ${escapeHtml(tab.label)}
      </button>
    `
    )
    .join("");

  return `
    <div class="hero-project-card glass-card">
      <div class="hero-project-grid">
        <div class="hero-project-info">
          <span class="project-badge-pill"><i class="fas fa-crown"></i> ${escapeHtml(project.badge || "Featured Project")}</span>
          <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
          <p class="project-tagline">${escapeHtml(project.tagline)}</p>
          <p class="project-summary">${escapeHtml(project.summary)}</p>

          ${project.myRole ? `<div class="project-role-strip"><i class="fas fa-user-cog"></i> <span><strong>My Role:</strong> ${escapeHtml(project.myRole)}</span></div>` : ""}

          <ul class="project-highlights-list">
            ${highlights}
          </ul>

          <div class="project-stats-strip">
            ${stats}
          </div>

          <div class="tech-tags-wrap">
            ${techBadges}
          </div>

          <div class="project-actions-row">
            <button class="btn btn-primary btn-sm view-details-btn" data-project-id="${project.id}">
              <i class="fas fa-microchip"></i> System Deep-Dive (29 Screens)
            </button>
            ${githubBtn}
            ${liveBtn}
          </div>
        </div>

        <div class="hero-showcase-device">
          <div class="mockup-browser">
            <div class="mockup-browser-header">
              <div class="mockup-dots">
                <span class="mockup-dot dot-red"></span>
                <span class="mockup-dot dot-yellow"></span>
                <span class="mockup-dot dot-green"></span>
              </div>
              <div class="mockup-url-bar">
                <i class="fas fa-lock" style="color: #10b981;"></i> https://myhealthai.platform/telemedicine
              </div>
              <div class="mockup-status-badge">
                <span class="pulse-dot"></span> AI Model 95% Conf
              </div>
            </div>
            <div class="mockup-screen-viewport view-details-btn" data-project-id="${project.id}" title="Click to open full deep-dive modal">
              <img id="flagship-preview-img" src="${project.image.banner}" alt="${escapeHtml(project.title)}" class="mockup-screen-img" loading="lazy" />
              <div class="mockup-hover-overlay">
                <i class="fas fa-expand-arrows-alt" style="font-size: 1.6rem; color: var(--accent-cyan);"></i>
                <span>Click to Explore Full Architecture & 29 Screens</span>
              </div>
            </div>
          </div>
          <div class="showcase-tabs-strip">
            ${showcaseTabsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

function createStandardProjectCardHTML(project, idx) {
  const techBadges = project.techStack
    .slice(0, 5)
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join("");

  const highlights = project.highlights
    .slice(0, 2)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const githubBtn = project.links.github
    ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="social-link-icon" title="View Source Code" aria-label="View ${escapeHtml(project.title)} source code on GitHub">
        <i class="fab fa-github"></i>
      </a>`
    : "";

  const liveBtn = project.links.live
    ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="social-link-icon" title="Live Preview" aria-label="Open ${escapeHtml(project.title)} live demo">
        <i class="fas fa-external-link-alt"></i>
      </a>`
    : "";

  const delayClass = idx % 3 === 1 ? "delay-1" : idx % 3 === 2 ? "delay-2" : "";

  return `
    <div class="project-card glass-card reveal-init tilt-card ${delayClass}">
      <div class="card-top-image">
        <img src="${project.image.banner}" alt="${escapeHtml(project.title)}" loading="lazy" />
      </div>
      <div class="card-content-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="section-tag" style="padding: 0.2rem 0.75rem; font-size: 0.72rem; margin-bottom: 0;">${escapeHtml(project.category)}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(project.period || "")}</span>
        </div>
        
        <h4 class="project-card-title" style="font-size: 1.25rem; margin-bottom: 0.4rem;">${escapeHtml(project.title)}</h4>
        <p class="project-tagline" style="font-size: 0.85rem; margin-bottom: 0.85rem;">${escapeHtml(project.tagline)}</p>

        ${project.myRole ? `<div class="project-role-tag"><i class="fas fa-user-cog"></i> ${escapeHtml(project.myRole)}</div>` : ""}

        <ul class="project-highlights-list" style="margin-bottom: 1.2rem;">
          ${highlights}
        </ul>

        <div class="tech-tags-wrap" style="margin-top: auto; margin-bottom: 1.2rem;">
          ${techBadges}
          ${project.techStack.length > 5 ? `<span class="tech-tag">+${project.techStack.length - 5} more</span>` : ""}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--border-color);">
          <button class="btn btn-outline btn-sm view-details-btn" data-project-id="${project.id}">
            <i class="fas fa-info-circle"></i> Details
          </button>
          <div style="display: flex; gap: 0.5rem;">
            ${githubBtn}
            ${liveBtn}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==============================================================================
   8. PROJECT DEEP-DIVE MODAL
   ============================================================================== */
function initModal() {
  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

function attachProjectModalTriggers() {
  const detailButtons = document.querySelectorAll(".view-details-btn");
  const modalOverlay = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-project-content");

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id");
      const project = PROJECTS_DATA.find((p) => p.id === projectId);
      if (!project || !modalBody || !modalOverlay) return;

      const techBadges = project.techStack
        .map((tech) => `<span class="tech-tag" style="background: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.3); color: var(--accent-cyan);">${escapeHtml(tech)}</span>`)
        .join("");

      const highlights = project.highlights
        .map((h) => `<li style="margin-bottom: 0.6rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(h)}</li>`)
        .join("");

      const archDetails = project.architecturalDetails
        ? project.architecturalDetails
            .map((a) => `<li style="margin-bottom: 0.6rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(a)}</li>`)
            .join("")
        : "";

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span class="section-tag">${escapeHtml(project.category)}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 800; margin: 0.5rem 0; color: var(--text-primary); letter-spacing: -0.02em;">${escapeHtml(project.title)}</h2>
          <p style="font-size: 1.05rem; color: var(--accent-cyan); font-weight: 600;">${escapeHtml(project.tagline)}</p>
        </div>

        <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
          <img src="${project.image.banner}" alt="${escapeHtml(project.title)}" style="width: 100%; height: auto;" />
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Executive Overview</h4>
          <p style="color: var(--text-secondary); line-height: 1.7;">${escapeHtml(project.summary)}</p>
        </div>

        ${project.myRole ? `
        <div style="margin-bottom: 1.75rem; padding: 1.1rem; border-radius: var(--radius-md); background: var(--surface-2); border: 1px solid var(--border-color);">
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--accent-cyan);"><i class="fas fa-user-cog"></i> My Role</h4>
          <p style="color: var(--text-primary); line-height: 1.6;">${escapeHtml(project.myRole)}</p>
        </div>
        ` : ""}

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Key Architectural Highlights</h4>
          <ul style="padding-left: 1.25rem;">
            ${highlights}
          </ul>
        </div>

        ${
          archDetails
            ? `
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Engineering & Resilience Implementations</h4>
            <ul style="padding-left: 1.25rem;">
              ${archDetails}
            </ul>
          </div>
        `
            : ""
        }

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">Full Technology Stack</h4>
          <div class="tech-tags-wrap">
            ${techBadges}
          </div>
        </div>

        ${
          project.gallery && project.gallery.length > 0
            ? `
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary);">
              <i class="fas fa-images" style="color: var(--accent-cyan); margin-right: 0.4rem;"></i> Verified Feature Screenshots (${project.gallery.length})
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
              ${project.gallery
                .map(
                  (img) => `
                <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden; display: flex; flex-direction: column;">
                  <a href="${escapeHtml(img.url)}" target="_blank" rel="noopener noreferrer" title="Click to view full-resolution image" style="display: block; overflow: hidden; background: #000;">
                    <img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.caption)}" style="width: 100%; height: 135px; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" loading="lazy" />
                  </a>
                  <div style="padding: 0.6rem 0.75rem; flex: 1; display: flex; flex-direction: column;">
                    <span style="font-size: 0.68rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">${escapeHtml(img.category || "Feature")}</span>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">${escapeHtml(img.caption)}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
          ${
            project.links.github
              ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                  <i class="fab fa-github"></i> View GitHub Repository
                </a>`
              : ""
          }
          ${
            project.links.live
              ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                  <i class="fas fa-external-link-alt"></i> Open Live Platform
                </a>`
              : ""
          }
        </div>
      `;

      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Attach interactive screenshot switcher listeners for flagship card
  const showcaseTabs = document.querySelectorAll(".showcase-tab-btn");
  const flagshipImg = document.getElementById("flagship-preview-img");
  if (showcaseTabs.length > 0 && flagshipImg) {
    showcaseTabs.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        showcaseTabs.forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        const newSrc = btn.getAttribute("data-img-src");
        if (newSrc) {
          flagshipImg.style.opacity = "0.2";
          setTimeout(() => {
            flagshipImg.src = newSrc;
            flagshipImg.style.opacity = "1";
          }, 120);
        }
      });
    });
  }
}

/* ==============================================================================
   9. CONTACT FORM & CLIPBOARD ACTIONS
   ============================================================================== */

// Builds a mailto: URI from the form action (recipient) and submitted fields.
function buildMailtoUri(actionUrl, dataObj) {
  const recipient = actionUrl.replace(/^mailto:/, "").split("?")[0];
  const subject = `Portfolio Contact from ${dataObj.name || "Recruiter"}`;
  const body = `${dataObj.message || ""}%0D%0A%0D%0AFrom: ${dataObj.email || ""}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Shows mail-client dispatch feedback and opens the mail client.
function showMailtoFeedback(statusMsg, mailtoUri) {
  if (statusMsg) {
    statusMsg.className = "form-status-msg success";
    statusMsg.innerHTML = "✓ Opening default mail client for direct dispatch...";
  }
  window.location.href = mailtoUri;
}

function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const statusMsg = document.getElementById("form-status-msg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Transmitting...`;

      const formData = new FormData(form);
      const dataObj = Object.fromEntries(formData.entries());
      const actionUrl = form.action;
      const isMailto = actionUrl.startsWith("mailto:");

      // Direct mail-client dispatch when the form action is a mailto: URI.
      if (isMailto) {
        const mailtoUri = buildMailtoUri(actionUrl, dataObj);
        showMailtoFeedback(statusMsg, mailtoUri);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }

      try {
        // Attempt Formspree submission when an https endpoint is configured
        const response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          if (statusMsg) {
            statusMsg.className = "form-status-msg success";
            statusMsg.textContent = "✓ Message dispatched successfully! I will reply within 24 hours.";
          }
          showToast("Message transmitted successfully!", "success");
          form.reset();
        } else {
          throw new Error("Submission returned non-200");
        }
      } catch (err) {
        // Mailto fallback if endpoint is unreachable
        const mailtoUri = buildMailtoUri(form.action, dataObj);
        showMailtoFeedback(statusMsg, mailtoUri);
        showToast("Opened mail client for message delivery", "info");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Copy to clipboard handlers
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute("data-copy");
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, "success");
        });
      }
    });
  });
}

/* ==============================================================================
   10. TOAST NOTIFICATION MANAGER
   ============================================================================== */
function showToast(message, type = "info") {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>'
      : type === "error"
      ? '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>'
      : '<i class="fas fa-info-circle" style="color: var(--accent-cyan);"></i>';

  toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// Utility: HTML Escaping
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==============================================================================
   11. READING PROGRESS BAR
   ============================================================================== */
function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", Math.round(pct));
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  window.addEventListener("resize", update, { passive: true });
  update();
}

/* ==============================================================================
   12. CURSOR SPOTLIGHT (Desktop Fine-Pointer Only)
   ============================================================================== */
function initCursorSpotlight() {
  const spotlight = document.querySelector(".cursor-spotlight");
  if (!spotlight) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let rafId = null;
  let targetX = -9999, targetY = -9999;
  let curX = -9999, curY = -9999;

  const loop = () => {
    curX += (targetX - curX) * 0.12;
    curY += (targetY - curY) * 0.12;
    spotlight.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(loop);
  };

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!spotlight.classList.contains("active")) spotlight.classList.add("active");
    if (rafId === null) loop();
  }, { passive: true });

  window.addEventListener("mouseout", () => {
    spotlight.classList.remove("active");
  });

  window.addEventListener("mouseleave", () => {
    spotlight.classList.remove("active");
    targetX = -9999; targetY = -9999;
  });
}

/* ==============================================================================
   13. 3D TILT AVATAR (Mouse-Responsive Perspective)
   ============================================================================== */
function initAvatarTilt() {
  const tiltEl = document.querySelector(".avatar-tilt");
  if (!tiltEl) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const frame = tiltEl.querySelector(".avatar-frame");
  const glare = tiltEl.querySelector(".avatar-glare");
  const max = parseFloat(tiltEl.getAttribute("data-tilt-max")) || 12;
  const scale = parseFloat(tiltEl.getAttribute("data-tilt-scale")) || 1.03;
  let rafId = null;
  let currentRotateX = 0, currentRotateY = 0;
  let targetRotateX = 0, targetRotateY = 0;

  const apply = () => {
    currentRotateX += (targetRotateX - currentRotateX) * 0.14;
    currentRotateY += (targetRotateY - currentRotateY) * 0.14;
    frame.style.transform =
      `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(${scale})`;
    if (Math.abs(currentRotateX - targetRotateX) < 0.05 && Math.abs(currentRotateY - targetRotateY) < 0.05) {
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(apply);
  };

  tiltEl.addEventListener("mousemove", (e) => {
    const rect = tiltEl.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    targetRotateY = (px - 0.5) * 2 * max;
    targetRotateX = (0.5 - py) * 2 * max;
    if (glare) {
      glare.style.setProperty("--glare-x", px * 100 + "%");
      glare.style.setProperty("--glare-y", py * 100 + "%");
    }
    tiltEl.setAttribute("data-tilt-active", "true");
    if (rafId === null) apply();
  }, { passive: true });

  tiltEl.addEventListener("mouseleave", () => {
    targetRotateX = 0;
    targetRotateY = 0;
    tiltEl.removeAttribute("data-tilt-active");
    if (rafId === null) apply();
  });
}

/* ==============================================================================
   14. PROJECT CARD 3D TILT (Grid Cards)
   ============================================================================== */
function initCardTilt() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const supports3D = CSS.supports && CSS.supports("transform-style: preserve-3d");
  if (!supports3D) return;

  document.addEventListener("mouseover", (e) => {
    const card = e.target.closest(".tilt-card");
    if (card) tiltCardHandler(card);
  });
}

function tiltCardHandler(card) {
  if (card.dataset.tiltBound) return;
  card.dataset.tiltBound = "1";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const maxTilt = 7;
    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - py) * 2 * maxTilt;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, { passive: true });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}

/* ==============================================================================
   15. MAGNETIC BUTTONS (Primary CTAs Attract Pointer)
   ============================================================================== */
function initMagneticButtons() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const buttons = document.querySelectorAll(".magnetic");
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.28}px)`;
    }, { passive: true });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ==============================================================================
   16. CORE STACK PROFICIENCY BARS (Animated on View)
   ============================================================================== */
function initProficiencyBars() {
  const panel = document.querySelector(".proficiency-panel");
  if (!panel) return;

  const fills = panel.querySelectorAll(".proficiency-fill");
  fills.forEach((f) => {
    f.style.setProperty("--bar-width", f.getAttribute("data-width") || "0%");
  });

  const revealProficiency = () => {
    panel.classList.add("in-view");
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) revealProficiency();
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(panel);
}
