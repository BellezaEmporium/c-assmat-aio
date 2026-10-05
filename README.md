# c-assmat-aio

Outil pour assister les assistantes maternelles [WIP]

## Stade du projet

### delta-1 <- NOUS SOMMES ICI

Base du site/squelette OK, frontend et backend communiquent ensemble proprement (login/accès aux pages).

### delta-2 à venir

Construction complète CRUD (Create/Read/Update/Delete)

Read déjà OK grâce à delta-1, mais consolidation requise depuis frontend/api.ts

### delta-3

Ajout logique export Excel depuis page existante (à fournir manuellement), devrait pouvoir ouvrir le fichier excel, le montrer et permettre à l'utilisateur d'adapter la logique de l'outil afin qu'il ne remplisse pas les pages qu'il ne faut pas. Détection de formules déjà écrites à voir également.

### beta

Revue visuelle du site afin de le rendre plus présentables, tests à faire.

## Installation du projet

### Via Docker

Utiliser le fichier docker-compose.yml et effectuer la commande

```
docker compose up
```

pour installer les différents serveurs sur votre machine. Ils devraient communiquer automatiquement par défaut, assurez-vous néanmoins que vos username/passwords MongoDB correspondent aussi dans l'environnement Laravel, afin d'éviter de vous prendre une erreur de connexion.

### Manuellement

Vous devez avoir PHP 8, Node 20 minimum ainsi que MongoDB Compass d'installé au sein de votre ordinateur.
Une fois MongoDB Compass installé, vérifiez le port auquel il communique afin de modifier les fichiers environnements nécessaire (un .env.example est disponible sur le backend)
Lorsque vous vous êtes assuré d'avoir modifié les fichiers correspondants, il vous suffit d'effectuer les commandes inscrites au sein de chaque partie du site, et vous devriez être bon pour la suite !
