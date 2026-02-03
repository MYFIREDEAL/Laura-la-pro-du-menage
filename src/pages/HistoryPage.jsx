import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Award, Users } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const HistoryPage = () => {
  return (
    <>
      <Helmet>
        <title>Notre histoire - Laura la pro du lavage</title>
        <meta name="description" content="Découvrez l'histoire de Laura, ancienne femme de ménage qui a créé une entreprise basée sur le respect, la dignité et un modèle juste et humain." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre histoire</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Une entreprise créée par le terrain, avec le cœur
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                  alt="Laura, fondatrice"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Le parcours de Laura</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Avant de créer cette entreprise, j'étais moi-même femme de ménage. J'ai connu les conditions 
                    difficiles, le manque de reconnaissance, et les modèles économiques qui ne respectent pas 
                    les intervenantes.
                  </p>
                  <p>
                    C'est cette expérience sur le terrain qui m'a donné l'envie de faire différemment. 
                    De créer une entreprise où les intervenantes sont respectées, valorisées, et où la qualité 
                    prime sur le volume.
                  </p>
                  <p>
                    Aujourd'hui, je suis fière de diriger une équipe de professionnelles qui partagent 
                    ces mêmes valeurs d'humanité et de qualité de service.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Les valeurs qui nous animent au quotidien">
              Notre vision
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Respect</h3>
                  <p className="text-gray-600">
                    Chaque intervenante est respectée, écoutée et valorisée pour son travail.
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Dignité</h3>
                  <p className="text-gray-600">
                    Des conditions de travail justes et une rémunération équitable.
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-[#8B9D6F]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Stabilité</h3>
                  <p className="text-gray-600">
                    Nous privilégions la continuité pour nos intervenantes et nos clients.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Model */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-[#8B9D6F]/10 to-[#F5F1E8]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Un modèle juste et humain
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Contrairement aux grandes plateformes qui précarisent les intervenantes, 
                    nous avons choisi un modèle basé sur le respect et la valorisation du travail.
                  </p>
                  <p>
                    Nos intervenantes ne sont pas des numéros dans un système automatisé. 
                    Elles sont des professionnelles qualifiées, formées et soutenues.
                  </p>
                  <p>
                    Ce modèle nous permet d'offrir un service de qualité à nos clients, 
                    tout en garantissant des conditions de travail dignes à nos équipes.
                  </p>
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
                Rejoignez l'aventure
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Faites confiance à une entreprise qui partage vos valeurs.
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

export default HistoryPage;