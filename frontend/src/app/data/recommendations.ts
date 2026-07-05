// Recommandations simulées pour le POC "RePair Insights" — structure pensée
// pour être remplacée telle quelle par une génération IA réelle plus tard
// (même forme de données, alimentée par les statistiques anonymisées).

export type Priorite = "Élevée" | "Moyenne" | "Faible";

export interface RecommandationDetail {
  objectif: string;
  pourquoi: string;
  publicConcerne: string;
  objectifsPedagogiques: string[];
  deroulement: string[];
  duree: string;
  intervenants: string[];
  resultatsAttendus: string[];
}

export interface Recommandation {
  id: string;
  priorite: Priorite;
  titre: string;
  justification: string;
  detail: RecommandationDetail;
}

export const RECOMMANDATIONS: Recommandation[] = [
  {
    id: "formation-managers-anxiete",
    priorite: "Élevée",
    titre: "Former les managers à l'accompagnement des collaborateurs vivant avec un trouble anxieux",
    justification:
      "42 % des collaborateurs accompagnés déclarent rencontrer des difficultés liées à l'anxiété au travail.",
    detail: {
      objectif:
        "Donner aux managers les repères et les réflexes concrets pour accompagner au quotidien un collaborateur vivant avec un trouble anxieux, sans se substituer à un suivi médical.",
      pourquoi:
        "L'anxiété est la première difficulté remontée par les collaborateurs accompagnés (42 %), en hausse constante depuis 6 mois. Les managers de proximité sont pourtant les moins outillés pour la repérer et y répondre de façon adaptée.",
      publicConcerne: "Managers et responsables d'équipe encadrant au moins un collaborateur en situation de handicap psychique.",
      objectifsPedagogiques: [
        "Comprendre les mécanismes et manifestations concrètes de l'anxiété au travail",
        "Identifier les signaux faibles sans tomber dans le diagnostic",
        "Adapter sa communication et ses attentes en période de forte charge",
        "Savoir orienter vers les bons interlocuteurs internes (référent handicap, RH, pair-aidant)",
      ],
      deroulement: [
        "Introduction : ce que dit la recherche sur l'anxiété en contexte professionnel",
        "Mises en situation à partir de cas anonymisés issus de la plateforme",
        "Atelier pratique : formuler un feedback et poser un cadre sans générer de pression supplémentaire",
        "Construction collective d'un plan d'action individuel par participant",
      ],
      duree: "1 demi-journée (3h30), en présentiel ou visioconférence",
      intervenants: [
        "Psychologue du travail spécialisé·e en santé mentale",
        "Un·e pair-aidant certifié·e RePair, témoignage vécu",
      ],
      resultatsAttendus: [
        "Réduction du sentiment d'isolement rapporté par les collaborateurs accompagnés",
        "Diminution du délai de remontée des difficultés au RH",
        "Amélioration attendue du taux de satisfaction sur le prochain trimestre",
      ],
    },
  },
  {
    id: "communication-tdah",
    priorite: "Moyenne",
    titre: "Adapter sa communication avec les collaborateurs présentant un TDAH",
    justification:
      "Les données montrent une augmentation des demandes liées aux difficultés de concentration, de priorisation et d'organisation.",
    detail: {
      objectif:
        "Outiller les équipes RH et les managers pour adapter les consignes, les échéances et le suivi de projet aux collaborateurs présentant un trouble du déficit de l'attention.",
      pourquoi:
        "La part des difficultés liées à l'organisation quotidienne et à la concentration progresse sur les derniers mois, en cohérence avec la proportion de collaborateurs concernés par un TDAH parmi les profils accompagnés.",
      publicConcerne: "Équipes RH, managers directs, et référents de proximité.",
      objectifsPedagogiques: [
        "Comprendre le fonctionnement attentionnel et exécutif propre au TDAH",
        "Structurer des consignes claires, séquencées et priorisées",
        "Adapter les outils de suivi (échéances, rappels, découpage des tâches)",
        "Éviter les biais de jugement liés à la procrastination ou aux oublis apparents",
      ],
      deroulement: [
        "Apports théoriques courts sur le fonctionnement du TDAH à l'âge adulte",
        "Étude de cas anonymisés : consignes mal calibrées vs consignes adaptées",
        "Atelier pratique de reformulation de briefs et d'échéanciers",
        "Remise d'une check-list managériale réutilisable",
      ],
      duree: "2h, en visioconférence",
      intervenants: [
        "Ergothérapeute spécialisé·e en troubles de l'attention",
        "Un·e pair-aidant certifié·e RePair concerné·e par un TDAH",
      ],
      resultatsAttendus: [
        "Réduction des tensions liées aux échéances non tenues",
        "Meilleure adéquation entre charge de travail perçue et réelle",
        "Progression du taux de recommandation des binômes sur ce profil de besoin",
      ],
    },
  },
  {
    id: "sensibilisation-handicaps-invisibles",
    priorite: "Moyenne",
    titre: "Sensibiliser aux handicaps psychiques invisibles",
    justification:
      "Une part importante des collaborateurs indique ne pas oser parler de son handicap ou se sentir incomprise.",
    detail: {
      objectif:
        "Créer un climat de confiance où les collaborateurs concernés par un handicap psychique invisible se sentent légitimes à en parler, sans crainte de jugement ou de conséquences sur leur évolution professionnelle.",
      pourquoi:
        "Les témoignages collectés sur la plateforme font ressortir un besoin récurrent de reconnaissance et d'écoute, souvent freiné par la peur du regard des collègues ou de la hiérarchie.",
      publicConcerne: "L'ensemble des collaborateurs et managers de l'organisation.",
      objectifsPedagogiques: [
        "Déconstruire les représentations erronées sur le handicap psychique",
        "Comprendre la notion de handicap invisible et ses impacts au quotidien",
        "Connaître le cadre légal (RQTH, obligations et droits) de façon simple et concrète",
        "Identifier les relais internes disponibles (référent handicap, RH, RePair)",
      ],
      deroulement: [
        "Temps de sensibilisation collectif (conférence ou webinaire)",
        "Témoignages croisés de pair-aidants certifiés RePair",
        "Temps d'échange en petits groupes autour de mises en situation",
        "Présentation des dispositifs d'accompagnement existants dans l'organisation",
      ],
      duree: "1h30, format webinaire ou plénière",
      intervenants: [
        "Référent handicap de l'organisation",
        "Deux pair-aidants certifiés RePair, témoignages vécus",
      ],
      resultatsAttendus: [
        "Augmentation du nombre de déclarations volontaires de RQTH",
        "Hausse des inscriptions sur la plateforme RePair côté collaborateurs",
        "Amélioration du sentiment d'inclusion mesuré lors des prochaines enquêtes internes",
      ],
    },
  },
];
