/**
 * Données SEO locales par ville.
 * 
 * Pour ajouter une nouvelle ville :
 * 1. Copier un bloc existant
 * 2. Modifier le slug (clé de l'objet) et toutes les données
 * 3. Ajouter l'URL dans public/sitemap.xml
 * 4. Commit & push → Vercel déploie automatiquement
 */

const cityData = {
  'mont-de-marsan': {
    name: 'Mont-de-Marsan',
    slug: 'mont-de-marsan',
    department: 'Landes (40)',
    departmentCode: '40',
    region: 'Nouvelle-Aquitaine',
    postalCode: '40000',
    metaTitle: 'Femme de ménage à Mont-de-Marsan | Laura la Pro du Ménage',
    metaDescription: 'Service de ménage à domicile à Mont-de-Marsan et dans les Landes. Femme de ménage, aide seniors, repassage, Airbnb. Crédit d\'impôt 50%. Devis gratuit.',
    heroTitle: 'Votre femme de ménage de confiance à Mont-de-Marsan',
    heroSubtitle: 'Services de ménage à domicile, aide aux seniors, repassage et bien plus dans tout Mont-de-Marsan et ses environs.',
    introText: `Vous cherchez une femme de ménage fiable et professionnelle à Mont-de-Marsan ? Laura la Pro du Ménage intervient dans toute la préfecture des Landes pour vous offrir un intérieur impeccable, un accompagnement bienveillant pour vos aînés et des services sur mesure adaptés à votre quotidien. Que vous habitiez le centre-ville, le quartier Saint-Médard, Nonères ou les alentours, notre équipe d'intervenantes qualifiées se déplace chez vous avec le sourire et le souci du détail.`,
    whyChooseUs: [
      {
        title: 'Des intervenantes locales et de confiance',
        text: 'Nos femmes de ménage habitent Mont-de-Marsan et connaissent parfaitement la ville. Elles sont rigoureusement sélectionnées, formées et accompagnées pour vous garantir un service irréprochable à chaque passage.'
      },
      {
        title: 'Crédit d\'impôt immédiat de 50%',
        text: 'En tant que service à la personne, nos prestations de ménage à domicile à Mont-de-Marsan ouvrent droit à un crédit d\'impôt de 50%. Concrètement, une heure à 29€ ne vous coûte que 14,50€. L\'avance immédiate est possible via l\'URSSAF.'
      },
      {
        title: 'Flexibilité totale, sans engagement',
        text: 'Besoin d\'un ménage hebdomadaire, bimensuel ou d\'un grand nettoyage ponctuel avant un événement ? Nous nous adaptons à vos besoins et à votre emploi du temps, sans engagement longue durée.'
      },
      {
        title: 'Un devis gratuit en 2 minutes',
        text: 'Notre calculateur de prix en ligne vous donne une estimation immédiate et transparente. Pas de surprise, pas de frais cachés : vous savez exactement ce que vous payez avant de réserver.'
      }
    ],
    services: [
      {
        name: 'Ménage régulier à domicile',
        description: 'Un intérieur toujours propre grâce à un passage hebdomadaire ou bimensuel. Cuisine, salles de bain, sols, poussières… on s\'occupe de tout pour que vous profitiez de votre temps libre à Mont-de-Marsan.',
        icon: '🏠'
      },
      {
        name: 'Ménage ponctuel & grand nettoyage',
        description: 'Déménagement, ménage de printemps ou remise en état après travaux : notre équipe intervient pour un nettoyage en profondeur de votre logement montois, du studio au grand pavillon.',
        icon: '✨'
      },
      {
        name: 'Aide ménagère pour seniors',
        description: 'Nous accompagnons les personnes âgées de Mont-de-Marsan avec bienveillance : ménage adapté, aide au quotidien et présence rassurante. Éligible au crédit d\'impôt et aux aides APA.',
        icon: '👴'
      },
      {
        name: 'Repassage à domicile',
        description: 'Chemises, draps, linge de maison… notre service de repassage professionnel à Mont-de-Marsan vous libère d\'une corvée chronophage. Résultat impeccable garanti.',
        icon: '👔'
      },
      {
        name: 'Ménage Airbnb & locations saisonnières',
        description: 'Vous louez un bien à Mont-de-Marsan ou dans les Landes ? Nous assurons le ménage entre chaque voyageur : draps, serviettes, nettoyage complet pour des avis 5 étoiles.',
        icon: '🏡'
      },
      {
        name: 'Nettoyage de terrasses',
        description: 'Terrasse en bois, dalles ou carrelage : nous redonons un coup de neuf à vos espaces extérieurs à Mont-de-Marsan grâce à un nettoyage professionnel adapté.',
        icon: '🌿'
      }
    ],
    nearbyAreas: [
      'Saint-Pierre-du-Mont',
      'Aire-sur-l\'Adour',
      'Villeneuve-de-Marsan',
      'Grenade-sur-l\'Adour',
      'Roquefort',
      'Hagetmau',
      'Mugron',
      'Tartas',
      'Dax',
      'Biscarrosse'
    ],
    faq: [
      {
        question: 'Combien coûte une femme de ménage à Mont-de-Marsan ?',
        answer: 'Nos tarifs commencent à 29€/heure pour un ménage régulier. Grâce au crédit d\'impôt de 50%, le coût réel est de seulement 14,50€/heure. Pour un ménage ponctuel, le tarif est de 34€/heure (17€ après crédit d\'impôt). Utilisez notre calculateur pour un devis personnalisé gratuit.'
      },
      {
        question: 'Dans quels quartiers de Mont-de-Marsan intervenez-vous ?',
        answer: 'Nous intervenons dans tout Mont-de-Marsan : centre-ville, Saint-Médard, Nonères, Le Peyrouat, Bas de la Cale, Saint-Jean-d\'Août, ainsi que dans les communes limitrophes comme Saint-Pierre-du-Mont, Bretagne-de-Marsan et Mazerolles.'
      },
      {
        question: 'Est-ce que je bénéficie du crédit d\'impôt à Mont-de-Marsan ?',
        answer: 'Oui ! Comme partout en France, nos services de ménage à domicile à Mont-de-Marsan ouvrent droit au crédit d\'impôt de 50% (article 199 sexdecies du CGI). Cela concerne le ménage régulier, ponctuel, l\'aide seniors et le repassage. Vous pouvez bénéficier de l\'avance immédiate URSSAF.'
      },
      {
        question: 'Comment réserver un ménage à Mont-de-Marsan ?',
        answer: 'C\'est simple et rapide ! Utilisez notre calculateur de prix en ligne pour obtenir un devis gratuit en 2 minutes. Choisissez votre service, la fréquence et la durée souhaitée, puis laissez-nous vos coordonnées. Nous vous recontactons rapidement pour organiser la première intervention.'
      },
      {
        question: 'Vos femmes de ménage sont-elles assurées ?',
        answer: 'Absolument. Toutes nos intervenantes à Mont-de-Marsan sont des auto-entrepreneuses déclarées, assurées en responsabilité civile professionnelle. Vous bénéficiez d\'un service en toute sérénité.'
      }
    ],
    // JSON-LD LocalBusiness
    jsonLd: {
      addressLocality: 'Mont-de-Marsan',
      addressRegion: 'Nouvelle-Aquitaine',
      postalCode: '40000',
      addressCountry: 'FR'
    }
  }
};

/**
 * Récupérer les données d'une ville par son slug
 * @param {string} slug - Ex: 'mont-de-marsan'
 * @returns {object|null} - Les données de la ville ou null si non trouvée
 */
export const getCityBySlug = (slug) => {
  return cityData[slug] || null;
};

/**
 * Récupérer la liste de tous les slugs disponibles
 * @returns {string[]} - Ex: ['mont-de-marsan']
 */
export const getAllCitySlugs = () => {
  return Object.keys(cityData);
};

export default cityData;
