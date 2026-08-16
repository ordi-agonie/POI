# Décisions

## Utiliser une PWA

**Décision :** développer POI comme une Progressive Web App.

**Pourquoi :**
- utilisation depuis un navigateur ;
- installation possible sur Android ;
- technologies web standards ;
- possibilité d'ajouter progressivement le fonctionnement hors ligne.

## Stocker initialement les données en local

**Décision :** utiliser `localStorage` pour le stockage initial des POI.

**Pourquoi :**
- simplicité ;
- aucune infrastructure serveur ;
- données conservées sur l'appareil ;
- adapté au stade actuel du projet.

**Limite :**

`localStorage` ne convient pas à la synchronisation entre appareils ni aux besoins de stockage complexes. Une évolution pourra être envisagée si un besoin réel apparaît.

## Séparer les données de l'affichage

**Décision :** représenter les POI comme des objets JavaScript et générer leur affichage à partir de ces données.

**Pourquoi :**

Les données peuvent ainsi être modifiées, supprimées, sauvegardées ou exportées indépendamment de leur représentation HTML.

## Donner un identifiant aux POI

**Décision :** chaque POI possède un identifiant unique.

**Pourquoi :**

Les opérations de modification et de suppression doivent pouvoir cibler précisément un POI indépendamment de sa position dans la liste.

## Ne rendre que le contenu obligatoire

**Décision :** le contenu est la seule information obligatoire lors de la création d'un POI.

**Pourquoi :**

La capture doit rester suffisamment rapide pour permettre une saisie spontanée. Les informations complémentaires peuvent être ajoutées plus tard.

## Utiliser une provenance facultative et partielle

**Décision :** les informations de provenance sont facultatives et peuvent être incomplètes.

Un POI peut distinguer trois rôles :

- `origine` ;
- `reference` ;
- `decouverte`.

Ces rôles sont indépendants et une même source peut remplir plusieurs rôles.

Chaque provenance peut contenir :

- `type` ;
- `format` ;
- `source` ;
- `titre` ;
- `auteur` ;
- `date` ;
- `numero` ;
- `lien`.

**Pourquoi :**

Les POI peuvent provenir de sources très différentes et les informations disponibles peuvent varier. Le modèle doit permettre de conserver une provenance partielle sans empêcher l'enregistrement.

## Distinguer le type et le format

**Décision :** `type` et `format` représentent deux informations différentes.

- `type` décrit la nature du contenu : article, livre, émission, vidéo, etc. ;
- `format` décrit la forme sous laquelle il est rencontré : texte, audio, vidéo, etc.

Le `format` est facultatif et n'est conservé que lorsqu'il apporte une information supplémentaire.

**Pourquoi :**

Une émission peut par exemple être rencontrée sous forme audio ou vidéo. Cette distinction évite de confondre la nature d'une source avec son support.

## Conserver les informations non encore structurées dans les notes

**Décision :** utiliser `notes` pour les informations qui ne disposent pas encore d'un champ structuré.

**Pourquoi :**

Cela permet de conserver l'information sans créer prématurément une structure dédiée.

## Ne pas sur-structurer le modèle

**Décision :** ne pas ajouter de champs ou de structures uniquement pour des fonctionnalités hypothétiques.

**Pourquoi :**

Le modèle doit évoluer à partir des usages réels plutôt qu'à partir de besoins supposés.

## Redécouvrir les POI de manière contrôlée

**Décision :** la V1 propose une redécouverte aléatoire sous deux formes :

- un **POI du jour**, choisi aléatoirement une fois par jour calendaire ;
- un **parcours aléatoire**, dans lequel un seul POI est présenté à la fois et où l'utilisateur demande explicitement le suivant.

Aucun enchaînement automatique de POI n'est prévu.

**Pourquoi :**

La redécouverte doit favoriser la rencontre d'idées oubliées sans transformer l'application en flux de contenu à consommer continuellement.

Les mécanismes de sélection par thèmes ou autres critères sont volontairement reportés.

## Faire évoluer le format des données sans perte d'information

**Décision :** les nouvelles versions du modèle doivent rester compatibles avec les données enregistrées dans les versions précédentes lorsque cela est possible.

Lorsqu'un champ est ajouté :
- les anciennes données qui ne possèdent pas ce champ sont complétées par une valeur par défaut ;
- les données existantes ne sont pas supprimées ;
- les champs supplémentaires présents dans un ancien export ne doivent pas être supprimés sans décision explicite.

Lorsqu'un champ existant change de structure ou de signification :
- une migration explicite doit être envisagée ;
- la transformation ne doit pas être effectuée silencieusement si elle risque d'entraîner une perte d'information.

**Pourquoi :**

Les données des POI appartiennent à l'utilisateur. L'évolution du modèle ne doit donc pas rendre inutilisables les exports réalisés avec une version antérieure de l'application.

La fonction de normalisation constitue le mécanisme initial permettant de compléter les champs manquants lors du chargement ou de l'import.
