import { useNavigate } from "react-router";
import { useSession } from "../context/SessionContext";
import { DEMO_USER_PROFILE, MOCK_PAIR_AIDANTS } from "../data/mockData";
import { recommendTop3 } from "../utils/scoreMatch";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { profile } = useSession();

  const seeker = profile ?? DEMO_USER_PROFILE;
  const recommandations = recommendTop3(seeker, MOCK_PAIR_AIDANTS);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-primary mb-2">Mes pair-aidants recommandés</h1>
        <p className="text-muted-foreground">
          D'après votre profil, voici les 3 pair-aidants certifiés les plus compatibles.
        </p>
        {!profile && (
          <p className="text-xs text-muted-foreground mt-2">
            (Profil de démonstration affiché — complétez le <a className="underline" href="/questionnaire">questionnaire</a> pour un résultat personnalisé.)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommandations.map(({ profile: pairAidant, score }) => (
          <Card key={pairAidant.id} className="rounded-2xl flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{pairAidant.pseudonyme}</CardTitle>
                <Badge className="rounded-full">{score}/100</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                {pairAidant.age} ans · {pairAidant.troublePsychique}
              </p>
              <p className="text-sm text-muted-foreground">{pairAidant.natureBesoin}</p>
              <p className="text-sm text-muted-foreground">Langue : {pairAidant.langue}</p>
              <Button
                variant="outline"
                className="rounded-2xl mt-auto"
                onClick={() => navigate(`/pair-aidants/${pairAidant.id}`)}
              >
                Voir le profil
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
