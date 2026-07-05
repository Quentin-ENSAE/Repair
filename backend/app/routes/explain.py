from fastapi import APIRouter, HTTPException

from ..gemini_client import GeminiError, generate_explanation
from ..schemas import ExplainRequest, ExplainResponse

router = APIRouter()


@router.post("/api/explain", response_model=ExplainResponse)
def explain(payload: ExplainRequest) -> ExplainResponse:
    try:
        data = generate_explanation(payload.chercheur, payload.accompagnant, payload.score)
    except GeminiError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return ExplainResponse(explication=data["explication"], message=data["message"], tags=data.get("tags", []))
