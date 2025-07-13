import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Configure axios base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

const PromptHistory = () => {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchHistory = async () => {
    if (!isAuthenticated) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/prompts/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Failed to load prompt history. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'from-green-400 to-emerald-400';
    if (score >= 6) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  };

  if (loading) {
    return (
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading your prompt history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      {/* Animated header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">📜</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Past Prompts</h2>
              <p className="text-gray-300 text-sm">
                {isAuthenticated ? 'Your analysis history' : 'Sign in to view your history'}
              </p>
            </div>
          </div>
          {isAuthenticated && (
            <button
              onClick={fetchHistory}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <span>🔄</span>
                <span>Refresh</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-200 rounded-xl animate-shake">
            <div className="flex items-center space-x-2">
              <span className="text-red-400">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sign in to view your history</h3>
            <p className="text-gray-400">Your analyzed prompts will be saved securely to your account</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No prompts analyzed yet</h3>
            <p className="text-gray-400">Start by analyzing your first prompt above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div 
                key={item._id || index} 
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedItem(selectedItem === item._id ? null : item._id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm mb-1 line-clamp-2">
                      {item.text}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div className={`ml-4 px-3 py-1 bg-gradient-to-r ${getScoreColor(item.score)} text-white text-sm font-bold rounded-full shadow-lg`}>
                    {item.score}/10
                  </div>
                </div>

                {selectedItem === item._id && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-slide-down">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-purple-300 font-semibold mb-2 flex items-center">
                          <span className="mr-2">💡</span>
                          Suggestions
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-3 rounded-lg">
                          {item.suggestions}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
                          <span className="mr-2">✨</span>
                          Improved Version
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-3 rounded-lg">
                          {item.rewrite}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptHistory;
