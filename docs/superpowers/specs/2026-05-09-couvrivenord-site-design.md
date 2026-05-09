# Design Spec — Couverture de la Rive-Nord (Couvri Vénord) Website

**Date:** 2026-05-09
**Client:** Couverture de la Rive-Nord Inc.
**Project root:** `/Users/markbenyaminian/Desktop/Couverture de la rive nord /`
**Source-of-truth design doc:** `/Users/markbenyaminian/Desktop/design-spec-couvrivenord.md` (Onyx Solutions, May 2026)
**Builder:** Mark Benyaminian (Onyx Solutions)

> This spec captures the validated decisions from brainstorming. The original design spec covers visual identity (typography, palette, components, animations, content). This spec covers **execution decisions** — how we build, in what order, with what tech, and where the lines fall between Phase 1 (preview) and Phase 2 (production).

---

## 1. Goal

Ship a French-language marketing website for Couverture de la Rive-Nord, a Quebec roofing company specializing in white EPDM/TPO membranes for flat roofs. The site replaces the current `couvrivenord.com`. It must rank for local geo keywords (`couvreur Laval`, `couvreur Montréal-Nord`, `toiture Rive-Nord`), capture leads via a contact form with a roofing-specific pre-diagnostic question, and project an authority register that matches the brand identity (charcoal + gold + white).

---

## 2. Constraints & Decisions

### 2.1 Workflow — two phases

**Phase 1 — Static HTML preview (homepage only)**
The homepage is built as a single-file static HTML page in `preview/` so the client and the builder can iterate on visual feel (animations, hero video pacing, typographic rhythm, copy nuances) without compile time. No build step, no framework, no dependencies. Every component the rest of the site needs appears at least once on the homepage, so the preview doubles as the design proof.

**Phase 2 — Next.js 14 port + remaining pages**
Once the homepage preview is approved, the project is scaffolded as Next.js 14 App Router. The homepage is split into proper React components. The remaining six pages (Services, Membranes, Réalisations, Contact, Couvreur Laval, Couvreur Montréal-Nord) are built reusing those components. The static `preview/` folder is moved to `_archive/` for reference, never deleted.

This is **A3** from brainstorming, not A1 (homepage HTML only) or A2 (all pages as static HTML upfront).

### 2.2 Final framework

**Next.js 14 App Router.** Matches the user's existing client-site pattern (VENCOAC, Réfrigération Or — both Next.js 14). Built-in image optimization, easy Vercel deploy, route-based code splitting, and metadata API for SEO. The two SEO-critical pages — `/couvreur-laval` and `/couvreur-montreal-nord` — get full metadata, structured data (LocalBusiness schema), and clean URLs.

### 2.3 Language

**French only.** Spec's audience and content are heavily Québécois-French; doubling the site to bilingual adds 2× content work for a market segment that mostly reads French. Bilingual is easy to bolt on later if the client asks.

### 2.4 Animation tech

**Pure CSS + IntersectionObserver in both phases.** The original spec mandates conservative, functional motion ("efficace, pas ludique") — fade + translateY, ease-out, no springs, no cinematic sequences. CSS + IO covers every animation in the spec. **Framer Motion is reserved as a Phase-2 upgrade** if any specific section feels flat after the port; it's purely additive in Next.js (`npm install framer-motion`, swap one component at a time).

### 2.5 Brand palette — overrides the spec's inferred red

The original spec inferred `#cc1f1f` red as the CTA accent. The actual brand identity, sampled from the client's logo (`/Users/markbenyaminian/Desktop/couverture-de-la-rive-nord-logo.jpg`), is **gold/yellow on warm charcoal** — no red anywhere. CTAs in this build use brand gold.

| Token | Hex | Usage |
|---|---|---|
| `--brand-charcoal` | `#2A2A2A` | Sticky nav, dark sections, footer (matches logo bg pixel-for-pixel) |
| `--brand-gold` | `#E9A828` | CTAs, accents, link hovers, gold rules under badges |
| `--gold-hover` | `#F2B73E` | Button hover state (slightly brighter) |
| `--gold-active` | `#C68F1E` | Button pressed state (slightly deeper) |
| `--white` | `#FFFFFF` | Headings on dark, light section backgrounds |
| `--cream` | `#D9D9D9` | Subtle small text on dark (the "de la" register from the logo) |
| `--text-dark` | `#1A1A1A` | Body copy on white |
| `--text-muted` | `#666666` | Secondary text, footer, labels |
| `--bg-light` | `#F8F8F8` | Light section background variant |
| `--border` | `#E0E0E0` | Form fields, separators |

