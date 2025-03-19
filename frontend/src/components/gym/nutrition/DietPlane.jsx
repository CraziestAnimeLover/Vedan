import React, { useState, useEffect } from "react";

const DietPlan = () => {
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [janta, setJanta] = useState("");
  const [dietData, setDietData] = useState({});
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);


  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];
  const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  const resetForm = () => {
    setPlanName("");
    setJanta("");
    setDietData({});
    setShowSubmitButton(false);
    setEditingPlanId(null);
  };
  
  // ✅ Fetch Diet Plans from Backend
  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/diet-plans");
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to fetch diet plans");

        setPlans(data); // ✅ Store fetched plans in state
      } catch (error) {
        console.error("Error fetching diet plans:", error.message);
      }
    };

    fetchDietPlans();
  }, []); // ✅ Run only when component mounts

  const handleImageUpload = (week, meal, event) => {
    const file = event.target.files[0];
    if (file) {
      setDietData((prev) => ({
        ...prev,
        [week]: {
          ...prev[week],
          [meal]: {
            image: URL.createObjectURL(file),
            description: prev[week]?.[meal]?.description || "",
            uploaded: true,
          },
        },
      }));
    }
  };

  const handleDescriptionChange = (week, meal, event) => {
    setDietData((prev) => ({
      ...prev,
      [week]: {
        ...prev[week],
        [meal]: { image: prev[week]?.[meal]?.image || "", description: event.target.value },
      },
    }));
  };

  const handleSubmit = async () => {
    const newPlan = { planName, janta, dietData };

    try {
      const response = await fetch("http://localhost:8000/api/diet-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlan),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save plan");
      }

      setPlans([...plans, data]); // ✅ Update UI with new plan
      setPlanName("");
      setJanta("");
      setDietData({});
      setShowSubmitButton(false);
    } catch (error) {
      console.error("Error saving diet plan:", error.message);
    }
  };

  const handleEdit = (plan) => {
    setPlanName(plan.planName);
    setJanta(plan.janta);
    setDietData(plan.dietData);
    setEditingPlanId(plan._id); // Store the ID of the plan being edited
    setShowSubmitButton(true);
  };

  const handleUpdate = async () => {
    const updatedPlan = { planName, janta, dietData };
  
    try {
      const response = await fetch(`http://localhost:8000/api/diet-plans/${editingPlanId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPlan),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "Failed to update plan");
  
      // 🔥 Update plan correctly in state
      setPlans(plans.map((plan) => (plan._id === editingPlanId ? data : plan)));
  
      resetForm();
    } catch (error) {
      console.error("Error updating diet plan:", error.message);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/diet-plans/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete plan");

      setPlans(plans.filter((plan) => plan._id !== id)); // ✅ Remove from UI
    } catch (error) {
      console.error("Error deleting diet plan:", error.message);
    }
  };


  return (
    <div className="p-4 w-full relative">
      <button
        onClick={() => setShowSubmitButton((prev) => !prev)}
        className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {showSubmitButton ? "Show Cards" : "Add Plan"}
      </button>

      {showSubmitButton && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold mb-1">Plan Name</label>
              <input
                type="text"
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold mt-14 mb-1">Janta Name</label>
              <input
                type="text"
                placeholder="Janta Name"
                value={janta}
                onChange={(e) => setJanta(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Week</th>
                {meals.map((meal) => (
                  <th key={meal} className="border p-2">{meal}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week} className="text-center">
                  <td className="border p-2 font-bold">{week}</td>
                  {meals.map((meal) => (
                    <td key={meal} className="border p-8">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(week, meal, e)}
                        className="hidden"
                        id={`${week}-${meal}`}
                      />
                      <label
                        htmlFor={`${week}-${meal}`}
                        className={`cursor-pointer p-2 rounded block text-center ${
                          dietData[week]?.[meal]?.uploaded ? "bg-green-500 text-white" : "bg-gray-300"
                        }`}
                      >
                        Upload Image
                      </label>
                      <textarea
                        value={dietData[week]?.[meal]?.description || ""}
                        onChange={(e) => handleDescriptionChange(week, meal, e)}
                        placeholder="Add Description"
                        className="border p-2 rounded w-full mt-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button 
  onClick={editingPlanId ? handleUpdate : handleSubmit} 
  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
>
  {editingPlanId ? "Update Plan" : "Submit Plan"}
</button>

        </>
      )}

      <div className="mt-8">
        {plans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded-lg shadow-md bg-white mt-14 mb-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-2">{plan.planName}</h2>
              <p className="text-gray-600 mb-4">Janta: {plan.janta}</p>
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Week</th>
                  {meals.map((meal) => (
                    <th key={meal} className="border p-2">{meal}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week) => (
                  <tr key={week} className="text-center">
                    <td className="border p-2 font-bold">{week}</td>
                    {meals.map((meal) => (
                      <td key={meal} className="border p-2">
                        {plan.dietData[week]?.[meal]?.image ? (
                          <>
                            <img src={plan.dietData[week][meal].image} alt={meal} className="w-16 h-16 mx-auto object-cover rounded" />
                            <p className="text-sm mt-2">{plan.dietData[week][meal].description}</p>
                          </>
                        ) : (
                          "No Data"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4">

            <button onClick={() => handleEdit(plan)} className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>

            <button onClick={() => handleDelete(plan._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlan;
