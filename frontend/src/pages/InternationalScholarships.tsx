import React, { useState } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';

interface Scholarship {
  name: string;
  location: string;
  amount: string;
  deadline: string;
  description?: string;
}

export default function InternationalScholarships() {
  const [criteria, setCriteria] = useState({
    name: '',
    location: '',
    amount: '',
    deadline: '',
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchScholarships = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/find_international_scholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      });

      if (!response.ok) throw new Error(`Failed to fetch scholarships: ${response.status}`);

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setScholarships(data.matching_scholarships || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchScholarships();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Find International Scholarships
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filter Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Scholarship Name"
                  value={criteria.name}
                  onChange={(e) => setCriteria({ ...criteria, name: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Location"
                  value={criteria.location}
                  onChange={(e) => setCriteria({ ...criteria, location: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Amount Range"
                  value={criteria.amount}
                  onChange={(e) => setCriteria({ ...criteria, amount: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={criteria.deadline}
                  onChange={(e) => setCriteria({ ...criteria, deadline: e.target.value })}
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-6">
              {scholarships.length > 0 ? (
                scholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.name} scholarship={scholarship} />
                ))
              ) : (
                <p className="text-gray-500">No scholarships found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
