import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, verifyOtp } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      await login(phone);
      setIsOtpSent(true);
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(phone, otp);
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col justify-center bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Login to Labour Wallah
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {!isOtpSent ? "Enter your phone number to receive OTP" : "Enter the OTP sent to your phone"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={isOtpSent ? handleLogin : handleSendOtp}>
            <div className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+91</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) setPhone(value);
                    }}
                    disabled={isOtpSent}
                    className="block w-full pl-12 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 10-digit number"
                  />
                  <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {isOtpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 6) setOtp(value);
                      }}
                      className="block w-full pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter 6-digit OTP"
                    />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Didn't receive OTP?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsOtpSent(false);
                        setOtp('');
                      }}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Labour Wallah?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}