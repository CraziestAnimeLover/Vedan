import React, { useState } from 'react';
import Profiles from "../../library/profile/libmgtprofile/Profiles";
import StudentForm from "../../auth/StudentForm";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Selfrating = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("placement"); // Tracks active section

  // State to manage marks
  const [marks, setMarks] = useState({
    Technical: 8,
    SkillTest: 7,
    CompanyTest: 9,
    Behaviour: 8,
    Communication: 7
  });

  // Function to handle mark updates
  const handleMarkChange = (skill, value) => {
    setMarks((prev) => ({ ...prev, [skill]: value }));
  };

  // Chart Data
  const chartData = {
    labels: Object.keys(marks),
    datasets: [
      {
        label: "Given Marks",
        data: Object.values(marks),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-white/20 backdrop-blur-lg shadow-lg flex">
      {/* Sidebar Section */}
      <div className={`${isSidebarOpen ? "w-74" : "w-16"} h-full flex flex-col items-center bg-white transition-all duration-300`}>
        {/* Sidebar Toggle Button */}
        <button className="absolute top-4 right-2 p-2 text-gray-800 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Profile Section */}
        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
          <Profiles />
        </div>

        <hr className="w-full border-gray-800 mt-2" />
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] bg-gray-800 hidden md:block"></div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-screen overflow-y-auto p-4">
        {/* Page Title */}
        <div className="flex flex-col items-center w-full sticky top-0 bg-white z-10 py-4">
          <span className="text-4xl md:text-7xl font-semibold px-4">
            {activeSection === "edit" ? "Edit Resume" : "Resume"}
          </span>
          <hr className="w-full border-gray-800 mt-4 mb-4" />
        </div>

        {/* Skills Table */}
        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Skills Assessment</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Skills</th>
                <th className="border border-gray-300 px-4 py-2">Total Mark</th>
                <th className="border border-gray-300 px-4 py-2">Given Marks</th>
                <th className="border border-gray-300 px-4 py-2">Based</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(marks).map((skill) => (
                <tr key={skill}>
                  <td className="border border-gray-300 px-4 py-2">{skill}</td>
                  <td className="border border-gray-300 px-4 py-2">10</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={marks[skill]}
                      min="-10"
                      max="10"
                      onChange={(e) => handleMarkChange(skill, Number(e.target.value))}
                      className="w-16 p-1 text-center border border-gray-300"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">CV DATA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Chart</h2>
          <Bar data={chartData} />
          <h1>Note</h1>
          <p className="text-sm text-gray-600 mt-2">
            (1) Interview rating given by the company to the student (after both approved)<br />
            (2) This showcases in student profile<br />
            (3) Marks range from -10 to +10
          </p>
        </div>

        {/* StudentForm appears below the chart when Edit is active */}
        {activeSection === "edit" && (
          <div className="w-full md:w-full bg-gray-100 border-gray-300 mt-6 p-4">
            <h2 className="text-xl font-semibold mb-4">Edit Student Details</h2>
            <StudentForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Selfrating;
