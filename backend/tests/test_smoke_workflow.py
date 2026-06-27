from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import app.main as main_module
from app.db.base import Base
from app.db.session import get_db


@pytest.fixture
def client(tmp_path: Path):
    db_path = tmp_path / "smoke_test.db"
    test_engine = create_engine(
        f"sqlite:///{db_path}",
        connect_args={"check_same_thread": False},
    )
    testing_session_local = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=test_engine,
    )

    Base.metadata.create_all(bind=test_engine)

    def override_get_db():
        db = testing_session_local()
        try:
            yield db
        finally:
            db.close()

    app = main_module.app
    original_engine = main_module.engine
    main_module.engine = test_engine
    app.dependency_overrides[get_db] = override_get_db

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.clear()
        main_module.engine = original_engine
        Base.metadata.drop_all(bind=test_engine)
        test_engine.dispose()


def test_full_annotation_workflow_smoke(client: TestClient) -> None:
    project_response = client.post(
        "/projects",
        json={
            "name": "Smoke Workflow",
            "description": "Main flow regression test",
            "task_type": "single_label_classification",
        },
    )
    assert project_response.status_code == 201
    project_id = project_response.json()["id"]

    project_update_response = client.patch(
        f"/projects/{project_id}",
        json={
            "name": "Smoke Workflow Updated",
            "description": "Updated description",
        },
    )
    assert project_update_response.status_code == 200
    updated_project = project_update_response.json()
    assert updated_project["name"] == "Smoke Workflow Updated"
    assert updated_project["description"] == "Updated description"

    empty_project_response = client.post(
        "/projects",
        json={
            "name": "Delete Me",
            "description": "Temporary project",
            "task_type": "single_label_classification",
        },
    )
    assert empty_project_response.status_code == 201
    empty_project_id = empty_project_response.json()["id"]

    empty_project_delete_response = client.delete(f"/projects/{empty_project_id}")
    assert empty_project_delete_response.status_code == 204

    label_response = client.post(
        f"/projects/{project_id}/labels",
        json={
            "name": "Positive",
            "color": "green",
            "description": "Positive sentiment",
            "display_order": 1,
        },
    )
    assert label_response.status_code == 201
    label_id = label_response.json()["id"]

    unused_label_response = client.post(
        f"/projects/{project_id}/labels",
        json={
            "name": "Negative",
            "color": "red",
            "description": "Negative sentiment",
            "display_order": 2,
        },
    )
    assert unused_label_response.status_code == 201
    unused_label_id = unused_label_response.json()["id"]

    items_response = client.post(
        f"/projects/{project_id}/items",
        json={
            "items": [
                {
                    "external_id": "smoke-1",
                    "content": "This workflow should stay stable.",
                    "source": "smoke.csv",
                }
            ]
        },
    )
    assert items_response.status_code == 201
    item = items_response.json()[0]
    item_id = item["id"]
    assert item["status"] == "pending"

    prediction_response = client.post(
        f"/items/{item_id}/predictions",
        json={
            "label_id": label_id,
            "model_name": "demo-model",
            "confidence": 0.91,
        },
    )
    assert prediction_response.status_code == 201

    predicted_items_response = client.get(f"/projects/{project_id}/items")
    assert predicted_items_response.status_code == 200
    assert predicted_items_response.json()[0]["status"] == "predicted"

    annotation_response = client.post(
        f"/items/{item_id}/annotations",
        json={
            "label_id": label_id,
            "annotator_name": "Alice",
            "notes": "Confirmed by human",
            "is_final": True,
        },
    )
    assert annotation_response.status_code == 201
    annotation_id = annotation_response.json()["id"]

    annotations_response = client.get(f"/items/{item_id}/annotations")
    assert annotations_response.status_code == 200
    annotations = annotations_response.json()
    assert len(annotations) == 1
    assert annotations[0]["id"] == annotation_id

    annotated_items_response = client.get(f"/projects/{project_id}/items")
    assert annotated_items_response.status_code == 200
    assert annotated_items_response.json()[0]["status"] == "annotated"

    review_response = client.post(
        f"/annotations/{annotation_id}/reviews",
        json={
            "reviewer_name": "Bob",
            "is_approved": True,
            "comment": "Looks good",
        },
    )
    assert review_response.status_code == 201

    reviews_response = client.get(f"/annotations/{annotation_id}/reviews")
    assert reviews_response.status_code == 200
    reviews = reviews_response.json()
    assert len(reviews) == 1
    assert reviews[0]["is_approved"] is True
    review_id = reviews[0]["id"]

    used_label_delete_response = client.delete(f"/labels/{label_id}")
    assert used_label_delete_response.status_code == 400

    unused_label_delete_response = client.delete(f"/labels/{unused_label_id}")
    assert unused_label_delete_response.status_code == 204

    delete_review_response = client.delete(f"/reviews/{review_id}")
    assert delete_review_response.status_code == 204

    reviews_after_delete_response = client.get(f"/annotations/{annotation_id}/reviews")
    assert reviews_after_delete_response.status_code == 200
    assert reviews_after_delete_response.json() == []

    stats_response = client.get(f"/projects/{project_id}/stats")
    assert stats_response.status_code == 200
    stats = stats_response.json()
    assert stats["label_count"] == 1
    assert stats["item_count"] == 1
    assert stats["prediction_count"] == 1
    assert stats["annotation_count"] == 1
    assert stats["review_count"] == 0
    assert stats["item_status"] == {
        "pending": 0,
        "predicted": 0,
        "annotated": 1,
    }

    delete_project_response = client.delete(f"/projects/{project_id}")
    assert delete_project_response.status_code == 204

    deleted_project_response = client.get(f"/projects/{project_id}")
    assert deleted_project_response.status_code == 404
