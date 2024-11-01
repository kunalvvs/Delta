import React, { useState } from 'react';
import Board from './Board';
import { Chess } from 'chess.js';

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquareClick = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);
    if (selectedSquare) {
      const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
      if (move) {
        setBoard(game.board());
      }
      setSelectedSquare(null);
    } else if (game.get(square)) {
      setSelectedSquare(square);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#444' }}>Chess Game</h1>
      <Board board={board} onSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;
