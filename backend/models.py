from typing import Optional
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str
    password_hash: str
    role: str = "student" # student, recruiter

class Resume(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    content: str

class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    recruiter_id: int = Field(foreign_key="user.id")
