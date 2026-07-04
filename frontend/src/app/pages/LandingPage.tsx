import { useNavigate } from "react-router";
import { ClipboardList, Handshake, Heart, Lock, Sparkles, Video } from "lucide-react";
import { Logo } from "../components/layout/Logo";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const SECTIONS = [
  {
    titre: "Un handicap souvent invisible",
    texte:
      "1 Français sur 5 sera concerné par un trouble psychique au cours de sa vie. Pourtant, les solutions numériques dédiées à l'accompagnement restent encore limitées.",
  },
  {
    titre: "La force d'un accompagnement en binôme",
    texte:
      "Un binôme, c'est une personne qui écoute, accompagne et partage son temps. Parce qu'il est parfois plus facile d'avancer lorsqu'on n'est plus seul.",
  },
  {
    titre: "Une recommandation personnalisée",
    texte:
      "Notre IA analyse votre profil afin de vous recommander les personnes les plus adaptées à votre situation. Plus besoin de chercher, RePair vous propose directement les meilleurs profils.",
  },
];

const ETAPES = [
  {
    numero: 1,
    Icone: ClipboardList,
    titre: "Décrivez votre situation",
    texte:
      "Répondez à quelques questions sur votre parcours, vos besoins et vos attentes afin que RePair puisse mieux vous connaître.",
  },
  {
    numero: 2,
    Icone: Sparkles,
    titre: "L'IA analyse votre profil",
    texte:
      "Notre moteur de recommandation analyse votre profil et identifie les accompagnants les plus compatibles selon plusieurs critères.",
  },
  {
    numero: 3,
    Icone: Video,
    titre: "Échangez avec votre binôme",
    texte:
      "Une fois la mise en relation effectuée, organisez un premier échange par téléphone, visioconférence ou en présentiel selon vos préférences.",
  },
];

const VALEURS = [
  {
    Icone: Heart,
    titre: "Bienveillance",
    texte:
      "Chaque échange repose sur l'écoute, l'empathie et l'absence de jugement. Chacun est libre de partager son expérience à son rythme.",
  },
  {
    Icone: Handshake,
    titre: "Respect",
    texte:
      "Chaque utilisateur est accueilli avec respect, quelles que soient son histoire, son parcours ou son diagnostic. Les échanges se font dans un climat de confiance mutuelle.",
  },
  {
    Icone: Lock,
    titre: "Confidentialité",
    texte:
      "Vos informations personnelles et vos échanges restent confidentiels. Aucune donnée n'est partagée ou utilisée en dehors de RePair sans votre consentement.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-10 w-full">
        <Logo size={104} />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-primary">
            Avec RePair, je trouve mon pair.
          </h1>
          <p className="text-muted-foreground max-w-xl">Vous cherchez une personne qui vous comprenne vraiment ? Après un diagnostic ou face à une difficulté, il n'est pas toujours facile de savoir vers qui se tourner. RePair s'appuie sur l'intelligence artificielle pour comprendre votre situation et vous recommander les personnes les plus à même de vous accompagner, dans un cadre humain, bienveillant et confidentiel.</p>
          <Button size="lg" className="rounded-2xl mt-2" onClick={() => navigate("/creer-un-compte")}>
            Commencer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          {SECTIONS.map((s) => (
            <Card key={s.titre} className="rounded-2xl border-none shadow-md">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-3">
                <h3 className="font-black text-lg leading-snug tracking-tight text-accent">{s.titre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.texte}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comment ça marche */}
      <section className="w-full py-20 px-6" style={{ background: "var(--primary)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Comment ça marche ?</h2>
          <p className="text-white/70 max-w-xl mb-8">
            Trois étapes suffisent pour trouver la personne qui vous correspond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {ETAPES.map((e) => (
              <div
                key={e.numero}
                className="rounded-2xl shadow-md p-8 flex flex-col items-center text-center gap-4 transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center size-8 rounded-full text-sm font-black"
                    style={{ background: "var(--accent)", color: "white" }}
                  >
                    {e.numero}
                  </span>
                  <e.Icone className="size-7 text-white/80" />
                </div>
                <h3 className="font-bold text-white leading-snug">{e.titre}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="w-full py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary">Nos valeurs</h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            RePair est avant tout une communauté fondée sur la confiance, le respect et la bienveillance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {VALEURS.map((v) => (
              <Card
                key={v.titre}
                className="rounded-2xl border-none shadow-md transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-3">
                  <div
                    className="size-12 rounded-full flex items-center justify-center"
                    style={{ background: "var(--secondary)" }}
                  >
                    <v.Icone className="size-6 text-accent" />
                  </div>
                  <h3 className="font-black text-lg leading-snug tracking-tight text-primary">{v.titre}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.texte}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
