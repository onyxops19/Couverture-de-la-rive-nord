# Couverture de la Rive-Nord — Phase 2 (Next.js 14 Port) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the approved Phase 1 static HTML preview into a production Next.js 14 App Router site with 7 routes, server-action contact form posting to a Make webhook, SEO infrastructure (metadata + sitemap + LocalBusiness JSON-LD), and Vercel deployment.

**Architecture:** Next.js 14 App Router · TypeScript · plain CSS (ported from `_archive/preview/styles.css` to `app/globals.css`, same custom-property tokens). Server-rendered pages with client components only where state is required (carousel, stats count-up, mobile menu, scroll reveal, contact form). Form submission goes through a Next.js server action that POSTs to `process.env.MAKE_WEBHOOK_URL`, keeping the webhook URL server-side. Visual identity and content are unchanged — Phase 2 is an architectural port, not a redesign.

**Tech Stack:**
- Next.js 14 (App Router) + React 18
- TypeScript (strict)
- Plain CSS via `globals.css` (no Tailwind, no CSS modules)
- next/font (self-hosted Raleway + Open Sans)
- next/image for raster images; raw `<video>` for hero
- Zod for form validation
- Vercel for hosting (auto-deploy on `git push`)

**Source of truth:** `_archive/preview/index.html`, `_archive/preview/realisations.html`, `_archive/preview/contact.html`, `_archive/preview/styles.css`, `_archive/preview/script.js`. Engineer should keep these open as reference while building React components — JSX should produce identical DOM/CSS-class structure where possible.

**Verification approach:** After each task, run `npm run dev` and visually verify the route in browser. No automated tests in this plan — Playwright tests can be added later in a follow-up.

**Out of scope:**
- Automated tests (Playwright, Vitest) — follow-up
- CMS or content authoring tooling
- Bilingual FR/EN (French only per spec)
- Email backend on our side — user wires up Make webhook independently
- A custom domain — Vercel `*.vercel.app` URL is the v1 production target

**Source spec:** `docs/superpowers/specs/2026-05-09-couvrivenord-site-design.md`

---

## File Structure (target)

```
/
├── _archive/preview/              ← moved from /preview in Task 1
├── images_site/                   ← untouched (source-of-truth images)
├── docs/                          ← unchanged
├── public/
│   ├── logo.png
│   ├── hero.mp4
│   ├── services/                  (7 files)
│   ├── membranes/                 (2 files)
│   └── realisations/              (12 files)
├── app/
│   ├── layout.tsx                 (root layout — PromoBar, StickyNav, Footer)
│   ├── globals.css
│   ├── page.tsx                   (homepage)
│   ├── services/page.tsx
│   ├── membranes/page.tsx
│   ├── realisations/page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── actions.ts             (server action: submitContact)
│   ├── couvreur-laval/page.tsx
│   ├── couvreur-montreal-nord/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── PromoBar.tsx
│   │   ├── StickyNav.tsx          (client)
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ValueWithTestimonials.tsx
│   │   ├── StatsSection.tsx       (client — count-up)
│   │   ├── ServicesGrid.tsx
│   │   ├── InlineCTAStrip.tsx
│   │   ├── MembranesAlternating.tsx
│   │   ├── AdvantagesSection.tsx
│   │   ├── RealizationsGallery.tsx
│   │   ├── FinalCTA.tsx
│   │   └── PageHeader.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── CertBadge.tsx
│   │   ├── AdvantageBlock.tsx
│   │   └── GalleryThumb.tsx
│   ├── carousel/
│   │   └── TestimonialsCarousel.tsx (client)
│   ├── form/
│   │   └── ContactForm.tsx          (client)
│   ├── seo/
│   │   └── LocalBusinessSchema.tsx
│   └── reveal/
│       └── RevealOnScroll.tsx       (client wrapper)
├── lib/
│   ├── constants.ts                 (phone, email, address, urls)
│   └── content.ts                   (testimonials, services, advantages)
├── .env.example                     (MAKE_WEBHOOK_URL placeholder)
├── .gitignore                       (updated)
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md                        (updated)
```

---

## Task 1: Archive preview/, scaffold Next.js 14

**Files:**
- Move: `preview/` → `_archive/preview/`
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`
- Modify: `.gitignore`, `README.md`

- [ ] **Step 1: Move preview folder to archive**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
mkdir -p _archive
git mv preview _archive/preview
```

- [ ] **Step 2: Update .gitignore for Next.js**

Replace `.gitignore` with:

```
# OS / IDE
.DS_Store
Thumbs.db
.vscode/
.idea/

# Node
node_modules/
*.log

# Next.js
.next/
out/
build/
dist/

# Env
.env*.local
.env

# Vercel
.vercel
```

- [ ] **Step 3: Scaffold Next.js manually (no create-next-app interactive prompts)**

Create `package.json`:

```json
{
  "name": "couvrivenord-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "typescript": "^5.4.5"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "_archive"]
}
```

Create `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
```

Create `next-env.d.ts`:

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 4: Install dependencies**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
npm install
```

Expected: ~280 packages, no errors. Takes ~30s.

- [ ] **Step 5: Update README**

Replace `README.md`:

```markdown
# Couverture de la Rive-Nord — Marketing Website

Next.js 14 marketing site for Couverture de la Rive-Nord Inc., a Quebec roofing company specializing in white EPDM/TPO membranes for flat roofs.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in MAKE_WEBHOOK_URL
npm run dev
```

Open http://localhost:3000

## Environment variables

| Name | Required | Description |
|---|---|---|
| `MAKE_WEBHOOK_URL` | Yes (prod) | Make.com webhook URL the contact form POSTs to |

## Project layout

- `app/` — Next.js App Router routes
- `components/` — React components
- `lib/` — Shared constants and content data
- `public/` — Static images, hero video
- `docs/` — Design spec and implementation plans
- `_archive/preview/` — Phase 1 static HTML preview (frozen reference)
- `images_site/` — Source-of-truth client images

## Deploy

Pushes to `main` auto-deploy on Vercel. Set `MAKE_WEBHOOK_URL` in Vercel project settings → Environment Variables.

## Spec

See `docs/superpowers/specs/2026-05-09-couvrivenord-site-design.md`.
```

- [ ] **Step 6: Verify and commit**

```bash
ls -la
# Should show: .gitignore .next-env.d.ts _archive/ docs/ images_site/ next.config.mjs node_modules/ package.json package-lock.json README.md tsconfig.json
git add .gitignore _archive/ README.md package.json package-lock.json tsconfig.json next.config.mjs next-env.d.ts
git rm -r --cached preview 2>/dev/null || true
git commit -m "chore(phase-2): scaffold Next.js 14 + TypeScript, archive Phase 1 preview"
```

---

## Task 2: Copy assets to public/, set up fonts, port globals.css

**Files:**
- Create: `public/logo.png`, `public/hero.mp4`, `public/services/*.jpg`, `public/membranes/*.jpg`, `public/realisations/*.jpg`
- Create: `app/globals.css`

