
import React, { useState } from 'react';
import { FiEdit, FiCheck, FiSave, FiTrash } from 'react-icons/fi';

const ExerciseCard = ({ index, exercise, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempExercise, setTempExercise] = useState({ ...exercise });

  const handleUpdate = () => {
    onUpdate({ ...tempExercise });
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempExercise({ ...tempExercise, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col relative">
      {/* Top Left Number */}
      <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-sm">
        {index + 1}
      </span>

      <div className="flex">
        {/* Image with Click to Update */}
        <label className="cursor-pointer w-full flex">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <img 
            src={tempExercise.image || "https://via.placeholder.com/150"} 
            alt="Exercise"
            className="w-32 h-32 mx-14 mt-4 object-cover rounded border-2 border-gray-300"
          />
        </label>

        {/* Editable Fields */}
        <div className="mt-3 flex flex-col gap-2 me-14">
          {/* Name Input */}
          <input
            type="text"
            value={tempExercise.name}
            onChange={(e) => setTempExercise({ ...tempExercise, name: e.target.value })}
            placeholder="Exercise Name"
            className="border p-1 rounded w-full"
          />

          {/* Sets & Reps Checkboxes */}
          <div className="flex gap-2 items-center grid mt-2">
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={tempExercise.set}
                  onChange={() => setTempExercise({ ...tempExercise, set: !tempExercise.set })}
                />
                Sets
              </label>
              X
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={tempExercise.rep}
                  onChange={() => setTempExercise({ ...tempExercise, rep: !tempExercise.rep })}
                />
                Reps
              </label>
            </div>
          </div>

          {/* Focus Area & Equipment */}
          <input
            type="text"
            value={tempExercise.focusArea}
            onChange={(e) => setTempExercise({ ...tempExercise, focusArea: e.target.value })}
            placeholder="Focus Area"
            className="border p-1 rounded w-full"
          />
          <input
            type="text"
            value={tempExercise.equipment}
            onChange={(e) => setTempExercise({ ...tempExercise, equipment: e.target.value })}
            placeholder="Equipment"
            className="border p-1 rounded w-full"
          />

          {/* Update Button */}
          {isEditing && (
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full">
              <FiSave className="inline-block mr-2" /> Save
            </button>
          )}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex justify-between mt-2">
        {/* Edit Button */}
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 flex items-center">
          {isEditing ? <FiCheck /> : <FiEdit />}
        </button>

        {/* Delete Button */}
        <button onClick={() => onDelete(exercise.id)} className="text-red-500 flex items-center">
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

const UpperBody = () => {
  const [exercises, setExercises] = useState([]);

  const addExercise = () => {
    const newExercise = {
      id: Date.now(),
      image: "",
      name: "",
      set: false,
      rep: false,
      focusArea: "",
      equipment: "",
    };
    setExercises([...exercises, newExercise]);
  };

  const deleteExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const updateExercise = (updatedExercise) => {
    setExercises(exercises.map((ex) => (ex.id === updatedExercise.id ? updatedExercise : ex)));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Exercises ({exercises.length})</h2>
        <button onClick={addExercise} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FiEdit /> Add Exercise
        </button>
      </div>
      <div className="grid gap-4">
        {exercises.map((ex, index) => (
          <ExerciseCard key={ex.id} index={index} exercise={ex} onDelete={deleteExercise} onUpdate={updateExercise} />
        ))}
      </div>
    </div>
  );
};

export default UpperBody;
