const path = require('path');
const express = require('express');
const db = require('./db');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.type('text').send('OK');
});

// Menu public : catégories et plats (requêtes sans paramètre utilisateur)
app.get('/api/menu', (req, res) => {
  const categories = db.prepare('SELECT id, name FROM categories ORDER BY id').all();
  const dishes = db
    .prepare(
      `SELECT id, name, description, price, category_id AS categoryId, photo_url AS photoUrl, available
       FROM dishes ORDER BY category_id, id`
    )
    .all()
    .map((d) => ({ ...d, available: d.available === 1 }));
  res.json({ categories, dishes });
});

// Réglages publics nécessaires à la page de commande (rien de secret ici)
app.get('/api/config', (req, res) => {
  res.json({
    whatsapp: config.whatsapp,
    timezone: config.timezone,
    delaiMinimum: config.delaiMinimum,
    joursMax: config.joursMax,
    horaires: config.horaires,
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Heritage en ligne sur http://localhost:${PORT}`));
}

module.exports = app;
