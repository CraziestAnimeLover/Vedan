import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope,   FaSignOutAlt, FaSearch, FaBook, FaFile, FaPage4, FaPager, FaBookmark, FaBookDead } from "react-icons/fa";
import AddLibraryForm from "../../auth/AddLibraryForm";

const SidebarLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Library Seat No", icon: <FaSearch />, path: "/library/dashboard" },
    { name: "Exam ID", icon: <FaPager />, path: "/messages" },
    { name: "Attendance", icon: <FaFile />, path: "/settings" },
    { name: "Book Read/Load", icon: <FaBook />, path: "/help" },
    { name: "Account", icon: <FaBookDead />, path: "/logout" },
    { name: "Enquiry", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Mobile Menu Toggle */}
      <div className="bg-gray-800 text-white lg:hidden p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Vijnan (Library)</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl focus:outline-none"
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-gray-800 text-white`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-center">Vijnan (Library)</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setMenuOpen(false); // Close menu on mobile after navigation
                    navigate(item.path);
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition w-full text-left"
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
          <AddLibraryForm />
        </p>
      </main>
    </div>
  );
};

export default SidebarLayout;
