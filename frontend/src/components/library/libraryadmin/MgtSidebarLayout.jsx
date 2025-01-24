import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaFileInvoiceDollar, FaBook } from "react-icons/fa";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from '../../../utils/constant.js'; // Make sure this is correctly imported
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../../redux/authSlice.js"; // Assuming you have this action

const MgtSidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route to highlight the active menu item
  const dispatch = useDispatch(); // Access Redux dispatch

  const [isBooksOpen, setIsBooksOpen] = useState(false); // Track submenu state
  
  // Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        // Dispatch Redux action to clear user data
        dispatch(setAuthUser(null));
        navigate("/"); // Redirect to home or login page
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error during logout");
    }
  };

  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/mgtservice/mgtlibrary/profile" },
    { name: "Billing", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/billing" },
    { name: "Messages", icon: <FaEnvelope />, path: "/messages" },
    { name: "Seat", icon: <FaCog />, path: "/mgtservice/mgtlibrary/seat" },
    { name: "Account", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/account" },
    { name: "Attendance", icon: <FaFileInvoiceDollar />, path: "/mgtservice/mgtlibrary/attendance" },
    { name: "Books", icon: <FaBook />, path: "/mgtservice/mgtlibrary/bookshell" },
    { name: "Enquiry", icon: <FaQuestionCircle />, path: "/mgtservice/mgtlibrary/enquiry" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout", onClick: logoutHandler }, // Add logout handler here
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
                        onClick={() => setIsBooksOpen((prev) => !prev)}
                        className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition w-full text-left ${
                          location.pathname.startsWith("/mgtservice/mgtlibrary/bookshell")
                            ? "bg-gray-700"
                            : ""
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
                            <button
                              onClick={() => navigate("/mgtservice/mgtlibrary/bookshells")}
                              className={`block text-left w-full p-2 rounded-lg hover:bg-gray-700 transition ${
                                location.pathname === "/mgtservice/mgtlibrary/bookshells" ? "bg-gray-700" : ""
                              }`}
                            >
                              BookShell
                            </button>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.name === "Logout") {
                          item.onClick(); // Trigger the logout handler for the "Logout" menu item
                        } else {
                          navigate(item.path); // Navigate for other menu items
                        }
                      }}
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
