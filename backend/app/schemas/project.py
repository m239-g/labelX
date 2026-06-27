from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str | None = None
    task_type: str = "single_label_classification"


class ProjectUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str | None = None


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    task_type: str
    status: str
    created_at: datetime
    updated_at: datetime
