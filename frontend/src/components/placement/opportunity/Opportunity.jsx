
import React, { useState } from 'react';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import StudentForm from "../../auth/StudentForm"
const Opportunity = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("placement"); // Tracks active section

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

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
          <button
            className={`p-3 w-full rounded-md ${activeSection === "Enquiry" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
            onClick={() => handleSectionChange("edit")}
          >
            Enquiry
          </button>
          <button
            className={`p-3 w-full rounded-md ${activeSection === "Apply" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
            onClick={() => handleSectionChange("saved")}
          >
           Apply
          </button>
          <button
            className={`p-3 w-full rounded-md ${activeSection === "Apply" ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
            onClick={() => handleSectionChange("saved")}
          >
            Response
          </button>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        {/* Page Title */}
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">
            {activeSection === "edit" ? "Edit Resume" : "Resume"}
          </span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

       

        {/* StudentForm appears below the line when Edit is active */}
        {activeSection === "edit" && (
          <div className="w-full md:w-full  bg-gray-100  border-gray-300 ">
            <h2 className="text-xl font-semibold mb-4"></h2>
            <StudentForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunity;
