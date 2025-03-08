import React, { useState } from "react";

const BarberPreventive = () => {
  const [itemName, setItemName] = useState("");
  const [rows, setRows] = useState([{ id: 1, name: "", days: {} }]);
  const [columns, setColumns] = useState(["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]);
  const [notations, setNotations] = useState([]);
  const [inspectionBy, setInspectionBy] = useState("");
  const [cards, setCards] = useState([]);

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
        days: { ...row.days, [`Day ${columns.length + 1}`]: "" }
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
          ? { ...row, days: { ...row.days, [day]: row.days[day] === "Right" ? "Wrong" : "Right" } }
          : row
      )
    );
  };

  const addNotation = () => {
    setNotations([...notations, { id: notations.length + 1, date: "", info: "" }]);
  };

  const updateNotation = (index, field, value) => {
    const updatedNotations = [...notations];
    updatedNotations[index][field] = value;
    setNotations(updatedNotations);
  };

  const handleSubmit = () => {
    setCards([...cards, { itemName, rows, notations, inspectionBy }]);
  };

  const deleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 w-4/5 mx-auto">
      <h2 className="text-xl font-bold mb-4">Preventive Actions</h2>
      
      <div className="mb-4">
        <label className="font-semibold">Item Name:</label>
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
    <button onClick={() => deleteColumn(index)} className="ml-2 text-red-500 text-xl">🗑️</button>
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
        <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Row</button>
        <button onClick={addColumn} className="bg-blue-500 text-white px-4 py-2 rounded">Add Column</button>
      </div>
      
      <h3 className="text-lg font-bold mt-6">Notation for Areas of Concern</h3>
      <div className="mb-4">
        <label className="font-semibold">Inspection Performed By:</label>
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
                  onChange={(e) => updateNotation(index, "date", e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={notation.info}
                  onChange={(e) => updateNotation(index, "info", e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addNotation} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add Notation</button>
      
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mt-4 block">Submit</button>

      {/* Display Cards after Submission */}
      {cards.length > 0 && (
        <div className="mt-6">
          {cards.map((card, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md mb-4">
              <div className="font-bold text-xl">{card.itemName}</div>
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Inspection Performed By: {card.inspectionBy}</h4>
                <div className="mt-4">
                  <h5 className="font-semibold">Rows:</h5>
                  <table className="w-full border-collapse border border-gray-300 mt-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">Sr. No</th>
                        <th className="border p-2">Name</th>
                        {columns.map((col, index) => (
                          <th key={index} className="border p-2">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {card.rows.map((row, rowIndex) => (
                        <tr key={row.id}>
                          <td className="border p-2 text-center">{rowIndex + 1}</td>
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
                        <td className="border p-2 text-center">{notationIndex + 1}</td>
                        <td className="border p-2">{notation.date}</td>
                        <td className="border p-2">{notation.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => deleteCard(index)} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                Delete Card
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarberPreventive;
