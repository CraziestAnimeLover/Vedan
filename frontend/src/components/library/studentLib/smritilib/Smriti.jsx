import React, { useState } from "react";
import Dashboard from "../Dashboard";

import Profiles from "../../profile/libmgtprofile/Profiles";

const Smriti = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
        {/* Sidebar - Collapsible on Small Screens */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } h-full flex flex-col items-center relative bg-white transition-all duration-300`}
        >
          {/* Toggle Button for Mobile */}
          <button
            className="absolute top-4 right-2 p-2 text-gray-800 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "✖" : "☰"}
          </button>

          {/* "व" Symbol */}
          <div className={` ${!isSidebarOpen && "hidden"}`}>
            <Profiles/>
          </div>
          <hr className="w-full border-gray-800 mt-" />

          {/* Navigation Buttons - Only Visible if Sidebar is Open */}
          {/* {isSidebarOpen && (
            <div className="mt-8 flex flex-col space-y-6 w-full text-center">
              <button className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer">
                Home
              </button>
              <button className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer">
                Profile
              </button>
              <button className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer">
                Settings
              </button>
              <button className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer">
                Logout
              </button>
            </div>
          )} */}
        </div>

        {/* Vertical Divider - Hidden on Small Screens */}
        <div className="w-[2px] bg-gray-800 hidden md:block"></div>

        {/* Main Content (Scrollable) */}
        <div className="flex flex-col items-center w-full h-screen overflow-y-auto ">
          {/* Smriti Title & Horizontal Line */}
          <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
            <span className="text-4xl md:text-7xl font-semibold px-4">Smriti</span>
            <hr className="w-full border-gray-800 mt-20 mb-4" />
          </div>

          {/* Scrollable Dashboard Component */}
          <div className="w-full md:w-3/4">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Smriti;
