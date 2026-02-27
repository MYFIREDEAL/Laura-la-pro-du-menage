import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Phone, MapPin, Calendar, Clock, User, 
  CheckCircle2, XCircle, MessageSquare, Download,
  Trash2, ChevronDown, ChevronUp, Search, Filter,
  Home, Users, Key, Building2, RefreshCw, Eye,
  Gift, ToggleLeft, ToggleRight, CalendarDays, Percent, Tag
} from 'lucide-react';
import { 
  getAllDemandes, 
  updateDemandeStatus, 
  addNote, 
  deleteDemande, 
  exportToCSV,
  statusLabels,
  serviceLabels,
  frequencyLabels
} from '../lib/demandesStorage';
import {
  getAllCandidatures,
  updateCandidatureStatus,
  addCandidatureNote,
  deleteCandidature,
  candidatureStatusLabels
} from '../lib/candidaturesStorage';
import {
  getAllPromotions,
  updatePromotion,
  updateAllPromotions,
  promoServiceLabels,
  formatDateFr
} from '../lib/promotionsStorage';

/**
 * Traductions des valeurs en français
 */
const translations = {
  // Types de logement
  homeType: {
    'apartment': 'Appartement',
    'house': 'Maison',
    'studio': 'Studio',
    'loft': 'Loft'
  },
  // Priorités
  priorities: {
    'cuisine': 'Cuisine',
    'salles-de-bain': 'Salles de bain',
    'chambres': 'Chambres',
    'salon': 'Salon',
    'sols': 'Sols',
    'vitres': 'Vitres',
    'poussiere': 'Poussière',
    'kitchen': 'Cuisine',
    'bathroom': 'Salle de bain',
    'bathrooms': 'Salles de bain',
    'bedrooms': 'Chambres',
    'living': 'Salon',
    'floors': 'Sols',
    'windows': 'Vitres',
    'dust': 'Poussière'
  },
  // Options
  options: {
    'repassage': 'Repassage',
    'vitres': 'Nettoyage vitres',
    'frigo': 'Intérieur frigo',
    'four': 'Nettoyage four',
    'linge': 'Gestion du linge',
    'ironing': 'Repassage',
    'windows': 'Nettoyage vitres',
    'fridge': 'Intérieur frigo',
    'oven': 'Nettoyage four',
    'laundry': 'Gestion du linge'
  },
  // Services seniors
  seniorServices: {
    'accompagnement': 'Accompagnement courses',
    'pharmacie': 'Retrait pharmacie',
    'rdv': 'Accompagnement RDV',
    'compagnie': 'Moment de compagnie',
    'medicaments': 'Aide médicaments',
    'lecture': 'Lecture / courrier',
    'plantes': 'Arrosage plantes',
    'repas': 'Préparation repas léger',
    'shopping': 'Accompagnement courses',
    'pharmacy': 'Retrait pharmacie',
    'appointment': 'Accompagnement RDV',
    'company': 'Compagnie'
  },
  // Type de local pro
  localType: {
    'bureau': 'Bureau',
    'copropriete': 'Copropriété',
    'commerce': 'Commerce',
    'office': 'Bureau',
    'building': 'Copropriété',
    'shop': 'Commerce',
    'offices': 'Bureaux',
    'common': 'Parties communes',
    'medical': 'Cabinet médical',
    'other': 'Autre'
  },
  // Surface Pro
  surfacePro: {
    'S': 'Moins de 50m²',
    'M': '50 - 150m²',
    'L': '150 - 300m²',
    'XL': 'Plus de 300m²'
  },
  // Surface Terrasse
  surfaceTerrasse: {
    'xs': 'Moins de 10m²',
    'sm': '10 - 20m²',
    'md': '20 - 40m²',
    'lg': '40 - 60m²',
    'xl': 'Plus de 60m²'
  },
  // Niveau de nettoyage terrasse
  cleanLevelTerrasse: {
    'light': 'Quelques salissures',
    'medium': 'Mousse & traces vertes',
    'deep': 'Bien encrassée',
    'extreme': 'Jungle urbaine (karcher obligatoire)'
  },
  // Horaires préférés
  preferredSchedule: {
    'before9': 'Avant 9h',
    'after18': 'Après 18h',
    'weekend': 'Week-end',
    'flexible': 'Flexible'
  },
  // Exigences d'accès
  accessRequirements: {
    'badge': 'Badge',
    'alarm': 'Alarme',
    'keys': 'Clés'
  },
  // Options wizard
  wizardOptions: {
    'ironing': 'Repassage',
    'products': 'Produits fournis',
    'windows': 'Nettoyage vitres',
    'shopping': 'Courses'
  },
  // Surface logement (régulier/ponctuel/seniors)
  surfaceLogement: {
    'S': '< 50m² (Studio/T1)',
    'M': '50-80m² (T2/T3)',
    'L': '80-120m² (T4/T5)',
    'XL': '> 120m² (Grande maison)'
  },
  // Accès clés Airbnb
  keyAccess: {
    'keybox': 'Boîte à clés',
    'handover': 'Remise en main propre',
    'digital': 'Accès digital / code',
    'onsite': 'Propriétaire sur place'
  },
  // Gestion du linge Airbnb
  linenOption: {
    'host': 'Fourni par le propriétaire',
    'wash': 'À laver sur place',
    'full': 'Gestion complète (lavage + séchage + mise en place)'
  },
  // Checklist Airbnb
  checklist: {
    'bathroom': 'Salle de bain',
    'kitchen': 'Cuisine',
    'beds': 'Lits & draps',
    'trash': 'Poubelles',
    'floors': 'Sols',
    'dust': 'Poussière'
  },
  // Résidence Airbnb
  residenceType: {
    'principal': 'Résidence principale (éligible 50%)',
    'secondaire': 'Résidence secondaire / Investissement'
  },
  // Surface ponctuel (wizard-level xs/sm/md/lg/xl)
  surfacePonctuel: {
    'xs': '< 30m² (Studio)',
    'sm': '30-60m² (T2/T3)',
    'md': '60-90m² (T3/T4)',
    'lg': '90-120m² (T4/T5)',
    'xl': '120m²+ (Grande maison)'
  },
  // État du logement ponctuel
  cleanLevelPonctuel: {
    'light': 'Plutôt propre',
    'medium': 'Ça s\'accumule un peu',
    'deep': 'Ça fait un moment…',
    'extreme': 'Gros chantier en vue !'
  },
  // Volume de repassage
  ironingVolume: {
    'small': 'Petit panier (1-2 pers.)',
    'medium': 'Panier moyen (3-4 pers.)',
    'large': 'Grand panier (5+ pers.)'
  }
};

// Fonction helper pour traduire
const translate = (category, value) => {
  if (!value) return value;
  return translations[category]?.[value] || value;
};

