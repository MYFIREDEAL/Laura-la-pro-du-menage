import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_ktzzyws';
const EMAILJS_PUBLIC_KEY = 'JLkUjDsD6AckYt8dz';

// Template IDs
const TEMPLATE_DEMANDE = 'template_9o9hly9';
const TEMPLATE_CANDIDATURE = 'template_wib82dd';

/**
 * Envoie une notification email pour une nouvelle demande client
 */
export const notifyNewDemande = async (demande) => {
  if (!EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS Public Key manquante — email non envoyé');
    return;
  }
  
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_DEMANDE, {
      service: demande.serviceLabel || demande.service || 'Non précisé',
      city: demande.city || 'Non précisée',
    }, EMAILJS_PUBLIC_KEY);
    console.log('✅ Email notification demande envoyé');
  } catch (error) {
    console.error('❌ Erreur envoi email demande:', error);
    // On ne bloque pas le processus si l'email échoue
  }
};

/**
 * Envoie une notification email pour une nouvelle candidature
 */
export const notifyNewCandidature = async () => {
  if (!EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS Public Key manquante — email non envoyé');
    return;
  }
  
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CANDIDATURE, {}, EMAILJS_PUBLIC_KEY);
    console.log('✅ Email notification candidature envoyé');
  } catch (error) {
    console.error('❌ Erreur envoi email candidature:', error);
  }
};
