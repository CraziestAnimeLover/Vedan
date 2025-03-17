import React, { useState, Suspense, lazy ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../../library/profile/libmgtprofile/Profiles";
import BalanceTables from './BalanceTables';

// ✅ Lazy load components
// const Profilesmain = lazy(() => import("../../Profilesmain"));
// const StudentForm = lazy(() => import("../../auth/StudentForm"));

const ComapntBalancesheet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Placement");
  const [selectedComponent, setSelectedComponent] = useState(null); // ✅ Track component
  const [balanceSheetId, setBalanceSheetId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [assets, setAssets] = useState([
    { type: "Current Assets", rupees: 0 },
    { type: "Investments", rupees: 0 },
    { type: "Property , Plant & Equipments", rupees: 0 },
    { type: "Intangible Assets", rupees: 0 },
    { type: "Other Assets", rupees: 0 },
  ]);

  const [liabilities, setLiabilities] = useState([
    { type: "Current Liabilities", rupees: 0 },
    { type: "Long-Term Liabilities", rupees: 0 },
  ]);
  const [equity, setEquity] = useState(0);

  const updateValue = (dataType, index, value) => {
    if (dataType === "assets") {
      setAssets((prevAssets) =>
        prevAssets.map((item, i) =>
          i === index ? { ...item, rupees: value } : item
        )
      );
    } else if (dataType === "liabilities") {
      setLiabilities((prevLiabilities) =>
        prevLiabilities.map((item, i) =>
          i === index ? { ...item, rupees: value } : item
        )
      );
    }
  };
  

  const calculateTotal = (data) => data.reduce((sum, item) => sum + item.rupees, 0);

  const handleFileUpload = (event, id) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setJobDescriptions((prev) => ({
        ...prev,
        [id]: URL.createObjectURL(file),
      }));
    }
  };
  useEffect(() => {
    if (balanceSheetId) {
      console.log("✅ Balance Sheet ID is now available:", balanceSheetId);
    }
  }, [balanceSheetId]);  // ✅ Runs when `balanceSheetId` updates
  
  

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch("http://localhost:8000/aharbalancesheet/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("📄 API Response in Frontend:", data);
  
        if (data && data._id) {
          console.log("✅ Setting Balance Sheet ID:", data._id);
          setBalanceSheetId(data._id); // ✅ Update state
          setAssets(data.assets || []);
          setLiabilities(data.liabilities || []);
          setEquity(data.equity || 0);
        } else {
          console.warn("⚠️ No balance sheet found in response!");
        }
      } catch (err) {
        console.error("❌ Error fetching balance sheet:", err);
      } finally {
        setIsLoading(false); // Ensure loading is finished once data is fetched
      }
    };
  
    fetchBalanceSheet();
  }, []);
  
  
  
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure balance sheet ID is available before submitting
    if (!balanceSheetId) {
      console.error("🚨 Error: Balance sheet ID is missing before submit!");
      alert("Error: Balance sheet ID is required!");
      return;
    }
  
    // Ensure data is not loading before submitting
    if (isLoading) {
      alert("Please wait, data is still loading...");
      return;
    }
  
    const requestData = {
      id: balanceSheetId,
      assets,
      liabilities,
      equity,
    };
  
    console.log("📤 Submitting Data:", requestData);
  
    try {
      const response = await fetch("http://localhost:8000/aharbalancesheet/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log("✅ Server Response:", data);
  
      if (response.ok) {
        alert("Balance Sheet Updated Successfully!");
      } else {
        console.error("❌ Server Error:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🔥 Error updating balance sheet:", error);
      alert("Something went wrong! Please try again.");
    }
  };
  
  
  
  
  

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleSectionChange = (title, component = null) => {
    setSelectedSection(title);
    setSelectedComponent(component); // ✅ Update component dynamically
  };

  const serviceItems = {
    // "Description Maker": [
    //   { title: "View Profile", 
    //     // component: <Profilesmain /> 
    // },
    //   { title: "Edit Profile", url: "/profiles/edit" }
    // ],
    // Resume: [
    //   { title: "Edit", 
    //     // component: <StudentForm /> 
    // }, // ✅ Show StudentForm dynamically
    //   { title: "Saved", url: "/placement/resume/saved" }
    // ],
    // Opportunity: [
    //   { title: "Enquiry", url: "/placement/opportunity/enquiry" },
    //   { title: "Apply", url: "/placement/opportunity/apply" },
    //   { title: "Response", url: "/placement/opportunity/response" }
    // ],
    // Selfrating: [
    //   { title: "Selfrating", url: "/placement/selfrating" },
    //   { title: "Working", url: "/profiles/edit" }
    // ],
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
                        // ✅ Show StudentForm dynamically for "Edit"
                        <button
                          className="block text-blue-600 hover:text-blue-800 p-2 w-full text-left"
                          onClick={() => handleSectionChange(item.title, item.component)}
                        >
                          {item.title}
                        </button>
                      ) : (
                        // ✅ Navigate for other items
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
          <span className="text-4xl md:text-7xl font-semibold px-2">{selectedSection}</span>
          <hr className="w-full border-gray-800 mt-20 mb-4" />
        </div>

        <div className="w-full md:w-3/4 p-4 mx-auto">
     

      
    </div>
    <BalanceTables 
  assets={assets} 
  liabilities={liabilities} 
  updateValue={updateValue} 
  calculateTotal={calculateTotal} 
  handleSubmit={handleSubmit} 
/>
      </div>
    </div>
  );
};

export default ComapntBalancesheet;
