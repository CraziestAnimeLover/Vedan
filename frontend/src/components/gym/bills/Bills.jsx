

import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import { LucideReceiptPoundSterling } from 'lucide-react';

// ✅ Lazy load components
const Profilesmain = lazy(() => import("../../Profilesmain"));
const StudentForm = lazy(() => import("../../auth/StudentForm"));

const Bills = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Accounts");
  const [selectedComponent, setSelectedComponent] = useState(null); // ✅ Track component

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component); // ✅ Update component dynamically
  };

  const serviceItems = {
    Water: [
      { title: "View Profile", component: <Profilesmain /> },
      { title: "Edit Profile", url: "/profiles/edit" }
    ],
    Wifi: [
      { title: "Bill", component: <StudentForm /> }, // ✅ Show StudentForm dynamically
      { title: "Financial Report", url: "/placement/resume/saved" },
      { title: "Fees Maintance", url: "/placement/resume/saved" }
    ],
   Electicity: [
      { title: "Package", component: <StudentForm /> }, // ✅ Show StudentForm dynamically
      { title: "Saved", url: "/placement/resume/saved" }
    ],
    Rent: [
      { title: "Diet", url: "/placement/opportunity/enquiry" },
      { title: "Product View", url: "/placement/opportunity/apply" },
     
    ],
    
      Equipments: [
        { title: "Events", url: "/placement/opportunity/enquiry" },
        
      ],
     
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
    {/* Sidebar Section */}
<div
  className={`${
    isSidebarOpen ? "w-74" : "w-16"
  } h-full flex flex-col items-center bg-white transition-all duration-300 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
>
        {/* Sidebar Toggle Button */}
        <button
  className="absolute top-4 right-[-40px] p-2 text-gray-800 md:hidden bg-white border rounded-full shadow-lg"
  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
>
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
          <span className="text-4xl md:text-7xl font-semibold px-4">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        <div className="w-full md:w-3/4 p-4">
          {/* ✅ Show component if selected, otherwise just section title */}
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent ? selectedComponent : <div>{selectedSection}</div>}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Bills;
