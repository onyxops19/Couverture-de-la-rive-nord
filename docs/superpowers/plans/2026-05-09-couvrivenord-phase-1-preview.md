# Couverture de la Rive-Nord — Phase 1 Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static HTML/CSS/JS homepage preview at `preview/index.html` that renders the full Couverture de la Rive-Nord homepage with real client photos, a Pexels stock drone hero video, brand-correct gold/charcoal palette, and the spec's animation choreography. The deliverable is a single `.html` file the user can open in a browser to judge visual feel before committing to a Next.js port.

**Architecture:** Single-page static site. No build step. No framework. Pure HTML5 + CSS3 (custom properties for tokens) + vanilla JS (IntersectionObserver for scroll reveals, simple count-up for stats, mobile menu toggle). Google Fonts loaded via CDN. All assets local in `preview/assets/`.

**Tech Stack:**
- HTML5 semantic elements
- CSS custom properties (design tokens)
- IntersectionObserver API for scroll-triggered animations
- Vanilla ES6 JavaScript (no jQuery, no bundler)
- Google Fonts (Raleway 700, Open Sans 400/500/600)
- Git for version control (initialized in Task 1)

**Verification approach:** After each task, open `preview/index.html` in your default browser. Visually verify the section/feature added by that task. The plan calls out the specific check to perform.

**Out of scope for this plan:**
- Next.js scaffold (Phase 2)
- Other 6 pages (services, membranes, réalisations, contact, couvreur-laval, couvreur-montreal-nord) — Phase 2
- Form backend / email submission — Phase 2
- SEO metadata, sitemap, structured data — Phase 2
- Automated tests (Playwright etc.) — Phase 2
- Real APCHQ + Firestone logo files — using text-based badge blocks until client supplies

**Source spec:** `/Users/markbenyaminian/Desktop/Couverture de la rive nord /docs/superpowers/specs/2026-05-09-couvrivenord-site-design.md`

**Original visual identity spec:** `/Users/markbenyaminian/Desktop/design-spec-couvrivenord.md`

---

## File Structure

```
/Users/markbenyaminian/Desktop/Couverture de la rive nord /
├── .git/                                (Task 1)
├── .gitignore                           (Task 1)
├── README.md                            (Task 1)
├── images_site/                         (already populated, 19 real client images, source of truth — read-only)
├── docs/superpowers/
│   ├── specs/2026-05-09-couvrivenord-site-design.md   (already written)
│   └── plans/2026-05-09-couvrivenord-phase-1-preview.md   (this file)
└── preview/
    ├── index.html                       (Task 3 skeleton, populated through Task 15)
    ├── styles.css                       (Task 3 skeleton, populated through Task 16)
    ├── script.js                        (Task 3 skeleton, populated through Task 14)
    └── assets/
        ├── logo.jpg                     (Task 2 — copied from images_site/)
        ├── hero.mp4                     (Task 4 — Pexels stock drone footage)
        ├── services/                    (Task 2)
        │   ├── installation.jpg
        │   ├── reparation.jpg           (stand-in: realisation-04.jpg)
        │   ├── refection.jpg            (stand-in: realisation-05.jpg)
        │   ├── inspection.jpg           (stand-in: realisation-06.jpg)
        │   ├── entretien.jpg            (stand-in: realisation-07.jpg)
        │   ├── deneigement.jpg          (stand-in: realisation-08.jpg)
        │   └── autres.jpg               (stand-in: realisation-09.jpg)
        ├── membranes/                   (Task 2)
        │   ├── epdm.jpg
        │   └── tpo.jpg
        ├── team.png                     (Task 2)
        └── realisations/                (Task 2)
            ├── realisation-01.jpg
            ├── realisation-02.jpg
            ├── realisation-03.jpg
            ├── realisation-10.jpg
            ├── realisation-11.jpg
            └── realisation-12.jpg
```

**File responsibilities:**
- `index.html` — semantic markup, no inline styles. Class names follow BEM-lite: `.section`, `.section--hero`, `.btn`, `.btn--primary`, `.card`, `.card__title`, etc.
- `styles.css` — all design tokens (CSS custom properties under `:root`), section styles, component styles, responsive breakpoints. One file, organized top-down to match the page order.
- `script.js` — IntersectionObserver-based reveal logic, count-up stats, mobile menu toggle. ~150 lines max.
- All assets are flat-file in `preview/assets/`. The `images_site/` folder stays untouched as the source of truth.

---

## Task 1: Initialize git, project structure, and README

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Initialize: git repository at project root

- [ ] **Step 1: Initialize git in the project root**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
git init
```

Expected: `Initialized empty Git repository in /Users/markbenyaminian/Desktop/Couverture de la rive nord /.git/`

- [ ] **Step 2: Create `.gitignore`**

Create `/Users/markbenyaminian/Desktop/Couverture de la rive nord /.gitignore` with:

```
.DS_Store
Thumbs.db
node_modules/
.next/
.env*.local
*.log
.vscode/
.idea/
```

- [ ] **Step 3: Create `README.md`**

Create `/Users/markbenyaminian/Desktop/Couverture de la rive nord /README.md` with:

```markdown
# Couverture de la Rive-Nord — Marketing Website

Client website for Couverture de la Rive-Nord Inc., a Quebec roofing company specializing in white EPDM/TPO membranes for flat roofs.

## Status

- **Phase 1 (in progress):** Static HTML homepage preview at `preview/index.html`
- **Phase 2 (after Phase 1 sign-off):** Next.js 14 App Router production site

## Folders

- `preview/` — Phase 1 static HTML preview. Open `preview/index.html` in your browser.
- `images_site/` — Source-of-truth client images (do not modify)
- `docs/superpowers/specs/` — Design spec
- `docs/superpowers/plans/` — Implementation plans

## Spec

See `docs/superpowers/specs/2026-05-09-couvrivenord-site-design.md` for the full design spec.

## Original visual identity spec

`/Users/markbenyaminian/Desktop/design-spec-couvrivenord.md` (Onyx Solutions, May 2026) — visual identity, content, copy.
```

- [ ] **Step 4: Verify and commit**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
git status
git add .gitignore README.md docs/
git commit -m "chore: initialize repo, add .gitignore, README, and design spec"
```

Expected: One commit, clean working tree (the `images_site/` folder is intentionally not committed yet — see Task 2 step 5).

---

## Task 2: Set up `preview/assets/` and copy real client images

**Files:**
- Create: `preview/assets/logo.jpg`
- Create: `preview/assets/team.png`
- Create: `preview/assets/services/installation.jpg`
- Create: `preview/assets/services/reparation.jpg` (copy of `realisation-04.jpg`)
- Create: `preview/assets/services/refection.jpg` (copy of `realisation-05.jpg`)
- Create: `preview/assets/services/inspection.jpg` (copy of `realisation-06.jpg`)
- Create: `preview/assets/services/entretien.jpg` (copy of `realisation-07.jpg`)
- Create: `preview/assets/services/deneigement.jpg` (copy of `realisation-08.jpg`)
- Create: `preview/assets/services/autres.jpg` (copy of `realisation-09.jpg`)
- Create: `preview/assets/membranes/epdm.jpg`
- Create: `preview/assets/membranes/tpo.jpg`
- Create: `preview/assets/realisations/realisation-01.jpg` … `-03.jpg`, `-10.jpg`, `-11.jpg`, `-12.jpg` (6 photos for homepage gallery preview)

