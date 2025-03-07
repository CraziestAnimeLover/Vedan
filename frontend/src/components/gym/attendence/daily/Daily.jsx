import React, { useState } from 'react';

const Daily = () => {
  const [attendanceData, setAttendanceData] = useState([
    { srNo: 1, studentName: 'John Doe', id: 'S001', timeIn: '09:00 AM', timeOut: '03:00 PM', sign: '✔', remark: 'Present' },
    { srNo: 2, studentName: 'Jane Smith', id: 'S002', timeIn: '09:15 AM', timeOut: '03:00 PM', sign: '✔', remark: 'Present' },
    { srNo: 3, studentName: 'Mike Johnson', id: 'S003', timeIn: '', timeOut: '', sign: '✖', remark: 'Absent' },
  ]);

  const handleEdit = (index, field, value) => {
    const updatedData = [...attendanceData];
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = attendanceData.filter((_, i) => i !== index).map((student, i) => ({ ...student, srNo: i + 1 }));
    setAttendanceData(updatedData);
  };

  const toggleSign = (index) => {
    const updatedData = [...attendanceData];
    updatedData[index].sign = updatedData[index].sign === '✔' ? '✖' : '✔';
    updatedData[index].remark = updatedData[index].sign === '✔' ? 'Present' : 'Absent';
    setAttendanceData(updatedData);
  };

  const addRow = () => {
    const newRow = {
      srNo: attendanceData.length + 1,
      studentName: '',
      id: `S00${attendanceData.length + 1}`,
      timeIn: '',
      timeOut: '',
      sign: '✖',
      remark: 'Absent',
    };
    setAttendanceData([...attendanceData, newRow]);
  };

  const totalStudents = attendanceData.length;
  const presentCount = attendanceData.filter(student => student.remark === 'Present').length;
  const absentCount = totalStudents - presentCount;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daily Attendance</h2>
      <button onClick={addRow} className="mb-4 bg-blue-500 text-white p-2 rounded">Add Row</button>
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
                <input
                  type="text"
                  value={student.studentName}
                  onChange={(e) => handleEdit(index, 'studentName', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={student.timeIn}
                  onChange={(e) => handleEdit(index, 'timeIn', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={student.timeOut}
                  onChange={(e) => handleEdit(index, 'timeOut', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <button onClick={() => toggleSign(index)} className="p-1 w-full border bg-gray-100">{student.sign}</button>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={student.remark}
                  onChange={(e) => handleEdit(index, 'remark', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-1 rounded">Delete</button>
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
    </div>
  );
};

export default Daily;