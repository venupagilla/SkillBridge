from fastapi import FastAPI
from database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
from routers import skills, tasks, recruiters, roadmap

app = FastAPI(title="SkillBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(skills.router)
app.include_router(tasks.router)
app.include_router(recruiters.router)
app.include_router(roadmap.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/health")
def health_check():
    return {"status": "healthy"}
