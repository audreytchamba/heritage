const assert = require('assert');
process.env.DB_FILE = ':memory:';
const app = require('../src/server');
const db = require('../src/db');

const server = app.listen(0, async () => {
  try {
    const { port } = server.address();
    const res = await fetch(`http://localhost:${port}/health`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(await res.text(), 'OK');

    const cats = db.prepare('SELECT name FROM categories ORDER BY id').all().map((c) => c.name);
    assert.deepStrictEqual(cats, ['Grillades', 'Plats locaux', 'Occidental', 'Boissons']);

    const cols = db.prepare('PRAGMA table_info(dishes)').all().map((c) => c.name);
    ['id', 'name', 'description', 'price', 'category_id', 'photo_url', 'available'].forEach((c) =>
      assert.ok(cols.includes(c), `colonne manquante: ${c}`)
    );
    const home = await fetch(`http://localhost:${port}/`);
    assert.strictEqual(home.status, 200);
    const html = await home.text();
    assert.ok(html.includes('Cuisine locale et internationale au cœur de Bastos'), 'accroche absente');
    assert.ok(html.includes('id="infos"'), 'section infos absente');
    for (const f of ['/css/style.css', '/js/home.js']) {
      const r = await fetch(`http://localhost:${port}${f}`);
      assert.strictEqual(r.status, 200, `${f} introuvable`);
    }
    console.log('Smoke test OK');
  } catch (e) {
    console.error('Smoke test ECHEC:', e.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
