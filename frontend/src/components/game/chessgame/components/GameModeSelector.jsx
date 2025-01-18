import React from 'react';
import { Users, Monitor } from 'lucide-react';


export default function GameModeSelector({ onSelectMode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Chess Game</h1>
        <div className="space-y-4">
          <button
            onClick={() => onSelectMode('player')}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors"
          >
            <Users className="w-6 h-6" />
            <span className="text-lg font-semibold">Play with Friend</span>
          </button>
          <button
            onClick={() => onSelectMode('computer')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors"
          >
            <Monitor className="w-6 h-6" />
            <span className="text-lg font-semibold">Play vs Computer</span>
          </button>
        </div>
      </div>
    </div>
  );
}