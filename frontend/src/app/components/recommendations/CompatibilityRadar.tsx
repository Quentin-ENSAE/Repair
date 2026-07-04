import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { RadarPoint } from "../../utils/matching";

export function CompatibilityRadar({ data }: { data: RadarPoint[] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="critere" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
          <Radar dataKey="valeur" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
