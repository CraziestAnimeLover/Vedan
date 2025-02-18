import React, { useState, useEffect } from 'react';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import Resume from '../Resume/Resume';
import Opportunity from '../opportunity/Opportunity';
import Selfrating from '../selfrating/Selfrating';

// Navigation items array (without component)
const navigationItems = [
  { title: "Profile", url: "/profile" },
  { title: "Resume", url: "/placement/resume" },
  { title: "Opportunity", url: "/placement/opportunity" },
  { title: "Self Rating", url: "/placement/selfrating" },
];

const Placement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState(navigationItems[0]); // Default to Profile

  // Function to get the correct component based on activeView
  const renderContent = () => {
    switch (activeView.url) {
      case "/placement/resume":
        return <Resume />;
      case "/placement/opportunity":
        return <Opportunity />;
      case "/placement/selfrating":
        return <Selfrating />;
      default:
        return <div>Profile Section</div>; // Default content
    }
  };

  // Handle Navigation (Change State + Update URL)
  const handleNavigation = (item) => {
    setActiveView(item);
    window.history.pushState({}, "", item.url);
  };

  // Listen for Browser Back/Forward Navigation
  useEffect(() => {
    const updateActiveView = () => {
      const path = window.location.pathname;
      const foundItem = navigationItems.find((item) => item.url === path);
      if (foundItem) {
        setActiveView(foundItem);
      }
    };

    // Run on first mount
    updateActiveView();

    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", updateActiveView);

    return () => {
      window.removeEventListener("popstate", updateActiveView);
    };
  }, []);

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      {/* Sidebar Section */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} h-full flex flex-col items-center bg-white transition-all duration-300`}>
        {/* Sidebar Toggle Button */}
        <button className="absolute top-4 right-2 p-2 text-gray-800 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Profile Section */}
        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-2" />

        {/* Sidebar Navigation */}
        <div className={`${!isSidebarOpen && "hidden"} flex flex-col space-y-4 mt-4 w-full px-4`}>
          {navigationItems.map((item) => (
            <button
              key={item.url}
              className={`p-3 w-full hover:bg-gray-200 rounded-md ${activeView.url === item.url ? "bg-gray-300" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        {/* Page Title */}
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">{activeView.title.toUpperCase()}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Placement;
