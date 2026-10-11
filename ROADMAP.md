# ROADMAP — Site web Heritage (Bastos, Yaounde)

## Instructions pour Claude (a lire avant toute action)

Tu es le developpeur unique de ce projet. Tu travailles seul, de maniere autonome,
en suivant les etapes ci-dessous dans l'ordre. Tu ne demandes pas confirmation
avant chaque petite decision technique : tu avances, tu documentes tes choix dans
la section "Journal" en bas de ce fichier, et tu ne poses une question a Audrey
que si tu es bloque par une information qu'elle seule peut donner (exemple :
un vrai numero de telephone, une adresse email).

Regle n°1 : avant de commencer, lis entierement ce fichier, surtout la section
"Etat d'avancement" en bas, pour savoir exactement ou le projet en est.

Regle n°2 : des qu'une etape est terminee et testee, coche sa case ci-dessous
et ecris 3 a 5 lignes dans le Journal (ce qui a ete fait, les choix techniques,
ce qu'il reste a faire). C'est ce qui te permet, dans une future conversation,
de reprendre sans tout relire.

Regle n°3 : fais les choses toi-meme. N'ecris pas "voici le code, a toi de
l'integrer" : cree ou modifie directement les fichiers du projet. Lance les
commandes necessaires (npm install, tests, etc.) et corrige les erreurs sans
attendre qu'Audrey te les retranscrive, sauf si tu n'as pas la main sur le
terminal — dans ce cas donne la commande exacte a copier-coller.

Regle n°4 : a la fin de CHAQUE etape, meme si tu pourrais continuer, arrete-toi,
mets a jour ce fichier, et dis a Audrey en une phrase ce qui est fait et quelle
est la prochaine etape. Elle decide quand enchainer.
A chaque fin d'etape, envoie-lui aussi le projet zippe (heritage-etape-N.zip,
sans node_modules, sans fichiers .db ni .env) avec SendUserFile.

Regle n°5 (securite) : c'est le domaine d'Audrey, pas seulement le tien.
Applique les bonnes pratiques par defaut (requetes parametrees, mots de passe
haches avec bcrypt, validation des entrees, pas de secret en dur dans le code,
protection CSRF sur /admin). A l'etape Audit, explique-lui clairement CE QUE tu
as verifie et pourquoi, pour qu'elle puisse te challenger.

---

## Contexte du projet

Site vitrine + commande en ligne pour un restaurant fictif-portfolio nomme
Heritage, situe a Bastos, Yaounde, Cameroun. Cuisine locale (poulet/poisson
grille, ndole, taro) et occidentale (burgers, pizzas, tacos). Ambiance
conviviale, soiree karaoke le vendredi.

Objectif : projet de portfolio pour demarcher des clients freelance a Yaounde.
Le restaurant Heritage existe reellement mais n'a pas encore de site : ce
projet sert d'abord de demo a lui presenter, pas un site deja commande par lui.

Stack : Node.js + Express (backend), HTML/CSS/JS (frontend), SQLite (donnees),
Nodemailer (email). Pas de compte client. Mobile-first.

---

## Etat d'avancement

- [x] Etape 0 — Initialisation du projet (structure de dossiers, package.json,
      serveur Express minimal qui repond "OK", connexion SQLite, premieres
      tables : plats, categories)
- [x] Etape 1 — Page d'accueil (banniere, accroche "Cuisine locale et
      internationale au coeur de Bastos", points forts, infos pratiques,
      adresse/horaires/telephone/carte, footer Facebook/Instagram)
- [ ] Etape 2 — Page Menu (plats par categories : Grillades, Plats locaux,
      Occidental, Boissons ; filtres par categorie ; tri par prix ; fiche
      plat avec photo/nom/description/prix/bouton "Ajouter au panier")
- [ ] Etape 3 — Panier (icone fixe avec compteur, volet ou page panier,
      quantites modifiables, total automatique, bouton "Commander")
- [ ] Etape 4 — Commande version A : formulaire (nom, telephone, date/heure
      souhaitees) qui genere un lien WhatsApp pre-rempli avec le recapitulatif
