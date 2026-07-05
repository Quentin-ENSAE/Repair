import { useState } from "react";
import {
  Clock,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Priorite, Recommandation } from "../../data/recommendations";

const PRIORITE_STYLES: Record<Priorite, string> = {
  Élevée: "bg-destructive/10 text-destructive border-destructive/20",
  Moyenne: "bg-accent/10 text-accent border-accent/20",
  Faible: "bg-muted text-muted-foreground border-transparent",
};

export function RecommendationCard({ recommandation }: { recommandation: Recommandation }) {
  const [open, setOpen] = useState(false);
  const { priorite, titre, justification, detail } = recommandation;

  return (
    <>
      <Card className="rounded-2xl shadow-lg border-none flex flex-col">
        <CardContent className="pt-6 flex flex-col gap-3 flex-1">
          <Badge variant="outline" className={`w-fit rounded-full font-semibold ${PRIORITE_STYLES[priorite]}`}>
            Priorité {priorite.toLowerCase()}
          </Badge>
          <h3 className="text-lg font-bold text-primary leading-snug">{titre}</h3>
          <p className="text-base text-destructive leading-relaxed flex-1">{justification}</p>
          <Button variant="outline" className="rounded-2xl mt-2" onClick={() => setOpen(true)}>
            Voir le détail
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-accent">
              <Sparkles className="size-3.5" />
              Plan d'action généré par l'IA
            </div>
            <DialogTitle>{titre}</DialogTitle>
            <DialogDescription>{detail.objectif}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 text-base">
            <Section icon={Target} titre="Pourquoi cette action est recommandée">
              <p className="text-muted-foreground leading-relaxed">{detail.pourquoi}</p>
            </Section>

            <Section icon={Users} titre="Public concerné">
              <p className="text-muted-foreground leading-relaxed">{detail.publicConcerne}</p>
            </Section>

            <Section icon={ListChecks} titre="Objectifs pédagogiques">
              <ul className="flex flex-col gap-1.5">
                {detail.objectifsPedagogiques.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={ListChecks} titre="Déroulement proposé">
              <ol className="flex flex-col gap-1.5">
                {detail.deroulement.map((etape, index) => (
                  <li key={etape} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                    <span className="flex items-center justify-center size-5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    {etape}
                  </li>
                ))}
              </ol>
            </Section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Section icon={Clock} titre="Durée">
                <p className="text-muted-foreground leading-relaxed">{detail.duree}</p>
              </Section>

              <Section icon={UserCheck} titre="Intervenants recommandés">
                <ul className="flex flex-col gap-1">
                  {detail.intervenants.map((intervenant) => (
                    <li key={intervenant} className="text-muted-foreground leading-relaxed">
                      {intervenant}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            <Section icon={TrendingUp} titre="Résultats attendus">
              <ul className="flex flex-col gap-1.5">
                {detail.resultatsAttendus.map((resultat) => (
                  <li key={resultat} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                    {resultat}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Section({
  icon: Icon,
  titre,
  children,
}: {
  icon: typeof Target;
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 font-bold text-primary">
        <Icon className="size-4 text-accent" />
        {titre}
      </div>
      {children}
    </div>
  );
}
