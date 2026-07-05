import { AccompagnantProfile, BinomeRecommande, ChercheurProfile } from "../types";

// Stand-in front-end temporaire pour la démo : la majorité du profil est
// maintenant en texte libre (matière pour l'IA / le message généré). Le score
// et le radar reposent sur un mini-socle structuré volontairement conservé
// (type d'accompagnement, intérêts, langues, modalités) pour rester fiables
// et explicables, complété par une heuristique simple de lecture du texte
// libre. Sera remplacé par un vrai moteur (embeddings + LLM) côté backend —
// voir docs/TDD.md.

const MOTS_CLES_HANDICAP = [
  "handicap",
  "diagnostic",
  "trouble",
  "santé mentale",
  "isolement",
  "anxiété",
  "dépression",
  "psychique",
];

function overlapRatio<T>(a: T[], b: T[]): number {
  if (a.length === 0) return 0;
  const common = a.filter((v) => b.includes(v)).length;
  return common / a.length;
}

function mentionneHandicap(texte: string): boolean {
  const t = texte.toLowerCase();
  return MOTS_CLES_HANDICAP.some((mot) => t.includes(mot));
}

function estSubstantiel(texte: string, seuil = 15): boolean {
  return texte.trim().length >= seuil;
}

function matchType(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): boolean {
  return accompagnant.typesAccompagnementProposes.includes(chercheur.typeAccompagnementSouhaite);
}

function matchSensibilite(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): boolean {
  return chercheur.diagnosticPose && mentionneHandicap(accompagnant.lienHandicapSensibilisation);
}

function scoreRichesse(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): number {
  const chercheurOk = estSubstantiel(chercheur.aideBinome) && estSubstantiel(chercheur.lienHandicap);
  const accompagnantOk = estSubstantiel(accompagnant.aideForme) && estSubstantiel(accompagnant.motivation);
  return chercheurOk && accompagnantOk ? 1 : 0;
}

export function computeScore(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): number {
  let score = 0;

  if (matchType(chercheur, accompagnant)) score += 25;
  score += 20 * overlapRatio(chercheur.centresInteret, accompagnant.centresInteret);
  if (chercheur.langues.some((l) => accompagnant.langues.includes(l))) score += 15;
  if (chercheur.modalitesSouhaitees.some((m) => accompagnant.modalitesProposees.includes(m))) score += 10;
  if (matchSensibilite(chercheur, accompagnant)) score += 20;
  score += 10 * scoreRichesse(chercheur, accompagnant);

  return Math.round(Math.min(score, 100));
}

export interface RadarPoint {
  critere: string;
  valeur: number;
}

export function getRadarData(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): RadarPoint[] {
  return [
    { critere: "Type", valeur: matchType(chercheur, accompagnant) ? 100 : 0 },
    {
      critere: "Intérêts",
      valeur: Math.round(100 * overlapRatio(chercheur.centresInteret, accompagnant.centresInteret)),
    },
    { critere: "Langue", valeur: chercheur.langues.some((l) => accompagnant.langues.includes(l)) ? 100 : 0 },
    {
      critere: "Modalités",
      valeur: chercheur.modalitesSouhaitees.some((m) => accompagnant.modalitesProposees.includes(m)) ? 100 : 0,
    },
    { critere: "Sensibilité", valeur: matchSensibilite(chercheur, accompagnant) ? 100 : 0 },
    { critere: "Richesse", valeur: scoreRichesse(chercheur, accompagnant) * 100 },
  ];
}

// Repli local (si l'appel à l'IA échoue) pour les tags de compatibilité —
// affichés tels quels, ils font déjà office de courtes étiquettes.
export function getMatchPoints(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string[] {
  const points: string[] = [];

  if (matchType(chercheur, accompagnant)) points.push(`Type recherché : ${chercheur.typeAccompagnementSouhaite}`);

  const interetsCommuns = chercheur.centresInteret.filter((i) => accompagnant.centresInteret.includes(i));
  if (interetsCommuns.length > 0) points.push(`Intérêts communs (${interetsCommuns.join(", ")})`);

  if (chercheur.langues.some((l) => accompagnant.langues.includes(l))) points.push("Langue commune");
  if (chercheur.modalitesSouhaitees.some((m) => accompagnant.modalitesProposees.includes(m))) {
    points.push("Modalité compatible");
  }
  if (matchSensibilite(chercheur, accompagnant)) points.push("Vécu comparable");
  if (scoreRichesse(chercheur, accompagnant) === 1) points.push("Échange de qualité");

  return points;
}

export function generateExplication(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string {
  const phrases = [`Nous pensons que ${accompagnant.pseudonyme} pourrait bien vous correspondre.`];

  if (matchType(chercheur, accompagnant)) {
    phrases.push(`${accompagnant.pseudonyme} propose justement un accompagnement de type "${chercheur.typeAccompagnementSouhaite}".`);
  }

  const interetsCommuns = chercheur.centresInteret.filter((i) => accompagnant.centresInteret.includes(i));
  if (interetsCommuns.length > 0) {
    phrases.push(`Vous partagez un intérêt commun pour ${interetsCommuns[0]}.`);
  }

  if (matchSensibilite(chercheur, accompagnant)) {
    phrases.push(`${accompagnant.pseudonyme} est sensibilisé·e à ce que vous traversez : "${accompagnant.lienHandicapSensibilisation}"`);
  }

  phrases.push(`${accompagnant.pseudonyme} propose : "${accompagnant.aideForme}"`);

  return phrases.join(" ");
}

export function generateMessageContact(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string {
  const interetsCommuns = chercheur.centresInteret.filter((i) => accompagnant.centresInteret.includes(i));

  const phrases = [`Bonjour ${accompagnant.pseudonyme},`];
  phrases.push(`Je m'appelle ${chercheur.pseudonyme}. ${chercheur.quiEtesVous}`);
  phrases.push(chercheur.aideBinome);

  if (interetsCommuns.length > 0) {
    phrases.push(`On partage aussi un intérêt pour ${interetsCommuns[0]}, ce qui pourrait faciliter la prise de contact.`);
  }

  phrases.push(chercheur.binomeIdeal);
  phrases.push("Au plaisir d'échanger avec vous.");

  return phrases.join(" ");
}

export function recommendTop3(
  chercheur: ChercheurProfile,
  accompagnants: AccompagnantProfile[],
): BinomeRecommande[] {
  return accompagnants
    .map((profile) => ({
      profile,
      score: computeScore(chercheur, profile),
      explication: generateExplication(chercheur, profile),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
