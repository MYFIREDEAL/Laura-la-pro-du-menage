/**
 * Stockage des candidatures (recrutement)
 * Supabase avec fallback localStorage
 */

import { supabase } from './supabase';

const STORAGE_KEY = 'laura_candidatures';

export const candidatureStatusLabels = {
  new: { label: 'Nouvelle', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Contactée', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmée', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Refusée', color: 'bg-red-100 text-red-700' }
};

const generateId = () => {
  return 'CAND-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// Fallback localStorage
const localGet = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};
const localSave = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// Convertit Supabase (snake_case) → admin (camelCase)
const toAdminFormat = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  status: row.status,
  prenom: row.prenom,
  tel: row.tel,
  email: row.email,
  departement: row.departement,
  notes: row.notes || ''
});

/**
 * Récupère toutes les candidatures
 */
export const getAllCandidatures = async () => {
  if (!supabase) return localGet();

  try {
    const { data, error } = await supabase
      .from('candidatures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(toAdminFormat);
  } catch (error) {
    console.error('❌ Erreur lecture candidatures:', error);
    return localGet();
  }
};

/**
 * Sauvegarde une nouvelle candidature
 */
export const saveCandidature = async (formData) => {
  const candidature = {
    id: generateId(),
    created_at: new Date().toISOString(),
    status: 'new',
    prenom: formData.prenom || '',
    tel: formData.tel || '',
    email: formData.email || '',
    departement: formData.departement || '',
    notes: ''
  };

  if (!supabase) {
    const list = localGet();
    list.unshift(toAdminFormat(candidature));
    localSave(list);
    return { success: true, id: candidature.id };
  }

  try {
    const { error } = await supabase
      .from('candidatures')
      .insert([candidature]);

    if (error) throw error;
    console.log('✅ Candidature enregistrée:', candidature.id);
    return { success: true, id: candidature.id };
  } catch (error) {
    console.error('❌ Erreur Supabase candidature:', error);
    const list = localGet();
    list.unshift(toAdminFormat(candidature));
    localSave(list);
    return { success: true, id: candidature.id, fallback: true };
  }
};

/**
 * Met à jour le statut d'une candidature
 */
export const updateCandidatureStatus = async (id, newStatus) => {
  if (!supabase) {
    const list = localGet();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      list[idx].updatedAt = new Date().toISOString();
      localSave(list);
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from('candidatures')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update candidature:', error);
    return false;
  }
};

/**
 * Ajoute une note à une candidature
 */
export const addCandidatureNote = async (id, note) => {
  if (!supabase) {
    const list = localGet();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx].notes = note;
      list[idx].updatedAt = new Date().toISOString();
      localSave(list);
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from('candidatures')
      .update({ notes: note, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur update note candidature:', error);
    return false;
  }
};

/**
 * Supprime une candidature
 */
export const deleteCandidature = async (id) => {
  if (!supabase) {
    const list = localGet();
    localSave(list.filter(c => c.id !== id));
    return true;
  }

  try {
    const { error } = await supabase
      .from('candidatures')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Erreur suppression candidature:', error);
    return false;
  }
};
