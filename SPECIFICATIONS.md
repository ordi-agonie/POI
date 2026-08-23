# Specification

## Vision

POI est une application personnelle permettant de capturer, organiser, retrouver et redécouvrir des citations, concepts et idées afin de pouvoir les réutiliser au moment opportun.

## Utilisateur

POI est destiné à un usage personnel.

## Capture

- Ajouter un POI.
- Le contenu est la seule information obligatoire.
- Les informations complémentaires peuvent être renseignées ultérieurement.
- La capture initiale doit rester rapide.

## Gestion

- Lister les POI.
- Modifier un POI.
- Supprimer un POI.
- Marquer un POI comme favori.
- Identifier les POI à classer.

## Recherche

La recherche plein texte :

- porte sur le contenu du POI ;
- est insensible à la casse ;
- s'effectue au fur et à mesure de la saisie.

Lorsque la recherche est vide, tous les POI sont affichés.

Lorsqu'aucun POI ne correspond, un message est affiché.

La recherche ne porte pas encore sur les métadonnées.

## Enrichissement

Un POI peut contenir :

- une raison de conservation ;
- des notes complémentaires ;
- des informations de provenance.

Ces informations sont facultatives.

## Provenance

Un POI peut avoir trois types de provenance :

- `origine` ;
- `reference` ;
- `decouverte`.

Chaque provenance peut contenir :

- `type` ;
- `format` ;
- `source` ;
- `titre` ;
- `auteur` ;
- `date` ;
- `numero` ;
- `lien`.

Les provenances sont facultatives et peuvent être partiellement renseignées.

Le `format` est facultatif et n'est utilisé que lorsqu'il apporte une information supplémentaire par rapport au `type`.

## Types de contenu

Un POI peut contenir notamment :

- une phrase ;
- plusieurs phrases ;
- un extrait ;
- un passage de livre ;
- une retranscription ;
- une idée personnelle ;
- une information lexicale ;
- toute autre information que l'utilisateur souhaite conserver.

Le modèle conceptuel n'impose pas de longueur maximale au contenu.

## Découverte

La V1 propose deux mécanismes de redécouverte.

### POI du jour

- Un POI est sélectionné aléatoirement une fois par jour calendaire.
- Le même POI reste proposé pendant toute la journée.
- Un nouveau POI est sélectionné le jour calendaire suivant.

### Parcours aléatoire

- Un seul POI est affiché à la fois.
- Le POI est sélectionné aléatoirement.
- L'utilisateur demande explicitement le POI suivant.
- Aucun enchaînement automatique de POI n'est effectué.

Les mécanismes de redécouverte par thèmes ou selon d'autres critères ne font pas partie de la V1.

## Données

- Les données sont stockées localement.
- Les données peuvent être exportées au format JSON.
- Les données peuvent être importées depuis un fichier JSON.
- L'import accepte les exports des versions précédentes lorsqu'ils sont compatibles avec le modèle actuel.
- L'évolution du format ne doit pas entraîner de perte d'information.