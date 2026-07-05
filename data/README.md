# Données de test — RePair AI

Deux fichiers CSV, un par persona, avec les **questions du formulaire telles qu'elles apparaissent** en en-tête de colonne. Ce sont les données réellement utilisées par l'app de démo : elles ont été importées dans `frontend/src/app/data/mockData.ts` (`MOCK_CHERCHEURS` et `MOCK_ACCOMPAGNANTS`).

- `chercheurs_filled.csv` — 5 personnes recherchant un accompagnement (Sarah, Rayan, Lina, Maya, Hugo)
- `accompagnants_filled.csv` — 12 personnes souhaitant accompagner (Nadia, Yanis, Claire, Mehdi, Sofia, Lucas, Emma, Karim, Julie, Olivier, Inès, Thomas)

Pour ajouter ou modifier des profils : édite ces CSV, puis répercute les changements dans `mockData.ts` (demande-le, je peux le faire).

## Conventions

- **Délimiteur** : virgule (CSV standard). Les champs texte contenant des virgules sont entre guillemets.
- **Champs à choix multiples** (colonnes marquées "choix multiples") : valeurs séparées par un `|` dans une seule cellule, ex. `Musique|Cinéma|Voyages`.
- **Diagnostic** : `oui` ou `non`. Si `non`, laisser vides les 3 colonnes qui suivent (lequel / précision Autre / ancienneté).
- Toutes les valeurs des colonnes à choix doivent correspondre **exactement** (orthographe, accents) à l'une des valeurs autorisées ci-dessous, pour pouvoir être réimportées automatiquement plus tard.

## Valeurs autorisées

| Colonne | Valeurs |
|---|---|
| Diagnostic — lequel (multi) | Trouble bipolaire, Schizophrénie, Trouble schizo-affectif, Trouble anxieux, Dépression chronique, TOC, Trouble borderline, TDAH, TSA, Autre |
| Ancienneté du diagnostic | Moins de 6 mois, 6 mois à 2 ans, 2 à 5 ans, Plus de 5 ans |
| Centres d'intérêt (multi) | Sport, Musique, Lecture, Cinéma, Cuisine, Jeux vidéo, Voyages, Animaux, Art, Technologie |
| Langues (multi) | Français, Anglais, Arabe, Espagnol, Autre |
| Bien-être (chercheur uniquement) | 1 à 5 (1 = Très mal, 5 = Très bien) |
| Fréquence souhaitée (chercheur) | Échange ponctuel, Accompagnement régulier |
| Rythme (chercheur, si régulier) | Toutes les semaines, Toutes les deux semaines, Une fois par mois |
| Modalité(s) (multi) | Chat, Visioconférence, Présentiel |
| Disponibilités — jours (accompagnant, multi) | Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche |
| Disponibilités — moments (accompagnant, multi) | Matin, Après-midi, Soir |

Toutes les autres colonnes sont en texte libre — c'est la matière que l'IA analysera (présentation, quotidien, motivation, attentes, etc.).

## Correspondance colonne ↔ champ interne (pour l'import automatique plus tard)

| Question (colonne CSV) | Champ dans le code (`types/index.ts`) |
|---|---|
| Pseudonyme | `pseudonyme` |
| Âge | `age` |
| Un professionnel de santé vous a-t-il posé un diagnostic ? | `diagnosticPose` |
| Si oui, lequel ? | `troublesPsychiques` |
| Si Autre, précisez | `troubleAutrePrecision` |
| Depuis combien de temps vivez-vous avec ce diagnostic ? | `ancienneteDiagnostic` |
| Qui êtes-vous en quelques mots ? ... | `quiEtesVous` |
| À quoi ressemble votre quotidien ? ... | `quotidien` |
| Comment vos proches vous décriraient-ils ? ... | `commentProchesDecriraient` |
| Y a-t-il des passions ou centres d'intérêt... | `passionsInterets` |
| Centres d'intérêt | `centresInteret` |
| Quelles langues parlez-vous ? | `langues` |
| *(chercheur)* Quel est votre lien avec le handicap ? ... | `lienHandicap` |
| *(chercheur)* Quelles difficultés rencontrez-vous au quotidien ? | `difficultesQuotidien` |
| *(chercheur)* Quel recul avez-vous aujourd'hui ? ... | `reculStrategiesForces` |
| *(chercheur)* Sur quoi un binôme pourrait-il vous aider... | `aideBinome` |
| *(chercheur)* Qu'est-ce qui vous mettrait en confiance... | `confianceRelation` |
| *(accompagnant)* Quel est votre lien avec le handicap ? Comment avez-vous été sensibilisé·e... | `lienHandicapSensibilisation` |
| *(accompagnant)* Quelle aide pensez-vous pouvoir apporter... | `aideForme` |
| *(accompagnant)* Y a-t-il des choses que vous préférez ne pas prendre en charge... | `limites` |
| *(accompagnant)* Quel type de personne ou de situation... | `typePersonneAlaise` |
| Qu'est-ce qui vous motive à rejoindre... | `motivation` |
| À quoi ressemblerait le binôme idéal pour vous ? | `binomeIdeal` |
| *(chercheur)* Fréquence souhaitée | `frequenceSouhaitee` |
| *(chercheur)* À quel rythme ? | `rythmeRegulier` |
| *(chercheur)* Modalité souhaitée | `modalitesSouhaitees` |
| *(chercheur)* Comment vous sentez-vous aujourd'hui ? | `etatBienEtre` |
| *(accompagnant)* Vos disponibilités — jours | `disponibilitesJours` |
| *(accompagnant)* Vos disponibilités — moments de la journée | `disponibilitesMoments` |
| *(accompagnant)* Modalités proposées | `modalitesProposees` |
