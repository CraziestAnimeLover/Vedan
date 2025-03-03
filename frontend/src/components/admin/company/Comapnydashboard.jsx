import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import CompanyProfile from './companyprofile/CompanyProfile';
import Product from './product/Product';
import News from '../News&Events/News';
import GraphCompany from './graphcompany/GraphCompany';
import Sharelist from './sharelist/Sharelist';
import CompanyAccounts from './companyaccounts/CompanyAccounts';
import ComapntBalancesheet from './companyaccounts/ComapntBalancesheet';

// ✅ Lazy load components for better performance
const Profilesmain = lazy(() => import("../../Profilesmain"));
const StudentForm = lazy(() => import("../../auth/StudentForm"));

const Companydashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState(" Dashboard");
  const [selectedComponent, setSelectedComponent] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component);
  };

  const serviceItems = {
    Profile: [
      { title: "View Profile", component: <CompanyProfile /> },
      { title: "Edit Profile", url: "/profiles/edit" }
    ],
    Placement: [
      { title: "Placement",url: "/company/placement" },
     
    ],
    Product: [
      { title: "Product", component: <Product/>},
      { title: "Apply", url: "/placement/opportunity/apply" },
      { title: "Response", url: "/placement/opportunity/response" }
    ],
    "News & Events" : [
      { title: "News", component: <News /> },
     
    ],
    ShareMarket : [
      { title: "Graphs", component: <GraphCompany /> },
      { title: "Lists", component: <Sharelist /> }
    ],
    Account : [
      { title: "Financial Report", component: <CompanyAccounts /> },
      { title: "Balance Sheet", component: <ComapntBalancesheet /> }
    ],
    Rating : [
      { title: "Selfrating", url: "/placement/selfrating" },
      { title: "Working", url: "/profiles/edit" }
    ],
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
                        <button
                          className="block text-blue-600 hover:text-blue-800 p-2 w-full text-left"
                          onClick={() => handleSectionChange(item.title, item.component)}
                        >
                          {item.title}
                        </button>
                      ) : (
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

        <div className="w-full md:w-3/4 me-24">
          {/* ✅ Show selected component dynamically */}
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent ? selectedComponent : <div>{selectedSection}</div>}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Companydashboard;
