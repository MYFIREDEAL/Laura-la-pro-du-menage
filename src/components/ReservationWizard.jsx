import React, { useState } from 'react';
import { 
  Home, Users, Calendar, Building2, Key, Sparkles,
  Clock, CheckCircle2, ChevronRight, Heart,
  ArrowLeft, X, Phone, PartyPopper, Loader2
} from 'lucide-react';
import Step3Details from './reservation/Step3Details';
import Step4Contact from './reservation/Step4Contact';
import { saveDemande } from '../lib/demandesStorage';

/**
 * ReservationWizard - Wizard de réservation en 4 étapes
 * 
 * Structure :
 * - Étape 1 : Choix du service
 * - Étape 2 : Fréquence + Durée  
 * - Étape 3 : Détails (modulaire selon service) via Step3Details
 * - Étape 4 : Coordonnées + Validation via Step4Contact
 */

const ReservationWizard = ({ onBack, onNavigate, initialService = null }) => {
  // ═══════════════════════════════════════════════════════════════════
  // STATE PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════
  const [wizardState, setWizardState] = useState({
    step: initialService ? 2 : 1,  // Si service pré-sélectionné, on démarre à l'étape 2
    service: initialService,       // 'regulier' | 'ponctuel' | 'seniors' | 'airbnb' | 'pro'
    frequency: null,      // 'weekly' | 'biweekly' | 'monthly' | 'once'
    hours: null,          // 2 | 2.5 | 3 | 4
    options: {
      ironing: false,     // Repassage
      products: false,    // Produits fournis
      windows: false,     // Vitres
      shopping: false     // Courses (seniors)
    },
    details: {
      // Contact commun
      name: '',
      phone: '',
      city: '',
      comments: '',
      // Champs spécifiques selon service (ajoutés dynamiquement)
    }
  });

  // State pour la popup de confirmation
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // State pour gérer les transitions fluides
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ═══════════════════════════════════════════════════════════════════
  // DONNÉES STATIQUES
  // ═══════════════════════════════════════════════════════════════════
  
  const services = [
    { 
      id: 'regulier', 
      label: 'Ménage régulier', 
      description: 'Entretien hebdomadaire ou bimensuel',
      icon: Home, 
      color: 'orange',
      eligible50: true 
    },
    { 
      id: 'ponctuel', 
      label: 'Ménage ponctuel', 
      description: 'Intervention unique ou occasionnelle',
      icon: Sparkles, 
      color: 'orange',
      eligible50: true 
    },
    { 
      id: 'seniors', 
      label: 'Accompagnement Seniors', 
      description: 'Aide à domicile bienveillante',
      icon: Heart, 
      color: 'red',
      eligible50: true 
    },
    { 
      id: 'airbnb', 
      label: 'Airbnb & Gîtes', 
      description: 'Ménage entre deux locations',
      icon: Key, 
      color: 'blue',
      eligible50: true 
    },
    { 
      id: 'pro', 
      label: 'Bureaux & Copropriétés', 
      description: 'Entretien des espaces professionnels',
      icon: Building2, 
      color: 'emerald',
      eligible50: false  // Pro = pas d'avance immédiate
    },
  ];

  const frequencies = [
    { id: 'weekly', label: '1 fois / semaine', recommended: true, multiplier: 4.33 },
    { id: 'biweekly', label: '1 fois / 2 semaines', recommended: false, multiplier: 2.165 },
    { id: 'monthly', label: '1 fois / mois', recommended: false, multiplier: 1 },
    { id: 'once', label: 'Ponctuel (1 seule fois)', recommended: false, multiplier: 1 },
  ];

  const durations = [
    { id: 2, label: '2h', recommended: false },
    { id: 2.5, label: '2h30', recommended: true },
    { id: 3, label: '3h', recommended: false },
    { id: 4, label: '4h+', recommended: false },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════

  const updateState = (updates) => {
    // Si changement d'étape, ajouter une transition fluide
    if (updates.step) {
      setIsTransitioning(true);
      
      // Petit délai pour l'animation de sortie
      setTimeout(() => {
        setWizardState(prev => ({ ...prev, ...updates }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Fin de la transition après l'animation d'entrée
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    } else {
      setWizardState(prev => ({ ...prev, ...updates }));
    }
  };

  const updateDetails = (updates) => {
    setWizardState(prev => ({
      ...prev,
      details: { ...prev.details, ...updates }
    }));
  };

  const toggleOption = (optionId) => {
    setWizardState(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [optionId]: !prev.options[optionId]
      }
    }));
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      orange: {
        bg: isSelected ? 'bg-orange-500' : 'bg-orange-50',
        border: isSelected ? 'border-orange-500' : 'border-orange-200',
        text: isSelected ? 'text-white' : 'text-orange-600',
        icon: isSelected ? 'text-white' : 'text-orange-500',
      },
      red: {
        bg: isSelected ? 'bg-red-500' : 'bg-red-50',
        border: isSelected ? 'border-red-500' : 'border-red-200',
        text: isSelected ? 'text-white' : 'text-red-600',
        icon: isSelected ? 'text-white' : 'text-red-500',
      },
      blue: {
        bg: isSelected ? 'bg-blue-500' : 'bg-blue-50',
        border: isSelected ? 'border-blue-500' : 'border-blue-200',
        text: isSelected ? 'text-white' : 'text-blue-600',
        icon: isSelected ? 'text-white' : 'text-blue-500',
      },
      emerald: {
        bg: isSelected ? 'bg-emerald-500' : 'bg-emerald-50',
        border: isSelected ? 'border-emerald-500' : 'border-emerald-200',
        text: isSelected ? 'text-white' : 'text-emerald-600',
        icon: isSelected ? 'text-white' : 'text-emerald-500',
      },
    };
    return colors[color] || colors.orange;
  };

  const selectedService = services.find(s => s.id === wizardState.service);
  const selectedFrequency = frequencies.find(f => f.id === wizardState.frequency);
  const selectedDuration = durations.find(d => d.id === wizardState.hours);

  // ═══════════════════════════════════════════════════════════════════
  // CALCUL PRIX (placeholder - à remplacer par calculatePrice.js)
  // ═══════════════════════════════════════════════════════════════════
  
  const calculateEstimate = () => {
    // TODO: Remplacer par import depuis pricingConfig.js
    const baseRate = 25; // €/h placeholder
    
    if (!wizardState.hours || !wizardState.frequency) {
      return { subtotal: 0, promo: 0, afterPromo: 0, finalPrice: 0 };
    }

    const hours = wizardState.hours;
    const freq = selectedFrequency?.multiplier || 1;
    
    // Calcul options
    let optionsExtra = 0;
    if (wizardState.options.ironing) optionsExtra += 2 * hours;
    if (wizardState.options.products) optionsExtra += 3;
    if (wizardState.options.windows) optionsExtra += 5;

    const subtotal = (baseRate * hours * freq) + optionsExtra;
    
    // Promo selon service :
    // - Airbnb & Pro : seulement 30% le 1er mois (pas de 1ère heure offerte)
    // - Autres (régulier, ponctuel, seniors) : 1ère heure offerte + 30%
    const isProOrAirbnb = wizardState.service === 'airbnb' || wizardState.service === 'pro';
    const promoFirstHour = isProOrAirbnb ? 0 : baseRate; // 1h offerte uniquement pour particuliers
    const promoPercent = subtotal * 0.30;
    const promo = promoFirstHour + promoPercent;
    
    const afterPromo = Math.max(0, subtotal - promo);
    
    // Avance immédiate 50% (si éligible)
    // - Pro : jamais éligible
    // - Airbnb avec résidence secondaire : pas éligible
    // - Autres : éligible
    let isEligible50 = selectedService?.eligible50 !== false;
    
    // Cas spécial Airbnb : dépend du type de résidence
    if (wizardState.service === 'airbnb' && wizardState.details.residenceType === 'secondaire') {
      isEligible50 = false;
    }
    
    const finalPrice = isEligible50 ? afterPromo * 0.5 : afterPromo;

    return { subtotal, promo, afterPromo, finalPrice, isEligible50, isProOrAirbnb };
  };

  const estimate = calculateEstimate();

  // ═══════════════════════════════════════════════════════════════════
  // VALIDATION
  // ═══════════════════════════════════════════════════════════════════

  const canProceedToStep2 = wizardState.service !== null;
  const canProceedToStep3 = wizardState.frequency !== null && wizardState.hours !== null;
  const canProceedToStep4 = true; // Step3 détails toujours facultatifs
  const canSubmit = wizardState.details.phone && wizardState.details.phone.replace(/\s/g, '').length >= 10;

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  const handleSubmit = async () => {
    setIsSending(true);
    setSendError(null);
    
    try {
      // Sauvegarder la demande localement (+ envoi CRM si configuré)
      const saveResult = saveDemande(wizardState);
      
      if (!saveResult.success) {
        throw new Error('Erreur de sauvegarde');
      }
      
      console.log('✅ Demande sauvegardée:', saveResult.id);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Erreur:', error);
      setSendError('Impossible d\'envoyer la demande. Veuillez réessayer.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Retour à l'accueil
    if (onNavigate) onNavigate('accueil');
  };

  // ═══════════════════════════════════════════════════════════════════
  // POPUP DE SUCCÈS
  // ═══════════════════════════════════════════════════════════════════

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={handleCloseModal}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 fade-in duration-300">
          {/* Bouton fermer */}
          <button 
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Icône succès */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-4xl">🎉</span>
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">
            Demande envoyée !
          </h2>
          
          {/* Message principal */}
          <p className="text-gray-600 text-center mb-6">
            Laura vous recontacte dans les <span className="font-bold text-orange-600">24h</span> pour planifier votre première intervention.
          </p>

          {/* Récap */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{wizardState.details.name || 'Vous'}</p>
                <p className="text-sm text-orange-600">{wizardState.details.phone}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 {wizardState.details.city || 'Ville à confirmer'}</p>
              <p>🧹 {selectedService?.label || wizardState.service}</p>
              <p>📅 {selectedFrequency?.label || wizardState.frequency}</p>
            </div>
          </div>

          {/* Ce qui va se passer */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <p className="font-bold text-green-800 mb-2">✨ Prochaines étapes</p>
            <ol className="text-sm text-green-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>Laura vous appelle pour confirmer le créneau</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>{estimate.isProOrAirbnb ? '1ère intervention avec -30%' : '1ère heure d\'essai'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>Paiement pour valider la collaboration</span>
              </li>
            </ol>
          </div>

          {/* Bouton retour accueil */}
          <button
            onClick={handleCloseModal}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Retour à l'accueil
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            Merci pour votre confiance ! 💚
          </p>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // COMPOSANTS UI INTERNES
  // ═══════════════════════════════════════════════════════════════════

  // Indicateur de progression (4 étapes) - CLIQUABLE sur étapes passées
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <button 
            onClick={() => {
              // Naviguer uniquement vers les étapes passées
              if (step < wizardState.step) {
                updateState({ step });
              }
            }}
            disabled={step >= wizardState.step}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              wizardState.step === step 
                ? 'bg-orange-500 text-white scale-110 cursor-default' 
                : wizardState.step > step 
                  ? 'bg-green-500 text-white cursor-pointer hover:scale-110 hover:bg-green-600 active:scale-95' 
                  : 'bg-gray-200 text-gray-500 cursor-default'
            }`}
          >
            {wizardState.step > step ? <CheckCircle2 size={20} /> : step}
          </button>
          {step < 4 && (
            <div className={`w-8 md:w-12 h-1 rounded-full transition-colors duration-300 ${
              wizardState.step > step ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Carte de service cliquable
  const ServiceCard = ({ service }) => {
    const isSelected = wizardState.service === service.id;
    const colors = getColorClasses(service.color, isSelected);
    const Icon = service.icon;
    
    return (
      <button
        onClick={() => {
          updateState({ service: service.id });
          // Auto-avance vers étape 2 après sélection
          setTimeout(() => updateState({ step: 2 }), 200);
        }}
        className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${colors.border} ${colors.bg}`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : `bg-${service.color}-100`}`}>
            <Icon size={24} className={colors.icon} />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {service.label}
            </h3>
            <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
              {service.description}
            </p>
            {service.eligible50 && (
              <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                ✓ Éligible -50%
              </span>
            )}
          </div>
          <ChevronRight size={20} className={isSelected ? 'text-white' : 'text-gray-400'} />
        </div>
      </button>
    );
  };

  // Bouton de choix (fréquence / durée)
  const ChoiceButton = ({ item, isSelected, onClick, type }) => (
    <button
      onClick={onClick}
      className={`relative px-6 py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 ${
        isSelected 
          ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-md' 
          : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
      }`}
    >
      {item.label}
      {item.recommended && (
        <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
        }`}>
          ⭐ Recommandé
        </span>
      )}
    </button>
  );

  // ═══════════════════════════════════════════════════════════════════
  // RÉCAP LATÉRAL (sticky)
  // ═══════════════════════════════════════════════════════════════════
  
  const RecapSidebar = () => {
    const { details } = wizardState;
    
    // Génère un résumé des détails spécifiques selon le service
    const renderServiceDetails = () => {
      if (wizardState.step < 3) return null;
      
      const detailItems = [];
      
      // Contact
      if (details.name) detailItems.push({ label: 'Contact', value: details.name });
      if (details.city) detailItems.push({ label: 'Ville', value: details.city });
      
      // Détails spécifiques
      switch (wizardState.service) {
        case 'regulier':
        case 'ponctuel':
          if (details.surface) detailItems.push({ label: 'Surface', value: details.surface });
          break;
        case 'seniors':
          if (details.additionalServices?.length > 0) {
            detailItems.push({ label: 'Services+', value: details.additionalServices.length + ' option(s)' });
          }
          if (details.carerName) detailItems.push({ label: 'Aidant', value: details.carerName });
          break;
        case 'airbnb':
          if (details.keyAccess) detailItems.push({ label: 'Accès', value: details.keyAccess });
          if (details.linenOption) detailItems.push({ label: 'Linge', value: details.linenOption });
          break;
        case 'pro':
          if (details.localType) detailItems.push({ label: 'Type', value: details.localType });
          if (details.companyName) detailItems.push({ label: 'Société', value: details.companyName });
          break;
      }
      
      if (detailItems.length === 0) return null;
      
      return (
        <div className="pt-2 border-t border-gray-100 mt-2">
          <span className="text-gray-600 text-sm">Détails :</span>
          <div className="space-y-1 mt-1">
            {detailItems.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-500">{item.label}</span>
                <span className="text-gray-700 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-24">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Votre récapitulatif</h3>
      
      {/* Service sélectionné */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service</span>
          <span className="font-semibold text-gray-900">
            {selectedService?.label || '—'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Fréquence</span>
          <span className="font-semibold text-gray-900">
            {selectedFrequency?.label || '—'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Durée</span>
          <span className="font-semibold text-gray-900">
            {selectedDuration?.label || '—'}
          </span>
        </div>
        
        {/* Options actives */}
        {Object.entries(wizardState.options).some(([, v]) => v) && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-gray-600 text-sm">Options :</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {wizardState.options.ironing && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Repassage</span>}
              {wizardState.options.products && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Produits</span>}
              {wizardState.options.windows && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Vitres</span>}
            </div>
          </div>
        )}
        
        {/* Détails spécifiques selon service */}
        {renderServiceDetails()}
      </div>

      {/* Calcul prix */}
      {(wizardState.hours && wizardState.frequency) && (
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sous-total / mois</span>
            <span className="text-gray-900">{estimate.subtotal.toFixed(2)} €</span>
          </div>
          
          {/* Promo */}
          <div className="flex justify-between text-sm text-green-600">
            <span>🎁 Offre d'essai</span>
            <span>-{estimate.promo.toFixed(2)} €</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Après promo</span>
            <span className="text-gray-900">{estimate.afterPromo.toFixed(2)} €</span>
          </div>
          
          {/* Avance immédiate */}
          {estimate.isEligible50 && (
            <div className="flex justify-between text-sm text-blue-600">
              <span>💳 Avance immédiate 50%</span>
              <span>-{(estimate.afterPromo * 0.5).toFixed(2)} €</span>
            </div>
          )}
          
          <div className="pt-3 mt-3 border-t-2 border-orange-100">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-gray-500 block">Estimation mensuelle</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-red-600">
                    {estimate.finalPrice.toFixed(2)} €
                  </span>
                  <span className="text-sm font-medium text-gray-500">/ mois</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              {estimate.isProOrAirbnb 
                ? '✨ -30% le 1er mois, puis paiement CB ou prélèvement'
                : '✨ 1ère heure d\'essai, puis paiement CB ou prélèvement'
              }
            </p>
          </div>
        </div>
      )}

      {/* Promo banner */}
      <div className="mt-6 bg-gradient-to-r from-orange-100 to-amber-50 border border-orange-200 text-orange-800 p-4 rounded-2xl">
        <p className="font-bold text-sm">🎁 Offre de bienvenue</p>
        <p className="text-xs mt-1 text-orange-700">
          {estimate.isProOrAirbnb 
            ? '-30% le 1er mois'
            : '1ère heure offerte + 30% le 1er mois'
          }
        </p>
        <p className="text-[10px] mt-2 text-orange-600">Valable jusqu'au 14 février 2026</p>
      </div>
    </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // ÉTAPES DU WIZARD
  // ═══════════════════════════════════════════════════════════════════

  const Step1_Besoin = () => (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">De quoi avez-vous besoin ?</h2>
      <p className="text-gray-600 mb-8">Choisissez le type de service qui vous correspond.</p>
      
      <div className="space-y-4">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );

  const Step2_FrequenceDuree = () => (
    <div>
      <button 
        onClick={() => updateState({ step: 1 })}
        className="flex items-center gap-2 px-4 py-3 md:px-3 md:py-2 rounded-xl bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 mb-6 transition-all active:scale-95 touch-manipulation"
      >
        <ArrowLeft size={20} className="md:w-[18px] md:h-[18px]" /> 
        <span className="font-medium">Retour</span>
      </button>

      <h2 className="text-2xl font-black text-gray-900 mb-2">À quelle fréquence et combien de temps ?</h2>
      <p className="text-gray-600 mb-8">Adaptez l'intervention à votre rythme de vie.</p>
      
      {/* Fréquence */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-orange-500" />
          Fréquence
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {frequencies.map(freq => (
            <ChoiceButton 
              key={freq.id}
              item={freq}
              isSelected={wizardState.frequency === freq.id}
              onClick={() => updateState({ frequency: freq.id })}
              type="frequency"
            />
          ))}
        </div>
      </div>

      {/* Durée */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-orange-500" />
          Durée de l'intervention
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {durations.map(dur => (
            <ChoiceButton 
              key={dur.id}
              item={dur}
              isSelected={wizardState.hours === dur.id}
              onClick={() => updateState({ hours: dur.id })}
              type="duration"
            />
          ))}
        </div>
      </div>

      {/* Message rassurant */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8">
        <p className="text-orange-700 text-sm flex items-center gap-2">
          <Heart size={16} fill="currentColor" />
          Vous pourrez ajuster avec Laura si nécessaire.
        </p>
      </div>

      {/* Bouton continuer */}
      <button
        onClick={() => canProceedToStep3 && updateState({ step: 3 })}
        disabled={!canProceedToStep3}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
          canProceedToStep3 
            ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Continuer
      </button>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // RENDER PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 py-8 px-4 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Réservez votre intervention
          </h1>
          <p className="text-gray-600">
            {estimate.isProOrAirbnb 
              ? <>🎁 <span className="font-semibold text-orange-600">-30%</span> le 1er mois</>
              : <>🎁 <span className="font-semibold text-orange-600">1ère heure offerte</span> + 30% le 1er mois</>
            }
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <StepIndicator />

        {/* Layout principal : 2 colonnes sur desktop */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Colonne gauche : Étapes */}
          <div className="lg:col-span-2">
            <div className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {wizardState.step === 1 && <Step1_Besoin />}
              {wizardState.step === 2 && <Step2_FrequenceDuree />}
              {wizardState.step === 3 && (
                <Step3Details
                  wizardState={wizardState}
                  updateState={updateState}
                  updateDetails={updateDetails}
                  toggleOption={toggleOption}
                  onBack={() => updateState({ step: 2 })}
                  onNext={() => updateState({ step: 4 })}
                />
              )}
              {wizardState.step === 4 && (
                <Step4Contact
                  wizardState={wizardState}
                  updateDetails={updateDetails}
                  estimate={estimate}
                  onBack={() => updateState({ step: 3 })}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>

          {/* Colonne droite : Récap (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:block">
            <RecapSidebar />
          </div>
        </div>

        {/* Erreur d'envoi */}
        {sendError && (
          <div className="lg:hidden fixed bottom-20 left-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm z-50">
            ⚠️ {sendError}
          </div>
        )}

        {/* Mobile sticky bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <span className="text-xs text-gray-500 block">Estimation mensuelle</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-red-600">
                  {estimate.finalPrice > 0 ? `${estimate.finalPrice.toFixed(2)} €` : '— €'}
                </span>
                {estimate.finalPrice > 0 && <span className="text-xs text-gray-500">/ mois</span>}
              </div>
              <span className="text-[9px] text-gray-400">
                {estimate.isProOrAirbnb ? '-30% le 1er mois' : '1ère heure d\'essai offerte'}
              </span>
            </div>
            
            {wizardState.step === 4 ? (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isSending}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-3 rounded-full font-bold shadow-lg disabled:opacity-50 text-sm flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Envoi...
                  </>
                ) : (
                  '🤝 Démarrer'
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (wizardState.step === 1 && canProceedToStep2) updateState({ step: 2 });
                  if (wizardState.step === 2 && canProceedToStep3) updateState({ step: 3 });
                  if (wizardState.step === 3) updateState({ step: 4 });
                }}
                disabled={(wizardState.step === 1 && !canProceedToStep2) || (wizardState.step === 2 && !canProceedToStep3)}
                className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg disabled:bg-gray-300"
              >
                Continuer →
              </button>
            )}
          </div>
        </div>

        {/* Spacer pour la barre mobile */}
        <div className="h-24 lg:hidden" />
      </div>

      {/* Modal de succès */}
      <SuccessModal />
    </div>
  );
};

export default ReservationWizard;
