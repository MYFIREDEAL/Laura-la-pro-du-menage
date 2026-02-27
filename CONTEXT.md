# 🏠 Laura la Pro du Ménage — Contexte Projet

> **Fichier à lire en début de session Claude pour reprendre le contexte.**
> Dis à Claude : "Lis le fichier CONTEXT.md à la racine du projet avant de commencer."

---

## 📋 Résumé du projet

Site vitrine + simulateur de prix pour **Laura la Pro du Ménage**, entreprise de services à la personne (ménage, aide seniors, Airbnb, bureaux, terrasses, vitres).

- **URL live** : https://laura-la-pro-du-menage.vercel.app
- **GitHub** : `MYFIREDEAL/Laura-la-pro-du-menage` (branche `main`)
- **Déploiement** : Vercel auto-deploy à chaque `git push` sur `main`
- **Stack** : React (SPA) + Vite + Tailwind CSS + Lucide Icons
- **Backend** : Supabase (PostgreSQL) — fallback localStorage si Supabase indisponible
- **Images** : Hébergées sur ImageKit (`ik.imagekit.io/bqla7nrgyf/`)

---

## 🗂️ Architecture des fichiers clés

```
src/
├── App.jsx                          # ~1460 lignes — Toutes les pages + navigation
├── main.jsx                         # Point d'entrée React + BrowserRouter
├── index.css                        # Styles globaux + Tailwind
├── components/
│   ├── ReservationWizard.jsx        # ~1331 lignes — Wizard 4 étapes (calculateur de prix)
│   ├── reservation/
│   │   ├── Step3Details.jsx         # Étape 3 — Switch modulaire par service
│   │   ├── Step4Contact.jsx         # Étape 4 — Coordonnées + envoi
│   │   ├── DetailsRegularPonctuel.jsx  # Détails ménage régulier / ponctuel
│   │   ├── DetailsSeniors.jsx       # Détails accompagnement seniors
│   │   ├── DetailsAirbnb.jsx        # Détails Airbnb & gîtes
│   │   └── DetailsPro.jsx           # Détails bureaux & copropriétés
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── Layout.jsx
│   └── ui/                          # Composants UI (button, toast, etc.)
├── data/
│   └── cityData.js                  # Données SEO locales par ville (scalable)
├── lib/
│   ├── supabase.js                  # Client Supabase (renvoie null si env vars absentes)
│   ├── demandesStorage.js           # CRUD demandes — Supabase + fallback localStorage
│   ├── candidaturesStorage.js       # CRUD candidatures — Supabase + fallback localStorage
│   ├── promotionsStorage.js         # CRUD promotions — Supabase + fallback localStorage
│   └── utils.js
└── pages/
    ├── AdminPage.jsx                # ~2100 lignes — Admin avec onglets Demandes/Candidatures/Promos
    └── CityPage.jsx                 # Page SEO locale par ville (/ville/:slug)

vercel.json                          # Rewrites SPA pour Vercel (routes /ville/*)
supabase-setup.sql                   # SQL pour créer les tables + RLS policies
.env                                 # Variables Supabase (gitignored)
.env.example                         # Template des variables d'environnement
```

---

## 🧭 Navigation (App.jsx)

### Pages accessibles via la nav :
| Nav label | Page | ID interne |
|-----------|------|------------|
| Accueil | PageAccueil | `accueil` |
| Nos Services | Scroll vers `#section-services` sur la page accueil | `services` |
| Spécial Seniors | PageSeniors | `seniors` |
| Notre Histoire | PageHistoire | `histoire` |
| Avantage -50% | PageFiscal | `fiscal` |

### Pages accessibles via boutons :
| Bouton | Style | Page |
|--------|-------|------|
| Calculer mon prix | Rouge (red-600) | `reserver` (ReservationWizard) |
| Recrutement | Vert (emerald-600) | `recrutement` (PageRecrutement) |

### Fonction de navigation :
- **`setCurrentPage(pageId)`** — pour changer de page (PAS `setPage`)
- **`goToReservation(serviceId)`** — ouvre le wizard avec service pré-sélectionné

### Pages SEO locales (vraies routes React Router) :
| Route | Composant | Slug |
|-------|-----------|------|
| `/ville/mont-de-marsan` | `CityPage.jsx` | `mont-de-marsan` |

