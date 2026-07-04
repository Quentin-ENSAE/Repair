export const TROUBLES_PSYCHIQUES = [
  "Trouble bipolaire",
  "Schizophrénie",
  "Trouble schizo-affectif",
  "Dépression chronique",
  "Trouble anxieux",
  "TOC",
  "Trouble borderline",
  "TSA avec handicap psychique reconnu",
  "Autre",
] as const;
export type TroublePsychique = (typeof TROUBLES_PSYCHIQUES)[number];

export const ANCIENNETES_DIAGNOSTIC = [
  "Moins de 6 mois",
  "6 mois à 2 ans",
  "2 à 5 ans",
  "Plus de 5 ans",
] as const;
export type AncienneteDiagnostic = (typeof ANCIENNETES_DIAGNOSTIC)[number];

export const NATURES_BESOIN = ["Soutien émotionnel", "Accompagnement pratique"] as const;
export type NatureBesoin = (typeof NATURES_BESOIN)[number];

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

export const DISPONIBILITES = [
  "Lundi au vendredi",
  "Week-end",
  "Matin",
  "Après-midi",
  "Soir",
] as const;
export type Disponibilite = (typeof DISPONIBILITES)[number];

export const LANGUES = ["Français", "Anglais", "Arabe", "Espagnol", "Autre"] as const;
export type Langue = (typeof LANGUES)[number];

export interface Profile {
  id: number;
  pseudonyme: string;
  age: number;
  troublePsychique: TroublePsychique;
  ancienneteDiagnostic: AncienneteDiagnostic;
  natureBesoin: NatureBesoin;
  centresInteret: CentreInteret[];
  disponibilites: Disponibilite[];
  langue: Langue;
  estPairAidantCertifie: boolean;
  certificatNomFichier?: string;
}

export interface PairAidantRecommande {
  profile: Profile;
  score: number;
}

export type QuestionnaireInput = Omit<Profile, "id">;
