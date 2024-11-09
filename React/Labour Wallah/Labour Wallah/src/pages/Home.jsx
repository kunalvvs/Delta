import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Paintbrush, Wrench, Zap } from 'lucide-react';

export default function Home() {
  const featuredServices = [
    {
      icon: <Paintbrush className="h-6 w-6 text-blue-600" />,
      title: "Professional Painting",
      rating: 4.8,
      price: "From ₹500/day",
      description: "Expert painters for interior and exterior painting"
    },
    {
      icon: <Wrench className="h-6 w-6 text-blue-600" />,
      title: "Plumbing Services",
      rating: 4.9,
      price: "From ₹600/day",
      description: "Experienced plumbers for all your plumbing needs"
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Electrical Work",
      rating: 4.7,
      price: "From ₹700/day",
      description: "Licensed electricians for safe and reliable service"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
          <p className="text-xl text-gray-600">Top-rated professionals ready to help</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Labour Wallah?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Verified Professionals</h3>
              <p className="text-gray-600">All workers are thoroughly verified and skilled in their trade</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Competitive Pricing</h3>
              <p className="text-gray-600">Get quality service at reasonable and transparent prices</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Instant Booking</h3>
              <p className="text-gray-600">Book services instantly and get confirmation in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}