- [ ] **Step 1: Copy assets**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
mkdir -p public/services public/membranes public/realisations
cp _archive/preview/assets/logo.png        public/logo.png
cp _archive/preview/assets/hero.mp4         public/hero.mp4
cp _archive/preview/assets/services/*.jpg   public/services/
cp _archive/preview/assets/membranes/*.jpg  public/membranes/
cp _archive/preview/assets/realisations/*.jpg public/realisations/
ls public public/services public/membranes public/realisations
```

Expected counts: `public/services` = 7 files, `public/membranes` = 2, `public/realisations` = 12.

- [ ] **Step 2: Port styles.css to app/globals.css**

Copy `_archive/preview/styles.css` to `app/globals.css` unchanged. Same custom properties, same selectors. Identical visual output.

```bash
mkdir -p app
cp _archive/preview/styles.css app/globals.css
```

- [ ] **Step 3: Commit**

```bash
git add public app/globals.css
git commit -m "chore(phase-2): copy assets to public/, port globals.css from preview"
```

---

## Task 3: Set up next/font and base layout

**Files:**
- Create: `app/layout.tsx`
- Create: `lib/constants.ts`
- Create: `lib/content.ts`

- [ ] **Step 1: Create lib/constants.ts**

```typescript
export const SITE = {
  name: 'Couverture de la Rive-Nord',
  legalName: 'Couverture de la Rive-Nord Inc.',
  url: 'https://couverturerivenord.com',
  tagline: 'Qualité et fiabilité sous un même toit !',
  phone: '+1 (514) 835-7617',
  phoneRaw: '+15148357617',
  email: 'admin@couverturerivenord.com',
  facebook: 'https://fr-ca.facebook.com/CouvertureRiveNord/',
  address: {
    street: '3776 Rue Georges Corbeil',
    city: 'Terrebonne',
    region: 'QC',
    postal: 'J6X 4J5',
    country: 'CA',
  },
  zones: ['Laval', 'Montréal-Nord', 'Terrebonne', 'Rive-Nord'],
  certifications: ['APCHQ', 'Certifié Firestone'],
  yearsInBusiness: 23,
} as const;

export const PROMO_TEXT = 'Places limitées · Réservez votre place maintenant';
```

- [ ] **Step 2: Create lib/content.ts**

```typescript
export type Testimonial = {
  quote: string;
  author: string;
  source: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: '« Je recommande à tous ! Pour avoir fait affaire avec plusieurs compagnies je suis capable de dire que c\'est LA référence dans leur domaine !!! Très belle expérience, merci encore. 🔆 »', author: 'Marc-André Henry Lebel', source: 'Avis Google' },
  { quote: '« Meilleure compagnie de couverture avec qui j\'ai pu faire affaire. Service après-vente incroyable. Équipe motivée et d\'expérience. De très bons prix !!! À appeler absolument. »', author: 'Alex Lepage', source: 'Avis Google' },
  { quote: '« Nous avons eu une expérience incroyable de la soumission jusqu\'au jour des travaux. Un gros merci au président de la compagnie, qui personnellement nous a guidés tout au long de l\'exécution des travaux. »', author: 'Alexandre Granger', source: 'Avis Google' },
  { quote: '« Je recommande Couverture de la Rive-Nord sans hésitation ! Service professionnel, travail de qualité et une très belle équipe. »', author: 'Mathieu Béland', source: 'Avis Google' },
  { quote: '« Ils ont refait mon toit, j\'ai reçu un excellent service, leurs prix étaient compétitifs, je les recommande fortement, merci. »', author: 'Mathieu Chasse', source: 'Avis Google' },
  { quote: '« Superbe travail. Délais respectés et qualité incroyable. »', author: 'Yanick Gosselin', source: 'Avis Google' },
  { quote: '« Super compagnie, propriétaire extrêmement compétent et sympathique ! »', author: 'Francis Bergeron', source: 'Avis Google' },
  { quote: '« Excellent travail !! Les gars sont très professionnels et très respectueux des lieux. Je recommande fortement. »', author: 'Alexandre Blais', source: 'Avis Google' },
  { quote: '« Je recommande fortement. Ils ont le souci du travail bien fait. »', author: 'Eric Poirier', source: 'Avis Google' },
  { quote: '« Super service, très efficace et honnête, je recommande. »', author: 'Sébastien Gaudreau', source: 'Avis Google' },
  { quote: '« Une équipe à l\'écoute de ce que l\'on demande et des travaux au-delà des attentes, je recommande à 100 %. »', author: 'Keven Simon', source: 'Avis Google' },
  { quote: '« Très professionnel et ponctuel. Merci beaucoup à Kevin pour le travail. »', author: 'Guillaume Couture', source: 'Avis Google' },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  { slug: 'installation', title: "L'installation", description: "Toits plats et toitures neuves : membranes EPDM, TPO, ou bardeaux d'asphalte. Une installation de qualité avec des produits écologiques et durables.", image: '/services/installation.jpg', alt: 'Installation de toiture' },
  { slug: 'reparation', title: 'La réparation', description: "Infiltration d'eau, moisissure, humidité ? Intervention rapide pour stopper les dommages avant qu'ils s'aggravent.", image: '/services/reparation.jpg', alt: 'Réparation de toiture' },
  { slug: 'refection', title: 'La réfection', description: 'Toiture défectueuse, fuites, perte d\'efficacité ? Remplacement complet avec membranes blanches EPDM ou TPO de haute qualité.', image: '/services/refection.jpg', alt: 'Réfection de toiture' },
  { slug: 'inspection', title: "L'inspection", description: 'Inspections préventives annuelles par une équipe équipée pour le travail en hauteur. Plus tôt vous repérez un défaut, moins la réparation coûte.', image: '/services/inspection.jpg', alt: 'Inspection de toiture' },
  { slug: 'entretien', title: "L'entretien", description: 'Entretien annuel pour éviter les dégradations causées par les intempéries québécoises. Un partenaire sur le long terme.', image: '/services/entretien.jpg', alt: 'Entretien de toiture' },
  { slug: 'deneigement', title: 'Le déneigement', description: 'Équipement professionnel pour déneiger votre toit de manière sécuritaire. Évitez infiltrations d\'eau et fléchissement de la charpente.', image: '/services/deneigement.jpg', alt: 'Déneigement de toiture' },
  { slug: 'autres', title: 'Autres services', description: 'Nettoyage de gouttières, inspection et nettoyage de drains, calfeutrage, travaux avec nacelle, installation de lumières de Noël.', image: '/services/autres.jpg', alt: 'Autres services' },
];

export type Advantage = {
  iconKey: 'house' | 'medal' | 'dollar';
  title: string;
  body: string;
};

export const ADVANTAGES: Advantage[] = [
  { iconKey: 'house',  title: 'Un service exceptionnel', body: "De l'identification de vos besoins jusqu'à la fin de vos travaux, notre équipe est à votre écoute et disponible tout le long de vos projets." },
  { iconKey: 'medal',  title: 'Une équipe compétente',  body: "Plus de 23 ans d'expérience. Nos couvreurs réalisent tous vos projets avec passion, professionnalisme et minutie." },
  { iconKey: 'dollar', title: 'Des prix compétitifs',   body: 'Un excellent rapport qualité/prix, autant pour nos services que pour nos matériaux. Soumission gratuite, sans engagement.' },
];

export const REALIZATIONS: string[] = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `/realisations/realisation-${n}.jpg`;
});
```

- [ ] **Step 3: Create app/layout.tsx (skeleton — will wire PromoBar/Nav/Footer in Task 6)**

```tsx
import type { Metadata } from 'next';
import { Raleway, Open_Sans } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-raleway',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://couverturerivenord.com'),
  title: {
    default: 'Couverture de la Rive-Nord — Couvreur à Laval et Montréal-Nord',
    template: '%s — Couverture de la Rive-Nord',
  },
  description: 'Compagnie de toiture à Laval et Montréal-Nord depuis plus de 23 ans. Spécialiste des membranes blanches EPDM et TPO pour toits plats. Membre APCHQ, certifié Firestone.',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: 'Couverture de la Rive-Nord',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${raleway.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Update globals.css to use the next/font CSS variables**

Replace the `--font-display` and `--font-body` lines in `app/globals.css`:

Find:
```css
  --font-display: 'Raleway', system-ui, sans-serif;
  --font-body: 'Open Sans', system-ui, sans-serif;
```

Replace with:
```css
  --font-display: var(--font-raleway), system-ui, sans-serif;
  --font-body: var(--font-open-sans), system-ui, sans-serif;
```

This switches the CSS variables to read from the next/font-injected variables, removing the need for the Google Fonts `<link>` tag.

- [ ] **Step 5: Run dev server, confirm blank page renders with no errors**

```bash
npm run dev
```

Open http://localhost:3000. Expected: completely blank white page (no components yet). DevTools Console clean (no font-loading errors).

Stop the dev server with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add app/ lib/
git commit -m "feat(phase-2): set up next/font, base layout, content + constants modules"
```

---

## Task 4: Build PromoBar + Footer components

**Files:**
- Create: `components/layout/PromoBar.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/ui/CertBadge.tsx`

- [ ] **Step 1: Create PromoBar**

`components/layout/PromoBar.tsx`:

```tsx
import Link from 'next/link';
import { PROMO_TEXT } from '@/lib/constants';

export function PromoBar() {
  return (
    <div className="promo-bar">
      <div className="container promo-bar__inner">
        <span className="promo-bar__icon" aria-hidden="true">⚡</span>
        <span className="promo-bar__text">{PROMO_TEXT}</span>
        <Link href="/contact" className="promo-bar__cta">
          Réserver <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create CertBadge**

`components/ui/CertBadge.tsx`:

```tsx
export function CertBadge({ children }: { children: React.ReactNode }) {
  return <span className="cert-badge">{children}</span>;
}
```

- [ ] **Step 3: Create Footer**

`components/layout/Footer.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants';
import { CertBadge } from '@/components/ui/CertBadge';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <Link className="footer__logo" href="/">
            <Image src="/logo.png" alt={SITE.name} width={200} height={98} />
          </Link>

          <div className="footer__certs">
            <CertBadge>APCHQ</CertBadge>
            <CertBadge>CERTIFIÉ FIRESTONE</CertBadge>
          </div>

          <address className="footer__address">
            {SITE.address.street}<br />
            {SITE.address.city}, {SITE.address.region}, {SITE.address.postal}
          </address>

          <ul className="footer__contact">
            <li><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.facebook} target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Liens rapides</h4>
          <ul className="footer__links">
            <li><Link href="/services">Nos services</Link></li>
            <li><Link href="/membranes">Nos membranes</Link></li>
            <li><Link href="/realisations">Nos réalisations</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Zones desservies</h4>
          <ul className="footer__links">
            {SITE.zones.map((z) => <li key={z}>{z}</li>)}
          </ul>
        </div>
      </div>

      <div className="footer__copyright">
        <div className="container">
          © 2026 {SITE.legalName} — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "feat(phase-2): add PromoBar, Footer, CertBadge components"
```

---

## Task 5: Build StickyNav (client component) and wire layout.tsx

**Files:**
- Create: `components/layout/StickyNav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create StickyNav**

`components/layout/StickyNav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/constants';

const LINKS = [
  { href: '/',              label: 'Accueil' },
  { href: '/services',      label: 'Nos services' },
  { href: '/membranes',     label: 'Nos membranes' },
  { href: '/realisations',  label: 'Nos réalisations' },
  { href: '/contact',       label: 'Contact' },
];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link className="nav__logo" href="/">
          <Image src="/logo.png" alt={SITE.name} width={200} height={98} priority />
        </Link>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav__list ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={pathname === l.href ? 'is-active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="nav__cta-mobile">
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn--gold" onClick={() => setOpen(false)}>
              {SITE.phone}
            </a>
          </li>
        </ul>

        <a href={`tel:${SITE.phoneRaw}`} className="nav__phone-cta">Appelez maintenant</a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Wire layout.tsx**

Replace the `<body>` in `app/layout.tsx`:

```tsx
import { PromoBar } from '@/components/layout/PromoBar';
import { StickyNav } from '@/components/layout/StickyNav';
import { Footer } from '@/components/layout/Footer';

// ... existing imports + metadata ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${raleway.variable} ${openSans.variable}`}>
      <body>
        <PromoBar />
        <StickyNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create stub app/page.tsx so dev server can render**

```tsx
export default function HomePage() {
  return <main style={{ minHeight: '60vh', padding: '80px 20px', textAlign: 'center' }}>Homepage WIP</main>;
}
```

- [ ] **Step 4: Run dev server**

```bash
npm run dev
```

Open http://localhost:3000. Expected: gold promo bar at top, charcoal sticky nav with logo + links, "Homepage WIP" placeholder, charcoal footer with 3 columns. Mobile (<900px): hamburger toggles a slide-in drawer.

Stop dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add components/layout/StickyNav.tsx app/layout.tsx app/page.tsx
git commit -m "feat(phase-2): add StickyNav (client), wire layout with PromoBar/Nav/Footer"
```

---

## Task 6: Build Button + RevealOnScroll primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/reveal/RevealOnScroll.tsx`

- [ ] **Step 1: Create Button**

`components/ui/Button.tsx`:

```tsx
import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'gold' | 'outline-white' | 'outline-charcoal' | 'charcoal';

type Props = {
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button({ variant = 'gold', href, external, className = '', children, ...rest }: Props) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return <a className={classes} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>;
    }
    return <Link className={classes} href={href}>{children}</Link>;
  }

  return <button className={classes} {...rest}>{children}</button>;
}
```

- [ ] **Step 2: Create RevealOnScroll**

`components/reveal/RevealOnScroll.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayMs?: number;
  children: React.ReactNode;
};

export function RevealOnScroll({ as: Tag = 'div', className = '', delayMs, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    // @ts-expect-error — dynamic Tag is fine
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx components/reveal/RevealOnScroll.tsx
git commit -m "feat(phase-2): add Button + RevealOnScroll primitives"
```

---

## Task 7: Build Hero component

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero**

`components/sections/Hero.tsx`:

```tsx
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="hero" id="top">
      <video className="hero__video" autoPlay muted loop playsInline>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay"></div>

      <div className="container hero__inner">
        <h1 className="hero__title reveal is-visible">
          Votre compagnie de toiture<br />
          à Laval et Montréal-Nord
        </h1>

        <p className="hero__sub reveal is-visible">
          Depuis plus de {SITE.yearsInBusiness} ans, spécialiste des membranes blanches EPDM et TPO pour toits plats.
        </p>

        <div className="hero__badges reveal is-visible">
          <span className="badge">Membre APCHQ</span>
          <span className="badge-divider"></span>
          <span className="badge">Certifié Firestone</span>
        </div>

        <div className="hero__ctas reveal is-visible">
          <Button variant="outline-white" href={`tel:${SITE.phoneRaw}`}>Appelez maintenant</Button>
          <Button variant="gold" href="/contact">Obtenir une soumission</Button>
        </div>
      </div>
    </section>
  );
}
```

Note: Hero is above-the-fold, so `is-visible` is applied immediately (no scroll observer needed). The CSS `transition-delay` rules in `globals.css` (already ported from preview) handle the stagger.

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(phase-2): add Hero section with video, headline, badges, dual CTAs"
```

---

## Task 8: Build TestimonialsCarousel + ValueWithTestimonials

**Files:**
- Create: `components/carousel/TestimonialsCarousel.tsx`
- Create: `components/sections/ValueWithTestimonials.tsx`

- [ ] **Step 1: Create TestimonialsCarousel (client component)**

`components/carousel/TestimonialsCarousel.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/content';

const AUTO_MS = 6000;

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const to = (i: number) => setIndex(i);

  const play = () => {
    pause();
    timer.current = setInterval(next, AUTO_MS);
  };
  const pause = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  useEffect(() => {
    play();
    return pause;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); play(); }
  };

  return (
    <div className="testimonials" ref={containerRef} onMouseEnter={pause} onMouseLeave={play}>
      <p className="testimonials__heading">
        <span className="testimonials__heading-stars" aria-hidden="true">★★★★★</span>
        <span className="testimonials__heading-text">Ce que disent nos clients</span>
      </p>

      <div className="testimonials__viewport">
        <div
          className="testimonials__track"
          style={{ transform: `translateX(${-index * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {TESTIMONIALS.map((t) => (
            <article className="testimonial" key={t.author}>
              <div className="testimonial__stars" aria-label="5 étoiles sur 5">★★★★★</div>
              <blockquote className="testimonial__quote">{t.quote}</blockquote>
              <p className="testimonial__author">{t.author}</p>
              <p className="testimonial__source">{t.source}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="testimonials__nav">
        <button className="testimonials__btn testimonials__btn--prev" aria-label="Témoignage précédent" onClick={() => { prev(); play(); }}>‹</button>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Témoignage ${i + 1}`}
              onClick={() => { to(i); play(); }}
            />
          ))}
        </div>
        <button className="testimonials__btn testimonials__btn--next" aria-label="Témoignage suivant" onClick={() => { next(); play(); }}>›</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ValueWithTestimonials**

`components/sections/ValueWithTestimonials.tsx`:

```tsx
import Link from 'next/link';
import { TestimonialsCarousel } from '@/components/carousel/TestimonialsCarousel';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

export function ValueWithTestimonials() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="value-grid">

          <RevealOnScroll className="value-grid__text">
            <h2 className="section__title">
              Qualité et fiabilité<br />
              sous un même toit !
            </h2>

            <p className="section__lead">
              Depuis plus de {SITE.yearsInBusiness} ans, Couverture de la Rive-Nord est une compagnie de toiture à Laval et à Montréal-Nord qui se spécialise dans les membranes blanches EPDM et TPO pour les toits plats et les toitures neuves. Véritable partenaire par excellence pour votre toiture, Couverture de la Rive-Nord œuvre dans le secteur résidentiel et commercial pour tous vos besoins de toiture. Notre équipe agit avec professionnalisme, minutie et courtoisie tout en vous proposant les produits les plus qualitatifs, durables et écologiques du marché.
            </p>

            <p className="section__inline-cta">
              <Link href="/services" className="link-arrow">En savoir plus sur nos services <span aria-hidden="true">→</span></Link>
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="value-grid__carousel">
            <TestimonialsCarousel />
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/carousel/ components/sections/ValueWithTestimonials.tsx
git commit -m "feat(phase-2): add TestimonialsCarousel (client) + ValueWithTestimonials section"
```

---

## Task 9: Build StatsSection (with count-up)

**Files:**
- Create: `components/sections/StatsSection.tsx`

- [ ] **Step 1: Create StatsSection (client component for count-up)**

`components/sections/StatsSection.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { CertBadge } from '@/components/ui/CertBadge';

const STATS = [
  { target: 23, suffix: '+',     label: "Années d'expérience" },
  { target: 50, suffix: ' ans',  label: 'Durée de vie membrane EPDM' },
  { target: 30, suffix: ' ans',  label: 'Garantie fabricant Firestone' },
];

function StatNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const dur = 1500;
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setDone(true);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className={`stat__num ${done ? 'is-counted' : ''}`}>{value}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Plus de 23 ans<br />
          au service de votre toiture
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Recommandé par l'APCHQ et certifié Firestone (garantie fabricant jusqu'à 30 ans), Couverture de la Rive-Nord œuvre depuis 23 ans à Laval, Montréal-Nord, Terrebonne et la Rive-Nord. Résidentiel comme commercial, notre équipe installe des membranes blanches durables, écologiques et rentables.
        </RevealOnScroll>

        <ul className="stats stagger">
          {STATS.map((s, i) => (
            <RevealOnScroll as="li" className="stat" delayMs={i * 100} key={s.label}>
              <StatNumber target={s.target} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </RevealOnScroll>
          ))}
        </ul>

        <RevealOnScroll className="cert-badges">
          <CertBadge>APCHQ</CertBadge>
          <CertBadge>CERTIFIÉ FIRESTONE</CertBadge>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/StatsSection.tsx
git commit -m "feat(phase-2): add StatsSection with count-up + cert badges"
```

---

## Task 10: Build ServicesGrid + ServiceCard + InlineCTAStrip

**Files:**
- Create: `components/ui/ServiceCard.tsx`
- Create: `components/sections/ServicesGrid.tsx`
- Create: `components/sections/InlineCTAStrip.tsx`

- [ ] **Step 1: Create ServiceCard**

`components/ui/ServiceCard.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/content';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <li className="card">
      <Image className="card__img" src={service.image} alt={service.alt} width={800} height={500} />
      <div className="card__body">
        <h3 className="card__title">{service.title}</h3>
        <p className="card__text">{service.description}</p>
        <Link className="card__link" href={`/services#${service.slug}`}>
          En savoir plus <span aria-hidden="true">→</span>
        </Link>
      </div>
    </li>
  );
}
```

- [ ] **Step 2: Create ServicesGrid**

`components/sections/ServicesGrid.tsx`:

```tsx
import { ServiceCard } from '@/components/ui/ServiceCard';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SERVICES } from '@/lib/content';

export function ServicesGrid() {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Nos services de toiture<br />
          à Laval et Montréal-Nord
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Expert en toiture à Laval et à Montréal-Nord, Couverture de la Rive-Nord offre des services complets pour répondre à l'ensemble de vos besoins pour votre toiture. Avec notre compagnie de toiture, vous pourrez profiter d'un partenaire à long terme qui vous offrira en tout temps un service d'une qualité inégalée.
        </RevealOnScroll>

        <ul className="cards stagger">
          {SERVICES.map((s, i) => (
            <RevealOnScroll as="li" className="card" delayMs={i * 100} key={s.slug}>
              <ServiceCard service={s} />
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

Note: `ServiceCard` renders a `<li>` and we wrap it with `RevealOnScroll as="li"`. The double-li issue — to avoid it, refactor: have ServicesGrid render the wrapper, and ServiceCard render just the inner `<article>`-style content. Or simpler — flatten: the card content directly inside RevealOnScroll. Refactor:

Replace ServicesGrid's `<ul>` with:

```tsx
<ul className="cards stagger">
  {SERVICES.map((s, i) => (
    <RevealOnScroll as="li" className="card" delayMs={i * 100} key={s.slug}>
      <Image className="card__img" src={s.image} alt={s.alt} width={800} height={500} />
      <div className="card__body">
        <h3 className="card__title">{s.title}</h3>
        <p className="card__text">{s.description}</p>
        <Link className="card__link" href={`/services#${s.slug}`}>
          En savoir plus <span aria-hidden="true">→</span>
        </Link>
      </div>
    </RevealOnScroll>
  ))}
</ul>
```

And delete `ServiceCard.tsx` — it's not used. (Alternative: keep ServiceCard but have it render fragment children, not a `<li>`. For simplicity, just inline as shown above.)

Update imports in ServicesGrid:
```tsx
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SERVICES } from '@/lib/content';
```

(Remove the `ServiceCard` import; delete the ServiceCard file before committing.)

- [ ] **Step 3: Create InlineCTAStrip**

`components/sections/InlineCTAStrip.tsx`:

```tsx
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function InlineCTAStrip() {
  return (
    <section className="cta-strip">
      <RevealOnScroll className="container cta-strip__inner">
        <p className="cta-strip__text">
          Votre toiture mérite un expert — obtenez une soumission gratuite aujourd'hui !
        </p>
        <Button variant="charcoal" href="/contact">Obtenir une soumission</Button>
      </RevealOnScroll>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
rm components/ui/ServiceCard.tsx 2>/dev/null
git add components/sections/ServicesGrid.tsx components/sections/InlineCTAStrip.tsx
git commit -m "feat(phase-2): add ServicesGrid (7 cards) and InlineCTAStrip"
```

---

## Task 11: Build MembranesAlternating + AdvantagesSection + RealizationsGallery + FinalCTA

**Files:**
- Create: `components/sections/MembranesAlternating.tsx`
- Create: `components/sections/AdvantagesSection.tsx`
- Create: `components/sections/RealizationsGallery.tsx`
- Create: `components/sections/FinalCTA.tsx`
- Create: `components/ui/AdvantageIcon.tsx`

- [ ] **Step 1: Create AdvantageIcon**

`components/ui/AdvantageIcon.tsx`:

```tsx
type Key = 'house' | 'medal' | 'dollar';

const PATHS: Record<Key, React.ReactNode> = {
  house: (
    <>
      <path d="M8 32 L32 12 L56 32"/>
      <path d="M14 30 V52 H50 V30"/>
      <path d="M28 52 V40 H36 V52"/>
    </>
  ),
  medal: (
    <>
      <circle cx="32" cy="26" r="14"/>
      <path d="M22 38 L18 56 L32 48 L46 56 L42 38"/>
      <path d="M27 26 L31 30 L38 22"/>
    </>
  ),
  dollar: (
    <>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M44 18 H26 a6 6 0 0 0 0 12 h12 a6 6 0 0 1 0 12 H20"/>
    </>
  ),
};

export function AdvantageIcon({ kind }: { kind: Key }) {
  return (
    <svg className="advantage__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[kind]}
    </svg>
  );
}
```

- [ ] **Step 2: Create MembranesAlternating**

`components/sections/MembranesAlternating.tsx`:

```tsx
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function MembranesAlternating() {
  return (
    <section className="section section--dark" id="membranes">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Notre spécialité :<br />
          la membrane blanche
        </RevealOnScroll>

        <RevealOnScroll as="p" className="section__lead">
          Expert en toiture à membrane blanche depuis plus de 15 ans, Couverture de la Rive-Nord vous propose les meilleurs produits pour les toits plats. Entre la membrane EPDM et la membrane TPO, deux options écologiques, durables et avec un excellent retour sur investissement. Une membrane blanche lutte contre les îlots de chaleur et résiste aux températures extrêmes du Québec.
        </RevealOnScroll>

        <RevealOnScroll className="membrane">
          <div className="membrane__media">
            <Image src="/membranes/epdm.jpg" alt="Membrane EPDM blanche" width={800} height={600} />
          </div>
          <div className="membrane__body">
            <h3 className="membrane__title">Membrane EPDM</h3>
            <p>Caoutchouc synthétique monocouche. Durée de vie jusqu'à <strong>50 ans</strong> avec entretien régulier. Excellente résistance aux UV, aux températures extrêmes et à l'oxydation.</p>
            <p>La couleur blanche reflète les rayons solaires, réduit la consommation énergétique et évite les îlots de chaleur. Entièrement écologique et recyclable.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="membrane membrane--reverse">
          <div className="membrane__media">
            <Image src="/membranes/tpo.jpg" alt="Membrane TPO blanche" width={800} height={600} />
          </div>
          <div className="membrane__body">
            <h3 className="membrane__title">Membrane TPO</h3>
            <p>Thermoplastique polyoléfine monocouche. Durée de vie ~<strong>40 ans</strong>, moins d'entretien que l'EPDM. Résistante au soleil, aux températures extrêmes, aux bactéries et aux insectes.</p>
            <p>Sans substance chimique, sans halogène, sans plastifiant. Solution moins dispendieuse que les revêtements traditionnels, sans compromis sur la qualité ou la durabilité.</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="membrane__cta">
          <Button variant="gold" href="/realisations">Voir nos réalisations</Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create AdvantagesSection**

`components/sections/AdvantagesSection.tsx`:

```tsx
import { ADVANTAGES } from '@/lib/content';
import { AdvantageIcon } from '@/components/ui/AdvantageIcon';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export function AdvantagesSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Pourquoi choisir<br />
          Couverture de la Rive-Nord ?
        </RevealOnScroll>

        <ul className="advantages stagger">
          {ADVANTAGES.map((a, i) => (
            <RevealOnScroll as="li" className="advantage" delayMs={i * 100} key={a.iconKey}>
              <AdvantageIcon kind={a.iconKey} />
              <h3 className="advantage__title">{a.title}</h3>
              <p>{a.body}</p>
            </RevealOnScroll>
          ))}
        </ul>

        <RevealOnScroll className="advantages__ctas">
          <Button variant="outline-white" href="/couvreur-laval">Couvreur Laval</Button>
          <Button variant="outline-white" href="/couvreur-montreal-nord">Couvreur Montréal-Nord</Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create RealizationsGallery (component, accepts a `count` prop)**

`components/sections/RealizationsGallery.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { REALIZATIONS } from '@/lib/content';

type Props = {
  /** how many photos to render (homepage = 6, full page = 12) */
  count?: number;
  /** if true, uses 4-col grid (gallery--full); else 3-col */
  variant?: 'preview' | 'full';
  showLink?: boolean;
};

