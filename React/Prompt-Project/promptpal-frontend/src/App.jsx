import { useState, useEffect } from 'react';
import PromptForm from './components/PromptForm';
import PromptHistory from './components/PromptHistory';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalysisComplete = () => {
    // Trigger a refresh of the history component
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-25"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* Header with animations */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-block mb-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              🧠 PromptPal
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light animate-fade-in">
            AI-Powered Prompt Optimizer & Analyzer
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        
        {/* Main content with staggered animations */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <PromptForm onAnalysisComplete={handleAnalysisComplete} />
        </div>
        
        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <PromptHistory key={refreshKey} />
        </div>
      </div>

      {/* Floating action button */}
      <div className={`fixed bottom-8 right-8 transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
