import React from 'react';
import { Search, GraduationCap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block text-indigo-600 dark:text-indigo-400">Scholarship Match</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover scholarships tailored to your profile. Your educational journey starts here.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/indian-scholarships"
                className="rounded-md shadow px-8 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Find Your Scholarship
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search scholarships..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/indian-scholarships"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Indian Scholarships
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Find scholarships based on your education, community, and other criteria
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/international-scholarships"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  International Scholarships
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Explore global opportunities for higher education
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}