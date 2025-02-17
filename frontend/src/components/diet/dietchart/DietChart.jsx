import React, { useState } from "react";
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import Info from "./Info";
import TimeTable from "./TimeTable";
import Reminder from "./Reminder";
import VPK from "./VPK";
import Consultant from "./Consultant";
import Consultquery from "../consultquery/Consultquery";

const DietChart = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dietdashboard");
  const [vpkSubOption, setVpkSubOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleMapping = {
    dietdashboard: "DIET CHART",
    info: "INFO",
    timetable: "TIME TABLE",
    reminder: "REMINDER",
    vpk: vpkSubOption === "items" ? "VPK - ITEMS" : vpkSubOption === "identify" ? "VPK - IDENTIFY" : "VPK",
    consultant: "CONSULTANT",
  };

  const renderContent = () => {
    if (activeView === "vpk") {
      if (vpkSubOption === "items") return <VPK />;
      if (vpkSubOption === "identify") return <div>Identify VPK Component</div>;
    }

    switch (activeView) {
      case "info":
        return <Info />;
      case "timetable":
        return <TimeTable />;
      case "reminder":
        return <Reminder />;
      case "consultant":
        return <Consultant />;
      default:
        return "";
    }
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} h-full flex flex-col items-center bg-white transition-all duration-300`}>
        <button className="absolute top-4 right-2 p-2 text-gray-800 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-2" />

        <div className={`${!isSidebarOpen && "hidden"} flex flex-col space-y-4 mt-4 w-full px-4`}>
          <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => setActiveView("info")}>Info</button>
          <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => setActiveView("timetable")}>TimeTable</button>
          <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => setActiveView("reminder")}>Reminder</button>
          <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => { setActiveView("vpk"); setVpkSubOption(null); }}>VPK</button>
          <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => { setActiveView("consultant"); setIsModalOpen(true); }}>Consultant</button>
        </div>
      </div>

      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">{titleMapping[activeView]}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        <div className="w-full md:w-3/4">
          {activeView === "vpk" && !vpkSubOption && (
            <div className="flex flex-col space-y-4 mt-4">
              <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => setVpkSubOption("items")}>Items</button>
              <button className="p-3 w-full hover:bg-gray-200 rounded-md" onClick={() => setVpkSubOption("identify")}>Identify</button>
            </div>
          )}

          {renderContent()}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-3/4 max-w-lg">
            <Consultquery />
            <button className="mt-4 p-2 bg-red-500 text-white rounded-md" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietChart;