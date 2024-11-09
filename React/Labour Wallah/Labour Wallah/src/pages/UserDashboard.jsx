import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, Bell, Settings, Clock, MapPin, Star, ChevronRight } from 'lucide-react';

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600">Services Booked</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Status</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
          <p className="text-gray-600">Active Bookings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Average</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
          <p className="text-gray-600">Service Rating</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Upcoming Services</h2>
        </div>
        <div className="divide-y">
          {[1, 2].map((booking) => (
            <div key={booking} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Plumbing Service</h3>
                  <p className="text-sm text-gray-600">Suresh Patel</p>
                  <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Tomorrow, 2:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Home</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Service History</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((service) => (
                <div key={service} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">House Cleaning</h3>
                    <p className="text-sm text-gray-600">March 10, 2024</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-gray-600">4.8</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((notification) => (
                <div key={notification} className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Bell className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Your plumbing service has been confirmed.</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserCircle },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">Premium Member</p>
            </div>

            <nav className="bg-white rounded-xl shadow-md overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-6 py-3 text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === 'overview' && <Overview />}
            {/* Add other sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}