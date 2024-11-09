import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingPage() {
  const { workerId } = useParams();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    paymentMethod: 'cash'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking successful! Worker will be notified.');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-2xl font-bold text-white">Book a Service</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Time
              </label>
              <div className="mt-1 relative">
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Address
              </label>
              <div className="mt-1 relative">
                <textarea
                  value={bookingData.address}
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your complete address"
                />
                <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={bookingData.paymentMethod === 'cash'}
                    onChange={() => setBookingData({ ...bookingData, paymentMethod: 'cash' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Cash on Service
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={bookingData.paymentMethod === 'online'}
                    onChange={() => setBookingData({ ...bookingData, paymentMethod: 'online' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Online Payment
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}