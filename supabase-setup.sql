-- ============================================
-- Table des demandes de réservation
-- À exécuter dans Supabase > SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS demandes (
  -- Identifiant
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,

  -- Statut CRM
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled')),

  -- Contact client
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  message TEXT DEFAULT '',

  -- Service choisi
  service TEXT NOT NULL,
  service_label TEXT NOT NULL,
  frequency TEXT,
  frequency_label TEXT,
  hours NUMERIC,

  -- Prix
  price_estimate NUMERIC,

  -- Options (Step 2)
  options JSONB DEFAULT '{}',
  surface TEXT,
  clean_level TEXT,
  saturateur BOOLEAN DEFAULT FALSE,
  saturateur_cost NUMERIC DEFAULT 0,

  -- Détails complets (Step 3 & 4) — stockés en JSON pour flexibilité
  details JSONB DEFAULT '{}',

  -- Notes internes admin
  notes TEXT DEFAULT ''
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_demandes_status ON demandes(status);
CREATE INDEX IF NOT EXISTS idx_demandes_created ON demandes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demandes_service ON demandes(service);

-- ============================================
-- Sécurité RLS (Row Level Security)
-- On autorise tout via la clé anon pour l'instant
-- (admin = accès direct, pas d'auth utilisateur)
-- ============================================

ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer (formulaire client)
CREATE POLICY "Clients peuvent soumettre une demande"
  ON demandes FOR INSERT
  WITH CHECK (true);

-- Politique : tout le monde peut lire (page admin)
CREATE POLICY "Admin peut lire les demandes"
  ON demandes FOR SELECT
  USING (true);

-- Politique : tout le monde peut mettre à jour (admin change statut/notes)
CREATE POLICY "Admin peut modifier les demandes"
  ON demandes FOR UPDATE
  USING (true);

-- Politique : tout le monde peut supprimer (admin supprime)
CREATE POLICY "Admin peut supprimer les demandes"
  ON demandes FOR DELETE
  USING (true);


-- ============================================
-- Table des candidatures (recrutement)
-- ============================================

CREATE TABLE IF NOT EXISTS candidatures (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,

  -- Statut CRM
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled')),

  -- Infos candidat
  prenom TEXT NOT NULL DEFAULT '',
  tel TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  departement TEXT NOT NULL DEFAULT '',

  -- Notes internes admin
  notes TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_candidatures_status ON candidatures(status);
CREATE INDEX IF NOT EXISTS idx_candidatures_created ON candidatures(created_at DESC);

ALTER TABLE candidatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidats peuvent postuler"
  ON candidatures FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin peut lire les candidatures"
  ON candidatures FOR SELECT
  USING (true);

CREATE POLICY "Admin peut modifier les candidatures"
  ON candidatures FOR UPDATE
  USING (true);

CREATE POLICY "Admin peut supprimer les candidatures"
  ON candidatures FOR DELETE
  USING (true);


-- ============================================
-- Table des promotions (gestion admin)
-- ============================================

CREATE TABLE IF NOT EXISTS promotions (
  service_id TEXT PRIMARY KEY,
  promo_active BOOLEAN NOT NULL DEFAULT TRUE,
  discount_percent NUMERIC NOT NULL DEFAULT 30,
  free_first_hour BOOLEAN NOT NULL DEFAULT TRUE,
  end_date DATE NOT NULL DEFAULT '2026-03-20',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer les promos par défaut pour chaque service
INSERT INTO promotions (service_id, promo_active, discount_percent, free_first_hour, end_date) VALUES
  ('regulier',  TRUE, 30, TRUE,  '2026-03-20'),
  ('ponctuel',  TRUE, 30, TRUE,  '2026-03-20'),
  ('seniors',   TRUE, 30, TRUE,  '2026-03-20'),
  ('airbnb',    TRUE, 30, FALSE, '2026-03-20'),
  ('pro',       TRUE, 30, FALSE, '2026-03-20'),
  ('repassage', TRUE, 30, TRUE,  '2026-03-20'),
  ('vitres',    TRUE, 30, TRUE,  '2026-03-20'),
  ('terrasse',  TRUE, 30, FALSE, '2026-03-20')
ON CONFLICT (service_id) DO NOTHING;

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut lire les promos"
  ON promotions FOR SELECT
  USING (true);

CREATE POLICY "Admin peut modifier les promos"
  ON promotions FOR UPDATE
  USING (true);

CREATE POLICY "Admin peut insérer les promos"
  ON promotions FOR INSERT
  WITH CHECK (true);