**Architecture** :
- `main.jsx` → `BrowserRouter` wrapper
- `App.jsx` → `<Routes>` avec `/ville/:slug` → `CityPage` et `/*` → SPA existante
- `src/data/cityData.js` → données par ville (meta, services, FAQ, zones)
- `src/pages/CityPage.jsx` → page SEO locale (Helmet + JSON-LD)
- Pour **ajouter une ville** : ajouter un bloc dans `cityData.js` + URL dans `sitemap.xml`
- **`scrollIntoView`** — pour "Nos Services" qui scroll vers la section

---

## 🏠 Page Accueil (PageAccueil dans App.jsx)

### Structure :
1. **Hero** avec CTA "Découvrir nos services" (scroll) + "Calculer mon prix" (wizard)
2. **Barre de navigation services** (sticky, scroll horizontal) — 8 services
3. **8 cartes services** en grille 2 colonnes :

| Carte | Service ID | CTA |
|-------|-----------|-----|
| Ménage Régulier | `regulier` | → Wizard |
| Accompagnement Seniors | `seniors` | → Wizard |
| Airbnb & Gîtes | `airbnb` | → Wizard |
| Bureaux & Copropriétés | `pro` | → Wizard |
| 🌸 Ménage Printanier | `ponctuel` | → Wizard (ponctuel) |
| Repassage | `repassage` | → Wizard |
| Baie Vitrée | — | Bientôt disponible (alert) |
| Terrasse Bois | — | Bientôt disponible (alert) |

### Cartes enrichies avec :
- Images ImageKit en haut
- Badges promo (-30%, 1ère heure offerte)
- Bullet points avec emojis
- `scrollMarginTop: '40px'` sur `#section-services`

---

## 💰 ReservationWizard — Calculateur de prix (4 étapes)

### Étape 1 — Choix du service
8 services disponibles (5 actifs dans le wizard) :
| Service | ID | Tarif/h | Éligible -50% | isNoFreeHour |
|---------|-----|---------|---------------|--------------|
| Ménage régulier | `regulier` | 29€ | ✅ | ❌ |
| Ménage ponctuel | `ponctuel` | 34€ | ✅ | ❌ |
| Accompagnement Seniors | `seniors` | 29€ | ✅ | ❌ |
| Airbnb & Gîtes | `airbnb` | 29€ | ✅ (sauf résidence secondaire) | ✅ |
| Bureaux & Copropriétés | `pro` | 29€ | ❌ | ✅ |
| Terrasse Bois | `terrasse` | 34€ | ❌ | ✅ |
| Baie Vitrée | `vitres` | 29€ | ✅ | ❌ |
| Repassage | — | — | — | — (Bientôt disponible) |

### Étape 2 — Fréquence + Durée

#### Fréquences :
| Fréquence | ID | Multiplicateur | Note |
|-----------|----|----------------|------|
| 1 fois / semaine | `weekly` | ×4 | ⭐ Recommandé |
| 1 fois / 2 semaines | `biweekly` | ×2 | |
| 1 fois / mois | `monthly` | ×1 | |
| Ponctuel (1 seule fois) | `once` | ×1 | Tarif 34€/h |

**Règle importante** : Quand `frequency === 'once'`, le tarif ponctuel (34€/h) s'applique **quel que soit** le service choisi.

#### Pour le service Ponctuel :
- La fréquence est **auto-sélectionnée** à "Ponctuel (1 seule fois)" et **figée**
- **Sélecteur de surface** (5 choix) :
  - < 30 m² (Studio), 30–60 m² (T2/T3), 60–90 m² (T3/T4), 90–120 m² (T4/T5), 120 m²+ (Grande maison)
- **Questionnaire d'état** (4 niveaux sympas, affichés directement en même temps que la surface) :
  - 😊 Plutôt propre — "Un petit coup de frais suffit !"
  - 🙂 Ça s'accumule un peu — "Pas de panique, on gère !"
  - 😅 Ça fait un moment… — "Laura adore les défis !"
  - 🫣 Gros chantier en vue ! — "On sort l'artillerie lourde 💪"
- **Durées étendues** : 3h, 4h, 5h, 6h, 7h, 8h, 9h, 10h

#### Matrice de recommandation Surface × État → Durée :
```
            light  medium  deep  extreme
xs (<30):   3h     3h      4h    5h
sm (30-60): 3h     4h      5h    6h
md (60-90): 4h     5h      6h    7h
lg (90-120):5h     6h      7h    8h
xl (120+):  6h     7h      8h    10h
```

