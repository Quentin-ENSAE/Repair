# RePair AI

Plateforme de pair-aidance enrichie par l'IA : mettre en relation une personne vivant avec un
handicap psychique et le pair-aidant certifié le plus pertinent, grâce à un moteur de
recommandation qui compare profils, parcours et besoins — complété par **RePair Insights**, un
tableau de bord réservé aux référents handicap / RH qui transforme les données anonymisées de la
plateforme en recommandations d'actions concrètes.

> **Disclaimer** — RePair AI ne remplace pas un professionnel de santé. La plateforme facilite
> uniquement la mise en relation avec des pair-aidants certifiés.

## État du projet

- ✅ **Frontend** — parcours complet du POC : Landing, création de compte (chercheur /
  accompagnant / référent), questionnaires, recommandations, fiche binôme, page "Tous les
  accompagnants", et le tableau de bord **RePair Insights**.
- ✅ **Backend** — API FastAPI (`backend/`) qui appelle Gemini côté serveur pour générer
  l'explication, le message de contact et les tags de compatibilité du top 3 recommandé. La clé
  API n'est jamais exposée au frontend. En cas d'échec (backend éteint, quota, réseau), le
  frontend bascule silencieusement sur un texte généré localement.
- ✅ **Déploiement** — le frontend est déployé automatiquement sur GitHub Pages via GitHub Actions
  à chaque push sur `main` (voir `.github/workflows/deploy.yml`). Le backend n'est pas déployé :
  la version publique utilise donc le repli local plutôt que Gemini.
- 📄 Voir [docs/TDD.md](docs/TDD.md) pour l'architecture cible détaillée.

## RePair Insights

Interface réservée au rôle **Référent Handicap / RH**, accessible en choisissant "Je suis
Référent Handicap / RH" lors de la création de compte (authentification par identifiant, pas de
pseudo/âge). Elle affiche :

- des indicateurs clés (effectif accompagné, aidants, binômes créés, délai moyen de mise en
  relation) ;
- des graphiques (répartition des troubles, difficultés rencontrées, tranches d'âge) ;
- un plan d'actions généré par l'IA : 3 recommandations priorisées, avec une fiche détaillée
  (objectifs, public concerné, déroulement, durée, intervenants, résultats attendus) dans une
  modale.

Toutes les données de ce tableau de bord sont simulées (`frontend/src/app/data/dashboardData.ts`
et `recommendations.ts`), avec une structure pensée pour être remplacée par une vraie API plus
tard sans changer les composants.

## Lancer le projet

### Frontend

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

### Backend (optionnel, pour activer les vraies réponses Gemini)

Prérequis : Python 3.11+.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # puis renseigner GEMINI_API_KEY
python -m uvicorn app.main:app --port 8001 --reload
```

Le frontend appelle le backend via `VITE_API_BASE_URL` (voir `frontend/.env.example`), par défaut
`http://127.0.0.1:8001`.

## Structure du dépôt

```
repair-ai/
├── docs/
│   └── TDD.md              # Technical Design Document (architecture, modèles, API, matching)
├── data/                    # CSV de démo (chercheurs / accompagnants) important dans mockData.ts
├── backend/                 # API FastAPI : proxy Gemini (explication, message, tags)
│   └── app/
│       ├── routes/          # endpoints (POST /api/explain)
│       ├── gemini_client.py # appel Gemini + prompt système
│       └── schemas.py       # schémas Pydantic des requêtes/réponses
└── frontend/                 # application React (Vite + Tailwind + shadcn/ui)
    └── src/app/
        ├── pages/            # écrans du POC + RePair Insights
        ├── components/       # layout partagé, composants shadcn/ui, composants Insights
        ├── context/          # session utilisateur (sans authentification réelle)
        ├── data/             # données de démo (profils + dashboard Insights)
        ├── utils/            # scoring de matching (mini-socle explicable) + client IA
        └── types/            # types partagés du profil
```
