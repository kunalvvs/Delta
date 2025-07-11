import React, { useState } from 'react';
import './ToggleComponent.css';

const ToggleComponent = () => {
  // State to track which div is visible (true = one, false = two)
  const [showOne, setShowOne] = useState(false);

  const handleToggle = () => {
    setShowOne(!showOne);
  };

  return (
    <div>
      <div className="container">
        <div className={`one ${!showOne ? 'hidden' : ''}`}></div>
        <div className={`two ${showOne ? 'hidden' : ''}`}></div>
      </div>
      <button 
        onClick={handleToggle}
        style={{
          border: '3px solid goldenrod',
          backgroundColor: 'rgba(16, 38, 145, 0.5)',
          color: 'whitesmoke'
        }}
      >
        Toggle
      </button>
    </div>
  );
};

export default ToggleComponent;
