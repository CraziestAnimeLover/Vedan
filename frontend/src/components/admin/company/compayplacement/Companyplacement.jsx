import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../../library/profile/libmgtprofile/Profiles";

// ✅ Lazy load components
// const Profilesmain = lazy(() => import("../../Profilesmain"));
// const StudentForm = lazy(() => import("../../auth/StudentForm"));

const Companyplacement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Placement");
  const [selectedComponent, setSelectedComponent] = useState(null); // ✅ Track component
  const [jobDescriptions, setJobDescriptions] = useState({});

  const handleFileUpload = (event, id) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setJobDescriptions((prev) => ({
        ...prev,
        [id]: URL.createObjectURL(file),
      }));
    }
  };


  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component); // ✅ Update component dynamically
  };

  const serviceItems = {
    "Description Maker": [
      { title: "View Profile", 
        // component: <Profilesmain /> 
    },
      { title: "Edit Profile", url: "/profiles/edit" }
    ],
    // Resume: [
    //   { title: "Edit", 
    //     // component: <StudentForm /> 
    // }, // ✅ Show StudentForm dynamically
    //   { title: "Saved", url: "/placement/resume/saved" }
    // ],
    // Opportunity: [
    //   { title: "Enquiry", url: "/placement/opportunity/enquiry" },
    //   { title: "Apply", url: "/placement/opportunity/apply" },
    //   { title: "Response", url: "/placement/opportunity/response" }
    // ],
    // Selfrating: [
    //   { title: "Selfrating", url: "/placement/selfrating" },
    //   { title: "Working", url: "/profiles/edit" }
    // ],
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
        <div className={`flex flex-col space-y-4 mt-4 w-full px-4`}>
          {Object.keys(serviceItems).map((menu) => (
            <div key={menu}>
              <button 
                className="p-3 w-full hover:bg-gray-200 rounded-md text-left"
                onClick={() => toggleMenu(menu)}
              >
                {menu}
              </button>
              {activeMenu === menu && (
                <ul className="ml-4 mt-2">
                  {serviceItems[menu].map((item) => (
                    <li key={item.title}>
                      {item.component ? (
                        // ✅ Show StudentForm dynamically for "Edit"
                        <button
                          className="block text-blue-600 hover:text-blue-800 p-2 w-full text-left"
                          onClick={() => handleSectionChange(item.title, item.component)}
                        >
                          {item.title}
                        </button>
                      ) : (
                        // ✅ Navigate for other items
                        <Link to={item.url} className="block text-blue-600 hover:text-blue-800 p-2">
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-2">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        <div className="w-full md:w-3/4 p-4">
      {/* ✅ Scrollable Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-800">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Sr. No.</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Code</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">CSC Operator</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Experience</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Salary</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Location</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Description</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Date</th>
              <th className="border border-gray-800 p-2 sticky top-0 bg-gray-700">Education</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="bg-white hover:bg-gray-100 transition">
              <td className="border border-gray-800 p-2">1</td>
              <td className="border border-gray-800 p-2">XYZ123</td>
              <td className="border border-gray-800 p-2">John Doe</td>
              <td className="border border-gray-800 p-2">5 Years</td>
              <td className="border border-gray-800 p-2">$50,000</td>
              <td className="border border-gray-800 p-2">New York</td>

              {/* ✅ PDF Upload Section */}
              <td className="border border-gray-800 p-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileUpload(e, "job1")}
                  className="block w-full text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {jobDescriptions["job1"] && (
                  <a
                    href={jobDescriptions["job1"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                )}
              </td>

              <td className="border border-gray-800 p-2">2025-03-03</td>
              <td className="border border-gray-800 p-2">Bachelor's Degree</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

      </div>
    </div>
  );
};

export default Companyplacement;