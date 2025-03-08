import React, { useState ,useEffect} from "react";
import axios from "axios";

const StaffDaily = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      srNo: 1,
      studentName: "John Doe",
      id: "S001",
      timeIn: "09:00 AM",
      timeOut: "03:00 PM",
      sign: "✔",
      remark: "Present",
      isEditing: false,
    },
    {
      srNo: 2,
      studentName: "Jane Smith",
      id: "S002",
      timeIn: "09:15 AM",
      timeOut: "03:00 PM",
      sign: "✔",
      remark: "Present",
      isEditing: false,
    },
    {
      srNo: 3,
      studentName: "Mike Johnson",
      id: "S003",
      timeIn: "",
      timeOut: "",
      sign: "✖",
      remark: "Absent",
      isEditing: false,
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/attendance")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setAttendanceData(response.data);
      })
      .catch((error) => console.error("Error fetching attendance data:", error));
  }, []);

  const updateAttendance = (id, updatedRecord) => {
  console.log("Updating:", id, updatedRecord);
  axios
    .put(`http://localhost:8000/api/attendance/${id}`, updatedRecord)
    .then((response) => {
      console.log("Updated successfully:", response.data);
      // Update the local state
      setAttendanceData(prevData =>
        prevData.map(item => (item._id === id ? response.data : item))
      );
    })
    .catch((error) => console.error("Error updating record:", error));
};


    // Edit Function
  const handleEdit = (index, field, value) => {
    const updatedData = [...attendanceData];
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };

  const toggleEditMode = (index) => {
    const updatedData = [...attendanceData];
    updatedData[index].isEditing = !updatedData[index].isEditing;
    setAttendanceData(updatedData);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/attendance/${id}`)
      .then(() => setAttendanceData(attendanceData.filter(item => item._id !== id)))
      .catch(error => console.error("Error deleting record:", error));
  };

  const toggleSign = (index) => {
    const updatedData = [...attendanceData];
    updatedData[index].sign = updatedData[index].sign === "✔" ? "✖" : "✔";
    updatedData[index].remark =
      updatedData[index].sign === "✔" ? "Present" : "Absent";
    setAttendanceData(updatedData);
  };

  const addRow = () => {
    const newRow = {
      srNo: attendanceData.length + 1,
      studentName: "",
      id: `S00${attendanceData.length + 1}`,
      timeIn: "",
      timeOut: "",
      sign: "✖",
      remark: "Absent",
      isEditing: true,
    };
    setAttendanceData([...attendanceData, newRow]);
  };

  const handleSubmit = () => {
    Promise.all(attendanceData.map(record =>
      axios.post("http://localhost:8000/api/attendance", record)
    ))
      .then(() => alert("Attendance Submitted Successfully!"))
      .catch(error => console.error("Error submitting attendance:", error));
  };
  
  const totalStudents = attendanceData.length;
  const presentCount = attendanceData.filter(
    (student) => student.remark === "Present"
  ).length;
  const absentCount = totalStudents - presentCount;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daily Attendance</h2>
      <button
        onClick={addRow}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Row
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr No</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Time In</th>
            <th className="border p-2">Time Out</th>
            <th className="border p-2">Sign</th>
            <th className="border p-2">Remark</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{student.srNo}</td>
              <td className="border p-2">
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.studentName}
                    onChange={(e) =>
                      handleEdit(index, "studentName", e.target.value)
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  student.studentName
                )}
              </td>
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.timeIn}
                    onChange={(e) => handleEdit(index, "timeIn", e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  student.timeIn
                )}
              </td>
              <td className="border p-2">
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.timeOut}
                    onChange={(e) => handleEdit(index, "timeOut", e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  student.timeOut
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleSign(index)}
                  className="p-1 w-full border bg-gray-100"
                  disabled={!student.isEditing}
                >
                  {student.sign}
                </button>
              </td>
              <td className="border p-2">
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.remark}
                    onChange={(e) => handleEdit(index, "remark", e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  student.remark
                )}
              </td>
              <td className="border p-2 flex justify-center gap-2">
                {student.isEditing ? (
                  <button
                    onClick={() =>{toggleEditMode(index)
                      updateAttendance(student._id, student);
                    } 
                     
                    }
                    
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => toggleEditMode(index)}
                    className="bg-yellow-500 text-white p-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="mt-4 border w-full text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Total Students</th>
            <th className="border p-2">Present</th>
            <th className="border p-2">Absent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{totalStudents}</td>
            <td className="border p-2">{presentCount}</td>
            <td className="border p-2">{absentCount}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white p-2 rounded w-full"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default StaffDaily;
