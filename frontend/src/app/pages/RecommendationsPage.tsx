import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Compass } from "lucide-react";
import { useSession } from "../context/SessionContext";
import { DEMO_CHERCHEUR_PROFILE, MOCK_ACCOMPAGNANTS } from "../data/mockData";
import { getMatchPoints, recommendTop3 } from "../utils/matching";
import { fetchAiNarrative } from "../utils/aiClient";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/layout/Avatar";

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { profile } = useSession();

  const chercheur = profile?.type === "chercheur" ? profile : DEMO_CHERCHEUR_PROFILE;
  const [recommandations, setRecommandations] = useState(() =>
    recommendTop3(chercheur, MOCK_ACCOMPAGNANTS).map((reco) => ({
      ...reco,
      tags: getMatchPoints(chercheur, reco.profile),
    })),
  );
  const [idsGeneresParIA, setIdsGeneresParIA] = useState<Set<number>>(new Set());
  const [idsEnChargement, setIdsEnChargement] = useState<Set<number>>(
    () => new Set(recommandations.map((r) => r.profile.id)),
  );

  useEffect(() => {
    let annule = false;

    recommandations.forEach((reco) => {
      fetchAiNarrative(chercheur, reco.profile, reco.score).then((resultat) => {
        if (annule) return;
        if (resultat) {
          setRecommandations((prev) =>
            prev.map((r) =>
              r.profile.id === reco.profile.id
                ? {
                    ...r,
                    explication: resultat.explication,
                    tags: resultat.tags.length > 0 ? resultat.tags : r.tags,
                  }
                : r,
            ),
          );
          setIdsGeneresParIA((prev) => new Set(prev).add(reco.profile.id));
        }
        setIdsEnChargement((prev) => {
          const next = new Set(prev);
          next.delete(reco.profile.id);
          return next;
        });
      });
    });

    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommandations.map(({ profile: accompagnant, score, explication, tags }) => {
          const genereParIA = idsGeneresParIA.has(accompagnant.id);
          const enChargement = idsEnChargement.has(accompagnant.id);

          return (
            <Card key={accompagnant.id} className="rounded-2xl flex flex-col shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar pseudonyme={accompagnant.pseudonyme} />
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{accompagnant.pseudonyme}</CardTitle>
                    <p className="text-sm text-muted-foreground">{accompagnant.age} ans</p>
                  </div>
                  <Badge className="rounded-full">{score}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full font-normal border-orange-400 text-orange-600 dark:border-orange-500/60 dark:text-orange-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {enChargement ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-1">
                      <Compass className="size-4 animate-spin text-accent" />
                      <span className="text-sm italic">Analyse du binôme en cours...</span>
                    </div>
                  ) : (
                    <>
                      {genereParIA && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                          ✨ Généré par l'IA
                        </span>
                      )}
                      <p className="text-base text-muted-foreground leading-relaxed">{explication}</p>
                    </>
                  )}
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

      <div className="flex justify-center mt-10">
        <Button variant="ghost" className="rounded-2xl" onClick={() => navigate("/accompagnants")}>
          Voir tous les accompagnants
        </Button>
      </div>
    </div>
  );
}
