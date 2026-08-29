/**
 * ==============================================================================
 * Mohamed Hany Fathy — 3D Background Scene (Three.js)
 * ==============================================================================
 *
 * Neural / Data-Flow Network: a glowing node graph that evokes AI agent
 * orchestration, GraphQL data batching, and concurrency worker pools.
 * Floating points connected by light trails, drifting in a 3D cloud.
 *
 * Graceful degradation:
 *  - WebGL unsupported            -> existing 2D particle canvas stays active
 *  - CDN unreachable / load fail  -> existing 2D particle canvas stays active
 *  - prefers-reduced-motion       -> renders a single static frame
 *  - mobile / save-data / <4GB    -> renders a single static frame (battery safe)
 *
 * When this scene activates it sets:
 *  - window.BG3D_ACTIVE = true
 *  - document.documentElement[data-bg3d="true"]
 *  - dispatches the window "bg3d-active" event (so the 2D canvas can stop)
 * ==============================================================================
 */
(function () {
  "use strict";

  // 1. Synchronous WebGL probe so the 2D fallback can decide immediately.
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
    scene.fog = new THREE.FogExp2(isLight() ? 0xf1f5f9 : 0x060911, 0.022);

    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 60
    );
    camera.position.set(0, 0.5, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowPower,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ---- Lights ----
    const ambient = new THREE.AmbientLight(0x94a3b8, 0.5);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x06b6d4, 80, 50);
    cyanLight.position.set(-6, 5, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 60, 50);
    violetLight.position.set(6, -4, 7);
    scene.add(violetLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 40, 40);
    emeraldLight.position.set(0, -6, 5);
    scene.add(emeraldLight);

    // ---- Neural Network Node Graph ----
    const NODE_COUNT = 140;
    const EDGE_THRESHOLD = 2.8;
    const PALETTE = [
      [0.03, 0.71, 0.83], // cyan
      [0.39, 0.40, 0.95], // indigo
      [0.55, 0.36, 0.96], // violet
      [0.06, 0.73, 0.51], // emerald
      [0.22, 0.69, 0.87], // light cyan
    ];

    // Node state
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);
    const basePositions = new Float32Array(NODE_COUNT * 3);
    const nodePhases = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 5.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
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
      sizes[i] = 0.08 + Math.random() * 0.14;
    }

    // Node geometry
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    nodeGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // ---- Edges (fixed pairs based on initial proximity) ----
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
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ---- Central glow core ----
    const coreGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Larger outer glow
    const glowGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // ---- Interaction ----
    let mouseX = 0, mouseY = 0;
    let scrollRatio = 0;
    let orbitAngle = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollRatio = window.scrollY / maxScroll;
    }, { passive: true });

    // Theme sync
    const themeObserver = new MutationObserver(() => {
      scene.fog.color.set(isLight() ? 0xf1f5f9 : 0x060911);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-theme"],
    });

    // ---- Render lifecycle ----
    let inView = true;
    let pageVisible = !document.hidden;
    let rafId = null;

    const shouldRender = () =>
      inView && pageVisible && !prefersReducedMotion && !lowPower;

    function tick() {
      rafId = null;
      if (!shouldRender()) return;

      const t = clock.getElapsedTime();

      // Update node positions with sine drift (bounded wandering)
      const posAttr = nodeGeo.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const phase = nodePhases[i];
        arr[i3] = basePositions[i3] + Math.sin(t * 0.25 + phase) * 0.6 + Math.sin(t * 0.13 + phase * 2) * 0.3;
        arr[i3 + 1] = basePositions[i3 + 1] + Math.cos(t * 0.2 + phase) * 0.6 + Math.cos(t * 0.11 + phase * 1.7) * 0.3;
        arr[i3 + 2] = basePositions[i3 + 2] + Math.sin(t * 0.18 + phase * 1.3) * 0.5;
      }
      posAttr.needsUpdate = true;

      // Update edge positions
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

      // Pulse core
      const pulse = 0.8 + Math.sin(t * 1.5) * 0.2;
      core.scale.setScalar(pulse);
      glow.scale.setScalar(1 + Math.sin(t * 0.8) * 0.15);

      // Slow camera orbit + mouse parallax + scroll rise
      orbitAngle += 0.0012;
      const camTargetX = Math.sin(orbitAngle) * 2 + mouseX * 0.6 + scrollRatio * 1.5;
      const camTargetY = Math.cos(orbitAngle) * 0.5 - mouseY * 0.4 - scrollRatio * 0.5;
      camera.position.x += (camTargetX - camera.position.x) * 0.04;
      camera.position.y += (camTargetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Drift lights
      cyanLight.position.x = -6 + Math.sin(t * 0.25) * 2.5;
      violetLight.position.y = -4 + Math.cos(t * 0.2) * 2.5;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    function requestRender() {
      if (rafId === null && shouldRender()) rafId = requestAnimationFrame(tick);
    }

    const clock = new THREE.Clock();

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

    // Paint one static frame, then animate
    renderer.render(scene, camera);
    requestRender();
  }

  // ---- Load Three.js ----
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