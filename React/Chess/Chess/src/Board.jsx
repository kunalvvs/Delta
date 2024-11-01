import React from 'react';
import Square from './Square';

const Board = ({ board, onSquareClick }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 60px)',
      width: '480px',
      border: '4px solid #333',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
      justifyItems:'center',
      alignItems:'center'
    }}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            piece={square}
            onClick={() => onSquareClick(rowIndex, colIndex)}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
