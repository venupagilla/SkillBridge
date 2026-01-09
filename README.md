# SkillBridge 🌉

SkillBridge is a comprehensive full-stack web application designed to bridge the gap between job seekers and employers. By leveraging AI to identify skill gaps, verifying competency through real-world simulations, and providing dynamic learning roadmaps, SkillBridge empowers candidates to be job-ready and helps recruiters find proven talent.

## 🚀 Key Features

*   **Skill Gap Parser**: intelligently analyzes resumes against job descriptions to identify missing skills.
*   **Verified SkillSims**: Interactive, real-world simulations that allow candidates to demonstrate their actual abilities, not just claim them.
*   **Dynamic Roadmap**: Generates personalized, AI-driven learning paths to close skill gaps effectively.
*   **Recruiter Heatmap & Dashboard**: Visualizes candidate data to help recruiters match with the best-fit talent based on verified skills.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (Vite)
*   **Styling**: [TailwindCSS](https://tailwindcss.com/)
*   **Language**: TypeScript

### Backend
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
*   **Language**: Python 3.x
*   **Database**: PostgreSQL (via SQLModel/SQLAlchemy)
*   **AI Integration**: Google Gemini API

### DevOps
*   **Containerization**: Docker & Docker Compose

## 📦 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
*   Node.js (v18+)
*   Python (v3.9+)
*   PostgreSQL (or Docker)

### 1. Backend Setup

Navigate to the backend directory and set up the environment.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`. API Docs at `http://localhost:8000/docs`.

### 2. Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
The application will be running at `http://localhost:5173`.

### 3. Docker (Optional)

You can run the entire stack using Docker Compose.

```bash
docker-compose up --build
```

## 📂 Project Structure

```
SkillBridge/
├── backend/            # FastAPI backend
│   ├── routers/        # API endpoints (skills, tasks, recruiters, etc.)
│   ├── services/       # Business logic & AI services
│   ├── models.py       # Database models
│   └── main.py         # Application entry point
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages
│   │   └── ...
│   └── ...
├── docker-compose.yml  # Container orchestration
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