La durée est **auto-sélectionnée** avec badge "⭐ Recommandé" — le client peut modifier.

#### Pour les autres services :
- Durées classiques : 2h, 2h30 (⭐), 3h, 4h
- Les 4 fréquences sont disponibles

#### Quand `initialService === 'ponctuel'` (via card printanier) :
- Le wizard démarre directement à l'étape 2
- La fréquence est pré-sélectionnée à `'once'` dès l'initialisation du state

### Étape 3 — Détails (modulaire)

Chaque service a son propre composant de détails :
- **Régulier / Ponctuel** (`DetailsRegularPonctuel.jsx`) :
  - Surface approximative (MASQUÉE pour ponctuel car déjà à l'étape 2)
  - Priorités de ménage (optionnel) : Cuisine, SDB, Sols, Poussière, Chambres
  - Accès au logement : Digicode, Étage
  - Options : Repassage (+5€/venue), Produits par Laura (+3€/venue), Vitres (+5€/venue)
- **Seniors** (`DetailsSeniors.jsx`) : options similaires + courses
- **Airbnb** (`DetailsAirbnb.jsx`) : type de résidence (principale/secondaire)
- **Pro** (`DetailsPro.jsx`) : détails spécifiques pro

### Étape 4 — Contact
- Téléphone (obligatoire, min 10 chiffres), Nom, Ville, Commentaires
- Envoi de la demande

### 💲 Calcul des prix (calculateEstimate)

Le calcul sépare **main-d'œuvre** et **fournitures** :

```
mainOeuvre = baseRate × hours × freq
fournitures = (produitsMenagers ? 3€ : 0) × freq + saturateurCost
optionsMainOeuvre = (repassage ? 5€ + vitres ? 5€) × freq  // ajouté à mainOeuvre
```

**Promo -30%** : appliquée **uniquement sur main-d'œuvre** (pas les fournitures)
**Crédit impôt 50%** : calculé **uniquement sur main-d'œuvre après promo** (pas les fournitures)

### Fournitures spécifiques

**Produits ménagers** : +3€/venue (option cochable dans Step 3)
**Saturateur terrasse** : coût selon surface :
| Surface | Coût saturateur |
|---------|----------------|
| xs (< 15m²) | 15€ |
| sm (15-30m²) | 35€ |
| md (30-50m²) | 75€ |
| lg (50-80m²) | 120€ |
| xl (80m²+) | 180€ |

### Options (prix par venue, pas par heure) :
- Repassage : +5€/venue → main-d'œuvre
- Produits fournis par Laura : +3€/venue → **fournitures** (pas de crédit impôt)
- Vitres : +5€/venue → main-d'œuvre

### 🎁 Promo "Offre de bienvenue" — DYNAMIQUE (Supabase)

Les promos sont maintenant gérées **dynamiquement** depuis l'onglet "Promos" de l'admin.
Chaque service a ses propres paramètres dans la table `promotions` :
- **promo_active** : activer/désactiver la promo
- **discount_percent** : pourcentage de réduction (ex: 30)
- **free_first_hour** : 1ère heure offerte oui/non
- **end_date** : date de fin de l'offre

#### Logique de calcul (ReservationWizard) :
1. `getActivePromo(promotions, serviceId)` récupère la promo active (non expirée)
2. Si `freeFirstHour` : 1ère heure offerte = baseRate
3. Réduction `discountPercent`% sur la **main-d'œuvre restante** (pas les fournitures)

#### Affichage conditionnel (App.jsx) :
- Les badges image (-X%), les encarts promo et dates sont **masqués** quand la promo est désactivée
- `promo('serviceId')` / `promoDate('serviceId')` / `promoDiscount('serviceId')` — helpers dans App.jsx

#### Crédit d'impôt 50% (avance immédiate) :
- Applicable pour : régulier, ponctuel, seniors, airbnb (résidence principale), vitres
- PAS applicable pour : pro, terrasse, airbnb (résidence secondaire)
- Calculé **uniquement sur main-d'œuvre après promo** (exclut fournitures)
- `creditImpot = mainOeuvreAfterPromo × 0.5`

### Récapitulatif latéral (sticky)
Affiche en temps réel :
- Service, Fréquence, Surface (ponctuel/terrasse), État (ponctuel/terrasse), Durée
- Options actives
- Sous-total main-d'œuvre
- Bloc vert promo : 1ère heure offerte + -30%
- "Après promo" main-d'œuvre
- Bloc bleu crédit impôt 50% (si éligible, uniquement sur main-d'œuvre)
- Bloc ambre fournitures (produits ménagers + saturateur, si présents)
- **Prix final en gros** rouge

---

## 📄 Autres pages

### PageHistoire (Notre Histoire)
- Histoire de Laura — racontée à la 1ère personne
- "Au service des autres" (pas "passionnée du ménage")
- Le déclic vient de Laura elle-même (pas du co-fondateur)
- Section "Pour les pros du ménage" avec bouton vers recrutement

### PageFiscal (Avantage -50%)
- Bloc -50% avec explication
- **Bannière officielle** : Article 199 sexies du CGI, source URSSAF
- Exemple de calcul : 30€/h → 15€/h après crédit d'impôt
- Mention "Certaines prestations" (pas toutes)

### PageRecrutement
- Hero avec image
- 3 cartes avantages (rémunération juste, aide admin AE, missions régulières)
- Formulaire : Prénom, Téléphone, Email, Département
- Cible : travailleurs indépendants auto-entrepreneurs
- ⚠️ **Défini comme variable JSX** (`const pageRecrutement = (...)`) et pas composant (`() => (...)`) — sinon les inputs perdent le focus à chaque frappe (re-render remonte le composant)
- À la soumission → `saveCandidature()` → Supabase table `candidatures`

### PageSeniors
- Page dédiée à l'accompagnement seniors
- CTA vers wizard avec service `seniors`

### Footer
- 3 colonnes : Infos entreprise, Légal, Avantage -50%
- Lien "En savoir plus →" vers page fiscal

### Header
- Logo + nav links (`text-sm`)
- 2 boutons : "Calculer mon prix" (rouge) + "Recrutement" (vert emerald)

---

## 🗄️ Supabase — Base de données

### Configuration
- **Projet** : "Laura la pro du ménage" (Europe West)
- **URL** : `https://qajxmyjzgrjnsnvtqwyx.supabase.co`
- **Anon Key** : dans `.env` (variable `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`)
- **Variables Vercel** : configurées ✅

### Tables

#### `demandes` (réservations clients)
| Colonne | Type | Description |
|---------|------|-------------|
| id | TEXT PK | Ex: "DEM-LXZ45-AB3C" |
| created_at | TIMESTAMPTZ | Date de création |
| status | TEXT | new / contacted / confirmed / cancelled |
| name, phone, city, message | TEXT | Coordonnées client |
| service, service_label | TEXT | Service choisi |
| frequency, frequency_label | TEXT | Fréquence |
| hours | NUMERIC | Durée en heures |
| price_estimate | NUMERIC | Prix estimé |
| options | JSONB | Options cochées |
| surface, clean_level | TEXT | Surface et état (ponctuel/terrasse) |
| saturateur | BOOLEAN | Option saturateur (terrasse) |
| saturateur_cost | NUMERIC | Coût produit saturateur |
| details | JSONB | Tous les détails Step 3/4 |
| notes | TEXT | Notes internes admin |

#### `candidatures` (recrutement)
| Colonne | Type | Description |
|---------|------|-------------|
| id | TEXT PK | Ex: "CAND-LXZ45-AB3C" |
| created_at | TIMESTAMPTZ | Date de candidature |
| status | TEXT | new / contacted / confirmed / cancelled |
| prenom | TEXT | Prénom du candidat |
| tel | TEXT | Téléphone |
| email | TEXT | Email |
| departement | TEXT | Département |
| notes | TEXT | Notes internes admin |

#### `promotions` (gestion promos dynamiques)
| Colonne | Type | Description |
|---------|------|-------------|
| service_id | TEXT PK | Ex: "regulier", "seniors", "airbnb" |
| promo_active | BOOLEAN | Promo activée ou non |
| discount_percent | INTEGER | Pourcentage de réduction (ex: 30) |
| free_first_hour | BOOLEAN | 1ère heure offerte |
| end_date | DATE | Date de fin de l'offre |
| updated_at | TIMESTAMPTZ | Dernière modification |

### Storage pattern (demandesStorage.js / candidaturesStorage.js / promotionsStorage.js)
- Toutes les fonctions sont **async**
- **Supabase en priorité**, fallback localStorage si `supabase === null`
- Fonctions : `getAll`, `save`, `updateStatus`, `addNote`, `delete`, `exportToCSV` (demandes only)
- Conversion snake_case ↔ camelCase automatique

---

## 🔐 Page Admin (/#admin)

### Accès
- URL : `/#admin` → affiche la **modale de mot de passe** (pas d'accès direct)
- Mot de passe : `yesbaby`
- Stocké en **SHA-256** : `780438c8ef0436ffbd307c131f854c8b663cce768ee47e1d79c0d9edd3cefc60`
- Vérification via `crypto.subtle.digest('SHA-256', ...)` (Web Crypto API)

### Interface à 3 onglets

#### Onglet "Demandes" (thème orange)
- 4 stats cliquables : Total / Nouvelles / Contactées / Confirmées
- Barre de recherche + filtres dépliables (statut, service)
- Liste cliquable (gauche) + panneau détail sticky (droite, desktop)
- Mobile : slide-over plein écran
- Actions : changer statut, notes internes, supprimer, exporter CSV, appeler
- Affiche tous les détails : contact, service, options, surface, état, accès, priorités, etc.

#### Onglet "Candidatures" (thème violet)
- 4 stats cliquables : Total / Nouvelles / Contactées / Confirmées
- Barre de recherche + filtre statut
- Liste des candidats (prénom, tel, email, département, statut, date)
- Panneau détail : contact, changement de statut (new/contacted/confirmed/cancelled=Refusée), notes, appeler
- Mobile : slide-over + modale de suppression

#### Onglet "Promos" (thème émeraude)
- Barre de stats : Actives / Expirent bientôt / Inactives
- Grille de cartes par service (8 services)
- Chaque carte : toggle actif/inactif, % remise, 1ère heure offerte (toggle), date fin, bouton +1 mois
- "Appliquer à tous" : modal pour définir date fin + % remise pour tous les services d'un coup
- Données stockées dans table `promotions` (Supabase) avec fallback localStorage

---

## ⚠️ Points d'attention / Pièges connus

1. **`setCurrentPage`** (PAS `setPage`) — erreur fréquente qui casse la navigation
2. **Tarif ponctuel** : 34€/h s'applique dès que `frequency === 'once'`, même si le service sélectionné est "régulier"
3. **Options = par venue** (pas par heure) — multiplié par la fréquence
4. **Promo dynamique** : les % et dates sont gérés depuis l'onglet Promos de l'admin — plus de hardcodé
5. **Crédit impôt 50%** : UNIQUEMENT sur main-d'œuvre après promo (exclut fournitures : produits ménagers + saturateur)
6. **Surface à l'étape 3** : masquée pour ponctuel (prop `service` passée à `DetailsRegularPonctuel`)
7. **initialService ponctuel** : frequency doit être initialisée à `'once'` dans le useState
8. **isNoFreeHour** : `airbnb`, `pro`, `terrasse` → pas de 1ère heure offerte
9. **Terrasse** : skip Step 3 (pas de détails) → passe directement de Step 2 à Step 4
10. **Pages inline dans App.jsx** : définies comme **variables JSX** (`const page = (...)`) PAS comme composants (`const Page = () => (...)`) — sinon les inputs perdent le focus à chaque setState
11. **Admin `/#admin`** : affiche la modale mdp, pas d'accès direct (même via URL)
12. **Supabase** : toutes les fonctions storage sont **async** → `await` obligatoire
13. **Multiplicateurs** : weekly=4, biweekly=2, monthly=1, once=1 (pas 4.33)

---

## 🔧 Commandes utiles

```bash
# Dev local
cd "/Users/jackluc/Desktop/Laura la pro du menage "
npm run dev

# Déployer (auto via Vercel)
git add -A && git commit -m "description" && git push

# Variables d'environnement requises (.env)
VITE_SUPABASE_URL=https://qajxmyjzgrjnsnvtqwyx.supabase.co
VITE_SUPABASE_ANON_KEY=<voir .env>
```

---

## 📌 TODO / Idées pour la suite

- [x] **Mettre à jour la date de l'offre de bienvenue** → prolongée jusqu'au 20 mars 2026 ✅
- [x] Connecter le service "Repassage" → connecté au wizard ✅
- [x] **Onglet Promotions admin** → gestion dynamique des promos (%, dates, 1ère heure) ✅
- [x] **⚠️ Exécuter le SQL `promotions`** sur Supabase → table + RLS + données par défaut ✅
- [x] SEO / meta tags ✅
- [x] **Pages SEO locales** → `/ville/mont-de-marsan` (React Router + Helmet + JSON-LD) ✅
- [ ] Ajouter des témoignages clients
- [ ] **Ajouter d'autres villes** dans `src/data/cityData.js` (Bordeaux, Nantes, Dax, Pau…)
- [ ] Auth admin plus robuste (actuellement hash SHA-256 côté client, pas de session)
- [ ] Notifications email / SMS à Laura quand nouvelle demande/candidature
- [ ] Export CSV pour les candidatures (comme les demandes)
- [ ] **Soumettre nouveau sitemap** dans Google Search Console (URLs # supprimées)
- [ ] **Demander indexation** de `/ville/mont-de-marsan` dans Search Console

---

## 📅 Dernière mise à jour : 27 février 2026

### Session du 27/02/2026 (session 3) — SEO Local :
1. ✅ **React Router** : `BrowserRouter` dans `main.jsx`, `Routes` dans `App.jsx`
2. ✅ **Route `/ville/:slug`** → `CityPage.jsx` (vraie route crawlable)
3. ✅ **SPA intacte** : toutes les pages existantes continuent sur `/*` (aucune casse)
4. ✅ **CityPage.jsx** : page SEO locale ~900 mots avec H1, 4×H2, FAQ, CTA
5. ✅ **cityData.js** : données structurées Mont-de-Marsan, prêt à dupliquer pour d'autres villes
6. ✅ **React Helmet** : meta title, description, canonical, OG, Twitter par page ville
7. ✅ **JSON-LD** : 3 schemas (LocalBusiness + FAQPage + BreadcrumbList) par page ville
8. ✅ **Sitemap nettoyé** : URLs `/#...` supprimées, `/ville/mont-de-marsan` ajouté
9. ✅ **vercel.json** : rewrites SPA pour que Vercel serve `index.html` sur `/ville/*`

### Session du 27/02/2026 (session 2) — Résumé des changements :
1. ✅ **Onglet Promotions admin** : 3ème onglet dans AdminPage (thème émeraude)
   - Toggle actif/inactif par service
   - % remise configurable
   - 1ère heure offerte (toggle)
   - Date de fin avec +1 mois
   - "Appliquer à tous" (date + %)
2. ✅ **Table Supabase `promotions`** : SQL ajouté à supabase-setup.sql + RLS + INSERT par défaut
3. ✅ **promotionsStorage.js** : CRUD complet avec fallback localStorage
4. ✅ **ReservationWizard dynamique** : calcul prix branché sur promos Supabase (% et 1ère heure)
5. ✅ **App.jsx dynamique** : tous les badges, encarts promo et dates branchés sur Supabase
6. ✅ **Affichage conditionnel** : promos masquées quand désactivées dans l'admin
7. ✅ **Fix admin modal** : boucle infinie hashchange corrigée
8. ✅ **Fix mobile admin** : suppression autoFocus clavier
9. ✅ **Fix flicker admin** : setTimeout entre fermeture modale et changement de page
10. ✅ **Nettoyage wizard** : suppression des 3 affichages promo redondants

### Session du 27/02/2026 (session 1) — Résumé des changements :
1. ✅ **Saturateur terrasse** : grille de coût par surface (15€ → 180€), intégré au calcul + UI
2. ✅ **Crédit d'impôt fix** : séparation main-d'œuvre / fournitures — crédit 50% uniquement sur main-d'œuvre
3. ✅ **Mobile spacing** : espacement des boutons de service sur mobile (gap-y-4, px-5)
4. ✅ **Supabase intégration** : remplacement localStorage par Supabase (table `demandes`) avec fallback
5. ✅ **Admin sécurité** : mot de passe hashé SHA-256, bypass `/#admin` corrigé
6. ✅ **Candidatures** : nouveau module complet (table Supabase + CRUD + onglet admin violet)
7. ✅ **Fix formulaire recrutement** : conversion composant → variable JSX (fix perte de focus)
8. ✅ **Date offre de bienvenue** : prolongée de "14 février 2026" → "20 mars 2026" (9 occurrences)
9. ✅ **Service Repassage** : confirmé connecté au wizard (plus de "Bientôt disponible")