export function RealizationsGallery({ count = 6, variant = 'preview', showLink = true }: Props) {
  // For preview: skip middle photos for variety (1,2,3,10,11,12)
  // For full: render all 12 in sequence
  const photos = variant === 'preview'
    ? [REALIZATIONS[0], REALIZATIONS[1], REALIZATIONS[2], REALIZATIONS[9], REALIZATIONS[10], REALIZATIONS[11]]
    : REALIZATIONS.slice(0, count);

  const galleryClass = variant === 'full' ? 'gallery gallery--full stagger' : 'gallery stagger';

  return (
    <section className="section section--light" id="realisations">
      <div className="container">
        <RevealOnScroll as="h2" className="section__title section__title--centered">
          Nos réalisations
        </RevealOnScroll>
        <RevealOnScroll as="p" className="section__lead section__lead--short">
          Voyez notre travail en images.
        </RevealOnScroll>

        <ul className={galleryClass}>
          {photos.map((src, i) => (
            <RevealOnScroll as="li" className="gallery__item" key={src} delayMs={i * 80}>
              <Image src={src} alt={`Réalisation ${String(i + 1).padStart(2, '0')} — toiture à membrane blanche`} width={600} height={450} />
              <span className="gallery__overlay" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="21" y1="21" x2="16.5" y2="16.5"/>
                </svg>
              </span>
            </RevealOnScroll>
          ))}
        </ul>

        {showLink && (
          <RevealOnScroll as="p" className="gallery__cta">
            <Link href="/realisations" className="link-arrow">Voir toutes nos réalisations <span aria-hidden="true">→</span></Link>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create FinalCTA**

`components/sections/FinalCTA.tsx`:

```tsx
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

type Props = {
  title?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function FinalCTA({
  title = 'Besoin d\'un couvreur à Laval ou Montréal-Nord ?',
  sub = 'Contactez-nous dès aujourd\'hui pour une soumission gratuite.',
  ctaLabel = 'Obtenir une soumission gratuite !',
  ctaHref = `tel:${SITE.phoneRaw}`,
}: Props) {
  return (
    <section className="section section--dark final-cta" id="contact-cta">
      <RevealOnScroll className="container final-cta__inner">
        <h2 className="final-cta__title">{title}</h2>
        <p className="final-cta__sub">{sub}</p>
        <Button variant="gold" href={ctaHref} className="final-cta__btn">{ctaLabel}</Button>
      </RevealOnScroll>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/
git commit -m "feat(phase-2): add Membranes, Advantages, RealizationsGallery, FinalCTA, AdvantageIcon"
```

---

## Task 12: Compose homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Compose all sections in app/page.tsx**

Replace `app/page.tsx`:

```tsx
import { Hero } from '@/components/sections/Hero';
import { ValueWithTestimonials } from '@/components/sections/ValueWithTestimonials';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { InlineCTAStrip } from '@/components/sections/InlineCTAStrip';
import { MembranesAlternating } from '@/components/sections/MembranesAlternating';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueWithTestimonials />
      <StatsSection />
      <ServicesGrid />
      <InlineCTAStrip />
      <MembranesAlternating />
      <AdvantagesSection />
      <RealizationsGallery count={6} variant="preview" />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and verify homepage**

```bash
npm run dev
```

Open http://localhost:3000. Walk through top-to-bottom — should match `_archive/preview/index.html` visually (allow for slight font rendering differences from next/font vs Google Fonts CDN).

Specifically verify:
- Drone video plays in hero
- Testimonials carousel auto-advances
- Stats count up when scrolled into view
- Service cards stagger fade in
- All animations match Phase 1
- Console clean

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(phase-2): compose homepage with all sections"
```

---

## Task 13: Build PageHeader + realisations page

**Files:**
- Create: `components/sections/PageHeader.tsx`
- Create: `app/realisations/page.tsx`

- [ ] **Step 1: Create PageHeader**

`components/sections/PageHeader.tsx`:

```tsx
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

type Props = {
  title: React.ReactNode;
  sub?: string;
};

export function PageHeader({ title, sub }: Props) {
  return (
    <header className="page-header">
      <div className="container page-header__inner">
        <RevealOnScroll as="h1" className="page-header__title">{title}</RevealOnScroll>
        {sub && <RevealOnScroll as="p" className="page-header__sub">{sub}</RevealOnScroll>}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create app/realisations/page.tsx**

```tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/sections/PageHeader';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Nos réalisations',
  description: 'Galerie de toitures à membrane blanche EPDM et TPO réalisées par Couverture de la Rive-Nord à Laval, Montréal-Nord et Terrebonne. Résidentiel et commercial.',
};

export default function RealisationsPage() {
  return (
    <main>
      <PageHeader
        title={<>Nos réalisations de toiture<br />à membrane blanche</>}
        sub="Laval · Montréal-Nord · Terrebonne · Rive-Nord"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="p" className="section__lead">
            Couverture de la Rive-Nord vous offre de nombreux services complets et de qualité pour votre toiture à Laval ou à Montréal-Nord. Nous vous présentons fièrement nos réalisations de toitures à membrane blanche. Avant de procéder à votre installation, votre réparation ou encore votre réfection, vous pouvez découvrir ce que nous avons déjà réalisé pour les résidents et les commerces de Laval et Montréal-Nord.
          </RevealOnScroll>
        </div>
      </section>

      <RealizationsGallery count={12} variant="full" showLink={false} />

      <section className="section section--light" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <Button variant="gold" href={SITE.facebook} external>
              Voir nos dernières réalisations sur Facebook
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      <FinalCTA
        title="Inspiré par notre travail ?"
        sub="Contactez-nous pour une soumission gratuite sur votre projet."
        ctaLabel="Obtenir une soumission"
        ctaHref="/contact"
      />
    </main>
  );
}
```

- [ ] **Step 3: Run dev and verify /realisations**

```bash
npm run dev
```

Visit http://localhost:3000/realisations. Verify all 12 photos render (4-col on desktop), page header looks right, "Voir nos dernières réalisations sur Facebook" button opens in new tab.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add components/sections/PageHeader.tsx app/realisations/
git commit -m "feat(phase-2): add PageHeader component and /realisations route"
```

---

## Task 14: Build contact form server action + ContactForm + contact page

**Files:**
- Create: `app/contact/actions.ts`
- Create: `components/form/ContactForm.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create server action**

`app/contact/actions.ts`:

```typescript
'use server';

import { z } from 'zod';

const ContactSchema = z.object({
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  courriel: z.string().email('Courriel invalide'),
  telephone: z.string().min(1, 'Téléphone requis'),
  adresse: z.string().min(1, 'Adresse requise'),
  puit_de_lumiere: z.enum(['oui', 'non']).optional(),
  message: z.string().optional(),
});

export type ContactState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    prenom: formData.get('prenom'),
    nom: formData.get('nom'),
    courriel: formData.get('courriel'),
    telephone: formData.get('telephone'),
    adresse: formData.get('adresse'),
    puit_de_lumiere: formData.get('puit-de-lumiere') || undefined,
    message: formData.get('message') || undefined,
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Champs invalides';
    return { status: 'error', message: firstError };
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('MAKE_WEBHOOK_URL is not configured');
    return { status: 'error', message: 'Erreur de configuration. Merci de nous appeler au (514) 835-7617.' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...parsed.data,
        timestamp: new Date().toISOString(),
        source: 'couverturerivenord.com / contact form',
      }),
    });

    if (!res.ok) {
      throw new Error(`Webhook returned ${res.status}`);
    }

    return {
      status: 'success',
      message: 'Merci ! Votre demande a été reçue. Nous vous recontacterons sous peu.',
    };
  } catch (err) {
    console.error('Webhook submission failed:', err);
    return {
      status: 'error',
      message: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler au (514) 835-7617.",
    };
  }
}
```

- [ ] **Step 2: Create ContactForm (client component)**

`components/form/ContactForm.tsx`:

```tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact, type ContactState } from '@/app/contact/actions';

