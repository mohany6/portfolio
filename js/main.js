/**
 * ==============================================================================
 * Mohamed Hany Fathy — Portfolio Application Core Controller
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initParticleCanvas();
  initRoleTyper();
  initNavbarScrollSpy();
  initAnimatedCounters();
  initProjects();
  initModal();
  initContactForm();
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
   2. HIGH-PERFORMANCE INTERACTIVE PARTICLE CANVAS
   ============================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animationFrameId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const density = Math.floor((width * height) / 18000);
    const particleCount = Math.min(Math.max(density, 35), 90);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const particleColor = isLight ? "rgba(2, 132, 199, " : "rgba(56, 189, 248, ";
    const lineColor = isLight ? "rgba(2, 132, 199, " : "rgba(6, 182, 212, ";

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse Interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + p.alpha + ")";
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor + (0.15 * (1 - dist / 110)) + ")";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrameId);
    resize();
    draw();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when tab is not active to conserve GPU/CPU
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      draw();
    }
  });

  resize();
  draw();
}

/* ==============================================================================
   3. HERO ROLE TYPEWRITER EFFECT
   ============================================================================== */
function initRoleTyper() {
  const typerElement = document.getElementById("hero-typed-text");
  if (!typerElement) return;

  const roles = [
    "Full-Stack Developer",
    "Backend & API Architect",
    "Python Automation Engineer",
    "High-Throughput Systems Builder",
    "Data & Pipeline Specialist"
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
   4. NAVBAR SCROLLSPY & MOBILE DRAWER
   ============================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll("section[id]");

  // Sticky Glass on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // ScrollSpy active link detection
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
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
   6. PROJECTS RENDERING, FILTERING & SEARCH
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
    standardGrid.innerHTML = listToRender.map((p) => createStandardProjectCardHTML(p)).join("");
  }

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

function createStandardProjectCardHTML(project) {
  const techBadges = project.techStack
    .slice(0, 5)
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join("");

  const highlights = project.highlights
    .slice(0, 2)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const githubBtn = project.links.github
    ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="social-link-icon" title="View Source Code">
        <i class="fab fa-github"></i>
      </a>`
    : "";

  const liveBtn = project.links.live
    ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="social-link-icon" title="Live Preview">
        <i class="fas fa-external-link-alt"></i>
      </a>`
    : "";

  return `
    <div class="project-card glass-card">
      <div class="card-top-image">
        <img src="${project.image.banner}" alt="${escapeHtml(project.title)}" loading="lazy" />
      </div>
      <div class="card-content-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="section-tag" style="padding: 0.15rem 0.65rem; font-size: 0.75rem; margin-bottom: 0;">${escapeHtml(project.category)}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(project.period || "")}</span>
        </div>
        
        <h4 class="project-card-title" style="font-size: 1.25rem; margin-bottom: 0.4rem;">${escapeHtml(project.title)}</h4>
        <p class="project-tagline" style="font-size: 0.85rem; margin-bottom: 0.85rem;">${escapeHtml(project.tagline)}</p>
        
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
   7. PROJECT DEEP-DIVE MODAL
   ============================================================================== */
function initModal() {
  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
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
          <h2 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; margin: 0.5rem 0; color: var(--text-primary);">${escapeHtml(project.title)}</h2>
          <p style="font-size: 1rem; color: var(--accent-cyan); font-weight: 600;">${escapeHtml(project.tagline)}</p>
        </div>

        <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color);">
          <img src="${project.image.banner}" alt="${escapeHtml(project.title)}" style="width: 100%; height: auto;" />
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Executive Overview</h4>
          <p style="color: var(--text-secondary); line-height: 1.7;">${escapeHtml(project.summary)}</p>
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Key Architectural Highlights</h4>
          <ul style="padding-left: 1.25rem;">
            ${highlights}
          </ul>
        </div>

        ${
          archDetails
            ? `
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Engineering & Resilience Implementations</h4>
            <ul style="padding-left: 1.25rem;">
              ${archDetails}
            </ul>
          </div>
        `
            : ""
        }

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">Full Technology Stack</h4>
          <div class="tech-tags-wrap">
            ${techBadges}
          </div>
        </div>

        ${
          project.gallery && project.gallery.length > 0
            ? `
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.85rem; color: var(--text-primary);">
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
   8. CONTACT FORM & CLIPBOARD ACTIONS
   ============================================================================== */
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

      try {
        // Attempt Formspree submission if configured, else graceful fallback
        const response = await fetch(form.action, {
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
        // Mailto fallback if endpoint is placeholder or fails
        if (statusMsg) {
          statusMsg.className = "form-status-msg success";
          statusMsg.innerHTML = `✓ Opening default mail client for direct dispatch...`;
        }
        const mailtoUri = `mailto:mahamedhany8@gmail.com?subject=${encodeURIComponent(
          "Portfolio Contact from " + (dataObj.name || "Recruiter")
        )}&body=${encodeURIComponent(dataObj.message || "")}%0D%0A%0D%0AFrom: ${encodeURIComponent(
          dataObj.email || ""
        )}`;
        window.location.href = mailtoUri;
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
   9. TOAST NOTIFICATION MANAGER
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
