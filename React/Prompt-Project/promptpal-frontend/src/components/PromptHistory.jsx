import { useEffect, useState } from 'react';
import axios from 'axios';

const PromptHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/prompts/history');
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
  }, []);

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
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">📜</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Past Prompts</h2>
              <p className="text-gray-300 text-sm">Your analysis history</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-300 text-lg">Loading your history...</p>
              <div className="mt-2 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
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
              <p className="text-gray-300 text-sm">Your analysis history</p>
            </div>
          </div>
          
          <button
            onClick={fetchHistory}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-2">
              <span>🔄</span>
              <span>Refresh</span>
            </div>
          </button>
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

        {history.length === 0 ? (
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
                className={`backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedItem(selectedItem === item._id ? null : item._id)}
              >
                {/* Header with score and date */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getScoreColor(item.score)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {item.score}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{formatDate(item.createdAt)}</div>
                      <div className="text-xs text-gray-500">Score: {item.score}/10</div>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {selectedItem === item._id ? '▼' : '▶'}
                  </button>
                </div>
                
                {/* Original prompt */}
                <div className="mb-3">
                  <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                    <span>💭</span>
                    <span>Original Prompt</span>
                  </h4>
                  <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-200 border border-white/10">
                    {item.text}
                  </div>
                </div>

                {/* Expandable details */}
                {selectedItem === item._id && (
                  <div className="mt-4 space-y-4 animate-slide-down">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-300 mb-2 flex items-center space-x-2">
                          <span>💡</span>
                          <span>Suggestions</span>
                        </h4>
                        <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                          {item.suggestions}
                        </div>
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                        <h4 className="font-semibold text-green-300 mb-2 flex items-center space-x-2">
                          <span>✏️</span>
                          <span>Improved Version</span>
                        </h4>
                        <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                          {item.rewrite}
                        </div>
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
