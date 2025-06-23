import React, { useState } from 'react';

function App() {
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (clickCount === 0 && showDiv2) {
      setShowDiv2(false);
      setClickCount(1);
    }
  };

  const handleDoubleClick = () => {
    if (showDiv1) {
      setShowDiv1(false);
    }
  };

  return (
    <div>
      {showDiv1 && <div style={{ background: 'lightblue', padding: '10px' }}>Div 1</div>}
      {showDiv2 && <div style={{ background: 'lightgreen', padding: '10px' }}>Div 2</div>}
      <div style={{ background: 'lightcoral', padding: '10px' }}>Div 3</div>

      <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
        Click or Double Click Me
      </button>
    </div>
  );
}

export default App;
