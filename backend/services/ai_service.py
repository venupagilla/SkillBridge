import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "phi:latest") 

async def analyze_skills_with_ollama(resume_text: str, job_description: str) -> dict:
    """
    Analyzes the resume against the job description using a local Ollama model via /api/chat.
    """
    system_prompt = """
    You are an AI Recruiter. 
    Analyze the Resume against the Job Description (JD).
    
    If the input is NOT a resume (e.g. manual, code, book), return:
    {"job_title": "Invalid Document", "match_score": 0, "missing_skills": [{"name": "Invalid File", "category": "Error", "importance": "High"}]}

    If it IS a resume, return a JSON object with:
    1. "job_title": Extract from JD.
    2. "match_score": 0-100 integer.
    3. "missing_skills": A LIST of objects. 
       - CRITICAL: Only list skills that are REQUIRED in the JD but COMPLETELY ABSENT from the Resume.
       - Do NOT list skills if they are present (check for synonyms, e.g., "JS" = "JavaScript", "React.js" = "React").
       - Each object MUST have: "name", "category", "importance" ("High", "Medium", "Low").
    
    Example Response:
    {
        "job_title": "Software Engineer",
        "match_score": 75,
        "missing_skills": [
            {"name": "React", "category": "Frontend", "importance": "High"},
            {"name": "Docker", "category": "DevOps", "importance": "Medium"}
        ]
    }
    
    Return ONLY valid JSON. No Markdown. No extra text.
    """

    user_message = f"""
    RESUME:
    {resume_text[:4000]}
    
    JD:
    {job_description[:2000]}
    """
    
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "stream": False,
        "format": "json"
    }

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            # SWITCHING TO /api/chat
            response = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)
            
            # Check for non-200 status and read the error message
            if response.status_code != 200:
                error_body = response.text
                print(f"Ollama Error ({response.status_code}): {error_body}")
                return {
                    "error": f"Ollama Error: {error_body}",
                    "missing_skills": [],
                    "match_score": 0,
                    "job_title": "AI Error"
                }
            
            result = response.json()
            # In /api/chat, the content is in result['message']['content']
            generated_text = result.get("message", {}).get("content", "")
            
            if not generated_text:
                 # Fallback if structure is different
                 generated_text = result.get("response", "")

            # Additional cleanup
            if generated_text.startswith("```json"):
                generated_text = generated_text.replace("```json", "").replace("```", "")
            
            return json.loads(generated_text)
            
    except httpx.ConnectError:
        return {
            "error": "Could not connect to Ollama. Is it running on localhost:11434?",
            "missing_skills": [],
            "match_score": 0,
            "job_title": "Connection Error"
        }
    except json.JSONDecodeError:
        print(f"Failed to parse JSON from Ollama: {generated_text}")
        return {
            "error": "AI response was not valid JSON. Please try again.",
            "missing_skills": [],
            "match_score": 0,
            "job_title": "Parsing Error"
        }
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return {
            "error": f"AI processing failed: {str(e)}",
            "missing_skills": [],
            "match_score": 0,
            "job_title": "Error"
        }

async def generate_roadmap_with_ollama(missing_skills: list[str], job_role: str) -> dict:
    """
    Generates a learning roadmap based on missing skills using a local Ollama model.
    """
    system_prompt = """
    You are an expert Technical Career Coach.
    Create a 4-week learning roadmap to help a candidate acquire the specified Missing Skills for the target Job Role.
    
    Return a JSON object with this structure:
    {
        "title": "Roadmap Title",
        "description": "Brief overview",
        "weeks": [
            {
                "week_number": 1,
                "theme": "Core Concepts",
                "topics": ["Topic 1", "Topic 2"],
                "project": "Mini Project Idea"
            }
        ]
    }
    
    Keep it concise. Return ONLY valid JSON.
    """

    user_message = f"""
    JOB ROLE: {job_role}
    MISSING SKILLS: {', '.join(missing_skills)}
    """
    
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "stream": False,
        "format": "json"
    }

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)
            if response.status_code != 200:
                return {"error": f"Ollama Error: {response.text}"}
            
            result = response.json()
            generated_text = result.get("message", {}).get("content", "")
            
            if generated_text.startswith("```json"):
                generated_text = generated_text.replace("```json", "").replace("```", "")
            
            return json.loads(generated_text)
            
    except Exception as e:
        return {"error": f"Roadmap generation failed: {str(e)}"}
