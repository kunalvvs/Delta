// src/components/ChessGame.jsx
import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('start');

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // promote to queen
    });

    // If the move is legal, update the state
    if (move) {
      setFen(game.fen());
    }
  };

  const onSquareClick = (square) => {
    // You can implement square click logic if needed
  };

  const onUndo = () => {
    const history = game.history();
    if (history.length > 0) {
      game.undo();
      setFen(game.fen());
    }
  };

  return (
    <div>
      <h1>Chess Game</h1>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
      />
      <button onClick={onUndo}>Undo Move</button>
    </div>
  );
};

export default ChessGame;