import React, { useState, useEffect } from 'react';
import { getPossibleMoves, isValidMove } from '../utils/chessLogic';
import { findBestMove } from '../utils/computerMove';
import { RotateCcw } from 'lucide-react';

const initialBoard = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

export default function ChessBoard({ gameMode, onReset }) {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: [],
  });

  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 'black') {
      // Add a small delay to make the computer's move feel more natural
      const timeoutId = setTimeout(() => {
        const move = findBestMove(board);
        if (move) {
          makeMove(move.from, move.to);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [gameMode, currentPlayer, board]);

  const makeMove = (from, to) => {
    const newBoard = [...board.map(row => [...row])];
    const targetPiece = newBoard[to.row][to.col];
    
    // Handle capture
    if (targetPiece) {
      setCapturedPieces(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], targetPiece],
      }));
    }

    newBoard[to.row][to.col] = board[from.row][from.col];
    newBoard[from.row][from.col] = null;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const handleSquareClick = (row, col) => {
    if (gameMode === 'computer' && currentPlayer === 'black') return;

    if (!selectedPiece) {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ row, col });
        setPossibleMoves(getPossibleMoves(board, { row, col }));
      }
    } else {
      const move = { row, col };
      if (isValidMove(board, selectedPiece, move, possibleMoves)) {
        makeMove(selectedPiece, move);
      }
      setSelectedPiece(null);
      setPossibleMoves([]);
    }
  };

  const getPieceSymbol = (piece) => {
    if (!piece) return '';
    const symbols = {
      'white-king': '♔',
      'white-queen': '♕',
      'white-rook': '♖',
      'white-bishop': '♗',
      'white-knight': '♘',
      'white-pawn': '♙',
      'black-king': '♚',
      'black-queen': '♛',
      'black-rook': '♜',
      'black-bishop': '♝',
      'black-knight': '♞',
      'black-pawn': '♟',
    };
    return symbols[`${piece.color}-${piece.type}`];
  };

  const calculateScore = (pieces) => {
    const pieceValues = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9,
      king: 0,
    };
    return pieces.reduce((sum, piece) => sum + pieceValues[piece.type], 0);
  };

  const ScoreBoard = ({ color }) => {
    const pieces = capturedPieces[color];
    const score = calculateScore(pieces);
    const isCurrentPlayer = color === currentPlayer;
    const isComputer = gameMode === 'computer' && color === 'black';

    return (
      <div className={`p-4 rounded-lg ${isCurrentPlayer ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <h3 className="text-lg font-bold mb-2 capitalize">
          {color} {isComputer ? '(Computer)' : 'Player'}
        </h3>
        <div className="flex flex-wrap gap-1 mb-2 min-h-8">
          {pieces.map((piece, index) => (
            <span key={index} className="text-2xl">
              {getPieceSymbol(piece)}
            </span>
          ))}
        </div>
        <div className="text-sm font-semibold">
          Score: {score} points
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentPlayer}'s Turn
        </h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>
      </div>
      <div className="flex gap-8 items-start">
        <ScoreBoard color="black" />
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-8 gap-0 border-2 border-gray-800">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
                const isPossibleMove = possibleMoves.some(
                  move => move.row === rowIndex && move.col === colIndex
                );
                const isLight = (rowIndex + colIndex) % 2 === 0;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    className={`
                      w-16 h-16 flex items-center justify-center text-4xl cursor-pointer
                      ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                      ${isSelected ? 'bg-blue-300' : ''}
                      ${isPossibleMove ? 'bg-green-200' : ''}
                      hover:opacity-80 transition-opacity
                    `}
                  >
                    {getPieceSymbol(piece)}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <ScoreBoard color="white" />
      </div>
    </div>
  );
}