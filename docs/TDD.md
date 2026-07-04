# RePair AI — Technical Design Document (POC / Hackathon)

Statut : proposition à valider avant tout code (Étape 1).

---

## 1. Architecture globale

```
┌──────────────────────┐        REST/JSON        ┌───────────────────────────┐
│   Frontend (React)    │ ───────────────────────▶ │   Backend (FastAPI)       │
│   Vite + Tailwind v4   │ ◀─────────────────────── │   SQLAlchemy + Pydantic   │
│   shadcn/ui + Router   │        Axios             │   Moteur de matching      │
└──────────────────────┘                          │   SQLite (repair.db)      │
                                                    └───────────────────────────┘
```

- **Frontend** : SPA React (Vite), routing côté client (React Router), appels API via un client Axios centralisé.
- **Backend** : API REST FastAPI, validation via Pydantic, persistance via SQLAlchemy sur SQLite (fichier unique, zéro dépendance externe — idéal hackathon).
- **Découplage strict** : la logique de matching vit dans un service indépendant des routes FastAPI, avec une interface abstraite pour permettre un remplacement futur par un LLM sans toucher à l'API ni au frontend.
- **Pas d'authentification réelle** : identité = pseudonyme + `user_id` généré côté serveur, conservé côté client en mémoire/localStorage. Pas de mot de passe, pas de session sécurisée (hors périmètre POC).

---

## 2. Structure du projet (monorepo)

Le dossier Figma déjà présent à la racine (`src/`, `index.html`, `package.json`, `vite.config.ts`, `guidelines/`, etc.) sera déplacé dans `frontend/` pour séparer proprement front et back. **Ce déplacement n'est pas encore fait — je le ferai à l'étape suivante après validation.**

```
repair-ai/
├── README.md
├── docs/
│   └── TDD.md
│
├── backend/
│   ├── requirements.txt
│   ├── repair.db                     # généré au premier lancement
│   └── app/
│       ├── main.py                   # FastAPI app, CORS, routers
│       ├── core/
│       │   └── config.py             # settings (CORS origins, chemin DB, choix moteur matching)
│       ├── db/
│       │   ├── database.py           # engine, SessionLocal, Base
│       │   └── seed.py               # injection des données de démo
│       ├── models/                   # SQLAlchemy ORM
│       │   ├── user.py
│       │   └── profile.py
│       ├── schemas/                  # Pydantic (I/O API)
│       │   ├── user.py
│       │   ├── profile.py
│       │   └── match.py
│       ├── services/
│       │   ├── matching/
│       │   │   ├── base.py           # interface abstraite MatchingEngine
│       │   │   ├── weighted_engine.py# implémentation POC (score pondéré)
│       │   │   └── factory.py        # sélection du moteur (weighted | futur llm)
│       │   └── profiles.py           # logique métier profils (hors HTTP)
│       └── api/
│           └── routes/
│               ├── users.py
│               ├── profiles.py
│               ├── pair_aidants.py
│               └── match.py
│
└── frontend/
    ├── index.html
    ├── package.json / vite.config.ts / postcss.config.mjs
    ├── src/
    │   ├── main.tsx
    │   ├── styles/                   # conservés tels quels (theme.css, tailwind.css, fonts.css)
    │   ├── imports/                  # logos existants (repair-logo.svg, etc.)
    │   └── app/
    │       ├── App.tsx               # <BrowserRouter> + définition des routes
    │       ├── router.tsx
    │       ├── pages/
    │       │   ├── LandingPage.tsx
    │       │   ├── SignupPage.tsx
    │       │   ├── QuestionnairePage.tsx
    │       │   ├── RecommendationsPage.tsx
    │       │   └── PairAidantProfilePage.tsx
    │       ├── components/
    │       │   ├── ui/               # shadcn — déjà présents, réutilisés tels quels
    │       │   ├── layout/           # Navbar, DisclaimerBanner, Footer
    │       │   ├── questionnaire/    # champs de formulaire réutilisables
    │       │   └── recommendations/ # PairAidantCard, ScoreBadge
    │       ├── context/
    │       │   └── SessionContext.tsx# userId/profileId courant (POC, sans auth)
    │       ├── services/
    │       │   └── api.ts            # instance Axios + fonctions par endpoint
    │       └── types/
    │           └── index.ts          # interfaces TS miroir des schémas Pydantic
```

