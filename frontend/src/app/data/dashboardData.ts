import { Building2, HeartHandshake, TrendingUp, Users } from "lucide-react";

// Données simulées pour le POC "RePair Insights" — structure pensée pour être
// remplacée telle quelle par un appel API plus tard (même formes de données).
// Échelle cohérente avec une entreprise de ~3000 collaborateurs : une petite
// part est accompagnée (déclarée / suivie), un pool plus large de volontaires
// s'est inscrit comme aidant.

export interface KpiStat {
  label: string;
  value: string;
  trend: string;
  icon: typeof Users;
}

export const KPIS: KpiStat[] = [
  {
    label: "Collaborateurs de l'entreprise",
    value: "3 000",
    trend: "Effectif total",
    icon: Building2,
  },
  {
    label: "Collaborateurs accompagnés",
    value: "50",
    trend: "+6 ce trimestre",
    icon: Users,
  },
  {
    label: "Collaborateurs aidants",
    value: "160",
    trend: "+12 ce trimestre",
    icon: HeartHandshake,
  },
  {
    label: "Taux de mise en relation",
    value: "76 %",
    trend: "+5 pts ce mois-ci",
    icon: TrendingUp,
  },
];

export interface RepartitionItem {
  name: string;
  value: number;
}

export const REPARTITION_TROUBLES: RepartitionItem[] = [
  { name: "Trouble anxieux", value: 32 },
  { name: "Dépression chronique", value: 24 },
  { name: "TDAH", value: 18 },
  { name: "Trouble bipolaire", value: 12 },
  { name: "TOC", value: 8 },
  { name: "TSA", value: 6 },
];

// Besoins d'accompagnement exprimés par les collaborateurs accompagnés,
// avec des intitulés concrets et orientés entreprise.
export const BESOINS_ACCOMPAGNEMENT: RepartitionItem[] = [
  { name: "Retour au travail après un arrêt", value: 38 },
  { name: "Gestion du stress professionnel", value: 34 },
  { name: "Charge mentale", value: 30 },
  { name: "Fatigue psychique", value: 27 },
  { name: "Difficulté à communiquer avec son manager", value: 25 },
  { name: "Organisation et priorisation", value: 22 },
  { name: "Perte de confiance au travail", value: 19 },
  { name: "Difficulté à demander de l'aide", value: 17 },
  { name: "Intégration dans l'équipe", value: 14 },
  { name: "Équilibre vie professionnelle / vie personnelle", value: 12 },
];

export interface RepartitionAgeItem {
  tranche: string;
  value: number;
}

export const REPARTITION_AGE: RepartitionAgeItem[] = [
  { tranche: "18-25", value: 22 },
  { tranche: "26-35", value: 41 },
  { tranche: "36-45", value: 33 },
  { tranche: "46-55", value: 21 },
  { tranche: "55+", value: 11 },
];
