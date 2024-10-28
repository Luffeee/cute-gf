'use client'
import React, { useEffect, useState } from 'react';
import updatesData from './data/updates.json';

interface Update {
  date: string;
  content: string;
}

const UpdatesPage: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    setUpdates(updatesData);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Website Updates</h2>
        <ul className="space-y-3">
          {updates.map((update, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-lg font-semibold text-gray-800">{update.content}</div>
              <div className="text-gray-500 text-sm mt-1">
                Updated on: {new Date(update.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                })}
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdatesPage;