**No red. No gradients. No multi-tone colored icons.** All other rules from the original spec stand.

### 2.6 Typography

Per original spec: **Raleway 700** for headings/display, **Open Sans 400/500/600** for body. Loaded via Google Fonts CDN in Phase 1 preview, swapped to `next/font/google` in Phase 2 for self-hosting and CLS prevention.

### 2.7 Hero video

Stock drone footage from **Pexels** (royalty-free, MP4 H.264, ~10–20s loop). I source 2–3 candidates ("drone roof aerial", "flat roof aerial", "roofing aerial") and pick the strongest. Saved to `preview/assets/hero.mp4`. Markup: `<video autoplay muted loop playsinline>` with a `rgba(0,0,0,0.55)` overlay and content layer above. **Real client video swaps in by replacing that one file** — no markup changes needed.

### 2.8 Logo handling

Source: `/Users/markbenyaminian/Desktop/couverture-de-la-rive-nord-logo.jpg`. The logo's built-in dark background (`#2A2A2A`) matches the nav and footer backgrounds, so no edge artifact. **No "white version" needed** — the homepage layout never places the logo on a white background. The original spec's recommendation to prepare two logo versions does not apply to this build.

---

## 3. Asset inventory (real client images already downloaded)

All images live at `/Users/markbenyaminian/Desktop/Couverture de la rive nord /images_site/`. Downloaded directly from `couvrivenord.com/wp-content/uploads/` on 2026-05-09.

| File | Size | Use |
|---|---|---|
| `couverture-de-la-rive-nord-logo.jpg` | 21 KB | Nav (top-left) + footer |
| `couverture-rive-nord-equipe.png` | 110 KB | About section / team imagery |
| `Couverture-de-la-rive-nord-nos-services.jpg` | 62 KB | Services section banner if needed |
| `Couverture-de-la-rive-nord-installation-de-toiture.jpg` | 58 KB | Installation service card |
| `Couverture-de-la-rive-nord-la-membrane-EPDM.jpg` | 47 KB | EPDM block (membranes section) |
| `Couverture-de-la-rive-nord-la-membrane-TPO.jpg` | 40 KB | TPO block (membranes section) |
| `couverture-de-la-rive-nord-inc-logo-realisations-1.jpg` … `-12.jpg` | 48–233 KB each | Gallery (12 photos) + stand-in for 6 service cards lacking dedicated photos |
| `Couverture-rive-nord-realisations-3.jpg` | 61 KB | Duplicate of one of the 12; ignored |

**Gaps (using stand-ins until client provides):**
- Service cards for Réparation, Réfection, Inspection, Entretien, Déneigement, Autres → use 6 of the 12 realization photos as stand-ins. Real flat-roof / white-membrane shots, so they fit visually. Swap when client supplies dedicated photos.
- Hero video → Pexels stock drone footage (placeholder until client sends real footage).
- APCHQ + Firestone badges → text-based blocks in the preview (white serif text on charcoal with a thin gold rule). Real logo files swap in when the client supplies them.

---

## 4. Phase 1 — Static HTML preview deliverable

### 4.1 File structure

```
/Users/markbenyaminian/Desktop/Couverture de la rive nord /
├── images_site/                         (already populated, 18 real images)
├── docs/
│   └── superpowers/specs/
│       └── 2026-05-09-couvrivenord-site-design.md   (this spec)
└── preview/
    ├── index.html                       (homepage, single file)
    ├── styles.css                       (all design tokens + components)
    ├── script.js                        (IntersectionObserver, count-up, mobile menu, hover micro-interactions)
    └── assets/
        ├── hero.mp4                     (Pexels stock drone footage)
        ├── logo.jpg                     (copy from images_site/)
        ├── services/                    (renamed copies, one per card)
        │   ├── installation.jpg
        │   ├── reparation.jpg           (stand-in: realization-N.jpg)
        │   ├── refection.jpg            (stand-in)
        │   ├── inspection.jpg           (stand-in)
        │   ├── entretien.jpg            (stand-in)
        │   ├── deneigement.jpg          (stand-in)
        │   └── autres.jpg               (stand-in)
        ├── membranes/
        │   ├── epdm.jpg
        │   └── tpo.jpg
        └── realisations/                (12 photos, real client work)
            ├── realisation-01.jpg
            ├── realisation-02.jpg
            └── … through realisation-12.jpg
```

