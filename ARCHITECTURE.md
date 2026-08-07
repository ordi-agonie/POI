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

Les données métier sont séparées de leur affichage.

Les POI sont représentés comme des objets JavaScript stockés dans une collection en mémoire. L'affichage HTML est généré à partir de ces données.

Le stockage initial utilise localStorage afin de conserver les données localement sur l'appareil.

Cette organisation permet de faire évoluer progressivement l'application :
- modification et suppression des POI ;
- export des données ;
- évolution future du stockage.

## Organisation du code JavaScript

Les événements utilisateur déclenchent des fonctions dédiées.

La gestion des actions métier (création, modification, suppression) est séparée de la gestion des événements DOM afin de garder un code plus facilement maintenable.

## Évolution

Les fonctionnalités complexes (IA, recherche sémantique, synchronisation...) ne seront envisagées qu'après validation du besoin.
