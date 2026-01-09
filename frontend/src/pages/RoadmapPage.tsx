import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface WeekPlan {
    week_number: number;
    theme: string;
    topics: string[];
    project: string;
}

interface Roadmap {
    title: string;
    description: string;
    weeks: WeekPlan[];
    error?: string;
}

const RoadmapPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { missing_skills, job_title } = location.state || {};

    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!missing_skills || missing_skills.length === 0) {
            // If accessed directly without data, redirect or show message
            return;
        }

        const fetchRoadmap = async () => {
            setLoading(true);
            try {
                // Determine clean list of skills
                const skillNames = missing_skills.map((s: any) => s.name || s);

                const response = await fetch('http://localhost:8000/api/roadmap/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        missing_skills: skillNames,
                        job_role: job_title || "Software Engineer"
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || data.error || 'Failed to generate roadmap');

                setRoadmap(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmap();
    }, [missing_skills, job_title]);

    if (!missing_skills) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">No Data Found</h2>
                <p className="text-gray-600 mb-6">Please analyze your skills first to generate a roadmap.</p>
                <button
                    onClick={() => navigate('/parse')}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                    Go to Skill Checker
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Learning Roadmap</h1>
            <p className="text-gray-600 mb-8">
                Target Role: <span className="font-semibold text-indigo-600">{job_title}</span>
            </p>

            {loading && (
                <div className="text-center py-12">
                    <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-500">Generating your custom curriculum with AI...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6">
                    Error: {error}
                </div>
            )}

            {roadmap && (
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{roadmap.title}</h2>
                        <p className="text-gray-600">{roadmap.description}</p>
                    </div>

                    <div className="space-y-6">
                        {(roadmap.weeks || []).map((week) => (
                            <div key={week.week_number} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                                    <h3 className="font-bold text-indigo-800 text-lg">Week {week.week_number}: {week.theme}</h3>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-semibold text-gray-700 mb-2">Topics:</h4>
                                    <ul className="list-disc list-inside space-y-1 mb-4 text-gray-600">
                                        {week.topics.map((topic, i) => (
                                            <li key={i}>{topic}</li>
                                        ))}
                                    </ul>

                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                        <span className="font-bold text-green-800 block mb-1">Project:</span>
                                        <p className="text-green-700 text-sm">{week.project}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoadmapPage;
