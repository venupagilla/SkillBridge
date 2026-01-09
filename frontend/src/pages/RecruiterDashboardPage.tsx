import React, { useEffect, useState } from 'react';

const RecruiterDashboardPage: React.FC = () => {
    const [candidates, setCandidates] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/recruiters/dashboard')
            .then(res => res.json())
            .then(data => setCandidates(data.candidates));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruiter Dashboard</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {candidates.map((candidate, idx) => (
                        <li key={idx}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{candidate.name}</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {candidate.match_score}% Match
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {candidate.skills.join(', ')}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        {candidate.verified_badges.map((badge: string, bIdx: number) => (
                                            <span key={bIdx} className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecruiterDashboardPage;
