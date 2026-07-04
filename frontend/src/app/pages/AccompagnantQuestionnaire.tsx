import { useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import {
  AccompagnantProfile,
  Anciennete,
  ANCIENNETES,
  CentreInteret,
  CENTRES_INTERET,
  Langue,
  LANGUES,
  Modalite,
  MODALITES,
  MomentJournee,
  MOMENTS_JOURNEE,
  JourSemaine,
  TroublePsychique,
  TROUBLES_PSYCHIQUES,
} from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { CheckboxGroupField } from "../components/questionnaire/CheckboxGroupField";
import { RadioGroupField } from "../components/questionnaire/RadioGroupField";
import { StepNav } from "../components/questionnaire/StepNav";
import { DaysTable } from "../components/questionnaire/DaysTable";

const TOTAL_STEPS = 4;

export function AccompagnantQuestionnaire({
  pseudonyme,
  age,
  existingProfile,
}: {
  pseudonyme: string;
  age: number;
  existingProfile?: AccompagnantProfile;
}) {
  const navigate = useNavigate();
  const { setProfile } = useSession();

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  const [lienHandicapSensibilisation, setLienHandicapSensibilisation] = useState(
    existingProfile?.lienHandicapSensibilisation ?? "",
  );
  const [aideForme, setAideForme] = useState(existingProfile?.aideForme ?? "");
  const [limites, setLimites] = useState(existingProfile?.limites ?? "");
  const [typePersonneAlaise, setTypePersonneAlaise] = useState(existingProfile?.typePersonneAlaise ?? "");

  const [motivation, setMotivation] = useState(existingProfile?.motivation ?? "");
  const [binomeIdeal, setBinomeIdeal] = useState(existingProfile?.binomeIdeal ?? "");

  const [disponibilitesJours, setDisponibilitesJours] = useState<JourSemaine[]>(
    existingProfile?.disponibilitesJours ?? [],
  );
  const [disponibilitesMoments, setDisponibilitesMoments] = useState<MomentJournee[]>(
    existingProfile?.disponibilitesMoments ?? [],
  );
  const [modalitesProposees, setModalitesProposees] = useState<Modalite[]>(
    existingProfile?.modalitesProposees ?? [],
  );

  function validateStep(): string | null {
    if (step === 0) {
      if (!diagnosticPose) return "Merci d'indiquer si un diagnostic a été posé.";
      if (diagnosticPose === "Oui" && (troublesPsychiques.length === 0 || !ancienneteDiagnostic)) {
        return "Merci de préciser le(s) diagnostic(s) et leur ancienneté.";
      }
      if (diagnosticPose === "Oui" && troublesPsychiques.includes("Autre") && !troubleAutrePrecision.trim()) {
        return "Merci de préciser votre diagnostic.";
      }
      if (!quiEtesVous.trim() || !quotidien.trim() || !commentProchesDecriraient.trim() || !passionsInterets.trim()) {
        return "Merci de compléter les 4 questions de la section \"Faisons connaissance\".";
      }
      if (centresInteret.length === 0) return "Merci de sélectionner au moins un centre d'intérêt.";
      if (langues.length === 0) return "Merci de sélectionner au moins une langue.";
    }
    if (step === 1) {
      if (!lienHandicapSensibilisation.trim() || !aideForme.trim() || !limites.trim() || !typePersonneAlaise.trim()) {
        return "Merci de compléter les 4 questions.";
      }
    }
    if (step === 2) {
      if (!motivation.trim() || !binomeIdeal.trim()) return "Merci de compléter les 2 questions.";
    }
    if (step === 3) {
      if (disponibilitesJours.length === 0 || disponibilitesMoments.length === 0) {
        return "Merci d'indiquer vos disponibilités.";
      }
      if (modalitesProposees.length === 0) return "Merci de sélectionner au moins une modalité.";
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
      type: "accompagnant",
      id: existingProfile?.id ?? Date.now(),
      pseudonyme,
      age,
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
      lienHandicapSensibilisation: lienHandicapSensibilisation.trim(),
      aideForme: aideForme.trim(),
      limites: limites.trim(),
      typePersonneAlaise: typePersonneAlaise.trim(),
      motivation: motivation.trim(),
      binomeIdeal: binomeIdeal.trim(),
      disponibilitesJours,
      disponibilitesMoments,
      modalitesProposees,
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
        <CardTitle>Présentez-vous</CardTitle>
        <CardDescription>Là aussi, il faut que l'IA ait de la matière pour bien vous représenter.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {step === 0 && (
            <>
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

          {step === 1 && (
            <>
              <p className="text-sm font-semibold text-primary">Ce que vous pouvez apporter</p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lien">
                  Quel est votre lien avec le handicap ? Comment avez-vous été sensibilisé·e à ces enjeux ?
                </Label>
                <Textarea
                  id="lien"
                  value={lienHandicapSensibilisation}
                  onChange={(e) => setLienHandicapSensibilisation(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="aideForme">Quelle aide pensez-vous pouvoir apporter, et sous quelle forme ?</Label>
                <Textarea id="aideForme" value={aideForme} onChange={(e) => setAideForme(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="limites">
                  Y a-t-il des choses que vous préférez ne pas prendre en charge, ou des limites que vous souhaitez
                  poser ?
                </Label>
                <Textarea id="limites" value={limites} onChange={(e) => setLimites(e.target.value)} rows={3} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="typePersonne">
                  Quel type de personne ou de situation vous sentez-vous le plus à l'aise d'accompagner ?
                </Label>
                <Textarea
                  id="typePersonne"
                  value={typePersonneAlaise}
                  onChange={(e) => setTypePersonneAlaise(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-semibold text-primary">Vos attentes</p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="motivation">
                  Qu'est-ce qui vous motive à rejoindre ce dispositif / à devenir aidant·e ?
                </Label>
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

          {step === 3 && (
            <>
              <DaysTable
                label="Vos disponibilités — jours"
                values={disponibilitesJours}
                onChange={setDisponibilitesJours}
              />
              <CheckboxGroupField
                idPrefix="moment"
                label="Vos disponibilités — moments de la journée"
                options={MOMENTS_JOURNEE}
                values={disponibilitesMoments}
                onChange={setDisponibilitesMoments}
                columns={1}
              />
              <CheckboxGroupField
                idPrefix="modalite"
                label="Modalités proposées"
                options={MODALITES}
                values={modalitesProposees}
                onChange={setModalitesProposees}
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
            nextLabel={step === TOTAL_STEPS - 1 ? "Terminer mon inscription" : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
}
