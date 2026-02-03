import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Percent, CheckCircle, FileText, HelpCircle } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const TaxBenefitPage = () => {
  const conditions = [
    'Être domicilié fiscalement en France',
    'Avoir recours à des services à la personne agréés',
    'Payer par des moyens traçables (chèque, virement, CESU)',
    'Déclarer les montants sur votre déclaration d\'impôts',
  ];

  return (
    <>
      <Helmet>
        <title>Avantage fiscal 50% - Crédit d'impôt services à la personne | Laura la pro du lavage</title>
        <meta name="description" content="Profitez du crédit d'impôt de 50% sur tous nos services à la personne. Explications simples, exemples concrets et conditions d'accès." />
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
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Percent size={48} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Avantage fiscal : 50%</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Tous nos services ouvrent droit à un crédit d'impôt de 50%
              </p>
            </motion.div>
          </div>
        </section>

        {/* Explanation */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Une aide fiscale accessible à tous">
              Comment ça marche ?
            </SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-[#F5F1E8]">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Les services à la personne à domicile, comme le ménage et l'aide aux personnes âgées, 
                    ouvrent droit à un <strong>crédit d'impôt de 50%</strong> des sommes versées.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Concrètement, cela signifie que <strong>l'État prend en charge la moitié</strong> du coût 
                    de nos services, sous forme de crédit d'impôt.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Example */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center>
              Exemple concret
            </SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-[#8B9D6F] to-[#7A8C5E] text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8">Calcul du coût réel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <div className="text-4xl font-bold mb-2">1 000 €</div>
                      <div className="text-white/80">Montant des prestations</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-3xl">−</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">500 €</div>
                      <div className="text-white/80">Crédit d'impôt (50%)</div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="text-5xl font-bold mb-2">500 €</div>
                    <div className="text-xl text-white/90">Coût réel à votre charge</div>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600">
                Le crédit d'impôt vous est remboursé l'année suivante, 
                ou déduit directement de vos impôts si vous êtes imposable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center subtitle="Simple et accessible">
              Conditions d'accès
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conditions.map((condition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="text-[#8B9D6F] shrink-0 mt-1" size={24} />
                      <p className="text-gray-700">{condition}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reassurance */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center shrink-0">
                    <FileText className="text-[#8B9D6F]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Tout est légal et sécurisé
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Laura la pro du lavage est une entreprise agréée pour les services à la personne. 
                      Vous recevrez toutes les attestations fiscales nécessaires pour bénéficier du crédit d'impôt.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Nous vous accompagnons dans les démarches administratives pour que tout soit simple et transparent.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle center>
              Questions fréquentes
            </SectionTitle>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="text-[#8B9D6F] shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Suis-je éligible même si je ne paie pas d'impôts ?
                      </h3>
                      <p className="text-gray-700">
                        Oui ! Le crédit d'impôt est remboursable. Même si vous n'êtes pas imposable, 
                        vous recevrez le remboursement de 50% l'année suivante.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="text-[#8B9D6F] shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Y a-t-il un plafond ?
                      </h3>
                      <p className="text-gray-700">
                        Oui, le crédit d'impôt est plafonné à 12 000€ par an (soit 6 000€ de crédit), 
                        majoré sous certaines conditions (personnes âgées, enfants à charge, etc.).
                      </p>
                    </div>
                  </div>
                </Card>
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
                Profitez de cet avantage dès maintenant
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Demandez votre devis gratuit et découvrez combien vous coûteront réellement nos services.
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

export default TaxBenefitPage;