import React, { useState } from 'react';
import axios from 'axios';
import { IndianScholarshipCriteria } from '../types';
import ScholarshipCard from '../components/ScholarshipCard';

export default function IndianScholarships() {
  const [criteria, setCriteria] = useState<IndianScholarshipCriteria>({
    education: '',
    qualification: '',
    gender: '',
    community: '',
    religion: '',
    isExServiceman: false,
    hasDisability: false,
    hasSportsAchievements: false,
    annualPercentage: 0,
    income: 0,
  });

  const [scholarships, setScholarships] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

  
    const formattedData = {
      "Education Qualification": criteria.education,
      Gender: criteria.gender,
      Community: criteria.community,
      Religion: criteria.religion,
      "Exservice-men": criteria.isExServiceman ? "Yes" : "No",
      Disability: criteria.hasDisability ? "Yes" : "No",
      Sports: criteria.hasSportsAchievements ? "Yes" : "No",
      "Annual-Percentage": criteria.annualPercentage >= 90 ? "90-100" : "<90",
      Income: criteria.income <= 150000 ? "Upto 1.5L" : ">1.5L",
    };

    console.log("Sending data to Flask:", formattedData); // Debugging

    try {
      const response = await axios.post('http://localhost:5000/find_indian_scholarships', formattedData);
      setScholarships(response.data.matching_scholarships || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setError('Failed to fetch scholarships. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Find Indian Scholarships
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filter Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Education Level
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                    value={criteria.education}
                    onChange={(e) => setCriteria({ ...criteria, education: e.target.value })}
                  >
                    <option value="">Select Education Level</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                    value={criteria.gender}
                    onChange={(e) => setCriteria({ ...criteria, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Annual Percentage
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                    value={criteria.annualPercentage}
                    onChange={(e) => setCriteria({ ...criteria, annualPercentage: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Annual Family Income (in Rs)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                    value={criteria.income}
                    onChange={(e) => setCriteria({ ...criteria, income: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-700"
                      checked={criteria.isExServiceman}
                      onChange={(e) => setCriteria({ ...criteria, isExServiceman: e.target.checked })}
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Ex-Serviceman
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-700"
                      checked={criteria.hasDisability}
                      onChange={(e) => setCriteria({ ...criteria, hasDisability: e.target.checked })}
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Person with Disability
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-700"
                      checked={criteria.hasSportsAchievements}
                      onChange={(e) => setCriteria({ ...criteria, hasSportsAchievements: e.target.checked })}
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Sports Achievement
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Finding..." : "Find Scholarships"}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {loading && <p className="text-indigo-600 dark:text-indigo-400">Searching scholarships...</p>}
              
              {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

              {!loading && scholarships.length === 0 && !error && (
                <p className="text-gray-500 dark:text-gray-400">No scholarships found. Try adjusting your criteria.</p>
              )}

              {scholarships.map((scholarship, index) => (
                <ScholarshipCard
                  key={index}
                  scholarship={{
                    id: index.toString(),
                    name: scholarship,
                    deadline: 'N/A',
                    amount: 'N/A',
                    description: 'No additional details available.',
                    location: 'India',
                    applicationLink: '#',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}