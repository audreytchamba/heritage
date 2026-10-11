const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_DIR = path.join(__dirname, '..', 'db');
const DB_FILE = process.env.DB_FILE || path.join(DB_DIR, 'heritage.db');

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS dishes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price       INTEGER NOT NULL CHECK (price >= 0), -- en FCFA
    category_id INTEGER NOT NULL REFERENCES categories(id),
    photo_url   TEXT,
    available   INTEGER NOT NULL DEFAULT 1 CHECK (available IN (0, 1))
  );
`);

// Categories de base (idempotent)
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
['Grillades', 'Plats locaux', 'Occidental', 'Boissons'].forEach((n) => insertCategory.run(n));

module.exports = db;