### 4.2 Homepage component map (top-to-bottom, scroll order)

| # | Block | Background | Content |
|---|---|---|---|
| 1 | Top info bar | White `#FFF` | Phone `(514) 835-7617` left · email `info@couverturerivenord.com` right · ~40px tall |
| 2 | Sticky nav | Charcoal `#2A2A2A` | Logo top-left · ACCUEIL · NOS SERVICES ▾ · NOS MEMBRANES ▾ · NOS RÉALISATIONS · À PROPOS ▾ · CONTACT · phone CTA on far right |
| 3 | Hero (full viewport) | Looping Pexels drone video + 55% dark overlay | H1 broken at the comma + sub-paragraph + APCHQ \| Firestone badges + 2 CTAs ("APPELEZ MAINTENANT" outline, "OBTENIR UNE SOUMISSION" gold solid) |
| 4 | Value / slogan | White | H2 "Qualité et fiabilité / sous un même toit !" + intro paragraph + inline link "En savoir plus sur nos services →" |
| 5 | About / stats | Charcoal | H2 "Plus de 23 ans au service de votre toiture" + paragraph + 3 stats (`23+` · `50 ans` · `30 ans`) + APCHQ + Firestone text badges |
| 6 | Services grid | White | H2 "Nos services de toiture / à Laval et Montréal-Nord" + 7-card grid (Installation, Réparation, Réfection, Inspection, Entretien, Déneigement, Autres). Each: photo top → H3 → short paragraph → "EN SAVOIR PLUS →" arrow that nudges 4px on hover |
| 7 | Inline CTA strip | Gold `#E9A828` | "Votre toiture mérite un expert — obtenez une soumission gratuite aujourd'hui !" + button (intentional burst: charcoal background, white text — inverted from the standard gold-on-charcoal button to create a deliberate rhythm break between the white services section and the dark membranes section) |
| 8 | Membranes (alternating) | Charcoal | H2 "Notre spécialité : / la membrane blanche" + intro + EPDM block (image left / text right) + TPO block (text left / image right) + CTA "VOIR NOS RÉALISATIONS" |
| 9 | Advantages | Charcoal | H2 "Pourquoi choisir / Couverture de la Rive-Nord ?" + 3-column (icon + H3 + body): service exceptionnel · équipe compétente · prix compétitifs + 2 outline CTAs (COUVREUR LAVAL · COUVREUR MONTRÉAL-NORD) |
| 10 | Realizations preview | White | H2 "Nos réalisations" + sub "Voyez notre travail en images" + 6-photo grid (links to full gallery on Phase 2 page) + "VOIR TOUTES NOS RÉALISATIONS →" |
| 11 | Final CTA | Charcoal | "Besoin d'un couvreur à Laval ou Montréal-Nord ?" bold + sub + big gold "OBTENIR UNE SOUMISSION GRATUITE !" button |
| 12 | Footer | Charcoal | Logo · APCHQ + Firestone · address (3776 Rue Georges Corbeil, Terrebonne, QC, J6X 4J5) · phone · email · Facebook · quick links · service zones · `© 2026 Couverture de la Rive-Nord Inc.` |

Every block has or terminates in a CTA, per the original spec's rule.

### 4.3 Animation choreography

