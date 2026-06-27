from sqlalchemy.orm import Session

from app.models import Annotation, Label, Prediction
from app.schemas import LabelCreate


def create_label(db: Session, project_id: int, payload: LabelCreate) -> Label:
    label = Label(
        project_id=project_id,
        name=payload.name,
        color=payload.color,
        description=payload.description,
        display_order=payload.display_order,
    )
    db.add(label)
    db.commit()
    db.refresh(label)
    return label


def list_labels_by_project(db: Session, project_id: int) -> list[Label]:
    return (
        db.query(Label)
        .filter(Label.project_id == project_id)
        .order_by(Label.display_order.asc(), Label.id.asc())
        .all()
    )


def label_is_in_use(db: Session, label_id: int) -> bool:
    has_predictions = db.query(Prediction).filter(Prediction.label_id == label_id).first() is not None
    has_annotations = db.query(Annotation).filter(Annotation.label_id == label_id).first() is not None
    return has_predictions or has_annotations


def delete_label(db: Session, label: Label) -> None:
    db.delete(label)
    db.commit()
