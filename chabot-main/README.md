# Atelier chatbot

Durée : 2 heures. Commencer par lire **CONSIGNES.md**.

## Démarrer

1. Décompresser l’archive et ouvrir le dossier atelier-chatbot dans VS Code.
2. Dans le terminal intégré, vérifier `node --version` et `npm --version`.
3. Depuis le dossier contenant package.json, lancer `npm run dev`.
4. Ouvrir http://127.0.0.1:3000/ dans le navigateur.

Node.js 22 ou plus récent est attendu. Aucune dépendance externe à installer. La page vide au départ est normale : vous devez construire le HTML.

## Vos fichiers

- public/index.html : construire le contenu et les contrôles.
- public/style.css : réaliser la présentation.
- public/script.js : programmer les réponses et les interactions.
- REPONSES.md : expliquer vos choix à la fin de l’exercice.

Le serveur du dossier infrastructure est fourni et ne fait pas partie du travail demandé. Il n’exécute pas le script de la page : ce script s’exécute dans le navigateur.

## Commandes

- `npm run dev` ou `npm start` : démarrer le serveur local.
- `npm run verifier` : vérifier uniquement la syntaxe du fichier JavaScript. Une réussite ne garantit pas que les fonctions sont complétées ou que le chatbot fonctionne.
- `Ctrl+C` : arrêter le serveur.
- `npm run dev -- 3001` : utiliser un autre port s’il est occupé.

Enregistrer puis recharger le navigateur après chaque modification. Ouvrir sa console pour lire les erreurs. Ne pas lancer public/script.js directement avec Node.js : il utilisera document, fourni par le navigateur.
