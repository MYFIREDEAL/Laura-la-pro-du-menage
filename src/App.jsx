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
    { id: 'fiscal', name: 'Avantage Fiscal' }
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
      <section className="relative w-[85%] mx-auto">
        <img 
          src="https://ik.imagekit.io/bqla7nrgyf/unnamed-1.jpg" 
          alt="Laura souriante" 
          className="w-full rounded-2xl" 
        />
        
        {/* Texte "Le ménage avec du cœur" - à gauche */}
        <div className="absolute top-[22%] left-[4%] md:left-[5%] max-w-[55%] md:max-w-none">
          <p className="text-[10px] md:text-sm text-orange-500 font-bold tracking-wider uppercase mb-1 md:mb-2">Services de proximité</p>
          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Le ménage<br />avec <span className="text-orange-500 underline decoration-orange-500">du cœur</span>.
          </h2>
        </div>

        {/* Badge Entreprise Humaine - en haut à droite */}
        <div className="absolute top-[18%] right-[3%] md:right-[5%] animate-bounce">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg px-2 py-1.5 md:px-4 md:py-3 flex items-center gap-1.5 md:gap-2">
            <div className="bg-orange-100 p-1 md:p-2 rounded-lg">
              <Heart size={12} className="text-orange-500 md:w-5 md:h-5" fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] md:text-sm font-bold text-gray-900">Entreprise</p>
              <p className="text-[9px] md:text-xs text-gray-600">Humaine</p>
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

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Des solutions professionnelles pour chaque aspect de votre vie.">
            Nos Univers de Service
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-500">
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
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">Débordé par le quotidien ?</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Entre le travail, les enfants et les activités, le ménage devient une corvée ? Retrouvez vos soirées dans une maison impeccable.
                </p>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
                  <p className="text-red-600 font-bold flex items-center gap-2">
                    <Gift size={18} /> 🎁 1ère heure offerte + -30% le 1er mois
                  </p>
                  <p className="text-red-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('regulier')} className="w-full">Je lance mon essai</Button>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-500">
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
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">Prenez soin de vos parents</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Offrez-leur le soutien d'une présence rassurante qui s'occupe de leur intérieur avec douceur et respect de leur autonomie.
                </p>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                  <p className="text-orange-600 font-bold flex items-center gap-2">
                    <Heart size={18} fill="currentColor" /> 🎁 1ère heure offerte + -30% le 1er mois
                  </p>
                  <p className="text-orange-500 text-sm mt-1">Offre valable jusqu'au 14 février 2026</p>
                </div>
                <Button onClick={() => goToReservation('seniors')} className="w-full !bg-orange-500 hover:!bg-orange-600">Je réserve pour mes parents</Button>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500">
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
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">Offre AirBnB & Gîtes</h3>
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

            <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-500">
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
                <h3 className="text-2xl font-black text-gray-900 mb-4 italic">Bureaux & Copropriétés</h3>
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
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-red-100">
          <div className="bg-red-600 text-white inline-block px-8 py-4 rounded-3xl text-3xl font-black mb-8">
            - 50 %
          </div>
          <h3 className="text-2xl font-bold mb-6">L'Avance Immédiate pour TOUS</h3>
          <p className="text-gray-700 mb-8 text-lg">
            Que vous soyez imposable ou non, vous bénéficiez d'une remise de 50% immédiatement au moment du paiement de votre facture.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-red-700"><CheckCircle2 size={18}/> Non Imposable ?</h4>
              <p className="text-sm text-gray-700 italic font-medium">Vous profitez quand même de la réduction ! L'État verse directement les 50% restants.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle2 size={18}/> Simplification</h4>
              <p className="text-sm text-gray-600">Fini d'attendre l'année suivante. C'est du pouvoir d'achat récupéré tout de suite.</p>
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
        <SectionTitle subtitle="Découvrez qui se cache derrière Laura.">
          Notre Histoire
        </SectionTitle>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img 
              src="https://ik.imagekit.io/bqla7nrgyf/unnamed-1.jpg" 
              alt="Laura" 
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold mb-4">Laura, passionnée du ménage</h3>
              <p className="text-gray-600 leading-relaxed">
                Après plusieurs années d'expérience dans les services à la personne, j'ai décidé de créer ma propre entreprise 
                pour offrir un service de ménage de qualité, humain et bienveillant. Mon objectif : vous simplifier la vie 
                tout en créant des emplois durables dans notre région.
              </p>
            </div>
          </div>
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
        <SectionTitle subtitle="Nos valeurs au quotidien.">
          Notre Engagement
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
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
                onClick={() => setCurrentPage(item.id)} 
                className={`text-xs font-bold transition-all ${currentPage === item.id ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
              >
                {item.name}
              </button>
            ))}
            <Button onClick={() => goToReservation()} className="ml-2 !py-2 px-6 !text-xs">Calculer mon prix</Button>
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
                  onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }} 
                  className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    currentPage === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Button 
                  onClick={() => { goToReservation(); setIsMenuOpen(false); }} 
                  className="w-full !py-3"
                >
                  Calculer mon prix
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
