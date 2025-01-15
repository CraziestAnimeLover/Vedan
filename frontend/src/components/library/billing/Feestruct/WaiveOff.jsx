import React, { useState } from "react";
// import ParentComponent from "./ParentComponent";

const WaiveOff = () => {
  const [tasks, setTasks] = useState([
    { name: "Water Bottle", days: ["-", "-", "-", "-"], isEditing: false },
    { name: "Floor Clean", days: ["-", "-", "-", "-"], isEditing: false },
    { name: "Attendance Maintain", days: ["-", "-", "-", "-"], isEditing: false },
  ]);

  const handleEdit = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isEditing = true;
    setTasks(newTasks);
  };

  const handleUpdate = (index, newDays, newName) => {
    const newTasks = [...tasks];
    newTasks[index].days = newDays;
    newTasks[index].name = newName;
    newTasks[index].isEditing = false;
    setTasks(newTasks);
  };

  const handleChangeName = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index].name = value;
    setTasks(newTasks);
  };

  const handleChange = (index, dayIndex, value) => {
    const newTasks = [...tasks];
    newTasks[index].days[dayIndex] = value;
    setTasks(newTasks);
  };

  return (
    <section className="mb-8">
      {/* <ParentComponent/> */}
      <h2 className="text-2xl font-semibold mb-4">(2) Waive Off</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Task Name</th>
              <th className="border border-gray-300 px-4 py-2">10 Days</th>
              <th className="border border-gray-300 px-4 py-2">15 Days</th>
              <th className="border border-gray-300 px-4 py-2">20 Days</th>
              <th className="border border-gray-300 px-4 py-2">30 Days</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {task.isEditing ? (
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => handleChangeName(index, e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    task.name
                  )}
                </td>
                {task.isEditing ? (
                  task.days.map((day, i) => (
                    <td key={i} className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={day}
                        onChange={(e) => handleChange(index, i, e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                  ))
                ) : (
                  task.days.map((day, i) => (
                    <td key={i} className="border border-gray-300 px-4 py-2">{day}</td>
                  ))
                )}
                <td className="border border-gray-300 px-4 py-2">
                  {task.isEditing ? (
                    <button
                      onClick={() => handleUpdate(index, task.days, task.name)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="top-4 py-4">
      <h1 className="text-2xl font-bold mb-6">(3) TAX LINK</h1>
      <a
        href="https://einvoice1.gst.gov.in/Others/TaxpayerSearch"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Click here to access the GST Taxpayer Search
      </a>
      </div>
    </section>
  );
};

export default WaiveOff;
