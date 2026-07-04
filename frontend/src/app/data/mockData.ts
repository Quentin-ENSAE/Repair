import { AccompagnantProfile, ChercheurProfile } from "../types";

// Jeu de données de démo (front uniquement, en attendant le backend).
// 1 chercheur d'accompagnement + 10 accompagnants, profils variés.

export const DEMO_CHERCHEUR_PROFILE: ChercheurProfile = {
  type: "chercheur",
  id: 1,
  pseudonyme: "Sam",
  age: 28,

  diagnosticPose: true,
  troublesPsychiques: ["Trouble bipolaire"],
  ancienneteDiagnostic: "2 à 5 ans",

  quiEtesVous: "Je suis plutôt réservé, mais j'aime rire une fois en confiance. La musique et le cinéma me rendent heureux.",
  quotidien: "Je travaille à temps partiel et je passe le reste de mon temps à la maison, parfois à ressasser un peu trop.",
  commentProchesDecriraient: "Mes proches me décrivent comme sensible et loyal, mais j'ai du mal à demander de l'aide.",
  passionsInterets: "J'aimerais partager ma passion pour la musique et le cinéma avec quelqu'un qui comprend ce que je traverse.",
  centresInteret: ["Musique", "Cinéma", "Voyages"],
  langues: ["Français"],

  lienHandicap: "J'ai été diagnostiqué bipolaire il y a quelques années, je n'en parle pas beaucoup autour de moi.",
  difficultesQuotidien: "J'ai du mal à sortir de l'isolement et à garder une routine stable.",
  reculStrategiesForces: "J'ai appris à repérer les signaux avant-coureurs, mais je manque encore de soutien extérieur.",
  aideBinome: "Simplement avoir quelqu'un à qui parler régulièrement, sans tout réexpliquer à chaque fois.",
  confianceRelation: "De la patience et l'absence de jugement, surtout au début.",

  motivation: "Je veux rompre l'isolement et échanger avec quelqu'un qui comprend ce que je traverse.",
  binomeIdeal: "Quelqu'un de patient qui écoute sans chercher à tout résoudre tout de suite.",

  frequenceSouhaitee: "Accompagnement régulier",
  rythmeRegulier: "Toutes les semaines",
  modalitesSouhaitees: ["Chat", "Visioconférence"],
  etatBienEtre: 3,
};

