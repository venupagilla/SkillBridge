from fastapi import APIRouter, HTTPException, Body
from typing import List
from pydantic import BaseModel
from services.ai_service import generate_roadmap_with_ollama

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])

class RoadmapRequest(BaseModel):
    missing_skills: List[str]
    job_role: str

@router.post("/generate")
async def generate_roadmap(request: RoadmapRequest):
    """
    Generates a learning roadmap based on missing skills.
    """
    if not request.missing_skills:
        return {"error": "No missing skills provided. You are good to go!"}
        
    roadmap = await generate_roadmap_with_ollama(request.missing_skills, request.job_role)
    
    if "error" in roadmap:
        raise HTTPException(status_code=500, detail=roadmap["error"])
        
    return roadmap
