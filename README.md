# GoMo Shiny Central — Cloudflare v1.0

Ce projet crée une **nouvelle page Cloudflare** sans modifier le vrai GoMo Shiny Radar sur Netlify.

## Mise à jour des serveurs

- La page embarque une archive vérifiée de **21 journées consécutives** (du 21 juillet au 10 août 2026) et en déduit la rotation confirmée **A → C → B**.
- Le jour courant est calculé dans le fuseau **Europe/Brussels**, y compris si la page reste ouverte au passage de minuit.
- `/api/shiny-data` tente aussi de lire le fichier public du Radar Shiny existant :
  `https://timely-meringue-812f51.netlify.app/data/historique-central.json`
- Une nouvelle journée distante n'est acceptée que si elle est confirmée et correspond exactement à l'un des trois groupes connus. Elle devient alors le nouvel ancrage du calcul.
- Si la source distante est indisponible ou invalide, la page continue de fonctionner avec `fallback.json` et calcule automatiquement le bon groupe quotidien.
- Le serveur **1591** reste géré séparément et exclu des listes extérieures.

La mise en page, les couleurs et l'image `shiny-hero.png` restent fixes ; seuls le groupe, le taux, le nombre, le statut et la liste des serveurs changent.

## Déploiement Cloudflare depuis GitHub

1. Créer un nouveau dépôt GitHub, par exemple `gomo-shiny-central`.
2. Ajouter **tout le contenu de ce dossier à la racine** du dépôt.
3. Dans Cloudflare : **Workers & Pages → Create → Import a repository**.
4. Choisir le dépôt `gomo-shiny-central`.
5. Commande de déploiement : `npx wrangler deploy`
6. Aucune commande de build n'est nécessaire.

Le Worker sert la page et agit aussi comme relais sécurisé entre Cloudflare et le JSON du Radar Netlify, donc aucune modification du site Radar existant n'est nécessaire.
