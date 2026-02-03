import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, Sparkles, Heart, Shield, Sun } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import IconCard from '@/components/IconCard';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const cleaningServices = [
    {
      icon: Calendar,
      title: 'Ménage régulier',
      description: 'Un entretien hebdomadaire ou bimensuel pour un intérieur toujours propre.',
    },
    {
      icon: Sparkles,
      title: 'Ménage ponctuel',
      description: 'Pour un événement spécial ou un besoin occasionnel.',
    },
    {
      icon: Home,
      title: 'Entretien complet',
      description: 'Nettoyage approfondi de toutes les pièces de votre logement.',
    },
  ];

  const seniorServices = [
    {
      icon: Heart,
      title: 'Aide au ménage',
      description: 'Un accompagnement bienveillant pour l\'entretien du domicile.',
    },
    {
      icon: Sun,
      title: 'Cadre de vie sain',
      description: 'Maintenir un environnement propre et agréable.',
    },
    {
      icon: Shield,
      title: 'Présence humaine',
      description: 'Un lien social et une présence rassurante.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nos services - Ménage et aide à domicile | Laura la pro du lavage</title>
        <meta name="description" content="Découvrez nos services de ménage à domicile et d'aide aux personnes âgées. Ménage régulier, ponctuel, services seniors avec 50% de crédit d'impôt." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-[#8B9D6F] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos services</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Des solutions adaptées à tous vos besoins, avec un service humain et de qualité
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cleaning Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle subtitle="Pour un intérieur impeccable au quotidien">
              Ménage à domicile
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cleaningServices.map((service, index) => (
                <IconCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Senior Services */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle subtitle="Un accompagnement bienveillant pour rester chez soi">
              Services à la personne âgée
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seniorServices.map((service, index) => (
                <IconCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tax Benefit */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-[#8B9D6F] to-[#7A8C5E] text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">Avantage fiscal : 50% pris en charge</h3>
                  <p className="text-lg text-white/90 mb-4">
                    Tous nos services à la personne ouvrent droit à un crédit d'impôt de 50%.
                  </p>
                  <p className="text-white/80 mb-6">
                    Exemple : pour 1000€ de prestations, vous ne payez réellement que 500€.
                  </p>
                  <Link to="/avantage-fiscal">
                    <Button size="lg" variant="outline" className="bg-white text-[#8B9D6F] hover:bg-white/90">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Intéressé par nos services ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Demandez votre devis gratuit et sans engagement.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white">
                  Demander un devis
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;