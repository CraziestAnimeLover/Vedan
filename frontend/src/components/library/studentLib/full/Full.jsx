import React, { useState } from "react";

import Profiles from "../../profile/libmgtprofile/Profiles";
import { useNavigate } from "react-router-dom";
import SearchPop from "./fulldashboard/SearchPop";

import SearchCard from "./fulldashboard/SearchCard"; // Import SearchCard component
import Joined from "./fulldashboard/Joined"; // Import the Joined component

const Full = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard"); // Default view is 'dashboard'
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <Profiles />;
      case "search":
        return <SearchCard />;
      case "joined":
        return <Joined />;
      case "dashboard":
      default:
        return <SearchCard />;
    }
  };

  return (
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
          <Profiles />
        </div>
        <hr className="w-full border-gray-800 mt-2" />

        {/* Buttons Below Profile */}
        <div className={` ${!isSidebarOpen && "hidden"} flex flex-col space-y-4 mt-4 w-full px-4`}>
          <button
            className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={() => setActiveView("search")}
          >
            Search
          </button>
          <button
            className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>
          <button
            className="p-3 w-full text-gray-800 font-medium hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={() => setActiveView("joined")}
          >
            Joined
          </button>
        </div>
      </div>

      {/* Vertical Divider - Hidden on Small Screens */}
      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      {/* Main Content (Scrollable) */}
      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        {/* Title & Horizontal Line */}
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">Smriti</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        {/* Render the active component */}
        <div className="w-full md:w-3/4">
          {renderContent()}
        </div>
      </div>

      {/* Search Popup */}
      {/* Only show the search pop if the search view is selected */}
      {activeView === "search" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center top-44">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mt-28 max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4"
              onClick={() => setActiveView("dashboard")} // Close the search pop
            >
              ✖
            </button>
            <SearchPop />
          </div>
        </div>
      )}
    </div>
  );
};

export default Full;
