import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profiles from "../../library/profile/libmgtprofile/Profiles";

const ResopsePlace = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component);
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      {/* Sidebar Section */}
      <div
        className={`${
          isSidebarOpen ? "w-74" : "w-16"
        } h-full flex flex-col items-center bg-white transition-all duration-300`}
      >
        <button
          className="absolute top-4 right-2 p-2 text-gray-800 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        <div className={`${isSidebarOpen ? "block" : "hidden"} mt-1`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-6" />
      </div>

      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      <div className="flex flex-col items-center w-full h-screen overflow-y-auto p-4">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">
            {selectedSection || "Response "}
          </span>
          <hr className="w-full border-gray-800 mt-24 mb-4" />
        </div>

        <div className="w-full md:w-3/4 p-4">
          {selectedComponent ? (
            selectedComponent
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Sr. No.</th>
                    <th className="px-6 py-3">Company Name</th>
                    <th className="px-6 py-3">Company Address</th>
                    <th className="px-6 py-3">Post</th>
                    <th className="px-6 py-3">Decision</th>
                    <th className="px-6 py-3">Remark</th>
                    <th className="px-6 py-3">Letter (pdf)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [1, "ABC Corp", "123 Main St, NY", "Manager", "Approved", "Good Candidate"],
                    [2, "XYZ Ltd", "456 Market Rd, CA", "Engineer", "Rejected", "Lacks experience"],
                    [3, "Tech Solutions", "789 Blvd, TX", "Developer", "Pending", "Further evaluation needed"],
                  ].map(([srNo, companyName, companyAddress, post, decision, remark], index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-b border-gray-200`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{srNo}</td>
                      <td className="px-6 py-4">{companyName}</td>
                      <td className="px-6 py-4">{companyAddress}</td>
                      <td className="px-6 py-4">{post}</td>
                      <td className="px-6 py-4">{decision}</td>
                      <td className="px-6 py-4">{remark}</td>
                      <td className="px-6 py-4">{remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResopsePlace;