| Element | On entry | Hover/interaction |
|---|---|---|
| Hero H1 | Fade + translateY 30→0, 600ms ease-out, on load | — |
| Hero sub-paragraph | Same, 200ms delay | — |
| Hero badges | Same, 400ms delay | — |
| Hero CTAs | Same, 600ms delay | Brightness +15%, scale 1.02, 150ms |
| Sticky nav | None | Subtle shadow once page scrolls past 80px; gold underline on link hover |
| Stats numbers | Count up 0→target over 1500ms when scrolled into view | — |
| Service cards | Stagger fade+slide, 100ms apart left→right | Card stays flat (no shadow); arrow → slides 4px right; gold color intensifies |
| Inline gold CTA strip | Fade in | Button: brightness +15% |
| Membrane blocks | Each fades+slides independently when entering viewport | — |
| Advantages icons | Stagger fade-in | Icons scale 1.05 |
| Realizations thumbs | Stagger fade-in, 80ms apart | Scale 1.02, dark overlay fades in with white loupe icon |
| Final CTA button | Fade in | Brightness +15%, scale 1.02 |
| Mobile menu | Slide-in from right, 250ms ease-out | Hamburger animates to X |

**Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out) everywhere. No springs.

**Reduced-motion compliance:** `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; transform: none !important; } }`. Six lines, full a11y baseline.

### 4.4 Responsive breakpoints

| Breakpoint | Range | Behavior |
|---|---|---|
| Desktop | 1200px+ | Full layout, all columns, two-tier nav |
| Laptop / tablet landscape | 992–1199px | Reduced columns possible, horizontal nav still |
| Tablet portrait | 768–991px | Grids drop to 2 cols, nav becomes hamburger |
| Mobile | <768px | Single column, hamburger menu, top info bar compresses or hides phone-only |

Mobile drawer: full-screen slide-in, links stacked, persistent phone CTA pinned to bottom.

### 4.5 Form (Contact page in Phase 2 preview only — homepage has CTA strip linking to it)

Fields per original spec (locked):
- Nom * · Prénom * · Courriel * · Téléphone * · Adresse complète *
- **Avez-vous un puit de lumière ? Oui / Non** ← preserved exactly as-is, the spec's signature non-generic detail
- Message
- Submit: gold button "ENVOYER MA DEMANDE"

(Note: form is built in Phase 2 only — homepage preview links to the future `/contact` route.)

---

## 5. Phase 2 — Next.js 14 production deliverable

### 5.1 Routes

```
app/
├── layout.tsx                          (Header + Footer)
├── page.tsx                            (Homepage — port of Phase 1)
├── services/
│   ├── page.tsx                        (overview + grid of all 7 services)
│   └── [slug]/page.tsx                 (optional individual service pages if desired later)
├── membranes/page.tsx
├── realisations/page.tsx               (full 12-photo gallery)
├── contact/
│   ├── page.tsx
│   └── actions.ts                      (server action: form submit → email)
├── couvreur-laval/page.tsx             (SEO geo page)
└── couvreur-montreal-nord/page.tsx     (SEO geo page)
```

### 5.2 Components (extracted from homepage)

```
components/
├── layout/
│   ├── TopInfoBar.tsx
│   ├── StickyNav.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── ValueSlogan.tsx
│   ├── StatsSection.tsx
│   ├── ServicesGrid.tsx
│   ├── MembranesAlternating.tsx
│   ├── AdvantagesSection.tsx
│   ├── RealizationsPreview.tsx
│   ├── InlineCTAStrip.tsx
│   └── FinalCTA.tsx
├── ui/
│   ├── Button.tsx                      (gold solid / outline variants)
│   ├── ServiceCard.tsx
│   ├── StatBlock.tsx
│   ├── AdvantageBlock.tsx
│   └── GalleryThumb.tsx
└── form/
    └── ContactForm.tsx                 (with the puit-de-lumière question)
```

### 5.3 SEO

- `app/layout.tsx` → site-level metadata (title template, OG image, lang=`fr-CA`)
- Each route → its own `generateMetadata` for title, description, canonical
- `app/sitemap.ts` → auto-generated sitemap
- `app/robots.ts` → standard rules
- LocalBusiness JSON-LD schema in the homepage and the two `/couvreur-*` pages, including address (3776 Rue Georges Corbeil, Terrebonne, QC), phone, served zones (Laval, Montréal-Nord, Terrebonne, Rive-Nord), and certifications

### 5.4 Image optimization

