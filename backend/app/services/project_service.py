from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models import Annotation, Item, Label, Prediction, Project, ReviewRecord
from app.schemas import ItemStatusStats, ProjectCreate, ProjectStatsRead, ProjectUpdate


def create_project(db: Session, payload: ProjectCreate) -> Project:
    project = Project(
        name=payload.name,
        description=payload.description,
        task_type=payload.task_type,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def list_projects(db: Session) -> list[Project]:
    return db.query(Project).order_by(Project.id.desc()).all()


def get_project_by_id(db: Session, project_id: int) -> Project | None:
    return db.query(Project).filter(Project.id == project_id).first()


def update_project(db: Session, project: Project, payload: ProjectUpdate) -> Project:
    project.name = payload.name
    project.description = payload.description
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project: Project) -> None:
    db.delete(project)
    db.commit()


def get_project_stats(db: Session, project_id: int) -> ProjectStatsRead | None:
    project = get_project_by_id(db, project_id)
    if not project:
        return None

    label_count = db.query(func.count(Label.id)).filter(Label.project_id == project_id).scalar() or 0
    item_count = db.query(func.count(Item.id)).filter(Item.project_id == project_id).scalar() or 0
    prediction_count = (
        db.query(func.count(Prediction.id))
        .join(Item, Prediction.item_id == Item.id)
        .filter(Item.project_id == project_id)
        .scalar()
        or 0
    )
    annotation_count = (
        db.query(func.count(Annotation.id))
        .join(Item, Annotation.item_id == Item.id)
        .filter(Item.project_id == project_id)
        .scalar()
        or 0
    )
    review_count = (
        db.query(func.count(ReviewRecord.id))
        .join(Annotation, ReviewRecord.annotation_id == Annotation.id)
        .join(Item, Annotation.item_id == Item.id)
        .filter(Item.project_id == project_id)
        .scalar()
        or 0
    )

    status_rows = (
        db.query(Item.status, func.count(Item.id))
        .filter(Item.project_id == project_id)
        .group_by(Item.status)
        .all()
    )
    status_map = {status: count for status, count in status_rows}

    return ProjectStatsRead(
        project_id=project.id,
        project_name=project.name,
        label_count=label_count,
        item_count=item_count,
        prediction_count=prediction_count,
        annotation_count=annotation_count,
        review_count=review_count,
        item_status=ItemStatusStats(
            pending=status_map.get("pending", 0),
            predicted=status_map.get("predicted", 0),
            annotated=status_map.get("annotated", 0),
        ),
    )
