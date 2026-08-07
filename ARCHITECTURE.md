# Architecture

## Objectif technique

Créer une application personnelle simple, durable et utilisable principalement sur smartphone Android.

## Principes

- Privilégier la simplicité.
- Éviter les dépendances inutiles.
- Garder les données sous le contrôle de l'utilisateur.
- Construire progressivement selon les besoins réels.

## Plateforme envisagée

Progressive Web App (PWA).

Raisons :
- accessible depuis un navigateur ;
- installable sur Android ;
- possibilité de fonctionner hors ligne ;
- développement possible avec des technologies web.

## Données

Les données utilisateur doivent être exportables.

Le stockage initial sera local.

## Structure applicative

L'application sépare progressivement les données métier de leur affichage.

Les POI sont représentés comme des objets JavaScript stockés dans une collection en mémoire. L'affichage HTML est généré à partir de ces données.

Cette séparation permet de faire évoluer plus facilement :
- la sauvegarde locale ;
- la modification et suppression des POI ;
- l'évolution future du stockage.

## Évolution

Les fonctionnalités complexes (IA, recherche sémantique, synchronisation...) ne seront envisagées qu'après validation du besoin.
