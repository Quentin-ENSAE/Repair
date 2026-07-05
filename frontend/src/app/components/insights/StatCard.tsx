import { Card, CardContent } from "../ui/card";
import { KpiStat } from "../../data/dashboardData";

export function StatCard({ stat }: { stat: KpiStat }) {
  const Icon = stat.icon;

  return (
    <Card className="rounded-2xl shadow-lg border-none">
      <CardContent className="flex items-start justify-between gap-3 pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-base text-muted-foreground">{stat.label}</p>
          <p className="text-4xl font-black text-primary">{stat.value}</p>
          <p className="text-sm text-accent font-medium">{stat.trend}</p>
        </div>
        <div className="size-11 rounded-xl flex items-center justify-center shrink-0 bg-secondary">
          <Icon className="size-5 text-accent" />
        </div>
      </CardContent>
    </Card>
  );
}
