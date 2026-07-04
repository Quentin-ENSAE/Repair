import { AncienneteDiagnostic, ANCIENNETES_DIAGNOSTIC, PairAidantRecommande, Profile } from "../types";

// Stand-in front-end temporaire pour la démo : reproduit le barème du TDD
// (docs/TDD.md §5). Sera remplacé par un appel POST /match au moteur backend.

function ancienneteScore(a: AncienneteDiagnostic, b: AncienneteDiagnostic): number {
  if (a === b) return 25;
  const distance = Math.abs(ANCIENNETES_DIAGNOSTIC.indexOf(a) - ANCIENNETES_DIAGNOSTIC.indexOf(b));
  return distance === 1 ? 15 : 0;
}

function interetsScore(seeker: Profile["centresInteret"], candidate: Profile["centresInteret"]): number {
  const communs = seeker.filter((interet) => candidate.includes(interet));
  if (seeker.length === 0) return 0;
  return Math.round((10 * communs.length) / seeker.length);
}

export function computeScore(seeker: Profile, candidate: Profile): number {
  let score = 0;
  if (seeker.troublePsychique === candidate.troublePsychique) score += 40;
  score += ancienneteScore(seeker.ancienneteDiagnostic, candidate.ancienneteDiagnostic);
  if (seeker.natureBesoin === candidate.natureBesoin) score += 20;
  score += interetsScore(seeker.centresInteret, candidate.centresInteret);
  if (seeker.langue === candidate.langue) score += 5;
  return score;
}

export function recommendTop3(seeker: Profile, candidats: Profile[]): PairAidantRecommande[] {
  return candidats
    .filter((c) => c.estPairAidantCertifie)
    .map((profile) => ({ profile, score: computeScore(seeker, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
