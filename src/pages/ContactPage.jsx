import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const areas = [
    'Paris',
    'Île-de-France',
    'Lyon',
    'Marseille',
    'Bordeaux',
    'Lille',
    'Toulouse',
    'Autre',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.area) {
      newErrors.area = 'La zone d\'intervention est requise';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Store in localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      toast({
        title: "Demande envoyée !",
        description: "Merci pour votre demande. Laura vous contactera dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: '',
        message: '',
      });
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact - Demander un devis gratuit | Laura la pro du lavage</title>
        <meta name="description" content="Contactez Laura la pro du lavage pour un devis gratuit et sans engagement. Réponse rapide par téléphone ou email." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#8B9D6F] to-[#7A8C5E] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Nous contacter</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Demandez votre devis gratuit et sans engagement
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
                  <a href="tel:+33123456789" className="text-[#8B9D6F] hover:underline text-lg">
                    01 23 45 67 89
                  </a>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:contact@lauraprolavage.fr" className="text-[#8B9D6F] hover:underline">
                    contact@lauraprolavage.fr
                  </a>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Zone d'intervention</h3>
                  <p className="text-gray-600">Île-de-France et grandes villes</p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Réponse rapide, sans engagement">
              Demander un devis
            </SectionTitle>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D6F] transition-colors`}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D6F] transition-colors`}
                        placeholder="jean.dupont@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D6F] transition-colors`}
                        placeholder="06 12 34 56 78"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                      Zone d'intervention *
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                        errors.area ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D6F] transition-colors`}
                    >
                      <option value="">Sélectionnez votre zone</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D6F] transition-colors resize-none`}
                      placeholder="Décrivez vos besoins : type de service, fréquence souhaitée, nombre de pièces, etc."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white"
                    >
                      <Send className="mr-2" size={20} />
                      Envoyer ma demande
                    </Button>
                    <a href="tel:+33123456789" className="flex-1">
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="w-full border-[#8B9D6F] text-[#8B9D6F] hover:bg-[#8B9D6F] hover:text-white"
                      >
                        <Phone className="mr-2" size={20} />
                        Appeler maintenant
                      </Button>
                    </a>
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    Réponse rapide, sans engagement. Vos données sont protégées.
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;