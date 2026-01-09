import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MissingSkill {
    name: string;
    category: string;
    importance: 'High' | 'Medium' | 'Low';
}

interface AnalysisResult {
    match_score: number;
    job_title: string;
    missing_skills: MissingSkill[];
    error?: string;
}

const SkillCheckPage: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('job_description', jobDescription);

        try {
            const response = await fetch('http://localhost:8000/api/skills/parse', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to analyze skills');
            }

            setResult(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getImportanceColor = (importance: string) => {
        switch (importance) {
            case 'High': return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
            <p className="text-gray-600 mb-8">Upload your resume and the job description to get an AI-powered analysis of your skill gaps.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/Docx)</label>
                    <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                    <textarea
                        rows={6}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border placeholder-gray-400"
                        placeholder="Paste the job description here..."
                    />
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !file || !jobDescription}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing with AI...
                        </span>
                    ) : 'Analyze Skills'}
                </button>
            </form>

            {result && (
                <div className="mt-8 space-y-6">
                    {/* Score Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Match Score</h2>
                            <p className="text-sm text-gray-500">Based on {result.job_title}</p>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-4xl font-bold ${result.match_score >= 80 ? 'text-green-600' : result.match_score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {result.match_score}%
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recommended Skills to Acquire</h3>
                            <button
                                onClick={() => navigate('/roadmap', { state: { missing_skills: result.missing_skills, job_title: result.job_title } })}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all"
                            >
                                Generate AI Roadmap →
                            </button>
                        </div>
                        {(result.missing_skills || []).length === 0 ? (
                            <p className="text-green-600">Great job! You seem to have all the required skills.</p>
                        ) : (
                            <ul className="space-y-3">
                                {(result.missing_skills || []).map((skill, idx) => (
                                    <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="mb-2 sm:mb-0">
                                            <span className="font-semibold text-gray-900 block">{skill.name}</span>
                                            <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 inline-block mt-1">
                                                {skill.category}
                                            </span>
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getImportanceColor(skill.importance)}`}>
                                            {skill.importance} Priority
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillCheckPage;
