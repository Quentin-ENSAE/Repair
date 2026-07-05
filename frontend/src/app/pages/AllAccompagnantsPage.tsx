import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { DEMO_CHERCHEUR_PROFILE, MOCK_ACCOMPAGNANTS } from "../data/mockData";
import { computeScore } from "../utils/matching";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/layout/Avatar";

export function AllAccompagnantsPage() {
  const navigate = useNavigate();
  const { profile } = useSession();
  const chercheur = profile?.type === "chercheur" ? profile : DEMO_CHERCHEUR_PROFILE;

  const accompagnants = [...MOCK_ACCOMPAGNANTS].sort(
    (a, b) => computeScore(chercheur, b) - computeScore(chercheur, a),
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-primary mb-2">
          Toutes les personnes aidantes
        </h1>
        <p className="text-muted-foreground">
          Parcourez l'ensemble des accompagnants disponibles sur RePair, classés par compatibilité avec votre
          profil.
        </p>
        <Button
          variant="ghost"
          className="rounded-2xl mt-2 text-sm"
          onClick={() => navigate("/recommandations")}
        >
          ← Retour aux 3 profils suggérés
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accompagnants.map((accompagnant) => {
          const score = computeScore(chercheur, accompagnant);

          return (
            <Card key={accompagnant.id} className="rounded-2xl flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar pseudonyme={accompagnant.pseudonyme} />
                  <div className="flex-1">
                    <CardTitle>{accompagnant.pseudonyme}</CardTitle>
                    <p className="text-xs text-muted-foreground">{accompagnant.age} ans</p>
                  </div>
                  <Badge className="rounded-full">{score}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{accompagnant.quiEtesVous}</p>
                <div className="flex flex-wrap gap-1.5">
                  {accompagnant.typesAccompagnementProposes.map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl mt-auto"
                  onClick={() => navigate(`/binomes/${accompagnant.id}`)}
                >
                  Voir le profil
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
