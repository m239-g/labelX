from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReviewRecordCreate(BaseModel):
    reviewer_name: str | None = Field(default=None, max_length=100)
    is_approved: bool = True
    comment: str | None = None


class ReviewRecordRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    annotation_id: int
    reviewer_name: str | None
    is_approved: bool
    comment: str | None
    created_at: datetime
