# Specification

## Vision

POI est une application personnelle permettant de capturer, organiser, retrouver et redécouvrir des citations, concepts et idées afin de pouvoir les réutiliser au moment opportun.

## Utilisateur

POI est destiné à un usage personnel.

## Capture

- Ajouter un POI.
- Le contenu est la seule information obligatoire.
- Les informations complémentaires peuvent être renseignées ultérieurement.
- La capture initiale doit pouvoir rester très rapide.

## Gestion

- Lister les POI.
- Modifier un POI.
- Supprimer un POI.
- Marquer un POI comme favori.
- Identifier les POI à classer.

## Enrichissement

Un POI peut être progressivement enrichi avec :

- une raison de conservation ;
- des notes complémentaires ;
- des informations de provenance.

Les informations complémentaires sont facultatives.

## Provenance

Lorsqu'elle est disponible, la provenance peut être renseignée.

Une provenance peut notamment comprendre :

- un type de source ;
- une source ;
- un titre ;
- un auteur ;
- une date ;
- un numéro de publication ou d'épisode ;
- un lien.

Un POI peut avoir :

- une provenance principale ;
- éventuellement une provenance de découverte lorsqu'elle est différente.

Les informations de provenance sont facultatives et peuvent être partiellement renseignées.

Certaines informations bibliographiques ou autres peuvent provisoirement être conservées dans les notes lorsqu'elles ne disposent pas encore d'un champ dédié.

## Types de contenu

Un POI peut notamment être :

- une phrase ;
- plusieurs phrases ;
- un extrait d'article ;
- un passage de livre ;
- une retranscription de podcast ;
- une retranscription de vidéo ;
- une idée ou formulation personnelle ;
- une information lexicale ;
- toute autre formulation ou information que l'utilisateur souhaite conserver.

La longueur du contenu n'est pas limitée par le modèle conceptuel.

## Données

- Stockage local initial.
- Les données doivent rester exportables.
- Le format de données doit pouvoir évoluer sans perte d'information.

L'export et l'import JSON pourront être ajoutés ou développés selon les besoins réels.

## Organisation et recherche

L'organisation et la recherche avancées ne sont pas encore figées.

Les besoins suivants pourront être développés ultérieurement :

- thèmes ;
- mots-clés ;
- groupes personnels ;
- recherche par auteur ;
- recherche par source ;
- recherche sémantique ;
- relations entre POI.

Ces fonctionnalités ne doivent pas être intégrées prématurément au modèle.

## Découverte

Les mécanismes de redécouverte des POI pourront être développés progressivement.

Les favoris constituent le premier mécanisme de redécouverte.

D'autres mécanismes, comme l'affichage aléatoire ou des suggestions, pourront être ajoutés si leur utilité est confirmée.

## Hors périmètre V1

- IA.
- Recherche sémantique.
- Synchronisation cloud.
- Comptes utilisateurs.
- OCR.
- Audio.
- Graphe de connaissances.
- Relations entre POI.
- Groupes personnels.
- Bibliographie structurée avancée.
- Localisation précise dans une source.