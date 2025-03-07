import React, { useState } from "react";

const GymEvents = () => {
  const [events, setEvents] = useState([]);
  const [updatedEvents, setUpdatedEvents] = useState({});
  const [showTable, setShowTable] = useState(true);

  const handleChange = (id, field, value) => {
    setEvents(events.map(event => (event.id === id ? { ...event, [field]: value } : event)));
  };

  const handleFileUpload = (id, field, file) => {
    if (!file) return;

    if (field === "Description" && file.type !== "application/pdf") {
      alert("Only PDF files are allowed for Description.");
      return;
    }

    if (field === "Pic" && !file.type.startsWith("image/")) {
      alert("Only image files are allowed for Pic.");
      return;
    }

    handleChange(id, field, URL.createObjectURL(file));
  };

  const handleUpdate = (event) => {
    setUpdatedEvents(prev => ({
      ...prev,
      [event.id]: event
    }));
    setShowTable(false); // Hide the table after clicking update
  };

  const handleAddRow = () => {
    const newEvent = {
      id: Date.now(),
      SrNo: events.length + 1,
      Events: "",
      Goal: "",
      MusclePrimary: "",
      MuscleSecondary: "",
      Place: "",
      Duration: "",
      Description: "",
      Pic: ""
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="p-6 relative">
      {/* Toggle Button */}
      {!showTable && (
        <button
          className="absolute top-2 right-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowTable(true)}
        >
          Show Table
        </button>
      )}

      {/* Table View */}
      {showTable && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Gym Events (Table View)</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-3 py-2">SrNo</th>
                <th className="border px-3 py-2">Events</th>
                <th className="border px-3 py-2">Goal</th>
                <th className="border px-3 py-2">Muscle Used</th>
                <th className="border px-3 py-2">Place</th>
                <th className="border px-3 py-2">Duration</th>
                <th className="border px-3 py-2">Description (PDF)</th>
                <th className="border px-3 py-2">Pic (Image)</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="border px-3 py-2">{event.SrNo}</td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.Events}
                      onChange={(e) => handleChange(event.id, "Events", e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.Goal}
                      onChange={(e) => handleChange(event.id, "Goal", e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.MusclePrimary}
                      onChange={(e) => handleChange(event.id, "MusclePrimary", e.target.value)}
                      className="border px-2 py-1 w-full"
                      placeholder="Primary Muscle"
                    />
                    <input
                      type="text"
                      value={event.MuscleSecondary}
                      onChange={(e) => handleChange(event.id, "MuscleSecondary", e.target.value)}
                      className="border px-2 py-1 w-full mt-1"
                      placeholder="Secondary Muscle"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.Place}
                      onChange={(e) => handleChange(event.id, "Place", e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={event.Duration}
                      onChange={(e) => handleChange(event.id, "Duration", e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(event.id, "Description", e.target.files[0])} />
                    {event.Description && <a href={event.Description} target="_blank" className="text-blue-600">View PDF</a>}
                  </td>
                  <td className="border px-3 py-2">
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(event.id, "Pic", e.target.files[0])} />
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleUpdate(event)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Row Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleAddRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Row
            </button>
          </div>
        </div>
      )}

      {/* Card View (Appears When Update is Clicked) */}
      {!showTable && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Updated Gym Events (Card View)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(updatedEvents).map((event) => (
              <div
                key={event.id}
                className="relative h-60 rounded-lg shadow-lg flex items-center justify-center text-white"
                style={{
                  backgroundImage: `url(${event.Pic || "https://via.placeholder.com/300"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center w-full">
                  <h4 className="text-lg font-bold">{event.Events}</h4>
                  <p><strong>Duration:</strong> {event.Duration} mins</p>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GymEvents;
