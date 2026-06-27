# Continue Notes

Project directory: `Y:\codex\0624`

This is an AI data annotation management platform MVP.

Current progress:

- FastAPI backend scaffold is in place
- Core entities are implemented: project, label, item, prediction, annotation, review
- Basic APIs are implemented
- Stats API is implemented
- Frontend workbench is implemented
- Current frontend layout:
  - left: text item list
  - right top: current text content
  - right bottom: 4 function blocks
    - top left: human annotation
    - top right: AI prediction
    - bottom left: label management
    - bottom right: review
- Quick labels are inside the human annotation block
- Annotation delete feature is implemented

Important files to read first when resuming:

- `ROADMAP.md`
- `ck.png`
- `backend/app/api/routes.py`
- `backend/app/services/annotation_service.py`
- `frontend/index.html`
- `frontend/assets/app.js`
- `frontend/assets/styles.css`

Suggested resume prompt:

```text
Continue this project in Y:\codex\0624. First read the current backend, frontend, ROADMAP.md, and ck.png, then continue from the existing state.
```
