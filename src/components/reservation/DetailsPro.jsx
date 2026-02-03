import React from 'react';
import { Building2, Clock, FileText, Key, CheckCircle2 } from 'lucide-react';

/**
 * DetailsPro - Détails spécifiques pour Bureaux & Copropriétés
 * 
 * Champs :
 * - Type de local (bureaux, parties communes, cabinet, commerce)
 * - Surface / nombre de pièces
 * - Horaires préférés
 * - Facturation entreprise (nom + SIRET optionnel)
 * - Accès / badges / alarme
 */

const DetailsPro = ({ details, updateDetails }) => {

  // ═══════════════════════════════════════════════════════════════════
  // DONNÉES
  // ═══════════════════════════════════════════════════════════════════
  
  const localTypes = [
    { id: 'offices', label: 'Bureaux', icon: '🏢' },
    { id: 'common', label: 'Parties communes', icon: '🏠' },
    { id: 'medical', label: 'Cabinet médical', icon: '⚕️' },
    { id: 'shop', label: 'Commerce', icon: '🏪' },
    { id: 'other', label: 'Autre', icon: '🔧' },
  ];

  const scheduleOptions = [
    { id: 'before9', label: 'Avant 9h', description: 'Avant l\'arrivée des équipes' },
    { id: 'after18', label: 'Après 18h', description: 'Après le départ des équipes' },
    { id: 'weekend', label: 'Week-end', description: 'Samedi ou dimanche' },
    { id: 'flexible', label: 'Flexible', description: 'Pendant les heures ouvrées' },
  ];

  const surfaceOptions = [
    { id: 'S', label: '< 50m²', description: 'Petit local' },
    { id: 'M', label: '50-150m²', description: 'Local moyen' },
    { id: 'L', label: '150-300m²', description: 'Grand local' },
    { id: 'XL', label: '> 300m²', description: 'Très grand' },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏢 Détails professionnel
      </h3>
      
      {/* Type de local */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Building2 size={16} className="inline mr-1" />
          Type de local
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {localTypes.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ localType: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.localType === opt.id
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <span className="text-xl block mb-1">{opt.icon}</span>
              <span className="text-xs font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Surface approximative */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          📐 Surface approximative
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {surfaceOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ surface: opt.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                details.surface === opt.id
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <span className="font-bold block">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horaires d'intervention préférés */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Clock size={16} className="inline mr-1" />
          Horaires d'intervention préférés
        </label>
        <div className="grid grid-cols-2 gap-2">
          {scheduleOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDetails({ preferredSchedule: opt.id })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                details.preferredSchedule === opt.id
                  ? 'bg-emerald-50 border-emerald-400'
                  : 'bg-white border-gray-200 hover:border-emerald-300'
              }`}
            >
              <span className={`font-semibold block ${details.preferredSchedule === opt.id ? 'text-emerald-700' : 'text-gray-700'}`}>
                {opt.label}
              </span>
              <span className="text-xs text-gray-500">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Facturation entreprise */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <FileText size={16} className="inline mr-1" />
          Facturation entreprise
        </label>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
          <p className="text-emerald-700 text-sm">
            🏢 Facture au nom de votre entreprise pour comptabilité.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={details.companyName || ''}
            onChange={(e) => updateDetails({ companyName: e.target.value })}
            placeholder="Nom de l'entreprise"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
          />
          <input
            type="text"
            value={details.siret || ''}
            onChange={(e) => updateDetails({ siret: e.target.value })}
            placeholder="SIRET (optionnel)"
            className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Accès & sécurité */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Key size={16} className="inline mr-1" />
          Accès & sécurité
        </label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'badge', label: 'Badge requis', icon: '🪪' },
              { id: 'alarm', label: 'Alarme à désactiver', icon: '🚨' },
              { id: 'keys', label: 'Clés à récupérer', icon: '🔑' },
            ].map(item => {
              const isSelected = (details.accessRequirements || []).includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const current = details.accessRequirements || [];
                    const updated = isSelected
                      ? current.filter(i => i !== item.id)
                      : [...current, item.id];
                    updateDetails({ accessRequirements: updated });
                  }}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                  {isSelected && <CheckCircle2 size={14} />}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={details.accessInstructions || ''}
            onChange={(e) => updateDetails({ accessInstructions: e.target.value })}
            placeholder="Instructions d'accès spécifiques (codes, badges, etc.)"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Note fiscale */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-amber-700 text-sm flex items-start gap-2">
          <span className="text-lg">ℹ️</span>
          <span>
            <strong>Note :</strong> Les prestations pour professionnels ne sont pas éligibles 
            à l'avance immédiate de 50% (réservée aux particuliers). 
            Vous recevrez une facture classique.
          </span>
        </p>
      </div>
    </div>
  );
};

export default DetailsPro;
