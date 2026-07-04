import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function SignupPage() {
  const navigate = useNavigate();
  const { setAccount } = useSession();
  const [pseudonyme, setPseudonyme] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ageNum = Number(age);
    if (!pseudonyme.trim()) {
      setError("Le pseudonyme est obligatoire.");
      return;
    }
    if (!age || Number.isNaN(ageNum) || ageNum <= 0) {
      setError("Merci d'indiquer un âge valide.");
      return;
    }
    setAccount({ pseudonyme: pseudonyme.trim(), age: ageNum });
    navigate("/questionnaire");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Créer votre compte</CardTitle>
          <CardDescription>Un pseudonyme suffit — aucune information identifiante n'est requise.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pseudonyme">Pseudonyme</Label>
              <Input
                id="pseudonyme"
                value={pseudonyme}
                onChange={(e) => setPseudonyme(e.target.value)}
                placeholder="Ex : Sam"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                min={1}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex : 28"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="rounded-2xl mt-2">
              Continuer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
