import { AccompagnantProfile, ChercheurProfile } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8001";

export interface AiNarrative {
  explication: string;
  message: string;
  tags: string[];
}

// Appelle le backend (qui appelle Gemini côté serveur). Retourne null en cas
// d'échec (clé absente, backend éteint, erreur réseau...) pour que l'appelant
// puisse se replier sur le templating local sans jamais bloquer la démo.
export async function fetchAiNarrative(
  chercheur: ChercheurProfile,
  accompagnant: AccompagnantProfile,
  score: number,
): Promise<AiNarrative | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chercheur, accompagnant, score }),
    });
    if (!res.ok) return null;
    return (await res.json()) as AiNarrative;
  } catch {
    return null;
  }
}
