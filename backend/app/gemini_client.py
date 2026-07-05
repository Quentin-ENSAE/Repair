import json

from google import genai
from google.genai import types

from . import config
from .schemas import AccompagnantInput, ChercheurInput


class GeminiError(Exception):
    pass


SYSTEM_INSTRUCTION = """Tu aides RePair, une plateforme de pair-aidance en santé mentale, à présenter une mise en
relation entre une personne qui recherche un accompagnement et une personne qui souhaite accompagner (le "binôme").

Règles strictes :
- Ton bienveillant, humain, sans jugement.
- Tu ne poses AUCUN diagnostic médical et ne donnes AUCUN conseil thérapeutique.
- Tu t'appuies uniquement sur les informations fournies, tu n'inventes rien d'autre.
- Réponds UNIQUEMENT avec un objet JSON valide de la forme :
  {"explication": "...", "message": "...", "tags": ["...", "..."]}
  - "explication" : 1 à 2 phrases courtes, percutantes et "vendeuses" (façon accroche chaleureuse), qui donnent
    envie de rencontrer ce binôme — jamais une liste de faits plate, plutôt une image parlante fondée sur les
    informations fournies. Exemple de ton : "Passionné de randonnée malgré son handicap moteur, Karim offre une
    écoute bienveillante et sans jugement."
  - "message" : un court message (3 à 5 phrases) rédigé à la première personne, du point de vue du chercheur,
    pour prendre contact avec l'accompagnant et se présenter.
  - "tags" : exactement 6 courtes étiquettes (2 à 4 mots chacune, pas de phrase complète) qui expliquent
    pourquoi cet échange peut bien fonctionner : bienveillance, qualité d'écoute, vécu comparable, centres
    d'intérêt communs, disponibilité ou modalité compatible, qualité de l'échange... ex. "Écoute bienveillante",
    "Vécu comparable", "Intérêts communs (lecture)", "Disponible en soirée". Chaque tag doit être factuel et
    tiré des informations fournies, jamais inventé. Ne mentionne JAMAIS le nom d'un trouble, d'un diagnostic ou
    d'un type de handicap précis dans un tag — reste sur la qualité de la relation, jamais sur la nature du
    trouble.
"""


def _format_profile(titre: str, profil: dict) -> str:
    lignes = [f"{titre} :"]
    for cle, valeur in profil.items():
        if valeur in ("", [], False, None):
            continue
        lignes.append(f"- {cle} : {valeur}")
    return "\n".join(lignes)


def generate_explanation(chercheur: ChercheurInput, accompagnant: AccompagnantInput, score: int | None) -> dict:
    if not config.GEMINI_API_KEY:
        raise GeminiError("GEMINI_API_KEY manquant : ajoute ta clé dans backend/.env")

    prompt = "\n\n".join(
        [
            _format_profile("Profil de la personne qui recherche un accompagnement", chercheur.model_dump()),
            _format_profile("Profil de la personne qui propose un accompagnement", accompagnant.model_dump()),
            f"Score de compatibilité calculé : {score}%." if score is not None else "",
        ]
    )

    try:
        client = genai.Client(api_key=config.GEMINI_API_KEY)
        response = client.models.generate_content(
            model=config.GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
            ),
        )
        data = json.loads(response.text)
    except Exception as exc:  # noqa: BLE001 - toute erreur Gemini doit remonter proprement
        raise GeminiError(f"Appel Gemini échoué : {exc}") from exc

    if "explication" not in data or "message" not in data:
        raise GeminiError("Réponse Gemini incomplète (champs 'explication'/'message' manquants)")

    return data
