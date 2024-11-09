import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Wallet, Bell, Calendar, Star, Settings, Clock, DollarSign, UserCircle, ChevronRight } from 'lucide-react';

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">This Month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹12,500</h3>
          <p className="text-gray-600">Total Earnings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">This Month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">23</h3>
          <p className="text-gray-600">Jobs Completed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Overall</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
        </div>
        <div className="divide-y">
          {[1, 2, 3].map((booking) => (
            <div key={booking} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">House Painting</h3>
                  <p className="text-sm text-gray-600">John Doe • Andheri West</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Tomorrow, 10:00 AM</span>
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
    </div>
  );
}

function WalletSection() {
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
        <div className="text-3xl font-bold mb-4">₹12,500</div>
        <button
          onClick={() => setShowWithdraw(true)}
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
        >
          Withdraw Funds
        </button>
      </div>

      {showWithdraw && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account
                </label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>HDFC Bank ****1234</option>
                  <option>Add New Account</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowWithdraw(false);
                    // Add withdrawal logic
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        <div className="divide-y">
          {[1, 2, 3].map((transaction) => (
            <div key={transaction} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Payment Received</h3>
                <p className="text-sm text-gray-600">From: John Doe</p>
                <div className="text-sm text-gray-500">March 15, 2024</div>
              </div>
              <div className="text-green-600 font-semibold">+₹2,500</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserCircle },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
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
              <h2 className="text-xl font-semibold">Rajesh Kumar</h2>
              <p className="text-gray-600">Professional Painter</p>
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
            {activeTab === 'wallet' && <WalletSection />}
            {/* Add other sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}