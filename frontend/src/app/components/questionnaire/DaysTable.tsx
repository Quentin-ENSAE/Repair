import { JourSemaine, JOURS_SEMAINE } from "../../types";
import { Label } from "../ui/label";

const ABREVIATIONS: Record<JourSemaine, string> = {
  Lundi: "Lun",
  Mardi: "Mar",
  Mercredi: "Mer",
  Jeudi: "Jeu",
  Vendredi: "Ven",
  Samedi: "Sam",
  Dimanche: "Dim",
};

export function DaysTable({
  label,
  values,
  onChange,
}: {
  label: string;
  values: JourSemaine[];
  onChange: (values: JourSemaine[]) => void;
}) {
  function toggle(jour: JourSemaine) {
    onChange(values.includes(jour) ? values.filter((v) => v !== jour) : [...values, jour]);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-7 gap-1.5">
        {JOURS_SEMAINE.map((jour) => {
          const actif = values.includes(jour);
          return (
            <button
              key={jour}
              type="button"
              onClick={() => toggle(jour)}
              aria-pressed={actif}
              className="flex flex-col items-center justify-center rounded-lg border py-2 text-xs font-medium transition-colors"
              style={{
                background: actif ? "var(--primary)" : "var(--input-background)",
                color: actif ? "white" : "var(--foreground)",
                borderColor: actif ? "var(--primary)" : "var(--border)",
              }}
            >
              {ABREVIATIONS[jour]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
