import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Configure axios base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

const PromptForm = ({ onAnalysisComplete }) => {
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (text.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to analyze prompts');
      return;
    }

    if (!text.trim()) {
      setError('Please enter a prompt to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await axios.post('/prompts/analyze', { 
        text: text.trim() 
      });
      setResponse(res.data);
      setText(''); // Clear the form after successful analysis
      if (onAnalysisComplete) {
        onAnalysisComplete(); // Trigger history refresh
      }
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err.response?.data?.error || 'Failed to analyze prompt. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl mb-8 overflow-hidden">
      {/* Animated header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-lg">🔍</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Analyze Your Prompt</h2>
            <p className="text-gray-300 text-sm">Get AI-powered insights and improvements</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Textarea with enhanced styling */}
        <div className="relative mb-6">
          <textarea
            className={`w-full p-4 border-2 rounded-xl resize-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 bg-white/5 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm ${
              isTyping ? 'border-purple-400 ring-purple-500/30' : ''
            } ${loading ? 'opacity-50' : ''}`}
            rows="4"
            placeholder="Enter your prompt here... (Ctrl+Enter to submit)"
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          
          {/* Character counter */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {charCount}/1000
          </div>
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="absolute top-2 right-2 flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          )}
        </div>
        
        {/* Error display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-200 rounded-xl animate-shake">
            <div className="flex items-center space-x-2">
              <span className="text-red-400">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Submit button with enhanced animations */}
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className={`relative overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            loading || !text.trim()
              ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Analyze Prompt</span>
            </div>
          )}
          
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {/* Results display with animations */}
        {response && (
          <div className="mt-8 space-y-6 animate-slide-up">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span className="text-2xl">✨</span>
                <span>AI Analysis Results</span>
              </h3>
              
              {/* Score display */}
              <div className="mb-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Power Score</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {response.score}/10
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(response.score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Suggestions and Rewrite */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4 border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-300 mb-3 flex items-center space-x-2">
                    <span>💡</span>
                    <span>Suggestions</span>
                  </h4>
                  <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {response.suggestions}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 border border-green-400/30">
                  <h4 className="font-semibold text-green-300 mb-3 flex items-center space-x-2">
                    <span>✏️</span>
                    <span>Improved Version</span>
                  </h4>
                  <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {response.rewrite}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptForm;
