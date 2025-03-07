import React, { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { FiDroplet, FiWifi, FiZap, FiHome, FiTool } from "react-icons/fi";
import Profiles from "../../../../library/profile/libmgtprofile/Profiles";
import WaterBill from "./WaterBill";
import WifiBill from "./WifiBill";
import ElectricityBill from "./ElectricityBill";
import EquipmentsBill from "./EquipmentsBill";
import Rent from "./Rent";

const Bills = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarOpen")) ?? true;
  });
  const [selectedSection, setSelectedSection] = useState("Accounts");
  const [selectedComponent, setSelectedComponent] = useState(<WifiBill />);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const serviceItems = useMemo(
    () => ({
      Water: { title: "Water Bill", component: <WaterBill />, icon: <FiDroplet size={20} /> },
      Wifi: { title: "Wifi Bill", component: <WifiBill />, icon: <FiWifi size={20} /> },
      Electricity: { title: "Electricity Bill", component: <ElectricityBill />, icon: <FiZap size={20} /> },
      Rent: { title: "Rent", component: <Rent />, icon: <FiHome size={20} /> },
      Equipments: { title: "Equipment Bill", component: <EquipmentsBill />, icon: <FiTool size={20} /> },
    }),
    []
  );

  return (
    <div className="w-full h-screen fixed left-0 top-4 bg-gray-100 flex ">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 250 : 74 }}
        className="h-full flex flex-col items-center bg-gray-900 text-white transition-all duration-300 overflow-y-auto shadow-lg"
      >
        {/* Profile Section */}
        {isSidebarOpen && <Profiles />}

        <hr className="w-full border-gray-700 mt-4" />

        {/* Sidebar Navigation (No Dropdowns) */}
        <div className="flex flex-col space-y-4 mt-4 w-full px-4">
          {Object.entries(serviceItems).map(([key, { title, component, icon }]) => (
            <button
              key={key}
              className={`flex items-center gap-3 p-3 w-full rounded-md transition-all ${
                selectedComponent.type === component.type ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedComponent(component)}
            >
              {icon}
              {isSidebarOpen && <span>{title}</span>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
       <div className="flex flex-col items-center w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>
        <motion.div
          key={selectedComponent?.type?.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-3/4 p-1"
        >
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent}
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default Bills;
