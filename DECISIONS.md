
### `DECISIONS.md`

```md
# Décisions

## Utiliser une PWA

**Décision :** développer l'application comme une Progressive Web App.

**Pourquoi :**

- utilisation depuis un navigateur ;
- installation possible sur Android ;
- technologies web standards ;
- possibilité d'ajouter progressivement des capacités hors ligne.

## Stocker initialement les données en local

**Décision :** utiliser `localStorage` pour le stockage initial des POI.

**Pourquoi :**

- simplicité ;
- aucune infrastructure serveur nécessaire ;
- données conservées sur l'appareil ;
- adapté au stade actuel du projet.

**Limite connue :**

`localStorage` n'est pas conçu pour une synchronisation entre appareils ni pour un stockage complexe. Une évolution pourra être envisagée si le besoin apparaît.

## Séparer les données de l'affichage

**Décision :** représenter les POI comme des objets JavaScript et générer leur affichage à partir de ces données.

**Pourquoi :**

Cela permet de modifier, supprimer, sauvegarder ou exporter les POI sans faire dépendre directement les données de leur représentation HTML.

## Donner un identifiant aux POI

**Décision :** chaque POI possède un identifiant unique.

**Pourquoi :**

Les opérations de modification et de suppression doivent pouvoir cibler précisément un POI indépendamment de sa position dans la liste.

## Conserver uniquement le contenu comme information obligatoire

**Décision :** aucune métadonnée n'est obligatoire lors de la capture d'un POI.

**Pourquoi :**

L'ajout doit rester suffisamment rapide pour permettre une capture spontanée. Les informations complémentaires peuvent être renseignées plus tard.

## Distinguer la date de création de la date de provenance

**Décision :** conserver séparément la date de création du POI et la date associée à sa provenance.

**Pourquoi :**

Ces dates répondent à deux questions différentes :

- `createdAt` → quand ai-je capturé ce POI ?
- `provenance.date` → quand la source a-t-elle été publiée ou diffusée ?

## Utiliser une provenance précise

**Décision :** la provenance décrit l'occurrence précise dont provient le contenu, tout en conservant la publication ou l'origine générale.

**Exemple :**

```text
publication : Le Monde diplomatique
titre       : Le vrai sens des "fake news"
auteurs     : Daniel Zamora
date        : 2025-07