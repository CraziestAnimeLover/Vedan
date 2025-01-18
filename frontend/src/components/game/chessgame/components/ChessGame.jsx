import React, { useState } from 'react';
import ChessBoard from '../components/ChessBoard';
import GameModeSelector from '../components/GameModeSelector';

const ChessGame = () => {
  const [gameMode, setGameMode] = useState(null); // Declare gameMode state

  return (
    <div className="min-h-screen bg-gray-100">
      {gameMode ? (
        <ChessBoard gameMode={gameMode} onReset={() => setGameMode(null)} />
      ) : (
        <GameModeSelector onSelectMode={setGameMode} />
      )}
    </div>
  );
};

export default ChessGame;
