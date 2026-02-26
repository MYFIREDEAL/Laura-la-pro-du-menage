# 🏠 Laura la Pro du Ménage — Contexte Projet

> **Fichier à lire en début de session Claude pour reprendre le contexte.**
> Dis à Claude : "Lis le fichier CONTEXT.md à la racine du projet avant de commencer."

---

## 📋 Résumé du projet

Site vitrine + simulateur de prix pour **Laura la Pro du Ménage**, entreprise de services à la personne (ménage, aide seniors, Airbnb, bureaux).

- **URL live** : https://laura-la-pro-du-menage.vercel.app
- **GitHub** : `MYFIREDEAL/Laura-la-pro-du-menage` (branche `main`)
- **Déploiement** : Vercel auto-deploy à chaque `git push` sur `main`
- **Stack** : React (SPA) + Vite + Tailwind CSS + Lucide Icons
- **Images** : Hébergées sur ImageKit (`ik.imagekit.io/bqla7nrgyf/`)

---

## 🗂️ Architecture des fichiers clés

```
src/
├── App.jsx                          # ~1450 lignes — Toutes les pages + navigation
├── main.jsx                         # Point d'entrée React
├── index.css                        # Styles globaux + Tailwind
├── components/
│   ├── ReservationWizard.jsx        # ~1060 lignes — Wizard 4 étapes (calculateur de prix)
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
├── lib/
│   ├── demandesStorage.js           # Sauvegarde des demandes
│   └── utils.js
└── pages/
    └── AdminPage.jsx                # Page admin (mdp: yesbaby)
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
| Repassage | — | Bientôt disponible (alert) |
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
5 services disponibles :
| Service | ID | Tarif/h | Éligible -50% |
|---------|-----|---------|---------------|
| Ménage régulier | `regulier` | 29€ | ✅ |
| Ménage ponctuel | `ponctuel` | 34€ | ✅ |
| Accompagnement Seniors | `seniors` | 29€ | ✅ |
| Airbnb & Gîtes | `airbnb` | 29€ | ✅ (sauf résidence secondaire) |
| Bureaux & Copropriétés | `pro` | 29€ | ❌ |

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

### 💲 Calcul des prix

```
subtotal = (baseRate × hours × freq) + (optionsPerVenue × freq)
```

**Options** = prix par venue (pas par heure) × fréquence :
- Repassage : +5€/venue
- Produits fournis par Laura : +3€/venue
- Vitres : +5€/venue

### 🎁 Promo "Offre de bienvenue" (1er mois)

#### Pour régulier, ponctuel, seniors :
1. **1ère heure offerte** = baseRate (ex: 29€ ou 34€)
2. **-30%** sur le **reste** (subtotal - 1ère heure) → pas sur le total complet !
3. Total promo = 1ère heure + 30% du reste

#### Pour airbnb, pro :
1. Pas de 1ère heure offerte
2. **-30%** sur le total complet

#### Avance immédiate 50% :
- Applicable pour : régulier, ponctuel, seniors, airbnb (résidence principale)
- PAS applicable pour : pro, airbnb (résidence secondaire)
- `finalPrice = afterPromo × 0.5`

### Récapitulatif latéral (sticky)
Affiche en temps réel :
- Service, Fréquence, Surface (ponctuel), État (ponctuel), Durée
- Options actives
- Sous-total, Détail des remises (vert), Après promo
- Avance immédiate 50% (si éligible)
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

## ⚠️ Points d'attention / Pièges connus

1. **`setCurrentPage`** (PAS `setPage`) — erreur fréquente qui casse la navigation
2. **Tarif ponctuel** : 34€/h s'applique dès que `frequency === 'once'`, même si le service sélectionné est "régulier"
3. **Options = par venue** (pas par heure) — multiplié par la fréquence
4. **Promo -30%** : appliquée APRÈS soustraction de l'heure gratuite (pas sur le total)
5. **Surface à l'étape 3** : masquée pour ponctuel (prop `service` passée à `DetailsRegularPonctuel`)
6. **initialService ponctuel** : frequency doit être initialisée à `'once'` dans le useState
7. **Multiplicateurs** : weekly=4, biweekly=2, monthly=1, once=1 (pas 4.33)
8. **Date offre bienvenue** : "Valable jusqu'au 14 février 2026" → ⚠️ EXPIRÉE (on est le 26/02/2026) — À METTRE À JOUR

---

## 🔧 Commandes utiles

```bash
# Dev local
cd "/Users/jackluc/Desktop/Laura la pro du menage "
npm run dev

# Déployer (auto via Vercel)
git add -A && git commit -m "description" && git push
```

---

## 📌 TODO / Idées pour la suite

- [ ] **Mettre à jour la date de l'offre de bienvenue** (actuellement "14 février 2026" → expirée)
- [ ] Connecter les services "Bientôt disponible" (Repassage, Baie vitrée, Terrasse bois)
- [ ] Afficher "Total" au lieu de "/ mois" quand fréquence = ponctuel (once)
- [ ] Ajouter un service "Ménage printanier" distinct du ponctuel ?
- [ ] Intégrer un vrai backend pour les demandes (actuellement localStorage)
- [ ] Ajouter des témoignages clients
- [ ] SEO / meta tags
- [ ] Version mobile : tester tous les flows

---

## 📅 Dernière mise à jour : 26 février 2026

Dernier commit : `949b96b8` — "Fix: pré-sélectionner fréquence 'once' quand initialService=ponctuel"
