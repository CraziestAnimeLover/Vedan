import { useNavigate } from "react-router-dom";

function Select() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-900 flex flex-col items-center justify-center p-6">
      {/* Full Screen with Background */}
      <div className="fixed top-14 flex space-x-6 space-y-6">
        <h1 className="text-8xl font-bold text-transparent mb-12 bg-gradient-to-r from-gray-500 via-gray-100 to-gray-500 bg-clip-text animate-shine animate-glow">
          Vedann
        </h1>
      </div>

      {/* Main Buttons at the Center */}
      <div className="flex flex-col items-center  space-y-6 mb-20">
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('/mgtservice')}
            className="px-8 py-3 gap-5 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Kreta (Buyer)
          </button>
          <button
            onClick={() => navigate('/mgtservice')}
            className="px-8 py-3  gap-5 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Vikreta (Seller)
          </button>
          
        </div>



        {/* Contact Button */}
        
        <button
          onClick={() => navigate('/contactus')}
          className="w-full max-w-md px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Contact Us
        </button>
      </div>

      {/* Left Side Buttons */}
      <div className="fixed bottom-14 left-14 flex flex-col space-y-2 animate-slideIn">
        <button
          onClick={() => navigate("/service")}
          className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
          Student
        </button>
        <button
          onClick={() => navigate("/social")}
          className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
          Social
        </button>
      </div>

      {/* Right Side Buttons */}
      <div className="fixed bottom-14 right-14 flex flex-col space-y-2 animate-slideIn">
        <button
          onClick={() => navigate("/profile")}
          className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
          Profile
        </button>
        <button
          onClick={() => navigate("/contactus")}
          className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
        >
         Game
        </button>
      </div>
    </div>
  );
}

export default Select;
