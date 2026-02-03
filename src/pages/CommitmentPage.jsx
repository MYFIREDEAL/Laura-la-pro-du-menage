import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Heart, Users, Shield, TrendingUp } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import IconCard from '@/components/IconCard';
import { Button } from '@/components/ui/button';

const CommitmentPage = () => {
  const commitments = [
    {
      icon: Heart,
      title: 'Auto-entrepreneuses valorisées',
      description: 'Nos intervenantes sont des auto-entrepreneuses respectées, avec une rémunération juste et des conditions de travail dignes.',
    },
    {
      icon: Shield,
      title: 'Pas de sous-traitance abusive',
      description: 'Nous refusons les modèles de sous-traitance en cascade qui précarisent les intervenantes. Ici, pas d\'intermédiaire inutile.',
    },
    {
      icon: Users,
      title: 'Relation humaine avant tout',
      description: 'Pas de plateforme déshumanisée. Nous privilégions les échanges directs et la continuité dans les relations.',
    },
    {
      icon: Award,
      title: 'Qualité avant volume',
      description: 'Nous préférons moins de clients satisfaits qu\'une course effrénée au volume au détriment de la qualité.',
    },
    {
      icon: TrendingUp,
      title: 'Croissance responsable',
      description: 'Notre développement se fait de manière réfléchie, en préservant nos valeurs et la qualité de nos services.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Notre engagement - Un modèle juste et humain | Laura la pro du lavage</title>
        <meta name="description" content="Découvrez nos engagements : valorisation des intervenantes, pas de sous-traitance abusive, qualité avant volume. Un modèle juste et humain." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre engagement</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Un modèle économique juste, au service des intervenantes et des clients
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Un modèle différent, plus juste
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dans un secteur souvent critiqué pour ses pratiques, nous avons fait le choix 
                d'un modèle économique qui respecte à la fois les intervenantes et les clients. 
                Pas de plateforme déshumanisée, pas de course au volume : ici, l'humain prime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Les principes qui guident notre action au quotidien">
              Nos engagements concrets
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commitments.slice(0, 3).map((commitment, index) => (
                <IconCard
                  key={index}
                  icon={commitment.icon}
                  title={commitment.title}
                  description={commitment.description}
                  index={index}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
              {commitments.slice(3).map((commitment, index) => (
                <IconCard
                  key={index + 3}
                  icon={commitment.icon}
                  title={commitment.title}
                  description={commitment.description}
                  index={index + 3}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Pourquoi c'est important ?
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong>Pour les intervenantes :</strong> Des conditions de travail dignes, 
                    une rémunération juste, et une reconnaissance de leur professionnalisme.
                  </p>
                  <p>
                    <strong>Pour vous, clients :</strong> Un service de qualité, une relation 
                    de confiance, et la garantie de soutenir un modèle éthique.
                  </p>
                  <p>
                    <strong>Pour la société :</strong> Montrer qu'une autre façon de faire 
                    est possible, loin des plateformes qui précarisent le travail.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
                  alt="Équipe engagée"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </motion.div>
            </div>
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
                Partagez-vous nos valeurs ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Rejoignez les clients qui ont fait le choix d'un service éthique et de qualité.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-[#8B9D6F] hover:bg-[#7A8C5E] text-white">
                  Nous contacter
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CommitmentPage;