- [ ] **Step 1: Create the assets folder structure**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
mkdir -p preview/assets/services preview/assets/membranes preview/assets/realisations
```

- [ ] **Step 2: Copy logo, team, EPDM, TPO**

```bash
cp "images_site/couverture-de-la-rive-nord-logo.jpg" "preview/assets/logo.jpg"
cp "images_site/couverture-rive-nord-equipe.png" "preview/assets/team.png"
cp "images_site/Couverture-de-la-rive-nord-la-membrane-EPDM.jpg" "preview/assets/membranes/epdm.jpg"
cp "images_site/Couverture-de-la-rive-nord-la-membrane-TPO.jpg" "preview/assets/membranes/tpo.jpg"
```

- [ ] **Step 3: Copy installation + 6 service-card stand-ins from realizations**

```bash
cp "images_site/Couverture-de-la-rive-nord-installation-de-toiture.jpg" "preview/assets/services/installation.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-4.jpg"  "preview/assets/services/reparation.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-5.jpg"  "preview/assets/services/refection.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-6.jpg"  "preview/assets/services/inspection.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-7.jpg"  "preview/assets/services/entretien.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-8.jpg"  "preview/assets/services/deneigement.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-9.jpg"  "preview/assets/services/autres.jpg"
```

- [ ] **Step 4: Copy 6 realization photos for homepage gallery preview**

The homepage gallery preview shows 6 of the 12 (full 12-photo gallery is on the dedicated `/realisations` page in Phase 2). Pick a varied 6:

```bash
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-1.jpg"  "preview/assets/realisations/realisation-01.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-2.jpg"  "preview/assets/realisations/realisation-02.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-3.jpg"  "preview/assets/realisations/realisation-03.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-10.jpg" "preview/assets/realisations/realisation-10.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-11.jpg" "preview/assets/realisations/realisation-11.jpg"
cp "images_site/couverture-de-la-rive-nord-inc-logo-realisations-12.jpg" "preview/assets/realisations/realisation-12.jpg"
```

- [ ] **Step 5: Verify assets and commit**

```bash
ls preview/assets preview/assets/services preview/assets/membranes preview/assets/realisations
```

Expected output:
```
preview/assets:
logo.jpg  membranes  realisations  services  team.png

preview/assets/services:
autres.jpg  deneigement.jpg  entretien.jpg  inspection.jpg  installation.jpg  refection.jpg  reparation.jpg

preview/assets/membranes:
epdm.jpg  tpo.jpg

preview/assets/realisations:
realisation-01.jpg  realisation-02.jpg  realisation-03.jpg  realisation-10.jpg  realisation-11.jpg  realisation-12.jpg
```

Commit:
```bash
git add preview/assets images_site
git commit -m "chore: add real client images and copy into preview/assets"
```

(Yes, `images_site/` is committed too — it's the source of truth and small enough to track in git for now.)

---

## Task 3: Create base HTML, CSS, and JS skeleton

**Files:**
- Create: `preview/index.html`
- Create: `preview/styles.css`
- Create: `preview/script.js`

- [ ] **Step 1: Create `preview/index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="fr-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Couverture de la Rive-Nord — Couvreur à Laval et Montréal-Nord</title>
  <meta name="description" content="Compagnie de toiture à Laval et Montréal-Nord depuis plus de 23 ans. Spécialiste des membranes blanches EPDM et TPO pour toits plats. Membre APCHQ, certifié Firestone.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Raleway:wght@700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Top info bar (Task 5) -->

  <!-- Sticky nav (Task 6) -->

  <!-- Hero (Task 7) -->

  <!-- Value / slogan (Task 8) -->

  <!-- About / stats (Task 9) -->

  <!-- Services grid (Task 10) -->

  <!-- Inline CTA strip (Task 11) -->

  <!-- Membranes alternating (Task 12) -->

  <!-- Advantages (Task 13) -->

  <!-- Realizations preview (Task 14) -->

  <!-- Final CTA (Task 15) -->

  <!-- Footer (Task 15) -->

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `preview/styles.css` with design tokens**

```css
/* ============================================
   Design tokens
   ============================================ */
:root {
  /* Brand palette */
  --brand-charcoal: #2A2A2A;
  --brand-gold: #E9A828;
  --gold-hover: #F2B73E;
  --gold-active: #C68F1E;
  --white: #FFFFFF;
  --cream: #D9D9D9;
  --text-dark: #1A1A1A;
  --text-muted: #666666;
  --bg-light: #F8F8F8;
  --border: #E0E0E0;

  /* Typography */
  --font-display: 'Raleway', system-ui, sans-serif;
  --font-body: 'Open Sans', system-ui, sans-serif;

  /* Spacing scale (8px base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-12: 96px;

  /* Sizing */
  --container-max: 1200px;
  --container-pad-desktop: 60px;
  --container-pad-mobile: 20px;

  /* Easing */
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Durations */
  --dur-fast: 150ms;
  --dur-base: 200ms;
  --dur-slow: 600ms;
}

/* ============================================
   Reset / base
   ============================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  color: var(--text-dark);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

img, video { max-width: 100%; display: block; }

a { color: inherit; text-decoration: none; }

button { font: inherit; cursor: pointer; border: none; background: none; }

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.2;
  color: inherit;
}

/* ============================================
   Container
   ============================================ */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--container-pad-desktop);
  padding-right: var(--container-pad-desktop);
}

@media (max-width: 768px) {
  .container {
    padding-left: var(--container-pad-mobile);
    padding-right: var(--container-pad-mobile);
  }
}

/* ============================================
   Section base
   ============================================ */
.section {
  padding-top: var(--space-10);
  padding-bottom: var(--space-10);
}

.section--dark {
  background: var(--brand-charcoal);
  color: var(--white);
}

.section--light {
  background: var(--white);
  color: var(--text-dark);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
  }
}

/* ============================================
   Reveal animation utilities
   ============================================ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--dur-slow) var(--ease-out),
              transform var(--dur-slow) var(--ease-out);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================
   Reduced motion
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  .reveal { opacity: 1; }
}

/* ============================================
   Component styles below — added per task
   ============================================ */
```

- [ ] **Step 3: Create `preview/script.js` skeleton**

```javascript
// ============================================
// Reveal-on-scroll using IntersectionObserver
// ============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ============================================
// Stagger groups: items inside .stagger get sequential reveal delays
// ============================================
document.querySelectorAll('.stagger').forEach((group) => {
  group.querySelectorAll('.reveal').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
});
```

- [ ] **Step 4: Verify in browser**

Open `preview/index.html` in your default browser. Expected: blank page, no console errors. Fonts load (you can confirm in DevTools Network tab).

- [ ] **Step 5: Commit**

```bash
git add preview/
git commit -m "feat: add base HTML/CSS/JS skeleton with design tokens"
```

---

## Task 4: Source and download Pexels hero drone video

**Files:**
- Create: `preview/assets/hero.mp4`

This task involves the user picking a video. Don't auto-pick — the hero is the most important frame of the site.

- [ ] **Step 1: Search Pexels for candidates**

Use the WebFetch tool to retrieve `https://www.pexels.com/search/videos/aerial%20roof/` and extract 3 promising candidate video URLs. Looking for:
- Aerial/drone perspective on a roof or rooftop
- Clean, well-lit footage (avoid grainy, dim, or shaky)
- Loops well (no abrupt cuts to text or logos)
- 1080p+ if available

Alternative search terms if "aerial roof" returns weak results: `drone neighborhood`, `roof aerial view`, `flat roof aerial`.

- [ ] **Step 2: Present 3 candidates to user**

