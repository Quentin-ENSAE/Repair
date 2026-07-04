import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export function RadioGroupField<T extends string>({
  idPrefix,
  label,
  hint,
  options,
  value,
  onChange,
}: {
  idPrefix: string;
  label: string;
  hint?: string;
  options: readonly T[];
  value: T | "";
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <RadioGroup value={value} onValueChange={(v) => onChange(v as T)}>
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <RadioGroupItem value={option} id={`${idPrefix}-${option}`} />
            <Label htmlFor={`${idPrefix}-${option}`} className="font-normal">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
