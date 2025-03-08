import React, { useState, useEffect } from "react";

const Productmaintance = () => {
  const [itemName, setItemName] = useState("");
  const [rows, setRows] = useState([{ id: 1, name: "", days: {} }]);
  const [columns, setColumns] = useState([
    "1",
    "2",
    "3",
    "4",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [notations, setNotations] = useState([]);
  const [inspectionBy, setInspectionBy] = useState("");
  const [cards, setCards] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track index of card being edited
  const [years, setYears] = useState(["2023", "2024", "2025", "2026", "2027"]);

  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [editingId, setEditingId] = useState(null);
  const generateDaysInMonth = (year, month) => {
    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  };

  useEffect(() => {
    setColumns(generateDaysInMonth(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, name: "", days: {} }]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const addColumn = () => {
    setColumns([...columns, `Day ${columns.length + 1}`]);
    setRows(
      rows.map((row) => ({
        ...row,
        days: { ...row.days, [`Day ${columns.length + 1}`]: "" },
      }))
    );
  };

  const deleteColumn = (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
    setRows(
      rows.map((row) => {
        const updatedDays = { ...row.days };
        delete updatedDays[columns[index]]; // Remove the selected column
        return { ...row, days: updatedDays };
      })
    );
  };

  const toggleStatus = (rowId, day) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              days: {
                ...row.days,
                [day]: row.days[day] === "Right" ? "Wrong" : "Right",
              },
            }
          : row
      )
    );
  };

  const addNotation = () => {
    setNotations([
      ...notations,
      { id: notations.length + 1, date: "", info: "" },
    ]);
  };

  const updateNotation = (index, field, value) => {
    const updatedNotations = [...notations];
    updatedNotations[index][field] = value;
    setNotations(updatedNotations);
  };

  const handleSubmit = async () => {
    const formData = {
      itemName,
      rows,
      notations,
      inspectionBy,
      selectedYear,
      selectedMonth,
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/product-maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      // Check if response is JSON
      const text = await response.text();
      try {
        const result = JSON.parse(text);
  
        if (response.ok) {
          alert("Data submitted successfully!");
          setCards([...cards, formData]);
        } else {
          console.error("Error response:", result);
          alert(`Error submitting data: ${result.message || "Unknown error"}`);
        }
      } catch (jsonError) {
        console.error("Invalid JSON response:", text);
        alert("Received an invalid response from the server.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Failed to submit data: ${error.message}`);
    }
  };
  

  const deleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };
  const handleEdit = (index) => {
    const card = cards[index];
    setItemName(card.itemName);
    setRows(card.rows);
    setNotations(card.notations);
    setInspectionBy(card.inspectionBy);
    setSelectedYear(card.selectedYear);
    setSelectedMonth(card.selectedMonth);
    setEditIndex(index); // Track index
    setEditingId(card.id); // Store backend ID
  };
  
  

  const handleUpdate = async () => {
    if (editIndex === null || !editingId) {
      alert("No valid ID found for updating.");
      return;
    }
  
    const updatedData = {
      itemName,
      rows,
      notations,
      inspectionBy,
      selectedYear,
      selectedMonth,
    };
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/product-maintenance/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error updating data: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const updatedCards = [...cards];
      updatedCards[editIndex] = { id: editingId, ...updatedData };
      setCards(updatedCards);
  
      // Reset form fields after updating
      setItemName("");
      setRows([{ id: 1, name: "", days: {} }]);
      setNotations([]);
      setInspectionBy("");
      setSelectedYear(years[0]);
      setSelectedMonth(months[0]);
  
      // Clear edit state
      setEditIndex(null);
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update data.");
    }
  };
  
  

  return (
    <div className="p-4 w-4/5 mx-auto">
      <div className="flex justify-end space-x-4">
        <div>
          <label className="font-semibold block text-right">Select Year</label>
          <select
            className="border p-2 rounded mt-1 block text-right"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold block text-right">Select Month</label>
          <select
            className="border p-2 rounded mt-1 block text-right"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Inspection</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-2 w-full rounded mt-1"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr. No</th>
            <th className="border p-2">Name</th>
            {columns.map((col, index) => (
              <th key={index} className="border p-2">
                <input
                  type="text"
                  value={col}
                  onChange={(e) => {
                    const updatedColumns = [...columns];
                    updatedColumns[index] = e.target.value;
                    setColumns(updatedColumns);
                  }}
                  className="border p-1 rounded text-center w-20"
                />
                <button
                  onClick={() => deleteColumn(index)}
                  className="ml-2 text-red-500 text-xl"
                >
                  🗑️
                </button>
              </th>
            ))}

            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].name = e.target.value;
                    setRows(updatedRows);
                  }}
                  className="border p-1 rounded w-full"
                />
              </td>
              {columns.map((day) => (
                <td key={day} className="border p-2 text-center">
                  {day === "Mon" || day === "Tues" ? (
                    <input
                      type="text"
                      value={row.days[day] || ""}
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index].days[day] = e.target.value;
                        setRows(updatedRows);
                      }}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <button
                      onClick={() => toggleStatus(row.id, day)}
                      className="px-2 py-1 rounded"
                    >
                      {row.days[day] === "Right" ? (
                        <span className="text-green-500 text-xl">✅</span>
                      ) : (
                        <span className="text-red-500 text-xl">❌</span>
                      )}
                    </button>
                  )}
                </td>
              ))}

              <td className="border p-2 text-center">
                <button
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 text-white px-1 py-1 rounded"
                >
                  Delete Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Row
        </button>
        <button
          onClick={addColumn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Column
        </button>
      </div>

      <h3 className="text-lg font-bold mt-6">Notation for Areas of Concern</h3>
      <div className="mb-4">
        <label className="font-semibold">Inspection By:</label>
        <input
          type="text"
          value={inspectionBy}
          onChange={(e) => setInspectionBy(e.target.value)}
          className="border p-2 w-full rounded mt-1"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr. No</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Information</th>
          </tr>
        </thead>
        <tbody>
          {notations.map((notation, index) => (
            <tr key={notation.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={notation.date}
                  onChange={(e) =>
                    updateNotation(index, "date", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={notation.info}
                  onChange={(e) =>
                    updateNotation(index, "info", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addNotation}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add Notation
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 block"
      >
        Submit
      </button>

      {/* Display Cards after Submission */}
      {cards.length > 0 && (
        <div className="mt-6">
          {cards.map((card, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between ">
                <div className="font-bold text-xl ">
                  {card.itemName} ({selectedMonth} {selectedYear})
                </div>
                <div className="font-bold text-xl ">{card.itemName}</div>
              </div>

              <div className="mt-2">
                <h4 className="text-lg font-semibold">
                  Inspection Performed By: {card.inspectionBy}
                </h4>
                <div className="mt-4">
                  <h5 className="font-semibold">Rows:</h5>
                  <table className="w-full border-collapse border border-gray-300 mt-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">Sr. No</th>
                        <th className="border p-2">Name</th>
                        {columns.map((col, index) => (
                          <th key={index} className="border p-2">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {card.rows.map((row, rowIndex) => (
                        <tr key={row.id}>
                          <td className="border p-2 text-center">
                            {rowIndex + 1}
                          </td>
                          <td className="border p-2">{row.name}</td>
                          {columns.map((day) => (
                            <td key={day} className="border p-2 text-center">
                              {row.days[day] === "Right" ? "✅" : "❌"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-semibold">Notations:</h5>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Sr. No</th>
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.notations.map((notation, notationIndex) => (
                      <tr key={notation.id}>
                        <td className="border p-2 text-center">
                          {notationIndex + 1}
                        </td>
                        <td className="border p-2">{notation.date}</td>
                        <td className="border p-2">{notation.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => deleteCard(index)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete Card
              </button>
              {/* <button
      onClick={() => handleEdit(index)}
      className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
    >
      Edit
    </button>
    {editIndex === index && (
  <button
    onClick={handleUpdate}
    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
  >
    Update
  </button>
)} */}


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productmaintance;
