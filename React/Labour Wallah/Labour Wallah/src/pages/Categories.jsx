import React from 'react';
import { Link } from 'react-router-dom';
import { Paintbrush, Wrench, HardHat, Hammer, Zap, Droplets } from 'lucide-react';

const categories = [
  {
    id: 'painters',
    icon: <Paintbrush className="h-12 w-12 text-blue-600" />,
    title: "Painters",
    description: "Professional painters for all your painting needs",
    workerCount: 150
  },
  {
    id: 'plumbers',
    icon: <Wrench className="h-12 w-12 text-blue-600" />,
    title: "Plumbers",
    description: "Expert plumbers for repairs and installations",
    workerCount: 120
  },
  {
    id: 'construction',
    icon: <HardHat className="h-12 w-12 text-blue-600" />,
    title: "Construction Workers",
    description: "Skilled construction workers and laborers",
    workerCount: 200
  },
  {
    id: 'carpenters',
    icon: <Hammer className="h-12 w-12 text-blue-600" />,
    title: "Carpenters",
    description: "Professional carpenters for woodwork",
    workerCount: 90
  },
  {
    id: 'electricians',
    icon: <Zap className="h-12 w-12 text-blue-600" />,
    title: "Electricians",
    description: "Licensed electricians for all electrical work",
    workerCount: 110
  },
  {
    id: 'cleaning',
    icon: <Droplets className="h-12 w-12 text-blue-600" />,
    title: "House Cleaning",
    description: "Professional cleaning services",
    workerCount: 180
  }
];

export default function Categories() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Categories</h1>
          <p className="text-xl text-gray-600">Choose from our wide range of professional services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-blue-50 rounded-full">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {category.description}
                </p>
                <div className="text-center text-blue-600">
                  {category.workerCount}+ Available Workers
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}