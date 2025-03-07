
import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../../library/profile/libmgtprofile/Profiles";
import { 
  LucideReceiptPoundSterling, LucideUser, LucideFileText, LucidePackage, 
  LucideUtensils, LucideSettings, LucideClipboardList, LucideVideo, 
  LucideCalendar, LucideBox ,UserCog
} from 'lucide-react';
import Bills from '../aharaccount/bills/Bills';




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
      { title: "Edit Profile", url: "/profiles/edit", icon: <LucideUser size={20} /> }
    ],
    Accounts: [
      { title: "Bill", url: "/ahar/bill", icon: <LucideReceiptPoundSterling size={20} /> },
      { title: "Financial Report", url: "/placement/resume/saved", icon: <LucideFileText size={20} /> },
      
      { title: "Balance Sheet", component: "<Fees />", icon: <LucideFileText size={20} /> }
    ],
   
   
    "Machine Maintenance": [
      { title: "Preventive",component: "<Preventive />"  , icon: <LucideSettings size={20} /> },
      { title: "Correct", component: "<Corrective />", icon: <LucideSettings size={20} /> }
    ],
    Enquiry: [
      { title: "Demo", component: "<Demo />", icon: <LucideClipboardList size={20} /> },
      { title: "Online List", component: "<OnlineList />", icon: <LucideClipboardList size={20} /> },
      { title: "ID", url: "/placement/opportunity/enquiry", icon: <LucideClipboardList size={20} /> },
    ],
    "Lekh (Record)": [
      { title: "Attendance", url: "/barber/attendence", icon: <LucideClipboardList size={20} /> },
      { title: "Id", component: "<IDMem />", icon: <LucideClipboardList size={20} /> },

       
    ],
    
   
    
    "SUTRIN (ADMIN)": [
        { title: "Multiple",  component: "<Multiple />", icon: <UserCog size={20} /> },
        { title: "Notice",  component: '<Notice />', icon: <UserCog size={20} /> },
       
        { title: "Package", component: '<Package/>', icon: <LucidePackage size={20} /> },
    ],
    "User Panel": [
        
        { title: "User",  component: '<Member />', icon: <LucideBox size={20} /> },
        { title: "Staff", component: '<Trainingdashboard />', icon: <LucideBox size={20} /> },
        { title: "Regular Member",  component: '<User />', icon: <LucideBox size={20} /> },
    ],
    
    Inventory: [
      { title: "Inventory", component: "<Inventory />", icon: <LucideBox size={20} /> }
    ],
    Dainik: [
      { title: "Dainik", component: "<Inventory />", icon: <LucideBox size={20} /> }
    ],
    Demand: [
      { title: "Own", component: "<Inventory />", icon: <LucideBox size={20} /> },
      { title: "Market", component: "<Inventory />", icon: <LucideBox size={20} /> },
    ],
    Reuse: [
      { title: "Reuse", component: "<Inventory />", icon: <LucideBox size={20} /> }
    ],
    List: [
      { title: "List", component: "<Inventory />", icon: <LucideBox size={20} /> }
    ],
    Rating: [
      { title: "Rating", component: "<Inventory />", icon: <LucideBox size={20} /> }
    ],
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-74" : "w-16"} h-full bg-white transition-all duration-300 relative overflow-y-auto h-[calc(100vh-100px)]`}>
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
                    onClick={() => handleSectionChange(item.title, item.component)}
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
          <span className="text-4xl md:text-7xl font-semibold px-4">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-28 mb-4" />
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

export default AharDashboard;
