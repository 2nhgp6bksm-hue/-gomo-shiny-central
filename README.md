# GoMo Shiny Central — Cloudflare v1.0

Ce projet crée une **nouvelle page Cloudflare** sans modifier le vrai GoMo Shiny Radar sur Netlify.

## Mise à jour des serveurs

- `/api/shiny-data` lit directement le fichier de données public du Radar Shiny existant :
  `https://timely-meringue-812f51.netlify.app/data/historique-central.json`
- Si le fichier du Radar est mis à jour, cette nouvelle page récupère la nouvelle donnée à l'ouverture / actualisation.
- Si le Radar source est temporairement indisponible, la page utilise `public/data/fallback.json`.
- Si aucune confirmation du jour n'existe encore, la page calcule automatiquement le groupe probable avec le cycle confirmé **A → C → B**.
- Le serveur **1591** reste géré séparément et exclu des listes extérieures.

## Déploiement Cloudflare depuis GitHub

1. Créer un nouveau dépôt GitHub, par exemple `gomo-shiny-central`.
2. Ajouter **tout le contenu de ce dossier à la racine** du dépôt.
3. Dans Cloudflare : **Workers & Pages → Create → Import a repository**.
4. Choisir le dépôt `gomo-shiny-central`.
5. Commande de déploiement : `npx wrangler deploy`
6. Aucune commande de build n'est nécessaire.

Le Worker sert la page et agit aussi comme relais sécurisé entre Cloudflare et le JSON du Radar Netlify, donc aucune modification du site Radar existant n'est nécessaire.
