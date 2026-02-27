# 🔍 SEO Progress — lauralaprodumenage.fr

> Dernière mise à jour : 27 février 2026

---

## ✅ FAIT — Session du 27/02/2026

### 1. Fichiers techniques SEO
- **`public/robots.txt`** — Autorise tous les crawlers, lien vers sitemap
- **`public/sitemap.xml`** — 7 URLs déclarées avec priorités :
  - `/` (accueil) — priorité 1.0
  - `/#services` — priorité 0.9
  - `/#seniors` — priorité 0.8
  - `/#histoire` — priorité 0.7
  - `/#fiscal` — priorité 0.8
  - `/#recrutement` — priorité 0.6
  - `/#reserver` — priorité 0.9
- **`public/googlea847351313052ee5.html`** — Fichier de vérification Google Search Console

### 2. Balises Meta (index.html)
- `<title>` enrichi avec mots-clés : "Ménage à domicile, Aide Seniors, Repassage, Devis Gratuit"
- `<meta name="description">` optimisée (160 caractères, mots-clés naturels)
- `<meta name="keywords">` — ménage à domicile, femme de ménage, aide seniors, repassage, vitres, terrasse, crédit impôt, services à la personne
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="https://lauralaprodumenage.fr/">`

### 3. Open Graph (Facebook, LinkedIn)
- `og:type` = website
- `og:title` = "Laura la Pro du Ménage — Ménage à domicile & Aide Seniors"
- `og:description` = description courte avec crédit d'impôt 50%
- `og:url`, `og:site_name`, `og:locale` = fr_FR

### 4. Twitter Cards
- `twitter:card` = summary_large_image
- `twitter:title` + `twitter:description`

### 5. JSON-LD Schema.org (index.html)
- Type : **LocalBusiness**
- 7 serviceType déclarés : Ménage à domicile, Aide aux seniors, Repassage, Vitres, Terrasses, Airbnb, Bureaux/copropriétés
- OfferCatalog avec 3 offres détaillées (Service + description)
- paymentAccepted : Cash, Credit Card, CESU
- priceRange : €€
- areaServed : France

### 6. Titres dynamiques par page (App.jsx)
Chaque page a son propre `document.title` qui change dynamiquement :
| Page | Titre |
|------|-------|
| accueil | Laura la Pro du Ménage — Ménage à domicile, Aide Seniors, Repassage \| Devis Gratuit |
| services | Nos Services de Ménage à Domicile \| Laura la Pro du Ménage |
| seniors | Aide Ménagère Seniors à Domicile \| Laura la Pro du Ménage |
| histoire | Notre Histoire — Qui est Laura ? \| Laura la Pro du Ménage |
| fiscal | Crédit d'Impôt 50% — Avantage Fiscal Ménage \| Laura la Pro du Ménage |
| reserver | Réserver un Service de Ménage — Devis Gratuit \| Laura la Pro du Ménage |
| recrutement | Recrutement — Rejoignez Notre Équipe \| Laura la Pro du Ménage |
| admin | Administration \| Laura la Pro du Ménage |

### 7. Alt tags images optimisés (App.jsx)
Les 12 balises `<img>` ont des alt descriptifs SEO-friendly :
- "Laura la Pro du Ménage — femme de ménage souriante et professionnelle"
- "Service de ménage régulier pour familles débordées à domicile"
- "Aide ménagère et accompagnement bienveillant pour personnes âgées"
- "Ménage professionnel pour locations Airbnb et gîtes"
- "Nettoyage de bureaux et parties communes de copropriétés"
- "Grand ménage de printemps et nettoyage ponctuel à domicile"
- "Service de repassage professionnel à domicile"
- "Nettoyage professionnel de baies vitrées et fenêtres à domicile"
- "Nettoyage haute pression de terrasses et espaces extérieurs"
- "Accompagnement ménager dédié aux personnes âgées et seniors"
- "Laura fondatrice de Laura la Pro du Ménage — notre histoire"
- "Recrutement auto-entrepreneurs ménage — Laura la Pro du Ménage"

### 8. Google Search Console
- ✅ Propriété `https://lauralaprodumenage.fr` vérifiée (méthode : Fichier HTML)
- ✅ Sitemap `sitemap.xml` soumis le 27/02/2026
- Google va crawler et indexer sous 24-48h

---

## ✅ FAIT — Session du 27/02/2026 (session 2) — SEO Local

### 9. Pages SEO locales — Architecture scalable
- **React Router** intégré (`BrowserRouter` dans `main.jsx`) sans casser la SPA existante
- **Route réelle** : `/ville/:slug` → `CityPage.jsx` (crawlable par Google)
- **SPA existante** : toutes les pages internes continuent de fonctionner sur `/*`
- **Import** `Routes`, `Route` dans `App.jsx` — SPAContent wrappé

### 10. Page Mont-de-Marsan (`/ville/mont-de-marsan`)
- **`src/pages/CityPage.jsx`** — Page SEO locale complète (~900 mots) :
  - H1 : "Votre femme de ménage de confiance à Mont-de-Marsan"
  - Intro locale avec mention des quartiers
  - H2 : 6 services détaillés (ménage régulier, ponctuel, seniors, repassage, Airbnb, terrasses)
  - H2 : 4 arguments "Pourquoi nous choisir" (intervenantes locales, crédit impôt, flexibilité, devis gratuit)
  - H2 : Zones d'intervention (10 communes autour : Saint-Pierre-du-Mont, Dax, Aire-sur-l'Adour, etc.)
  - H2 : FAQ locale (5 questions — schema FAQPage JSON-LD)
  - CTA final vers calculateur de prix
