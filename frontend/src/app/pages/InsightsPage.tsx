import { Sparkles } from "lucide-react";
import { StatCard } from "../components/insights/StatCard";
import { AgeHistogram, DifficultesBarChart, TroublesDonutChart } from "../components/insights/InsightsCharts";
import { RecommendationCard } from "../components/insights/RecommendationCard";
import { KPIS } from "../data/dashboardData";
import { RECOMMANDATIONS } from "../data/recommendations";

export function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <Sparkles className="size-4" />
            Réservé aux référents handicap / RH
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-primary">RePair Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Les données anonymisées de la plateforme, transformées par l'IA en recommandations concrètes pour
            construire des actions adaptées aux besoins réellement exprimés par vos collaborateurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPIS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <TroublesDonutChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DifficultesBarChart />
          <AgeHistogram />
        </div>

        <p className="text-sm text-muted-foreground italic text-center -mt-4">
          Toutes les données affichées sur cette page sont simulées à des fins de démonstration.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
              <Sparkles className="size-4" />
              Généré par l'IA
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">Plan d'actions recommandé par l'IA</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {RECOMMANDATIONS.map((recommandation) => (
              <RecommendationCard key={recommandation.id} recommandation={recommandation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
