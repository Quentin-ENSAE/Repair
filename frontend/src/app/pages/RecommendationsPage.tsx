import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { DEMO_CHERCHEUR_PROFILE, MOCK_ACCOMPAGNANTS } from "../data/mockData";
import { getMatchPoints, getRadarData, recommendTop3 } from "../utils/matching";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/layout/Avatar";
import { CompatibilityRadar } from "../components/recommendations/CompatibilityRadar";

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { profile } = useSession();

  if (profile?.type === "accompagnant") {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <Card className="rounded-2xl">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold text-primary">Merci {profile.pseudonyme} !</h1>
            <p className="text-muted-foreground">
              Votre profil de binôme a bien été enregistré. Il sera proposé aux personnes qui recherchent un
              accompagnement compatible avec le vôtre.
            </p>
            <Button variant="outline" className="rounded-2xl" onClick={() => navigate("/")}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chercheur = profile?.type === "chercheur" ? profile : DEMO_CHERCHEUR_PROFILE;
  const recommandations = recommendTop3(chercheur, MOCK_ACCOMPAGNANTS);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-primary mb-2">Vos binômes recommandés</h1>
        <p className="text-muted-foreground">
          D'après votre profil, voici les 3 binômes les plus compatibles avec vous.
        </p>
        {profile?.type !== "chercheur" && (
          <p className="text-xs text-muted-foreground mt-2">
            (Profil de démonstration affiché — complétez le{" "}
            <a className="underline" href="/questionnaire">
              questionnaire
            </a>{" "}
            pour un résultat personnalisé.)
          </p>
        )}
        {profile?.type === "chercheur" && (
          <Button
            variant="ghost"
            className="rounded-2xl mt-2 text-sm"
            onClick={() => navigate("/questionnaire")}
          >
            Modifier mes réponses
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommandations.map(({ profile: accompagnant, score, explication }) => {
          const radarData = getRadarData(chercheur, accompagnant);
          const matchPoints = getMatchPoints(chercheur, accompagnant);

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
                <CompatibilityRadar data={radarData} />

                <p className="text-sm font-semibold text-primary text-center">Compatibilité : {score}%</p>

                <ul className="text-xs text-muted-foreground flex flex-col gap-1">
                  {matchPoints.map((point) => (
                    <li key={point} className="flex items-start gap-1.5">
                      <span className="text-accent font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-muted-foreground leading-relaxed">{explication}</p>

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
