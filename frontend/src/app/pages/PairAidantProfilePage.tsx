import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useSession } from "../context/SessionContext";
import { DEMO_USER_PROFILE, MOCK_PAIR_AIDANTS } from "../data/mockData";
import { computeScore } from "../utils/scoreMatch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const CRENEAUX = [
  "Lundi matin",
  "Mardi après-midi",
  "Mercredi soir",
  "Jeudi matin",
  "Vendredi après-midi",
  "Samedi matin",
];

export function PairAidantProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useSession();
  const [creneau, setCreneau] = useState("");

  const pairAidant = MOCK_PAIR_AIDANTS.find((p) => String(p.id) === id);

  if (!pairAidant) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-muted-foreground mb-4">Ce pair-aidant est introuvable.</p>
        <Button variant="outline" className="rounded-2xl" onClick={() => navigate("/recommandations")}>
          Retour aux recommandations
        </Button>
      </div>
    );
  }

  const seeker = profile ?? DEMO_USER_PROFILE;
  const score = computeScore(seeker, pairAidant);

  function handleReservation() {
    if (!creneau) {
      toast.error("Sélectionnez un créneau avant de réserver.");
      return;
    }
    toast("Fonctionnalité bientôt disponible", {
      description: "La réservation de créneau n'est pas encore active dans ce POC.",
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{pairAidant.pseudonyme}</CardTitle>
              <CardDescription>{pairAidant.age} ans</CardDescription>
            </div>
            <Badge className="rounded-full">{score}/100 compatibilité</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {pairAidant.estPairAidantCertifie && (
            <Badge variant="secondary" className="w-fit rounded-full">
              Pair-aidant certifié
            </Badge>
          )}

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Trouble psychique</dt>
              <dd className="font-medium">{pairAidant.troublePsychique}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ancienneté du diagnostic</dt>
              <dd className="font-medium">{pairAidant.ancienneteDiagnostic}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Nature du besoin</dt>
              <dd className="font-medium">{pairAidant.natureBesoin}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Langue parlée</dt>
              <dd className="font-medium">{pairAidant.langue}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground mb-1">Centres d'intérêt</dt>
              <dd className="flex flex-wrap gap-2">
                {pairAidant.centresInteret.map((c) => (
                  <Badge key={c} variant="outline" className="rounded-full">
                    {c}
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>

          <div className="border-t border-border pt-6 flex flex-col gap-3">
            <p className="font-medium">Réserver un créneau</p>
            <Select value={creneau} onValueChange={setCreneau}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un créneau..." />
              </SelectTrigger>
              <SelectContent>
                {CRENEAUX.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="rounded-2xl" onClick={handleReservation}>
              Réserver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
