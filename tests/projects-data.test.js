/**
 * Data-integrity seam tests for the single-source project data store (js/projects.js).
 *
 * The portfolio UI renders entirely from PROJECTS_DATA. These tests lock in the
 * structural invariants the UI and recruiters depend on (unique ids, required
 * fields, per-project role clarity, live-demo links, and on-disk image assets).
 *
 * Run with:  node --test tests/
 */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.join(__dirname, "..");

function loadProjectsData() {
  const source = fs.readFileSync(path.join(ROOT, "js", "projects.js"), "utf8");
  const sandbox = {};
  vm.runInNewContext(source + "\n; this.__result = PROJECTS_DATA;", sandbox);
  return sandbox.__result;
}

const PROJECTS = loadProjectsData();
const ALLOWED_CATEGORIES = new Set([
  "Full-Stack",
  "AI",
  "Desktop Automation",
  "Automation",
  "Data",
  "Labs",
]);

test("PROJECTS_DATA is a non-empty array", () => {
  assert.ok(Array.isArray(PROJECTS), "PROJECTS_DATA must be an array");
  assert.ok(PROJECTS.length >= 5, "expected at least 5 projects");
});

test("project ids are unique and URL-safe slugs", () => {
  const ids = PROJECTS.map((p) => p.id);
  assert.strictEqual(new Set(ids).size, ids.length, "duplicate project ids");
  for (const id of ids) {
    assert.match(id, /^[a-z0-9-]+$/, `id "${id}" is not a URL-safe slug`);
  }
});

test("every project has all required fields", () => {
  const required = [
    "id",
    "title",
    "tagline",
    "category",
    "summary",
    "highlights",
    "techStack",
    "links",
    "image",
  ];
  for (const p of PROJECTS) {
    for (const field of required) {
      assert.ok(p[field] !== undefined && p[field] !== null && p[field] !== "",
        `project "${p.id}" missing required field "${field}"`);
    }
    assert.ok(Array.isArray(p.highlights) && p.highlights.length > 0,
      `project "${p.id}" needs non-empty highlights`);
    assert.ok(Array.isArray(p.techStack) && p.techStack.length > 0,
      `project "${p.id}" needs non-empty techStack`);
    assert.ok(ALLOWED_CATEGORIES.has(p.category),
      `project "${p.id}" has unknown category "${p.category}"`);
  }
});

test("every project declares a clear individual role (recruiter P1 requirement)", () => {
  for (const p of PROJECTS) {
    assert.ok(p.myRole && p.myRole.trim().length > 0,
      `project "${p.id}" is missing the myRole field (recruiters need individual contribution clarity)`);
  }
});

test("links shape is valid and URLs are well-formed when present", () => {
  for (const p of PROJECTS) {
    assert.ok(p.links && typeof p.links === "object",
      `project "${p.id}" has no links object`);
    for (const key of ["github", "live", "demoVideo"]) {
      if (p.links[key]) {
        assert.match(p.links[key], /^https?:\/\//,
          `project "${p.id}" ${key} URL is malformed: "${p.links[key]}"`);
      }
    }
  }
});

test("the flagship (featured) project ships a live demo link", () => {
  const featured = PROJECTS.filter((p) => p.featured);
  assert.ok(featured.length >= 1, "expected at least one featured project");
  for (const p of featured) {
    assert.ok(p.links.live, `featured project "${p.id}" must expose a live demo URL`);
  }
});

test("banner and gallery images exist on disk", () => {
  for (const p of PROJECTS) {
    const banner = p.image && p.image.banner;
    assert.ok(banner, `project "${p.id}" missing image.banner`);
    assert.ok(fs.existsSync(path.join(ROOT, banner)),
      `project "${p.id}" banner not found on disk: ${banner}`);

    if (Array.isArray(p.gallery)) {
      for (const g of p.gallery) {
        assert.ok(fs.existsSync(path.join(ROOT, g.url)),
          `project "${p.id}" gallery image not found on disk: ${g.url}`);
      }
    }
  }
});
