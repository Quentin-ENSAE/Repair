import { useNavigate } from "react-router";
import { Logo } from "../components/layout/Logo";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const VALEURS = [
  {
    titre: "Un handicap moins visible",
    texte:
      "Le handicap psychique reste souvent moins représenté que le handicap moteur ou sensoriel dans les solutions numériques, alors que l'isolement qui suit un diagnostic peut être très fort.",
  },
  {
    titre: "La pair-aidance",
    texte:
      "Échanger avec une personne ayant vécu une expérience similaire, ou qui souhaite simplement aider, permet de se sentir moins seul·e et de trouver des repères concrets.",
  },
  {
    titre: "Une recommandation intelligente",
    texte:
      "RePair AI analyse votre profil et vos besoins pour identifier automatiquement les pair-aidants certifiés les plus pertinents, sans que vous ayez à chercher manuellement.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-10">
      <Logo size={72} />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-primary">RePair AI</h1>
        <p className="text-muted-foreground max-w-xl">
          Trouver, sans avoir à chercher, le pair-aidant le plus adapté à son parcours.
        </p>
        <Button size="lg" className="rounded-2xl mt-2" onClick={() => navigate("/creer-un-compte")}>
          Commencer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {VALEURS.map((v) => (
          <Card key={v.titre} className="rounded-2xl text-left">
            <CardContent className="pt-6">
              <h3 className="font-bold text-primary mb-2">{v.titre}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.texte}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
