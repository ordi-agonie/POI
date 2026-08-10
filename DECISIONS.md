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

## Utiliser une provenance facultative et partielle

**Décision :** un POI peut comporter une ou plusieurs informations de provenance, sans que celles-ci soient obligatoires ni nécessairement complètes.

Une provenance peut notamment contenir :

- `type` ;
- `source` ;
- `titre` ;
- `auteur` ;
- `date` ;
- `numero` ;
- `lien`.

**Pourquoi :**

Les POI réels peuvent provenir de sources très différentes et les informations disponibles au moment de la capture sont variables.

Le modèle doit pouvoir conserver une provenance incomplète sans empêcher l'enregistrement du POI.

## Distinguer la provenance principale de la provenance de découverte

**Décision :** lorsqu'un contenu est découvert dans une source différente de sa source d'origine, les deux provenances peuvent être distinguées.

**Pourquoi :**

Un article peut par exemple citer un livre, une personne ou un article antérieur. Confondre la source qui contient le contenu et la source dans laquelle l'utilisateur l'a découvert ferait perdre une information utile.

La provenance de découverte reste facultative et n'est utilisée que lorsqu'elle apporte une information réelle.

## Conserver une zone de notes non structurées

**Décision :** un POI peut contenir des notes complémentaires destinées aux informations qui ne disposent pas encore d'un champ structuré.

**Pourquoi :**

Il est préférable de conserver une information imparfaitement structurée plutôt que de la perdre ou de créer prématurément un champ spécifique.

Le champ `notes` pourra être progressivement remplacé ou complété par des champs dédiés lorsque les usages réels justifieront cette évolution.

## Ne pas sur-structurer le modèle

**Décision :** ne pas ajouter de champs ou de structures uniquement pour des fonctionnalités hypothétiques.

**Pourquoi :**

Le modèle doit évoluer à partir des usages réels des POI.

Les thèmes, mots-clés, groupes, relations entre POI, bibliographie détaillée, localisation précise dans une source et autres métadonnées spécialisées pourront être ajoutés ultérieurement si leur utilité est démontrée.

## Privilégier la conservation de l'information à sa normalisation immédiate

**Décision :** lorsqu'une information ne trouve pas encore naturellement sa place dans le modèle, elle doit pouvoir être conservée sans être perdue, notamment dans `notes`.

**Pourquoi :**

Le modèle est encore expérimental. Une normalisation trop précoce risquerait de conduire à des migrations répétées et à une complexité inutile.

Les données réelles serviront de base aux futures évolutions du modèle.