import React from 'react';
import { Key, Calendar, Clock, Bed, CheckCircle2, Camera, Home, AlertTriangle } from 'lucide-react';

/**
 * DetailsAirbnb - Détails spécifiques pour Airbnb & Gîtes
 * 
 * Champs :
 * - Type de logement (principal / secondaire) - impact sur avance immédiate
 * - Gestion des clés (boîte, main propre, accès digital)
 * - Turnover (heure départ / arrivée)
 * - Gestion du linge
 * - Check-list priorités
 * - Photos fin de prestation
 */

const DetailsAirbnb = ({ details, updateDetails }) => {

  // ═══════════════════════════════════════════════════════════════════
  // DONNÉES
  // ═══════════════════════════════════════════════════════════════════

  const residenceTypes = [
    { 
      id: 'principal', 
      label: 'Résidence principale', 
      description: 'Votre logement habituel que vous louez ponctuellement',
      icon: '🏠',
      eligible50: true
    },
    { 
      id: 'secondaire', 
      label: 'Résidence secondaire / Investissement', 
      description: 'Logement dédié à la location',
      icon: '🏘️',
      eligible50: false
    },
  ];
  
  const keyOptions = [
    { id: 'keybox', label: 'Boîte à clés', icon: '🔑' },
    { id: 'handover', label: 'Remise en main propre', icon: '🤝' },
    { id: 'digital', label: 'Accès digital / code', icon: '📱' },
    { id: 'onsite', label: 'Je serai sur place', icon: '🏠' },
  ];

  const linenOptions = [
    { id: 'host', label: 'Fourni par moi', description: 'Je fournis le linge propre' },
    { id: 'wash', label: 'À laver sur place', description: 'Machine disponible' },
    { id: 'full', label: 'Gestion complète', description: 'Lavage + séchage + mise en place' },
  ];

  const checklist = [
    { id: 'bathroom', label: 'Salle de bain', icon: '🚿' },
    { id: 'kitchen', label: 'Cuisine', icon: '🍳' },
    { id: 'beds', label: 'Lits & draps', icon: '🛏️' },
    { id: 'trash', label: 'Poubelles', icon: '🗑️' },
    { id: 'floors', label: 'Sols', icon: '🧹' },
    { id: 'dust', label: 'Poussière', icon: '✨' },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════

  const toggleChecklist = (itemId) => {
    const current = details.checklist || [];
    const updated = current.includes(itemId)
      ? current.filter(i => i !== itemId)
      : [...current, itemId];
    updateDetails({ checklist: updated });
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏡 Détails location courte durée
      </h3>
      
      {/* Type de logement */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Home size={16} className="inline mr-1" />
          Type de logement <span className="text-red-500">*</span>
        </label>
        
        <div className="space-y-3">
          {residenceTypes.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => updateDetails({ residenceType: type.id })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                details.residenceType === type.id
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{type.icon}</span>
                <div className="flex-1">
                  <span className={`font-semibold block ${details.residenceType === type.id ? 'text-blue-700' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                  <span className="text-xs text-gray-500">{type.description}</span>
                  {type.eligible50 ? (
                    <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                      ✓ Éligible avance immédiate 50%
                    </span>
                  ) : (
                    <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      ⚠️ Non éligible à l'avance immédiate
                    </span>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  details.residenceType === type.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {details.residenceType === type.id && <CheckCircle2 size={14} className="text-white" />}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Avertissement si résidence secondaire */}
        {details.residenceType === 'secondaire' && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 text-xs">
              <strong>Résidence secondaire :</strong> L'avance immédiate de 50% n'est pas applicable. 
              Le crédit d'impôt reste valable lors de votre déclaration annuelle.
            </p>
          </div>
        )}
      </div>
      
      {/* Comment accéder au logement */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Key size={16} className="inline mr-1" />
          Comment accéder au logement ?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {keyOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ keyAccess: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.keyAccess === opt.id
                  ? 'bg-blue-50 border-blue-400 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            >
              <span className="text-xl block mb-1">{opt.icon}</span>
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
        {details.keyAccess === 'keybox' && (
          <input
            type="text"
            value={details.keyboxCode || ''}
            onChange={(e) => updateDetails({ keyboxCode: e.target.value })}
            placeholder="Code de la boîte à clés"
            className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
          />
        )}
      </div>

      {/* Horaires de turnover */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Calendar size={16} className="inline mr-1" />
          Horaires de turnover
        </label>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
          <p className="text-blue-700 text-sm">
            ⏰ Indiquez l'heure de départ des voyageurs et l'arrivée des suivants.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Départ voyageurs</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                value={details.checkoutTime || ''}
                onChange={(e) => updateDetails({ checkoutTime: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Arrivée suivants</label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                value={details.checkinTime || ''}
                onChange={(e) => updateDetails({ checkinTime: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gestion du linge */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Bed size={16} className="inline mr-1" />
          Gestion du linge
        </label>
        <div className="space-y-2">
          {linenOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ linenOption: opt.id })}
              className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                details.linenOption === opt.id
                  ? 'bg-blue-50 border-blue-400'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex-1 text-left">
                <span className={`font-semibold block ${details.linenOption === opt.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {opt.label}
                </span>
                <span className="text-xs text-gray-500">{opt.description}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                details.linenOption === opt.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
                {details.linenOption === opt.id && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Check-list priorités */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ✅ Check-list priorités
        </label>
        <div className="flex flex-wrap gap-2">
          {checklist.map(item => {
            const isSelected = (details.checklist || []).includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklist(item.id)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {isSelected && <CheckCircle2 size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photos fin de prestation */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => updateDetails({ wantPhotos: !details.wantPhotos })}
          className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all duration-200 ${
            details.wantPhotos 
              ? 'bg-blue-50 border-blue-400' 
              : 'bg-white border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${details.wantPhotos ? 'bg-blue-500' : 'bg-gray-100'}`}>
            <Camera size={20} className={details.wantPhotos ? 'text-white' : 'text-gray-500'} />
          </div>
          <div className="flex-1 text-left">
            <span className={`font-semibold block ${details.wantPhotos ? 'text-blue-700' : 'text-gray-700'}`}>
              Photos fin de prestation
            </span>
            <span className="text-xs text-gray-500">Recevez des photos pour vérifier l'état</span>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            details.wantPhotos ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          }`}>
            {details.wantPhotos && <CheckCircle2 size={14} className="text-white" />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DetailsAirbnb;
