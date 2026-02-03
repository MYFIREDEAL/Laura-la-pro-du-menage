import React from 'react';
import { Home, Sparkles, Key, CheckCircle2, Shirt, Package, Glasses } from 'lucide-react';

/**
 * DetailsRegularPonctuel - Détails spécifiques pour ménage régulier / ponctuel
 * 
 * Champs :
 * - Surface approximative (S/M/L/XL)
 * - Priorités (cuisine, SDB, sols, poussière)
 * - Accès (digicode, étage, clés)
 * - Options génériques (repassage, produits, vitres)
 */

const DetailsRegularPonctuel = ({ details, updateDetails, options, toggleOption }) => {
  
  // ═══════════════════════════════════════════════════════════════════
  // DONNÉES
  // ═══════════════════════════════════════════════════════════════════
  
  const surfaceOptions = [
    { id: 'S', label: '< 50m²', description: 'Studio / T1' },
    { id: 'M', label: '50-80m²', description: 'T2 / T3' },
    { id: 'L', label: '80-120m²', description: 'T4 / T5' },
    { id: 'XL', label: '> 120m²', description: 'Grande maison' },
  ];

  const priorities = [
    { id: 'kitchen', label: 'Cuisine', icon: '🍳' },
    { id: 'bathroom', label: 'Salle de bain', icon: '🚿' },
    { id: 'floors', label: 'Sols', icon: '🧹' },
    { id: 'dust', label: 'Poussière', icon: '✨' },
    { id: 'bedrooms', label: 'Chambres', icon: '🛏️' },
  ];

  const optionsList = [
    { id: 'ironing', label: 'Repassage', icon: Shirt, extra: '+2€/h' },
    { id: 'products', label: 'Produits fournis', icon: Package, extra: '+3€' },
    { id: 'windows', label: 'Vitres', icon: Glasses, extra: '+5€' },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════

  const togglePriority = (priorityId) => {
    const currentPriorities = details.priorities || [];
    const newPriorities = currentPriorities.includes(priorityId)
      ? currentPriorities.filter(p => p !== priorityId)
      : [...currentPriorities, priorityId];
    updateDetails({ priorities: newPriorities });
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏠 Détails du ménage
      </h3>
      
      {/* Surface approximative */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Home size={16} className="inline mr-1" />
          Surface approximative
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {surfaceOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ surface: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.surface === opt.id
                  ? 'bg-orange-50 border-orange-400 text-orange-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
              }`}
            >
              <span className="font-bold block">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Priorités de ménage */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Sparkles size={16} className="inline mr-1" />
          Priorités de ménage <span className="text-gray-400 font-normal">(optionnel)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {priorities.map(priority => {
            const isSelected = (details.priorities || []).includes(priority.id);
            return (
              <button
                key={priority.id}
                type="button"
                onClick={() => togglePriority(priority.id)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-orange-50 border-orange-400 text-orange-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
                }`}
              >
                <span>{priority.icon}</span>
                {priority.label}
                {isSelected && <CheckCircle2 size={14} />}
              </button>
            );
          })}
        </div>
      </div>

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

      {/* Options supplémentaires */}
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

export default DetailsRegularPonctuel;
