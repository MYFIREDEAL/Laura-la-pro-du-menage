import React from 'react';
import { Key, CheckCircle2, Package } from 'lucide-react';

/**
 * DetailsRepassage - Détails spécifiques pour le repassage à domicile
 * 
 * Champs :
 * - Accès au logement (digicode, étage)
 * - Seule option payante : Produits fournis par Laura (+3€/venue)
 */

const DetailsRepassage = ({ details, updateDetails, options, toggleOption }) => {

  const optionsList = [
    { id: 'products', label: 'Produits fournis par Laura', icon: Package, extra: '+3€/venue' },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        👔 Détails du repassage
      </h3>

      {/* Accès au logement */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Key size={16} className="inline mr-1" />
          Accès au logement
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={details.accessCode || ''}
            onChange={(e) => updateDetails({ accessCode: e.target.value })}
            placeholder="Digicode / interphone"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
          />
          <input
            type="text"
            value={details.floor || ''}
            onChange={(e) => updateDetails({ floor: e.target.value })}
            placeholder="Étage (ex: 3ème sans ascenseur)"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
          />
        </div>
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
