import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F5F1E8]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#8B9D6F]" />
                <a href="tel:+33123456789" className="hover:text-[#8B9D6F] transition-colors">
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#8B9D6F]" />
                <a href="mailto:contact@lauraprolavage.fr" className="hover:text-[#8B9D6F] transition-colors">
                  contact@lauraprolavage.fr
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#8B9D6F] mt-1" />
                <span className="text-gray-300">France</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F5F1E8]">Liens utiles</h3>
            <div className="space-y-2">
              <Link to="/services" className="block hover:text-[#8B9D6F] transition-colors">
                Nos services
              </Link>
              <Link to="/seniors" className="block hover:text-[#8B9D6F] transition-colors">
                Services seniors
              </Link>
              <Link to="/avantage-fiscal" className="block hover:text-[#8B9D6F] transition-colors">
                Avantage fiscal
              </Link>
              <Link to="/contact" className="block hover:text-[#8B9D6F] transition-colors">
                Demander un devis
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F5F1E8]">À propos</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Laura la pro du lavage, entreprise de ménage et services à domicile créée par le terrain. 
              Nous valorisons nos intervenantes et offrons un service humain et de qualité.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Laura la pro du lavage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;