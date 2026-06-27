from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PredictionCreate(BaseModel):
    label_id: int
    model_name: str = Field(min_length=1, max_length=100)
    confidence: float | None = Field(default=None, ge=0, le=1)


class PredictionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    item_id: int
    label_id: int
    model_name: str
    confidence: float | None
    created_at: datetime
