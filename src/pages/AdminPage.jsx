import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Phone, MapPin, Calendar, Clock, User, 
  CheckCircle2, XCircle, MessageSquare, Download,
  Trash2, ChevronDown, ChevronUp, Search, Filter,
  Home, Users, Key, Building2, RefreshCw, Eye
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
    'compagnie': 'Compagnie',
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
    'shop': 'Commerce'
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
  const [demandes, setDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);

  // Charger les demandes
  const loadDemandes = () => {
    const data = getAllDemandes();
    setDemandes(data);
  };

  useEffect(() => {
    loadDemandes();
  }, []);

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
  const handleStatusChange = (id, newStatus) => {
    updateDemandeStatus(id, newStatus);
    loadDemandes();
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
  const confirmDelete = () => {
    if (demandeToDelete) {
      deleteDemande(demandeToDelete.id);
      loadDemandes();
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
  const handleSaveNote = (id, note) => {
    addNote(id, note);
    loadDemandes();
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
              <div>
                <h1 className="text-xl font-bold text-gray-900">Demandes</h1>
                <p className="text-sm text-gray-500">{stats.total} demande{stats.total > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={loadDemandes}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Actualiser"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Exporter CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
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
                      {/* Surface */}
                      {selectedDemande.details.surface && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">📐 Surface</span>
                          <span className="font-medium">{selectedDemande.details.surface} m²</span>
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
                          <span className="font-medium">
                            {selectedDemande.details.residenceType === 'main' ? 'Principale (50% éligible)' : 'Secondaire'}
                          </span>
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

                      {/* Options */}
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

                      {/* Accès */}
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
                {selectedDemande.message && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Message</h4>
                    <p className="text-sm text-gray-700">{selectedDemande.message}</p>
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
      </div>

      {/* Mobile Detail Slide-over */}
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
                    {selectedDemande.details.surface && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">📐 Surface</span>
                        <span className="font-medium">{selectedDemande.details.surface} m²</span>
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
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedDemande.message && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Message</h4>
                  <p className="text-sm text-gray-700">{selectedDemande.message}</p>
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
    </div>
  );
};

export default AdminPage;
