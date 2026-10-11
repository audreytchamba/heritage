const path = require('path');
const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.type('text').send('OK');
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Heritage en ligne sur http://localhost:${PORT}`));
}

module.exports = app;
