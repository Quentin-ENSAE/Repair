import { AccompagnantProfile, BinomeRecommande, ChercheurProfile } from "../types";

// Stand-in front-end temporaire pour la démo : la majorité du profil est
// maintenant en texte libre (matière pour l'IA / le message généré). Le score
// repose sur un mini-socle structuré volontairement conservé (type
// d'accompagnement, modalités) pour rester fiable et explicable, complété par
// une heuristique simple de lecture du texte libre. Sera remplacé par un vrai
// moteur (embeddings + LLM) côté backend — voir docs/TDD.md.

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

  if (matchType(chercheur, accompagnant)) score += 40;
  if (chercheur.modalitesSouhaitees.some((m) => accompagnant.modalitesProposees.includes(m))) score += 15;
  if (matchSensibilite(chercheur, accompagnant)) score += 30;
  score += 15 * scoreRichesse(chercheur, accompagnant);

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

  if (matchSensibilite(chercheur, accompagnant)) {
    phrases.push(`${accompagnant.pseudonyme} est sensibilisé·e à ce que vous traversez : "${accompagnant.lienHandicapSensibilisation}"`);
  }

  phrases.push(`${accompagnant.pseudonyme} propose : "${accompagnant.aideForme}"`);

  return phrases.join(" ");
}

export function generateMessageContact(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string {
  const phrases = [`Bonjour ${accompagnant.pseudonyme},`];
  phrases.push(`Je m'appelle ${chercheur.pseudonyme}. ${chercheur.quiEtesVous}`);
  phrases.push(chercheur.aideBinome);
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
