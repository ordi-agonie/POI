# Architecture

## Objectif technique

Créer une application personnelle simple, durable et utilisable principalement sur smartphone Android.

## Principes techniques

- Privilégier la simplicité.
- Éviter les dépendances inutiles.
- Garder les données sous le contrôle de l'utilisateur.
- Construire progressivement selon les besoins réels.
- Ne pas introduire prématurément une complexité destinée à des fonctionnalités hypothétiques.

## Plateforme

L'application est développée comme une Progressive Web App (PWA).

Ce choix permet notamment :

- une utilisation depuis un navigateur ;
- une installation sur Android ;
- un fonctionnement hors ligne ;
- l'utilisation de technologies web standards.

## Données

Les données utilisateur sont stockées localement sur l'appareil.

Le stockage initial utilise `localStorage`.

Les données doivent rester exportables afin de conserver le contrôle de l'utilisateur sur celles-ci.

Les POI sont représentés comme des objets JavaScript dans une collection en mémoire. L'interface est générée à partir de ces données.

## Modèle d'un POI

Un POI représente une unité de contenu que l'utilisateur souhaite conserver.

Le contenu est la seule information obligatoire. Les autres informations peuvent être ajoutées ou complétées ultérieurement.

Structure conceptuelle actuelle :

```text
POI
├── id
├── contenu
├── createdAt
├── statut
├── favori
├── raisonConservation
├── notes
└── provenance
    ├── origine ?
    │   ├── type
    │   ├── format    
    │   ├── source
    │   ├── titre
    │   ├── auteur
    │   ├── date
    │   ├── numero
    │   └── lien
    │
    ├── reference ?
    │   ├── type
    │   ├── format
    │   ├── source
    │   ├── titre
    │   ├── auteur
    │   ├── date
    │   ├── numero
    │   └── lien
    │
    └── decouverte ?
        ├── type
        ├── format
        ├── source
        ├── titre
        ├── auteur
        ├── date
        ├── numero
        └── lien
```
Les trois catégories de provenance ont la même structure.

- `origine` indique d'où provient le contenu conservé ;
- `reference` indique une source qui mentionne, cite ou référence ce contenu ;
- `decouverte` indique la source par laquelle l'utilisateur a personnellement découvert le contenu.

Ces rôles sont indépendants. Une même source peut remplir plusieurs rôles.