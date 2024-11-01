import React from 'react';

const Square = ({ piece, onClick, rowIndex, colIndex }) => {
  const getSymbol = (piece) => {
    if (!piece) return '';
    const unicodePieces = {
      w: { p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔' },
      b: { p: '♟︎', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚' },
    };
    return unicodePieces[piece.color][piece.type];
  };

  const isLightSquare = (rowIndex + colIndex) % 2 === 0;
  const squareColor = isLightSquare ? '#f0d9b5' : '#b58863';
  const hoverColor = isLightSquare ? '#d4c2a4' : '#8d6e54';

  const style = {
    width: '60px',
    height: '60px',
    backgroundColor: squareColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    cursor: 'pointer',
    color: piece && piece.color === 'b' ? '#444' : '#eee',
    transition: 'background-color 0.2s ease',
  };

  const handleMouseOver = (e) => (e.currentTarget.style.backgroundColor = hoverColor);
  const handleMouseOut = (e) => (e.currentTarget.style.backgroundColor = squareColor);

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {getSymbol(piece)}
    </div>
  );
};

export default Square;