const translateArray = (category, arr) => {
  if (!arr || !Array.isArray(arr)) return arr;
  return arr.map(item => translate(category, item));
};

/**
 * AdminPage - Page d'administration des demandes
 * 
 * Accès : /admin (à sécuriser en production)
 */
const AdminPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('demandes'); // 'demandes' | 'candidatures' | 'promotions'
  const [demandes, setDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);

  // Candidatures
  const [candidatures, setCandidatures] = useState([]);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [showCandMobileDetail, setShowCandMobileDetail] = useState(false);
  const [showCandDeleteModal, setShowCandDeleteModal] = useState(false);
  const [candToDelete, setCandToDelete] = useState(null);
  const [candSearchQuery, setCandSearchQuery] = useState('');
  const [candFilterStatus, setCandFilterStatus] = useState('all');

  // Promotions
  const [promotions, setPromotions] = useState([]);
  const [promoSaving, setPromoSaving] = useState(null); // serviceId en cours de sauvegarde
  const [bulkDate, setBulkDate] = useState('');
  const [bulkDiscount, setBulkDiscount] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Charger les demandes
  const loadDemandes = async () => {
    const data = await getAllDemandes();
    setDemandes(data);
  };

  // Charger les candidatures
  const loadCandidatures = async () => {
    const data = await getAllCandidatures();
    setCandidatures(data);
  };

  // Charger les promotions
  const loadPromotions = async () => {
    const data = await getAllPromotions();
    setPromotions(data);
  };

  useEffect(() => {
    loadDemandes();
    loadCandidatures();
    loadPromotions();
  }, []);

  // ═══════════════════════════════════════════════════════════════════
  // PROMOTIONS — Handlers
  // ═══════════════════════════════════════════════════════════════════

  const handlePromoToggle = async (serviceId, field, value) => {
    setPromoSaving(serviceId);
    await updatePromotion(serviceId, { [field]: value });
    await loadPromotions();
    setPromoSaving(null);
  };

  const handlePromoFieldChange = async (serviceId, field, value) => {
    setPromoSaving(serviceId);
    await updatePromotion(serviceId, { [field]: value });
    await loadPromotions();
    setPromoSaving(null);
  };

  const handleExtend1Month = async (serviceId, currentEndDate) => {
    setPromoSaving(serviceId);
    const date = new Date(currentEndDate + 'T00:00:00');
    date.setMonth(date.getMonth() + 1);
    const newDate = date.toISOString().split('T')[0];
    await updatePromotion(serviceId, { endDate: newDate });
    await loadPromotions();
    setPromoSaving(null);
  };

  const handleBulkApply = async () => {
    const updates = {};
    if (bulkDate) updates.endDate = bulkDate;
    if (bulkDiscount) updates.discountPercent = Number(bulkDiscount);
    if (Object.keys(updates).length > 0) {
      await updateAllPromotions(updates);
      await loadPromotions();
    }
    setShowBulkModal(false);
    setBulkDate('');
    setBulkDiscount('');
  };

  const getPromoStatus = (promo) => {
    if (!promo.promoActive) return { label: 'Désactivée', color: 'bg-gray-100 text-gray-500', dot: '⚪' };
    const today = new Date().toISOString().split('T')[0];
    if (promo.endDate < today) return { label: 'Expirée', color: 'bg-red-100 text-red-600', dot: '🔴' };
    const end = new Date(promo.endDate + 'T00:00:00');
    const now = new Date();
    const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) return { label: `Expire dans ${daysLeft}j`, color: 'bg-amber-100 text-amber-700', dot: '⚠️' };
    return { label: 'Active', color: 'bg-green-100 text-green-700', dot: '🟢' };
  };

  // Sélectionner une demande (avec gestion mobile)
  const handleSelectDemande = (demande) => {
    setSelectedDemande(demande);
    // Sur mobile, afficher le panneau de détail
    if (window.innerWidth < 1024) {
      setShowMobileDetail(true);
    }
  };

  // Fermer le détail mobile
  const closeMobileDetail = () => {
    setShowMobileDetail(false);
  };

  // Filtrer les demandes
  const filteredDemandes = demandes.filter(d => {
    // Filtre statut
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    // Filtre service
    if (filterService !== 'all' && d.service !== filterService) return false;
    // Recherche
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        d.name?.toLowerCase().includes(search) ||
        d.phone?.includes(search) ||
        d.city?.toLowerCase().includes(search) ||
        d.id?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Changer le statut
  const handleStatusChange = async (id, newStatus) => {
    await updateDemandeStatus(id, newStatus);
    await loadDemandes();
    if (selectedDemande?.id === id) {
      setSelectedDemande({ ...selectedDemande, status: newStatus });
    }
  };

  // Ouvrir la modale de confirmation de suppression
  const askDelete = (demande) => {
    setDemandeToDelete(demande);
    setShowDeleteModal(true);
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    if (demandeToDelete) {
      await deleteDemande(demandeToDelete.id);
      await loadDemandes();
      if (selectedDemande?.id === demandeToDelete.id) {
        setSelectedDemande(null);
      }
      setShowMobileDetail(false);
    }
    setShowDeleteModal(false);
    setDemandeToDelete(null);
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDemandeToDelete(null);
  };

  // Sauvegarder une note
  const handleSaveNote = async (id, note) => {
    await addNote(id, note);
    await loadDemandes();
  };

  // ═══════════════════════════════════════════════════════════════════
  // CANDIDATURES — CRUD
  // ═══════════════════════════════════════════════════════════════════

  const handleCandStatusChange = async (id, newStatus) => {
    await updateCandidatureStatus(id, newStatus);
    await loadCandidatures();
    if (selectedCandidature?.id === id) {
      setSelectedCandidature({ ...selectedCandidature, status: newStatus });
    }
  };

  const handleCandSaveNote = async (id, note) => {
    await addCandidatureNote(id, note);
    await loadCandidatures();
  };

  const askDeleteCand = (cand) => {
    setCandToDelete(cand);
    setShowCandDeleteModal(true);
  };

  const confirmDeleteCand = async () => {
    if (candToDelete) {
      await deleteCandidature(candToDelete.id);
      await loadCandidatures();
      if (selectedCandidature?.id === candToDelete.id) setSelectedCandidature(null);
      setShowCandMobileDetail(false);
    }
    setShowCandDeleteModal(false);
    setCandToDelete(null);
  };

  const filteredCandidatures = candidatures.filter(c => {
    if (candFilterStatus !== 'all' && c.status !== candFilterStatus) return false;
    if (candSearchQuery) {
      const s = candSearchQuery.toLowerCase();
      return c.prenom?.toLowerCase().includes(s) || c.tel?.includes(s) || c.email?.toLowerCase().includes(s) || c.departement?.includes(s);
    }
    return true;
  });

  const candStats = {
    total: candidatures.length,
    new: candidatures.filter(c => c.status === 'new').length,
    contacted: candidatures.filter(c => c.status === 'contacted').length,
    confirmed: candidatures.filter(c => c.status === 'confirmed').length
  };

  // Icône par service
  const ServiceIcon = ({ service }) => {
    const icons = {
      regulier: <Home size={16} />,
      ponctuel: <Home size={16} />,
      seniors: <Users size={16} />,
      airbnb: <Key size={16} />,
      pro: <Building2 size={16} />
    };
    return icons[service] || <Home size={16} />;
  };

  // Stats rapides
  const stats = {
    total: demandes.length,
    new: demandes.filter(d => d.status === 'new').length,
    contacted: demandes.filter(d => d.status === 'contacted').length,
    confirmed: demandes.filter(d => d.status === 'confirmed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              {/* Tabs */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('demandes')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'demandes'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Demandes
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === 'demandes' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-500'
                  }`}>{stats.total}</span>
                </button>
                <button
                  onClick={() => setActiveTab('candidatures')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'candidatures'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Candidatures
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === 'candidatures' ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-500'
                  }`}>{candStats.total}</span>
                </button>
                <button
                  onClick={() => setActiveTab('promotions')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'promotions'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="hidden sm:inline">Promos</span>
                  <span className="sm:hidden">🎁</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={activeTab === 'demandes' ? loadDemandes : activeTab === 'candidatures' ? loadCandidatures : loadPromotions}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Actualiser"
              >
                <RefreshCw size={18} />
              </button>
              {activeTab === 'demandes' && (
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Exporter CSV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {activeTab === 'demandes' && (<>
        {/* Stats Cards - Cliquables pour filtrer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              filterStatus === 'all' 
                ? 'bg-white border-gray-400 ring-2 ring-gray-200' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs md:text-sm text-gray-500">Total</p>
          </button>
          <button 
            onClick={() => setFilterStatus('new')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              filterStatus === 'new' 
                ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-200' 
                : 'bg-blue-50 border-blue-200 hover:border-blue-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-blue-700">{stats.new}</p>
            <p className="text-xs md:text-sm text-blue-600">Nouvelles</p>
          </button>
          <button 
            onClick={() => setFilterStatus('contacted')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              filterStatus === 'contacted' 
                ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-200' 
                : 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-yellow-700">{stats.contacted}</p>
            <p className="text-xs md:text-sm text-yellow-600">Contactées</p>
          </button>
          <button 
            onClick={() => setFilterStatus('confirmed')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              filterStatus === 'confirmed' 
                ? 'bg-green-100 border-green-400 ring-2 ring-green-200' 
                : 'bg-green-50 border-green-200 hover:border-green-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-green-700">{stats.confirmed}</p>
            <p className="text-xs md:text-sm text-green-600">Confirmées</p>
          </button>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
            
            {/* Toggle filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              <span className="text-sm">Filtres</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Filtres dépliables */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Statut</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">Tous</option>
                  <option value="new">Nouvelles</option>
                  <option value="contacted">Contactées</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Service</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">Tous</option>
                  <option value="regulier">Ménage régulier</option>
                  <option value="ponctuel">Ménage ponctuel</option>
                  <option value="seniors">Seniors</option>
                  <option value="airbnb">Airbnb</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Liste des demandes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Colonne liste */}
          <div className="lg:col-span-2 space-y-2 md:space-y-3">
            {filteredDemandes.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <MessageSquare size={40} className="mx-auto" />
                </div>
                <p className="text-gray-500">Aucune demande</p>
                <p className="text-sm text-gray-400 mt-1">
                  Les demandes apparaîtront ici
                </p>
              </div>
            ) : (
              filteredDemandes.map((demande) => (
                <div
                  key={demande.id}
                  onClick={() => handleSelectDemande(demande)}
                  className={`bg-white rounded-xl border p-3 md:p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedDemande?.id === demande.id 
                      ? 'border-orange-500 ring-2 ring-orange-100' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 md:gap-3">
                      {/* Icône service */}
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                        <ServiceIcon service={demande.service} />
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                            {demande.name || demande.phone || 'Sans nom'}
                          </h3>
                          <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full ${statusLabels[demande.status]?.color || 'bg-gray-100'}`}>
                            {statusLabels[demande.status]?.label || demande.status}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">{demande.serviceLabel}</p>
                        <div className="flex items-center gap-2 md:gap-3 mt-1 text-[10px] md:text-xs text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Phone size={10} className="md:w-3 md:h-3" />
                            {demande.phone}
                          </span>
                          {demande.city && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} className="md:w-3 md:h-3" />
                              {demande.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs md:text-sm font-semibold text-gray-900">
                        {demande.priceEstimate ? `${demande.priceEstimate}€` : '—'}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-400">
                        {new Date(demande.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Colonne détail - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            {selectedDemande ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Détails</h3>
                  <button
                    onClick={() => askDelete(selectedDemande)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* ID et date */}
                <div className="text-xs text-gray-400 mb-4">
                  <p>ID: {selectedDemande.id}</p>
                  <p>Reçue le {new Date(selectedDemande.createdAt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>

                {/* Contact */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium">{selectedDemande.name || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <a href={`tel:${selectedDemande.phone}`} className="font-medium text-orange-600 hover:underline">
                        {selectedDemande.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{selectedDemande.city || '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div className="bg-orange-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-orange-600 uppercase tracking-wide mb-2">Service</h4>
                  <p className="font-semibold text-gray-900">{selectedDemande.serviceLabel}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {selectedDemande.frequencyLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {selectedDemande.hours}h
                    </span>
                  </div>
                  {selectedDemande.priceEstimate && (
                    <p className="text-lg font-bold text-orange-600 mt-2">
                      {selectedDemande.priceEstimate}€ / intervention
                    </p>
                  )}
                </div>

                {/* Détails complets */}
                {selectedDemande.details && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <h4 className="text-xs text-blue-600 uppercase tracking-wide mb-3">Détails configurés</h4>
                    <div className="space-y-2 text-sm">

                      {/* Surface Pro (depuis details) */}
                      {selectedDemande.details.surface && selectedDemande.service === 'pro' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface</span>
                          <span className="font-medium">{translations.surfacePro[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                        </div>
                      )}

                      {/* Surface logement (régulier / seniors) */}
                      {selectedDemande.details.surface && ['regulier', 'seniors'].includes(selectedDemande.service) && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface</span>
                          <span className="font-medium">{translations.surfaceLogement[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                        </div>
                      )}

                      {/* Surface wizard-level (terrasse) */}
                      {selectedDemande.surface && selectedDemande.service === 'terrasse' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface terrasse</span>
                          <span className="font-medium">{translations.surfaceTerrasse[selectedDemande.surface] || selectedDemande.surface}</span>
                        </div>
                      )}

                      {/* Surface wizard-level (ponctuel) */}
                      {selectedDemande.surface && selectedDemande.service === 'ponctuel' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface</span>
                          <span className="font-medium">{translations.surfacePonctuel[selectedDemande.surface] || selectedDemande.surface}</span>
                        </div>
                      )}

                      {/* Surface vitres (depuis details) */}
                      {selectedDemande.details.surface && selectedDemande.service === 'vitres' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface vitrée</span>
                          <span className="font-medium">{translations.surfaceLogement[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                        </div>
                      )}

                      {/* Niveau d'encrassement terrasse */}
                      {selectedDemande.cleanLevel && selectedDemande.service === 'terrasse' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🧽 Encrassement</span>
                          <span className="font-medium">{translations.cleanLevelTerrasse[selectedDemande.cleanLevel] || selectedDemande.cleanLevel}</span>
                        </div>
                      )}

                      {/* État du logement ponctuel */}
                      {selectedDemande.cleanLevel && selectedDemande.service === 'ponctuel' && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🧹 État du logement</span>
                          <span className="font-medium">{translations.cleanLevelPonctuel[selectedDemande.cleanLevel] || selectedDemande.cleanLevel}</span>
                        </div>
                      )}

                      {/* Saturateur terrasse */}
                      {selectedDemande.service === 'terrasse' && selectedDemande.saturateur && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🪵 Saturateur</span>
                          <span className="font-medium text-orange-600">
                            Oui{selectedDemande.saturateurCost > 0 && ` (+${selectedDemande.saturateurCost}€ fourniture)`}
                          </span>
                        </div>
                      )}
                      
                      {/* Type de logement */}
                      {selectedDemande.details.homeType && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🏠 Logement</span>
                          <span className="font-medium">{translate('homeType', selectedDemande.details.homeType)}</span>
                        </div>
                      )}

                      {/* Résidence Airbnb */}
                      {selectedDemande.details.residenceType && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🏡 Type résidence</span>
                          <span className="font-medium">{translate('residenceType', selectedDemande.details.residenceType)}</span>
                        </div>
                      )}

                      {/* Accès clés Airbnb */}
                      {selectedDemande.details.keyAccess && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🔑 Accès logement</span>
                          <span className="font-medium">{translate('keyAccess', selectedDemande.details.keyAccess)}</span>
                        </div>
                      )}

                      {/* Code boîte à clés Airbnb */}
                      {selectedDemande.details.keyboxCode && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🔐 Code boîte à clés</span>
                          <span className="font-medium font-mono">{selectedDemande.details.keyboxCode}</span>
                        </div>
                      )}

                      {/* Gestion du linge Airbnb */}
                      {selectedDemande.details.linenOption && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🛏️ Linge</span>
                          <span className="font-medium">{translate('linenOption', selectedDemande.details.linenOption)}</span>
                        </div>
                      )}

                      {/* Photos Airbnb */}
                      {selectedDemande.details.wantPhotos && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📸 Photos fin prestation</span>
                          <span className="font-medium text-blue-600">Oui</span>
                        </div>
                      )}

                      {/* Checklist Airbnb */}
                      {selectedDemande.details.checklist && selectedDemande.details.checklist.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">✅ Checklist priorités</span>
                          <div className="flex flex-wrap gap-1">
                            {translateArray('checklist', selectedDemande.details.checklist).map((c, i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Nombre de pièces */}
                      {selectedDemande.details.rooms && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🚪 Pièces</span>
                          <span className="font-medium">{selectedDemande.details.rooms}</span>
                        </div>
                      )}

                      {/* Type de local (Pro) */}
                      {selectedDemande.details.localType && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🏢 Type local</span>
                          <span className="font-medium">{translate('localType', selectedDemande.details.localType)}</span>
                        </div>
                      )}

                      {/* Nom de l'entreprise (Pro) */}
                      {selectedDemande.details.companyName && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🏭 Entreprise</span>
                          <span className="font-medium">{selectedDemande.details.companyName}</span>
                        </div>
                      )}

                      {/* SIRET (Pro) */}
                      {selectedDemande.details.siret && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📋 SIRET</span>
                          <span className="font-medium font-mono text-xs">{selectedDemande.details.siret}</span>
                        </div>
                      )}

                      {/* Horaire préféré (Pro) */}
                      {selectedDemande.details.preferredSchedule && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🕐 Horaire préféré</span>
                          <span className="font-medium">{translate('preferredSchedule', selectedDemande.details.preferredSchedule)}</span>
                        </div>
                      )}

                      {/* Exigences d'accès (Pro) */}
                      {selectedDemande.details.accessRequirements && selectedDemande.details.accessRequirements.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">🔐 Exigences d'accès</span>
                          <div className="flex flex-wrap gap-1">
                            {translateArray('accessRequirements', selectedDemande.details.accessRequirements).map((r, i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{r}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Instructions d'accès (Pro) */}
                      {selectedDemande.details.accessInstructions && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">📝 Instructions d'accès</span>
                          <p className="text-gray-700">{selectedDemande.details.accessInstructions}</p>
                        </div>
                      )}

                      {/* Code d'accès */}
                      {selectedDemande.details.accessCode && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🔑 Code d'accès</span>
                          <span className="font-medium font-mono">{selectedDemande.details.accessCode}</span>
                        </div>
                      )}

                      {/* Étage / Indications d'accès */}
                      {selectedDemande.details.floor && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">{selectedDemande.service === 'terrasse' ? '📍 Accès terrasse' : '🏢 Étage'}</span>
                          <span className="font-medium">{selectedDemande.details.floor}</span>
                        </div>
                      )}

                      {/* Priorités */}
                      {selectedDemande.details.priorities && selectedDemande.details.priorities.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">✨ Priorités</span>
                          <div className="flex flex-wrap gap-1">
                            {translateArray('priorities', selectedDemande.details.priorities).map((p, i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{p}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Options depuis details (ancien format) */}
                      {selectedDemande.details.options && selectedDemande.details.options.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">🔧 Options</span>
                          <div className="flex flex-wrap gap-1">
                            {translateArray('options', selectedDemande.details.options).map((o, i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{o}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Options wizard-level (nouveau format) */}
                      {selectedDemande.options && Object.entries(selectedDemande.options).some(([, v]) => v) && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">⚙️ Options incluses</span>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(selectedDemande.options)
                              .filter(([, v]) => v)
                              .map(([key], i) => (
                                <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">
                                  {translations.wizardOptions[key] || key}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Services seniors */}
                      {selectedDemande.details.seniorServices && selectedDemande.details.seniorServices.length > 0 && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">👴 Services seniors</span>
                          <div className="flex flex-wrap gap-1">
                            {translateArray('seniorServices', selectedDemande.details.seniorServices).map((s, i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Volume de repassage */}
                      {selectedDemande.details.ironingVolume && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">🧺 Volume de linge</span>
                          <span className="font-medium">{translations.ironingVolume[selectedDemande.details.ironingVolume] || selectedDemande.details.ironingVolume}</span>
                        </div>
                      )}

                      {/* Contact proche aidant (Seniors) */}
                      {(selectedDemande.details.carerName || selectedDemande.details.carerPhone) && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">👨‍👩‍👦 Proche aidant</span>
                          <div className="space-y-1">
                            {selectedDemande.details.carerName && (
                              <p className="text-gray-700 text-sm">{selectedDemande.details.carerName}</p>
                            )}
                            {selectedDemande.details.carerPhone && (
                              <a href={`tel:${selectedDemande.details.carerPhone}`} className="text-orange-600 text-sm font-medium hover:underline">
                                📞 {selectedDemande.details.carerPhone}
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Accès (ancien format) */}
                      {selectedDemande.details.accessInfo && (
                        <div className="pt-2 border-t border-blue-100">
                          <span className="text-gray-500 block mb-1">🔑 Accès</span>
                          <p className="text-gray-700">{selectedDemande.details.accessInfo}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message */}
                {(selectedDemande.message || selectedDemande.details?.comments) && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Message</h4>
                    <p className="text-sm text-gray-700">{selectedDemande.message || selectedDemande.details?.comments}</p>
                  </div>
                )}

                {/* Statut */}
                <div className="mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Changer le statut</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(statusLabels).map(([key, { label, color }]) => (
                      <button
                        key={key}
                        onClick={() => handleStatusChange(selectedDemande.id, key)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDemande.status === key
                            ? color + ' ring-2 ring-offset-1'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Notes internes</h4>
                  <textarea
                    defaultValue={selectedDemande.notes || ''}
                    onBlur={(e) => handleSaveNote(selectedDemande.id, e.target.value)}
                    placeholder="Ajouter une note..."
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-24 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Appeler */}
                <a
                  href={`tel:${selectedDemande.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold mt-4 hover:shadow-lg transition-all"
                >
                  <Phone size={18} />
                  Appeler maintenant
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Eye size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Sélectionnez une demande</p>
                <p className="text-sm text-gray-400 mt-1">
                  pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
        </>)}

        {/* ═══════════════════════════════════════════════════════════════
            ONGLET CANDIDATURES
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'candidatures' && (<>
        {/* Stats Cards candidatures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <button 
            onClick={() => setCandFilterStatus('all')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              candFilterStatus === 'all' 
                ? 'bg-white border-gray-400 ring-2 ring-gray-200' 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-gray-900">{candStats.total}</p>
            <p className="text-xs md:text-sm text-gray-500">Total</p>
          </button>
          <button 
            onClick={() => setCandFilterStatus('new')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              candFilterStatus === 'new' 
                ? 'bg-purple-100 border-purple-400 ring-2 ring-purple-200' 
                : 'bg-purple-50 border-purple-200 hover:border-purple-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-purple-700">{candStats.new}</p>
            <p className="text-xs md:text-sm text-purple-600">Nouvelles</p>
          </button>
          <button 
            onClick={() => setCandFilterStatus('contacted')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              candFilterStatus === 'contacted' 
                ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-200' 
                : 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-yellow-700">{candStats.contacted}</p>
            <p className="text-xs md:text-sm text-yellow-600">Contactées</p>
          </button>
          <button 
            onClick={() => setCandFilterStatus('confirmed')}
            className={`text-left rounded-xl p-3 md:p-4 border transition-all ${
              candFilterStatus === 'confirmed' 
                ? 'bg-green-100 border-green-400 ring-2 ring-green-200' 
                : 'bg-green-50 border-green-200 hover:border-green-300'
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-green-700">{candStats.confirmed}</p>
            <p className="text-xs md:text-sm text-green-600">Confirmées</p>
          </button>
        </div>

        {/* Barre de recherche candidatures */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                value={candSearchQuery}
                onChange={(e) => setCandSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={candFilterStatus}
              onChange={(e) => setCandFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="new">Nouvelles</option>
              <option value="contacted">Contactées</option>
              <option value="confirmed">Confirmées</option>
              <option value="cancelled">Refusées</option>
            </select>
          </div>
        </div>

        {/* Liste candidatures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Colonne liste */}
          <div className="lg:col-span-2 space-y-2 md:space-y-3">
            {filteredCandidatures.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Users size={40} className="mx-auto" />
                </div>
                <p className="text-gray-500">Aucune candidature</p>
                <p className="text-sm text-gray-400 mt-1">
                  Les candidatures apparaîtront ici
                </p>
              </div>
            ) : (
              filteredCandidatures.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => {
                    setSelectedCandidature(cand);
                    if (window.innerWidth < 1024) setShowCandMobileDetail(true);
                  }}
                  className={`bg-white rounded-xl border p-3 md:p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCandidature?.id === cand.id 
                      ? 'border-purple-500 ring-2 ring-purple-100' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                        <User size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                            {cand.prenom || 'Sans prénom'}
                          </h3>
                          <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full ${candidatureStatusLabels[cand.status]?.color || 'bg-gray-100'}`}>
                            {candidatureStatusLabels[cand.status]?.label || cand.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 mt-1 text-[10px] md:text-xs text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Phone size={10} className="md:w-3 md:h-3" />
                            {cand.tel}
                          </span>
                          {cand.email && (
                            <span className="flex items-center gap-1 truncate max-w-[160px]">
                              ✉️ {cand.email}
                            </span>
                          )}
                          {cand.departement && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} className="md:w-3 md:h-3" />
                              {cand.departement}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] md:text-xs text-gray-400">
                        {new Date(cand.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Colonne détail candidature - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            {selectedCandidature ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Détails candidature</h3>
                  <button
                    onClick={() => askDeleteCand(selectedCandidature)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="text-xs text-gray-400 mb-4">
                  <p>ID: {selectedCandidature.id}</p>
                  <p>Reçue le {new Date(selectedCandidature.createdAt).toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}</p>
                </div>

                {/* Contact */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium">{selectedCandidature.prenom || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <a href={`tel:${selectedCandidature.tel}`} className="font-medium text-purple-600 hover:underline">
                        {selectedCandidature.tel}
                      </a>
                    </div>
                    {selectedCandidature.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">✉️</span>
                        <a href={`mailto:${selectedCandidature.email}`} className="font-medium text-purple-600 hover:underline text-sm truncate">
                          {selectedCandidature.email}
                        </a>
                      </div>
                    )}
                    {selectedCandidature.departement && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{selectedCandidature.departement}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Statut */}
                <div className="mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Changer le statut</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(candidatureStatusLabels).map(([key, { label, color }]) => (
                      <button
                        key={key}
                        onClick={() => handleCandStatusChange(selectedCandidature.id, key)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCandidature.status === key
                            ? color + ' ring-2 ring-offset-1'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Notes internes</h4>
                  <textarea
                    defaultValue={selectedCandidature.notes || ''}
                    onBlur={(e) => handleCandSaveNote(selectedCandidature.id, e.target.value)}
                    placeholder="Ajouter une note..."
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-24 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Appeler */}
                <a
                  href={`tel:${selectedCandidature.tel}`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold mt-4 hover:shadow-lg transition-all"
                >
                  <Phone size={18} />
                  Appeler maintenant
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Eye size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Sélectionnez une candidature</p>
                <p className="text-sm text-gray-400 mt-1">pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
        </>)}

        {/* ═══════════════════════════════════════════════════════════════
            ONGLET PROMOTIONS
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'promotions' && (<>
        
        {/* Header promos */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Gift size={24} className="text-emerald-500" />
              Gestion des promotions
            </h2>
            <p className="text-sm text-gray-500 mt-1">Modifiez les promos en temps réel — sans coder, sans redéployer</p>
          </div>
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-all shadow-md"
          >
            <Tag size={16} />
            Appliquer à tous
          </button>
        </div>

        {/* Stats promos */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-green-600">{promotions.filter(p => p.promoActive && p.endDate >= new Date().toISOString().split('T')[0]).length}</p>
            <p className="text-xs text-green-600 font-medium">Actives</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-amber-600">{promotions.filter(p => {
              const daysLeft = Math.ceil((new Date(p.endDate + 'T00:00:00') - new Date()) / (1000*60*60*24));
              return p.promoActive && daysLeft > 0 && daysLeft <= 7;
            }).length}</p>
            <p className="text-xs text-amber-600 font-medium">Bientôt expirées</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-red-600">{promotions.filter(p => !p.promoActive || p.endDate < new Date().toISOString().split('T')[0]).length}</p>
            <p className="text-xs text-red-600 font-medium">Inactives</p>
          </div>
        </div>

        {/* Grille des cartes promo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map(promo => {
            const meta = promoServiceLabels[promo.serviceId] || { label: promo.serviceId, emoji: '📦', color: 'gray' };
            const status = getPromoStatus(promo);
            const isSaving = promoSaving === promo.serviceId;
            
            const colorMap = {
              red: { bg: 'bg-red-50', border: 'border-red-200', accent: 'text-red-600', btn: 'bg-red-500 hover:bg-red-600' },
              pink: { bg: 'bg-pink-50', border: 'border-pink-200', accent: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600' },
              orange: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-600', btn: 'bg-orange-500 hover:bg-orange-600' },
              blue: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-600', btn: 'bg-blue-500 hover:bg-blue-600' },
              emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-600', btn: 'bg-emerald-500 hover:bg-emerald-600' },
              purple: { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'text-purple-600', btn: 'bg-purple-500 hover:bg-purple-600' },
              cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', accent: 'text-cyan-600', btn: 'bg-cyan-500 hover:bg-cyan-600' },
              amber: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-600', btn: 'bg-amber-500 hover:bg-amber-600' },
            };
            const c = colorMap[meta.color] || colorMap.emerald;
            
            return (
              <div key={promo.serviceId} className={`relative rounded-2xl border-2 ${promo.promoActive ? c.border : 'border-gray-200'} ${promo.promoActive ? c.bg : 'bg-gray-50'} p-5 transition-all ${isSaving ? 'opacity-60' : ''}`}>
                
                {/* Badge statut */}
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full ${status.color}`}>
                  {status.dot} {status.label}
                </span>
                
                {/* Header carte */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{meta.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{meta.label}</h3>
                    <p className="text-xs text-gray-500">{promo.serviceId}</p>
                  </div>
                </div>

                {/* Toggle actif */}
                <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-3">
                  <span className="text-sm font-medium text-gray-700">Promo active</span>
                  <button
                    onClick={() => handlePromoToggle(promo.serviceId, 'promoActive', !promo.promoActive)}
                    className="transition-all"
                  >
                    {promo.promoActive 
                      ? <ToggleRight size={32} className="text-emerald-500" />
                      : <ToggleLeft size={32} className="text-gray-300" />
                    }
                  </button>
                </div>

                {/* Champs (grisés si désactivé) */}
                <div className={`space-y-3 ${!promo.promoActive ? 'opacity-40 pointer-events-none' : ''}`}>
                  
                  {/* Réduction % */}
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                    <Percent size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 flex-1">Réduction</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={promo.discountPercent}
                        onChange={(e) => handlePromoFieldChange(promo.serviceId, 'discountPercent', Number(e.target.value))}
                        className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <span className="text-sm font-bold text-gray-500">%</span>
                    </div>
                  </div>

                  {/* 1ère heure offerte */}
                  <div className="flex items-center justify-between bg-white rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <Gift size={18} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">1ère heure offerte</span>
                    </div>
                    <button
                      onClick={() => handlePromoToggle(promo.serviceId, 'freeFirstHour', !promo.freeFirstHour)}
                      className="transition-all"
                    >
                      {promo.freeFirstHour 
                        ? <ToggleRight size={28} className="text-emerald-500" />
                        : <ToggleLeft size={28} className="text-gray-300" />
                      }
                    </button>
                  </div>

                  {/* Date de fin */}
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                    <CalendarDays size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 flex-1">Fin</span>
                    <input
                      type="date"
                      value={promo.endDate}
                      onChange={(e) => handlePromoFieldChange(promo.serviceId, 'endDate', e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Bouton prolonger */}
                  <button
                    onClick={() => handleExtend1Month(promo.serviceId, promo.endDate)}
                    className="w-full text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg py-2 transition-all"
                  >
                    📅 Prolonger +1 mois → {formatDateFr((() => { const d = new Date(promo.endDate + 'T00:00:00'); d.setMonth(d.getMonth() + 1); return d.toISOString().split('T')[0]; })())}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal "Appliquer à tous" */}
        {showBulkModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => { setShowBulkModal(false); setBulkDate(''); setBulkDiscount(''); }}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Tag size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Appliquer à tous les services</h3>
                <p className="text-sm text-gray-500 mt-1">Modifiez la date et/ou la réduction pour tous</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nouvelle date de fin</label>
                  <input
                    type="date"
                    value={bulkDate}
                    onChange={(e) => setBulkDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Nouvelle réduction (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={bulkDiscount}
                    onChange={(e) => setBulkDiscount(e.target.value)}
                    placeholder="Ex: 30"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowBulkModal(false); setBulkDate(''); setBulkDiscount(''); }}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleBulkApply}
                  disabled={!bulkDate && !bulkDiscount}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}

        </>)}
      </div>
      {showMobileDetail && selectedDemande && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileDetail}
          />
          
          {/* Slide-over panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Détails</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => askDelete(selectedDemande)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={closeMobileDetail}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* ID et date */}
              <div className="text-xs text-gray-400 mb-4">
                <p>ID: {selectedDemande.id}</p>
                <p>Reçue le {new Date(selectedDemande.createdAt).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{selectedDemande.name || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${selectedDemande.phone}`} className="font-medium text-orange-600">
                      {selectedDemande.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{selectedDemande.city || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="bg-orange-50 rounded-xl p-4 mb-4">
                <h4 className="text-xs text-orange-600 uppercase tracking-wide mb-2">Service</h4>
                <p className="font-semibold text-gray-900">{selectedDemande.serviceLabel}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedDemande.frequencyLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {selectedDemande.hours}h
                  </span>
                </div>
                {selectedDemande.priceEstimate && (
                  <p className="text-lg font-bold text-orange-600 mt-2">
                    {selectedDemande.priceEstimate}€ / intervention
                  </p>
                )}
              </div>

              {/* Détails configurés */}
              {selectedDemande.details && Object.keys(selectedDemande.details).length > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-blue-600 uppercase tracking-wide mb-3">Détails</h4>
                  <div className="space-y-2 text-sm">

                    {/* Surface Pro */}
                    {selectedDemande.details.surface && selectedDemande.service === 'pro' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface</span>
                        <span className="font-medium">{translations.surfacePro[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                      </div>
                    )}

                    {/* Surface logement (régulier / seniors) */}
                    {selectedDemande.details.surface && ['regulier', 'seniors'].includes(selectedDemande.service) && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface</span>
                        <span className="font-medium">{translations.surfaceLogement[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                      </div>
                    )}

                    {/* Surface Terrasse */}
                    {selectedDemande.surface && selectedDemande.service === 'terrasse' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface terrasse</span>
                        <span className="font-medium">{translations.surfaceTerrasse[selectedDemande.surface] || selectedDemande.surface}</span>
                      </div>
                    )}

                    {/* Surface Ponctuel */}
                    {selectedDemande.surface && selectedDemande.service === 'ponctuel' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface</span>
                        <span className="font-medium">{translations.surfacePonctuel[selectedDemande.surface] || selectedDemande.surface}</span>
                      </div>
                    )}

                    {/* Surface Vitres */}
                    {selectedDemande.details.surface && selectedDemande.service === 'vitres' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface vitrée</span>
                        <span className="font-medium">{translations.surfaceLogement[selectedDemande.details.surface] || selectedDemande.details.surface}</span>
                      </div>
                    )}

                    {/* Encrassement terrasse */}
                    {selectedDemande.cleanLevel && selectedDemande.service === 'terrasse' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🧽 Encrassement</span>
                        <span className="font-medium">{translations.cleanLevelTerrasse[selectedDemande.cleanLevel] || selectedDemande.cleanLevel}</span>
                      </div>
                    )}

                    {/* État du logement ponctuel */}
                    {selectedDemande.cleanLevel && selectedDemande.service === 'ponctuel' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🧹 État du logement</span>
                        <span className="font-medium">{translations.cleanLevelPonctuel[selectedDemande.cleanLevel] || selectedDemande.cleanLevel}</span>
                      </div>
                    )}

                    {/* Saturateur */}
                    {selectedDemande.service === 'terrasse' && selectedDemande.saturateur && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🪵 Saturateur</span>
                        <span className="font-medium text-orange-600">
                          Oui{selectedDemande.saturateurCost > 0 && ` (+${selectedDemande.saturateurCost}€)`}
                        </span>
                      </div>
                    )}

                    {/* Type logement */}
                    {selectedDemande.details.homeType && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🏠 Logement</span>
                        <span className="font-medium">{translate('homeType', selectedDemande.details.homeType)}</span>
                      </div>
                    )}

                    {/* Résidence Airbnb */}
                    {selectedDemande.details.residenceType && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🏡 Type résidence</span>
                        <span className="font-medium">{translate('residenceType', selectedDemande.details.residenceType)}</span>
                      </div>
                    )}

                    {/* Accès clés Airbnb */}
                    {selectedDemande.details.keyAccess && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🔑 Accès logement</span>
                        <span className="font-medium">{translate('keyAccess', selectedDemande.details.keyAccess)}</span>
                      </div>
                    )}

                    {/* Code boîte à clés Airbnb */}
                    {selectedDemande.details.keyboxCode && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🔐 Code boîte à clés</span>
                        <span className="font-medium font-mono">{selectedDemande.details.keyboxCode}</span>
                      </div>
                    )}

                    {/* Gestion du linge Airbnb */}
                    {selectedDemande.details.linenOption && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🛏️ Linge</span>
                        <span className="font-medium">{translate('linenOption', selectedDemande.details.linenOption)}</span>
                      </div>
                    )}

                    {/* Photos Airbnb */}
                    {selectedDemande.details.wantPhotos && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📸 Photos fin prestation</span>
                        <span className="font-medium text-blue-600">Oui</span>
                      </div>
                    )}

                    {/* Checklist Airbnb */}
                    {selectedDemande.details.checklist?.length > 0 && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">✅ Checklist priorités</span>
                        <div className="flex flex-wrap gap-1">
                          {translateArray('checklist', selectedDemande.details.checklist).map((c, i) => (
                            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pièces */}
                    {selectedDemande.details.rooms && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🚪 Pièces</span>
                        <span className="font-medium">{selectedDemande.details.rooms}</span>
                      </div>
                    )}

                    {/* Type local */}
                    {selectedDemande.details.localType && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🏢 Type local</span>
                        <span className="font-medium">{translate('localType', selectedDemande.details.localType)}</span>
                      </div>
                    )}

                    {/* Entreprise */}
                    {selectedDemande.details.companyName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🏭 Entreprise</span>
                        <span className="font-medium">{selectedDemande.details.companyName}</span>
                      </div>
                    )}

                    {/* SIRET */}
                    {selectedDemande.details.siret && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📋 SIRET</span>
                        <span className="font-medium font-mono text-xs">{selectedDemande.details.siret}</span>
                      </div>
                    )}

                    {/* Horaire préféré */}
                    {selectedDemande.details.preferredSchedule && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🕐 Horaire</span>
                        <span className="font-medium">{translate('preferredSchedule', selectedDemande.details.preferredSchedule)}</span>
                      </div>
                    )}

                    {/* Exigences d'accès */}
                    {selectedDemande.details.accessRequirements?.length > 0 && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">🔐 Exigences d'accès</span>
                        <div className="flex flex-wrap gap-1">
                          {translateArray('accessRequirements', selectedDemande.details.accessRequirements).map((r, i) => (
                            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{r}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions d'accès */}
                    {selectedDemande.details.accessInstructions && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">📝 Instructions d'accès</span>
                        <p className="text-gray-700">{selectedDemande.details.accessInstructions}</p>
                      </div>
                    )}

                    {/* Code d'accès */}
                    {selectedDemande.details.accessCode && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🔑 Code d'accès</span>
                        <span className="font-medium font-mono">{selectedDemande.details.accessCode}</span>
                      </div>
                    )}

                    {/* Étage / Indications d'accès */}
                    {selectedDemande.details.floor && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{selectedDemande.service === 'terrasse' ? '📍 Accès terrasse' : '🏢 Étage'}</span>
                        <span className="font-medium">{selectedDemande.details.floor}</span>
                      </div>
                    )}

                    {selectedDemande.details.priorities?.length > 0 && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">✨ Priorités</span>
                        <div className="flex flex-wrap gap-1">
                          {translateArray('priorities', selectedDemande.details.priorities).map((p, i) => (
                            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedDemande.details.options?.length > 0 && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">🔧 Options</span>
                        <div className="flex flex-wrap gap-1">
                          {translateArray('options', selectedDemande.details.options).map((o, i) => (
                            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{o}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Options wizard-level */}
                    {selectedDemande.options && Object.entries(selectedDemande.options).some(([, v]) => v) && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">⚙️ Options incluses</span>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(selectedDemande.options)
                            .filter(([, v]) => v)
                            .map(([key], i) => (
                              <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">
                                {translations.wizardOptions[key] || key}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Services seniors */}
                    {selectedDemande.details.seniorServices?.length > 0 && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">👴 Services seniors</span>
                        <div className="flex flex-wrap gap-1">
                          {translateArray('seniorServices', selectedDemande.details.seniorServices).map((s, i) => (
                            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Volume de repassage */}
                    {selectedDemande.details.ironingVolume && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">🧺 Volume de linge</span>
                        <span className="font-medium">{translations.ironingVolume[selectedDemande.details.ironingVolume] || selectedDemande.details.ironingVolume}</span>
                      </div>
                    )}

                    {/* Contact proche aidant (Seniors) */}
                    {(selectedDemande.details.carerName || selectedDemande.details.carerPhone) && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">👨‍👩‍👦 Proche aidant</span>
                        <div className="space-y-1">
                          {selectedDemande.details.carerName && (
                            <p className="text-gray-700 text-sm">{selectedDemande.details.carerName}</p>
                          )}
                          {selectedDemande.details.carerPhone && (
                            <a href={`tel:${selectedDemande.details.carerPhone}`} className="text-orange-600 text-sm font-medium hover:underline">
                              📞 {selectedDemande.details.carerPhone}
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Accès ancien format */}
                    {selectedDemande.details.accessInfo && (
                      <div className="pt-2 border-t border-blue-100">
                        <span className="text-gray-500 block mb-1">🔑 Accès</span>
                        <p className="text-gray-700">{selectedDemande.details.accessInfo}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              {(selectedDemande.message || selectedDemande.details?.comments) && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Message</h4>
                  <p className="text-sm text-gray-700">{selectedDemande.message || selectedDemande.details?.comments}</p>
                </div>
              )}

              {/* Statut */}
              <div className="mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Statut</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(statusLabels).map(([key, { label, color }]) => (
                    <button
                      key={key}
                      onClick={() => { handleStatusChange(selectedDemande.id, key); }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDemande.status === key
                          ? color + ' ring-2 ring-offset-1'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appeler - sticky bottom */}
              <a
                href={`tel:${selectedDemande.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold shadow-lg"
              >
                <Phone size={20} />
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && demandeToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 fade-in duration-200">
            {/* Icône */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-600" />
            </div>
            
            {/* Titre */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Supprimer cette demande ?
            </h3>
            
            {/* Détails de la demande */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="font-medium text-gray-900 text-center">
                {demandeToDelete.name || demandeToDelete.phone}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {demandeToDelete.serviceLabel}
              </p>
            </div>
            
            <p className="text-sm text-gray-500 text-center mb-6">
              Cette action est irréversible.
            </p>
            
            {/* Boutons */}
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CANDIDATURE — Mobile Detail Slide-over
         ═══════════════════════════════════════════════════════════════ */}
      {showCandMobileDetail && selectedCandidature && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCandMobileDetail(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Détails candidature</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => askDeleteCand(selectedCandidature)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setShowCandMobileDetail(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs text-gray-400 mb-4">
                <p>ID: {selectedCandidature.id}</p>
                <p>Reçue le {new Date(selectedCandidature.createdAt).toLocaleDateString('fr-FR', {
                  weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{selectedCandidature.prenom || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${selectedCandidature.tel}`} className="font-medium text-purple-600">
                      {selectedCandidature.tel}
                    </a>
                  </div>
                  {selectedCandidature.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">✉️</span>
                      <a href={`mailto:${selectedCandidature.email}`} className="font-medium text-purple-600 text-sm truncate">
                        {selectedCandidature.email}
                      </a>
                    </div>
                  )}
                  {selectedCandidature.departement && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{selectedCandidature.departement}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Statut */}
              <div className="mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Statut</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(candidatureStatusLabels).map(([key, { label, color }]) => (
                    <button
                      key={key}
                      onClick={() => handleCandStatusChange(selectedCandidature.id, key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCandidature.status === key
                          ? color + ' ring-2 ring-offset-1'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appeler */}
              <a
                href={`tel:${selectedCandidature.tel}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold shadow-lg"
              >
                <Phone size={20} />
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CANDIDATURE — Modale de suppression
         ═══════════════════════════════════════════════════════════════ */}
      {showCandDeleteModal && candToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowCandDeleteModal(false); setCandToDelete(null); }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 fade-in duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Supprimer cette candidature ?
            </h3>
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="font-medium text-gray-900 text-center">
                {candToDelete.prenom || candToDelete.tel}
              </p>
              {candToDelete.email && (
                <p className="text-sm text-gray-500 text-center">{candToDelete.email}</p>
              )}
            </div>
            <p className="text-sm text-gray-500 text-center mb-6">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowCandDeleteModal(false); setCandToDelete(null); }}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteCand}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
