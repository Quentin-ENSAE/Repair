export type AccountType = "chercheur" | "accompagnant";

export const TROUBLES_PSYCHIQUES = [
  "Trouble bipolaire",
  "Schizophrénie",
  "Trouble schizo-affectif",
  "Trouble anxieux",
  "Dépression chronique",
  "TOC",
  "Trouble borderline",
  "TDAH",
  "TSA",
  "Autre",
] as const;
export type TroublePsychique = (typeof TROUBLES_PSYCHIQUES)[number];

export const ANCIENNETES = ["Moins de 6 mois", "6 mois à 2 ans", "2 à 5 ans", "Plus de 5 ans"] as const;
export type Anciennete = (typeof ANCIENNETES)[number];

export const CENTRES_INTERET = [
  "Sport",
  "Musique",
  "Lecture",
  "Cinéma",
  "Cuisine",
  "Jeux vidéo",
  "Voyages",
  "Animaux",
  "Art",
  "Technologie",
] as const;
export type CentreInteret = (typeof CENTRES_INTERET)[number];

export const LANGUES = ["Français", "Anglais", "Arabe", "Espagnol", "Autre"] as const;
export type Langue = (typeof LANGUES)[number];

export const FREQUENCES = ["Échange ponctuel", "Accompagnement régulier"] as const;
export type Frequence = (typeof FREQUENCES)[number];

export const RYTHMES_REGULIERS = ["Toutes les semaines", "Toutes les deux semaines", "Une fois par mois"] as const;
export type RythmeRegulier = (typeof RYTHMES_REGULIERS)[number];

export const MODALITES = ["Chat", "Visioconférence", "Présentiel"] as const;
export type Modalite = (typeof MODALITES)[number];

export const JOURS_SEMAINE = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] as const;
export type JourSemaine = (typeof JOURS_SEMAINE)[number];

export const MOMENTS_JOURNEE = ["Matin", "Après-midi", "Soir"] as const;
export type MomentJournee = (typeof MOMENTS_JOURNEE)[number];

export const NIVEAUX_BIEN_ETRE = {
  1: "Très mal",
  2: "Plutôt mal",
  3: "Moyen",
  4: "Plutôt bien",
  5: "Très bien",
} as const;
export type NiveauBienEtre = 1 | 2 | 3 | 4 | 5;

/**
 * Étape 1 — commune aux deux profils : diagnostic éventuel + "Faisons
 * connaissance" (questions ouvertes, matière première du message/de
 * l'explication IA, complétées par un mini-socle structuré — intérêts,
 * langues — qui alimente le score de compatibilité de façon fiable).
 */
export interface EtapeCommune {
  diagnosticPose: boolean;
  troublesPsychiques: TroublePsychique[];
  troubleAutrePrecision?: string;
  ancienneteDiagnostic?: Anciennete;

  quiEtesVous: string;
  quotidien: string;
  commentProchesDecriraient: string;
  passionsInterets: string;
  centresInteret: CentreInteret[];
  langues: Langue[];
}

export interface ChercheurProfile extends EtapeCommune {
  type: "chercheur";
  id: number;
  pseudonyme: string;
  age: number;

  // Étape 2A — "Votre situation" (texte libre)
  lienHandicap: string;
  difficultesQuotidien: string;
  reculStrategiesForces: string;
  aideBinome: string;
  confianceRelation: string;

  // Étape 3 — "Vos attentes" (texte libre)
  motivation: string;
  binomeIdeal: string;

  // Étape 4A — Disponibilité (structuré) + bien-être
  frequenceSouhaitee: Frequence;
  rythmeRegulier?: RythmeRegulier;
  modalitesSouhaitees: Modalite[];
  etatBienEtre: NiveauBienEtre;
}

export interface AccompagnantProfile extends EtapeCommune {
  type: "accompagnant";
  id: number;
  pseudonyme: string;
  age: number;

  // Étape 2B — "Ce que vous pouvez apporter" (texte libre)
  lienHandicapSensibilisation: string;
  aideForme: string;
  limites: string;
  typePersonneAlaise: string;

  // Étape 3 — "Vos attentes" (texte libre)
  motivation: string;
  binomeIdeal: string;

  // Étape 4B — Disponibilités (structuré)
  disponibilitesJours: JourSemaine[];
  disponibilitesMoments: MomentJournee[];
  modalitesProposees: Modalite[];
}

export type Profile = ChercheurProfile | AccompagnantProfile;

export interface BinomeRecommande {
  profile: AccompagnantProfile;
  score: number;
  explication: string;
}
