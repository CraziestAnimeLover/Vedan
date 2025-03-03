import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Profiles from "../../../library/profile/libmgtprofile/Profiles";

// ✅ Lazy load components
// const Profilesmain = lazy(() => import("../../Profilesmain"));
// const StudentForm = lazy(() => import("../../auth/StudentForm"));

const Companyplacement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Placement");
  const [selectedComponent, setSelectedComponent] = useState(null); // ✅ Track component
  const [jobDescriptions, setJobDescriptions] = useState({});
  const [rows, setRows] = useState([
    {
      code: "XYZ123",
      operator: "John Doe",
      experience: "5 Years",
      salary: "$50,000",
      location: "New York",
      description: null, // PDF Upload
      date: "2025-03-03",
      education: "Bachelor's Degree",
    },
  ]);

  // 📌 Add New Row
  const addRow = () => {
    setRows([...rows, {
      code: "",
      operator: "",
      experience: "",
      salary: "",
      location: "",
      description: null,
      date: "",
      education: "",
    }]);
  };

  // 📌 Remove Row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // 📌 Handle Input Change
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // 📌 Handle File Upload
  const handleFileUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      handleChange(index, "description", fileURL);
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
    "Description Maker": [
      { title: "View Profile", 
        // component: <Profilesmain /> 
    },
      { title: "Edit Profile", url: "/profiles/edit" }
    ],
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

        <div className="w-full md:w-3/4 p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-800">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border border-gray-800 p-2">Sr. No.</th>
              <th className="border border-gray-800 p-2">Code</th>
              <th className="border border-gray-800 p-2">Profile</th>
              <th className="border border-gray-800 p-2">Experience</th>
              <th className="border border-gray-800 p-2">Salary</th>
              <th className="border border-gray-800 p-2">Location</th>
              <th className="border border-gray-800 p-2">Description</th>
              <th className="border border-gray-800 p-2">Date</th>
              <th className="border border-gray-800 p-2">Education</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100 transition">
                <td className="border border-gray-800 p-2">{index + 1}</td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.code}
                    onChange={(e) => handleChange(index, "code", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.operator}
                    onChange={(e) => handleChange(index, "operator", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.experience}
                    onChange={(e) => handleChange(index, "experience", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.salary}
                    onChange={(e) => handleChange(index, "salary", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.location}
                    onChange={(e) => handleChange(index, "location", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileUpload(e, index)}
                    className="block w-full text-sm text-gray-600"
                  />
                  {row.description && (
                    <a
                      href={row.description}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  )}
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="date"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <input
                    type="text"
                    className="w-full p-1 border border-gray-400 rounded"
                    value={row.education}
                    onChange={(e) => handleChange(index, "education", e.target.value)}
                  />
                </td>
                <td className="border border-gray-800 p-2">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Add Row Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={addRow}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Row
        </button>
      </div>
    </div>

      </div>
    </div>
  );
};

export default Companyplacement;