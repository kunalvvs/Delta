import React from 'react';
import './App.css';
import SelfieCamera from './components/SelfieCamera';

/**
 * Main App Component
 * Renders the Selfie Camera application with title and camera component
 */
function App() {
  return (
    <div className="app">
      <h1 className="app-title">📸 Selfie Camera</h1>
      <SelfieCamera />
    </div>
  );
}

export default App;
