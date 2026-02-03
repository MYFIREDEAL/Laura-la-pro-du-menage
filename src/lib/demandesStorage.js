/**
 * Stockage des demandes de réservation
 * 
 * Stockage local (localStorage) en attendant un CRM
 * Prêt pour intégration webhook/API CRM
 */

const STORAGE_KEY = 'laura_demandes';

/**
 * Labels français
 */
export const serviceLabels = {
  regulier: 'Ménage régulier',
  ponctuel: 'Ménage ponctuel',
  seniors: 'Accompagnement Seniors',
  airbnb: 'Airbnb & Gîtes',
  pro: 'Bureaux & Copropriétés'
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

/**
 * Récupère toutes les demandes
 */
export const getAllDemandes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lecture demandes:', error);
    return [];
  }
};

/**
 * Sauvegarde une nouvelle demande
 */
export const saveDemande = (wizardState) => {
  const demandes = getAllDemandes();
  
  const nouvelleDemande = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: 'new',
    
    // Contact
    name: wizardState.details.name || '',
    phone: wizardState.details.phone || '',
    city: wizardState.details.city || '',
    message: wizardState.details.message || '',
    
    // Service
    service: wizardState.service,
    serviceLabel: serviceLabels[wizardState.service] || wizardState.service,
    frequency: wizardState.frequency,
    frequencyLabel: frequencyLabels[wizardState.frequency] || wizardState.frequency,
    hours: wizardState.hours,
    
    // Prix
    priceEstimate: wizardState.priceEstimate,
    
    // Détails complets
    details: { ...wizardState.details },
    
    // Notes internes
    notes: ''
  };
  
  demandes.unshift(nouvelleDemande); // Ajouter au début
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demandes));
    console.log('✅ Demande sauvegardée:', nouvelleDemande.id);
    
    // TODO: Envoyer vers CRM
    sendToCRM(nouvelleDemande);
    
    return { success: true, id: nouvelleDemande.id };
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Met à jour le statut d'une demande
 */
export const updateDemandeStatus = (id, newStatus) => {
  const demandes = getAllDemandes();
  const index = demandes.findIndex(d => d.id === id);
  
  if (index !== -1) {
    demandes[index].status = newStatus;
    demandes[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demandes));
    return true;
  }
  return false;
};

/**
 * Ajoute une note à une demande
 */
export const addNote = (id, note) => {
  const demandes = getAllDemandes();
  const index = demandes.findIndex(d => d.id === id);
  
  if (index !== -1) {
    demandes[index].notes = note;
    demandes[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demandes));
    return true;
  }
  return false;
};

/**
 * Supprime une demande
 */
export const deleteDemande = (id) => {
  const demandes = getAllDemandes();
  const filtered = demandes.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Export des demandes en CSV
 */
export const exportToCSV = () => {
  const demandes = getAllDemandes();
  
  const headers = ['ID', 'Date', 'Statut', 'Nom', 'Téléphone', 'Ville', 'Service', 'Fréquence', 'Heures', 'Prix estimé', 'Message'];
  
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
    d.message?.replace(/"/g, '""') || ''
  ]);
  
  const csv = [
    headers.join(';'),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
  ].join('\n');
  
  // Télécharger
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `demandes_laura_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * 🚀 INTÉGRATION CRM (à configurer)
 * 
 * Options supportées :
 * - Webhook personnalisé
 * - Notion API
 * - Airtable
 * - HubSpot
 * - Pipedrive
 * - Google Sheets (via Apps Script)
 */
const CRM_CONFIG = {
  enabled: false,
  type: 'webhook', // 'webhook' | 'notion' | 'airtable' | 'hubspot'
  webhookUrl: '', // URL du webhook
  apiKey: '' // Clé API si nécessaire
};

const sendToCRM = async (demande) => {
  if (!CRM_CONFIG.enabled || !CRM_CONFIG.webhookUrl) {
    console.log('📋 CRM non configuré - Demande stockée localement uniquement');
    return;
  }
  
  try {
    const response = await fetch(CRM_CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CRM_CONFIG.apiKey && { 'Authorization': `Bearer ${CRM_CONFIG.apiKey}` })
      },
      body: JSON.stringify({
        // Format standard pour la plupart des CRM
        contact: {
          name: demande.name,
          phone: demande.phone,
          city: demande.city
        },
        deal: {
          title: `${demande.serviceLabel} - ${demande.name || demande.phone}`,
          value: demande.priceEstimate,
          source: 'Site web Laura'
        },
        details: {
          service: demande.serviceLabel,
          frequency: demande.frequencyLabel,
          hours: demande.hours,
          message: demande.message
        },
        metadata: {
          id: demande.id,
          createdAt: demande.createdAt
        }
      })
    });
    
    if (response.ok) {
      console.log('✅ Envoyé au CRM');
    } else {
      console.error('❌ Erreur CRM:', response.status);
    }
  } catch (error) {
    console.error('❌ Erreur envoi CRM:', error);
  }
};

export default {
  getAllDemandes,
  saveDemande,
  updateDemandeStatus,
  addNote,
  deleteDemande,
  exportToCSV
};
