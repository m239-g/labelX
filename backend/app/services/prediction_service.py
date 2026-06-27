from sqlalchemy.orm import Session

from app.models import Item, Prediction
from app.schemas import PredictionCreate


def create_prediction(db: Session, item_id: int, payload: PredictionCreate) -> Prediction:
    prediction = Prediction(
        item_id=item_id,
        label_id=payload.label_id,
        model_name=payload.model_name,
        confidence=payload.confidence,
    )
    db.add(prediction)
    item = db.query(Item).filter(Item.id == item_id).first()
    if item and item.status == "pending":
        item.status = "predicted"
    db.commit()
    db.refresh(prediction)
    return prediction


def list_predictions_by_item(db: Session, item_id: int) -> list[Prediction]:
    return (
        db.query(Prediction)
        .filter(Prediction.item_id == item_id)
        .order_by(Prediction.id.desc())
        .all()
    )
