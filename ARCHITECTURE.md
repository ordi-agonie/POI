# Architecture

## Objectif technique

Créer une application personnelle simple, durable et utilisable principalement sur smartphone Android.

## Principes

- Privilégier la simplicité.
- Éviter les dépendances inutiles.
- Garder les données sous le contrôle de l'utilisateur.
- Construire progressivement selon les besoins réels.

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

## Organisation du code

Les événements DOM déclenchent des fonctions dédiées.

La logique métier des POI (création, affichage, modification, suppression et sauvegarde) est séparée de la gestion des événements utilisateur.

Cette séparation permet de faire évoluer les fonctionnalités sans concentrer toute la logique dans les gestionnaires d'événements.

## Évolution

L'architecture actuelle reste volontairement simple.

Les besoins futurs pourront conduire à faire évoluer :
- le stockage ;
- l'export des données ;
- la structure des POI ;
- l'organisation du code.
