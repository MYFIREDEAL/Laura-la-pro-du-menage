/**
 * Stockage des promotions par service
 * Supabase avec fallback localStorage
 * 
 * Chaque promo a : service_id, promo_active, discount_percent, free_first_hour, end_date
 */

import { supabase } from './supabase';

const STORAGE_KEY = 'laura_promotions';

/**
 * Labels des services
 */
export const promoServiceLabels = {
  regulier: { label: 'Ménage Régulier', emoji: '🧹', color: 'red' },
  ponctuel: { label: 'Ménage Printanier', emoji: '🌸', color: 'pink' },
  seniors: { label: 'Spécial Seniors', emoji: '🧡', color: 'orange' },
  airbnb: { label: 'Airbnb & Gîtes', emoji: '🔑', color: 'blue' },
  pro: { label: 'Bureaux & Copro', emoji: '🏢', color: 'emerald' },
  repassage: { label: 'Repassage', emoji: '👔', color: 'purple' },
  vitres: { label: 'Baie Vitrée', emoji: '🪟', color: 'cyan' },
  terrasse: { label: 'Terrasse', emoji: '☀️', color: 'amber' },
};

/**
 * Promos par défaut (même valeurs que les hardcodées actuelles)
 */
const DEFAULT_PROMOS = [
  { serviceId: 'regulier',  promoActive: true, discountPercent: 30, freeFirstHour: true,  endDate: '2026-03-20' },
  { serviceId: 'ponctuel',  promoActive: true, discountPercent: 30, freeFirstHour: true,  endDate: '2026-03-20' },
  { serviceId: 'seniors',   promoActive: true, discountPercent: 30, freeFirstHour: true,  endDate: '2026-03-20' },
  { serviceId: 'airbnb',    promoActive: true, discountPercent: 30, freeFirstHour: false, endDate: '2026-03-20' },
  { serviceId: 'pro',       promoActive: true, discountPercent: 30, freeFirstHour: false, endDate: '2026-03-20' },
  { serviceId: 'repassage', promoActive: true, discountPercent: 30, freeFirstHour: true,  endDate: '2026-03-20' },
  { serviceId: 'vitres',    promoActive: true, discountPercent: 30, freeFirstHour: true,  endDate: '2026-03-20' },
  { serviceId: 'terrasse',  promoActive: true, discountPercent: 30, freeFirstHour: false, endDate: '2026-03-20' },
];

// ═══════════════════════════════════════════════════════════════════
// FALLBACK localStorage
// ═══════════════════════════════════════════════════════════════════

const localGet = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    // Première fois : initialiser avec les defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMOS));
    return DEFAULT_PROMOS;
  } catch { return DEFAULT_PROMOS; }
};

const localSave = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// ═══════════════════════════════════════════════════════════════════
// Conversion Supabase (snake_case) → JS (camelCase)
// ═══════════════════════════════════════════════════════════════════

const toJsFormat = (row) => ({
  serviceId: row.service_id,
  promoActive: row.promo_active,
  discountPercent: Number(row.discount_percent),
  freeFirstHour: row.free_first_hour,
  endDate: row.end_date,
  updatedAt: row.updated_at,
});

const toDbFormat = (promo) => ({
  service_id: promo.serviceId,
  promo_active: promo.promoActive,
  discount_percent: promo.discountPercent,
  free_first_hour: promo.freeFirstHour,
  end_date: promo.endDate,
  updated_at: new Date().toISOString(),
});

// ═══════════════════════════════════════════════════════════════════
// CRUD
// ═══════════════════════════════════════════════════════════════════

/**
 * Récupère toutes les promotions
 */
export const getAllPromotions = async () => {
  if (!supabase) return localGet();

  try {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('service_id');

    if (error) throw error;
    
    // Si la table est vide, insérer les defaults
    if (!data || data.length === 0) {
      await initDefaultPromotions();
      return DEFAULT_PROMOS;
    }

    return data.map(toJsFormat);
  } catch (error) {
    console.error('❌ Erreur lecture promotions:', error);
    return localGet();
  }
};

/**
 * Met à jour une promotion pour un service
 */
export const updatePromotion = async (serviceId, updates) => {
  const now = new Date().toISOString();

  if (!supabase) {
    const list = localGet();
    const idx = list.findIndex(p => p.serviceId === serviceId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates, updatedAt: now };
      localSave(list);
    }
    return true;
  }

  try {
    // Convertir les champs camelCase → snake_case
    const dbUpdates = {};
    if (updates.promoActive !== undefined) dbUpdates.promo_active = updates.promoActive;
    if (updates.discountPercent !== undefined) dbUpdates.discount_percent = updates.discountPercent;
    if (updates.freeFirstHour !== undefined) dbUpdates.free_first_hour = updates.freeFirstHour;
    if (updates.endDate !== undefined) dbUpdates.end_date = updates.endDate;
    dbUpdates.updated_at = now;

    const { error } = await supabase
      .from('promotions')
      .update(dbUpdates)
      .eq('service_id', serviceId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update promotion:', error);
    return false;
  }
};

/**
 * Met à jour toutes les promos en batch (ex: "Appliquer à tous")
 */
export const updateAllPromotions = async (updates) => {
  const now = new Date().toISOString();

  if (!supabase) {
    const list = localGet();
    const updated = list.map(p => ({ ...p, ...updates, updatedAt: now }));
    localSave(updated);
    return true;
  }

  try {
    const dbUpdates = {};
    if (updates.promoActive !== undefined) dbUpdates.promo_active = updates.promoActive;
    if (updates.discountPercent !== undefined) dbUpdates.discount_percent = updates.discountPercent;
    if (updates.endDate !== undefined) dbUpdates.end_date = updates.endDate;
    dbUpdates.updated_at = now;

    const { error } = await supabase
      .from('promotions')
      .update(dbUpdates)
      .neq('service_id', ''); // update all rows

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update all promotions:', error);
    return false;
  }
};

/**
 * Initialise les promos par défaut dans Supabase
 */
const initDefaultPromotions = async () => {
  if (!supabase) return;
  try {
    const rows = DEFAULT_PROMOS.map(toDbFormat);
    await supabase.from('promotions').insert(rows);
    console.log('✅ Promotions par défaut initialisées');
  } catch (error) {
    console.error('❌ Erreur init promotions:', error);
  }
};

/**
 * Helper : récupère la promo active d'un service
 * Retourne null si pas de promo ou promo expirée/désactivée
 */
export const getActivePromo = (promotions, serviceId) => {
  const promo = promotions.find(p => p.serviceId === serviceId);
  if (!promo || !promo.promoActive) return null;
  
  // Vérifier si pas expirée
  const today = new Date().toISOString().split('T')[0];
  if (promo.endDate < today) return null;
  
  return promo;
};

/**
 * Formatte une date en français (ex: "20 mars 2026")
 */
export const formatDateFr = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};