const initialState: ContactState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn--gold" disabled={pending}>
      {pending ? 'Envoi…' : 'Envoyer ma demande'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);

  return (
    <form action={formAction} className="contact-form">
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="prenom">Prénom <span className="req">*</span></label>
          <input type="text" id="prenom" name="prenom" required />
        </div>
        <div className="form-field">
          <label htmlFor="nom">Nom <span className="req">*</span></label>
          <input type="text" id="nom" name="nom" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="courriel">Courriel <span className="req">*</span></label>
          <input type="email" id="courriel" name="courriel" required />
        </div>
        <div className="form-field">
          <label htmlFor="telephone">Téléphone <span className="req">*</span></label>
          <input type="tel" id="telephone" name="telephone" required />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="adresse">Adresse complète <span className="req">*</span></label>
        <input type="text" id="adresse" name="adresse" placeholder="Numéro, rue, ville, code postal" required />
      </div>

      <fieldset className="form-fieldset">
        <legend>Avez-vous un puit de lumière ?</legend>
        <div className="form-radio-group">
          <label className="form-radio">
            <input type="radio" name="puit-de-lumiere" value="oui" />
            <span>Oui</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="puit-de-lumiere" value="non" />
            <span>Non</span>
          </label>
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Décrivez votre projet, le type de toiture, l'urgence..."></textarea>
      </div>

      <div className="form-submit">
        <SubmitButton />
      </div>

      {state.status === 'success' && <p className="form-success">{state.message}</p>}
      {state.status === 'error' && <p className="form-success" style={{ borderLeftColor: '#cc1f1f' }}>{state.message}</p>}
    </form>
  );
}
```

- [ ] **Step 3: Create app/contact/page.tsx**

```tsx
import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/form/ContactForm';
import { CertBadge } from '@/components/ui/CertBadge';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contactez-nous',
  description: `Contactez ${SITE.name} pour une soumission gratuite de votre toiture à Laval, Montréal-Nord ou Terrebonne. Téléphone, courriel et formulaire en ligne.`,
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`)}&output=embed`;

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contactez-nous"
        sub="Une soumission gratuite, sans engagement"
      />

      <section className="section section--light">
        <div className="container">
          <div className="contact-grid">

            <RevealOnScroll className="contact-form-wrap">
              <h2 className="contact__heading">Demandez votre soumission</h2>
              <p className="contact__intro">
                Remplissez ce formulaire et notre équipe vous recontactera dans les meilleurs délais. Pour une demande urgente, appelez-nous directement au <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
              </p>
              <ContactForm />
            </RevealOnScroll>

            <RevealOnScroll className="contact-info-wrap">
              <div className="contact-info-card">
                <h2 className="contact__heading">Coordonnées</h2>

                <ul className="contact-info-list">
                  <li>
                    <span className="contact-info-list__label">Téléphone</span>
                    <a href={`tel:${SITE.phoneRaw}`} className="contact-info-list__value">{SITE.phone}</a>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Courriel</span>
                    <a href={`mailto:${SITE.email}`} className="contact-info-list__value">{SITE.email}</a>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Adresse</span>
                    <span className="contact-info-list__value">{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region}, {SITE.address.postal}</span>
                  </li>
                  <li>
                    <span className="contact-info-list__label">Suivez-nous</span>
                    <a href={SITE.facebook} target="_blank" rel="noopener" className="contact-info-list__value">Facebook</a>
                  </li>
                </ul>

                <div className="contact-info-certs">
                  <CertBadge>APCHQ</CertBadge>
                  <CertBadge>CERTIFIÉ FIRESTONE</CertBadge>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height={380}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Carte — ${SITE.address.street}, ${SITE.address.city}`}
                />
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Create .env.example**

`.env.example`:

```
# Make.com webhook URL the contact form POSTs to.
# Set this in your local .env.local and in Vercel project Environment Variables.
MAKE_WEBHOOK_URL=https://hook.us2.make.com/REPLACE_ME
```

- [ ] **Step 5: Run dev and verify /contact**

```bash
npm run dev
```

Visit http://localhost:3000/contact. Verify:
- Form renders with all fields including puit-de-lumière radios
- Submitting empty shows browser validation
- Submitting filled shows "Erreur de configuration" (because MAKE_WEBHOOK_URL not set in `.env.local` yet — expected behavior, proves the server action runs)
- Map iframe loads showing Terrebonne address

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/contact/ components/form/ContactForm.tsx .env.example
git commit -m "feat(phase-2): add contact server action, ContactForm, /contact route"
```

