/**
 * ==============================================================================
 * Mohamed Hany Fathy — 3D Cybernetic Neural Mesh & Spline Field (Three.js)
 * ==============================================================================
 *
 * Neural / Concurrency / AI Agent Topology:
 * A hardware-accelerated 3D luminous graph with real-time interactive mouse
 * ray gravitation, travelling spline signals, and dynamic camera parallax.
 *
 * Performance Budget:
 *  - Mobile & low-power (<4GB / data-saver): Bypasses 3D bundle, 2D particle canvas active
 *  - Reduced-motion: Paints a single aesthetic static frame without animation loop
 *  - Tab hidden / Scrolled out of view: Auto-pauses animation loop to 0% GPU load
 *  - Theme switcher: Reactive fog, lighting, and material chromatic shift
 * ==============================================================================
 */
(function () {
  "use strict";

  // 1. Synchronous WebGL probe so 2D fallback decides instantly
  let webglSupported = false;
  try {
    const probe = document.createElement("canvas");
    webglSupported = !!(
      window.WebGLRenderingContext &&
      (probe.getContext("webgl") || probe.getContext("experimental-webgl"))
    );
  } catch (_) {
    webglSupported = false;
  }

  if (!webglSupported) return;
  window.BG3D_PROBE = "webgl";

  const canvas = document.getElementById("bg-canvas-3d");
  if (!canvas) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth <= 768;
  const saveDataMode =
    (navigator.connection && navigator.connection.saveData === true) ||
    (navigator.deviceMemory && navigator.deviceMemory < 4);
  const lowPower = isMobile || saveDataMode;

  // On low-power / mobile devices, skip Three.js CDN download entirely
  if (lowPower) {
    window.BG3D_PROBE = null;
    return;
  }

  const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js";

  function activate() {
    if (window.BG3D_ACTIVE) return;
    window.BG3D_ACTIVE = true;
    document.documentElement.setAttribute("data-bg3d", "true");
    window.dispatchEvent(new Event("bg3d-active"));
    initScene();
  }

  function initScene() {
    const isLight = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isLight() ? 0xf1f5f9 : 0x050811, 0.024);

    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 65
    );
    camera.position.set(0, 0.5, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowPower,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ---- Dynamic Lighting Matrix ----
    const ambient = new THREE.AmbientLight(0x94a3b8, 0.55);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x06b6d4, 75, 45);
    cyanLight.position.set(-6, 5, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 65, 45);
    violetLight.position.set(6, -4, 7);
    scene.add(violetLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 45, 35);
    emeraldLight.position.set(0, -6, 5);
    scene.add(emeraldLight);

    // ---- 3D Neural Nodes ----
    const NODE_COUNT = 150;
    const EDGE_THRESHOLD = 2.9;
    const PALETTE = [
      [0.03, 0.71, 0.83], // cyan
      [0.22, 0.74, 0.97], // light cyan
      [0.39, 0.40, 0.95], // indigo
      [0.55, 0.36, 0.96], // violet
      [0.06, 0.73, 0.51], // emerald
    ];

    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);
    const basePositions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const nodePhases = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.4 + Math.random() * 5.8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      nodePhases[i] = Math.random() * Math.PI * 2;

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
      sizes[i] = 0.09 + Math.random() * 0.15;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    nodeGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // ---- Neural Edges / Interconnections ----
    const edgePairs = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < EDGE_THRESHOLD * EDGE_THRESHOLD) {
          edgePairs.push([i, j]);
        }
      }
    }

    const edgeCount = edgePairs.length;
    const edgePos = new Float32Array(edgeCount * 6);
    const edgeGeo = new THREE.BufferGeometry();
    const edgePosAttr = new THREE.BufferAttribute(edgePos, 3);
    edgeGeo.setAttribute("position", edgePosAttr);

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ---- Luminous Central Energy Core ----
    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const glowGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // ---- Mouse Interaction Raycasting Vector ----
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let scrollRatio = 0;
    let orbitAngle = 0;
    const mouseRay = new THREE.Vector3();

    window.addEventListener("mousemove", (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollRatio = window.scrollY / maxScroll;
    }, { passive: true });

    // Reactive Theme Synchronization
    const themeObserver = new MutationObserver(() => {
      const light = isLight();
      scene.fog.color.set(light ? 0xf8fafc : 0x050811);
      edgeMat.color.set(light ? 0x0284c7 : 0x06b6d4);
      edgeMat.opacity = light ? 0.09 : 0.14;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ---- Render Lifecycle & RAF Loop ----
    let inView = true;
    let pageVisible = !document.hidden;
    let rafId = null;

    const shouldRender = () =>
      inView && pageVisible && !prefersReducedMotion && !lowPower;

    const clock = new THREE.Clock();

    function tick() {
      rafId = null;
      if (!shouldRender()) return;

      const t = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      mouseRay.set(mouseX * 6, -mouseY * 4, 3);

      // Update Node Positions (Oscillation + Mouse Gravitational Field)
      const posAttr = nodeGeo.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const phase = nodePhases[i];

        const naturalX = basePositions[i3] + Math.sin(t * 0.26 + phase) * 0.65 + Math.sin(t * 0.12 + phase * 2) * 0.3;
        const naturalY = basePositions[i3 + 1] + Math.cos(t * 0.22 + phase) * 0.65 + Math.cos(t * 0.1 + phase * 1.8) * 0.3;
        const naturalZ = basePositions[i3 + 2] + Math.sin(t * 0.19 + phase * 1.4) * 0.55;

        // Gravitational displacement from cursor
        const dx = naturalX - mouseRay.x;
        const dy = naturalY - mouseRay.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let repelX = 0, repelY = 0;
        if (dist < 3.2 && dist > 0.01) {
          const force = (3.2 - dist) / 3.2 * 0.45;
          repelX = (dx / dist) * force;
          repelY = (dy / dist) * force;
        }

        arr[i3] = naturalX + repelX;
        arr[i3 + 1] = naturalY + repelY;
        arr[i3 + 2] = naturalZ;
      }
      posAttr.needsUpdate = true;

      // Update Edge Segments
      const eArr = edgePosAttr.array;
      for (let k = 0; k < edgeCount; k++) {
        const i = edgePairs[k][0] * 3;
        const j = edgePairs[k][1] * 3;
        const k6 = k * 6;
        eArr[k6] = arr[i];
        eArr[k6 + 1] = arr[i + 1];
        eArr[k6 + 2] = arr[i + 2];
        eArr[k6 + 3] = arr[j];
        eArr[k6 + 4] = arr[j + 1];
        eArr[k6 + 5] = arr[j + 2];
      }
      edgePosAttr.needsUpdate = true;

      // Pulse Central Energy Core
      const pulse = 0.85 + Math.sin(t * 1.6) * 0.18;
      core.scale.setScalar(pulse);
      glow.scale.setScalar(1 + Math.sin(t * 0.85) * 0.14);

      // Camera Parallax
      orbitAngle += 0.001;
      const camTargetX = Math.sin(orbitAngle) * 2 + mouseX * 0.75 + scrollRatio * 1.6;
      const camTargetY = Math.cos(orbitAngle) * 0.5 - mouseY * 0.45 - scrollRatio * 0.5;
      camera.position.x += (camTargetX - camera.position.x) * 0.045;
      camera.position.y += (camTargetY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      // Floating Light Trajectories
      cyanLight.position.x = -6 + Math.sin(t * 0.28) * 2.8;
      violetLight.position.y = -4 + Math.cos(t * 0.24) * 2.8;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    function requestRender() {
      if (rafId === null && shouldRender()) rafId = requestAnimationFrame(tick);
    }

    const hero = document.getElementById("hero");
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          inView = !!(entries[0] && entries[0].isIntersecting);
          requestRender();
        },
        { rootMargin: "300px 0px" }
      );
      io.observe(hero);
    }

    document.addEventListener("visibilitychange", () => {
      pageVisible = !document.hidden;
      requestRender();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    });

    // Render single frame for reduced-motion / initial paint
    renderer.render(scene, camera);
    requestRender();
  }

  // Load Three.js Asynchronously
  const script = document.createElement("script");
  script.src = THREE_URL;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.onload = () => {
    const T = window.THREE;
    if (T && T.Scene && T.WebGLRenderer) activate();
  };
  script.onerror = () => {
    window.BG3D_PROBE = null;
  };
  document.head.appendChild(script);
})();