- **`src/data/cityData.js`** — Données structurées par ville, scalable :
  - Clé = slug (ex: `'mont-de-marsan'`)
  - Toutes les données (meta, services, FAQ, zones) dans un seul objet
  - Fonctions `getCityBySlug()` et `getAllCitySlugs()`
  - Pour ajouter une ville : copier le bloc, changer les données, ajouter au sitemap

### 11. React Helmet — Meta tags dynamiques
- **`react-helmet`** sur chaque CityPage :
  - `<title>` : "Femme de ménage à Mont-de-Marsan | Laura la Pro du Ménage"
  - `<meta description>` locale
  - `<link rel="canonical">` vers `/ville/mont-de-marsan`
  - Open Graph complet (`og:title`, `og:description`, `og:url`, `og:locale`)
  - Twitter Card (`summary_large_image`)

### 12. JSON-LD — 3 schemas par page ville
- **LocalBusiness** : `addressLocality` = Mont-de-Marsan, `addressCountry` = FR, `areaServed` = City
- **FAQPage** : 5 questions/réponses structurées (rich snippets Google)
- **BreadcrumbList** : Accueil > Ménage à Mont-de-Marsan

### 13. Sitemap nettoyé
- ❌ **Supprimé** : toutes les URLs `/#...` (non crawlables par Google)
- ✅ **Gardé** : `/` (accueil) — priorité 1.0
- ✅ **Ajouté** : `/ville/mont-de-marsan` — priorité 0.9

### 14. Vercel rewrites
- **`vercel.json`** créé avec rewrites SPA :
  - `/ville/:slug` → `index.html`
  - `/*` → `index.html` (catch-all SPA)

---

## 🔜 À FAIRE — Prochaines étapes SEO

### Priorité haute
- [ ] **Ajouter og:image** — Créer une image OG 1200x630px (logo Laura + texte) et l'ajouter dans les meta tags
- [ ] **Vérifier l'indexation** — Revenir sur Search Console dans 48h, vérifier que les pages sont indexées
- [ ] **Demander l'indexation manuelle** — Dans Search Console > Inspection de l'URL > `/ville/mont-de-marsan` > "Demander l'indexation"
- [ ] **Soumettre nouveau sitemap** — Resoumettre le sitemap nettoyé dans Google Search Console

### Priorité moyenne
- [x] **Pages locales SEO** — ✅ Architecture créée avec `/ville/mont-de-marsan`
- [ ] **Ajouter d'autres villes** — Dupliquer dans `cityData.js` : Bordeaux, Nantes, Dax, Pau, etc.
- [ ] **Google Business Profile** — Créer une fiche Google My Business si Laura a une adresse physique
- [ ] **Balises H1/H2 sémantiques** — Vérifier que chaque section a des headings bien structurés (H1 unique par page, H2 pour sous-sections)
- [ ] **Temps de chargement** — Vérifier avec Lighthouse (F12 > Lighthouse) et optimiser si nécessaire
- [ ] **Images WebP** — Convertir les images ImageKit en format WebP pour un chargement plus rapide

### Priorité basse
- [ ] **Backlinks** — Inscrire le site sur annuaires locaux (PagesJaunes, Yelp, etc.)
- [ ] **Blog / Contenu** — Créer des articles de blog (ex: "5 astuces pour un ménage efficace") pour attirer du trafic organique
- [ ] **Réseaux sociaux** — Ajouter les liens réseaux dans le JSON-LD `sameAs` quand les pages seront créées
- [ ] **Avis clients** — Ajouter un schema `AggregateRating` quand des avis seront collectés

---

## 📊 Stack technique SEO actuelle

| Élément | Outil |
|---------|-------|
| Hébergement | Vercel (auto-deploy depuis GitHub) |
| Domaine | lauralaprodumenage.fr (Hostinger DNS) |
| DNS | A @ → 216.150.1.1, CNAME www → Vercel |
| SSL | ✅ HTTPS automatique (Vercel) |
| Analytics | ❌ Pas encore configuré |
| Search Console | ✅ Vérifié + Sitemap soumis |
| Schema.org | ✅ LocalBusiness + FAQPage + BreadcrumbList JSON-LD |
| Open Graph | ✅ (manque og:image) |
| React Router | ✅ Routes réelles pour pages SEO locales |
| React Helmet | ✅ Meta tags dynamiques par page ville |
| Pages locales | ✅ /ville/mont-de-marsan (scalable) |

---

## ⚠️ Limitation SPA (partiellement résolue)

Le site principal reste une **Single Page Application** (React SPA). Les "pages" internes (`accueil`, `services`, `seniors`, etc.) utilisent un `useState` et ne génèrent pas de vraies routes.

**Ce qui a été résolu** :
- ✅ Les **pages SEO locales** (`/ville/mont-de-marsan`) sont de **vraies routes** React Router, crawlables par Google
- ✅ Le **sitemap** ne contient plus de hash URLs inutiles
- ✅ Chaque page ville a ses propres **meta tags**, **JSON-LD** et **canonical URL**

**Ce qui reste** :
- Les pages internes de la SPA (`/#services`, `/#seniors`) ne sont pas des routes réelles
- **Solution future** : migrer progressivement les pages internes vers React Router
- **Alternative** : pre-rendering (Prerender.io) pour servir du HTML statique aux bots

> Note : La stratégie SEO local avec des pages ville dédiées contourne élégamment la limitation SPA pour le référencement géographique.
