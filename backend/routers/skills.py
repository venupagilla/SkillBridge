from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Dict
from utils.file_parser import extract_text_from_file
from services.ai_service import analyze_skills_with_ollama

router = APIRouter(prefix="/api/skills", tags=["skills"])

@router.post("/parse")
async def parse_skills(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Parses a resume and job description to find missing skills using local Ollama model.
    """
    if not resume.filename.endswith(('.pdf', '.docx', '.txt')):
         raise HTTPException(status_code=400, detail="Invalid file format. Please upload PDF, DOCX, or TXT.")
    
    # 1. Extract text from uploaded resume
    try:
        resume_text = await extract_text_from_file(resume)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")

    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from the file.")

    # 2. Analyze with AI
    result = await analyze_skills_with_ollama(resume_text, job_description)
    
    if "error" in result:
        # If the error is due to missing API Key, we might want to return a helpful mock or error
        if "GEMINI_API_KEY not configured" in result["error"]:
             # Fallback to mock for demo purposes if key is missing, or raise error
             # For now, let's return the error so the user knows to set the key
             pass # result already contains error info
        else:
             print(f"AI Service Error: {result['error']}")

    return result
