import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-indigo-600">SkillBridge</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/parse" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Skill Parser
                            </Link>
                            <Link to="/roadmap" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Roadmap
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; 2026 SkillBridge. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
