import { getPossibleMoves } from './chessLogic';

export function findBestMove(board) {
  const allPossibleMoves = [];

  // Collect all possible moves for black pieces
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === 'black') {
        const moves = getPossibleMoves(board, { row, col });
        moves.forEach(move => {
          const targetPiece = board[move.row][move.col];
          let score = Math.random() * 10; // Add randomness to make moves less predictable

          // Prioritize captures based on piece values
          if (targetPiece) {
            const pieceValues = {
              pawn: 10,
              knight: 30,
              bishop: 30,
              rook: 50,
              queen: 90,
              king: 900,
            };
            score += pieceValues[targetPiece.type];
          }

          // Prioritize center control
          if (move.row >= 2 && move.row <= 5 && move.col >= 2 && move.col <= 5) {
            score += 5;
          }

          allPossibleMoves.push({
            from: { row, col },
            to: move,
            score,
          });
        });
      }
    }
  }

  if (allPossibleMoves.length === 0) return null;

  // Sort moves by score and pick the best one
  allPossibleMoves.sort((a, b) => b.score - a.score);
  return {
    from: allPossibleMoves[0].from,
    to: allPossibleMoves[0].to,
  };
}