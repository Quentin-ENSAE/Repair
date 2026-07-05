import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function CheckboxGroupField<T extends string>({
  idPrefix,
  label,
  hint,
  options,
  values,
  onChange,
  columns = 2,
  descriptions,
}: {
  idPrefix: string;
  label: string;
  hint?: string;
  options: readonly T[];
  values: T[];
  onChange: (values: T[]) => void;
  columns?: 1 | 2;
  descriptions?: Partial<Record<T, string>>;
}) {
  function toggle(option: T) {
    onChange(values.includes(option) ? values.filter((v) => v !== option) : [...values, option]);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className={columns === 2 ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}>
        {options.map((option) => (
          <div key={option} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}-${option}`}
                checked={values.includes(option)}
                onCheckedChange={() => toggle(option)}
              />
              <Label htmlFor={`${idPrefix}-${option}`} className="font-normal">
                {option}
              </Label>
            </div>
            {descriptions?.[option] && (
              <p className="text-xs text-muted-foreground pl-6">{descriptions[option]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
