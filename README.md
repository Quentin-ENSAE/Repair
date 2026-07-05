# RePair AI

Plateforme de pair-aidance enrichie par l'IA : mettre en relation une personne vivant avec un
handicap (de différents types) et un pair-aidant — une personne ayant un vécu similaire, un
proche, ou simplement quelqu'un qui souhaite aider — grâce à une IA qui compare profils, parcours
et besoins.

Le projet inclut aussi **RePair Insights**, un tableau de bord réservé aux référents handicap /
RH qui transforme les données anonymisées de la plateforme en recommandations d'actions concrètes
(sensibilisation, bonnes pratiques face à tel ou tel trouble...) — un manque fréquent dans les
entreprises aujourd'hui.

> Disclaimer — RePair AI ne remplace pas un professionnel de santé. La plateforme facilite
> uniquement la mise en relation avec des pair-aidants certifiés.

**Site déployé** : https://quentin-ensae.github.io/Repair/

## État du projet

- **Frontend** — parcours complet : Landing, création de compte (chercheur / accompagnant /
  référent), questionnaires, recommandations, fiche binôme, liste des accompagnants, tableau de
  bord RePair Insights.
- **Backend** — API FastAPI (`backend/`) qui appelle Gemini côté serveur pour générer
  l'explication, le message de contact et les tags de compatibilité du top 3 recommandé. La clé
  API n'est jamais exposée au frontend ; en cas d'échec, le frontend bascule silencieusement sur
  un texte généré localement.
- **Déploiement** — le frontend est déployé automatiquement sur GitHub Pages via GitHub Actions à
  chaque push sur `main`. Le backend n'est pas déployé : la version publique utilise donc le
  repli local plutôt que Gemini.

Architecture détaillée : [docs/TDD.md](docs/TDD.md)

## Lancer le projet

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ouvrir http://localhost:5173/

```bash
npm run build     # build de production dans frontend/dist
npm run preview   # sert le build de production en local
```

### Backend (optionnel, active les vraies réponses Gemini)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          
python -m uvicorn app.main:app --port 8001 --reload
```

Le frontend appelle le backend via `VITE_API_BASE_URL` (voir `frontend/.env.example`), par défaut
`http://127.0.0.1:8001`.

## Structure du dépôt

```
repair-ai/
├── docs/TDD.md         # architecture cible (Technical Design Document)
├── data/                # CSV de démo (chercheurs / accompagnants) → mockData.ts
├── backend/app/         # API FastAPI : proxy Gemini (explication, message, tags)
└── frontend/src/app/     # application React (Vite + Tailwind + shadcn/ui)
```
