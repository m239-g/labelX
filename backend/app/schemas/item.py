from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ItemCreate(BaseModel):
    external_id: str | None = Field(default=None, max_length=100)
    content: str = Field(min_length=1)
    source: str | None = Field(default=None, max_length=100)


class ItemBatchCreate(BaseModel):
    items: list[ItemCreate] = Field(min_length=1)


class ItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    external_id: str | None
    content: str
    source: str | None
    status: str
    created_at: datetime
