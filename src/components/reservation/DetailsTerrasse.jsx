import React from 'react';

/**
 * DetailsTerrasse - Détails spécifiques pour le nettoyage de terrasse
 * 
 * Champs :
 * - Info bon à savoir (matériel, point d'eau)
 * 
 * Note : Surface, état et saturateur déjà renseignés à l'étape 2
 * Note : Accès à la terrasse déplacé en Step 4 (Coordonnées)
 * Note : Pas d'option produits — Laura apporte tout le matériel
 */

const DetailsTerrasse = ({ details, updateDetails, options, toggleOption }) => {

  return (
    <div className="mb-8">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        ☀️ Détails nettoyage terrasse
      </h3>

      {/* Info terrasse */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-amber-700 text-sm">
          💡 <strong>Bon à savoir :</strong> Laura apporte tout le matériel nécessaire (nettoyeur haute pression, 
          produits anti-mousse). Assurez-vous simplement qu'un point d'eau extérieur est accessible.
        </p>
      </div>

      {/* Info sur les détails déjà renseignés */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="text-green-700 text-sm">
          ✅ <strong>Tout est bon !</strong> La surface, l'état de la terrasse et l'option saturateur 
          ont déjà été configurés à l'étape précédente. Vous pouvez continuer.
        </p>
      </div>
    </div>
  );
};

export default DetailsTerrasse;
