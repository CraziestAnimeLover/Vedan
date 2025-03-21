import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, PlusCircle, Save, Trash } from "lucide-react";

const workouts = [
  "Gym", "Dance", "Cardio", "HIIT", "Zumba",
  "Body Tone", "MMA", "Combat", "Spin & RPM",
  "CORE", "Yoga"
];

const API_URL = "http://localhost:8000/api/workouts"; // Adjust if necessary

const Workout = () => {
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [showSelection, setShowSelection] = useState(false);
  const [workoutCards, setWorkoutCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [editableWorkouts, setEditableWorkouts] = useState([]);

  // Fetch workout plans from backend
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setWorkoutCards(response.data))
      .catch((error) => console.error("Error fetching workouts:", error));
  }, []);

  // Toggle selection mode
  const toggleSelection = () => setShowSelection(!showSelection);

  // Select/deselect a workout
  const toggleWorkoutSelection = (workout) => {
    setSelectedWorkouts((prevSelected) =>
      prevSelected.includes(workout)
        ? prevSelected.filter((item) => item !== workout)
        : [...prevSelected, workout]
    );
  };

  // Submit selected workouts as a new plan
  const handleSubmit = () => {
    if (selectedWorkouts.length > 0) {
      axios.post(API_URL, { workouts: selectedWorkouts })
        .then((response) => {
          setWorkoutCards([...workoutCards, response.data]);
          setSelectedWorkouts([]);
          setShowSelection(false);
        })
        .catch((error) => console.error("Error adding workout:", error));
    }
  };

  // Delete a workout plan
  const deleteCard = (cardId) => {
    axios.delete(`${API_URL}/${cardId}`)
      .then(() => {
        setWorkoutCards(workoutCards.filter(card => card._id !== cardId));
      })
      .catch((error) => console.error("Error deleting workout:", error));
  };

  // Enable edit mode for a card
  const editCard = (card) => {
    setEditingCard(card._id);
    setEditableWorkouts([...card.workouts]);
  };

  // Toggle workout selection while editing
  const toggleEditWorkout = (workout) => {
    setEditableWorkouts((prev) =>
      prev.includes(workout) ? prev.filter((w) => w !== workout) : [...prev, workout]
    );
  };

  // Save updated workouts
  const saveUpdatedCard = (cardId) => {
    axios.put(`${API_URL}/${cardId}`, { workouts: editableWorkouts })
      .then((response) => {
        setWorkoutCards(workoutCards.map(card =>
          card._id === cardId ? response.data : card
        ));
        setEditingCard(null);
      })
      .catch((error) => console.error("Error updating workout:", error));
  };

  return (
    <div className="p-6 relative">
      {/* Top Bar - Toggle & Submit Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          onClick={toggleSelection}
        >
          <PlusCircle size={18} />
          {showSelection ? "Hide Selection" : "Select Workouts"}
        </button>

        {/* Submit Button */}
        {selectedWorkouts.length > 0 && (
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
            onClick={handleSubmit}
          >
            <Save size={18} />
            Submit
          </button>
        )}
      </div>

      {/* Workout Selection Panel */}
      {showSelection && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-100 rounded-lg shadow-lg">
          {workouts.map((workout) => (
            <button
              key={workout}
              className={`px-3 py-2 rounded-md text-center transition ${
                selectedWorkouts.includes(workout)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => toggleWorkoutSelection(workout)}
            >
              {workout}
            </button>
          ))}
        </div>
      )}

      {/* Workout Cards */}
      {workoutCards.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutCards.map((card) => (
            <div key={card._id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Workout Plan</h3>

                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editCard(card)}
                  >
                    <Edit size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteCard(card._id)}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              {/* Workouts Display */}
              {editingCard === card._id ? (
                // Editable Mode
                <div className="mt-2 flex flex-wrap gap-2">
                  {workouts.map((workout) => (
                    <button
                      key={workout}
                      className={`px-3 py-1 rounded-md text-sm transition ${
                        editableWorkouts.includes(workout)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => toggleEditWorkout(workout)}
                    >
                      {workout}
                    </button>
                  ))}
                </div>
              ) : (
                // Normal Mode
                <div className="mt-2 flex flex-wrap gap-2">
                  {card.workouts.map((workout, i) => (
                    <span key={i} className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                      {workout}
                    </span>
                  ))}
                </div>
              )}

              {/* Save Button */}
              {editingCard === card._id && (
                <button
                  className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  onClick={() => saveUpdatedCard(card._id)}
                >
                  <Save size={18} className="inline mr-2" />
                  Save Changes
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No workout plans added yet.</p>
      )}
    </div>
  );
};

export default Workout;