For each candidate, share:
- The Pexels page URL
- A 1-line description of what's visible
- Resolution / duration if available

Wait for the user to pick one (or to ask for more candidates).

- [ ] **Step 3: Download chosen video to `preview/assets/hero.mp4`**

Pexels video direct-download URLs are accessible without auth. Find the direct `.mp4` URL on the chosen video's page (usually in the page HTML as a `<source>` tag or under a "Free Download" button), then:

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord /preview/assets"
curl -L -o hero.mp4 "<direct mp4 url here>"
```

Verify file size (should be ~2-15 MB for a short loop):

```bash
ls -lh hero.mp4
```

- [ ] **Step 4: Verify the video**

Open `preview/assets/hero.mp4` directly in QuickTime / VLC. Confirm it plays cleanly and loops well. If the video has a visible Pexels watermark or unsuitable content, return to Step 2.

- [ ] **Step 5: Commit**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
git add preview/assets/hero.mp4
git commit -m "feat: add Pexels stock drone hero video as placeholder"
```

---

## Task 5: Build top info bar

**Files:**
- Modify: `preview/index.html` (replace the `<!-- Top info bar -->` comment)
- Modify: `preview/styles.css` (append component styles)

- [ ] **Step 1: Add the markup**

In `index.html`, replace `<!-- Top info bar (Task 5) -->` with:

```html
<div class="info-bar">
  <div class="container info-bar__inner">
    <a class="info-bar__phone" href="tel:+15148357617">+1 (514) 835-7617</a>
    <a class="info-bar__email" href="mailto:info@couverturerivenord.com">info@couverturerivenord.com</a>
  </div>
</div>
```

- [ ] **Step 2: Add the styles**

Append to `styles.css`:

```css
/* ============================================
   Top info bar
   ============================================ */
.info-bar {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
}

.info-bar__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.info-bar__phone, .info-bar__email {
  transition: color var(--dur-fast) var(--ease-out);
}

.info-bar__phone:hover, .info-bar__email:hover {
  color: var(--brand-gold);
}

@media (max-width: 640px) {
  .info-bar__email { display: none; }
  .info-bar__inner { justify-content: center; }
}
```

- [ ] **Step 3: Verify in browser**

Reload `preview/index.html`. Expected: a thin white bar at the top with phone left, email right. Hover either — color shifts to gold. On mobile width (<640px), email disappears, phone centers.

- [ ] **Step 4: Commit**

```bash
git add preview/index.html preview/styles.css
git commit -m "feat: add top info bar with phone and email"
```

---

## Task 6: Build sticky nav (desktop + mobile drawer)

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`
- Modify: `preview/script.js`

- [ ] **Step 1: Add the markup**

Replace `<!-- Sticky nav (Task 6) -->`:

```html
<nav class="nav" id="nav">
  <div class="container nav__inner">
    <a class="nav__logo" href="#top">
      <img src="assets/logo.jpg" alt="Couverture de la Rive-Nord" />
    </a>

    <button class="nav__toggle" id="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav__list" id="nav-list">
      <li><a href="#top">Accueil</a></li>
      <li><a href="#services">Nos services</a></li>
      <li><a href="#membranes">Nos membranes</a></li>
      <li><a href="#realisations">Nos réalisations</a></li>
      <li><a href="#contact">À propos</a></li>
      <li><a href="#contact">Contact</a></li>
      <li class="nav__cta-mobile"><a href="tel:+15148357617" class="btn btn--gold">+1 (514) 835-7617</a></li>
    </ul>

    <a href="tel:+15148357617" class="nav__phone-cta">+1 (514) 835-7617</a>
  </div>
</nav>
```

- [ ] **Step 2: Add nav styles**

Append to `styles.css`:

```css
/* ============================================
   Sticky nav
   ============================================ */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--brand-charcoal);
  color: var(--white);
  transition: box-shadow var(--dur-base) var(--ease-out);
}

.nav.is-scrolled {
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: var(--space-3);
}

.nav__logo img {
  height: 50px;
  width: auto;
}

.nav__list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav__list a {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  position: relative;
  padding: var(--space-1) 0;
}

.nav__list a::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: var(--brand-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-fast) var(--ease-out);
}

.nav__list a:hover::after { transform: scaleX(1); }

.nav__phone-cta {
  font-weight: 700;
  color: var(--brand-gold);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.nav__phone-cta:hover { color: var(--gold-hover); }

.nav__cta-mobile { display: none; }

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 32px;
  height: 32px;
  justify-content: center;
}

.nav__toggle span {
  display: block;
  height: 2px;
  background: var(--white);
  transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out);
}

/* Mobile */
@media (max-width: 900px) {
  .nav__phone-cta { display: none; }
  .nav__toggle { display: flex; }

  .nav__list {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 80%;
    max-width: 360px;
    background: var(--brand-charcoal);
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    padding: 100px var(--space-3) var(--space-3);
    transform: translateX(100%);
    transition: transform 250ms var(--ease-out);
    box-shadow: -4px 0 16px rgba(0,0,0,0.3);
  }

  .nav__list.is-open { transform: translateX(0); }

  .nav__list a {
    display: block;
    padding: var(--space-2) 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .nav__cta-mobile {
    display: block;
    margin-top: var(--space-3);
    border-bottom: none !important;
  }

  .nav__cta-mobile a {
    display: block;
    text-align: center;
    padding: var(--space-2);
  }

  .nav__toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__toggle.is-open span:nth-child(2) { opacity: 0; }
  .nav__toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
```

- [ ] **Step 3: Add the button base styles + gold variant** (used here and in many later tasks)

Append to `styles.css`:

```css
/* ============================================
   Buttons
   ============================================ */
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 2px;
  border: 2px solid transparent;
  transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              filter var(--dur-fast) var(--ease-out);
  text-align: center;
  cursor: pointer;
}

.btn:hover { transform: scale(1.02); filter: brightness(1.08); }
.btn:active { transform: scale(0.98); filter: brightness(0.92); }

.btn--gold {
  background: var(--brand-gold);
  color: var(--white);
}

.btn--gold:hover { background: var(--gold-hover); }
.btn--gold:active { background: var(--gold-active); }

.btn--outline-white {
  background: transparent;
  border-color: var(--white);
  color: var(--white);
}

.btn--outline-white:hover {
  background: var(--white);
  color: var(--text-dark);
}

.btn--outline-charcoal {
  background: transparent;
  border-color: var(--text-dark);
  color: var(--text-dark);
}

.btn--outline-charcoal:hover {
  background: var(--text-dark);
  color: var(--white);
}

.btn--charcoal {
  background: var(--brand-charcoal);
  color: var(--white);
}
```

- [ ] **Step 4: Add the nav JS**

Append to `script.js`:

```javascript
// ============================================
// Sticky nav: shadow on scroll + mobile toggle
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 80);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a link is clicked (mobile UX)
navList.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navList.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 5: Verify in browser**

Reload. Desktop: charcoal nav with logo top-left, links centered, gold phone number on right. Hover a link → gold underline animates in. Scroll down 100px → subtle shadow appears under nav. Mobile (resize <900px): hamburger appears top-right, click → drawer slides in from right with stacked links and phone CTA pinned in the drawer.

- [ ] **Step 6: Commit**

```bash
git add preview/
git commit -m "feat: add sticky nav with desktop links, hamburger drawer, button system"
```

---

