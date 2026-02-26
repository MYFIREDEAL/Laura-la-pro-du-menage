import React from 'react';
import { 
  Home, Sparkles, CheckCircle2, 
  Shirt, Package, Glasses, ShoppingCart,
  Heart, Coffee, Pill, BookOpen, Phone, User
} from 'lucide-react';

/**
 * DetailsSeniors - Détails spécifiques pour accompagnement seniors
 * 
 * Structure identique à DetailsRegularPonctuel + services seniors :
 * - Surface approximative (S/M/L/XL)
 * - Priorités ménage (cuisine, SDB, sols, poussière, chambres)
 * - Accès au logement
 * - Services inclus gratuits (compagnie, médicaments, lecture...)
 * - Options payantes (repassage, courses, produits, vitres)
 * - Contact aidant
 */

const DetailsSeniors = ({ details, updateDetails, options, toggleOption }) => {
  
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

  // Services GRATUITS spécifiques seniors (inclus dans la prestation)
  const seniorServicesGratuits = [
    { id: 'compagnie', label: 'Moment de compagnie', icon: Coffee, description: 'Discussion, écoute bienveillante' },
    { id: 'medicaments', label: 'Aide médicaments', icon: Pill, description: 'Rappel et organisation du pilulier' },
    { id: 'lecture', label: 'Lecture / courrier', icon: BookOpen, description: 'Lire le journal, trier le courrier' },
    { id: 'plantes', label: 'Arrosage plantes', icon: '🌱', description: 'Entretien des plantes d\'intérieur' },
    { id: 'repas', label: 'Préparation repas léger', icon: '🍽️', description: 'Petit-déjeuner, collation simple' },
  ];

  // Options PAYANTES (identiques au ménage + courses)
  const optionsPayantes = [
    { id: 'ironing', label: 'Repassage', icon: Shirt, extra: '+5€/venue' },
    { id: 'shopping', label: 'Faire les courses', icon: ShoppingCart, extra: '+10€/sortie' },
    { id: 'products', label: 'Produits fournis par Laura', icon: Package, extra: '+3€/venue' },
    { id: 'windows', label: 'Vitres', icon: Glasses, extra: '+5€/venue' },
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

  const toggleSeniorService = (serviceId) => {
    const currentServices = details.seniorServices || [];
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter(s => s !== serviceId)
      : [...currentServices, serviceId];
    updateDetails({ seniorServices: newServices });
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        👵 Accompagnement seniors
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

      {/* Séparateur */}
      <div className="border-t border-gray-200 my-6 pt-2">
        <span className="text-sm font-semibold text-gray-500">Services spécifiques seniors</span>
      </div>
      
      {/* Services seniors GRATUITS */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Heart size={16} className="inline mr-1 text-red-500" />
          Petits plus inclus <span className="text-green-600 font-semibold">(gratuit)</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Laura peut aussi vous apporter un peu de réconfort au quotidien :</p>
        
        <div className="space-y-2">
          {seniorServicesGratuits.map(service => {
            const isActive = (details.seniorServices || []).includes(service.id);
            const Icon = typeof service.icon === 'string' ? null : service.icon;
            
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleSeniorService(service.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${isActive ? 'bg-green-500' : 'bg-gray-100'}`}>
                  {Icon ? <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} /> : service.icon}
                </div>
                <div className="flex-1 text-left">
                  <span className={`font-medium text-sm block ${isActive ? 'text-green-700' : 'text-gray-700'}`}>
                    {service.label}
                  </span>
                  <span className="text-xs text-gray-500">{service.description}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  Inclus
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                  {isActive && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Options PAYANTES */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🧹 Options supplémentaires
        </label>
        <div className="space-y-2">
          {optionsPayantes.map(option => {
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
      
      {/* Contact proche aidant */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <label className="block text-sm font-medium text-blue-800 mb-3">
          <User size={16} className="inline mr-1" />
          Contact proche aidant <span className="text-blue-500 font-normal">(optionnel)</span>
        </label>
        <p className="text-xs text-blue-600 mb-3">En cas de besoin, Laura pourra contacter cette personne.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={details.carerName || ''}
            onChange={(e) => updateDetails({ carerName: e.target.value })}
            placeholder="Prénom du proche"
            className="px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none transition-colors bg-white"
          />
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="tel"
              value={details.carerPhone || ''}
              onChange={(e) => updateDetails({ carerPhone: e.target.value })}
              placeholder="Téléphone du proche"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none transition-colors bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSeniors;
