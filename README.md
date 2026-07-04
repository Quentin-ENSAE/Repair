# RePair AI

Plateforme de pair-aidance enrichie par l'IA : mettre en relation une personne vivant avec un
handicap psychique et le pair-aidant certifié le plus pertinent, grâce à un moteur de
recommandation qui compare profils, parcours et besoins.

> **Disclaimer** — RePair AI ne remplace pas un professionnel de santé. La plateforme facilite
> uniquement la mise en relation avec des pair-aidants certifiés.

## État du projet

- ✅ **Frontend** — parcours complet du POC (Landing, création de compte, questionnaire,
  recommandations, fiche pair-aidant), avec des données de démo et un scoring calculé côté
  client en attendant le backend.
- ⏳ **Backend** — API FastAPI (users/profiles/pair-aidants/match) à venir. Voir
  [docs/TDD.md](docs/TDD.md) pour l'architecture cible.

## Lancer le frontend

Prérequis : Node.js 20+.

```bash
cd frontend
npm install
npm run dev
```

Ouvrir **http://localhost:5173/**.

Autres commandes utiles :

```bash
npm run build     # build de production dans frontend/dist
npm run preview   # sert le build de production en local
```

## Structure du dépôt

```
repair-ai/
├── docs/
│   └── TDD.md        # Technical Design Document (architecture, modèles, API, matching)
└── frontend/          # application React (Vite + Tailwind + shadcn/ui)
    └── src/app/
        ├── pages/      # les 5 écrans du POC
        ├── components/ # layout partagé + composants shadcn/ui
        ├── context/    # session utilisateur (sans authentification réelle)
        ├── data/       # jeu de données de démo (1 utilisateur + 10 pair-aidants)
        ├── utils/      # scoring de matching (temporaire, sera remplacé par l'API)
        └── types/      # types partagés du profil
```
