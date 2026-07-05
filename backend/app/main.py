from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import config
from .routes.explain import router as explain_router

app = FastAPI(title="RePair AI backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(explain_router)


@app.get("/health")
def health():
    return {"status": "ok"}
