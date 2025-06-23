import React, { useState } from 'react';

function App() {
  const [visibility, setVisibility] = useState({
    div1: true,
    div2: true,
  });

  const handleClick = () => {
    if (visibility.div2) {
      setVisibility(prev => ({ ...prev, div2: false }));
    }
  };

  const handleDoubleClick = () => {
    if (visibility.div1) {
      setVisibility(prev => ({ ...prev, div1: false }));
    }
  };

  return (
    <div>
      {visibility.div1 && <div style={{ background: 'lightblue', padding: '10px' }}>Div 1</div>}
      {visibility.div2 && <div style={{ background: 'lightgreen', padding: '10px' }}>Div 2</div>}
      <div style={{ background: 'lightcoral', padding: '10px' }}>Div 3</div>

      <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
        Click or Double Click Me
      </button>
    </div>
  );
}

export default App;
