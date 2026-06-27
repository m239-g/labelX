from sqlalchemy.orm import Session

from app.models import Annotation, Item, Prediction
from app.schemas import AnnotationCreate


def create_annotation(db: Session, item_id: int, payload: AnnotationCreate) -> Annotation:
    annotation = Annotation(
        item_id=item_id,
        label_id=payload.label_id,
        annotator_name=payload.annotator_name,
        notes=payload.notes,
        is_final=payload.is_final,
    )
    db.add(annotation)
    item = db.query(Item).filter(Item.id == item_id).first()
    if item:
        item.status = "annotated"
    db.commit()
    db.refresh(annotation)
    return annotation


def list_annotations_by_item(db: Session, item_id: int) -> list[Annotation]:
    return (
        db.query(Annotation)
        .filter(Annotation.item_id == item_id)
        .order_by(Annotation.id.desc())
        .all()
    )


def delete_annotation(db: Session, annotation: Annotation) -> None:
    item = db.query(Item).filter(Item.id == annotation.item_id).first()

    db.delete(annotation)
    db.flush()

    if item:
        has_annotations = db.query(Annotation).filter(Annotation.item_id == item.id).first() is not None
        has_predictions = db.query(Prediction).filter(Prediction.item_id == item.id).first() is not None

        if has_annotations:
            item.status = "annotated"
        elif has_predictions:
            item.status = "predicted"
        else:
            item.status = "pending"

    db.commit()