## Task 7: Build hero section with video background

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Hero (Task 7) -->`:

```html
<section class="hero" id="top">
  <video class="hero__video" autoplay muted loop playsinline>
    <source src="assets/hero.mp4" type="video/mp4">
  </video>
  <div class="hero__overlay"></div>

  <div class="container hero__inner">
    <h1 class="hero__title reveal">
      Votre compagnie de toiture<br>
      à Laval et Montréal-Nord
    </h1>

    <p class="hero__sub reveal">
      Depuis plus de 23 ans, spécialiste des membranes blanches EPDM et TPO pour toits plats.
    </p>

    <div class="hero__badges reveal">
      <span class="badge">Membre APCHQ</span>
      <span class="badge-divider"></span>
      <span class="badge">Certifié Firestone</span>
    </div>

    <div class="hero__ctas reveal">
      <a href="tel:+15148357617" class="btn btn--outline-white">Appelez maintenant</a>
      <a href="#contact" class="btn btn--gold">Obtenir une soumission</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles**

Append to `styles.css`:

```css
/* ============================================
   Hero
   ============================================ */
.hero {
  position: relative;
  min-height: calc(100vh - 112px); /* viewport minus info bar + nav */
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--white);
}

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.hero__inner {
  position: relative;
  z-index: 2;
  text-align: center;
  padding-top: var(--space-10);
  padding-bottom: var(--space-10);
}

.hero__title {
  font-size: clamp(32px, 5.2vw, 60px);
  letter-spacing: -0.01em;
  margin-bottom: var(--space-3);
}

.hero__sub {
  font-size: clamp(16px, 1.4vw, 19px);
  font-weight: 400;
  max-width: 760px;
  margin: 0 auto var(--space-3);
  color: var(--cream);
}

.hero__badges {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-gold);
  margin-bottom: var(--space-4);
}

.badge { white-space: nowrap; }

.badge-divider {
  display: inline-block;
  width: 1px;
  height: 14px;
  background: var(--brand-gold);
}

.hero__ctas {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  flex-wrap: wrap;
}

/* Stagger entry delays */
.hero__title       { transition-delay: 0ms; }
.hero__sub         { transition-delay: 200ms; }
.hero__badges      { transition-delay: 400ms; }
.hero__ctas        { transition-delay: 600ms; }
```

- [ ] **Step 3: Trigger hero reveals on load (not on scroll)**

The hero is above the fold so it should reveal on `DOMContentLoaded`, not when scrolled into view. Modify `script.js` — add this **before** the existing `revealObserver` block:

```javascript
// ============================================
// Hero reveals on load (above the fold)
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('is-visible'));
});
```

The `revealObserver` query stays unchanged. The hero elements get `is-visible` on DOMContentLoaded; the IO observer is harmless on them because adding `is-visible` is idempotent (it's already there). No selector wizardry needed.

- [ ] **Step 4: Verify in browser**

Reload. Expected: hero fills viewport, drone video plays/loops/is muted, dark overlay sits over it, H1 centered (broken in two lines), sub-paragraph below, gold badges row "MEMBRE APCHQ | CERTIFIÉ FIRESTONE", two CTAs bottom — outline white "APPELEZ MAINTENANT" + gold "OBTENIR UNE SOUMISSION". On load, the four hero elements stagger fade-in (title first, CTAs last). On hover, gold button intensifies; outline button fills white.

- [ ] **Step 5: Commit**

```bash
git add preview/
git commit -m "feat: add hero with video bg, headline, badges, dual CTAs and stagger reveal"
```

---

## Task 8: Build value/slogan section

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Value / slogan (Task 8) -->`:

```html
<section class="section section--light">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">
      Qualité et fiabilité<br>
      sous un même toit !
    </h2>

    <p class="section__lead reveal">
      Depuis plus de 23 ans, Couverture de la Rive-Nord est une compagnie de toiture à Laval et à Montréal-Nord qui se spécialise dans les membranes blanches EPDM et TPO pour les toits plats et les toitures neuves. Véritable partenaire par excellence pour votre toiture, Couverture de la Rive-Nord œuvre dans le secteur résidentiel et commercial pour tous vos besoins de toiture. Notre équipe agit avec professionnalisme, minutie et courtoisie tout en vous proposant les produits les plus qualitatifs, durables et écologiques du marché.
    </p>

    <p class="section__inline-cta reveal">
      <a href="#services" class="link-arrow">En savoir plus sur nos services <span aria-hidden="true">&rarr;</span></a>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Section title + lead (reused across sections)
   ============================================ */
.section__title {
  font-size: clamp(28px, 3.4vw, 40px);
  margin-bottom: var(--space-3);
}

.section__title--centered { text-align: center; }

.section__lead {
  max-width: 820px;
  margin: 0 auto var(--space-3);
  font-size: 17px;
  line-height: 1.7;
}

.section--dark .section__lead { color: var(--cream); }

.section__inline-cta {
  text-align: center;
  margin-top: var(--space-3);
}

.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-weight: 600;
  color: var(--brand-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 14px;
}

.link-arrow span {
  display: inline-block;
  transition: transform var(--dur-base) var(--ease-out);
}

.link-arrow:hover span { transform: translateX(4px); }
```

- [ ] **Step 3: Verify in browser**

Reload, scroll to the value section. Expected: white section, centered H2 broken at the comma, lead paragraph (left-aligned within the centered container), gold "EN SAVOIR PLUS SUR NOS SERVICES →" link below. Each element fades+slides in independently as it enters viewport. Hovering the link nudges the arrow 4px right.

- [ ] **Step 4: Commit**

```bash
git add preview/
git commit -m "feat: add value/slogan section with section__title, lead, and link-arrow components"
```

---

## Task 9: Build about / stats section with count-up

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`
- Modify: `preview/script.js`

- [ ] **Step 1: Add the markup**

Replace `<!-- About / stats (Task 9) -->`:

```html
<section class="section section--dark">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">
      Plus de 23 ans<br>
      au service de votre toiture
    </h2>

    <p class="section__lead reveal">
      Recommandé par l'APCHQ et certifié Firestone (garantie fabricant jusqu'à 30 ans), Couverture de la Rive-Nord œuvre depuis 23 ans à Laval, Montréal-Nord, Terrebonne et la Rive-Nord. Résidentiel comme commercial, notre équipe installe des membranes blanches durables, écologiques et rentables.
    </p>

    <ul class="stats stagger">
      <li class="stat reveal">
        <span class="stat__num" data-count-to="23" data-suffix="+">0</span>
        <span class="stat__label">Années d'expérience</span>
      </li>
      <li class="stat reveal">
        <span class="stat__num" data-count-to="50" data-suffix=" ans">0</span>
        <span class="stat__label">Durée de vie membrane EPDM</span>
      </li>
      <li class="stat reveal">
        <span class="stat__num" data-count-to="30" data-suffix=" ans">0</span>
        <span class="stat__label">Garantie fabricant Firestone</span>
      </li>
    </ul>

    <div class="cert-badges reveal">
      <span class="cert-badge">APCHQ</span>
      <span class="cert-badge">CERTIFIÉ FIRESTONE</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Stats
   ============================================ */
.stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin: var(--space-6) auto var(--space-4);
  max-width: 900px;
  text-align: center;
}

.stat__num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(42px, 5vw, 56px);
  font-weight: 700;
  color: var(--brand-gold);
  line-height: 1;
}

.stat__label {
  display: block;
  margin-top: var(--space-1);
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--cream);
}

@media (max-width: 768px) {
  .stats { grid-template-columns: 1fr; gap: var(--space-4); }
}

/* ============================================
   Cert badges (text-based, until real logos arrive)
   ============================================ */
.cert-badges {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-4);
}

.cert-badge {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid var(--brand-gold);
  border-bottom-width: 2px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--white);
}
```

- [ ] **Step 3: Add count-up JS**

Append to `script.js`:

```javascript
// ============================================
// Count-up stats: animate 0 → target when scrolled into view
// ============================================
function countUp(el) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count-to]').forEach((el) => countObserver.observe(el));
```

- [ ] **Step 4: Verify in browser**

Reload, scroll to the about section. Expected: dark charcoal section, centered H2 broken at the line, lead paragraph in cream, three big gold numbers in a row (`23+`, `50 ans`, `30 ans`) — they animate from 0 to target when they scroll into view, ~1.5s. Below: two cert-badge boxes "APCHQ" and "CERTIFIÉ FIRESTONE" with thin gold rules. Mobile (resize <768px): stats stack vertically.

- [ ] **Step 5: Commit**

```bash
git add preview/
git commit -m "feat: add about section with stats count-up and cert badges"
```

---

## Task 10: Build services grid (7 cards)

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Services grid (Task 10) -->`:

```html
<section class="section section--light" id="services">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">
      Nos services de toiture<br>
      à Laval et Montréal-Nord
    </h2>

    <p class="section__lead reveal">
      Expert en toiture à Laval et à Montréal-Nord, Couverture de la Rive-Nord offre des services complets pour répondre à l'ensemble de vos besoins pour votre toiture. Avec notre compagnie de toiture, vous pourrez profiter d'un partenaire à long terme qui vous offrira en tout temps un service d'une qualité inégalée.
    </p>

    <ul class="cards stagger">
      <li class="card reveal">
        <img class="card__img" src="assets/services/installation.jpg" alt="Installation de toiture">
        <div class="card__body">
          <h3 class="card__title">L'installation</h3>
          <p class="card__text">Toits plats et toitures neuves : membranes EPDM, TPO, ou bardeaux d'asphalte. Une installation de qualité avec des produits écologiques et durables.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/reparation.jpg" alt="Réparation de toiture">
        <div class="card__body">
          <h3 class="card__title">La réparation</h3>
          <p class="card__text">Infiltration d'eau, moisissure, humidité ? Intervention rapide pour stopper les dommages avant qu'ils s'aggravent.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/refection.jpg" alt="Réfection de toiture">
        <div class="card__body">
          <h3 class="card__title">La réfection</h3>
          <p class="card__text">Toiture défectueuse, fuites, perte d'efficacité ? Remplacement complet avec membranes blanches EPDM ou TPO de haute qualité.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/inspection.jpg" alt="Inspection de toiture">
        <div class="card__body">
          <h3 class="card__title">L'inspection</h3>
          <p class="card__text">Inspections préventives annuelles par une équipe équipée pour le travail en hauteur. Plus tôt vous repérez un défaut, moins la réparation coûte.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/entretien.jpg" alt="Entretien de toiture">
        <div class="card__body">
          <h3 class="card__title">L'entretien</h3>
          <p class="card__text">Entretien annuel pour éviter les dégradations causées par les intempéries québécoises. Un partenaire sur le long terme.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/deneigement.jpg" alt="Déneigement de toiture">
        <div class="card__body">
          <h3 class="card__title">Le déneigement</h3>
          <p class="card__text">Équipement professionnel pour déneiger votre toit de manière sécuritaire. Évitez infiltrations d'eau et fléchissement de la charpente.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>

      <li class="card reveal">
        <img class="card__img" src="assets/services/autres.jpg" alt="Autres services">
        <div class="card__body">
          <h3 class="card__title">Autres services</h3>
          <p class="card__text">Nettoyage de gouttières, inspection et nettoyage de drains, calfeutrage, travaux avec nacelle, installation de lumières de Noël.</p>
          <span class="card__link">En savoir plus <span aria-hidden="true">&rarr;</span></span>
        </div>
      </li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Service cards grid
   ============================================ */
.cards {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-6);
}

