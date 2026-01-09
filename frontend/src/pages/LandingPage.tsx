import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Bridge the gap between</span>
                    <span className="block text-indigo-600">skills and employment</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Analyze your skills against job descriptions, get a personalized roadmap, and verify your expertise with AI-graded tasks.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">
                        <Link to="/parse" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                            Check My Skills
                        </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                            For Recruiters
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to get hired
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Skill Gap Analysis</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Upload your resume and a job description to see what you're missing instantly.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Verified SkillSims</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Complete real-world coding tasks verified by AI to earn badges.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Dynamic Roadmap</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Get a personalized learning path with resources to fill your gaps.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
