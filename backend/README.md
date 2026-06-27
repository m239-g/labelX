# Backend

This folder contains the FastAPI backend for the annotation management MVP.

## What is already implemented

The backend currently supports these basic features:

- create a project
- add labels to a project
- import text items into a project
- auto-create SQLite tables when the app starts

## Project structure

- `app/main.py`: FastAPI app entry point
- `app/api/routes.py`: API routes
- `app/db/`: database base class and session setup
- `app/models/`: database models
- `app/schemas/`: request and response schemas
- `app/services/`: business logic

## Install dependencies

Open a terminal in the `backend` folder and run:

```bash
python -m venv .venv
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Run the server

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

After startup, open:

- API root: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

## Run the smoke test

After installing dependencies, run:

```bash
pytest
```

This smoke test covers the core workflow:

- create project
- create label
- import item
- save prediction
- save annotation
- save review
- verify project stats

## Current API

### Create a project

`POST /projects`

Example body:

```json
{
  "name": "Sentiment Demo",
  "description": "A simple text classification project",
  "task_type": "single_label_classification"
}
```

### Create labels for a project

`POST /projects/{project_id}/labels`

Example body:

```json
{
  "name": "Positive",
  "color": "green",
  "description": "Positive sentiment",
  "display_order": 1
}
```

### Import text items

`POST /projects/{project_id}/items`

Example body:

```json
{
  "items": [
    {
      "external_id": "row-1",
      "content": "This product is great.",
      "source": "demo.csv"
    },
    {
      "external_id": "row-2",
      "content": "The service was disappointing.",
      "source": "demo.csv"
    }
  ]
}
```

## Notes for beginners

- The database file will be created automatically as `annotation_agent.db` in the `backend` folder.
- You do not need MySQL or PostgreSQL yet. SQLite is enough for this MVP stage.
- Use `/docs` first. It is the easiest way to test your API without building a frontend.
