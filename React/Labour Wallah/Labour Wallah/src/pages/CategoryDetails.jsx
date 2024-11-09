import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone } from 'lucide-react';

const workers = {
  painters: [
    {
      id: 'p1',
      name: 'Rajesh Kumar',
      image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.8,
      experience: '8 years',
      location: 'Mumbai Central',
      price: '₹600/day',
      phone: '+91 9876543210'
    },
    // Add more workers...
  ],
  plumbers: [
    {
      id: 'pl1',
      name: 'Suresh Patel',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      experience: '10 years',
      location: 'Andheri West',
      price: '₹700/day',
      phone: '+91 9876543211'
    },
    // Add more workers...
  ],
  // Add more categories...
};

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const categoryWorkers = workers[categoryId as keyof typeof workers] || [];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          Available {categoryId} in your area
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWorkers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{worker.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{worker.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{worker.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{worker.phone}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">{worker.price}</span>
                  <Link
                    to={`/book/${worker.id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}