@media (max-width: 992px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}

.card {
  background: var(--white);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color var(--dur-base) var(--ease-out);
}

.card:hover { border-color: var(--brand-gold); }

.card__img {
  aspect-ratio: 16 / 10;
  object-fit: cover;
  width: 100%;
  height: auto;
}

.card__body {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.card__title {
  font-size: 22px;
  margin-bottom: var(--space-1);
}

.card__text {
  font-size: 15px;
  color: var(--text-muted);
  flex: 1;
  margin-bottom: var(--space-2);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand-gold);
  margin-top: auto;
  cursor: pointer;
}

.card__link span {
  display: inline-block;
  transition: transform var(--dur-base) var(--ease-out);
}

.card:hover .card__link span { transform: translateX(4px); }
```

- [ ] **Step 3: Verify in browser**

Reload, scroll to services. Expected: white section, centered H2, lead paragraph, then a 3-column grid of 7 cards (last card sits alone on its own row, that's fine — or wraps to 2/2/2/1 depending on width). Each card shows a real photo (16:10 ratio), title, short description, gold "EN SAVOIR PLUS →" link. Cards stagger fade-in 100ms apart as they enter viewport. Hover a card: thin gold border appears, arrow nudges 4px right. Mobile: cards single-column.

- [ ] **Step 4: Commit**

```bash
git add preview/
git commit -m "feat: add services grid with 7 cards, hover micro-interactions, responsive"
```

---

## Task 11: Build inline CTA strip (gold burst between services and membranes)

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Inline CTA strip (Task 11) -->`:

```html
<section class="cta-strip">
  <div class="container cta-strip__inner reveal">
    <p class="cta-strip__text">
      Votre toiture mérite un expert — obtenez une soumission gratuite aujourd'hui !
    </p>
    <a href="#contact" class="btn btn--charcoal">Obtenir une soumission</a>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Inline CTA strip — intentional gold burst
   ============================================ */
.cta-strip {
  background: var(--brand-gold);
  color: var(--text-dark);
  padding: var(--space-4) 0;
}

.cta-strip__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.cta-strip__text {
  font-family: var(--font-display);
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  flex: 1;
  min-width: 280px;
}

@media (max-width: 700px) {
  .cta-strip__inner { flex-direction: column; text-align: center; }
}
```

- [ ] **Step 3: Verify in browser**

Reload. Between the services section and (eventually) the membranes section: a gold horizontal strip with bold text left and a charcoal button right. The button hovers cleanly (charcoal stays charcoal, slight scale). The strip fades in as it scrolls into view. Mobile: stacks vertically, centered.

- [ ] **Step 4: Commit**

```bash
git add preview/
git commit -m "feat: add inline gold CTA strip between services and membranes"
```

---

