import React, { useState, useEffect } from "react";
import { FiEdit, FiCheck, FiSave, FiTrash } from "react-icons/fi";

const API_URL = "http://localhost:8000/api/abs/exercises";

const ExerciseCard = ({ index, exercise, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempExercise, setTempExercise] = useState({ ...exercise });

  const handleUpdate = async () => {
    try {
      let body;
      let headers = {};
  
      if (tempExercise.imageFile) {
        body = new FormData();
        body.append("name", tempExercise.name);
        body.append("set", tempExercise.set);
        body.append("rep", tempExercise.rep);
        body.append("focusArea", tempExercise.focusArea);
        body.append("equipment", tempExercise.equipment);
        body.append("image", tempExercise.imageFile);
      } else {
        body = JSON.stringify({
          name: tempExercise.name,
          set: tempExercise.set,
          rep: tempExercise.rep,
          focusArea: tempExercise.focusArea,
          equipment: tempExercise.equipment,
        });
        headers["Content-Type"] = "application/json"; // JSON requires headers
      }
  
      const response = await fetch(`${API_URL}/${exercise._id}`, {
        method: "PATCH", // ✅ Match backend method
        headers,
        body,
      });
      
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Error Response:", errorText);
        throw new Error(`Failed to update: ${errorText}`);
      }
  
      const updatedExercise = await response.json();
      onUpdate(updatedExercise); // Ensure updated data is passed
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };
  
  useEffect(() => {
    if (tempExercise.imageFile) {
      const objectUrl = URL.createObjectURL(tempExercise.imageFile);
      setTempExercise((prev) => ({ ...prev, imageUrl: objectUrl }));
  
      return () => URL.revokeObjectURL(objectUrl); // Cleanup to prevent memory leaks
    }
  }, [tempExercise.imageFile]);
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempExercise((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col relative">
      <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-sm">
        {index + 1}
      </span>

      <div className="flex">
        <label className="cursor-pointer w-full flex">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <img
            src={
              tempExercise.imageFile
                ? URL.createObjectURL(tempExercise.imageFile)
                : tempExercise.image
                ? `${API_URL}/uploads/${tempExercise.image}`
                : "/default-placeholder.png"
            }
            alt="Exercise"
            className="w-32 h-32 mx-14 mt-4 object-cover rounded border-2 border-gray-300"
          />
        </label>

        <div className="mt-3 flex flex-col gap-2 me-14">
          <input
            type="text"
            value={tempExercise.name || ""}
            onChange={(e) =>
              setTempExercise({ ...tempExercise, name: e.target.value })
            }
            placeholder="Exercise Name"
            className={`border p-1 rounded w-full ${
              isEditing ? "" : "border-transparent"
            }`}
            disabled={!isEditing}
          />

          <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-1">
  <input
    type="checkbox"
    checked={tempExercise.set || false}
    onChange={(e) =>
      isEditing && setTempExercise({ ...tempExercise, set: e.target.checked })
    }
  />
  Sets
</label>
X
<label className="flex items-center gap-1">
  <input
    type="checkbox"
    checked={tempExercise.rep || false}
    onChange={(e) =>
      isEditing && setTempExercise({ ...tempExercise, rep: e.target.checked })
    }
  />
  Reps
</label>


          </div>

          <input
            type="text"
            value={tempExercise.focusArea || ""}
            onChange={(e) =>
              setTempExercise({ ...tempExercise, focusArea: e.target.value })
            }
            placeholder="Focus Area"
            className={`border p-1 rounded w-full ${
              isEditing ? "" : "border-transparent"
            }`}
            disabled={!isEditing}
          />

          <input
            type="text"
            value={tempExercise.equipment || ""}
            onChange={(e) =>
              setTempExercise({ ...tempExercise, equipment: e.target.value })
            }
            placeholder="Equipment"
            className={`border p-1 rounded w-full ${
              isEditing ? "" : "border-transparent"
            }`}
            disabled={!isEditing}
          />

          {isEditing && (
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full">
              <FiSave className="inline-block mr-2" /> Save
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 flex items-center"
        >
          {isEditing ? <FiCheck /> : <FiEdit />}
        </button>
        <button
          onClick={() => onDelete(exercise._id)}
          className="text-red-500 flex items-center"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

const ABS = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const addExercise = async () => {
    const newExercise = {
      name: "New Exercise",
      set: false,
      rep: false,
      focusArea: "General",
      equipment: "None",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      if (!response.ok) throw new Error("Failed to add exercise");
      const data = await response.json();
      setExercises((prevExercises) => [...prevExercises, data]);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete exercise");
      setExercises((prevExercises) =>
        prevExercises.filter((ex) => ex._id !== id)
      );
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const updateExercise = (updatedExercise) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex._id === updatedExercise._id ? updatedExercise : ex
      )
    );
  };
  

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Exercises ({exercises.length})</h2>
        <button
          onClick={addExercise}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiEdit /> Add Exercise
        </button>
      </div>
      <div className="grid gap-4">
        {exercises.map((ex, index) => (
          <ExerciseCard
            key={ex._id}
            index={index}
            exercise={ex}
            onDelete={deleteExercise}
            onUpdate={updateExercise}
          />
        ))}
      </div>
    </div>
  );
};

export default ABS;
