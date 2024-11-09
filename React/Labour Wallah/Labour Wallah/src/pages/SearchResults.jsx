import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Search className="h-6 w-6 text-gray-400 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Search functionality will be implemented here...
          </p>
        </div>
      </div>
    </div>
  );
}