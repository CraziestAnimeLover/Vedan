import React, { useState, useRef, useEffect } from 'react';

const SeatNoTable = () => {
  const [data, setData] = useState([
    { id: 1, libraryName: "Central Library", branch: "Computer Science", seatNo: "12" },
    { id: 2, libraryName: "West Wing Library", branch: "Mechanical", seatNo: "25" },
    { id: 3, libraryName: "East Library", branch: "Electrical", seatNo: "18" },
    { id: 4, libraryName: "North Library", branch: "Civil", seatNo: "22" },
    { id: 5, libraryName: "South Library", branch: "Biotech", seatNo: "30" },
    { id: 6, libraryName: "Main Library", branch: "Physics", seatNo: "10" },
    { id: 7, libraryName: "Research Library", branch: "Mathematics", seatNo: "15" },
    { id: 8, libraryName: "Digital Library", branch: "IT", seatNo: "20" },
  ]);

  const tableRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  useEffect(() => {
    const checkScrollability = () => {
      if (tableRef.current) {
        setShowScrollButtons(tableRef.current.scrollHeight > tableRef.current.clientHeight);
      }
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [data]);



  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="relative border rounded-md shadow-md overflow-hidden p-2">
      {/* Table Title */}
    

      

      {/* Scrollable Table */}
      <div ref={tableRef} className="max-h-[300px] overflow-auto border rounded-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-center">S.No.</th>
              <th className="border px-4 py-2 text-center">Library Name</th>
              <th className="border px-4 py-2 text-center">Branch</th>
              <th className="border px-4 py-2 text-center">Seat No</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    value={row.libraryName}
                    onChange={(e) => handleInputChange(row.id, "libraryName", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    value={row.branch}
                    onChange={(e) => handleInputChange(row.id, "branch", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    value={row.seatNo}
                    onChange={(e) => handleInputChange(row.id, "seatNo", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatNoTable;