- [ ] Etape 5 — Commande version B : meme formulaire, envoi automatique d'un
      email a l'administrateur via Nodemailer avec le detail de la commande
- [ ] Etape 6 — Interface /admin : connexion securisee (bcrypt, session,
      CSRF, limitation des tentatives), liste des plats, ajout/modification/
      suppression, changement de prix, upload de photo, bouton
      "epuise/disponible", gestion des categories, utilisable sur telephone
- [ ] Etape 7 — Audit de securite : relecture complete du code par Claude,
      rapport ecrit des points verifies et des risques residuels, pour
      qu'Audrey puisse tester elle-meme les points cles
- [ ] Etape 8 — Finitions : design responsive verifie sur mobile, README
      clair, captures d'ecran pour le portfolio Upwork, courte video de demo

---

## Journal (rempli par Claude au fur et a mesure)

### Etape 0 — termine le 2026-10-11
- Structure : /src (server.js, db.js), /public (vide, pour l'etape 1), /db
  (fichier heritage.db cree au demarrage, ignore par git), /test (smoke.js).
- Express + better-sqlite3 (synchrone, plus simple ici). Route GET /health
  repond "OK". Variables d'environnement : PORT, DB_FILE. Lancer : npm start.
- Tables : categories (id, name unique) et dishes (id, name, description,
  price en FCFA entier, category_id -> categories, photo_url, available 0/1).
  Choix : category_id (cle etrangere) plutot qu'un nom en texte, pour que la
  gestion des categories de l'etape 6 reste propre.
- 4 categories inserees au demarrage (Grillades, Plats locaux, Occidental,
  Boissons), de maniere idempotente. Aucun plat n'est encore insere.
- Test : npm test (smoke.js) verifie /health, les categories et les colonnes.
- Prochaine etape : Etape 1 (page d'accueil). Info a demander a Audrey a ce
  moment-la : vrai telephone, horaires, liens Facebook/Instagram (sinon
  valeurs fictives clairement marquees).

### Etape 1 — termine le 2026-10-11
- Fichiers : public/index.html, public/css/style.css, public/js/home.js.
  Sections : hero (accroche + statut ouvert/ferme + 2 boutons), points forts,
  bandeau karaoke du vendredi, "Nous trouver" (adresse, telephone, horaires,
  carte OpenStreetMap), footer Facebook/Instagram. Teste mobile (390px),
  1280px et 1920px : pas de scroll horizontal, contenu aligne, pas d'erreur JS.
- Design (skill frontend-design) : fond taro (violet-gris), vert ndole, orange
  braise, violet nuit pour le karaoke. Titres Bricolage Grotesque, texte
  Instrument Sans (Google Fonts). Barres de grill en bas du hero.
- Le statut "Ouvert maintenant / Ferme" est calcule en JS a partir du tableau
  des horaires (source unique : attributs data- du HTML), en heure de Yaounde.
- VALEURS FICTIVES a remplacer par les vraies : telephone (+237 600 000 000,
  dans index.html, lien tel:), horaires (tableau .horaires dans index.html),
  liens Facebook/Instagram (href="#" dans le footer), adresse exacte (rue) et
  position du marqueur de la carte (coordonnees approximatives de Bastos).
- Liens "Menu" pointent vers /menu.html (cree a l'etape 2, 404 d'ici la).
- Pour l'audit (etape 7) : la carte est une iframe externe (OpenStreetMap) et
  les polices viennent de Google Fonts ; prevoir une politique CSP adaptee.
- Prochaine etape : Etape 2 (page Menu : categories, filtres, tri par prix,
  fiches plats, plats de demonstration a inserer en base).

<!-- Exemple de format a respecter :
### Etape 0 — termine le 2026-10-11
- Structure : /src, /public, /db. Express + better-sqlite3 choisis (plus
  simple que sqlite3 async pour ce projet).
- Tables creees : dishes (id, name, description, price, category, photo_url,
  available), categories (id, name).
- Prochaine etape : Etape 1 (page d'accueil).
→