## Task 12: Build membranes alternating section (EPDM + TPO)

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Membranes alternating (Task 12) -->`:

```html
<section class="section section--dark" id="membranes">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">
      Notre spécialité :<br>
      la membrane blanche
    </h2>

    <p class="section__lead reveal">
      Expert en toiture à membrane blanche depuis plus de 15 ans, Couverture de la Rive-Nord vous propose les meilleurs produits pour les toits plats. Entre la membrane EPDM et la membrane TPO, deux options écologiques, durables et avec un excellent retour sur investissement. Une membrane blanche lutte contre les îlots de chaleur et résiste aux températures extrêmes du Québec.
    </p>

    <div class="membrane reveal">
      <div class="membrane__media">
        <img src="assets/membranes/epdm.jpg" alt="Membrane EPDM blanche">
      </div>
      <div class="membrane__body">
        <h3 class="membrane__title">Membrane EPDM</h3>
        <p>Caoutchouc synthétique monocouche. Durée de vie jusqu'à <strong>50 ans</strong> avec entretien régulier. Excellente résistance aux UV, aux températures extrêmes et à l'oxydation.</p>
        <p>La couleur blanche reflète les rayons solaires, réduit la consommation énergétique et évite les îlots de chaleur. Entièrement écologique et recyclable.</p>
      </div>
    </div>

    <div class="membrane membrane--reverse reveal">
      <div class="membrane__media">
        <img src="assets/membranes/tpo.jpg" alt="Membrane TPO blanche">
      </div>
      <div class="membrane__body">
        <h3 class="membrane__title">Membrane TPO</h3>
        <p>Thermoplastique polyoléfine monocouche. Durée de vie ~<strong>40 ans</strong>, moins d'entretien que l'EPDM. Résistante au soleil, aux températures extrêmes, aux bactéries et aux insectes.</p>
        <p>Sans substance chimique, sans halogène, sans plastifiant. Solution moins dispendieuse que les revêtements traditionnels, sans compromis sur la qualité ou la durabilité.</p>
      </div>
    </div>

    <div class="membrane__cta reveal">
      <a href="#realisations" class="btn btn--gold">Voir nos réalisations</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Membranes — alternating image/text blocks
   ============================================ */
.membrane {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  align-items: center;
  margin-top: var(--space-8);
}

.membrane--reverse .membrane__media { order: 2; }

.membrane__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.membrane__title {
  font-size: clamp(24px, 2.4vw, 30px);
  margin-bottom: var(--space-2);
  color: var(--brand-gold);
}

.membrane__body p {
  margin-bottom: var(--space-2);
  color: var(--cream);
}

.membrane__body strong {
  color: var(--white);
  font-weight: 700;
}

.membrane__cta {
  text-align: center;
  margin-top: var(--space-8);
}

@media (max-width: 768px) {
  .membrane {
    grid-template-columns: 1fr;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }
  .membrane--reverse .membrane__media { order: 0; }
}
```

- [ ] **Step 3: Verify in browser**

Reload, scroll to membranes. Expected: dark charcoal section, centered H2, lead paragraph in cream. Then the EPDM block: image left (~50% width), text right with gold "Membrane EPDM" heading and two paragraphs. Then the TPO block: text left, image right (alternated). Then a centered gold "VOIR NOS RÉALISATIONS" button. Each block fades+slides in independently. Mobile: blocks stack image-then-text every time.

- [ ] **Step 4: Commit**

```bash
git add preview/
git commit -m "feat: add membranes section with EPDM and TPO alternating blocks"
```

---

## Task 13: Build advantages section (3 columns with icons)

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Advantages (Task 13) -->`:

```html
<section class="section section--dark">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">
      Pourquoi choisir<br>
      Couverture de la Rive-Nord ?
    </h2>

    <ul class="advantages stagger">
      <li class="advantage reveal">
        <svg class="advantage__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 32 L32 12 L56 32"/>
          <path d="M14 30 V52 H50 V30"/>
          <path d="M28 52 V40 H36 V52"/>
        </svg>
        <h3 class="advantage__title">Un service exceptionnel</h3>
        <p>De l'identification de vos besoins jusqu'à la fin de vos travaux, notre équipe est à votre écoute et disponible tout le long de vos projets.</p>
      </li>

      <li class="advantage reveal">
        <svg class="advantage__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="26" r="14"/>
          <path d="M22 38 L18 56 L32 48 L46 56 L42 38"/>
          <path d="M27 26 L31 30 L38 22"/>
        </svg>
        <h3 class="advantage__title">Une équipe compétente</h3>
        <p>Plus de 23 ans d'expérience. Nos couvreurs réalisent tous vos projets avec passion, professionnalisme et minutie.</p>
      </li>

      <li class="advantage reveal">
        <svg class="advantage__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="32" y1="8" x2="32" y2="56"/>
          <path d="M44 18 H26 a6 6 0 0 0 0 12 h12 a6 6 0 0 1 0 12 H20"/>
        </svg>
        <h3 class="advantage__title">Des prix compétitifs</h3>
        <p>Un excellent rapport qualité/prix, autant pour nos services que pour nos matériaux. Soumission gratuite, sans engagement.</p>
      </li>
    </ul>

    <div class="advantages__ctas reveal">
      <a href="#contact" class="btn btn--outline-white">Couvreur Laval</a>
      <a href="#contact" class="btn btn--outline-white">Couvreur Montréal-Nord</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Advantages
   ============================================ */
.advantages {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin: var(--space-8) auto var(--space-6);
  max-width: 1000px;
}

@media (max-width: 768px) {
  .advantages { grid-template-columns: 1fr; gap: var(--space-4); }
}

.advantage {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.advantage__icon {
  width: 64px;
  height: 64px;
  color: var(--brand-gold);
  margin-bottom: var(--space-2);
  transition: transform var(--dur-base) var(--ease-out);
}

.advantage:hover .advantage__icon { transform: scale(1.05); }

.advantage__title {
  font-size: 22px;
  margin-bottom: var(--space-1);
  color: var(--white);
}

.advantage p {
  color: var(--cream);
  font-size: 15px;
}

.advantages__ctas {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-top: var(--space-4);
}
```

- [ ] **Step 3: Verify in browser**

Reload, scroll to advantages. Expected: dark charcoal section, centered H2, three columns each with a gold outline-style icon (house, medal, dollar), white H3, cream body text. Below: two outline-white buttons "COUVREUR LAVAL" and "COUVREUR MONTRÉAL-NORD". Cards stagger fade-in 100ms apart. Hover an icon → it scales to 1.05. Mobile: columns stack.

- [ ] **Step 4: Commit**

```bash
git add preview/
git commit -m "feat: add advantages section with 3 columns, inline SVG icons, geo CTAs"
```

---

## Task 14: Build realizations preview gallery

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the markup**

Replace `<!-- Realizations preview (Task 14) -->`:

```html
<section class="section section--light" id="realisations">
  <div class="container">
    <h2 class="section__title section__title--centered reveal">Nos réalisations</h2>
    <p class="section__lead section__lead--short reveal">Voyez notre travail en images.</p>

    <ul class="gallery stagger">
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-01.jpg" alt="Réalisation 01 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-02.jpg" alt="Réalisation 02 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-03.jpg" alt="Réalisation 03 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-10.jpg" alt="Réalisation 10 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-11.jpg" alt="Réalisation 11 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
      <li class="gallery__item reveal">
        <img src="assets/realisations/realisation-12.jpg" alt="Réalisation 12 — toiture à membrane blanche">
        <span class="gallery__overlay" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
        </span>
      </li>
    </ul>

    <p class="gallery__cta reveal">
      <a href="#realisations" class="link-arrow">Voir toutes nos réalisations <span aria-hidden="true">&rarr;</span></a>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Realizations gallery
   ============================================ */
.section__lead--short { max-width: 540px; text-align: center; }

.gallery {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-1);
  margin: var(--space-6) 0 var(--space-4);
}

.gallery__item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  cursor: pointer;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-base) var(--ease-out);
}

.gallery__item:hover img { transform: scale(1.04); }

.gallery__overlay {
  position: absolute;
  inset: 0;
  background: rgba(42, 42, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out);
}

.gallery__item:hover .gallery__overlay { opacity: 1; }

.gallery__cta { text-align: center; }

@media (max-width: 700px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
}

/* Override: gallery items use 80ms stagger instead of 100ms (per spec) */
.gallery.stagger .reveal:nth-child(1) { transition-delay: 0ms; }
.gallery.stagger .reveal:nth-child(2) { transition-delay: 80ms; }
.gallery.stagger .reveal:nth-child(3) { transition-delay: 160ms; }
.gallery.stagger .reveal:nth-child(4) { transition-delay: 240ms; }
.gallery.stagger .reveal:nth-child(5) { transition-delay: 320ms; }
.gallery.stagger .reveal:nth-child(6) { transition-delay: 400ms; }
```

