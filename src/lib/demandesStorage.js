/**
 * Stockage des demandes de réservation
 * 
 * Stockage principal : Supabase (cloud)
 * Fallback : localStorage si Supabase non configuré
 */

import { supabase } from './supabase';

/**
 * Labels français
 */
export const serviceLabels = {
  regulier: 'Ménage régulier',
  ponctuel: 'Ménage ponctuel',
  seniors: 'Accompagnement Seniors',
  airbnb: 'Airbnb & Gîtes',
  pro: 'Bureaux & Copropriétés',
  repassage: 'Repassage à domicile',
  vitres: 'Nettoyage Baie Vitrée',
  terrasse: 'Nettoyage de Terrasse'
};

export const frequencyLabels = {
  weekly: '1×/semaine',
  biweekly: '1×/2 semaines',
  monthly: '1×/mois',
  once: 'Ponctuel'
};

export const statusLabels = {
  new: { label: 'Nouvelle', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Contactée', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmée', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700' }
};

/**
 * Génère un ID unique
 */
const generateId = () => {
  return 'DEM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// ═══════════════════════════════════════════════════════════════════
// FALLBACK localStorage (si Supabase non configuré)
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'laura_demandes';

const localGet = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const localSave = (demandes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demandes));
};

// ═══════════════════════════════════════════════════════════════════
// FONCTIONS PRINCIPALES (Supabase ou fallback localStorage)
// ═══════════════════════════════════════════════════════════════════

/**
 * Prépare l'objet demande à partir du wizardState
 */
const buildDemande = (wizardState) => ({
  id: generateId(),
  created_at: new Date().toISOString(),
  status: 'new',
  name: wizardState.details.name || '',
  phone: wizardState.details.phone || '',
  city: wizardState.details.city || '',
  message: wizardState.details.comments || wizardState.details.message || '',
  service: wizardState.service,
  service_label: serviceLabels[wizardState.service] || wizardState.service,
  frequency: wizardState.frequency,
  frequency_label: frequencyLabels[wizardState.frequency] || wizardState.frequency,
  hours: wizardState.hours,
  price_estimate: wizardState.priceEstimate || null,
  options: wizardState.options || {},
  surface: wizardState.surface || null,
  clean_level: wizardState.cleanLevel || null,
  saturateur: wizardState.saturateur || false,
  saturateur_cost: wizardState.saturateurCost || 0,
  details: { ...wizardState.details },
  notes: ''
});

/**
 * Convertit une ligne Supabase (snake_case) vers le format attendu par l'admin (camelCase)
 */
const toAdminFormat = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  status: row.status,
  name: row.name,
  phone: row.phone,
  city: row.city,
  message: row.message,
  service: row.service,
  serviceLabel: row.service_label,
  frequency: row.frequency,
  frequencyLabel: row.frequency_label,
  hours: row.hours,
  priceEstimate: row.price_estimate,
  options: row.options || {},
  surface: row.surface,
  cleanLevel: row.clean_level,
  saturateur: row.saturateur,
  saturateurCost: row.saturateur_cost,
  details: row.details || {},
  notes: row.notes || ''
});

/**
 * Récupère toutes les demandes
 */
export const getAllDemandes = async () => {
  if (!supabase) return localGet();

  try {
    const { data, error } = await supabase
      .from('demandes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(toAdminFormat);
  } catch (error) {
    console.error('❌ Erreur lecture Supabase:', error);
    // Fallback localStorage
    return localGet();
  }
};

/**
 * Sauvegarde une nouvelle demande
 */
export const saveDemande = async (wizardState) => {
  const demande = buildDemande(wizardState);

  if (!supabase) {
    // Fallback localStorage
    const demandes = localGet();
    // Convertir en format admin pour localStorage
    demandes.unshift(toAdminFormat(demande));
    localSave(demandes);
    console.log('💾 Sauvegardé localement:', demande.id);
    return { success: true, id: demande.id };
  }

  try {
    const { error } = await supabase
      .from('demandes')
      .insert([demande]);

    if (error) throw error;
    console.log('✅ Demande enregistrée dans Supabase:', demande.id);
    return { success: true, id: demande.id };
  } catch (error) {
    console.error('❌ Erreur Supabase:', error);
    // Fallback localStorage en cas d'erreur réseau
    const demandes = localGet();
    demandes.unshift(toAdminFormat(demande));
    localSave(demandes);
    console.log('💾 Fallback localStorage:', demande.id);
    return { success: true, id: demande.id, fallback: true };
  }
};

/**
 * Met à jour le statut d'une demande
 */
export const updateDemandeStatus = async (id, newStatus) => {
  if (!supabase) {
    const demandes = localGet();
    const index = demandes.findIndex(d => d.id === id);
    if (index !== -1) {
      demandes[index].status = newStatus;
      demandes[index].updatedAt = new Date().toISOString();
      localSave(demandes);
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from('demandes')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update statut:', error);
    return false;
  }
};

/**
 * Ajoute une note à une demande
 */
export const addNote = async (id, note) => {
  if (!supabase) {
    const demandes = localGet();
    const index = demandes.findIndex(d => d.id === id);
    if (index !== -1) {
      demandes[index].notes = note;
      demandes[index].updatedAt = new Date().toISOString();
      localSave(demandes);
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from('demandes')
      .update({ notes: note, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update notes:', error);
    return false;
  }
};

/**
 * Supprime une demande
 */
export const deleteDemande = async (id) => {
  if (!supabase) {
    const demandes = localGet();
    const filtered = demandes.filter(d => d.id !== id);
    localSave(filtered);
    return true;
  }

  try {
    const { error } = await supabase
      .from('demandes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    return false;
  }
};

/**
 * Export des demandes en CSV
 */
export const exportToCSV = async () => {
  const demandes = await getAllDemandes();
  
  const headers = ['ID', 'Date', 'Statut', 'Nom', 'Téléphone', 'Ville', 'Service', 'Fréquence', 'Heures', 'Prix estimé', 'Type local', 'Surface', 'Entreprise', 'SIRET', 'Horaire préféré', 'Message'];
  
  const rows = demandes.map(d => [
    d.id,
    new Date(d.createdAt).toLocaleDateString('fr-FR'),
    statusLabels[d.status]?.label || d.status,
    d.name,
    d.phone,
    d.city,
    d.serviceLabel,
    d.frequencyLabel,
    d.hours,
    d.priceEstimate ? `${d.priceEstimate}€` : '',
    d.details?.localType || '',
    d.details?.surface || d.surface || '',
    d.details?.companyName || '',
    d.details?.siret || '',
    d.details?.preferredSchedule || '',
    (d.message || d.details?.comments || '').replace(/"/g, '""')
  ]);
  
  const csv = [
    headers.join(';'),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
  ].join('\n');
  
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `demandes_laura_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export default {
  getAllDemandes,
  saveDemande,
  updateDemandeStatus,
  addNote,
  deleteDemande,
  exportToCSV
};
