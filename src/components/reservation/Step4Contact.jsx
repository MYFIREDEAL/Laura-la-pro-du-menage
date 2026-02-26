import React from 'react';
import { ArrowLeft, Phone, MapPin, MessageSquare, User, CheckCircle2, Sparkles, Clock, Calendar } from 'lucide-react';

/**
 * Step4Contact - Étape 4 : Coordonnées + Validation finale
 * 
 * Champs :
 * - Prénom
 * - Téléphone (obligatoire)
 * - Ville / Code postal
 * - Commentaires
 * - Bloc avantage fiscal
 * - Bouton validation
 */

const Step4Contact = ({ 
  wizardState, 
  updateDetails,
  estimate,
  onBack,
  onSubmit
}) => {
  const { details } = wizardState;

  // ═══════════════════════════════════════════════════════════════════
  // TRADUCTIONS
  // ═══════════════════════════════════════════════════════════════════

  const serviceLabels = {
    regulier: 'Ménage régulier',
    ponctuel: 'Ménage ponctuel',
    seniors: 'Accompagnement Seniors',
    airbnb: 'Airbnb & Gîtes',
    pro: 'Bureaux & Copropriétés',
    repassage: 'Repassage à domicile',
    vitres: 'Nettoyage Baie Vitrée',
    terrasse: 'Nettoyage de Terrasse'
  };

  const frequencyLabels = {
    weekly: '1 fois par semaine',
    biweekly: '1 fois toutes les 2 semaines',
    monthly: '1 fois par mois',
    once: 'Intervention unique'
  };

  // ═══════════════════════════════════════════════════════════════════
  // VALIDATION
  // ═══════════════════════════════════════════════════════════════════
  
  const isPhoneValid = details.phone && details.phone.replace(/\s/g, '').length >= 10;

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

      <h2 className="text-2xl font-black text-gray-900 mb-2">Vos coordonnées</h2>
      <p className="text-gray-600 mb-8">Pour que Laura puisse vous recontacter rapidement.</p>
      
      {/* Formulaire contact */}
      <div className="space-y-4 mb-8">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User size={14} className="inline mr-1" />
            Votre prénom
          </label>
          <input
            type="text"
            value={details.name || ''}
            onChange={(e) => updateDetails({ name: e.target.value })}
            placeholder="Ex: Marie"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone size={14} className="inline mr-1" />
            Téléphone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={details.phone || ''}
              onChange={(e) => updateDetails({ phone: e.target.value })}
              placeholder="06 12 34 56 78"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                details.phone && !isPhoneValid 
                  ? 'border-red-300 focus:border-red-400' 
                  : 'border-gray-200 focus:border-orange-400'
              }`}
            />
          </div>
          {!details.phone && (
            <p className="text-xs text-gray-500 mt-1">Laura vous rappellera pour confirmer le créneau.</p>
          )}
          {details.phone && !isPhoneValid && (
            <p className="text-xs text-red-500 mt-1">Numéro incomplet (10 chiffres minimum)</p>
          )}
        </div>

        {/* Ville / Code postal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={14} className="inline mr-1" />
            Ville ou code postal
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={details.city || ''}
              onChange={(e) => updateDetails({ city: e.target.value })}
              placeholder="Ex: 75012 Paris"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Commentaires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MessageSquare size={14} className="inline mr-1" />
            Précisions ou demandes particulières
          </label>
          <textarea
            value={details.comments || ''}
            onChange={(e) => updateDetails({ comments: e.target.value })}
            placeholder="Horaires préférés, consignes particulières..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Bloc avantage fiscal */}
      {estimate.isEligible50 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 text-white p-2 rounded-xl text-lg">
              💳
            </div>
            <div>
              <h4 className="font-bold text-green-900">Avance immédiate de 50% incluse</h4>
              <p className="text-green-700 text-sm mt-1">
                Même si vous n'êtes pas imposable, vous ne payez que la moitié !
              </p>
              <p className="text-green-600 text-xs mt-2">
                Sous réserve d'éligibilité – Services à la Personne.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Récap sympa avant validation */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <h4 className="font-bold text-gray-900">Votre demande</h4>
        </div>
        
        <div className="space-y-3">
          {/* Service */}
          <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
              {wizardState.service === 'regulier' && '🏠'}
              {wizardState.service === 'ponctuel' && '✨'}
              {wizardState.service === 'seniors' && '❤️'}
              {wizardState.service === 'airbnb' && '🔑'}
              {wizardState.service === 'pro' && '🏢'}
              {wizardState.service === 'repassage' && '👔'}
              {wizardState.service === 'vitres' && '🪟'}
              {wizardState.service === 'terrasse' && '☀️'}
            </div>
            <div>
              <p className="text-xs text-gray-500">Service choisi</p>
              <p className="font-semibold text-gray-900">{serviceLabels[wizardState.service] || '—'}</p>
            </div>
          </div>

          {/* Fréquence + Durée */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/70 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-orange-500" />
                <p className="text-xs text-gray-500">Fréquence</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{frequencyLabels[wizardState.frequency] || '—'}</p>
            </div>
            <div className="bg-white/70 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-orange-500" />
                <p className="text-xs text-gray-500">Durée</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{wizardState.hours ? `${wizardState.hours} heures` : '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton validation */}
      <button
        onClick={onSubmit}
        disabled={!isPhoneValid}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
          isPhoneValid
            ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isPhoneValid ? '🤝 Démarrer la collaboration' : '📞 Renseignez votre téléphone'}
      </button>
      
      <p className="text-center text-gray-500 text-xs mt-4">
        Aucun paiement maintenant — Laura vous recontacte sous 24h pour planifier votre 1ère intervention.
      </p>
    </div>
  );
};

export default Step4Contact;