---

## Task 15: Build /services, /membranes, /couvreur-laval, /couvreur-montreal-nord pages

**Files:**
- Create: `app/services/page.tsx`
- Create: `app/membranes/page.tsx`
- Create: `app/couvreur-laval/page.tsx`
- Create: `app/couvreur-montreal-nord/page.tsx`

- [ ] **Step 1: Create app/services/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';
import { SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Nos services de toiture',
  description: 'Installation, réparation, réfection, inspection, entretien et déneigement de toiture à Laval, Montréal-Nord et Terrebonne. Spécialiste des membranes blanches EPDM et TPO.',
};

const LONG_DESCRIPTIONS: Record<string, string> = {
  installation: "Couverture de la Rive-Nord se charge de l'installation de toiture à Laval et sur la Rive-Nord pour les toits plats et les toitures neuves. Grâce à notre expertise et nos produits de qualité, vous bénéficiez de produits écologiques, résistants aux intempéries et durables. Choix de membranes EPDM, TPO ou bardeaux d'asphalte.",
  reparation: "Vous avez remarqué des dommages ? Infiltration d'eau, moisissure, humidité ? Agissez rapidement avant que les coûts ne grimpent. Notre équipe intervient dans les plus brefs délais pour effectuer les réparations à des coûts compétitifs.",
  refection: "Toiture défectueuse, fuites ? Au bout d'un certain nombre d'années, une réfection (rénovation) complète est recommandée. Nous remplaçons votre toiture avec des membranes blanches EPDM ou TPO durables et de haute qualité.",
  inspection: "Sur un toit plat, il est complexe d'observer les défauts. Notre équipe minutieuse vérifie l'état de votre toiture en toute sécurité. Inspections préventives annuelles recommandées — plus tôt vous repérez un défaut, moins la réparation coûte.",
  entretien: "L'entretien annuel évite les dégradations causées par les intempéries québécoises : glace, neige, écarts de température. Un partenaire long terme pour préserver votre investissement.",
  deneigement: "L'accumulation excessive de neige et de glace peut causer des infiltrations, un fléchissement du toit et des dommages à la charpente. Nous disposons d'un équipement performant pour déneiger votre toiture de manière sécuritaire.",
  autres: "Services complémentaires : nettoyage de gouttières, inspection et nettoyage de drains, réfection du calfeutrage, service de nacelle pour travaux en hauteur, installation de lumières de Noël.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title={<>Nos services de couvreurs<br />pour votre toiture</>}
        sub="Laval · Montréal-Nord · Terrebonne · Rive-Nord"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="p" className="section__lead">
            Depuis plus de 15 ans, Couverture de la Rive-Nord est spécialisée dans les toitures à Laval et Montréal-Nord, ainsi que dans les membranes blanches EPDM et TPO. Résidents comme commerces pourront bénéficier de services complets par des couvreurs expérimentés et compétents.
          </RevealOnScroll>

          {SERVICES.map((s) => (
            <RevealOnScroll key={s.slug} className="membrane" >
              <div className="membrane__media" id={s.slug}>
                <Image src={s.image} alt={s.alt} width={800} height={600} />
              </div>
              <div className="membrane__body">
                <h2 className="membrane__title">{s.title}</h2>
                <p>{LONG_DESCRIPTIONS[s.slug]}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 2: Create app/membranes/page.tsx**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Membranes EPDM et TPO',
  description: 'Spécialiste des membranes blanches EPDM et TPO pour toits plats à Laval, Montréal-Nord et Terrebonne. Membranes durables, écologiques, recyclables, jusqu\'à 50 ans de durée de vie.',
};

export default function MembranesPage() {
  return (
    <main>
      <PageHeader
        title={<>Votre spécialiste de toiture<br />en membrane blanche</>}
        sub="Laval · Montréal-Nord · Terrebonne"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="p" className="section__lead">
            Expert en toiture à membrane blanche depuis plus de 15 ans, Couverture de la Rive-Nord vous propose les meilleurs produits pour les toits plats. Entre la membrane EPDM et la membrane TPO, deux options écologiques, durables et avec un excellent retour sur investissement. Une membrane blanche lutte contre les îlots de chaleur et résiste aux températures extrêmes du Québec.
          </RevealOnScroll>

          <RevealOnScroll className="membrane">
            <div className="membrane__media">
              <Image src="/membranes/epdm.jpg" alt="Membrane EPDM blanche" width={800} height={600} />
            </div>
            <div className="membrane__body">
              <h2 className="membrane__title">Membrane EPDM</h2>
              <p>Caoutchouc synthétique monocouche composé d'éthylène, propylène, diène et monomère. Durée de vie jusqu'à <strong>50 ans</strong> avec entretien régulier. Adaptée aux toits plats, elle résiste aux rayons UV, aux températures extrêmes du Québec et à l'oxydation.</p>
              <p>La couleur blanche reflète tous les rayons lumineux sans retenir la chaleur, offrant une excellente efficacité énergétique. Entièrement écologique et recyclable — de la conception à la fin de vie.</p>
              <p>La membrane EPDM blanche est un choix de prédilection pour vos toitures résidentielles ou commerciales. Notre équipe expérimentée vous l'installe à des prix compétitifs.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="membrane membrane--reverse">
            <div className="membrane__media">
              <Image src="/membranes/tpo.jpg" alt="Membrane TPO blanche" width={800} height={600} />
            </div>
            <div className="membrane__body">
              <h2 className="membrane__title">Membrane TPO</h2>
              <p>Thermoplastique polyoléfine monocouche. Durée de vie d'environ <strong>40 ans</strong>, nécessite moins d'entretien que l'EPDM. Idéale pour une toiture résistante au soleil, aux températures extrêmes, aux bactéries et aux insectes.</p>
              <p>Solution moins dispendieuse que les revêtements traditionnels, sans compromis sur la qualité. Sa surface blanche réfléchissante diminue les îlots de chaleur et la consommation énergétique du bâtiment.</p>
              <p>Sans substance chimique, sans halogène, sans plastifiant — un revêtement écologique et recyclable autant pour le résidentiel que le commercial.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="membrane__cta">
            <Button variant="gold" href="/realisations">Voir nos réalisations</Button>
          </RevealOnScroll>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 3: Create app/couvreur-laval/page.tsx**

```tsx
import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Couvreur à Laval',
  description: 'Couverture de la Rive-Nord — votre couvreur à Laval depuis plus de 15 ans. Membranes blanches EPDM et TPO. Membre APCHQ, certifié Firestone. Soumission gratuite.',
  alternates: { canonical: '/couvreur-laval' },
};

export default function CouvreurLavalPage() {
  return (
    <main>
      <PageHeader
        title="Votre couvreur à Laval"
        sub="Membre APCHQ · Certifié Firestone · 23+ ans d'expérience"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="p" className="section__lead">
            Depuis plus de 15 ans, Couverture de la Rive-Nord offre ses services complets et professionnels de toiture aux Lavallois. Spécialisée dans les membranes blanches, notre entreprise installe des matériaux durables, résistants et rentables, toujours de haute qualité. Recommandée par l'APCHQ et certifiée par Firestone, Couverture de la Rive-Nord est votre meilleur partenaire sur le long terme pour tous vos besoins de toiture à Laval.
          </RevealOnScroll>
        </div>
      </section>

      <ServicesGrid />
      <AdvantagesSection />
      <RealizationsGallery count={6} variant="preview" />
      <FinalCTA
        title="Votre toiture à Laval mérite un expert"
        sub="Obtenez une soumission gratuite dès aujourd'hui."
      />
    </main>
  );
}
```

- [ ] **Step 4: Create app/couvreur-montreal-nord/page.tsx**

```tsx
import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { RealizationsGallery } from '@/components/sections/RealizationsGallery';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { RevealOnScroll } from '@/components/reveal/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Couvreur à Montréal-Nord',
  description: 'Couverture de la Rive-Nord — votre couvreur à Montréal-Nord. Spécialiste des membranes blanches EPDM et TPO pour toits plats, résidentiel et commercial. APCHQ + Firestone.',
  alternates: { canonical: '/couvreur-montreal-nord' },
};

export default function CouvreurMontrealNordPage() {
  return (
    <main>
      <PageHeader
        title="Votre couvreur à Montréal-Nord"
        sub="Membre APCHQ · Certifié Firestone · 23+ ans d'expérience"
      />

      <section className="section section--light">
        <div className="container">
          <RevealOnScroll as="p" className="section__lead">
            Couverture de la Rive-Nord est une compagnie de toiture dans le secteur résidentiel et commercial à Montréal-Nord, spécialisée dans les membranes blanches. Fière d'une expérience de plus de 15 ans auprès des Nord-Montréalais, notre équipe vous offre des services professionnels, courtois et minutieux en utilisant des matériaux écologiques et durables. Recommandée par l'APCHQ et certifiée par Firestone.
          </RevealOnScroll>
        </div>
      </section>

      <ServicesGrid />
      <AdvantagesSection />
      <RealizationsGallery count={6} variant="preview" />
      <FinalCTA
        title="Votre toiture à Montréal-Nord mérite un expert"
        sub="Obtenez une soumission gratuite dès aujourd'hui."
      />
    </main>
  );
}
```

- [ ] **Step 5: Run dev and verify all 4 new pages**

```bash
npm run dev
```

Visit each:
- http://localhost:3000/services
- http://localhost:3000/membranes
- http://localhost:3000/couvreur-laval
- http://localhost:3000/couvreur-montreal-nord

Each should render correctly with PageHeader and the appropriate sections. Nav links should work between all 7 routes.

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/services/ app/membranes/ app/couvreur-laval/ app/couvreur-montreal-nord/
git commit -m "feat(phase-2): add /services, /membranes, /couvreur-laval, /couvreur-montreal-nord routes"
```

---

## Task 16: Add sitemap, robots, LocalBusiness schema

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `components/seo/LocalBusinessSchema.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://couverturerivenord.com';
  const now = new Date();
  const routes = ['', '/services', '/membranes', '/realisations', '/contact', '/couvreur-laval', '/couvreur-montreal-nord'];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1.0 : path.startsWith('/couvreur-') ? 0.9 : 0.8,
  }));
}
```

- [ ] **Step 2: Create app/robots.ts**

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://couverturerivenord.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create LocalBusinessSchema component**

`components/seo/LocalBusinessSchema.tsx`:

```tsx
import { SITE } from '@/lib/constants';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: SITE.legalName,
    image: `${SITE.url}/logo.png`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.zones.map((z) => ({ '@type': 'City', name: z })),
    priceRange: '$$',
    sameAs: [SITE.facebook],
    description: 'Compagnie de toiture spécialisée dans les membranes blanches EPDM et TPO pour toits plats. Résidentiel et commercial. Membre APCHQ, certifié Firestone.',
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 4: Inject schema into root layout**

Modify `app/layout.tsx` `<body>`:

```tsx
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';

// ... in body, before <PromoBar /> ...
<body>
  <LocalBusinessSchema />
  <PromoBar />
  <StickyNav />
  {children}
  <Footer />
</body>
```

- [ ] **Step 5: Verify sitemap and robots**

```bash
npm run dev
```

Visit:
- http://localhost:3000/sitemap.xml → should output XML listing 7 routes
- http://localhost:3000/robots.txt → should output rules + sitemap URL
- View source of any page → should contain a `<script type="application/ld+json">` block with the LocalBusiness schema

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts components/seo/ app/layout.tsx
git commit -m "feat(phase-2): add sitemap, robots, LocalBusiness JSON-LD schema"
```

---

## Task 17: Production build verify

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
npm run build
```

Expected output: all 7 routes prerendered or built without errors. No TypeScript errors, no ESLint errors. Look for the routes summary table at the end.

If errors appear, fix them. Common issues:
- Missing `'use client'` on a component that uses hooks → add it
- Type errors → fix the offending file
- Image dimensions warning → ensure all `<Image>` calls have `width` + `height`

- [ ] **Step 2: Test production build locally**

```bash
npm run start
```

Open http://localhost:3000. Walk through all 7 pages. Test:
- Hero video plays
- Carousel auto-advances
- Stats count up
- Form submits (will fail with "Erreur de configuration" since MAKE_WEBHOOK_URL is not set locally — that's correct)
- Mobile breakpoints work
- Console clean

Stop with Ctrl+C.

- [ ] **Step 3: No commit needed unless fixes were applied**

If you fixed issues:

```bash
git add .
git commit -m "fix(phase-2): production build issues from npm run build"
```

---

## Task 18: Push to GitHub, set up Vercel deploy

**Files:** None (deploy operation)

- [ ] **Step 1: Push to GitHub**

```bash
cd "/Users/markbenyaminian/Desktop/Couverture de la rive nord "
git push origin main
git push --tags
```

- [ ] **Step 2: Tag the Phase 2 milestone**

```bash
git tag phase-2-nextjs-v1
git push --tags
```

- [ ] **Step 3: Connect Vercel**

This is a manual step the user does:
1. Go to https://vercel.com/new
2. Import the repository `onyxops19/Couverture-de-la-rive-nord`
3. **Framework preset:** Next.js (auto-detected)
4. **Root Directory:** `/` (leave as-is — the Next.js project is now at the repo root)
5. **Build & Output Settings:** all defaults
6. **Environment Variables:** add `MAKE_WEBHOOK_URL` with the Make webhook URL
7. Click Deploy

After ~60s, Vercel returns a `*.vercel.app` URL.

- [ ] **Step 4: Production verification**

On the production URL:
- Walk through all 7 pages
- Submit the contact form with a test entry — verify it lands in Make
- Check Lighthouse score on the homepage (Chrome DevTools → Lighthouse → Mobile)
  - Performance ≥ 90 target
  - Accessibility ≥ 95
  - SEO ≥ 95
- Check `https://<your-url>/sitemap.xml` returns XML
- Check `https://<your-url>/robots.txt` returns rules

- [ ] **Step 5: Validate LocalBusiness schema**

Go to https://search.google.com/test/rich-results and paste your homepage URL. Confirm the RoofingContractor schema is detected with no errors.

- [ ] **Step 6: Final commit if needed**

If anything was tweaked:

```bash
git add .
git commit -m "fix(phase-2): production tweaks post-deploy"
git push
```

---

## Self-Review Checklist (run after writing this plan)

✅ **Spec coverage:** All 7 routes from spec section 5.1 covered (T13, T14, T15). Components from 5.2 covered across T4–T13. SEO from 5.3 covered T16. Image opt from 5.4 covered (Image component used throughout). Form from 5.5 covered T14. Deploy from 5.6 covered T18.

✅ **Placeholder scan:** No "TBD", "implement later", or vague phrases. Every code block contains real code. Every command has expected output. Server action and form components fully specified.

✅ **Type consistency:** `SITE`, `TESTIMONIALS`, `SERVICES`, `ADVANTAGES`, `REALIZATIONS` defined in T3 and used consistently in later tasks. Component prop types defined where used. `ContactState` type exported from actions.ts and imported in ContactForm.

✅ **CSS class compatibility:** All HTML class names from `_archive/preview/` (`.section`, `.section--dark`, `.btn`, `.btn--gold`, `.hero`, `.testimonials`, etc.) preserved in the React components — the ported `globals.css` works without changes.

---

## After deploy

Phase 2 is shipped when Task 18 verification passes. Domain configuration (custom domain for `couverturerivenord.com`) is a Vercel dashboard step the user handles separately when the DNS is ready.
