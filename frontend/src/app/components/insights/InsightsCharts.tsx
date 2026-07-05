import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DIFFICULTES_RENCONTREES, REPARTITION_AGE, REPARTITION_TROUBLES } from "../../data/dashboardData";

const DONUT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--accent)",
];

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  fontSize: "0.8rem",
};

const REPARTITION_TROUBLES_COLOREE = REPARTITION_TROUBLES.map((entry, index) => ({
  ...entry,
  fill: DONUT_COLORS[index % DONUT_COLORS.length],
}));

export function TroublesDonutChart() {
  return (
    <Card className="rounded-2xl shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Répartition des troubles psychiques</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={REPARTITION_TROUBLES_COLOREE}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                isAnimationActive={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
          {REPARTITION_TROUBLES.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className="size-3 rounded-full shrink-0"
                style={{ background: DONUT_COLORS[index % DONUT_COLORS.length] }}
              />
              {entry.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function DifficultesBarChart() {
  return (
    <Card className="rounded-2xl shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Difficultés les plus rencontrées</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DIFFICULTES_RENCONTREES} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="value" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function AgeHistogram() {
  return (
    <Card className="rounded-2xl shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Répartition par tranche d'âge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REPARTITION_AGE}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="tranche" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="value" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
