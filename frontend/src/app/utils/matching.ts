import { AccompagnantProfile, BinomeRecommande, ChercheurProfile } from "../types";

// Stand-in front-end temporaire pour la démo : la majorité du profil est
// maintenant en texte libre (matière pour l'IA / le message généré). Le score
// repose sur un mini-socle structuré volontairement conservé (type
// d'accompagnement, modalités) pour rester fiable et explicable, complété par
// une heuristique simple de lecture du texte libre. Les critères "Sensibilité"
// et "Richesse" sont gradués (pas binaires) pour éviter les scores identiques
// entre profils. Sera remplacé par un vrai moteur (embeddings + LLM) côté
// backend — voir docs/TDD.md.

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

function nombreMotsClesHandicap(texte: string): number {
  const t = texte.toLowerCase();
  return MOTS_CLES_HANDICAP.filter((mot) => t.includes(mot)).length;
}

function tronquer(texte: string, maxCaracteres: number): string {
  const propre = texte.trim();
  if (propre.length <= maxCaracteres) return propre;
  const coupe = propre.slice(0, maxCaracteres);
  const dernierEspace = coupe.lastIndexOf(" ");
  return `${coupe.slice(0, dernierEspace > 0 ? dernierEspace : maxCaracteres)}...`;
}

function matchType(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): boolean {
  return accompagnant.typesAccompagnementProposes.includes(chercheur.typeAccompagnementSouhaite);
}

function modaliteCommune(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string | undefined {
  return chercheur.modalitesSouhaitees.find((m) => accompagnant.modalitesProposees.includes(m));
}

// 0 à 1 : gradué selon le nombre de mots-clés liés au handicap détectés dans
// le texte de sensibilisation de l'accompagnant (0, 1 ou 2+ occurrences).
function scoreSensibilite(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): number {
  if (!chercheur.diagnosticPose) return 0;
  return Math.min(1, nombreMotsClesHandicap(accompagnant.lienHandicapSensibilisation) / 2);
}

// 0 à 1 : gradué selon la richesse combinée des textes libres des deux
// profils (plus les deux personnes se sont exprimées en détail, plus
// l'échange a de matière).
function scoreRichesse(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): number {
  const longueur =
    chercheur.aideBinome.trim().length +
    chercheur.lienHandicap.trim().length +
    accompagnant.aideForme.trim().length +
    accompagnant.motivation.trim().length;
  return Math.min(1, longueur / 400);
}

export function computeScore(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): number {
  let score = 0;

  if (matchType(chercheur, accompagnant)) score += 40;
  if (modaliteCommune(chercheur, accompagnant)) score += 15;
  score += 30 * scoreSensibilite(chercheur, accompagnant);
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
    { critere: "Modalités", valeur: modaliteCommune(chercheur, accompagnant) ? 100 : 0 },
    { critere: "Sensibilité", valeur: Math.round(100 * scoreSensibilite(chercheur, accompagnant)) },
    { critere: "Richesse", valeur: Math.round(100 * scoreRichesse(chercheur, accompagnant)) },
  ];
}

// Repli local (si l'appel à l'IA échoue) pour les tags de compatibilité —
// affichés tels quels, ils font déjà office de courtes étiquettes.
export function getMatchPoints(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string[] {
  const points: string[] = [];

  if (matchType(chercheur, accompagnant)) points.push(`Type recherché : ${chercheur.typeAccompagnementSouhaite}`);

  const modalite = modaliteCommune(chercheur, accompagnant);
  if (modalite) points.push(`Modalité compatible (${modalite})`);

  const sensibilite = scoreSensibilite(chercheur, accompagnant);
  if (sensibilite >= 0.5) points.push("Vécu très comparable");
  else if (sensibilite > 0) points.push("Vécu comparable");

  if (scoreRichesse(chercheur, accompagnant) >= 0.6) points.push("Échange de qualité");

  return points;
}

export function generateExplication(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string {
  const phrases: string[] = [];

  if (matchType(chercheur, accompagnant)) {
    phrases.push(`${accompagnant.pseudonyme} propose un accompagnement de type "${chercheur.typeAccompagnementSouhaite}"`);
  } else {
    phrases.push(`${accompagnant.pseudonyme} pourrait bien vous correspondre`);
  }

  if (scoreSensibilite(chercheur, accompagnant) > 0) {
    phrases[0] += ", avec un vécu proche du vôtre";
  }

  const premierePhrase = `${phrases[0]}.`;
  const propose = tronquer(accompagnant.aideForme, 90);

  return `${premierePhrase} ${accompagnant.pseudonyme} propose : "${propose}"`;
}

export function generateMessageContact(chercheur: ChercheurProfile, accompagnant: AccompagnantProfile): string {
  const intro = tronquer(chercheur.quiEtesVous, 80);
  const attente = tronquer(chercheur.binomeIdeal, 80);

  return [
    `Bonjour ${accompagnant.pseudonyme}, je m'appelle ${chercheur.pseudonyme}. ${intro}`,
    attente,
    "Au plaisir d'échanger avec vous.",
  ].join(" ");
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
