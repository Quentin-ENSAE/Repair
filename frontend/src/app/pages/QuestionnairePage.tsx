import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import {
  AncienneteDiagnostic,
  ANCIENNETES_DIAGNOSTIC,
  CentreInteret,
  CENTRES_INTERET,
  Disponibilite,
  DISPONIBILITES,
  Langue,
  LANGUES,
  NatureBesoin,
  NATURES_BESOIN,
  TroublePsychique,
  TROUBLES_PSYCHIQUES,
} from "../types";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function QuestionnairePage() {
  const navigate = useNavigate();
  const { account, setProfile } = useSession();

  useEffect(() => {
    if (!account) navigate("/creer-un-compte");
  }, [account, navigate]);

  const [troublePsychique, setTroublePsychique] = useState<TroublePsychique | "">("");
  const [ancienneteDiagnostic, setAncienneteDiagnostic] = useState<AncienneteDiagnostic | "">("");
  const [natureBesoin, setNatureBesoin] = useState<NatureBesoin | "">("");
  const [centresInteret, setCentresInteret] = useState<CentreInteret[]>([]);
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([]);
  const [langue, setLangue] = useState<Langue | "">("");
  const [estCertifie, setEstCertifie] = useState<"oui" | "non" | "">("");
  const [certificatNomFichier, setCertificatNomFichier] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  function toggle<T>(list: T[], value: T, setList: (v: T[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !account ||
      !troublePsychique ||
      !ancienneteDiagnostic ||
      !natureBesoin ||
      centresInteret.length === 0 ||
      disponibilites.length === 0 ||
      !langue ||
      !estCertifie
    ) {
      setError("Merci de compléter tous les champs obligatoires.");
      return;
    }
    if (estCertifie === "oui" && !certificatNomFichier) {
      setError("Merci de déposer votre certificat de pair-aidant.");
      return;
    }

    setProfile({
      id: Date.now(),
      pseudonyme: account.pseudonyme,
      age: account.age,
      troublePsychique,
      ancienneteDiagnostic,
      natureBesoin,
      centresInteret,
      disponibilites,
      langue,
      estPairAidantCertifie: estCertifie === "oui",
      certificatNomFichier,
    });
    navigate("/recommandations");
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Votre profil</CardTitle>
          <CardDescription>
            Ces informations nous permettent de vous proposer les pair-aidants les plus pertinents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label>Trouble psychique</Label>
              <Select value={troublePsychique} onValueChange={(v) => setTroublePsychique(v as TroublePsychique)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {TROUBLES_PSYCHIQUES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Ancienneté du diagnostic</Label>
              <RadioGroup
                value={ancienneteDiagnostic}
                onValueChange={(v) => setAncienneteDiagnostic(v as AncienneteDiagnostic)}
              >
                {ANCIENNETES_DIAGNOSTIC.map((a) => (
                  <div key={a} className="flex items-center gap-2">
                    <RadioGroupItem value={a} id={`anciennete-${a}`} />
                    <Label htmlFor={`anciennete-${a}`} className="font-normal">
                      {a}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Nature du besoin</Label>
              <RadioGroup value={natureBesoin} onValueChange={(v) => setNatureBesoin(v as NatureBesoin)}>
                {NATURES_BESOIN.map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <RadioGroupItem value={n} id={`besoin-${n}`} />
                    <Label htmlFor={`besoin-${n}`} className="font-normal">
                      {n}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Centres d'intérêt</Label>
              <div className="grid grid-cols-2 gap-3">
                {CENTRES_INTERET.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <Checkbox
                      id={`interet-${c}`}
                      checked={centresInteret.includes(c)}
                      onCheckedChange={() => toggle(centresInteret, c, setCentresInteret)}
                    />
                    <Label htmlFor={`interet-${c}`} className="font-normal">
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Disponibilités</Label>
              <div className="grid grid-cols-2 gap-3">
                {DISPONIBILITES.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <Checkbox
                      id={`dispo-${d}`}
                      checked={disponibilites.includes(d)}
                      onCheckedChange={() => toggle(disponibilites, d, setDisponibilites)}
                    />
                    <Label htmlFor={`dispo-${d}`} className="font-normal">
                      {d}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Langue parlée</Label>
              <Select value={langue} onValueChange={(v) => setLangue(v as Langue)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {LANGUES.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Êtes-vous pair-aidant certifié ?</Label>
              <RadioGroup value={estCertifie} onValueChange={(v) => setEstCertifie(v as "oui" | "non")}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="oui" id="certifie-oui" />
                  <Label htmlFor="certifie-oui" className="font-normal">
                    Oui
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="non" id="certifie-non" />
                  <Label htmlFor="certifie-non" className="font-normal">
                    Non
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {estCertifie === "oui" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="certificat">Certificat de pair-aidant (PDF ou image)</Label>
                <input
                  id="certificat"
                  type="file"
                  accept="application/pdf,image/*"
                  className="text-sm"
                  onChange={(e) => setCertificatNomFichier(e.target.files?.[0]?.name)}
                />
                <p className="text-xs text-muted-foreground">
                  Dépôt simulé pour le POC — aucun fichier n'est réellement transmis.
                </p>
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="rounded-2xl">
              Voir mes recommandations
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
