import React, { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiBook, FiSettings } from "react-icons/fi";
import {GiMuscleUp,GiChestArmor,GiStrongMan,GiShoulderArmor,GiLegArmor,GiWeightLiftingUp, GiBodyBalance, GiAbacus, GiAbbotMeeple, GiVibratingShield, GiPeach, } from 'react-icons/gi'
import Profiles from "../../../../library/profile/libmgtprofile/Profiles";
import Back from '../back/Back'
import Shoulder from "../shoulder/Shoulder";
import Chest from "../chest/Chest";
import Arm from "../arm/Arm";
import LowerBody from "../lowerbody/LowerBody";
import StrongLift from "../stronglift/StongLift";
import FullBody from "../fullbody/FullBody";
import UpperBody from "../upperbody/UpperBody";
import ABS from "../abs/ABS";
import VTaper from "../vtaper/VTaper";
import Butt from "../butt/Butt";

const DashboardHome = () => <div>Dashboard Home</div>;

const Trainingdashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarOpen")) ?? true;
  });
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [selectedComponent, setSelectedComponent] = useState(<DashboardHome />);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const menuItems = useMemo(
    () => ({
      Back: { title: "Back", icon: <GiMuscleUp size={25} />, component: <Back/> },
       Chest: { title: "Chest", icon: <GiChestArmor size={25} />, component: <Chest/> },
       Arm: { title: "Arm", icon: <GiStrongMan size={25} />, component: <Arm/> },
       Shoulder: { title: "Shoulder", icon: <GiShoulderArmor size={25} />, component: <Shoulder/> },
       "Lower Body": { title: "Lower Body", icon: <GiLegArmor size={25} />, component: <LowerBody/> },
       "Stronglift": { title: "Strong Lift", icon: <GiWeightLiftingUp size={25} />, component: <StrongLift/> },
       "Full Body": { title: "Full Body", icon: <GiBodyBalance size={25} />, component: <FullBody/> },
       "Upper Body": { title: "Upper Body", icon: <GiMuscleUp size={25} />,component: <UpperBody/> },
       "ABS": { title: "ABS", icon: <GiChestArmor size={25} />, component: <ABS/>},
       "V-Taper": { title: "V-Taper", icon: <GiVibratingShield size={25} />, component: <VTaper/> },
       "Butt": { title: "Butt", icon: <GiPeach size={25} />, component: <Butt/> },
       
    }),
    []
  );

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 400 : 74 }}
        className="h-full flex flex-col items-center bg-gray-900 text-white transition-all duration-300 overflow-y-auto shadow-lg"
      >
        {/* Profile Section */}
        <div style={{ width: 74 }}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-700 mt-4" />

        {/* Sidebar Navigation */}
        <div className="flex flex-col  space-y-4 mt-4 w-full px-8">
          {Object.entries(menuItems).map(([key, { title, component, icon }]) => (
            <button
              key={key}
              className={`flex items-center gap-3 mx-4 p-3 w-full rounded-md transition-all ${
                selectedComponent.type === component.type ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelectedComponent(component);
                setSelectedSection(title);
              }}
            >
              {icon}
              {isSidebarOpen && <span>{title}</span>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center  w-full h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full  pb-4 top-0 bg-white  py-8">
          <span className="text-4xl md:text-7xl font-semibold px-4">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-24 " />
        </div>
        <motion.div
          key={selectedComponent?.type?.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-3/4 "
        >
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent}
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default Trainingdashboard;
