from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api/recruiters", tags=["recruiters"])

@router.get("/dashboard")
async def get_dashboard():
    """
    Returns candidate heatmap/rankings for recruiter.
    Mocked.
    """
    mock_candidates = [
        {"name": "Alice Smith", "skills": ["Python", "FastAPI"], "match_score": 95, "verified_badges": ["Python Master"]},
        {"name": "Bob Jones", "skills": ["React", "Node.js"], "match_score": 88, "verified_badges": ["React Pro"]},
        {"name": "Charlie Brown", "skills": ["Python"], "match_score": 60, "verified_badges": []}
    ]
    return {"candidates": mock_candidates}
