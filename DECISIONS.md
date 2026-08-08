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