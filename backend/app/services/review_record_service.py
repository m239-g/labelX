from sqlalchemy.orm import Session

from app.models import ReviewRecord
from app.schemas import ReviewRecordCreate


def create_review_record(
    db: Session, annotation_id: int, payload: ReviewRecordCreate
) -> ReviewRecord:
    review_record = ReviewRecord(
        annotation_id=annotation_id,
        reviewer_name=payload.reviewer_name,
        is_approved=payload.is_approved,
        comment=payload.comment,
    )
    db.add(review_record)
    db.commit()
    db.refresh(review_record)
    return review_record


def list_review_records_by_annotation(
    db: Session, annotation_id: int
) -> list[ReviewRecord]:
    return (
        db.query(ReviewRecord)
        .filter(ReviewRecord.annotation_id == annotation_id)
        .order_by(ReviewRecord.id.desc())
        .all()
    )


def delete_review_record(db: Session, review_record: ReviewRecord) -> None:
    db.delete(review_record)
    db.commit()
