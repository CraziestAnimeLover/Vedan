export function getPossibleMoves(board, position) {
    const piece = board[position.row][position.col];
    if (!piece) return [];
  
    const moves = [];
    const { row, col } = position;
  
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
  
        // Forward move
        if (board[row + direction]?.[col] === undefined || board[row + direction][col] === null) {
          moves.push({ row: row + direction, col });
          // Double move from starting position
          if (row === startRow && (board[row + 2 * direction]?.[col] === undefined || board[row + 2 * direction][col] === null)) {
            moves.push({ row: row + 2 * direction, col });
          }
        }
  
        // Capture moves
        [-1, 1].forEach(offset => {
          const target = board[row + direction]?.[col + offset];
          if (target && target.color !== piece.color) {
            moves.push({ row: row + direction, col: col + offset });
          }
        });
        break;
  
      case 'rook':
        // Horizontal and vertical moves
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
          let x = row + dx;
          let y = col + dy;
          while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y]) {
              moves.push({ row: x, col: y });
            } else {
              if (board[x][y].color !== piece.color) {
                moves.push({ row: x, col: y });
              }
              break;
            }
            x += dx;
            y += dy;
          }
        });
        break;
  
      case 'knight':
        [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ].forEach(([dx, dy]) => {
          const x = row + dx;
          const y = col + dy;
          if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y] || board[x][y].color !== piece.color) {
              moves.push({ row: x, col: y });
            }
          }
        });
        break;
  
      case 'bishop':
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dx, dy]) => {
          let x = row + dx;
          let y = col + dy;
          while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y]) {
              moves.push({ row: x, col: y });
            } else {
              if (board[x][y].color !== piece.color) {
                moves.push({ row: x, col: y });
              }
              break;
            }
            x += dx;
            y += dy;
          }
        });
        break;
  
      case 'queen':
        // Combination of rook and bishop moves
        [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
        ].forEach(([dx, dy]) => {
          let x = row + dx;
          let y = col + dy;
          while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y]) {
              moves.push({ row: x, col: y });
            } else {
              if (board[x][y].color !== piece.color) {
                moves.push({ row: x, col: y });
              }
              break;
            }
            x += dx;
            y += dy;
          }
        });
        break;
  
      case 'king':
        [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
        ].forEach(([dx, dy]) => {
          const x = row + dx;
          const y = col + dy;
          if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (!board[x][y] || board[x][y].color !== piece.color) {
              moves.push({ row: x, col: y });
            }
          }
        });
        break;
    }
  
    return moves;
  }
  
  export function isValidMove(board, from, to, possibleMoves) {
    return possibleMoves.some(move => move.row === to.row && move.col === to.col);
  }