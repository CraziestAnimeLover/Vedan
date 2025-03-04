import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import { LucideReceiptPoundSterling, LucideUser, LucideFileText, LucidePackage, LucideUtensils, LucideSettings, LucideClipboardList, LucideVideo, LucideCalendar, LucideBox } from 'lucide-react';
import Notice from '../userpanel/notice/Notice';
import Member from '../userpanel/member/Member';
import Batch  from '../userpanel/batch/Batch';
import Trainer from '../userpanel/trainer/Trainer';
import User from '../userpanel/user/User';
import Fees from '../account/fee/Fees';
import Package from '../package/Package';

// ✅ Lazy load components
const Profilesmain = lazy(() => import("../../Profilesmain"));
const StudentForm = lazy(() => import("../../auth/StudentForm"));

const Gymdashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Gym");
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
      { title: "View Profile", component: <Profilesmain />, icon: <LucideUser size={20} /> },
      { title: "Edit Profile", url: "/profiles/edit", icon: <LucideUser size={20} /> }
    ],
    Accounts: [
      { title: "Bill", url: "/gym/bills", icon: <LucideReceiptPoundSterling size={20} /> },
      { title: "Financial Report", url: "/placement/resume/saved", icon: <LucideFileText size={20} /> },
      { title: "Fees Maintenance", component: <Fees />, icon: <LucideFileText size={20} /> }
    ],
    Package: [
      { title: "Package", component: <Package/>, icon: <LucidePackage size={20} /> },
      { title: "Saved", url: "/placement/resume/saved", icon: <LucidePackage size={20} /> }
    ],
    Nutrition: [
      { title: "Diet", url: "/placement/opportunity/enquiry", icon: <LucideUtensils size={20} /> },
      { title: "Product View", url: "/placement/opportunity/apply", icon: <LucideUtensils size={20} /> }
    ],
    "Machine Maintenance": [
      { title: "Preventive", url: "/placement/selfrating", icon: <LucideSettings size={20} /> },
      { title: "Breakdown", url: "/profiles/edit", icon: <LucideSettings size={20} /> }
    ],
    Record: [
      { title: "Attendence", url: "/placement/opportunity/enquiry", icon: <LucideClipboardList size={20} /> },
      { title: "Fees", url: "/placement/opportunity/enquiry", icon: <LucideClipboardList size={20} /> }
    ],
    "Live Session": [
      { title: "Link", url: "/placement/opportunity/enquiry", icon: <LucideVideo size={20} /> },
      { title: "Own Space", url: "/placement/opportunity/apply", icon: <LucideVideo size={20} /> }
    ],
    Events: [
      { title: "Events", url: "/placement/opportunity/enquiry", icon: <LucideCalendar size={20} /> }
    ],
    Inventory: [
      { title: "Inventory", url: "/placement/opportunity/enquiry", icon: <LucideBox size={20} /> }
    ],
    "User Panel": [
      { title: "Notice",  component: <Notice />, icon: <LucideBox size={20} /> },
      { title: "Batch", component: <Batch />, icon: <LucideBox size={20} /> },
      { title: "Member",  component: <Member />, icon: <LucideBox size={20} /> },
      { title: "Trainer", component: <Trainer />, icon: <LucideBox size={20} /> },
      { title: "User",  component: <User />, icon: <LucideBox size={20} /> },
    ],
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      <div
        className={`${
          isSidebarOpen ? "w-74" : "w-16"
        } h-full flex flex-col items-center bg-white transition-all duration-300 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
      >
        <button
          className="absolute top-4 right-[-40px] p-2 text-gray-800 md:hidden bg-white border rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-2" />

        <div className={`flex flex-col space-y-4 mt-4 w-full px-4`}>
          {Object.keys(serviceItems).map((menu) => (
            <div key={menu}>
              <button 
                className="p-3 w-full flex items-center gap-3 hover:bg-gray-200 rounded-md text-left"
                onClick={() => toggleMenu(menu)}
              >
                {serviceItems[menu][0].icon}
                {menu}
              </button>
              {activeMenu === menu && (
                <ul className="ml-4 mt-2">
                  {serviceItems[menu].map((item) => (
                    <li key={item.title}>
                      {item.component ? (
                        <button
                          className="block text-blue-600 hover:text-blue-800 p-2 w-full text-left flex items-center gap-3"
                          onClick={() => handleSectionChange(item.title, item.component)}
                        >
                          {item.icon} {item.title}
                        </button>
                      ) : (
                        <Link to={item.url} className="block text-blue-600 hover:text-blue-800 p-2 flex items-center gap-3">
                          {item.icon} {item.title}
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

      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        <div className="w-full md:w-3/3 p-1">
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent ? selectedComponent : <div>{selectedSection}</div>}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Gymdashboard;
