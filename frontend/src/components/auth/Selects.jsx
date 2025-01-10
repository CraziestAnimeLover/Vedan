import { useNavigate } from 'react-router-dom';

function Selects() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-12">
        Welcome to the Vedann
      </h1>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/mgtservice')}
          className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Kreta
        </button>
        <button
          onClick={() => navigate('/mgtservice')}
          className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
          Vikreta
        </button>
      </div>
    </div>
  );
}

export default Selects;