- [ ] **Step 3: Update script.js to skip overriding stagger delays for `.gallery`**

The skeleton script in Task 3 sets `transitionDelay = i * 100ms` for any `.stagger`. The gallery uses 80ms (per spec). Update `script.js`:

Find:
```javascript
document.querySelectorAll('.stagger').forEach((group) => {
  group.querySelectorAll('.reveal').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
});
```

Replace with:
```javascript
document.querySelectorAll('.stagger').forEach((group) => {
  // Skip groups that define their own stagger in CSS
  if (group.classList.contains('gallery')) return;
  group.querySelectorAll('.reveal').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
});
```

- [ ] **Step 4: Verify in browser**

Reload, scroll to realizations. Expected: white section, centered H2 "Nos réalisations" + short sub-line "Voyez notre travail en images." Below: 3-col grid of 6 real client roof photos (4:3 ratio, tightly spaced 8px gap). Hover a thumb: image scales 1.04, dark charcoal overlay fades in with a white loupe icon centered. Items stagger fade-in 80ms apart. Below grid: gold "VOIR TOUTES NOS RÉALISATIONS →" link. Mobile: 2-col grid.

- [ ] **Step 5: Commit**

```bash
git add preview/
git commit -m "feat: add realizations gallery preview with hover overlays and 80ms stagger"
```

---

## Task 15: Build final CTA + footer

**Files:**
- Modify: `preview/index.html`
- Modify: `preview/styles.css`

- [ ] **Step 1: Add the final CTA markup**

Replace `<!-- Final CTA (Task 15) -->`:

```html
<section class="section section--dark final-cta" id="contact">
  <div class="container final-cta__inner reveal">
    <h2 class="final-cta__title">Besoin d'un couvreur à Laval ou Montréal-Nord ?</h2>
    <p class="final-cta__sub">Contactez-nous dès aujourd'hui pour une soumission gratuite.</p>
    <a href="tel:+15148357617" class="btn btn--gold final-cta__btn">Obtenir une soumission gratuite !</a>
  </div>
</section>
```

- [ ] **Step 2: Add the footer markup**

Replace `<!-- Footer (Task 15) -->`:

```html
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__col">
      <a class="footer__logo" href="#top">
        <img src="assets/logo.jpg" alt="Couverture de la Rive-Nord" />
      </a>

      <div class="footer__certs">
        <span class="cert-badge">APCHQ</span>
        <span class="cert-badge">CERTIFIÉ FIRESTONE</span>
      </div>

      <address class="footer__address">
        3776 Rue Georges Corbeil<br>
        Terrebonne, QC, J6X 4J5
      </address>

      <ul class="footer__contact">
        <li><a href="tel:+15148357617">+1 (514) 835-7617</a></li>
        <li><a href="mailto:info@couverturerivenord.com">info@couverturerivenord.com</a></li>
        <li><a href="https://fr-ca.facebook.com/CouvertureRiveNord/" target="_blank" rel="noopener">Facebook</a></li>
      </ul>
    </div>

    <div class="footer__col">
      <h4 class="footer__heading">Liens rapides</h4>
      <ul class="footer__links">
        <li><a href="#services">Nos services</a></li>
        <li><a href="#membranes">Nos membranes</a></li>
        <li><a href="#realisations">Nos réalisations</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div class="footer__col">
      <h4 class="footer__heading">Zones desservies</h4>
      <ul class="footer__links">
        <li>Laval</li>
        <li>Montréal-Nord</li>
        <li>Terrebonne</li>
        <li>Rive-Nord</li>
      </ul>
    </div>
  </div>

  <div class="footer__copyright">
    <div class="container">
      © 2026 Couverture de la Rive-Nord Inc. — Tous droits réservés
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Add styles**

Append to `styles.css`:

```css
/* ============================================
   Final CTA
   ============================================ */
.final-cta__inner { text-align: center; }

.final-cta__title {
  font-size: clamp(28px, 3.4vw, 38px);
  margin-bottom: var(--space-2);
  color: var(--white);
}

.final-cta__sub {
  color: var(--cream);
  font-size: 17px;
  margin-bottom: var(--space-4);
}

.final-cta__btn {
  font-size: 16px;
  padding: 18px 40px;
}

/* ============================================
   Footer
   ============================================ */
.footer {
  background: var(--brand-charcoal);
  color: var(--cream);
  padding-top: var(--space-8);
}

.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-6);
  padding-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .footer__inner { grid-template-columns: 1fr; gap: var(--space-4); }
}

.footer__logo img {
  height: 60px;
  width: auto;
  margin-bottom: var(--space-3);
}

