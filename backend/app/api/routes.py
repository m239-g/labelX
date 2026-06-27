from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Annotation, Item, Label, Project, ReviewRecord
from app.schemas import (
    AnnotationCreate,
    AnnotationRead,
    ItemBatchCreate,
    ItemRead,
    LabelCreate,
    LabelRead,
    PredictionCreate,
    PredictionRead,
    ProjectCreate,
    ProjectRead,
    ProjectStatsRead,
    ProjectUpdate,
    ReviewRecordCreate,
    ReviewRecordRead,
)
from app.services import (
    create_annotation,
    create_items,
    create_label,
    create_prediction,
    create_project,
    create_review_record,
    delete_annotation,
    delete_label,
    delete_project,
    delete_review_record,
    get_project_by_id,
    get_project_stats,
    label_is_in_use,
    list_annotations_by_item,
    list_items_by_project,
    list_labels_by_project,
    list_predictions_by_item,
    list_projects,
    list_review_records_by_annotation,
    update_project,
)

router = APIRouter()


@router.get("/projects", response_model=list[ProjectRead])
def list_projects_route(db: Session = Depends(get_db)) -> list[ProjectRead]:
    return list_projects(db)


@router.get("/projects/{project_id}", response_model=ProjectRead)
def get_project_route(project_id: int, db: Session = Depends(get_db)) -> ProjectRead:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project


@router.get("/projects/{project_id}/stats", response_model=ProjectStatsRead)
def get_project_stats_route(
    project_id: int, db: Session = Depends(get_db)
) -> ProjectStatsRead:
    stats = get_project_stats(db, project_id)
    if not stats:
        raise HTTPException(status_code=404, detail="Project not found.")
    return stats


@router.post("/projects", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project_route(
    payload: ProjectCreate, db: Session = Depends(get_db)
) -> ProjectRead:
    existing_project = db.query(Project).filter(Project.name == payload.name).first()
    if existing_project:
        raise HTTPException(status_code=400, detail="Project name already exists.")
    return create_project(db, payload)


@router.patch("/projects/{project_id}", response_model=ProjectRead)
def update_project_route(
    project_id: int, payload: ProjectUpdate, db: Session = Depends(get_db)
) -> ProjectRead:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")

    existing_project = (
        db.query(Project)
        .filter(Project.name == payload.name, Project.id != project_id)
        .first()
    )
    if existing_project:
        raise HTTPException(status_code=400, detail="Project name already exists.")

    return update_project(db, project, payload)


@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_route(project_id: int, db: Session = Depends(get_db)) -> None:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    delete_project(db, project)


@router.post(
    "/projects/{project_id}/labels",
    response_model=LabelRead,
    status_code=status.HTTP_201_CREATED,
)
def create_label_route(
    project_id: int, payload: LabelCreate, db: Session = Depends(get_db)
) -> LabelRead:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return create_label(db, project_id, payload)


@router.get("/projects/{project_id}/labels", response_model=list[LabelRead])
def list_labels_route(
    project_id: int, db: Session = Depends(get_db)
) -> list[LabelRead]:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return list_labels_by_project(db, project_id)


@router.delete("/labels/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_label_route(label_id: int, db: Session = Depends(get_db)) -> None:
    label = db.query(Label).filter(Label.id == label_id).first()
    if not label:
        raise HTTPException(status_code=404, detail="Label not found.")
    if label_is_in_use(db, label_id):
        raise HTTPException(
            status_code=400,
            detail="Label is already used by predictions or annotations.",
        )
    delete_label(db, label)


@router.post(
    "/projects/{project_id}/items",
    response_model=list[ItemRead],
    status_code=status.HTTP_201_CREATED,
)
def create_items_route(
    project_id: int, payload: ItemBatchCreate, db: Session = Depends(get_db)
) -> list[ItemRead]:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return create_items(db, project_id, payload)


@router.get("/projects/{project_id}/items", response_model=list[ItemRead])
def list_items_route(project_id: int, db: Session = Depends(get_db)) -> list[ItemRead]:
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return list_items_by_project(db, project_id)


@router.post(
    "/items/{item_id}/predictions",
    response_model=PredictionRead,
    status_code=status.HTTP_201_CREATED,
)
def create_prediction_route(
    item_id: int, payload: PredictionCreate, db: Session = Depends(get_db)
) -> PredictionRead:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")

    label = (
        db.query(Label)
        .filter(Label.id == payload.label_id, Label.project_id == item.project_id)
        .first()
    )
    if not label:
        raise HTTPException(status_code=400, detail="Label does not belong to this item's project.")

    return create_prediction(db, item_id, payload)


@router.get("/items/{item_id}/predictions", response_model=list[PredictionRead])
def list_predictions_route(
    item_id: int, db: Session = Depends(get_db)
) -> list[PredictionRead]:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")
    return list_predictions_by_item(db, item_id)


@router.post(
    "/items/{item_id}/annotations",
    response_model=AnnotationRead,
    status_code=status.HTTP_201_CREATED,
)
def create_annotation_route(
    item_id: int, payload: AnnotationCreate, db: Session = Depends(get_db)
) -> AnnotationRead:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")

    label = (
        db.query(Label)
        .filter(Label.id == payload.label_id, Label.project_id == item.project_id)
        .first()
    )
    if not label:
        raise HTTPException(status_code=400, detail="Label does not belong to this item's project.")

    return create_annotation(db, item_id, payload)


@router.get("/items/{item_id}/annotations", response_model=list[AnnotationRead])
def list_annotations_route(
    item_id: int, db: Session = Depends(get_db)
) -> list[AnnotationRead]:
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")
    return list_annotations_by_item(db, item_id)


@router.delete("/annotations/{annotation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_annotation_route(annotation_id: int, db: Session = Depends(get_db)) -> None:
    annotation = db.query(Annotation).filter(Annotation.id == annotation_id).first()
    if not annotation:
        raise HTTPException(status_code=404, detail="Annotation not found.")
    delete_annotation(db, annotation)


@router.post(
    "/annotations/{annotation_id}/reviews",
    response_model=ReviewRecordRead,
    status_code=status.HTTP_201_CREATED,
)
def create_review_record_route(
    annotation_id: int, payload: ReviewRecordCreate, db: Session = Depends(get_db)
) -> ReviewRecordRead:
    annotation = db.query(Annotation).filter(Annotation.id == annotation_id).first()
    if not annotation:
        raise HTTPException(status_code=404, detail="Annotation not found.")
    return create_review_record(db, annotation_id, payload)


@router.get(
    "/annotations/{annotation_id}/reviews",
    response_model=list[ReviewRecordRead],
)
def list_review_records_route(
    annotation_id: int, db: Session = Depends(get_db)
) -> list[ReviewRecordRead]:
    annotation = db.query(Annotation).filter(Annotation.id == annotation_id).first()
    if not annotation:
        raise HTTPException(status_code=404, detail="Annotation not found.")
    return list_review_records_by_annotation(db, annotation_id)


@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review_record_route(review_id: int, db: Session = Depends(get_db)) -> None:
    review_record = db.query(ReviewRecord).filter(ReviewRecord.id == review_id).first()
    if not review_record:
        raise HTTPException(status_code=404, detail="Review record not found.")
    delete_review_record(db, review_record)
