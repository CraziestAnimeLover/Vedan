import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Profiles from "../../../library/profile/libmgtprofile/Profiles";
import {
  LucideReceiptPoundSterling,
  LucideUser,
  LucideFileText,
  LucideSettings,
  LucideClipboardList,
  LucideBox,
  UserCog,
} from "lucide-react";

import AharUser from "../aharuser/AharUser"; // Adjust the path according to your project structure


import AharMember from "../member/AharMember";
import MachineMaintance from "../machinemaintance/preventive/MachineMaintance";
import AharInventory from "../inventory/AharInventory";
import Staff from "../staff/Staff";
import AharMultiple from "../sutrin(admin)/multiple/AharMultiple";
import AharNotice from "../sutrin(admin)/notice/AharNotice";
import StaffID from "../lekh(record)/StaffID";
import Enquiry from "../enquiry/Enquiry";
import Productmaintance from "../machinemaintance/corrective/Productmaintance";
import Reuse from "../reuse/Reuse";
import Suchishowroom from "../Suchi/suchishowroom/Suchishowroom";
import Suchigodown from "../Suchi/suchigodown/Suchigodown";
import Dainik from "../dainik/Dainik";

import Rating from '../Rating/Rating'
import Review from "../Rating/Review";
import Own from "../demand/Own";
import MarketTrends from "../demand/MarketTrends";
import InventoryPage from "../dainik/InventoryPage";

const AharDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("AHAR");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component);
  };

  const serviceItems = {
    Profile: [
      { title: "View Profile", component: "", icon: <LucideUser size={20} /> },
      {
        title: "Edit Profile",
        url: "/profiles/edit",
        icon: <LucideUser size={20} />,
      },
    ],
    Accounts: [
      {
        title: "Bill",
        url: "/ahar/bill",
        icon: <LucideReceiptPoundSterling size={20} />,
      },
      {
        title: "Financial Report",
        url: "/placement/resume/saved",
        icon: <LucideFileText size={20} />,
      },

      {
        title: "Balance Sheet",
        component: "<Fees />",
        icon: <LucideFileText size={20} />,
      },
    ],

    Maintenance: [
      {
        title: "Machine",
        component: <MachineMaintance />,
        icon: <LucideSettings size={20} />,
      },
      {
        title: "Product",
        component:<Productmaintance />,
        icon: <LucideSettings size={20} />,
      },
    ],
    Enquiry: [
      {
        title: "Enquiry",
        component: <Enquiry/>,
        icon: <LucideClipboardList size={20} />,
      },
    ],
    "Lekh (Record)": [
      {
        title: "ATTENDANCE",
        url: "/ahar/attendence",
        icon: <LucideClipboardList size={20} />,
      },
      {
        title: "IDENTIFICATION",
        component: <StaffID />,
        icon: <LucideClipboardList size={20} />,
      },
    ],

    "SUTRIN (ADMIN)": [
      {
        title: "Multiple",
        component: <AharMultiple />,
        icon: <UserCog size={20} />,
      },
      {
        title: "Notice",
        component: <AharNotice />,
        icon: <UserCog size={20} />,
      },
    ],
    "User Panel": [
      { title: "User", component: <AharUser />, icon: <LucideBox size={20} /> },
      { title: "Staff", component: <Staff />, icon: <LucideBox size={20} /> },
      {
        title: "Regular Member",
        component: <AharMember />,
        icon: <LucideBox size={20} />,
      },
    ],

    Inventory: [
      {
        title: "Inventory",
        component: <AharInventory />,
        icon: <LucideBox size={20} />,
      },
    ],
    Dainik: [
      {
        title: "Add",
        component: <Dainik/>,
        icon: <LucideBox size={20} />,
      },
      {
        title: "Full",
        component: <InventoryPage/>,
        icon: <LucideBox size={20} />,
      },
    ],
    Demand: [
      {
        title: "Own",
        component: <Own/>,
        icon: <LucideBox size={20} />,
      },
      {
        title: "Market",
        component: <MarketTrends/>,
        icon: <LucideBox size={20} />,
      },
    ],
    Reuse: [
      {
        title: "Reuse",
        component:<Reuse/>,
        icon: <LucideBox size={20} />,
      },
    ],
    "List (Suchi)": [
      {
        title: "Suchi (Showroom)",
        component: <Suchishowroom/>,
        icon: <LucideBox size={20} />,
      },
      {
        title: "Suchi (Warehouse) ",
        component: <Suchigodown/>,
        icon: <LucideBox size={20} />,
      },
    ],
    Rating: [
      {
        title: "Rating",
        component:<Rating/>,
        icon: <LucideBox size={20} />,
      },
      {
        title: "Review",
        component:<Review/>,
        icon: <LucideBox size={20} />,
      },
    ],
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-74" : "w-16"
        } h-full bg-white transition-all duration-300 relative overflow-y-auto h-[calc(100vh-100px)]`}
      >
        <button
          className="absolute top-4 right-[-40px] p-2 text-gray-800 bg-white border rounded-full shadow-lg md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Profile Section */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} p-2`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-2" />

        {/* Sidebar Menu */}
        <div className="mt-4 px-2 relative flex">
          {/* Left Sidebar (Main Menu) */}
          <div className="w-64 bg-white h-screen p-2">
            {Object.keys(serviceItems).map((menu) => (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => setHoveredMenu(menu)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md text-left">
                  {serviceItems[menu][0].icon} {menu}
                </button>

                {/* Right Sidebar (Submenu) - Show only when hovered */}
                {hoveredMenu === menu && (
                  <div className="absolute left-24 z-[10] top-0 ml-2 w-48 bg-white shadow-lg rounded-lg p-2">
                    {serviceItems[menu].map((item) => (
                      <div key={item.title}>
                        {item.component ? (
                          <button
                            className="block text-blue-600 hover:text-blue-800 p-2 w-full text-left flex items-center gap-3"
                            onClick={() =>
                              handleSectionChange(item.title, item.component)
                            }
                          >
                            {item.icon} {item.title}
                          </button>
                        ) : (
                          <Link
                            to={item.url}
                            className="block text-blue-600 hover:text-blue-800 p-2 flex items-center gap-3"
                          >
                            {item.icon} {item.title}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">
            {selectedSection}
          </span>
          <hr className="w-full border-gray-800 mt-28 mb-4" />
        </div>

        <div className="w-full md:w-3/3 p-1">
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent ? (
              selectedComponent
            ) : (
              <div>{selectedSection}</div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AharDashboard;
