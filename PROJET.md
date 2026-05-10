# Couverture de la Rive-Nord — Documentation complète du projet

> Site marketing Next.js 14 pour **Couverture de la Rive-Nord Inc.**, compagnie de toiture à Laval et Montréal-Nord, spécialiste des membranes blanches EPDM et TPO pour toits plats.

---

## Table des matières

1. [Informations client](#1-informations-client)
2. [Accès et comptes](#2-accès-et-comptes)
3. [Architecture du projet](#3-architecture-du-projet)
4. [Pages du site](#4-pages-du-site)
5. [Composants](#5-composants)
6. [Données et contenu](#6-données-et-contenu)
7. [Styles et design tokens](#7-styles-et-design-tokens)
8. [Développement local](#8-développement-local)
9. [Déploiement Vercel](#9-déploiement-vercel)
10. [Formulaire de contact (Make.com)](#10-formulaire-de-contact-makecom)
11. [SEO](#11-seo)
12. [Modifications futures](#12-modifications-futures)

---

## 1. Informations client

| Champ | Valeur |
|---|---|
| Entreprise | Couverture de la Rive-Nord Inc. |
| Téléphone | +1 (514) 835-7617 |
| Courriel | admin@couverturerivenord.com |
| Adresse | 3776 Rue Georges Corbeil, Terrebonne, QC J6X 4J5 |
| Zones desservies | Laval · Montréal-Nord · Terrebonne · Rive-Nord |
| Facebook | https://fr-ca.facebook.com/CouvertureRiveNord/ |
| Certifications | Membre APCHQ · Certifié Firestone |
| Années d'expérience | 23+ ans |
| Domaine visé | couverturerivenord.com |

---

## 2. Accès et comptes

| Service | Détail |
|---|---|
| **GitHub** | https://github.com/onyxops19/Couverture-de-la-rive-nord |
| **Vercel** | Lier le repo GitHub ci-dessus — auto-deploy sur `main` |
| **Make.com** | Le client gère lui-même le webhook (voir section 10) |
| **Google Maps** | Embed dans `/contact` — coordonnées approximatives à raffiner |

---

## 3. Architecture du projet

```
Couverture de la rive nord /
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout racine (PromoBar + Nav + Footer + JSON-LD)
│   ├── globals.css             # Tous les styles (CSS custom properties)
│   ├── page.tsx                # Page d'accueil
│   ├── contact/
│   │   ├── page.tsx            # Page contact (formulaire + carte + infos)
│   │   └── actions.ts          # Server action → Make.com webhook
│   ├── realisations/
│   │   └── page.tsx            # Galerie complète (12 photos)
│   ├── services/
│   │   └── page.tsx            # Page services
│   ├── membranes/
│   │   └── page.tsx            # Page membranes EPDM & TPO
│   ├── couvreur-laval/
│   │   └── page.tsx            # Landing page SEO Laval
│   ├── couvreur-montreal-nord/
│   │   └── page.tsx            # Landing page SEO Montréal-Nord
│   ├── sitemap.ts              # Sitemap XML automatique
│   └── robots.ts               # robots.txt automatique
│
├── components/
│   ├── layout/
│   │   ├── PromoBar.tsx        # Barre dorée «Places limitées» en haut
│   │   ├── StickyNav.tsx       # Navigation sticky (client component)
│   │   └── Footer.tsx          # Pied de page 3 colonnes
│   ├── sections/
│   │   ├── Hero.tsx            # Vidéo drone en fond, titre, CTAs
│   │   ├── ValueWithTestimonials.tsx  # Texte valeur + carrousel témoignages
│   │   ├── StatsSection.tsx    # Compteurs animés (23 ans, 50 ans, 30 ans)
│   │   ├── ServicesGrid.tsx    # Grille 7 services + carte zones desservies
│   │   ├── InlineCTAStrip.tsx  # Bandeau doré «Obtenir une soumission»
│   │   ├── MembranesAlternating.tsx  # EPDM + TPO alternés image/texte
│   │   ├── AdvantagesSection.tsx     # 3 colonnes: service / compétence / prix
│   │   ├── RealizationsGallery.tsx   # Galerie photos (preview 6 ou full 12)
│   │   └── FinalCTA.tsx        # Section appel à l'action finale
│   ├── carousel/
│   │   └── TestimonialsCarousel.tsx  # 12 témoignages, auto-avance, swipe
│   ├── form/
│   │   └── ContactForm.tsx     # Formulaire soumission (client component)
│   ├── reveal/
│   │   └── RevealOnScroll.tsx  # Wrapper IntersectionObserver (animations)
│   ├── seo/
│   │   └── LocalBusinessSchema.tsx   # JSON-LD RoofingContractor schema
│   └── ui/
│       ├── Button.tsx          # Bouton multi-variantes (gold, charcoal, outline...)
│       ├── CertBadge.tsx       # Badge de certification APCHQ / Firestone
│       ├── PageHeader.tsx      # En-tête des pages internes (charcoal + dégradé)
│       └── AdvantageIcon.tsx   # Icônes SVG (maison / médaille / dollar)
│
├── lib/
│   ├── constants.ts            # SITE (nom, tél, courriel, adresse, zones) + PROMO_TEXT
│   └── content.ts              # TESTIMONIALS (12) · SERVICES (7) · ADVANTAGES (3) · REALIZATIONS (12)
│
├── public/
│   ├── hero.mp4                # Vidéo drone — fond de la section Hero
│   ├── logo.png                # Logo transparent
│   ├── realisations/           # realisation-01.jpg à realisation-12.jpg
│   ├── services/               # installation.jpg, reparation.jpg, etc.
│   └── membranes/              # epdm.jpg, tpo.jpg
│
├── _archive/preview/           # Phase 1 — maquette HTML statique (référence figée)
├── docs/superpowers/           # Spec de design + plans d'implémentation
├── .env.example                # Variables d'environnement à copier
└── images_site/                # Photos originales du client (source)
```

---

## 4. Pages du site

| Route | Titre | Description |
|---|---|---|
| `/` | Page d'accueil | Hero vidéo → Valeur + Témoignages → Stats → Services → CTA → Membranes → Avantages → Galerie → CTA final |
| `/services` | Nos services | Les 7 services en grille de cartes |
| `/membranes` | Membranes EPDM & TPO | Présentation alternée image/texte des deux membranes |
| `/realisations` | Nos réalisations | Galerie complète 12 photos (4 colonnes) |
| `/contact` | Contactez-nous | Formulaire soumission + carte Google Maps + coordonnées |
| `/couvreur-laval` | Couvreur à Laval | Landing page SEO géolocalisée Laval |
| `/couvreur-montreal-nord` | Couvreur à Montréal-Nord | Landing page SEO géolocalisée Montréal-Nord |

---

## 5. Composants

### Composants client (interactifs)

| Composant | Rôle |
|---|---|
| `StickyNav` | Ombre au scroll, menu hamburger mobile, lien actif via `usePathname` |
| `TestimonialsCarousel` | 12 témoignages, auto-avance 6s, boutons prev/next, points, swipe tactile, pause au survol |
| `StatsSection` | Compteurs animés déclenchés par `IntersectionObserver` |
| `RevealOnScroll` | Ajoute `is-visible` via `IntersectionObserver` — gère toutes les animations d'entrée |
| `ContactForm` | Formulaire avec `useFormState` + `useFormStatus`, succès/erreur |

### Variantes du bouton `Button`

| `variant` | Apparence |
|---|---|
| `gold` | Fond doré (#E9A828) + texte foncé — CTA principal |
| `charcoal` | Fond anthracite + texte blanc |
| `outline-white` | Contour blanc — sur fonds sombres |
| `outline-charcoal` | Contour anthracite — sur fonds clairs |

### `RealizationsGallery` props

| Prop | Valeur | Usage |
|---|---|---|
| `count` | `6` ou `12` | Nombre de photos à afficher |
| `variant` | `'preview'` ou `'full'` | `preview` = 3 colonnes / `full` = 4 colonnes |
| `showLink` | `true` / `false` | Affiche ou non le lien «Voir toutes nos réalisations» |

---

## 6. Données et contenu

Tout le contenu modifiable est centralisé dans deux fichiers :

### `lib/constants.ts` — Informations du site

```ts
export const SITE = {
  name, legalName, url,
  phone, phoneRaw, email,
  facebook, address, zones,
  certifications, yearsInBusiness
}
export const PROMO_TEXT = 'Places limitées · Réservez votre place maintenant'
```

Pour changer le numéro de téléphone, le courriel, l'adresse ou les zones : **modifier uniquement ce fichier**, tout le site se met à jour automatiquement.

### `lib/content.ts` — Témoignages, services, avantages, réalisations

- **`TESTIMONIALS`** — 12 avis Google (quote, author, source)
- **`SERVICES`** — 7 services (slug, title, description, image, alt)
- **`ADVANTAGES`** — 3 avantages (iconKey, title, body)
- **`REALIZATIONS`** — Chemins des 12 photos (`/realisations/realisation-01.jpg` … `12.jpg`)

Pour ajouter un témoignage : ajouter un objet dans le tableau `TESTIMONIALS`.  
Pour ajouter une réalisation : déposer la photo dans `public/realisations/` et ajouter le chemin dans `REALIZATIONS`.

---

## 7. Styles et design tokens

Tous les styles sont dans `app/globals.css`. Le système de design utilise des CSS custom properties :

| Token | Valeur | Usage |
|---|---|---|
| `--brand-charcoal` | `#202020` | Fond principal, nav, sections sombres |
| `--brand-gold` | `#E9A828` | Couleur accent, boutons CTA, titres en or |
| `--gold-active` | `#c8891a` | Hover sur éléments dorés |
| `--white` | `#ffffff` | Texte sur fond sombre, fonds clairs |
| `--font-raleway` | Raleway 700 | Titres (`--font-heading`) |
| `--font-open-sans` | Open Sans 400/500/600 | Corps de texte (`--font-body`) |

### Breakpoints

| Breakpoint | Largeur |
|---|---|
| Tablette | ≤ 992px |
| Mobile | ≤ 600px |

---

## 8. Développement local

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local
# Remplir MAKE_WEBHOOK_URL dans .env.local

# 3. Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# 4. Build de production (vérification)
npm run build
```

> **Note sur le répertoire :** Le dossier contient un espace final dans son nom (`Couverture de la rive nord `). Utiliser `python3 -c "import subprocess; subprocess.run(['npm', 'run', 'dev'], cwd='...')"` si les commandes shell normales échouent.

---

## 9. Déploiement Vercel

### Première mise en ligne

1. Aller sur [vercel.com](https://vercel.com) → **New Project**
2. Importer le repo GitHub : `onyxops19/Couverture-de-la-rive-nord`
3. Framework détecté automatiquement : **Next.js**
4. Ajouter la variable d'environnement :
   - `MAKE_WEBHOOK_URL` = URL du webhook Make.com
5. Cliquer **Deploy**

### Mises à jour

Chaque `git push` sur la branche `main` déclenche un redéploiement automatique.

### Domaine personnalisé

Dans Vercel → Project Settings → Domains :
1. Ajouter `couverturerivenord.com`
2. Vercel fournit les enregistrements DNS à configurer chez le registraire du domaine

---

## 10. Formulaire de contact (Make.com)

Le formulaire de soumission sur `/contact` envoie les données vers un webhook Make.com.

### Champs envoyés (JSON)

```json
{
  "name": "Jean Tremblay",
  "phone": "(514) 000-0000",
  "email": "jean@exemple.com",
  "message": "Décrivez votre projet…"
}
```

### Configuration côté développeur

1. Créer un scénario dans Make.com avec un déclencheur **Webhook** (type : Custom webhook)
2. Copier l'URL du webhook
3. Dans Vercel → Environment Variables : ajouter `MAKE_WEBHOOK_URL` = cette URL
4. Dans le scénario Make, connecter vers : envoi de courriel, SMS, notification Slack, fiche Notion, etc.

### Fichier `.env.local` (local uniquement — ne pas committer)

```
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/VOTRE_ID_ICI
```

---

## 11. SEO

### Métadonnées

Chaque page a ses propres `metadata` (title + description) via l'API Next.js. Le layout racine définit les valeurs par défaut et le template de titre.

### Sitemap et robots

- `/sitemap.xml` — généré automatiquement par `app/sitemap.ts`
- `/robots.txt` — généré automatiquement par `app/robots.ts`

### Schema JSON-LD

Le composant `LocalBusinessSchema` injecte un schema `RoofingContractor` sur toutes les pages, incluant nom, téléphone, courriel, adresse, zones desservies et heures d'ouverture.

### Pages SEO géolocalisées

- `/couvreur-laval` — cible les recherches «couvreur Laval»
- `/couvreur-montreal-nord` — cible les recherches «couvreur Montréal-Nord»

---

## 12. Modifications futures

### Modifications courantes

| Action | Fichier à modifier |
|---|---|
| Changer téléphone / courriel | `lib/constants.ts` |
| Ajouter un témoignage | `lib/content.ts` → tableau `TESTIMONIALS` |
| Ajouter une photo de réalisation | `public/realisations/` + `lib/content.ts` → `REALIZATIONS` |
| Modifier le texte de la barre promo | `lib/constants.ts` → `PROMO_TEXT` |
| Changer les heures d'ouverture (JSON-LD) | `components/seo/LocalBusinessSchema.tsx` |
| Ajouter un service | `lib/content.ts` → tableau `SERVICES` + déposer image dans `public/services/` |

### Améliorations possibles

- **Favicon + OG image** — Ajouter `app/icon.png` et `app/opengraph-image.png` (1200×630px) pour les partages sur les réseaux sociaux
- **Google Analytics** — Ajouter `@next/third-parties` avec `GoogleAnalytics` dans `layout.tsx`
- **Animations Framer Motion** — Remplacer `RevealOnScroll` (CSS) par des animations Framer pour plus de fluidité
- **Blog/articles** — Section articles pour le référencement local (ex: «Comment entretenir son toit plat au Québec»)
- **Google Maps embed** — Affiner les coordonnées GPS dans `app/contact/page.tsx` (iframe src)

---

*Dernière mise à jour : mai 2026*
