import React, { useState, useEffect } from "react";

const GymEvents = () => {
  const [events, setEvents] = useState([]);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/gym-events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle form field changes
  const handleChange = (id, field, value) => {
    setEvents(
      events.map((event) =>
        event._id === id ? { ...event, [field]: value } : event
      )
    );
  };

  // Handle file uploads
  const handleFileUpload = (id, field, file) => {
    if (!file) return;

    if (field === "description" && file.type !== "application/pdf") {
      alert("Only PDF files are allowed for Description.");
      return;
    }

    if (field === "pic" && !file.type.startsWith("image/")) {
      alert("Only image files are allowed for Pic.");
      return;
    }

    handleChange(id, field, file);
  };

  // Add a new row (Frontend only)
  const handleAddRow = () => {
    const newEvent = {
      _id: Date.now(),
      srNo: events.length + 1,
      eventName: "", // 👈 Ensure not empty
      goal: "",
      musclePrimary: "",
      muscleSecondary: "",
      place: "",
      duration: "",
      description: null,
      pic: null,
    };
    setEvents([...events, newEvent]);
  };

  // Submit event to backend
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("srNo", event.srNo);
    formData.append("eventName", event.eventName);
    formData.append("goal", event.goal);
    formData.append("musclePrimary", event.musclePrimary);
    formData.append("muscleSecondary", event.muscleSecondary);
    formData.append("place", event.place);
    formData.append("duration", event.duration);

    if (event.description) {
      formData.append("description", event.description);
    }
    if (event.pic) {
      formData.append("pic", event.pic);
    }

    try {
      let response;
      if (String(event._id).includes("temp")) {
        // If it's a new event (frontend-generated ID), use POST
        response = await fetch("http://localhost:8000/api/gym-events", {
          method: "POST",
          body: formData,
        });
      } else {
        // If it's an existing event, use PUT (update)
        response = await fetch(
          `http://localhost:8000/api/gym-events/${event._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save event");
      }

      console.log("✅ Event saved successfully", data);

      // Update only the specific event in state without re-fetching all
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev._id === event._id ? { ...ev, ...data } : ev))
      );
    } catch (error) {
      console.error("❌ Error saving event:", error);
    }
  };

  // Delete event from backend
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/gym-events/${id}`, {
        method: "DELETE",
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {showTable ? "Gym Events (Table View)" : "Gym Events (Card View)"}
        </h2>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? "Show Cards" : "Show Table"}
        </button>
      </div>

      {showTable ? (
        // ✅ Existing Table View
        <div>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-3 py-2">SrNo</th>
                <th className="border px-3 py-2">Event Name</th>
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
                <tr key={event._id} className="border-b">
                  <td className="border px-3 py-2">{event.srNo}</td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.eventName}
                      onChange={(e) =>
                        handleChange(event._id, "eventName", e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.goal}
                      onChange={(e) =>
                        handleChange(event._id, "goal", e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.musclePrimary}
                      onChange={(e) =>
                        handleChange(event._id, "musclePrimary", e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                      placeholder="Primary Muscle"
                    />
                    <input
                      type="text"
                      value={event.muscleSecondary}
                      onChange={(e) =>
                        handleChange(
                          event._id,
                          "muscleSecondary",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 w-full mt-1"
                      placeholder="Secondary Muscle"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      value={event.place}
                      onChange={(e) =>
                        handleChange(event._id, "place", e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      value={event.duration}
                      onChange={(e) =>
                        handleChange(event._id, "duration", e.target.value)
                      }
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileUpload(
                          event._id,
                          "description",
                          e.target.files[0]
                        )
                      }
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(event._id, "pic", e.target.files[0])
                      }
                    />
                  </td>
                  <td className="border px-3 py-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleSubmit(event)}
                    >
                      Save
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-center">
            <button
              onClick={handleAddRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Row
            </button>
          </div>
        </div>
      ) : (
        // ✅ New Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="relative h-48 rounded-lg shadow-lg overflow-hidden bg-gray-800"
              style={{
                backgroundImage: event.pic
                  ? `url(http://localhost:8000/${event.pic})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h3 className="text-lg font-bold">{event.eventName}</h3>
                <p className="text-sm">{event.duration} mins</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GymEvents;
