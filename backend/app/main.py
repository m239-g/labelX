from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api import router
from app.db import Base, engine
from app import models

frontend_dir = Path(__file__).resolve().parents[2] / "frontend"


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Annotation Agent MVP", lifespan=lifespan)


app.include_router(router)
app.mount("/assets", StaticFiles(directory=frontend_dir / "assets"), name="assets")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def read_frontend() -> FileResponse:
    return FileResponse(frontend_dir / "index.html")
