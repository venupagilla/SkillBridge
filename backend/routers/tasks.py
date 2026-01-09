from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

class TaskSubmission(BaseModel):
    task_id: int
    code: str
    language: str

@router.post("/verify")
async def verify_task(submission: TaskSubmission):
    """
    Verifies a coding task submission using AI.
    Mocked for MVP.
    """
    # MOCK LOGIC: AI would analyze code here
    
    is_correct = "print" in submission.code # Simple check
    
    return {
        "verified": is_correct,
        "badge_earned": "Python Beginner" if is_correct else None,
        "feedback": "Good job!" if is_correct else "Try using print assertion."
    }
