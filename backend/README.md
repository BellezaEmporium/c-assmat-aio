## c-assmat-aio Backend

Vous êtes actuellement sur le backend de l'application c-assmat-aio. Ce backend est construit avec Laravel et fournit une API RESTful pour le frontend.

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/bellezaemporium/c-assmat-aio.git
cd c-assmat-aio/backend
# Installer les dépendances (Node & PHP)
composer install && npm i
# Copiez le fichier .env.example en .env et configurez vos variables d'environnement
cp .env.example .env
# Générez la clé de l'application
php artisan key:generate
# Migrer la base de la BDD vers le serveur de base de données et exécuter les seeders pour remplir la base de données avec des données initiales
php artisan migrate --seed
# Lancer le serveur de développement
php artisan serve
```

## Base de données

La base de données est actuellement de type Document et tourne sur MongoDB. Assurez-vous d'avoir MongoDB installé et en cours d'exécution sur votre machine. Vous pouvez configurer la connexion à la base de données dans le fichier `.env`.

## Points d'accès API

/api : Base du frontend pour toutes les requêtes API

/api/children : Récupère la liste des enfants
/api/children/{id} : Récupère les détails d'un enfant spécifique (utile pour le calcul des heures, des salaires et du rabattement impôts, basé sur l'employeur)

/api/contract : Récupère la liste des contrats
/api/contract/{id} : Récupère les détails d'un contrat spécifique

/api/employers : Récupère la liste des employeurs
/api/employers/{id} : Récupère les détails d'un employeur spécifique

/api/me : Récupère les informations de l'utilisateur actuellement authentifié

/api/login : Authentifie un utilisateur et retourne un token d'accès

/api/planning : Récupère le planning de l'utilisateur actuellement authentifié