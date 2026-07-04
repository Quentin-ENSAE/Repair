import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { AccountType } from "../types";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function SignupPage() {
  const navigate = useNavigate();
  const { setAccount } = useSession();

  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<AccountType | "">("");
  const [pseudonyme, setPseudonyme] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleStep1(e: FormEvent) {
    e.preventDefault();
    if (!accountType) {
      setError("Merci de sélectionner une option.");
      return;
    }
    setError(null);
    setStep(2);
  }

  function handleStep2(e: FormEvent) {
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
    setAccount({ type: accountType as AccountType, pseudonyme: pseudonyme.trim(), age: ageNum });
    navigate("/questionnaire");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <Card className="rounded-2xl">
        {step === 1 ? (
          <>
            <CardHeader>
              <CardTitle>Qui êtes-vous aujourd'hui ?</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleStep1}>
                <RadioGroup value={accountType} onValueChange={(v) => setAccountType(v as AccountType)}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="chercheur" id="type-chercheur" />
                    <Label htmlFor="type-chercheur" className="font-normal">
                      Je recherche un accompagnement
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="accompagnant" id="type-accompagnant" />
                    <Label htmlFor="type-accompagnant" className="font-normal">
                      Je souhaite accompagner une personne
                    </Label>
                  </div>
                </RadioGroup>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="rounded-2xl">
                  Continuer
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Créer votre compte</CardTitle>
              <CardDescription>
                Un pseudonyme suffit. Aucune information permettant de vous identifier publiquement ne sera
                demandée.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-5" onSubmit={handleStep2}>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="pseudonyme">Pseudo</Label>
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

                <div className="rounded-xl bg-secondary text-secondary-foreground text-xs p-4 leading-relaxed">
                  🔒 <span className="font-semibold">Confidentialité</span> — Vos informations sont utilisées
                  uniquement pour personnaliser les recommandations. Elles ne sont jamais rendues publiques ni
                  partagées avec d'autres utilisateurs sans votre accord.
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="rounded-2xl mt-1">
                  Créer votre compte
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
