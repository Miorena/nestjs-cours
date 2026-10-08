<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# nestjs-cours

API REST de gestion de tâches, construite avec **NestJS**, **TypeORM** et **PostgreSQL**.
Projet d'apprentissage qui va au-delà du CRUD : validation des données, pagination, filtrage, tri, recherche et statistiques.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancer l'application](#lancer-lapplication)
- [Documentation de l'API](#documentation-de-lapi)
- [Validation et erreurs](#validation-et-erreurs)
- [Structure du projet](#structure-du-projet)
- [Scripts npm](#scripts-npm)
- [Notes importantes](#notes-importantes)
- [Prochaines étapes](#prochaines-étapes)

## Fonctionnalités

- CRUD sur les tâches (création, lecture, suppression, marquage comme terminée)
- Persistance dans **PostgreSQL** via TypeORM
- Validation stricte des données entrantes (`class-validator`, `ValidationPipe`)
- Pagination, filtrage, recherche textuelle et tri sur la liste des tâches
- Route de statistiques (`total`, `done`, `pending`)
- Gestion propre des erreurs HTTP (400, 404)

## Stack technique

| Outil | Rôle |
|---|---|
| [NestJS](https://nestjs.com) | Framework backend (TypeScript) |
| [TypeORM](https://typeorm.io) | ORM (entités, repositories) |
| [PostgreSQL](https://www.postgresql.org) | Base de données |
| `class-validator` / `class-transformer` | Validation et transformation des DTO |
| `@nestjs/config` | Lecture des variables d'environnement (`.env`) |
| Jest | Tests |

## Prérequis

- [Node.js](https://nodejs.org) **20 ou plus** (version LTS recommandée)
- npm
- Un serveur **PostgreSQL** accessible en local (port `5432` par défaut)

## Installation

```bash
git clone <url-du-depot>
cd nestjs-cours
npm install
```

Créer la base de données :

```sql
CREATE DATABASE nestjs_cours;
```

## Configuration

Créer un fichier `.env` à la **racine** du projet :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=nestjs_cours
PORT=3000
```

| Variable | Description | Valeur par défaut |
|---|---|---|
| `DB_HOST` | Hôte PostgreSQL | — |
| `DB_PORT` | Port PostgreSQL | `5432` |
| `DB_USER` | Utilisateur | — |
| `DB_PASSWORD` | Mot de passe | — |
| `DB_NAME` | Nom de la base | — |
| `PORT` | Port de l'API | `3000` |

> Le fichier `.env` contient des secrets : il ne doit **jamais** être commité (vérifier qu'il figure dans `.gitignore`).

## Lancer l'application

```bash
# Développement (rechargement automatique)
npm run start:dev

# Production (compiler puis lancer)
npm run build
npm run start:prod
```

L'API est disponible sur `http://localhost:3000`.
Au premier démarrage, la table `tasks` est créée automatiquement.

## Documentation de l'API

### Modèle `Task`

| Champ | Type | Description |
|---|---|---|
| `id` | `number` | Identifiant auto-incrémenté |
| `title` | `string` | Titre (100 caractères maximum) |
| `done` | `boolean` | État de la tâche (`false` à la création) |

### Routes

| Méthode | URL | Description | Succès |
|---|---|---|---|
| `GET` | `/tasks` | Liste paginée, filtrée et triée | `200` |
| `GET` | `/tasks/stats` | Statistiques globales | `200` |
| `GET` | `/tasks/:id` | Détail d'une tâche | `200` |
| `POST` | `/tasks` | Créer une tâche | `201` |
| `PATCH` | `/tasks/:id/done` | Marquer une tâche comme terminée | `200` |
| `DELETE` | `/tasks/:id` | Supprimer une tâche | `204` |

### Paramètres de `GET /tasks`

| Paramètre | Type | Défaut | Règles |
|---|---|---|---|
| `page` | entier | `1` | `≥ 1` |
| `limit` | entier | `10` | entre `1` et `100` |
| `done` | booléen | — | `true` ou `false` |
| `search` | texte | — | Recherche insensible à la casse dans le titre |
| `sortBy` | texte | `id` | `id`, `title` ou `done` |
| `order` | texte | `ASC` | `ASC` ou `DESC` |

### Exemples

```bash
# Créer une tâche
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Apprendre NestJS"}'

# Lister : 2e page de 5 tâches non terminées, triées par titre décroissant
curl "http://localhost:3000/tasks?page=2&limit=5&done=false&sortBy=title&order=DESC"

# Rechercher
curl "http://localhost:3000/tasks?search=nest"

# Marquer comme terminée
curl -X PATCH http://localhost:3000/tasks/1/done

# Statistiques
curl http://localhost:3000/tasks/stats

# Supprimer
curl -X DELETE http://localhost:3000/tasks/1
```

### Format des réponses

`GET /tasks` :

```json
{
  "items": [
    { "id": 1, "title": "Apprendre NestJS", "done": false }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

`GET /tasks/stats` :

```json
{ "total": 25, "done": 7, "pending": 18 }
```

## Validation et erreurs

Un `ValidationPipe` global est activé avec `whitelist`, `forbidNonWhitelisted` et `transform` :

- les champs non déclarés dans un DTO sont **refusés** ;
- les types sont vérifiés (`title` doit être un texte non vide) ;
- les paramètres d'URL sont convertis (`ParseIntPipe`).

| Cas | Réponse |
|---|---|
| Corps invalide (titre vide, champ inconnu…) | `400 Bad Request` |
| `:id` non numérique, `page=0`, `limit=1000`… | `400 Bad Request` |
| Tâche inexistante | `404 Not Found` |

Exemple de réponse d'erreur :

```json
{
  "message": ["title should not be empty"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Structure du projet

```
src/
├── main.ts                      # Point d'entrée, ValidationPipe global
├── app.module.ts                # Module racine (config, connexion TypeORM)
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts      # Routes HTTP
    ├── tasks.service.ts         # Logique métier
    ├── task.entity.ts           # Entité TypeORM (table tasks)
    └── common/
        └── pagination-query.dto.ts
    └── dto/
        ├── create-task.dto.ts
        ├── update-task.dto.ts
        └── query-task.dto.ts
```

## Scripts npm

| Commande | Rôle |
|---|---|
| `npm run start:dev` | Démarre l'API avec rechargement automatique |
| `npm run build` | Compile le TypeScript vers `dist/` |
| `npm run start:prod` | Lance la version compilée |
| `npm test` | Lance les tests unitaires |

## Notes importantes

- **`synchronize: true`** est activé dans la configuration TypeORM : les tables sont créées et modifiées automatiquement à partir des entités. C'est pratique en développement, mais **à ne pas utiliser en production** (risque de perte de données). Il faudra passer aux migrations.
- La pagination par `offset` convient aux volumes modestes ; une pagination par curseur serait préférable sur de très grandes tables.

## Prochaines étapes

- [ ] Relations entre entités (utilisateurs, tags)
- [ ] Authentification (JWT) et autorisation (rôles, propriétaire)
- [ ] Intercepteurs, filtres d'exceptions et logs
- [ ] Documentation Swagger / OpenAPI
- [ ] Migrations TypeORM
- [ ] Tests unitaires et end-to-end
- [ ] Conteneurisation (Docker)
