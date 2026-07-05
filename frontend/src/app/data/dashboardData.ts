import { Clock, Handshake, HeartHandshake, Users } from "lucide-react";

// Données simulées pour le POC "RePair Insights" — structure pensée pour être
// remplacée telle quelle par un appel API plus tard (même formes de données).

export interface KpiStat {
  label: string;
  value: string;
  trend: string;
  icon: typeof Users;
}

export const KPIS: KpiStat[] = [
  {
    label: "Collaborateurs accompagnés",
    value: "128",
    trend: "+12 ce trimestre",
    icon: Users,
  },
  {
    label: "Collaborateurs aidants",
    value: "37",
    trend: "+5 ce trimestre",
    icon: HeartHandshake,
  },
  {
    label: "Binômes créés",
    value: "94",
    trend: "+8 ce mois-ci",
    icon: Handshake,
  },
  {
    label: "Délai moyen avant mise en binôme",
    value: "6 jours",
    trend: "-2 jours vs trimestre précédent",
    icon: Clock,
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

export const DIFFICULTES_RENCONTREES: RepartitionItem[] = [
  { name: "Gestion des émotions", value: 42 },
  { name: "Retour au travail", value: 35 },
  { name: "Isolement", value: 30 },
  { name: "Confiance en soi", value: 27 },
  { name: "Communication", value: 21 },
  { name: "Organisation quotidienne", value: 18 },
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
