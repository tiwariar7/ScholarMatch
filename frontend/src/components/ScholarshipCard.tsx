import React from 'react';
import { Calendar, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { Scholarship } from '../types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {scholarship.name}
      </h3>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Deadline: {scholarship.deadline || 'N/A'}</span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{scholarship.location || 'N/A'}</span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <DollarSign className="w-5 h-5 mr-2" />
          <span>{scholarship.amount ? `$${scholarship.amount}` : 'N/A'}</span>
        </div>

        {scholarship.description && (
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {scholarship.description}
          </p>
        )}

        <a
          href={scholarship.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Apply Now
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
}