`<Image>` from `next/image` everywhere. Source images in `public/images/` (copied from `images_site/` and renamed). Hero video stays as a raw `<video>` (Next.js doesn't optimize video).

### 5.5 Form submission

`app/contact/actions.ts` server action. Send to `info@couverturerivenord.com` via Resend or similar (decide in implementation plan). Form returns a success/error state without page reload.

### 5.6 Deployment target

**Vercel.** Same as the user's other client sites. Deploy command, env vars (Resend API key), and domain setup happen in the implementation plan, not this spec.

---

## 6. Out of scope (explicit non-goals)

- **Bilingual FR/EN.** French only.
- **Blog or CMS.** No content authoring beyond what's in the spec.
- **Customer portal, login, account.** Marketing site only.
- **Online quote calculator.** Phone + form.
- **Live chat widget.** Spec's anti-pattern #6 — explicitly rejected.
- **Generic customer testimonials with star ratings.** Spec's anti-pattern #2 — for the initial launch, APCHQ + Firestone certifications carry the trust load. *Future:* the client plans to add a testimonials section in a later iteration. When that happens, design it to complement the certifications (real photos, specific projects, named clients with municipality), not the generic star-rating pattern. To be specced separately when the client provides content.
- **Animated illustrations or "kawaii" icons.** Spec's anti-pattern #1.
- **Framer Motion in Phase 1.** Reserved as a Phase 2 add-on if specific sections feel flat.
- **A "white logo" version.** Logo only appears on charcoal; the existing file works as-is.

---

## 7. Risks & open items

| Risk | Mitigation |
|---|---|
| Pexels drone footage doesn't match the brand register | I source 2–3 candidates and pick the strongest. If none fit, fall back to a high-quality drone *photo* with CSS Ken Burns pan/zoom. |
| 6 of 7 service cards use realization photos as stand-ins | Visually consistent (real flat-roof work) for the preview. Swap to dedicated shots when client supplies them. |
| APCHQ + Firestone badges as text blocks may look weaker than real logos | Acceptable for preview. Real logo files are a one-pass asset swap in Phase 2. |
| Form submission needs an email backend | Decide in the implementation plan: Resend (recommended), SendGrid, or a webhook. |
| Phone number `+1 (514) 835-7617` should be a `tel:` link on mobile | Built into the markup from day 1. |
| Path with trailing space `Couverture de la rive nord ` | Preserved exactly; all shell commands quote it. Renaming is out of scope. |

---

## 8. Acceptance criteria

### Phase 1 preview is approved when:
- [ ] `preview/index.html` renders cleanly in Chrome, Safari, and Firefox at 1440px width
- [ ] Hero video autoplays, muted, loops seamlessly
- [ ] All 12 sections appear in correct order with correct backgrounds (white/charcoal alternation)
- [ ] All animations fire correctly: hero stagger, scroll fade-ins, count-up stats, hover micro-interactions
- [ ] Mobile viewport (375px) shows hamburger nav, single-column layout, sticky phone CTA
- [ ] Reduced-motion preference disables all animations
- [ ] All 18 real client images render at correct sizes
- [ ] Brand gold `#E9A828` is the only CTA color
- [ ] Typography matches spec: Raleway headings, Open Sans body
- [ ] Client (Mark Benyaminian) signs off on visual feel

### Phase 2 production is approved when:
- [ ] All 7 routes render without errors
- [ ] Lighthouse performance ≥ 90 on the homepage (mobile)
- [ ] LocalBusiness schema validates on Google Rich Results Test
- [ ] Contact form submits and triggers an email to `info@couverturerivenord.com`
- [ ] Real client photos for the 6 stand-in service cards are swapped in (when supplied)
- [ ] Real Pexels drone footage swapped for client video (when supplied)
- [ ] Real APCHQ + Firestone logos swapped for text badges (when supplied)
- [ ] Site deployed to Vercel and accessible via custom domain (domain config out of this spec)

---

## 9. Process notes

- **Spec source of truth:** `/Users/markbenyaminian/Desktop/design-spec-couvrivenord.md` (visual identity, content, copy)
- **This spec adds:** workflow phases, framework choices, asset sourcing, palette overrides (gold replaces red), animation tech, file structure, scope cuts
- **Conflicts between this spec and the source spec:** this spec wins. Specifically: gold CTAs (not red), warm charcoal `#2A2A2A` (not blue-charcoal `#1a1a2e`), no "white logo version".
- **Implementation plan:** generated next via the `superpowers:writing-plans` skill.
