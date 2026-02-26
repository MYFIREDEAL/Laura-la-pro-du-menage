import React, { useState, useEffect } from 'react';
import { 
  Heart, Home, Users, Euro, Phone, Mail, Menu, X, 
  CheckCircle2, Clock, Star, Sparkles, MapPin, 
  ShieldCheck, Calendar, ChevronRight, Coffee, Baby, Gift,
  Key, Building2, Briefcase, Wallet, Lock, Eye, EyeOff
} from 'lucide-react';
import ReservationWizard from './components/ReservationWizard';
import AdminPage from './pages/AdminPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Pour pré-sélectionner un service
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Navigation vers le wizard avec service pré-sélectionné
  const goToReservation = (service = null) => {
    setSelectedService(service);
    setCurrentPage('reserver');
  };

  // Gestion connexion admin
  const handleAdminLogin = () => {
    if (adminPassword === 'yesbaby') {
      setShowAdminModal(false);
      setAdminPassword('');
      setPasswordError(false);
      setCurrentPage('admin');
      window.location.hash = 'admin';
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  // Accès admin via URL hash (ex: /#admin)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigation = [
    { id: 'accueil', name: 'Accueil' },
    { id: 'services', name: 'Nos Services' },
    { id: 'seniors', name: 'Spécial Seniors' },
    { id: 'histoire', name: 'Notre Histoire' },
    { id: 'fiscal', name: 'Avantage -50%' }
    // { id: 'contact', name: 'Contact' } // Masqué pour l'instant
  ];

  const Button = ({ children, variant = 'primary', onClick, className = "" }) => {
    const base = "px-5 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 text-sm md:text-base";
    const variants = {
      primary: "bg-red-600 text-white hover:bg-red-700",
      secondary: "bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200"
    };
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  const SectionTitle = ({ children, subtitle }) => (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{children}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
    </div>
  );

  const PageAccueil = () => (
    <div className="animate-in fade-in duration-700">
      {/* Hero Full Width Image */}
      <section className="relative w-[95%] md:w-[85%] mx-auto">
        <img 
          src="https://ik.imagekit.io/bqla7nrgyf/unnamed-1.jpg" 
          alt="Laura souriante" 
          className="w-full rounded-2xl min-h-[280px] object-cover object-[30%_center] md:object-center" 
        />
        
        {/* Texte "Le ménage avec du cœur" - à gauche */}
        <div className="absolute top-[22%] left-[4%] md:left-[5%] max-w-[50%] md:max-w-none">
          <p className="text-[10px] md:text-sm text-orange-500 font-bold tracking-wider uppercase mb-1 md:mb-2">Services de proximité</p>
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Le ménage<br />avec <span className="text-orange-500 underline decoration-orange-500">du cœur</span>.
          </h2>
        </div>

        {/* Badge Entreprise Humaine - en haut à droite */}
        <div className="absolute top-[18%] right-[2%] md:right-[5%] animate-bounce">
          <div className="bg-white rounded-md md:rounded-xl shadow-lg px-1.5 py-1 md:px-4 md:py-3 flex items-center gap-1 md:gap-2">
            <div className="bg-orange-100 p-0.5 md:p-2 rounded-md">
              <Heart size={10} className="text-orange-500 md:w-5 md:h-5" fill="currentColor" />
            </div>
            <div>
              <p className="text-[8px] md:text-sm font-bold text-gray-900">Entreprise</p>
              <p className="text-[7px] md:text-xs text-gray-600">Humaine</p>
            </div>
          </div>
        </div>

        {/* Badge Confiance & Qualité - milieu droite (fixe) - caché sur très petit mobile */}
        <div className="absolute top-[38%] right-[2%] md:right-[3%] hidden sm:block">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg px-2 py-1.5 md:px-4 md:py-3 flex items-center gap-1.5 md:gap-2">
            <div className="bg-orange-100 p-1 md:p-2 rounded-lg">
              <ShieldCheck size={12} className="text-orange-500 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[10px] md:text-sm font-bold text-gray-900">Confiance & Qualité</p>
              <p className="text-[9px] md:text-xs text-gray-600">Laura à votre service</p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-services" className="py-16 px-6 bg-white" style={{ scrollMarginTop: '40px' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Des solutions professionnelles pour chaque aspect de votre vie.">
            Nos Univers de Service
          </SectionTitle>

          {/* Barre de navigation rapide des services */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'service-regulier', label: 'Régulier', emoji: '🏠', color: 'bg-orange-500' },
              { id: 'service-seniors', label: 'Seniors', emoji: '🧡', color: 'bg-orange-400' },
              { id: 'service-airbnb', label: 'AirBnB', emoji: '🏡', color: 'bg-blue-600' },
              { id: 'service-bureaux', label: 'Bureaux', emoji: '🏢', color: 'bg-emerald-600' },
              { id: 'service-printanier', label: 'Printanier', emoji: '🌸', color: 'bg-pink-500' },
              { id: 'service-repassage', label: 'Repassage', emoji: '👔', color: 'bg-purple-500' },
              { id: 'service-vitres', label: 'Baie Vitrée', emoji: '🪟', color: 'bg-cyan-500' },
              { id: 'service-terrasse', label: 'Terrasse', emoji: '☀️', color: 'bg-amber-500' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-bold text-sm whitespace-nowrap shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${item.color}`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div id="service-regulier" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module avec badge */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/te%CC%81le%CC%81chargement%20(1).png?updatedAt=1769989907107" 
                  alt="Famille débordée" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Étoiles de propreté animées */}
                <div className="absolute top-[3%] left-[18%] text-2xl sparkle-1">✨</div>
                <div className="absolute top-[11%] left-[30%] text-xl sparkle-2">✨</div>
                <div className="absolute bottom-[29%] left-[16%] text-lg sparkle-3">✨</div>
                {/* Badge -30% sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-red-600 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-lg md:text-2xl font-black">-30%</p>
                    <p className="text-[10px] md:text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2 italic">🧹 Ménage Régulier</h3>
                <p className="text-lg font-bold text-orange-500 mb-3">Débordé par le quotidien ?</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Entre le travail, les enfants et les activités, le ménage devient une corvée ? Retrouvez vos soirées dans une maison impeccable.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Nettoyage complet des sols</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Cuisine & sanitaires impeccables</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Dépoussiérage & rangement</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Chaque semaine ou tous les 15 jours</li>
                </ul>
                <div className="relative bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-red-600 font-bold flex items-center gap-2">
                    <Gift size={18} /> 🎁 1ère heure offerte
                  </p>
                  <p className="text-red-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('regulier')} className="w-full">Je lance mon essai</Button>
              </div>
            </div>

            <div id="service-seniors" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/te%CC%81le%CC%81chargement%20(10).png?updatedAt=1769990159607" 
                  alt="Aide aux seniors" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Étoiles de propreté animées */}
                <div className="absolute top-[3%] left-[18%] text-2xl sparkle-1">✨</div>
                <div className="absolute top-[11%] left-[30%] text-xl sparkle-2">✨</div>
                <div className="absolute bottom-[29%] left-[16%] text-lg sparkle-3">✨</div>
                {/* Badge sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-orange-500 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-lg md:text-2xl font-black">-30%</p>
                    <p className="text-[10px] md:text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2 italic">🧡 Spécial Seniors</h3>
                <p className="text-lg font-bold text-orange-500 mb-3">Prenez soin de vos parents</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Offrez-leur le soutien d'une présence rassurante qui s'occupe de leur intérieur avec douceur et respect de leur autonomie.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Ménage adapté & en douceur</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Présence humaine & écoute</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Toujours la même intervenante</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Un café partagé, un moment d'échange</li>
                </ul>
                <div className="relative bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-orange-600 font-bold flex items-center gap-2">
                    <Heart size={18} fill="currentColor" /> 🎁 1ère heure offerte
                  </p>
                  <p className="text-orange-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('seniors')} className="w-full !bg-orange-500 hover:!bg-orange-600">Je réserve pour mes parents</Button>
              </div>
            </div>

            <div id="service-airbnb" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/te%CC%81le%CC%81chargement%20(11).png?updatedAt=1769990512574" 
                  alt="AirBnB & Gîtes" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Étoiles de propreté animées */}
                <div className="absolute top-[3%] left-[18%] text-2xl sparkle-1">✨</div>
                <div className="absolute top-[11%] left-[30%] text-xl sparkle-2">✨</div>
                <div className="absolute bottom-[29%] left-[16%] text-lg sparkle-3">✨</div>
                {/* Badge sur l'image */}
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl shadow-xl">
                    <p className="text-2xl font-black">-30%</p>
                    <p className="text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">🔑 Offre AirBnB & Gîtes</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Propriétaires, déléguez la corvée du ménage entre deux locations. Nous garantissons une propreté irréprochable pour vos voyageurs.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Ménage & Désinfection complète</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Gestion du linge & Dressage</li>
                </ul>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                  <p className="text-blue-600 font-bold flex items-center gap-2">
                    <Key size={18} /> 🎁 -30% le 1er mois
                  </p>
                  <p className="text-blue-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('airbnb')} className="w-full !bg-blue-600 hover:!bg-blue-700">Je calcule pour ma location</Button>
              </div>
            </div>

            <div id="service-bureaux" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/te%CC%81le%CC%81chargement%20(4).png?updatedAt=1769990618710" 
                  alt="Bureaux & Copropriétés" 
                  className="w-full h-full object-cover object-top"
                />
                {/* Étoiles de propreté animées */}
                <div className="absolute top-[3%] left-[18%] text-2xl sparkle-1">✨</div>
                <div className="absolute top-[11%] left-[30%] text-xl sparkle-2">✨</div>
                <div className="absolute bottom-[29%] left-[16%] text-lg sparkle-3">✨</div>
                {/* Badge sur l'image */}
                <div className="absolute top-4 right-4">
                  <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl">
                    <p className="text-2xl font-black">-30%</p>
                    <p className="text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">🏢 Bureaux & Copropriétés</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Des espaces communs propres pour une meilleure ambiance. Laura intervient avec discrétion dans vos locaux ou parties communes.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Entretien des postes & sanitaires</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Nettoyage des parties communes</li>
                </ul>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
                  <p className="text-emerald-600 font-bold flex items-center gap-2">
                    <Building2 size={18} /> 🎁 -30% le 1er mois
                  </p>
                  <p className="text-emerald-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('pro')} className="w-full !bg-emerald-600 hover:!bg-emerald-700">Demander une proposition Pro</Button>
              </div>
            </div>

            <div id="service-printanier" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-50 to-white border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/printemps.jpg" 
                  alt="Ménage Printanier" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Badge sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-pink-500 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-lg md:text-2xl font-black">-30%</p>
                    <p className="text-[10px] md:text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-pink-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">🌸 Ménage Printanier</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Le printemps arrive ! Offrez à votre intérieur un grand nettoyage de saison. On s'occupe de tout : vitres, recoins oubliés, dépoussiérage en profondeur et fraîcheur retrouvée.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Nettoyage en profondeur de toute la maison</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Vitres, plinthes & recoins oubliés</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Dépoussiérage complet & désinfection</li>
                </ul>
                <div className="relative bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-pink-500 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-pink-600 font-bold flex items-center gap-2">
                    <Sparkles size={18} /> 🎁 1ère heure offerte
                  </p>
                  <p className="text-pink-500 text-sm mt-1">Offre spéciale printemps 2026</p>
                </div>
                <Button onClick={() => goToReservation('ponctuel')} className="w-full !bg-pink-500 hover:!bg-pink-600">Réserver mon ménage de printemps</Button>
              </div>
            </div>

            <div id="service-repassage" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/Repassage.jpg" 
                  alt="Service de repassage" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Badge sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-purple-500 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-[10px] md:text-xs font-bold">Bientôt</p>
                    <p className="text-lg md:text-2xl font-black">dispo</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">👔 Repassage à domicile</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Fini les piles de linge qui s'accumulent ! Laura s'occupe de votre repassage avec soin pour des vêtements impeccables, prêts à porter.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> Chemises, pantalons & vêtements du quotidien</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> Linge de maison (draps, nappes)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> Pliage et rangement soigné</li>
                </ul>
                <div className="relative bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-purple-500 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-purple-600 font-bold flex items-center gap-2">
                    <Sparkles size={18} /> Service bientôt disponible
                  </p>
                  <p className="text-purple-500 text-sm mt-1">Contactez-nous pour être informé du lancement</p>
                </div>
                <Button onClick={() => alert('Ce service sera bientôt disponible ! Contactez-nous pour être informé.')} className="w-full !bg-purple-500 hover:!bg-purple-600">Me tenir informé</Button>
              </div>
            </div>

            <div id="service-vitres" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/Lavage%20vitre.jpg" 
                  alt="Nettoyage baie vitrée" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Badge sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-cyan-500 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-[10px] md:text-xs font-bold">Bientôt</p>
                    <p className="text-lg md:text-2xl font-black">dispo</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">🪟 Nettoyage Baie Vitrée</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Retrouvez une vue cristalline ! Laura nettoie vos baies vitrées, fenêtres et vérandas pour une luminosité parfaite dans votre intérieur.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500" /> Baies vitrées & grandes surfaces vitrées</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500" /> Fenêtres intérieures & extérieures</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-500" /> Encadrements & rails nettoyés</li>
                </ul>
                <div className="relative bg-cyan-50 border border-cyan-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-cyan-500 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-cyan-600 font-bold flex items-center gap-2">
                    <Sparkles size={18} /> Service bientôt disponible
                  </p>
                  <p className="text-cyan-500 text-sm mt-1">Contactez-nous pour être informé du lancement</p>
                </div>
                <Button onClick={() => alert('Ce service sera bientôt disponible ! Contactez-nous pour être informé.')} className="w-full !bg-cyan-500 hover:!bg-cyan-600">Me tenir informé</Button>
              </div>
            </div>

            <div id="service-terrasse" className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image en haut du module */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-[2.5rem]">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/Terasse.jpg" 
                  alt="Nettoyage de terrasse" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Badge sur l'image */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-amber-500 text-white px-2.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl">
                    <p className="text-[10px] md:text-xs font-bold">Bientôt</p>
                    <p className="text-lg md:text-2xl font-black">dispo</p>
                  </div>
                </div>
                {/* Dégradé en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">☀️ Nettoyage de Terrasse</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Les beaux jours arrivent, c'est le moment de profiter de votre terrasse ! Laura la remet à neuf pour que vous puissiez en profiter pleinement tout l'été.
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Nettoyage haute pression du sol</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Démoussage & traitement anti-mousse</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Nettoyage du mobilier de jardin</li>
                </ul>
                <div className="relative bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-white px-3 py-1.5 rounded-full text-center font-black shadow-lg leading-tight">
                    <p className="text-sm">-30%</p>
                    <p className="text-[9px]">1er mois</p>
                  </div>
                  <p className="text-amber-600 font-bold flex items-center gap-2">
                    <Sparkles size={18} /> Service bientôt disponible
                  </p>
                  <p className="text-amber-500 text-sm mt-1">Contactez-nous pour être informé du lancement</p>
                </div>
                <Button onClick={() => alert('Ce service sera bientôt disponible ! Contactez-nous pour être informé.')} className="w-full !bg-amber-500 hover:!bg-amber-600">Me tenir informé</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const PageFiscal = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500 bg-red-50">
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle subtitle="Moitié prix sur toutes vos prestations de ménage.">
          Avantage Fiscal 50%
        </SectionTitle>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-red-100 mb-8">
          <div className="bg-red-600 text-white inline-block px-8 py-4 rounded-3xl text-3xl font-black mb-8">
            - 50 %
          </div>
          <h3 className="text-2xl font-bold mb-6">L'Avance Immédiate pour TOUS</h3>
          <p className="text-gray-700 mb-8 text-lg">
            Que vous soyez imposable ou non, vous bénéficiez d'une remise de 50% immédiatement au moment du paiement de votre facture.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-red-700"><CheckCircle2 size={18}/> Non Imposable ?</h4>
              <p className="text-sm text-gray-700 italic font-medium">Vous profitez quand même de la réduction ! L'État verse directement les 50% restants.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle2 size={18}/> Simplification</h4>
              <p className="text-sm text-gray-600">Fini d'attendre l'année suivante. C'est du pouvoir d'achat récupéré tout de suite.</p>
            </div>
          </div>

          {/* Bandeau officiel État - sous le bloc */}
          <div className="bg-blue-900 text-white p-6 md:p-8 rounded-2xl text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🇫🇷</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Dispositif officiel de l'État français</h3>
                <p className="text-blue-200 text-sm">Article 199 sexdecies du Code Général des Impôts</p>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm">
              Le crédit d'impôt pour l'emploi d'un salarié à domicile est un dispositif légal garanti par l'État. 
              Il s'applique à <strong className="text-white">tous les foyers</strong>, imposables ou non. 
              Avec l'avance immédiate de l'URSSAF, vous ne payez que 50% dès la facture.
            </p>
          </div>
        </div>

        {/* Exemple concret */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-emerald-100 mb-8 text-left">
          <h3 className="text-xl font-bold mb-6 text-center">💡 Exemple concret</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Prix de la prestation</p>
              <p className="text-2xl font-black text-gray-800">30 €</p>
            </div>
            <div className="p-4 bg-red-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Avantage fiscal</p>
              <p className="text-2xl font-black text-red-600">- 15 €</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Vous payez réellement</p>
              <p className="text-2xl font-black text-emerald-600">15 €</p>
            </div>
          </div>
        </div>

        {/* Source officielle en bas */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck size={24} className="text-blue-700 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-blue-900 mb-1">Source officielle</p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Ce dispositif est encadré par l'<strong>URSSAF</strong> et le <strong>Ministère de l'Économie</strong>. 
                Pour en savoir plus, consultez le site officiel : 
                <a href="https://www.service-public.fr/particuliers/vosdroits/F12" target="_blank" rel="noopener noreferrer" className="underline font-semibold ml-1">
                  service-public.fr
                </a>
              </p>
              <p className="text-xs text-blue-600 mt-2 italic">
                Laura la Pro du Ménage est une entreprise déclarée et agréée services à la personne. Toutes nos prestations ouvrent droit au crédit d'impôt de 50%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PageServices = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Nous adaptons nos prestations à votre rythme de vie et à vos exigences spécifiques.">
          Nos Services
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Ménage Régulier */}
          <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <Home size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Ménage Régulier</h3>
            </div>
            <p className="text-gray-600 mb-6">Pour un foyer toujours accueillant, nous intervenons chaque semaine ou toutes les deux semaines.</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Nettoyage complet des sols</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Dépoussiérage des meubles</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Nettoyage cuisine/sanitaires</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-500" /> Vider les corbeilles</li>
            </ul>
            <div className="mt-auto">
              <Button onClick={() => goToReservation('regulier')} className="w-full">Calculer mon prix</Button>
            </div>
          </div>

          {/* AirBnB & Gîtes */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <Key size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">AirBnB & Gîtes</h3>
            </div>
            <p className="text-gray-600 mb-6">Maximisez vos revenus locatifs en offrant une expérience client premium grâce à un ménage de qualité hôtelière.</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Rotation rapide entre clients</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Gestion des draps/serviettes</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Kit d'accueil voyageur</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Check-up état des lieux</li>
            </ul>
            <div className="mt-auto">
              <Button onClick={() => goToReservation('airbnb')} className="w-full bg-blue-600 hover:bg-blue-700">Calculer mon prix</Button>
            </div>
          </div>

          {/* Bureaux & Pro */}
          <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center">
                <Building2 size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Bureaux & Pro</h3>
            </div>
            <p className="text-gray-600 mb-6">Un espace de travail sain favorise la productivité de vos équipes. Contrats flexibles sans engagement.</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Nettoyage des postes de travail</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Hygiène des sanitaires/cafétérias</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Vider corbeilles & recyclage</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Nettoyage vitrerie</li>
            </ul>
            <div className="mt-auto">
              <Button onClick={() => goToReservation('bureaux')} className="w-full bg-emerald-600 hover:bg-emerald-700">Calculer mon prix</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PageSeniors = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Aidez vos proches à garder leur autonomie avec un coup de main bienveillant.">
          Pour vos parents
        </SectionTitle>
        
        {/* Section principale avec citation et image */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-orange-100 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-orange-500 italic mb-6">
                "Plus qu'une prestation, une présence."
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nous comprenons que pour vos aînés, la confiance est primordiale. C'est pourquoi Laura privilégie le lien social et l'écoute lors de ses passages.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <Users size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Une seule intervenante</h4>
                    <p className="text-gray-600 text-sm">Toujours le même visage pour rassurer vos parents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <Heart size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Temps d'échange</h4>
                    <p className="text-gray-600 text-sm">Nous prenons le temps de discuter et de partager un café.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src="https://ik.imagekit.io/bqla7nrgyf/te%CC%81le%CC%81chargement%20(10).png?updatedAt=1769990159607" 
                  alt="Soutien aux seniors" 
                  className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
                />
                {/* Étoiles animées */}
                <div className="absolute top-[5%] left-[10%] text-2xl sparkle-1">✨</div>
                <div className="absolute top-[15%] left-[5%] text-xl sparkle-2">✨</div>
                {/* Badge -30% */}
                <div className="absolute top-4 right-4">
                  <div className="bg-orange-500 text-white px-4 py-3 rounded-2xl shadow-xl">
                    <p className="text-2xl font-black">-30%</p>
                    <p className="text-xs font-bold">le 1er mois</p>
                  </div>
                </div>
              </div>
              {/* Offre et CTA sous l'image */}
              <div className="mt-6 text-center w-full max-w-sm">
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4">
                  <p className="text-orange-600 font-bold flex items-center justify-center gap-2">
                    <Gift size={18} /> 🎁 1ère heure offerte + -30% le 1er mois
                  </p>
                  <p className="text-orange-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('seniors')} className="text-lg px-8 py-4 w-full">Offrir cette aide à vos parents</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cartes avantages */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={32} className="text-orange-600" fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold mb-3">Aide au ménage</h3>
            <p className="text-gray-600">Un accompagnement respectueux pour maintenir un intérieur propre et agréable.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Home size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cadre de vie sain</h3>
            <p className="text-gray-600">Garantir un environnement propre, rangé et confortable.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100">
            <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Présence humaine</h3>
            <p className="text-gray-600">Créer du lien social et apporter une présence rassurante au quotidien.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Respect de l'intimité</h3>
            <p className="text-gray-600">Nous respectons votre espace et vos habitudes de vie.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PageHistoire = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Découvrez qui se cache derrière Laura la Pro du Ménage.">
          Notre Histoire
        </SectionTitle>

        {/* Section 1 : Laura */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img 
              src="https://ik.imagekit.io/bqla7nrgyf/unnamed-1.jpg" 
              alt="Laura" 
              className="w-48 h-48 rounded-full object-cover shadow-lg flex-shrink-0"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2">Laura, au service des autres</h3>
              <p className="text-sm text-red-600 font-semibold mb-4 italic">Prendre soin des gens, c'est sa vocation</p>
              <p className="text-gray-600 leading-relaxed">
                Pendant des années, Laura a travaillé dans le service à la personne pour des sociétés classiques. 
                Attentionnée, rigoureuse, toujours souriante — elle a toujours eu à cœur de <strong>prendre soin des autres</strong> et de leur intérieur. Mais quelque chose n'allait pas.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 : Le Déclic */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-lg border border-red-100 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">💥</span>
            </div>
            <h3 className="text-2xl font-bold text-red-700">Le Déclic</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Un jour, Laura a pris conscience d'une réalité révoltante : malgré son dévouement, malgré la qualité de son travail, 
            malgré les heures passées à rendre chaque intérieur impeccable… 
            <strong className="text-red-600"> elle était sous-payée.</strong>
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Les grandes sociétés de ménage facturent cher aux clients… mais reversent une misère à celles et ceux qui font réellement le travail. 
            Laura a refusé d'accepter cette injustice plus longtemps.
          </p>
          <div className="bg-white/70 p-6 rounded-2xl border border-red-200 mt-6">
            <p className="text-red-700 font-semibold text-center text-lg italic">
              « J'en avais assez. Je méritais mieux, et mes collègues aussi. Il fallait changer les choses. »
            </p>
          </div>
        </div>

        {/* Section 3 : La Création */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 md:p-12 rounded-3xl shadow-lg border border-emerald-100 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-emerald-700">La Naissance de Laura la Pro du Ménage</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Laura a décidé de créer sa propre entreprise. Pas une société de plus — 
            <strong>une entreprise avec des valeurs</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Sa mission est double :
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏠</span>
                <h4 className="font-bold text-emerald-700">Pour nos clients</h4>
              </div>
              <p className="text-gray-600">
                Offrir un service de ménage irréprochable, humain et bienveillant, avec une interlocutrice unique qui connaît votre maison par cœur.
              </p>
            </div>
            <div className="bg-white/70 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💪</span>
                <h4 className="font-bold text-emerald-700">Pour les pros du ménage</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Permettre aux aides ménagères et aux indépendant(e)s du secteur d'être enfin 
                <strong> rémunéré(e)s à leur juste valeur</strong>. Fini l'exploitation, place à la reconnaissance.
              </p>
              <button 
                onClick={() => setCurrentPage('recrutement')}
                className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-emerald-700 transition-all hover:scale-105"
              >
                Rejoindre l'équipe →
              </button>
            </div>
          </div>
        </div>

        {/* Section Chiffres */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 mb-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-black text-red-600">+500</p>
              <p className="text-gray-600">Clients satisfaits</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-black text-orange-600">5 ans</p>
              <p className="text-gray-600">D'expérience</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-black text-emerald-600">100%</p>
              <p className="text-gray-600">De confiance</p>
            </div>
          </div>
        </div>

        {/* Section Engagement */}
        <SectionTitle subtitle="Ce qui nous guide chaque jour.">
          Nos Valeurs
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Heart size={24} className="text-emerald-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold">Bienveillance</h3>
            </div>
            <p className="text-gray-600">Chaque intervention est réalisée avec respect et attention pour vous et votre intérieur.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Qualité</h3>
            </div>
            <p className="text-gray-600">Nous nous engageons à fournir un travail impeccable à chaque passage.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Ponctualité</h3>
            </div>
            <p className="text-gray-600">Respect des horaires convenus pour ne jamais perturber votre quotidien.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Confiance</h3>
            </div>
            <p className="text-gray-600">Personnel de confiance, assuré et formé pour votre tranquillité.</p>
          </div>
        </div>

        {/* Section Rémunération juste */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 md:p-12 rounded-3xl shadow-lg border border-purple-100 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">⚖️</span>
            </div>
            <h3 className="text-2xl font-bold text-purple-700">Rémunération Juste</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Chez Laura la Pro du Ménage, nous refusons le modèle classique où les professionnels du ménage sont sous-payés. 
            Nos intervenants sont rémunérés <strong>bien au-dessus des standards du secteur</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Parce qu'un travail bien fait mérite un salaire juste. C'est aussi simple que ça. 
            Et c'est pour cette raison que nos professionnels sont fidèles, motivés et investis dans leur travail — 
            <strong>et ça, vous le ressentez à chaque passage</strong>.
          </p>
        </div>

        {/* CTA final */}
        <div className="text-center bg-gradient-to-r from-red-500 to-orange-500 p-8 md:p-12 rounded-3xl shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Rejoignez l'aventure ! 🌟</h3>
          <p className="text-white/90 text-lg mb-6">
            Faites confiance à une entreprise qui valorise aussi bien ses clients que ses professionnels.
          </p>
          <button 
            onClick={() => {
              setCurrentPage('accueil');
              setTimeout(() => document.getElementById('section-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }} 
            className="bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Découvrir nos services
          </button>
        </div>
      </div>
    </div>
  );

  // État du formulaire recrutement
  const [recrutementForm, setRecrutementForm] = useState({ prenom: '', tel: '', email: '', departement: '' });
  const [recrutementSent, setRecrutementSent] = useState(false);

  const handleRecrutementSubmit = (e) => {
    e.preventDefault();
    // Envoyer par mail ou stocker
    const subject = encodeURIComponent(`Candidature - ${recrutementForm.prenom} (${recrutementForm.departement})`);
    const body = encodeURIComponent(
      `Nouvelle candidature !\n\nPrénom : ${recrutementForm.prenom}\nTéléphone : ${recrutementForm.tel}\nEmail : ${recrutementForm.email}\nDépartement : ${recrutementForm.departement}`
    );
    window.location.href = `mailto:contact@laura-menage.fr?subject=${subject}&body=${body}`;
    setRecrutementSent(true);
    setTimeout(() => setRecrutementSent(false), 5000);
  };

  const PageRecrutement = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Rejoignez une entreprise qui vous respecte.">
          Rejoignez-nous !
        </SectionTitle>

        {/* Hero recrutement */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src="https://ik.imagekit.io/bqla7nrgyf/unnamed.jpg" 
              alt="Laura recrute" 
              className="w-full md:w-1/2 rounded-2xl object-cover shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2">Laura recrute des indépendant(e)s !</h3>
              <p className="text-sm text-emerald-600 font-semibold mb-4 italic">Auto-entrepreneurs, ce message est pour vous</p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vous êtes aide ménagère, agent d'entretien ou professionnel(le) du service à la personne ? 
                Vous en avez assez d'être sous-payé(e) par les grandes sociétés ?
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chez <strong>Laura la Pro du Ménage</strong>, nous travaillons exclusivement avec des 
                <strong> indépendant(e)s</strong> et nous les rémunérons à leur <strong>juste valeur</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Pourquoi nous rejoindre */}
        <SectionTitle subtitle="Ce qu'on vous propose concrètement.">
          Pourquoi nous rejoindre ?
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-b from-emerald-50 to-white p-6 rounded-3xl shadow-lg border border-emerald-100 text-center">
            <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Rémunération juste</h4>
            <p className="text-gray-600 text-sm">Fini les miettes. Vous êtes payé(e) à la hauteur de votre travail et de votre talent.</p>
          </div>
          <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-3xl shadow-lg border border-blue-100 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Aide administrative</h4>
            <p className="text-gray-600 text-sm">Pas encore auto-entrepreneur ? On vous accompagne dans toutes vos démarches pour créer votre statut.</p>
          </div>
          <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-3xl shadow-lg border border-orange-100 text-center">
            <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Missions régulières</h4>
            <p className="text-gray-600 text-sm">Des clients fidèles, des plannings stables. Vous travaillez sereinement, on s'occupe du reste.</p>
          </div>
        </div>

        {/* Notre philosophie */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 md:p-10 rounded-3xl shadow-lg border border-purple-100 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">💜</span>
            </div>
            <h3 className="text-2xl font-bold text-purple-700">Notre philosophie</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Laura a elle-même travaillé pendant des années pour des sociétés qui la sous-payaient. 
            Elle sait ce que c'est. C'est pour ça qu'elle a créé cette entreprise : pour offrir aux professionnels 
            du ménage <strong>le respect et la rémunération qu'ils méritent</strong>.
          </p>
          <div className="bg-white/70 p-6 rounded-2xl border border-purple-200">
            <p className="text-purple-700 font-semibold text-center text-lg italic">
              « Ici, on ne travaille pas pour nous. On travaille avec nous. »
            </p>
          </div>
        </div>

        {/* Profil recherché */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Profil recherché</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Auto-entrepreneur(e) ou en cours de création de statut</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Sérieux(se), ponctuel(le) et bienveillant(e)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Expérience dans le ménage ou le service à la personne</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Envie de travailler dans le respect et la confiance</p>
            </div>
          </div>
        </div>

        {/* Formulaire de candidature */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 md:p-12 rounded-3xl shadow-lg mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Candidatez maintenant ! 🚀</h3>
          <p className="text-white/90 text-center mb-8">Laissez vos coordonnées, Laura vous rappelle personnellement.</p>
          
          {recrutementSent ? (
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl text-center">
              <CheckCircle2 size={48} className="text-white mx-auto mb-4" />
              <p className="text-white text-xl font-bold">Merci ! 🎉</p>
              <p className="text-white/90">Votre candidature a été envoyée. Laura vous rappellera très vite !</p>
            </div>
          ) : (
            <form onSubmit={handleRecrutementSubmit} className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-white text-sm font-semibold mb-1 block">Prénom *</label>
                <input 
                  type="text" 
                  required
                  value={recrutementForm.prenom}
                  onChange={(e) => setRecrutementForm({...recrutementForm, prenom: e.target.value})}
                  placeholder="Votre prénom"
                  className="w-full p-3 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white/50 outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm font-semibold mb-1 block">Téléphone *</label>
                <input 
                  type="tel" 
                  required
                  value={recrutementForm.tel}
                  onChange={(e) => setRecrutementForm({...recrutementForm, tel: e.target.value})}
                  placeholder="06 XX XX XX XX"
                  className="w-full p-3 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white/50 outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm font-semibold mb-1 block">Email *</label>
                <input 
                  type="email" 
                  required
                  value={recrutementForm.email}
                  onChange={(e) => setRecrutementForm({...recrutementForm, email: e.target.value})}
                  placeholder="votre@email.com"
                  className="w-full p-3 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white/50 outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm font-semibold mb-1 block">Département *</label>
                <input 
                  type="text" 
                  required
                  value={recrutementForm.departement}
                  onChange={(e) => setRecrutementForm({...recrutementForm, departement: e.target.value})}
                  placeholder="Ex: 75, 92, 13..."
                  className="w-full p-3 rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-white/50 outline-none"
                />
              </div>
              <div className="md:col-span-2 text-center mt-4">
                <button 
                  type="submit"
                  className="bg-white text-red-600 font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
                >
                  📩 Envoyer ma candidature
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Rassurance */}
        <div className="text-center text-gray-500 text-sm">
          <p>🔒 Vos données sont confidentielles et ne seront jamais partagées.</p>
          <p className="mt-1">Laura vous rappelle sous 48h pour discuter de votre projet professionnel.</p>
        </div>
      </div>
    </div>
  );

  const PageContact = () => (
    <div className="py-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Nous sommes à votre écoute.">
          Contactez-nous
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Nos coordonnées</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Phone size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="font-bold">Téléphone</p>
                  <p className="text-gray-600">06 XX XX XX XX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-600">contact@laura-menage.fr</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  <MapPin size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold">Zone d'intervention</p>
                  <p className="text-gray-600">Bordeaux et ses alentours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-orange-500 p-8 rounded-3xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-6">Demande de devis gratuit</h3>
            <p className="mb-6 opacity-90">Remplissez notre formulaire et recevez votre devis personnalisé sous 24h.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl text-gray-900" />
              <input type="email" placeholder="Votre email" className="w-full px-4 py-3 rounded-xl text-gray-900" />
              <input type="tel" placeholder="Votre téléphone" className="w-full px-4 py-3 rounded-xl text-gray-900" />
              <textarea placeholder="Votre message" rows={3} className="w-full px-4 py-3 rounded-xl text-gray-900"></textarea>
              <button className="w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Envoyer ma demande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <PageAccueil />;
      case 'services': return <PageServices />;
      case 'seniors': return <PageSeniors />;
      case 'histoire': return <PageHistoire />;
      case 'fiscal': return <PageFiscal />;
      case 'recrutement': return <PageRecrutement />;
      case 'contact': return <PageContact />;
      case 'reserver': return (
        <ReservationWizard 
          onBack={() => { setSelectedService(null); setCurrentPage('accueil'); }} 
          onNavigate={setCurrentPage}
          initialService={selectedService}
        />
      );
      case 'admin': return (
        <AdminPage 
          onBack={() => { window.location.hash = ''; setCurrentPage('accueil'); }} 
        />
      );
      default: return <PageAccueil />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('accueil')}>
            <div className="bg-red-600 text-white p-1.5 rounded-lg shadow-md transform hover:rotate-6 transition-transform">
              <Heart fill="currentColor" size={20} />
            </div>
            <div>
              <span className="text-lg font-black text-gray-900 block leading-none uppercase">Laura</span>
              <span className="text-[8px] font-black text-orange-600 uppercase tracking-widest">La pro du ménage</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map(item => (
              <button 
                key={item.id} 
                onClick={() => {
                  if (item.id === 'services') {
                    setCurrentPage('accueil');
                    setTimeout(() => document.getElementById('section-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                  } else {
                    setCurrentPage(item.id);
                  }
                }} 
                className={`text-sm font-bold transition-all ${currentPage === item.id ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
              >
                {item.name}
              </button>
            ))}
            <Button onClick={() => goToReservation()} className="ml-2 !py-2 px-6 !text-sm">Calculer mon prix</Button>
            <Button onClick={() => setCurrentPage('recrutement')} variant="secondary" className="!py-2 px-6 !text-sm !bg-emerald-600 !text-white hover:!bg-emerald-700 !border-emerald-600">Recrutement</Button>
          </div>
          
          <button className="lg:hidden text-gray-900 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {navigation.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => { 
                    if (item.id === 'services') {
                      setCurrentPage('accueil');
                      setIsMenuOpen(false);
                      setTimeout(() => document.getElementById('section-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                    } else {
                      setCurrentPage(item.id); 
                      setIsMenuOpen(false);
                    }
                  }} 
                  className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    currentPage === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Button 
                  onClick={() => { goToReservation(); setIsMenuOpen(false); }} 
                  className="w-full !py-3"
                >
                  Calculer mon prix
                </Button>
                <Button 
                  onClick={() => { setCurrentPage('recrutement'); setIsMenuOpen(false); }} 
                  className="w-full !py-3 !bg-emerald-600 !text-white hover:!bg-emerald-700 !border-emerald-600"
                >
                  Recrutement
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-600 text-white p-1 rounded-lg"><Heart fill="currentColor" size={16} /></div>
                <span className="text-lg font-black tracking-tight uppercase">Laura la pro du ménage</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Services de ménage et d'accompagnement à domicile. Humain, Proche, Professionnel.</p>
            </div>
            <div className="text-sm text-gray-400">
              <h5 className="font-bold text-orange-400 uppercase text-xs mb-4">Légal</h5>
              <p>Crédit d'impôt immédiat sous réserve d'éligibilité. Agrément Services à la Personne.</p>
            </div>
            <div className="text-sm text-gray-400">
              <h5 className="font-bold text-orange-400 uppercase text-xs mb-4">Avantage -50%</h5>
              <p className="mb-2">Toutes nos prestations ouvrent droit au crédit d'impôt de 50% (Art. 199 sexdecies du CGI).</p>
              <button 
                onClick={() => { setCurrentPage('fiscal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-red-400 hover:text-red-300 font-semibold text-xs underline transition-colors"
              >
                En savoir plus →
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-[10px]">© {new Date().getFullYear()} Laura la pro du ménage. Tous droits réservés.</p>
            <button 
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <ShieldCheck size={16} />
              Espace Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Admin Login */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowAdminModal(false); setAdminPassword(''); setPasswordError(false); }}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 fade-in duration-200">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Espace Admin</h3>
              <p className="text-sm text-gray-500 mt-1">Entrez le mot de passe pour accéder</p>
            </div>

            {/* Input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Mot de passe"
                autoFocus
                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-center text-lg font-medium transition-all ${
                  passwordError 
                    ? 'border-red-400 bg-red-50 animate-shake' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error message */}
            {passwordError && (
              <p className="text-red-500 text-sm text-center mb-4">
                ❌ Mot de passe incorrect
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowAdminModal(false); setAdminPassword(''); setPasswordError(false); }}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
