import React from 'react';
import { Home, CheckCircle2, Package } from 'lucide-react';

/**
 * DetailsVitres - Détails spécifiques pour le nettoyage de baies vitrées
 * 
 * Champs :
 * - Surface approximative (S/M/L/XL) — pour estimer le nombre de baies
 * - Seule option payante : Produits fournis par Laura (+3€/venue)
 * 
 * Note : Accès au logement déplacé en Step 4 (Coordonnées)
 */

const DetailsVitres = ({ details, updateDetails, options, toggleOption }) => {

  const surfaceOptions = [
    { id: 'S', label: '< 50m²', description: 'Studio / T1' },
    { id: 'M', label: '50-80m²', description: 'T2 / T3' },
    { id: 'L', label: '80-120m²', description: 'T4 / T5' },
    { id: 'XL', label: '> 120m²', description: 'Grande maison' },
  ];

  const optionsList = [
    { id: 'products', label: 'Produits fournis par Laura', icon: Package, extra: '+3€/venue' },
  ];

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        🪟 Détails nettoyage baies vitrées
      </h3>

      {/* Surface approximative */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Home size={16} className="inline mr-1" />
          Surface du logement <span className="text-gray-400 font-normal">(permet d'estimer le nombre de vitres)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {surfaceOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ surface: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.surface === opt.id
                  ? 'bg-cyan-50 border-cyan-400 text-cyan-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-cyan-300'
              }`}
            >
              <span className="font-bold block">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Option supplémentaire : produits fournis uniquement */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          � Options supplémentaires
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
                    ? 'bg-cyan-50 border-cyan-400' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-cyan-500' : 'bg-gray-100'}`}>
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`flex-1 text-left font-medium text-sm ${isActive ? 'text-cyan-700' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                <span className={`text-xs font-medium ${isActive ? 'text-cyan-600' : 'text-gray-400'}`}>
                  {option.extra}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
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

export default DetailsVitres;