**Réutilisation confirmée du travail Figma existant** : tokens de couleur (navy `#1E2A52`, teal `#35B8B0`, gold `#C9A03C`, fond `#F3F6FB`), police Nunito, `radius: 1rem` (cartes arrondies déjà en place dans `theme.css`), composants shadcn/ui déjà installés (button, card, checkbox, select, dialog, etc.). Le logo `CompassLogo` de `App.tsx` sera extrait dans `components/layout/Logo.tsx` et réutilisé dans la navbar de toutes les pages.

---

## 3. Modèles de données

Un seul type d'entité "profil" couvre les deux personas (chercheur d'accompagnement / pair-aidant) — la distinction se fait uniquement via le booléen `est_pair_aidant_certifie`, conformément au questionnaire unique décrit dans le brief.

### `User` (table `users`)
| Champ | Type | Contrainte |
|---|---|---|
| id | int | PK, auto |
| pseudonyme | str | unique, requis |
| age | int | requis |
| created_at | datetime | auto |

### `Profile` (table `profiles`, relation 1–1 avec `User`)
| Champ | Type | Contrainte |
|---|---|---|
| id | int | PK, auto |
| user_id | int | FK → users.id, unique |
| trouble_psychique | enum str | requis |
| anciennete_diagnostic | enum str | requis |
| nature_besoin | enum str | requis |
| centres_interet | JSON (liste de str) | requis, ≥1 |
| disponibilites | JSON (liste de str) | requis, ≥1 |
| langue | enum str | requis |
| est_pair_aidant_certifie | bool | requis |
| certificat_nom_fichier | str, nullable | rempli si certifié (dépôt simulé, aucun stockage réel) |
| created_at | datetime | auto |

Les enums (`trouble_psychique`, `anciennete_diagnostic`, `nature_besoin`, `langue`) reprennent exactement les listes de valeurs du brief, définies en Python `Enum` + validées par Pydantic côté API.

`GET /pair-aidants` = jointure `User`+`Profile` filtrée sur `est_pair_aidant_certifie = true`.

---

## 4. Endpoints API

| Méthode | Route | Rôle | Entrée | Sortie |
|---|---|---|---|---|
| POST | `/users` | Créer un utilisateur (étape "création de compte") | `{ pseudonyme, age }` | `{ id, pseudonyme, age }` |
| POST | `/profiles` | Enregistrer le questionnaire | `{ user_id, trouble_psychique, anciennete_diagnostic, nature_besoin, centres_interet[], disponibilites[], langue, est_pair_aidant_certifie, certificat_nom_fichier? }` | `Profile` complet |
| GET | `/pair-aidants` | Lister tous les pair-aidants certifiés | – | `Profile[]` (certifiés uniquement) |
| GET | `/pair-aidants/{id}` | Détail d'un pair-aidant | – | `Profile` (404 si non certifié/inexistant) |
| POST | `/match` | Calculer les recommandations | `{ user_id }` | `[{ pair_aidant: Profile, score: int, details: {...} }]` (top 3, triés desc.) |

- `POST /match` recharge le profil du demandeur en base via `user_id` (déjà enregistré par `POST /profiles`), puis compare uniquement aux profils `est_pair_aidant_certifie = true`.
- Erreurs gérées simplement : 404 si `user_id`/`id` inconnu, 422 pour validation Pydantic (listes de choix, champs requis) — pas de gestion d'erreurs avancée, POC oblige.

---

## 5. Logique de matching (module indépendant, remplaçable par un LLM)

```python
# services/matching/base.py
class MatchingEngine(ABC):
    def recommend(self, seeker: ProfileDTO, candidates: list[ProfileDTO], top_n: int = 3) -> list[MatchResult]: ...
```

`weighted_engine.py` implémente cette interface pour le POC :

