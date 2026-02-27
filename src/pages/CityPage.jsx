import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Heart, Phone, MapPin, CheckCircle2, Star, ChevronRight, ArrowLeft } from 'lucide-react';
import { getCityBySlug } from '../data/cityData';

const CityPage = () => {
  const { slug } = useParams();
  const city = getCityBySlug(slug);

  // 404 — ville non trouvée
  if (!city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Page introuvable</h1>
        <p className="text-gray-600 mb-8">Cette ville n'est pas encore disponible.</p>
        <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  // JSON-LD LocalBusiness spécifique à la ville
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Laura la Pro du Ménage — ${city.name}`,
    "description": city.metaDescription,
    "url": `https://lauralaprodumenage.fr/ville/${city.slug}`,
    "telephone": "",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, CESU",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.jsonLd.addressLocality,
      "addressRegion": city.jsonLd.addressRegion,
      "postalCode": city.jsonLd.postalCode,
      "addressCountry": city.jsonLd.addressCountry
    },
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "serviceType": [
      "Ménage à domicile",
      "Aide aux seniors",
      "Repassage à domicile",
      "Nettoyage de vitres",
      "Nettoyage de terrasses",
      "Ménage Airbnb"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services de ménage à ${city.name}`,
      "itemListElement": city.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    }
  };

  // JSON-LD FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": city.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://lauralaprodumenage.fr/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Ménage à ${city.name}`,
        "item": `https://lauralaprodumenage.fr/ville/${city.slug}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{city.metaTitle}</title>
        <meta name="description" content={city.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://lauralaprodumenage.fr/ville/${city.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={city.metaTitle} />
        <meta property="og:description" content={city.metaDescription} />
        <meta property="og:url" content={`https://lauralaprodumenage.fr/ville/${city.slug}`} />
        <meta property="og:site_name" content="Laura la Pro du Ménage" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={city.metaTitle} />
        <meta name="twitter:description" content={city.metaDescription} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-gray-900">

        {/* ─── HEADER SIMPLIFIÉ ─── */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white p-1.5 rounded-lg shadow-md transform hover:rotate-6 transition-transform">
                <Heart fill="currentColor" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 leading-none uppercase">Laura</span>
                <span className="text-[8px] text-gray-500 tracking-widest uppercase">la pro du ménage</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden md:flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
              >
                <ArrowLeft size={16} />
                Accueil
              </Link>
              <a
                href="https://lauralaprodumenage.fr/#reserver"
                className="px-5 py-2.5 rounded-full font-bold bg-red-600 text-white hover:bg-red-700 transition-all transform hover:scale-105 shadow-md text-sm"
              >
                Calculer mon prix
              </a>
            </div>
          </div>
        </nav>

        {/* ─── BREADCRUMB ─── */}
        <div className="max-w-5xl mx-auto px-6 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-red-600 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">Ménage à {city.name}</span>
          </nav>
        </div>

        {/* ─── HERO / H1 ─── */}
        <section className="max-w-5xl mx-auto px-6 pt-8 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <MapPin size={16} />
              {city.name} — {city.department}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              {city.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {city.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://lauralaprodumenage.fr/#reserver"
                className="px-8 py-4 rounded-full font-bold bg-red-600 text-white hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg text-lg flex items-center gap-2"
              >
                Calculer mon prix gratuit
                <ChevronRight size={20} />
              </a>
              <a
                href="tel:"
                className="px-8 py-4 rounded-full font-bold bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200 transition-all text-lg flex items-center gap-2"
              >
                <Phone size={20} />
                Nous appeler
              </a>
            </div>
          </div>
        </section>

        {/* ─── INTRO LOCALE ─── */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {city.introText}
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-red-600">29€</div>
                <div className="text-sm text-gray-500 mt-1">par heure</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-green-600">-50%</div>
                <div className="text-sm text-gray-500 mt-1">crédit d'impôt</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-orange-600">14,50€</div>
                <div className="text-sm text-gray-500 mt-1">coût réel / heure</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-blue-600">2 min</div>
                <div className="text-sm text-gray-500 mt-1">pour un devis</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── H2 : NOS SERVICES ─── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Nos services de ménage à {city.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des prestations adaptées à tous les besoins des habitants de {city.name} et de ses environs.
              </p>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.services.map((service, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── H2 : POURQUOI NOUS CHOISIR ─── */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Pourquoi choisir Laura la Pro du Ménage à {city.name} ?
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {city.whyChooseUs.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={22} className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── H2 : ZONES D'INTERVENTION ─── */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Zones d'intervention autour de {city.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nous intervenons à {city.name} et dans les communes voisines des {city.department}.
              </p>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold shadow-md">
                <MapPin size={16} className="inline mr-1 -mt-0.5" />
                {city.name}
              </div>
              {city.nearbyAreas.map((area, index) => (
                <div key={index} className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full font-medium hover:border-red-300 hover:text-red-600 transition-colors">
                  {area}
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Vous habitez une autre commune des {city.department} ? Contactez-nous pour vérifier notre disponibilité dans votre secteur.
            </p>
          </div>
        </section>

        {/* ─── H2 : FAQ LOCALE ─── */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Questions fréquentes — Ménage à {city.name}
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {city.faq.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-black text-sm">
                      {index + 1}
                    </span>
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-11">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Prêt(e) pour un intérieur impeccable à {city.name} ?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Obtenez votre devis gratuit en 2 minutes. Nos intervenantes de {city.name} sont prêtes à prendre soin de votre intérieur.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://lauralaprodumenage.fr/#reserver"
                  className="px-8 py-4 rounded-full font-bold bg-white text-red-600 hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg flex items-center gap-2"
                >
                  <Star size={20} />
                  Calculer mon prix gratuit
                </a>
              </div>
              <p className="text-white/70 text-sm mt-6">
                Crédit d'impôt 50% • Sans engagement • Devis immédiat
              </p>
            </div>
          </div>
        </section>

        {/* ─── FOOTER SIMPLIFIÉ ─── */}
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white p-1.5 rounded-lg">
                  <Heart fill="currentColor" size={18} />
                </div>
                <span className="font-black uppercase">Laura la Pro du Ménage</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
                <a href="https://lauralaprodumenage.fr/#reserver" className="hover:text-white transition-colors">Réserver</a>
                <a href="https://lauralaprodumenage.fr/#fiscal" className="hover:text-white transition-colors">Crédit d'impôt</a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-xs">
              © {new Date().getFullYear()} Laura la Pro du Ménage — Services de ménage à {city.name} et dans les {city.department}. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CityPage;
