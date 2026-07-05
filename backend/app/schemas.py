from typing import List, Optional

from pydantic import BaseModel


class ChercheurInput(BaseModel):
    pseudonyme: str
    diagnosticPose: bool
    troublesPsychiques: List[str] = []
    quiEtesVous: str = ""
    quotidien: str = ""
    commentProchesDecriraient: str = ""
    passionsInterets: str = ""
    concerneQui: str = ""
    typeHandicap: List[str] = []
    savoirHandicap: str = ""
    aRQTH: str = ""
    lienHandicap: str = ""
    difficultesQuotidien: str = ""
    reculStrategiesForces: str = ""
    aideBinome: str = ""
    confianceRelation: str = ""
    motivation: str = ""
    binomeIdeal: str = ""
    typeAccompagnementSouhaite: str = ""


class AccompagnantInput(BaseModel):
    pseudonyme: str
    diagnosticPose: bool
    troublesPsychiques: List[str] = []
    quiEtesVous: str = ""
    quotidien: str = ""
    commentProchesDecriraient: str = ""
    passionsInterets: str = ""
    lienHandicapSensibilisation: str = ""
    aideForme: str = ""
    limites: str = ""
    typePersonneAlaise: str = ""
    motivation: str = ""
    binomeIdeal: str = ""
    typesAccompagnementProposes: List[str] = []


class ExplainRequest(BaseModel):
    chercheur: ChercheurInput
    accompagnant: AccompagnantInput
    score: Optional[int] = None


class ExplainResponse(BaseModel):
    explication: str
    message: str
    tags: List[str] = []
