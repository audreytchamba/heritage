// Réglages du restaurant. Peuvent être surchargés par des variables d'environnement.
// Horaires : 0 = dimanche … 6 = samedi. Une fermeture <= ouverture signifie "après minuit".
module.exports = {
  // Numéro WhatsApp au format international, chiffres uniquement (sans + ni espaces)
  whatsapp: (process.env.WHATSAPP_NUMBER || '237659855617').replace(/\D/g, ''),
  timezone: 'Africa/Douala',
  // Délai minimum entre maintenant et l'heure souhaitée, en minutes
  delaiMinimum: 30,
  // On ne peut pas commander plus de N jours à l'avance
  joursMax: 30,
  // Doit rester identique au tableau des horaires de public/index.html
  horaires: {
    0: { ouvre: '11:00', ferme: '22:00' },
    1: { ouvre: '11:00', ferme: '23:00' },
    2: { ouvre: '11:00', ferme: '23:00' },
    3: { ouvre: '11:00', ferme: '23:00' },
    4: { ouvre: '11:00', ferme: '23:00' },
    5: { ouvre: '11:00', ferme: '02:00' },
    6: { ouvre: '11:00', ferme: '00:00' },
  },
};
