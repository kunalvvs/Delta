import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-[500px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Workers"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Find Skilled Workers for Your Every Need
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Connect with verified professionals for all your service requirements - from plumbing to painting, electrical work to general labor.
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            Find Services
          </button>
        </div>
      </div>
    </div>
  );
}