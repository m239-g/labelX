from pydantic import BaseModel


class ItemStatusStats(BaseModel):
    pending: int
    predicted: int
    annotated: int


class ProjectStatsRead(BaseModel):
    project_id: int
    project_name: str
    label_count: int
    item_count: int
    prediction_count: int
    annotation_count: int
    review_count: int
    item_status: ItemStatusStats