.footer__certs {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.footer__address {
  font-style: normal;
  margin-bottom: var(--space-2);
  font-size: 14px;
}

.footer__contact {
  list-style: none;
  font-size: 14px;
}

.footer__contact li { margin-bottom: var(--space-1); }

.footer__contact a:hover { color: var(--brand-gold); }

.footer__heading {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: var(--space-2);
}

.footer__links {
  list-style: none;
  font-size: 14px;
}

.footer__links li { margin-bottom: var(--space-1); }

.footer__links a:hover { color: var(--brand-gold); }

.footer__copyright {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: var(--space-3) 0;
  font-size: 13px;
  color: var(--text-muted);
  text-align: center;
}
```

- [ ] **Step 4: Verify in browser**

Reload, scroll to the bottom. Expected: dark final-CTA section with bold white H2, cream sub-line, big gold button. Then the footer (also dark): three columns (logo + cert badges + address + contacts | quick links | service zones), then a thin divider with the centered copyright line. Mobile: footer stacks single-column.

- [ ] **Step 5: Commit**

```bash
git add preview/
git commit -m "feat: add final CTA section and footer with logo, certs, address, links, zones"
```

---

## Task 16: Reduced-motion compliance check

**Files:**
- Verify: `preview/styles.css` (already includes the rule from Task 3, just verify it works)

- [ ] **Step 1: Test with reduced-motion preference enabled**

In Chrome DevTools: Cmd+Shift+P → "Show Rendering" → set "Emulate CSS media feature prefers-reduced-motion" to `reduce`.

- [ ] **Step 2: Reload and verify**

Reload `preview/index.html`. Expected: all elements appear immediately (no fade, no slide, no scale, no count-up animation). Specifically:
- Hero text appears at full opacity instantly on load (no stagger)
- Scrolling through sections shows everything already visible
- Hovering buttons doesn't scale them
- Stats numbers appear at their final values immediately

- [ ] **Step 3: Restore the rendering setting and re-verify normal animations work**

Set "Emulate CSS media feature prefers-reduced-motion" back to "no preference". Reload. Animations should fire normally again.

- [ ] **Step 4: Commit (no code changes — verification only)**

No commit needed unless step 1-2 reveal a missed animation that wasn't caught by the global `prefers-reduced-motion` rule. If any animation persists with reduced-motion enabled, find the offending CSS rule and add it to the override block, then commit.

---

## Task 17: Responsive QA across breakpoints

**Files:**
- Verify: rendering at desktop (1440px), laptop (1200px), tablet (768px), mobile (375px)

- [ ] **Step 1: Desktop (1440px width)**

In Chrome DevTools, set device toolbar to 1440 × 900. Reload. Expected:
- Two-tier nav (info bar + sticky nav) both fully visible
- Hero fills viewport
- Services grid is 3 columns
- Membranes blocks are alternating 2-column (image left/right)
- Advantages 3 columns
- Gallery 3 columns
- Footer 3 columns

- [ ] **Step 2: Laptop (1200px width)**

Set device toolbar to 1200 × 800. Same as desktop but with slightly tighter spacing — confirm no overflow, no text cropped, no overlapping elements.

- [ ] **Step 3: Tablet (768px width)**

Set to 768 × 1024. Expected:
- Info bar email may hide (depends on rule), phone visible
- Nav drops to hamburger
- Hero text scales down (clamp)
- Services grid 2 columns
- Membranes stack vertically
- Advantages stack vertically
- Gallery 2 columns
- Footer stacks vertically

- [ ] **Step 4: Mobile (375px width)**

Set to 375 × 667. Expected:
- Info bar shows phone only (centered)
- Hamburger nav, drawer slides in from right when tapped
- Hero text fits without horizontal scroll
- Services grid 1 column
- Stats stack vertically
- Membranes stack vertically
- Advantages stack vertically
- Gallery 2 columns (stays at 2, not 1)
- Footer stacks vertically
- All buttons touch-friendly (≥44px tall)

- [ ] **Step 5: Fix any issues found**

If any breakpoint breaks (overflow, cropped text, broken layout), open `styles.css` and fix the relevant section. Re-test at the failing breakpoint until clean.

- [ ] **Step 6: Commit fixes**

If any fixes were needed:
```bash
git add preview/styles.css
git commit -m "fix: responsive adjustments for <breakpoints fixed>"
```

If no fixes needed: skip commit.

---

## Task 18: Cross-browser smoke test

- [ ] **Step 1: Test in Chrome**

Already done throughout. Final smoke: hard reload (Cmd+Shift+R) and walk through the full page top-to-bottom. No console errors, video plays, all animations fire, all images load.

- [ ] **Step 2: Test in Safari**

Open `preview/index.html` in Safari. Pay special attention to:
- Video autoplay (Safari requires `muted` and `playsinline` — both already in markup)
- `aspect-ratio` CSS property (Safari 15+ — confirm with `Sys ver`)
- `clamp()` typography
- IntersectionObserver firing

- [ ] **Step 3: Test in Firefox**

Open `preview/index.html` in Firefox. Same walkthrough. Expected: identical to Chrome.

- [ ] **Step 4: Document any browser-specific bugs**

If a browser shows different behavior, document the bug. Most likely candidates:
- Safari: autoplay restrictions — confirm video has `muted` attribute (it does in our markup)
- Firefox: subtle font-rendering differences (acceptable, not a bug)

If any actual bug appears, fix it with a targeted CSS rule and commit:
```bash
git add preview/styles.css
git commit -m "fix: <browser>-specific rendering issue with <feature>"
```

---

## Task 19: Final walkthrough and sign-off prep

- [ ] **Step 1: Open `preview/index.html` in default browser, in fullscreen**

Walk through the entire page top-to-bottom:
- [ ] Top info bar with phone + email
- [ ] Sticky charcoal nav with logo, links, gold phone CTA on desktop
- [ ] Hero: video plays, 4 elements stagger fade-in, dual CTAs work
- [ ] Value section: H2 broken at line, lead paragraph, gold link arrow
- [ ] About: H2, lead, three stats count up from 0, two cert badges
- [ ] Services: 7 cards in 3-col grid, hover shows gold border + arrow nudge
- [ ] Inline CTA strip: gold strip with charcoal button burst
- [ ] Membranes: EPDM block (image left), TPO block (image right), gold "VOIR NOS RÉALISATIONS"
- [ ] Advantages: 3 columns, gold SVG icons, hover scale, dual outline CTAs
- [ ] Realizations: 3-col gallery of 6 real photos, hover overlay with loupe
- [ ] Final CTA: dark section, gold "OBTENIR UNE SOUMISSION GRATUITE !"
- [ ] Footer: 3 columns, copyright line

- [ ] **Step 2: Test mobile in DevTools (375px)**

Walk through again at mobile width. Hamburger menu opens, all sections stack cleanly, all buttons tap-friendly, no horizontal scroll.

- [ ] **Step 3: Test reduced-motion**

Toggle reduced-motion on, reload, walk through. Everything visible immediately, no animations.

- [ ] **Step 4: Verify console**

DevTools Console — should be completely clean. No errors, no warnings about missing assets.

- [ ] **Step 5: Take screenshots for client review**

Use the browser's "Save full page as image" or scroll-screenshot tool. Save to:
```
docs/superpowers/screenshots/2026-05-09-preview-desktop.png
docs/superpowers/screenshots/2026-05-09-preview-mobile.png
```

```bash
mkdir -p "/Users/markbenyaminian/Desktop/Couverture de la rive nord /docs/superpowers/screenshots"
```

- [ ] **Step 6: Commit screenshots and tag the preview**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
git add docs/superpowers/screenshots/
git commit -m "docs: add Phase 1 preview screenshots for client review"
git tag phase-1-preview-v1
```

- [ ] **Step 7: Tell the user the preview is ready**

Output:
> "Phase 1 preview ready at `preview/index.html`. Open it in your browser and walk through. Things to give feedback on: animation pacing, copy nuances, hero video choice, color hierarchy. When you sign off, I'll start Phase 2 (Next.js port). If you want changes, list them and I'll iterate before Phase 2."

---

## Self-Review Checklist (run after writing this plan)

✅ **Spec coverage:** Every section in the source spec's homepage component map (12 blocks) has a task: info bar (T5), nav (T6), hero (T7), value (T8), about/stats (T9), services (T10), inline CTA (T11), membranes (T12), advantages (T13), gallery (T14), final CTA (T15), footer (T15). Animations covered T7-T14. Reduced-motion T16. Responsive T17. Cross-browser T18. Final QA T19.

✅ **Placeholder scan:** No "TBD", "implement later", "fill in details". Every code step shows the full code. Every CSS rule defined. Every HTML structure complete.

✅ **Type consistency:** Class names consistent throughout: `.section`, `.section--dark`/`--light`, `.btn`, `.btn--gold`/`--outline-white`/`--outline-charcoal`/`--charcoal`, `.card`, `.card__title`, `.reveal`, `.stagger`, `.section__title`, `.section__lead`. CSS variables defined once in `:root` and reused. JS handles match HTML IDs (`#nav`, `#nav-toggle`, `#nav-list`).

✅ **Out of scope is explicit:** Phase 2 (Next.js, other 6 pages, form backend, SEO, automated tests) clearly deferred. APCHQ/Firestone real logos clearly deferred.

---

## Phase 2 Plan (deferred)

After Phase 1 sign-off, write a separate plan at `docs/superpowers/plans/<later-date>-couvrivenord-phase-2-nextjs.md` covering:
- Next.js 14 App Router scaffold
- Component extraction from `preview/index.html`
- Routing for 7 pages
- Contact form server action with email backend
- SEO metadata, sitemap, robots, LocalBusiness schema
- Image optimization with `next/image`
- Vercel deploy
- (Optional) Playwright tests matching the VENCOAC pattern
