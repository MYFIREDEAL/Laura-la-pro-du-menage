import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Percent, Heart, Users } from 'lucide-react';
import IconCard from '@/components/IconCard';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const features = [
    {
      icon: Percent,
      title: '50% pris en charge',
      description: 'Profitez du crédit d\'impôt de 50% sur tous nos services à la personne.',
    },
    {
      icon: Heart,
      title: 'Intervenantes respectées',
      description: 'Nous valorisons et respectons nos intervenantes, pour un service de qualité.',
    },
    {
      icon: Users,
      title: 'Spécial seniors',
      description: 'Des services adaptés pour permettre aux seniors de rester chez eux sereinement.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Laura la pro du lavage - Ménage et services à domicile humains et justes</title>
        <meta name="description" content="Entreprise de ménage et services à domicile créée par le terrain, dirigée par Laura. Service humain, intervenantes respectées, 50% de crédit d'impôt." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1698212242621-cc02c02db975)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ménage & services à domicile,<br />humains et justes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            Entreprise créée par le terrain, dirigée par Laura
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white text-lg px-8 py-6">
                Demander un devis gratuit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <IconCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prêt à simplifier votre quotidien ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactez-nous pour un devis personnalisé et sans engagement.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white">
                Nous contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;