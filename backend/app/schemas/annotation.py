from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AnnotationCreate(BaseModel):
    label_id: int
    annotator_name: str | None = Field(default=None, max_length=100)
    notes: str | None = None
    is_final: bool = True


class AnnotationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    item_id: int
    label_id: int
    annotator_name: str | None
    notes: str | None
    is_final: bool
    created_at: datetime
