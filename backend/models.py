from pydantic import BaseModel

class PredictionRequest(BaseModel):
    district: str