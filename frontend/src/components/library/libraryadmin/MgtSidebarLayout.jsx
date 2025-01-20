import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaFileInvoiceDollar, FaBook } from "react-icons/fa";
import Navbar from "../../shared/Navbar";

const MgtSidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route to highlight the active menu item

  const [isBooksOpen, setIsBooksOpen] = useState(false); // Track submenu state

  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/mgtservice/mgtlibrary/profile" },
    { name: "Billing", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/billing" },
    { name: "Messages", icon: <FaEnvelope />, path: "/messages" },
    { name: "Seat", icon: <FaCog />, path: "/mgtservice/mgtlibrary/seat" },
    { name: "Account", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/account" },
    { name: "Attendence", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/attendence" },
    { name: "Books", icon: <FaBook />, path: "/mgtservice/mgtlibrary/bookshell" },
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
                  {item.name === "Books" ? (
                    <>
                      <button
                        onClick={() => setIsBooksOpen((prev) => !prev)} // Toggle submenu
                        className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition w-full text-left ${
                          location.pathname.startsWith("/mgtservice/mgtlibrary/bookshell") ? "bg-gray-700" : ""
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </button>
                      {isBooksOpen && (
                        <ul className="pl-6 space-y-2 mt-2">
                          <li>
                            <button
                              onClick={() => navigate("/mgtservice/mgtlibrary/books")}
                              className={`block text-left w-full p-2 rounded-lg hover:bg-gray-700 transition ${
                                location.pathname === "/mgtservice/mgtlibrary/books" ? "bg-gray-700" : ""
                              }`}
                            >
                              Books
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => navigate("/mgtservice/mgtlibrary/bookloan")}
                              className={`block text-left w-full p-2 rounded-lg hover:bg-gray-700 transition ${
                                location.pathname === "/mgtservice/mgtlibrary/bookloan" ? "bg-gray-700" : ""
                              }`}
                            >
                              Book Loan
                            </button>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate(item.path)} // Navigate to path
                      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition w-full text-left ${
                        location.pathname === item.path ? "bg-gray-700" : ""
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )}
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
