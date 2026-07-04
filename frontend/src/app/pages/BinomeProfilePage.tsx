import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useSession } from "../context/SessionContext";
import { DEMO_CHERCHEUR_PROFILE, MOCK_ACCOMPAGNANTS } from "../data/mockData";
import { computeScore, generateExplication, generateMessageContact } from "../utils/matching";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Avatar } from "../components/layout/Avatar";
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

export function BinomeProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useSession();
  const [creneau, setCreneau] = useState("");

  const accompagnant = MOCK_ACCOMPAGNANTS.find((p) => String(p.id) === id);
  const chercheur = profile?.type === "chercheur" ? profile : DEMO_CHERCHEUR_PROFILE;
  const [message, setMessage] = useState(() =>
    accompagnant ? generateMessageContact(chercheur, accompagnant) : "",
  );

  if (!accompagnant) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-muted-foreground mb-4">Ce binôme est introuvable.</p>
        <Button variant="outline" className="rounded-2xl" onClick={() => navigate("/recommandations")}>
          Retour aux recommandations
        </Button>
      </div>
    );
  }

  const score = computeScore(chercheur, accompagnant);
  const explication = generateExplication(chercheur, accompagnant);

  function handleReservation() {
    if (!creneau) {
      toast.error("Sélectionnez un créneau avant de réserver.");
      return;
    }
    toast("Fonctionnalité bientôt disponible", {
      description: "La réservation de créneau n'est pas encore active dans ce POC.",
    });
  }

  function handleSendMessage() {
    toast("Fonctionnalité bientôt disponible", {
      description: "L'envoi de message n'est pas encore actif dans ce POC.",
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar pseudonyme={accompagnant.pseudonyme} size={56} />
            <div className="flex-1">
              <CardTitle className="text-xl">{accompagnant.pseudonyme}</CardTitle>
              <CardDescription>{accompagnant.age} ans</CardDescription>
            </div>
            <Badge className="rounded-full">{score}% compatibilité</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-sm leading-relaxed bg-secondary text-secondary-foreground rounded-xl p-4">
            {explication}
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Qui est {accompagnant.pseudonyme}</dt>
              <dd className="font-medium">{accompagnant.quiEtesVous}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Depuis combien de temps</dt>
              <dd className="font-medium">{accompagnant.ancienneteImplication}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground mb-1">Centres d'intérêt</dt>
              <dd className="flex flex-wrap gap-2">
                {accompagnant.centresInteret.map((c) => (
                  <Badge key={c} variant="outline" className="rounded-full">
                    {c}
                  </Badge>
                ))}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Ce qu'il/elle peut apporter</dt>
              <dd className="font-medium">{accompagnant.aideForme}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Pourquoi accompagner</dt>
              <dd className="font-medium">{accompagnant.motivation}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Le binôme idéal selon {accompagnant.pseudonyme}</dt>
              <dd className="font-medium">{accompagnant.binomeIdeal}</dd>
            </div>
          </dl>

          <div className="border-t border-border pt-6 flex flex-col gap-3">
            <p className="font-medium">Message suggéré par l'IA</p>
            <p className="text-xs text-muted-foreground">
              Généré à partir de votre profil — vous pouvez le modifier avant de l'envoyer.
            </p>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
            <Button variant="outline" className="rounded-2xl" onClick={handleSendMessage}>
              Envoyer le message
            </Button>
          </div>

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
