import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Shield, Home, Users, Sparkles, Clock } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import IconCard from '@/components/IconCard';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const SeniorsPage = () => {
  const advantages = [
    {
      icon: Heart,
      title: 'Aide au ménage',
      description: 'Un accompagnement respectueux pour maintenir un intérieur propre et agréable.',
    },
    {
      icon: Users,
      title: 'Présence humaine',
      description: 'Créer du lien social et apporter une présence rassurante au quotidien.',
    },
    {
      icon: Home,
      title: 'Cadre de vie sain',
      description: 'Garantir un environnement propre, rangé et confortable.',
    },
    {
      icon: Shield,
      title: 'Respect de l\'intimité',
      description: 'Nous respectons votre espace et vos habitudes de vie.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services pour les seniors - Aide à domicile bienveillante | Laura la pro du lavage</title>
        <meta name="description" content="Services d'aide à domicile pour les seniors. Intervenantes bienveillantes, continuité et stabilité, respect de l'intimité. Restez chez vous en toute sérénité." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-[#F5F1E8] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Rester chez soi plus longtemps,<br />en toute sérénité
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nous accompagnons les seniors avec bienveillance et respect, pour maintenir un cadre de vie sain 
                  et permettre de rester à domicile le plus longtemps possible.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white">
                    Contacter Laura
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1635733175329-3f263ac6011f"
                  alt="Aide à domicile pour seniors"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Continuité et stabilité pour votre tranquillité d'esprit">
              Des intervenantes bienveillantes
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="text-[#8B9D6F]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Pas de changement permanent
                    </h3>
                    <p className="text-gray-600">
                      Nous favorisons la continuité avec les mêmes intervenantes pour créer une relation de confiance.
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-[#8B9D6F]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Continuité et stabilité
                    </h3>
                    <p className="text-gray-600">
                      Des horaires réguliers et une présence fiable pour votre sécurité et votre confort.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Un accompagnement complet et respectueux">
              Nos avantages
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <IconCard
                  key={index}
                  icon={advantage.icon}
                  title={advantage.title}
                  description={advantage.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-[#8B9D6F]/10 to-[#F5F1E8]">
                <div className="text-center">
                  <Sparkles className="text-[#8B9D6F] mx-auto mb-4" size={48} />
                  <p className="text-xl text-gray-700 italic mb-4 leading-relaxed">
                    "Grâce à Laura et son équipe, ma mère peut rester chez elle en toute sérénité. 
                    Les intervenantes sont à l'écoute, bienveillantes et toujours à l'heure. 
                    Un vrai soulagement pour toute la famille."
                  </p>
                  <p className="text-gray-600 font-semibold">— Marie, fille d'une bénéficiaire</p>
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
                Envie d'en discuter ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Contactez Laura pour échanger sur vos besoins et trouver la meilleure solution ensemble.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white">
                  Contacter Laura
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SeniorsPage;