export const MOCK_ACCOMPAGNANTS: AccompagnantProfile[] = [
  {
    type: "accompagnant",
    id: 101,
    pseudonyme: "Amine",
    age: 34,
    diagnosticPose: true,
    troublesPsychiques: ["Trouble bipolaire"],
    ancienneteDiagnostic: "Plus de 5 ans",

    quiEtesVous: "Je suis quelqu'un de calme, à l'écoute, qui aime prendre le temps avec les gens.",
    quotidien: "Je travaille dans le social et je consacre mes soirées à la musique et à la lecture.",
    commentProchesDecriraient: "On me décrit comme patient et empathique, quelqu'un vers qui on vient se confier.",
    passionsInterets: "La musique, la lecture et les voyages — j'aime autant écouter que partager.",
    centresInteret: ["Musique", "Lecture", "Voyages"],
    langues: ["Français"],

    lienHandicapSensibilisation:
      "J'ai moi-même traversé une période difficile liée à un trouble psychique, ce qui m'a sensibilisé très concrètement à ces enjeux.",
    aideForme: "De l'écoute avant tout, sans jugement, en laissant la personne parler à son rythme.",
    limites: "Je préfère ne pas intervenir sur des sujets médicaux précis, ce n'est pas mon rôle.",
    typePersonneAlaise: "Les personnes récemment diagnostiquées ou en situation d'isolement.",

    motivation: "Je sais combien il est précieux d'être écouté sans jugement, je veux offrir ça à mon tour.",
    binomeIdeal: "Quelqu'un qui accepte progressivement de s'ouvrir, à son propre rythme.",

    disponibilitesJours: ["Lundi", "Mardi", "Mercredi", "Jeudi"],
    disponibilitesMoments: ["Soir"],
    modalitesProposees: ["Chat", "Visioconférence"],
  },
  {
    type: "accompagnant",
    id: 102,
    pseudonyme: "Sofia",
    age: 29,
    diagnosticPose: false,
    troublesPsychiques: [],

    quiEtesVous: "Je suis dynamique et organisée, j'aime aider les gens à avancer concrètement.",
    quotidien: "Entre le sport, la cuisine et mon travail, mes journées sont bien remplies.",
    commentProchesDecriraient: "Pragmatique et motivante, on vient me voir pour des conseils concrets.",
    passionsInterets: "Le sport, la cuisine et les animaux — j'aime les activités qui font du bien au corps.",
    centresInteret: ["Sport", "Cuisine", "Animaux"],
    langues: ["Français"],

    lienHandicapSensibilisation: "J'ai été sensibilisée via un proche qui vit avec un trouble anxieux.",
    aideForme: "Aider à organiser le quotidien, poser des petites étapes concrètes et atteignables.",
    limites: "Je ne me sens pas à l'aise pour aborder des crises aiguës, je préfère l'accompagnement du quotidien.",
    typePersonneAlaise: "Les étudiants ou jeunes actifs qui cherchent à reprendre pied dans leur routine.",

    motivation: "J'aime aider les gens à retrouver de la structure dans leur quotidien.",
    binomeIdeal: "Quelqu'un de motivé à avancer, même par petits pas.",

    disponibilitesJours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    disponibilitesMoments: ["Matin"],
    modalitesProposees: ["Présentiel"],
  },
  {
    type: "accompagnant",
    id: 103,
    pseudonyme: "Karim",
    age: 41,
    diagnosticPose: true,
    troublesPsychiques: ["Dépression chronique"],
    ancienneteDiagnostic: "Plus de 5 ans",

    quiEtesVous: "Calme et discret, j'aime transmettre ce que mon propre parcours m'a appris.",
    quotidien: "Je travaille dans la tech, et je joue beaucoup aux jeux vidéo pour décompresser.",
    commentProchesDecriraient: "Posé, empathique, quelqu'un de fiable en cas de coup dur.",
    passionsInterets: "La technologie, les jeux vidéo et le cinéma.",
    centresInteret: ["Technologie", "Jeux vidéo", "Cinéma"],
    langues: ["Arabe", "Français"],

    lienHandicapSensibilisation: "J'ai moi-même reçu un diagnostic il y a plus de 5 ans, ce qui a été un vrai tournant.",
    aideForme: "Partager mon propre vécu quand ça peut rassurer, sans l'imposer.",
    limites: "Je n'accompagne pas les sujets familiaux complexes, ce n'est pas mon domaine.",
    typePersonneAlaise: "Les personnes qui viennent de recevoir un diagnostic et cherchent à comprendre ce qui les attend.",

    motivation: "Après mon propre diagnostic, j'ai voulu rendre ce que j'ai reçu.",
    binomeIdeal: "Quelqu'un qui a besoin de comprendre qu'on peut avancer après un diagnostic.",

    disponibilitesJours: ["Samedi", "Dimanche"],
    disponibilitesMoments: ["Soir"],
    modalitesProposees: ["Visioconférence"],
  },
  {
    type: "accompagnant",
    id: 104,
    pseudonyme: "Lina",
    age: 26,
    diagnosticPose: false,
    troublesPsychiques: [],

    quiEtesVous: "Douce et attentive, je crois beaucoup à la force de l'écoute simple.",
    quotidien: "Entre mes études d'art et mes lectures, je prends aussi du temps pour ma famille.",
    commentProchesDecriraient: "On me dit calme et patiente, à l'écoute sans jamais juger.",
    passionsInterets: "L'art, la musique et la lecture — des choses qui apaisent.",
    centresInteret: ["Art", "Musique", "Lecture"],
    langues: ["Français"],

    lienHandicapSensibilisation: "Je me suis engagée après avoir vu un proche traverser un fort isolement.",
    aideForme: "Être présente régulièrement, sans jugement, pour rompre la solitude.",
    limites: "Je ne suis pas à l'aise pour donner des conseils pratiques concrets, je préfère l'écoute.",
    typePersonneAlaise: "Les personnes isolées qui ont surtout besoin de sentir une présence régulière.",

    motivation: "Je veux que personne ne se sente seul face à ses émotions.",
    binomeIdeal: "Quelqu'un qui a besoin de sentir une présence stable, sans pression.",

    disponibilitesJours: ["Mercredi", "Jeudi", "Vendredi", "Samedi"],
    disponibilitesMoments: ["Après-midi", "Soir"],
    modalitesProposees: ["Chat"],
  },
  {
    type: "accompagnant",
    id: 105,
    pseudonyme: "Youssef",
    age: 38,
    diagnosticPose: false,
    troublesPsychiques: [],

    quiEtesVous: "Curieux et ouvert d'esprit, j'aime les échanges libres, sans cadre trop strict.",
    quotidien: "Je voyage beaucoup pour le travail et je reste très connecté à la technologie.",
    commentProchesDecriraient: "Adaptable et dynamique, je m'ajuste facilement à la personne en face.",
    passionsInterets: "Le sport, les voyages et la technologie.",
    centresInteret: ["Sport", "Voyages", "Technologie"],
    langues: ["Anglais", "Français"],

    lienHandicapSensibilisation: "Sensibilisé via des proches, sans lien personnel direct avec un diagnostic.",
    aideForme: "M'adapter à ce dont la personne a besoin, sans format imposé.",
    limites: "Peu de limites, mais je préfère rester sur de l'échange plutôt que sur du suivi médical.",
    typePersonneAlaise: "Peu importe le profil, tant que l'échange reste ouvert et sans jugement.",

    motivation: "J'aime simplement échanger, sans cadre strict, et m'investir sur la durée.",
    binomeIdeal: "Quelqu'un d'ouvert à la discussion libre, sans thème imposé.",

    disponibilitesJours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    disponibilitesMoments: ["Matin", "Après-midi"],
    modalitesProposees: ["Visioconférence", "Présentiel"],
  },
  {
    type: "accompagnant",
    id: 106,
    pseudonyme: "Nora",
    age: 45,
    diagnosticPose: true,
    troublesPsychiques: ["Trouble anxieux"],
    ancienneteDiagnostic: "Plus de 5 ans",

    quiEtesVous: "Expérimentée et rassurante, mon parcours m'a appris beaucoup.",
    quotidien: "Je partage mon temps entre la lecture, la cuisine et ma famille.",
    commentProchesDecriraient: "Calme, organisée, quelqu'un qui prend le temps d'expliquer.",
    passionsInterets: "La lecture, la cuisine et les animaux.",
    centresInteret: ["Lecture", "Cuisine", "Animaux"],
    langues: ["Français"],

    lienHandicapSensibilisation: "J'ai un parcours personnel avec un trouble psychique diagnostiqué il y a longtemps.",
    aideForme: "Raconter mon parcours pour montrer qu'on peut avancer malgré les difficultés.",
    limites: "Je préfère ne pas accompagner les situations de crise aiguë.",
    typePersonneAlaise: "Les adultes qui viennent de recevoir un diagnostic et cherchent des repères.",

    motivation: "Mon parcours m'a appris beaucoup, je veux le transmettre à mon tour.",
    binomeIdeal: "Quelqu'un qui a besoin d'exemples concrets pour se projeter positivement.",

    disponibilitesJours: ["Lundi", "Mardi", "Mercredi"],
    disponibilitesMoments: ["Soir"],
    modalitesProposees: ["Chat", "Visioconférence"],
  },
  {
    type: "accompagnant",
    id: 107,
    pseudonyme: "Adam",
    age: 31,
    diagnosticPose: false,
    troublesPsychiques: [],

    quiEtesVous: "Structuré et pragmatique, j'aime aider à trouver des solutions concrètes.",
    quotidien: "Je travaille dans l'informatique et je joue aux jeux vidéo pour me détendre.",
    commentProchesDecriraient: "Fiable et organisé, on vient me voir pour des conseils pratiques.",
    passionsInterets: "Les jeux vidéo, la technologie et le cinéma.",
    centresInteret: ["Jeux vidéo", "Technologie", "Cinéma"],
    langues: ["Français"],

    lienHandicapSensibilisation: "Sensibilisé par mes études et mon engagement associatif.",
    aideForme: "Proposer des pistes concrètes à essayer au quotidien, étape par étape.",
    limites: "Je ne me sens pas à l'aise sur l'accompagnement émotionnel profond.",
    typePersonneAlaise: "Les étudiants ou jeunes actifs en reprise de repères.",

    motivation: "J'aime aider à trouver des solutions concrètes et voir les gens progresser.",
    binomeIdeal: "Quelqu'un qui veut avancer concrètement, étape par étape.",

    disponibilitesJours: ["Samedi", "Dimanche"],
    disponibilitesMoments: ["Après-midi"],
    modalitesProposees: ["Présentiel"],
  },
  {
    type: "accompagnant",
    id: 108,
    pseudonyme: "Emma",
    age: 27,
    diagnosticPose: true,
    troublesPsychiques: ["Dépression chronique"],
    ancienneteDiagnostic: "2 à 5 ans",

    quiEtesVous: "Bienveillante et patiente, je crois beaucoup à la puissance de l'écoute.",
    quotidien: "Entre l'art, la musique et les voyages, je cherche toujours à créer du lien.",
    commentProchesDecriraient: "On me décrit comme très à l'écoute, patiente, jamais dans le jugement.",
    passionsInterets: "L'art, les voyages et la musique.",
    centresInteret: ["Art", "Voyages", "Musique"],
    langues: ["Espagnol", "Français"],

    lienHandicapSensibilisation: "Sensibilisée par mon propre vécu d'isolement il y a quelques années.",
    aideForme: "Écouter d'abord, sans chercher à résoudre tout de suite.",
    limites: "Je préfère ne pas intervenir sur des sujets familiaux sensibles.",
    typePersonneAlaise: "Les personnes isolées ou récemment diagnostiquées qui ont besoin d'être rassurées.",

    motivation: "Je veux offrir l'écoute que j'aurais aimé avoir à l'époque.",
    binomeIdeal: "Quelqu'un qui a besoin d'un espace sûr pour parler librement.",

    disponibilitesJours: ["Mercredi", "Jeudi", "Vendredi", "Samedi"],
    disponibilitesMoments: ["Après-midi", "Soir"],
    modalitesProposees: ["Chat", "Visioconférence"],
  },
  {
    type: "accompagnant",
    id: 109,
    pseudonyme: "Bilal",
    age: 50,
    diagnosticPose: false,
    troublesPsychiques: [],

    quiEtesVous: "Ouvert et posé, je crois à la force de la discussion libre.",
    quotidien: "Je travaille dans la tech, entouré de mes livres et de mes animaux.",
    commentProchesDecriraient: "Calme et positif, quelqu'un qui ne juge jamais.",
    passionsInterets: "La technologie, la lecture et les animaux.",
    centresInteret: ["Technologie", "Lecture", "Animaux"],
    langues: ["Français"],

    lienHandicapSensibilisation: "Sensibilisé au fil des années via mon engagement bénévole.",
    aideForme: "Discuter librement, sans thème imposé, pour laisser émerger ce qui compte.",
    limites: "Je préfère ne pas m'impliquer dans des démarches administratives ou médicales.",
    typePersonneAlaise: "Les adultes qui cherchent avant tout un espace d'échange sans pression.",

    motivation: "Je crois en la force de la discussion libre pour recréer du lien.",
    binomeIdeal: "Quelqu'un d'ouvert à parler de tout, sans thème imposé.",

    disponibilitesJours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    disponibilitesMoments: ["Matin"],
    modalitesProposees: ["Présentiel", "Chat"],
  },
  {
    type: "accompagnant",
    id: 110,
    pseudonyme: "Chloé",
    age: 33,
    diagnosticPose: true,
    troublesPsychiques: ["Trouble bipolaire"],
    ancienneteDiagnostic: "2 à 5 ans",

    quiEtesVous: "Authentique et rassurante, je veux montrer que la fissure peut devenir une force.",
    quotidien: "Entre la cuisine, le cinéma et les voyages, je cherche à profiter du quotidien malgré tout.",
    commentProchesDecriraient: "Positive, empathique, à l'écoute — quelqu'un qui rassure.",
    passionsInterets: "La cuisine, le cinéma et les voyages.",
    centresInteret: ["Cuisine", "Cinéma", "Voyages"],
    langues: ["Français"],

    lienHandicapSensibilisation: "J'ai un diagnostic personnel qui m'a beaucoup appris sur la résilience.",
    aideForme: "Partager mon vécu pour aider l'autre à se projeter positivement.",
    limites: "Je préfère ne pas accompagner seule les moments de crise aiguë.",
    typePersonneAlaise: "Les personnes récemment diagnostiquées ou isolées qui cherchent de l'espoir concret.",

    motivation: "Je veux montrer que la fissure peut devenir une force.",
    binomeIdeal: "Quelqu'un qui a besoin d'un exemple vécu pour reprendre confiance.",

    disponibilitesJours: ["Lundi", "Samedi", "Dimanche"],
    disponibilitesMoments: ["Soir", "Après-midi"],
    modalitesProposees: ["Visioconférence"],
  },
];
