import React from 'react';
import { useNavigate } from 'react-router-dom';

const DownloadPageRes = () => {
  const navigate = useNavigate(); // Hook to navigate

  const handleButton1 = () => {
    navigate('/service/student/resume/download')
  };

  const handleButton2 = () => {
    alert('Button 2 clicked!');
  };

  return (
    <div className="h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-6 text-blue-600">Second Page</h1>
        <div className="flex justify-center space-x-6">
          {/* First Button */}
          <button
            onClick={handleButton1}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Button 1
          </button>
          
          {/* Second Button */}
          <button
            onClick={handleButton2}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Button 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPageRes;
