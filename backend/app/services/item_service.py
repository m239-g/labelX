from sqlalchemy.orm import Session

from app.models import Item
from app.schemas import ItemBatchCreate


def create_items(db: Session, project_id: int, payload: ItemBatchCreate) -> list[Item]:
    items = [
        Item(
            project_id=project_id,
            external_id=item.external_id,
            content=item.content,
            source=item.source,
        )
        for item in payload.items
    ]
    db.add_all(items)
    db.commit()
    for item in items:
        db.refresh(item)
    return items


def list_items_by_project(db: Session, project_id: int) -> list[Item]:
    return (
        db.query(Item)
        .filter(Item.project_id == project_id)
        .order_by(Item.id.desc())
        .all()
    )