| Critère | Points | Règle |
|---|---|---|
| Même trouble psychique | 40 | égalité stricte |
| Ancienneté du diagnostic compatible | 25 | même tranche = 25 pts ; tranche adjacente (ex. "6 mois à 2 ans" ↔ "2 à 5 ans") = 15 pts ; sinon 0 |
| Même nature du besoin | 20 | égalité stricte |
| Centres d'intérêt communs | 10 | `10 × (nb communs / nb intérêts du demandeur)`, plafonné à 10 |
| Même langue parlée | 5 | égalité stricte |

Total max = 100. Résultats triés par score décroissant, **top 3** retournés avec le détail du calcul (`details`) pour affichage transparent côté fiche pair-aidant si utile.

`factory.py` expose `get_matching_engine()` qui retourne l'implémentation active (lue depuis `core/config.py`, ex. variable `MATCHING_ENGINE=weighted`). Le jour où un moteur LLM est prêt (`llm_engine.py`), il suffit d'implémenter la même interface (`recommend(...)`) et de changer la config — **aucune modification des routes API ni du frontend**.

Points à valider avec toi (choix par défaut ci-dessus, modifiables) :
- La règle de "tranche adjacente" à 15 pts pour l'ancienneté est une interprétation de "compatible" — le brief ne précise pas la nuance.
- Le calcul proportionnel pour les centres d'intérêt (plutôt qu'un forfait fixe dès qu'il y a ≥1 intérêt commun).

---

## 6. Parcours utilisateur

**Persona 1 — Personne en recherche d'accompagnement**
1. Landing Page → clic "Commencer"
2. Création de compte (pseudonyme, âge) → `POST /users`
3. Questionnaire (répond "non" au champ certification) → `POST /profiles`
4. Appel automatique `POST /match` → redirection vers **Mes pair-aidants recommandés**
5. Clic "Voir le profil" → `GET /pair-aidants/{id}` → **Fiche pair-aidant** (avec champ "Réserver un créneau" non fonctionnel)

**Persona 2 — Pair-aidant certifié (inscription)**
1. Landing Page → "Commencer"
2. Création de compte → `POST /users`
3. Questionnaire → répond "oui" à la certification → champ dépôt de fichier (simulé) apparaît → `POST /profiles`
4. Écran de confirmation ("profil enregistré") — pas de matching déclenché pour ce persona.

Pour la démo hackathon, le jeu de données pré-chargé (1 utilisateur exemple + 10 pair-aidants) permet de sauter directement à l'étape 4 du persona 1 sans ressaisir un questionnaire complet devant le jury, tout en gardant le parcours complet fonctionnel si on veut le rejouer en live.

Le bandeau disclaimer (« RePair AI ne remplace pas un professionnel de santé... ») est intégré dans un composant de layout partagé, visible sur toutes les pages (footer persistant + rappel visible sur la page recommandations et la fiche pair-aidant).

---

## 7. Choix techniques

- **SQLite** : zéro configuration, fichier unique versionnable pour la démo, largement suffisant pour ~10 profils.
- **FastAPI** : docs interactives auto-générées (`/docs`), validation Pydantic native, rapide à développer pour un hackathon.
- **Séparation services/routes** : les routes FastAPI ne contiennent aucune logique métier — elles appellent des services (`services/profiles.py`, `services/matching/`) testables indépendamment.
- **Pas d'auth réelle** : un `SessionContext` React garde `userId`/`profileId` en mémoire + `localStorage` pour survivre à un rafraîchissement de page pendant la démo. Ce n'est pas un mécanisme de sécurité.
- **Réutilisation du design Figma** : tokens CSS déjà en place (`theme.css`) + composants shadcn déjà installés → gain de temps de dev, cohérence visuelle immédiate avec la charte "bleu, fond blanc cassé, cartes arrondies".
- **Champ réservation de créneau** : rendu dans la fiche pair-aidant comme un sélecteur de créneau + bouton "Réserver", désactivé ou affichant un toast "Fonctionnalité bientôt disponible" au clic — aucun appel API associé.

---

## 8. Ce qui reste hors périmètre (rappel)

Messagerie, appel, visioconférence, paiement, notifications, vérification médicale réelle du certificat — uniquement des placeholders visuels si mentionnés dans l'UI.
