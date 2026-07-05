import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";
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

  const estReferent = accountType === "referent";

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
    if (!pseudonyme.trim()) {
      setError(estReferent ? "L'identifiant est obligatoire." : "Le pseudonyme est obligatoire.");
      return;
    }

    if (estReferent) {
      setAccount({ type: "referent", pseudonyme: pseudonyme.trim() });
      navigate("/insights");
      return;
    }

    const ageNum = Number(age);
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
                  <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/20 p-4">
                    <p className="text-sm font-semibold text-primary">Pair-aidance</p>
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
                    <p className="text-xs text-muted-foreground">
                      Confidentialité de vos données garantie. RePair est une plateforme de confiance, pensée
                      pour un accompagnement bienveillant et sécurisé.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Lock className="size-4" />
                      RePair Insights — accès réservé
                    </p>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="referent" id="type-referent" />
                      <Label htmlFor="type-referent" className="font-normal">
                        Je suis Référent Handicap / RH
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Réservé aux personnes habilitées de votre organisation. Aucune donnée personnelle des
                      collaborateurs n'est partagée ni identifiable dans cet espace.
                    </p>
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
              <CardTitle>{estReferent ? "Accéder à RePair Insights" : "Créer votre compte"}</CardTitle>
              <CardDescription>
                {estReferent
                  ? "Renseignez votre identifiant professionnel pour accéder au tableau de bord."
                  : "Un pseudonyme suffit. Aucune information permettant de vous identifier publiquement ne sera demandée."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-5" onSubmit={handleStep2}>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="pseudonyme">{estReferent ? "Identifiant" : "Pseudo"}</Label>
                  <Input
                    id="pseudonyme"
                    value={pseudonyme}
                    onChange={(e) => setPseudonyme(e.target.value)}
                    placeholder={estReferent ? "Ex : jdupont" : "Ex : Sam"}
                  />
                </div>

                {!estReferent && (
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
                )}

                <div className="rounded-xl bg-secondary text-secondary-foreground text-xs p-4 leading-relaxed">
                  🔒 <span className="font-semibold">Confidentialité</span> —{" "}
                  {estReferent
                    ? "Aucune donnée personnelle des collaborateurs n'est partagée. RePair Insights n'expose que des statistiques anonymisées et agrégées."
                    : "Vos informations sont utilisées uniquement pour personnaliser les recommandations. Elles ne sont jamais rendues publiques ni partagées avec d'autres utilisateurs sans votre accord."}
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="rounded-2xl mt-1">
                  {estReferent ? "Accéder au tableau de bord" : "Créer votre compte"}
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
