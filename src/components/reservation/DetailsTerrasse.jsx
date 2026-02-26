import React from 'react';
import { Key, CheckCircle2, Package, Paintbrush } from 'lucide-react';

/**
 * DetailsTerrasse - Détails spécifiques pour le nettoyage de terrasse
 * 
 * Champs :
 * - Application saturateur bois (toggle important — impacte la durée recommandée)
 * - Accès extérieur (portail, code, indications)
 * - Option payante : Produits fournis par Laura (+3€/venue)
 * 
 * Note : Surface et état sont déjà renseignés à l'étape 2 (comme ponctuel)
 */

const DetailsTerrasse = ({ details, updateDetails, options, toggleOption }) => {

  const optionsList = [
    { id: 'products', label: 'Produits fournis par Laura', icon: Package, extra: '+3€/venue' },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        ☀️ Détails nettoyage terrasse
      </h3>

      {/* Option saturateur bois */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🪵 Type de terrasse & finition
        </label>
        <button
          type="button"
          onClick={() => updateDetails({ saturateur: !details.saturateur })}
          className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all duration-200 ${
            details.saturateur 
              ? 'bg-amber-50 border-amber-400' 
              : 'bg-white border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${details.saturateur ? 'bg-amber-500' : 'bg-gray-100'}`}>
            <Paintbrush size={20} className={details.saturateur ? 'text-white' : 'text-gray-500'} />
          </div>
          <div className="flex-1 text-left">
            <span className={`font-semibold text-sm block ${details.saturateur ? 'text-amber-700' : 'text-gray-700'}`}>
              Application de saturateur / huile bois
            </span>
            <span className={`text-xs ${details.saturateur ? 'text-amber-600' : 'text-gray-500'}`}>
              Protection du bois après nettoyage — au pinceau large, lame par lame
            </span>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            details.saturateur ? 'bg-amber-500 border-amber-500' : 'border-gray-300'
          }`}>
            {details.saturateur && <CheckCircle2 size={12} className="text-white" />}
          </div>
        </button>
        {details.saturateur && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-700 text-xs">
              ⏱️ <strong>Comptez +2h à +3h supplémentaires</strong> pour l'application du saturateur. 
              C'est un travail minutieux au pinceau large (largeur des lames). 
              Pensez à ajuster la durée à l'étape précédente si nécessaire.
            </p>
          </div>
        )}
      </div>

      {/* Accès extérieur */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Key size={16} className="inline mr-1" />
          Accès à la terrasse
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={details.accessCode || ''}
            onChange={(e) => updateDetails({ accessCode: e.target.value })}
            placeholder="Code portail / interphone"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors"
          />
          <input
            type="text"
            value={details.floor || ''}
            onChange={(e) => updateDetails({ floor: e.target.value })}
            placeholder="Indications d'accès (ex: par le jardin)"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Info terrasse */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-amber-700 text-sm">
          💡 <strong>Bon à savoir :</strong> Laura apporte tout le matériel nécessaire (nettoyeur haute pression, 
          produits anti-mousse). Assurez-vous simplement qu'un point d'eau extérieur est accessible.
        </p>
      </div>

      {/* Option supplémentaire : produits fournis uniquement */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🧹 Options supplémentaires
        </label>
        <div className="space-y-2">
          {optionsList.map(option => {
            const isActive = options[option.id];
            const Icon = option.icon;
            
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`flex items-center gap-4 w-full p-3 rounded-xl border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-amber-50 border-amber-400' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-amber-500' : 'bg-gray-100'}`}>
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`flex-1 text-left font-medium text-sm ${isActive ? 'text-amber-700' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                <span className={`text-xs font-medium ${isActive ? 'text-amber-600' : 'text-gray-400'}`}>
                  {option.extra}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-amber-500 border-amber-500' : 'border-gray-300'
                }`}>
                  {isActive && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsTerrasse;
