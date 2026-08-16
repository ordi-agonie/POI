# Architecture

## Objectif technique

Créer une application personnelle simple, durable et principalement utilisable sur smartphone Android.

## Principes techniques

- Privilégier la simplicité.
- Éviter les dépendances inutiles.
- Garder les données sous le contrôle de l'utilisateur.
- Construire progressivement selon les besoins réels.
- Ne pas introduire prématurément de complexité pour des fonctionnalités hypothétiques.

## Plateforme

POI est développé comme une Progressive Web App (PWA).

La plateforme repose sur des technologies web standards et doit permettre :

- l'utilisation depuis un navigateur ;
- l'installation sur Android ;
- le fonctionnement hors ligne.

## Données

Les données utilisateur sont stockées localement sur l'appareil.

Le stockage initial utilise `localStorage`.

Les POI sont représentés comme des objets JavaScript dans une collection en mémoire. L'interface est générée à partir de ces données.

Les données doivent rester indépendantes de leur représentation HTML afin de permettre leur évolution et leur exportation.

## Modèle d'un POI

Un POI représente une unité de contenu que l'utilisateur souhaite conserver.

Structure actuelle :

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
    ├── reference ?
    └── decouverte ?
```

Le contenu est la seule information obligatoire.

## Provenance

Chaque provenance est facultative et peut être partiellement renseignée.
Les trois rôles utilisent la même structure :

```text
 provenance
├── type
├── format
├── source
├── titre
├── auteur
├── date
├── numero
└── lien
```
Les rôles sont :
`origine` : source d'origine du contenu ;
`reference` : source qui mentionne, cite ou référence le contenu ;
`decouverte` : source par laquelle l'utilisateur a découvert le contenu.
Une même source peut remplir plusieurs rôles.
