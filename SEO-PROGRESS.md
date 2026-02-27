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

## 🔜 À FAIRE — Prochaines étapes SEO

### Priorité haute
- [ ] **Ajouter og:image** — Créer une image OG 1200x630px (logo Laura + texte) et l'ajouter dans les meta tags
- [ ] **Vérifier l'indexation** — Revenir sur Search Console dans 48h, vérifier que les 7 pages sont indexées
- [ ] **Demander l'indexation manuelle** — Dans Search Console > Inspection de l'URL > entrer chaque URL > "Demander l'indexation"

### Priorité moyenne
- [ ] **Pages locales SEO** — Créer des landing pages par ville (ex: /menage-paris, /menage-lyon) pour capter le trafic local
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
| Schema.org | ✅ LocalBusiness JSON-LD |
| Open Graph | ✅ (manque og:image) |

---

## ⚠️ Limitation SPA

Le site est une **Single Page Application** (React SPA). Toutes les "pages" sont en réalité des sections de la même page (`/#services`, `/#seniors`, etc.). Cela signifie :
- Les crawlers voient une seule page HTML avec du JavaScript
- Le sitemap utilise des hash URLs (`/#...`) qui ne sont **pas crawlés** par Google de la même manière que des vraies routes
- **Solution future** : migrer vers des vraies routes avec React Router ou un framework SSR (Next.js) pour un SEO optimal
- **Alternative** : utiliser un service de pre-rendering (Prerender.io, Rendertron) pour servir du HTML statique aux bots

> Note : Pour l'instant, le JSON-LD et les meta tags de la page d'accueil couvrent bien l'ensemble des services. Google devrait indexer correctement la page principale.
