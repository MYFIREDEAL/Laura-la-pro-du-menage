import React from 'react';
import { ArrowLeft } from 'lucide-react';
import DetailsRegularPonctuel from './DetailsRegularPonctuel';
import DetailsSeniors from './DetailsSeniors';
import DetailsAirbnb from './DetailsAirbnb';
import DetailsPro from './DetailsPro';

/**
 * Step3Details - Étape 3 modulaire du wizard (4 étapes au total)
 * 
 * Cette étape ne contient QUE les détails spécifiques au service.
 * Les coordonnées sont déplacées en Étape 4 (Step4Contact).
 * 
 * Structure :
 * 1. Bloc spécifique - selon serviceType
 * 2. Bouton "Continuer" vers Étape 4
 */

const Step3Details = ({ 
  wizardState, 
  updateState, 
  updateDetails,
  toggleOption,
  onBack,
  onNext // Nouvelle prop pour aller vers step 4
}) => {
  const { service, details, options } = wizardState;

  // ═══════════════════════════════════════════════════════════════════
  // BLOC SPÉCIFIQUE - Switch par service
  // ═══════════════════════════════════════════════════════════════════
  
  const renderServiceSpecificBlock = () => {
    switch (service) {
      case 'regulier':
      case 'ponctuel':
        return (
          <DetailsRegularPonctuel 
            details={details} 
            updateDetails={updateDetails}
            options={options}
            toggleOption={toggleOption}
          />
        );
      
      case 'seniors':
        return (
          <DetailsSeniors 
            details={details} 
            updateDetails={updateDetails}
            options={options}
            toggleOption={toggleOption}
          />
        );
      
      case 'airbnb':
        return (
          <DetailsAirbnb 
            details={details} 
            updateDetails={updateDetails}
          />
        );
      
      case 'pro':
        return (
          <DetailsPro 
            details={details} 
            updateDetails={updateDetails}
          />
        );
      
      default:
        return null;
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div>
      {/* Bouton retour */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-3 md:px-3 md:py-2 rounded-xl bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 mb-6 transition-all active:scale-95 touch-manipulation"
      >
        <ArrowLeft size={20} className="md:w-[18px] md:h-[18px]" /> 
        <span className="font-medium">Retour</span>
      </button>

      <h2 className="text-2xl font-black text-gray-900 mb-2">Derniers détails</h2>
      <p className="text-gray-600 mb-8">Quelques informations pour personnaliser votre intervention.</p>
      
      {/* Bloc spécifique selon service */}
      {renderServiceSpecificBlock()}

      {/* Bouton continuer vers Étape 4 */}
      <button
        onClick={onNext}
        className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        Continuer →
      </button>
    </div>
  );
};

export default Step3Details;
