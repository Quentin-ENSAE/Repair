import { useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import {
  Anciennete,
  ANCIENNETES,
  CentreInteret,
  CENTRES_INTERET,
  ChercheurProfile,
  Frequence,
  FREQUENCES,
  Langue,
  LANGUES,
  Modalite,
  MODALITES,
  NIVEAUX_BIEN_ETRE,
  NiveauBienEtre,
  RythmeRegulier,
  RYTHMES_REGULIERS,
  TroublePsychique,
  TROUBLES_PSYCHIQUES,
} from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Slider } from "../components/ui/slider";
import { CheckboxGroupField } from "../components/questionnaire/CheckboxGroupField";
import { RadioGroupField } from "../components/questionnaire/RadioGroupField";
import { StepNav } from "../components/questionnaire/StepNav";

const TOTAL_STEPS = 5;

export function ChercheurQuestionnaire({
  pseudonyme,
  age,
  existingProfile,
}: {
  pseudonyme: string;
  age: number;
  existingProfile?: ChercheurProfile;
}) {
  const navigate = useNavigate();
  const { setProfile } = useSession();

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [etatBienEtre, setEtatBienEtre] = useState<NiveauBienEtre>(existingProfile?.etatBienEtre ?? 3);

  const [diagnosticPose, setDiagnosticPose] = useState<"Oui" | "Non" | "">(
    existingProfile ? (existingProfile.diagnosticPose ? "Oui" : "Non") : "",
  );
  const [troublesPsychiques, setTroublesPsychiques] = useState<TroublePsychique[]>(
    existingProfile?.troublesPsychiques ?? [],
  );
  const [troubleAutrePrecision, setTroubleAutrePrecision] = useState(existingProfile?.troubleAutrePrecision ?? "");
  const [ancienneteDiagnostic, setAncienneteDiagnostic] = useState<Anciennete | "">(
    existingProfile?.ancienneteDiagnostic ?? "",
  );

  const [quiEtesVous, setQuiEtesVous] = useState(existingProfile?.quiEtesVous ?? "");
  const [quotidien, setQuotidien] = useState(existingProfile?.quotidien ?? "");
  const [commentProchesDecriraient, setCommentProchesDecriraient] = useState(
    existingProfile?.commentProchesDecriraient ?? "",
  );
  const [passionsInterets, setPassionsInterets] = useState(existingProfile?.passionsInterets ?? "");
  const [centresInteret, setCentresInteret] = useState<CentreInteret[]>(existingProfile?.centresInteret ?? []);
  const [langues, setLangues] = useState<Langue[]>(existingProfile?.langues ?? []);

  const [lienHandicap, setLienHandicap] = useState(existingProfile?.lienHandicap ?? "");
  const [difficultesQuotidien, setDifficultesQuotidien] = useState(existingProfile?.difficultesQuotidien ?? "");
  const [reculStrategiesForces, setReculStrategiesForces] = useState(
    existingProfile?.reculStrategiesForces ?? "",
  );
  const [aideBinome, setAideBinome] = useState(existingProfile?.aideBinome ?? "");
  const [confianceRelation, setConfianceRelation] = useState(existingProfile?.confianceRelation ?? "");

  const [motivation, setMotivation] = useState(existingProfile?.motivation ?? "");
  const [binomeIdeal, setBinomeIdeal] = useState(existingProfile?.binomeIdeal ?? "");

  const [frequenceSouhaitee, setFrequenceSouhaitee] = useState<Frequence | "">(
    existingProfile?.frequenceSouhaitee ?? "",
  );
  const [rythmeRegulier, setRythmeRegulier] = useState<RythmeRegulier | "">(existingProfile?.rythmeRegulier ?? "");
  const [modalitesSouhaitees, setModalitesSouhaitees] = useState<Modalite[]>(
    existingProfile?.modalitesSouhaitees ?? [],
  );

  function toggleTrouble(t: TroublePsychique) {
    setTroublesPsychiques((prev) => (prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]));
  }

  function validateStep(): string | null {
    if (step === 0) {
      if (!diagnosticPose) return "Merci d'indiquer si un diagnostic a été posé.";
      if (diagnosticPose === "Oui" && (troublesPsychiques.length === 0 || !ancienneteDiagnostic)) {
        return "Merci de préciser le(s) diagnostic(s) et leur ancienneté.";
      }
      if (diagnosticPose === "Oui" && troublesPsychiques.includes("Autre") && !troubleAutrePrecision.trim()) {
        return "Merci de préciser votre diagnostic.";
      }
    }
    if (step === 1) {
      if (!quiEtesVous.trim() || !quotidien.trim() || !commentProchesDecriraient.trim() || !passionsInterets.trim()) {
        return "Merci de compléter les 4 questions.";
      }
      if (centresInteret.length === 0) return "Merci de sélectionner au moins un centre d'intérêt.";
      if (langues.length === 0) return "Merci de sélectionner au moins une langue.";
    }
    if (step === 2) {
      if (
        !lienHandicap.trim() ||
        !difficultesQuotidien.trim() ||
        !reculStrategiesForces.trim() ||
        !aideBinome.trim() ||
        !confianceRelation.trim()
      ) {
        return "Merci de compléter les 5 questions.";
      }
    }
    if (step === 3) {
      if (!motivation.trim() || !binomeIdeal.trim()) return "Merci de compléter les 2 questions.";
    }
    if (step === 4) {
      if (!frequenceSouhaitee) return "Merci d'indiquer la fréquence souhaitée.";
      if (frequenceSouhaitee === "Accompagnement régulier" && !rythmeRegulier) {
        return "Merci de préciser le rythme souhaité.";
      }
      if (modalitesSouhaitees.length === 0) return "Merci de sélectionner au moins une modalité.";
    }
    return null;
  }

  function handleNext() {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }

    setProfile({
      type: "chercheur",
      id: existingProfile?.id ?? Date.now(),
      pseudonyme,
      age,
      etatBienEtre,
      diagnosticPose: diagnosticPose === "Oui",
      troublesPsychiques: diagnosticPose === "Oui" ? troublesPsychiques : [],
      troubleAutrePrecision: troubleAutrePrecision.trim() || undefined,
      ancienneteDiagnostic: diagnosticPose === "Oui" ? ancienneteDiagnostic || undefined : undefined,
      quiEtesVous: quiEtesVous.trim(),
      quotidien: quotidien.trim(),
      commentProchesDecriraient: commentProchesDecriraient.trim(),
      passionsInterets: passionsInterets.trim(),
      centresInteret,
      langues,
      lienHandicap: lienHandicap.trim(),
      difficultesQuotidien: difficultesQuotidien.trim(),
      reculStrategiesForces: reculStrategiesForces.trim(),
      aideBinome: aideBinome.trim(),
      confianceRelation: confianceRelation.trim(),
      motivation: motivation.trim(),
      binomeIdeal: binomeIdeal.trim(),
      frequenceSouhaitee: frequenceSouhaitee as Frequence,
      rythmeRegulier: frequenceSouhaitee === "Accompagnement régulier" ? rythmeRegulier || undefined : undefined,
      modalitesSouhaitees,
    });
    navigate("/recommandations");
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Votre parcours</CardTitle>
        <CardDescription>
          Ces informations nous permettent de vous proposer les binômes les plus pertinents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {step === 0 && (
            <>
              <div className="flex flex-col gap-3">
                <Label>Comment vous sentez-vous aujourd'hui ?</Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[etatBienEtre]}
                  onValueChange={([v]) => setEtatBienEtre(v as NiveauBienEtre)}
                />
                <p className="text-sm text-center font-medium text-primary">
                  {etatBienEtre} — {NIVEAUX_BIEN_ETRE[etatBienEtre]}
                </p>
              </div>

              <RadioGroupField
                idPrefix="diagnostic"
                label="Un professionnel de santé vous a-t-il posé un diagnostic ?"
                options={["Oui", "Non"] as const}
                value={diagnosticPose}
                onChange={setDiagnosticPose}
              />

              {diagnosticPose === "Oui" && (
                <>
                  <CheckboxGroupField
                    idPrefix="trouble"
                    label="Si oui, lequel ? (plusieurs choix possibles)"
                    options={TROUBLES_PSYCHIQUES}
                    values={troublesPsychiques}
                    onChange={setTroublesPsychiques}
                  />
                  {troublesPsychiques.includes("Autre") && (
                    <Input
                      value={troubleAutrePrecision}
                      onChange={(e) => setTroubleAutrePrecision(e.target.value)}
                      placeholder="Précisez..."
                    />
                  )}
                  <RadioGroupField
                    idPrefix="anciennete"
                    label="Depuis combien de temps vivez-vous avec ce diagnostic ?"
                    options={ANCIENNETES}
                    value={ancienneteDiagnostic}
                    onChange={setAncienneteDiagnostic}
                  />
                </>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm font-semibold text-primary">Faisons connaissance</p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="quiEtesVous">
                  Qui êtes-vous en quelques mots ? Qu'aimez-vous faire, qu'est-ce qui vous rend heureux ?
                </Label>
                <Textarea id="quiEtesVous" value={quiEtesVous} onChange={(e) => setQuiEtesVous(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="quotidien">
                  À quoi ressemble votre quotidien ? (travail, études, activités... ce qui remplit vos journées)
                </Label>
                <Textarea id="quotidien" value={quotidien} onChange={(e) => setQuotidien(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="proches">
                  Comment vos proches vous décriraient-ils ? Vos qualités, vos petits défauts ?
                </Label>
                <Textarea
                  id="proches"
                  value={commentProchesDecriraient}
                  onChange={(e) => setCommentProchesDecriraient(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="passions">
                  Y a-t-il des passions ou centres d'intérêt que vous aimeriez partager avec quelqu'un ?
                </Label>
                <Textarea
                  id="passions"
                  value={passionsInterets}
                  onChange={(e) => setPassionsInterets(e.target.value)}
                  rows={3}
                />
              </div>
              <CheckboxGroupField
                idPrefix="interet"
                label="Centres d'intérêt"
                options={CENTRES_INTERET}
                values={centresInteret}
                onChange={setCentresInteret}
              />
              <CheckboxGroupField
                idPrefix="langue"
                label="Quelles langues parlez-vous ?"
                options={LANGUES}
                values={langues}
                onChange={setLangues}
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-semibold text-primary">Votre situation</p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lienHandicap">
                  Quel est votre lien avec le handicap ? (le diagnostic précis est facultatif)
                </Label>
                <Textarea id="lienHandicap" value={lienHandicap} onChange={(e) => setLienHandicap(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="difficultes">Quelles difficultés rencontrez-vous au quotidien ?</Label>
                <Textarea
                  id="difficultes"
                  value={difficultesQuotidien}
                  onChange={(e) => setDifficultesQuotidien(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="recul">
                  Quel recul avez-vous aujourd'hui ? Quelles stratégies avez-vous déjà mises en place, et quelles
                  sont vos forces ?
                </Label>
                <Textarea
                  id="recul"
                  value={reculStrategiesForces}
                  onChange={(e) => setReculStrategiesForces(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="aideBinome">
                  Sur quoi un binôme pourrait-il vous aider concrètement, et sous quelle forme (présence, échanges,
                  aide pratique, écoute...) ?
                </Label>
                <Textarea id="aideBinome" value={aideBinome} onChange={(e) => setAideBinome(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confiance">Qu'est-ce qui vous mettrait en confiance dans cette relation ?</Label>
                <Textarea
                  id="confiance"
                  value={confianceRelation}
                  onChange={(e) => setConfianceRelation(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm font-semibold text-primary">Vos attentes</p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="motivation">Qu'est-ce qui vous motive à rejoindre RePair ?</Label>
                <Textarea id="motivation" value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="binomeIdeal">À quoi ressemblerait le binôme idéal pour vous ?</Label>
                <Textarea
                  id="binomeIdeal"
                  value={binomeIdeal}
                  onChange={(e) => setBinomeIdeal(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <RadioGroupField
                idPrefix="frequence"
                label="Fréquence souhaitée"
                options={FREQUENCES}
                value={frequenceSouhaitee}
                onChange={setFrequenceSouhaitee}
              />
              {frequenceSouhaitee === "Accompagnement régulier" && (
                <RadioGroupField
                  idPrefix="rythme"
                  label="À quel rythme ?"
                  options={RYTHMES_REGULIERS}
                  value={rythmeRegulier}
                  onChange={setRythmeRegulier}
                />
              )}
              <CheckboxGroupField
                idPrefix="modalite"
                label="Modalité souhaitée"
                options={MODALITES}
                values={modalitesSouhaitees}
                onChange={setModalitesSouhaitees}
                columns={1}
              />
            </>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <StepNav
            step={step}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            nextLabel={step === TOTAL_STEPS - 1 ? "Voir mes recommandations" : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
}
