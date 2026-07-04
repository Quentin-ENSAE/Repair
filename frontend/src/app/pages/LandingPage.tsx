import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  Handshake,
  Heart,
  Lightbulb,
  Lock,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
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

const PAIR_AIDANCE_CARTES = [
  {
    Icone: Users,
    titre: "L'expérience vécue, un véritable levier d'accompagnement",
    texte:
      "La pair-aidance repose sur le partage d'expérience entre personnes confrontées à des situations similaires. Elle favorise l'écoute et la compréhension mutuelle, en complément du suivi des professionnels de santé.",
    source: "Plein Espoir — « Pair-aidance : quand le vécu devient une vocation »",
  },
  {
    Icone: FlaskConical,
    titre: "Des bénéfices documentés par la recherche",
    texte:
      "Les travaux scientifiques montrent que la pair-aidance peut améliorer le rétablissement, la qualité de vie et les relations sociales des personnes accompagnées.",
    source: "Revue de littérature — ScienceDirect, 2022",
  },
  {
    Icone: Sparkles,
    titre: "Pourquoi RePair ?",
    texte: "Trouver une personne avec qui échanger ne devrait pas relever du hasard. C'est tout le sens de RePair.",
    source: null,
  },
  {
    Icone: Lightbulb,
    titre: "Le saviez-vous ?",
    texte:
      "La pair-aidance ne remplace pas les professionnels de santé. Elle constitue un accompagnement complémentaire, en plus du suivi médical et psychologique.",
    source: "Haute Autorité de Santé (HAS), GHU Paris Psychiatrie & Neurosciences",
  },
];

const RAISONS_BENEVOLES = [
  "Écouter, rassurer et orienter les personnes que vous accompagnez",
  "Partager votre propre expérience et votre parcours",
  "Contribuer à faire évoluer l'accompagnement en santé mentale",
];

export function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const element = document.getElementById(location.hash.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <div className="flex flex-col">
      {/* Qui sommes-nous — clair */}
      <div
        id="qui-sommes-nous"
        className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-8 w-full scroll-mt-20"
      >
        <Logo size={124} />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-primary">
            Avec RePair, je trouve mon pair.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Vous cherchez une personne qui vous comprenne vraiment ? Après un diagnostic ou face à une difficulté,
            il n'est pas toujours facile de savoir vers qui se tourner. RePair vous met en relation dans un cadre
            humain, bienveillant et confidentiel.
          </p>
          <Button size="lg" className="rounded-2xl mt-2" onClick={() => navigate("/creer-un-compte")}>
            Commencer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-2">
          {SECTIONS.map((s) => (
            <Card key={s.titre} className="rounded-2xl border-none shadow-lg">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-3">
                <h3 className="font-black text-lg leading-snug tracking-tight text-accent">{s.titre}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.texte}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pourquoi la pair-aidance — sombre */}
      <section id="pourquoi-pair-aidance" className="w-full py-12 px-4 scroll-mt-20" style={{ background: "var(--primary)" }}>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Pourquoi la pair-aidance ?</h2>
            <p className="text-white/70 max-w-xl">Ce que dit la recherche, et ce que RePair y apporte.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {PAIR_AIDANCE_CARTES.map((carte) => (
              <div
                key={carte.titre}
                className="rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div
                  className="size-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  <carte.Icone className="size-5 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-white leading-tight">{carte.titre}</h3>
                  <p className="text-sm text-white/70 leading-snug">{carte.texte}</p>
                  {carte.source && <p className="text-xs text-white/45 italic">Source : {carte.source}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche — clair */}
      <section id="comment-ca-marche" className="w-full py-20 px-6 scroll-mt-20" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            Trois étapes suffisent pour trouver la personne qui vous correspond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {ETAPES.map((e) => (
              <Card
                key={e.numero}
                className="rounded-2xl border-none shadow-lg transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center size-8 rounded-full text-sm font-black text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {e.numero}
                    </span>
                    <e.Icone className="size-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-primary leading-snug">{e.titre}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.texte}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi devenir accompagnant — sombre */}
      <section className="w-full py-20 px-6" style={{ background: "var(--primary)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Pourquoi devenir accompagnant ?
            </h2>
            <p className="text-white/70">
              Votre parcours a de la valeur. En devenant accompagnant RePair, vous mettez votre expérience au
              service d'une personne qui en a besoin.
            </p>
            <Button
              className="rounded-2xl mt-2 w-fit mx-auto md:mx-0 bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/creer-un-compte")}
            >
              Devenir accompagnant
            </Button>
          </div>

          <ul className="flex flex-col gap-4">
            {RAISONS_BENEVOLES.map((raison) => (
              <li key={raison} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-md">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{raison}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nos valeurs — clair */}
      <section id="nos-valeurs" className="w-full py-20 px-6 scroll-mt-20" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary">Nos valeurs</h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            RePair est avant tout une communauté fondée sur la confiance, le respect et la bienveillance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {VALEURS.map((v) => (
              <Card
                key={v.titre}
                className="rounded-2xl border-none shadow-lg transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
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
