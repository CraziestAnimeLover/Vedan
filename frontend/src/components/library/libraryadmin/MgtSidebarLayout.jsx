import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaFileInvoiceDollar } from "react-icons/fa";
import Navbar from "../../shared/Navbar";

const MgtSidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route to highlight the active menu item

  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Billing", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/billing" },
    { name: "Messages", icon: <FaEnvelope />, path: "/messages" },
    { name: "Seat", icon: <FaCog />, path: "/mgtservice/mgtlibrary/seat" },
    { name: "Account", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/account" },
    { name: "Attendence", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/attendence" },
    { name: "Help", icon: <FaQuestionCircle />, path: "/help" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-gray-800 text-white">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-center">Vijnan (Library)</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)} // Navigate to path
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition w-full text-left ${
                      location.pathname === item.path ? "bg-gray-700" : ""
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600">
            Welcome to your dashboard! Use the navigation on the left to explore.
          </p>
        </main>
      </div>
    </div>
  );
};

export default MgtSidebarLayout;
