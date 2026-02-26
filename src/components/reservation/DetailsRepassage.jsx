import React from 'react';
import { CheckCircle2, Package, Shirt } from 'lucide-react';

/**
 * DetailsRepassage - Détails spécifiques pour le repassage à domicile
 * 
 * Champs :
 * - Volume de linge à repasser (petit / moyen / grand panier)
 * - Option : Matériel fourni par Laura (table + fer)
 * 
 * Note : Accès au logement déplacé en Step 4 (Coordonnées)
 */

const DetailsRepassage = ({ details, updateDetails, options, toggleOption }) => {

  const volumeOptions = [
    { id: 'small', label: 'Petit panier', description: '1-2 personnes', icon: '👕' },
    { id: 'medium', label: 'Panier moyen', description: '3-4 personnes', icon: '👔' },
    { id: 'large', label: 'Grand panier', description: '5+ personnes / famille', icon: '🧺' },
  ];

  const optionsList = [
    { id: 'products', label: 'Matériel fourni par Laura (table + fer)', icon: Shirt, extra: '+3€/venue' },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        👔 Détails du repassage
      </h3>

      {/* Volume de linge */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🧺 Volume de linge à repasser
        </label>
        <div className="grid grid-cols-3 gap-3">
          {volumeOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ ironingVolume: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.ironingVolume === opt.id
                  ? 'bg-orange-50 border-orange-400 text-orange-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
              }`}
            >
              <span className="text-2xl block mb-1">{opt.icon}</span>
              <span className="font-bold block text-sm">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Option supplémentaire : matériel fourni */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          👔 Options supplémentaires
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
                    ? 'bg-orange-50 border-orange-400' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-orange-500' : 'bg-gray-100'}`}>
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`flex-1 text-left font-medium text-sm ${isActive ? 'text-orange-700' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                <span className={`text-xs font-medium ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
                  {option.extra}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
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

export default DetailsRepassage;
